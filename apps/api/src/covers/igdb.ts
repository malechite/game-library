import type { ApiCatalogResult } from "@game-library/types";
import type { IgdbConfig } from "../configuration";
import { logger } from "../logger";
import { normalizeTitle } from "./libretro";

/**
 * Minimal IGDB client (https://api-docs.igdb.com). IGDB authenticates with a
 * Twitch app's client-credentials token, so it only works once
 * `igdb.clientId` / `igdb.clientSecret` are configured; `configured` is false
 * otherwise and every lookup returns nothing.
 */

export const IGDB_IMAGE_HOST = "images.igdb.com";

const TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const API_URL = "https://api.igdb.com/v4";
/** IGDB allows 4 requests per second. */
const MIN_REQUEST_GAP_MS = 260;

/** Our platform name → the name(s) IGDB uses, for resolving IGDB platform ids at runtime. */
const IGDB_PLATFORM_NAMES: Record<string, string[]> = {
  "NES/Famicom": ["Nintendo Entertainment System", "NES"],
  "SNES/Super Famicom": ["Super Nintendo Entertainment System", "SNES"],
  "Nintendo 64": ["Nintendo 64"],
  "Nintendo GameCube": ["Nintendo GameCube"],
  "Nintendo Wii": ["Wii"],
  "Nintendo Wii U": ["Wii U"],
  "Nintendo Switch": ["Nintendo Switch"],
  "Nintendo Game Boy": ["Game Boy"],
  "Nintendo Game Boy Color": ["Game Boy Color"],
  "Nintendo Game Boy Advance": ["Game Boy Advance"],
  "Nintendo DS": ["Nintendo DS"],
  "Nintendo 3DS": ["Nintendo 3DS"],
  "Nintendo Virtual Boy": ["Virtual Boy"],
  "Sony PlayStation": ["PlayStation"],
  "Sony PlayStation 2": ["PlayStation 2"],
  "Sony PlayStation 3": ["PlayStation 3"],
  "Sony PlayStation 4": ["PlayStation 4"],
  "Sony PlayStation 5": ["PlayStation 5"],
  "Sony PSP": ["PlayStation Portable"],
  "Sony PS Vita": ["PlayStation Vita"],
  "Sega Genesis/Mega Drive": ["Sega Mega Drive/Genesis", "Sega Genesis"],
  "Sega Master System": ["Sega Master System/Mark III", "Sega Master System"],
  "Sega Saturn": ["Sega Saturn"],
  "Sega Dreamcast": ["Dreamcast"],
  "Sega CD": ["Sega CD"],
  "Sega 32X": ["Sega 32X"],
  "Sega Game Gear": ["Sega Game Gear"],
  "Atari 2600": ["Atari 2600"],
  "Atari Jaguar": ["Atari Jaguar"],
  "TurboGrafx 16": ["TurboGrafx-16/PC Engine", "TurboGrafx-16"],
  "Microsoft Xbox": ["Xbox"],
  "Microsoft Xbox 360": ["Xbox 360"],
  Intellivision: ["Intellivision"],
  Vectrex: ["Vectrex"]
};

interface IgdbPlatform {
  id: number;
  name: string;
  alternative_name?: string;
  abbreviation?: string;
}

interface IgdbGame {
  id: number;
  name: string;
  first_release_date?: number;
  cover?: { image_id?: string };
  genres?: Array<{ name: string }>;
  platforms?: Array<{ id: number; name: string }>;
  involved_companies?: Array<{ developer?: boolean; publisher?: boolean; company?: { name: string } }>;
}

const GAME_FIELDS =
  "name, first_release_date, cover.image_id, genres.name, platforms.name, " +
  "involved_companies.developer, involved_companies.publisher, involved_companies.company.name";

/** Build an IGDB image URL for a cover `image_id`. */
export const igdbCoverUrl = (imageId: string): string =>
  `https://${IGDB_IMAGE_HOST}/igdb/image/upload/t_cover_big/${imageId}.jpg`;

const toCatalogResult = (game: IgdbGame): ApiCatalogResult => ({
  source: "igdb",
  externalId: String(game.id),
  title: game.name,
  platformNames: (game.platforms ?? []).map((platform) => platform.name),
  releaseYear: game.first_release_date ? new Date(game.first_release_date * 1000).getUTCFullYear() : null,
  coverUrl: game.cover?.image_id ? igdbCoverUrl(game.cover.image_id) : null,
  genres: (game.genres ?? []).map((genre) => genre.name),
  publisher: game.involved_companies?.find((entry) => entry.publisher)?.company?.name ?? null,
  developer: game.involved_companies?.find((entry) => entry.developer)?.company?.name ?? null
});

export class IgdbClient {
  private token: { value: string; expiresAt: number } | null = null;
  private platforms: Promise<IgdbPlatform[]> | null = null;
  private lastRequestAt = 0;
  private gate: Promise<void> = Promise.resolve();

  constructor(private config: IgdbConfig) {}

  /** True once both credentials are set. */
  get configured(): boolean {
    return Boolean(this.config.clientId && this.config.clientSecret);
  }

  private async getToken(): Promise<string> {
    if (this.token && this.token.expiresAt > Date.now() + 60_000) return this.token.value;

    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      grant_type: "client_credentials"
    });
    const res = await fetch(`${TOKEN_URL}?${params}`, { method: "POST", signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`IGDB token request failed (${res.status})`);

    const body = (await res.json()) as { access_token: string; expires_in: number };
    this.token = { value: body.access_token, expiresAt: Date.now() + body.expires_in * 1000 };
    return this.token.value;
  }

  /** Serialize requests and keep them under IGDB's rate limit. */
  private throttle(): Promise<void> {
    this.gate = this.gate.then(async () => {
      const wait = this.lastRequestAt + MIN_REQUEST_GAP_MS - Date.now();
      if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
      this.lastRequestAt = Date.now();
    });
    return this.gate;
  }

  private async request<T>(endpoint: string, body: string): Promise<T> {
    await this.throttle();
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Client-ID": this.config.clientId,
        Authorization: `Bearer ${await this.getToken()}`,
        Accept: "application/json"
      },
      body,
      signal: AbortSignal.timeout(15_000)
    });
    if (!res.ok) throw new Error(`IGDB ${endpoint} request failed (${res.status})`);
    return (await res.json()) as T;
  }

  /** IGDB's platform list, fetched once. Ids are resolved by name so none are hard-coded. */
  private loadPlatforms(): Promise<IgdbPlatform[]> {
    if (!this.platforms) {
      this.platforms = this.request<IgdbPlatform[]>("platforms", "fields name, alternative_name, abbreviation; limit 500;").catch(
        (error) => {
          logger.warn("IGDB platform list failed: %O", error);
          this.platforms = null;
          return [];
        }
      );
    }
    return this.platforms;
  }

  /** Resolve one of our platform names to an IGDB platform id, or null when unknown. */
  async resolvePlatformId(platformName: string): Promise<number | null> {
    const wanted = (IGDB_PLATFORM_NAMES[platformName] ?? [platformName]).map(normalizeTitle);
    const platforms = await this.loadPlatforms();
    const match = platforms.find((platform) =>
      [platform.name, platform.alternative_name, platform.abbreviation]
        .filter((name): name is string => Boolean(name))
        .some((name) => wanted.includes(normalizeTitle(name)))
    );
    return match?.id ?? null;
  }

  /** Search IGDB by title, optionally restricted to one of our platforms. */
  async search(query: string, platformName?: string | null, limit = 10): Promise<ApiCatalogResult[]> {
    if (!this.configured) return [];

    const platformId = platformName ? await this.resolvePlatformId(platformName) : null;
    const escaped = query.replace(/["\\]/g, " ").trim();
    if (!escaped) return [];

    const where = platformId ? ` where platforms = (${platformId});` : "";
    const games = await this.request<IgdbGame[]>("games", `search "${escaped}"; fields ${GAME_FIELDS};${where} limit ${limit};`);
    return games.map(toCatalogResult);
  }

  /** Best-effort cover lookup for a title on a platform. */
  async findCoverUrl(title: string, platformName: string): Promise<string | null> {
    if (!this.configured) return null;

    const results = await this.search(title, platformName, 5);
    const key = normalizeTitle(title);
    const exact = results.find((result) => result.coverUrl && normalizeTitle(result.title) === key);
    return (exact ?? results.find((result) => result.coverUrl))?.coverUrl ?? null;
  }
}
