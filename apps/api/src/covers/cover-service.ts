import path from "node:path";
import { ApiServicePath } from "@game-library/types";
import type { Application } from "../declarations";
import { logger } from "../logger";
import { IgdbClient, IGDB_IMAGE_HOST } from "./igdb";
import { LibretroCovers, LIBRETRO_HOST } from "./libretro";

/**
 * Hosts the server is allowed to download cover art from. `coverSourceUrl` can
 * arrive from a client, so anything outside this list is refused — otherwise
 * the API could be made to fetch arbitrary internal URLs (SSRF).
 */
export const ALLOWED_COVER_HOSTS: readonly string[] = [LIBRETRO_HOST, IGDB_IMAGE_HOST];

/** True for an https URL on one of the allowed cover hosts. */
export const isAllowedCoverUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ALLOWED_COVER_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
};

const MAX_COVER_BYTES = 5 * 1024 * 1024;

interface GameForCover {
  id: string;
  title: string;
  coverUrl: string | null;
  coverSourceUrl: string | null;
  platformName: string;
  countryName: string | null;
}

/**
 * Resolves cover art for catalog games in the background and stores it in
 * object storage, so the UI only ever loads images from our own bucket.
 *
 * Source order: an explicit `coverSourceUrl` (e.g. picked from an IGDB search),
 * then libretro thumbnails (no key), then IGDB (when configured).
 */
export class CoverService {
  readonly igdb: IgdbClient;
  private libretro = new LibretroCovers();
  private queue: string[] = [];
  private queued = new Set<string>();
  /** Games already tried by this process, so a re-enqueue doesn't hammer the same misses. */
  private attempted = new Set<string>();
  private running = 0;

  constructor(private app: Application) {
    this.igdb = new IgdbClient(app.get("igdb"));
  }

  private get enabled(): boolean {
    return this.app.get("covers").enabled;
  }

  /** True while covers are being fetched or are waiting in the queue. */
  get active(): boolean {
    return this.running > 0 || this.queue.length > 0;
  }

  /** Queue one game for cover resolution. No-op when disabled or already queued/tried. */
  enqueue(gameId: string, options: { force?: boolean } = {}): void {
    if (!this.enabled || this.queued.has(gameId)) return;
    if (this.attempted.has(gameId) && !options.force) return;
    this.queued.add(gameId);
    this.queue.push(gameId);
    this.pump();
  }

  /** Queue every catalog game that has no cover yet. Returns how many were queued. */
  async enqueueMissing(options: { force?: boolean } = {}): Promise<number> {
    if (!this.enabled) return 0;
    const rows: Array<{ id: string }> = await this.app.get("postgresqlClient")("games").whereNull("coverUrl").select("id");
    const before = this.queue.length;
    for (const row of rows) this.enqueue(row.id, options);
    return this.queue.length - before;
  }

  /**
   * Clear covers whose libretro match is no longer the best one (the matcher
   * improved, or libretro added a better scan) so the next sync re-fetches
   * them. Returns how many covers were reset.
   */
  async resetOutdated(): Promise<number> {
    const db = this.app.get("postgresqlClient");
    const games: Array<GameForCover & { coverAssetId: string | null }> = await db("games as g")
      .join("platforms as p", "p.id", "g.platformId")
      .leftJoin("countries as c", "c.id", "g.countryId")
      .whereNotNull("g.coverUrl")
      .where("g.coverSourceUrl", "like", `https://${LIBRETRO_HOST}/%`)
      .select(
        "g.id",
        "g.title",
        "g.coverUrl",
        "g.coverSourceUrl",
        "g.coverAssetId",
        "p.name as platformName",
        "c.name as countryName"
      );

    let reset = 0;
    for (const game of games) {
      const best = await this.libretro.findCoverUrl(game.title, game.platformName, game.countryName);
      if (!best || best === game.coverSourceUrl) continue;

      await db("games").where({ id: game.id }).update({ coverUrl: null, coverAssetId: null, coverSourceUrl: null });
      if (game.coverAssetId) {
        // Internal remove: the assets service also deletes the object from storage.
        await this.app
          .service(ApiServicePath.Assets)
          .remove(game.coverAssetId, {})
          .catch(() => undefined);
      }
      this.attempted.delete(game.id);
      reset++;
    }
    return reset;
  }

  private pump(): void {
    const concurrency = Math.max(1, this.app.get("covers").concurrency);
    while (this.running < concurrency && this.queue.length > 0) {
      const gameId = this.queue.shift()!;
      this.running++;
      this.resolve(gameId)
        .catch((error) => logger.warn(`Cover resolution failed for game ${gameId}: %O`, error))
        .finally(() => {
          this.running--;
          this.queued.delete(gameId);
          this.attempted.add(gameId);
          this.pump();
        });
    }
  }

  private async findSourceUrl(game: GameForCover): Promise<string | null> {
    if (game.coverSourceUrl && isAllowedCoverUrl(game.coverSourceUrl)) return game.coverSourceUrl;
    return (
      (await this.libretro.findCoverUrl(game.title, game.platformName, game.countryName)) ??
      (await this.igdb.findCoverUrl(game.title, game.platformName).catch(() => null))
    );
  }

  private async resolve(gameId: string): Promise<void> {
    const db = this.app.get("postgresqlClient");
    const game: GameForCover | undefined = await db("games as g")
      .join("platforms as p", "p.id", "g.platformId")
      .leftJoin("countries as c", "c.id", "g.countryId")
      .where("g.id", gameId)
      .first("g.id", "g.title", "g.coverUrl", "g.coverSourceUrl", "p.name as platformName", "c.name as countryName");
    if (!game || game.coverUrl) return;

    const sourceUrl = await this.findSourceUrl(game);
    if (!sourceUrl || !isAllowedCoverUrl(sourceUrl)) return;

    const res = await fetch(sourceUrl, { signal: AbortSignal.timeout(30_000) });
    const contentType = res.headers.get("content-type") ?? "";
    if (!res.ok || !contentType.startsWith("image/")) return;

    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length === 0 || buffer.length > MAX_COVER_BYTES) return;

    const filename = path.basename(decodeURIComponent(new URL(sourceUrl).pathname));
    const stored = await this.app.get("s3Client").upload(buffer, contentType, filename);

    // Internal create (no provider): system-owned asset, not tied to a user.
    const asset = await this.app.service(ApiServicePath.Assets).create(
      {
        filename,
        contentType: stored.contentType,
        size: stored.size,
        key: stored.key,
        url: stored.url,
        metadata: { gameId, source: new URL(sourceUrl).hostname }
      },
      {}
    );

    // Bookkeeping write — straight to the table so it isn't audited as a user edit.
    await db("games").where({ id: gameId }).update({
      coverUrl: stored.url,
      coverAssetId: asset.id,
      coverSourceUrl: sourceUrl,
      updatedAt: new Date().toISOString()
    });
  }
}

export const covers = (app: Application) => {
  app.set("coverService", new CoverService(app));
};

declare module "../declarations" {
  interface Configuration {
    coverService: CoverService;
  }
}
