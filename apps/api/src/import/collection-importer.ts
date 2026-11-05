import type { Knex } from "knex";
import type { ApiImportResult } from "@game-library/types";
import type { Application } from "../declarations";
import { GAME_CATEGORY } from "../services/game/game.shared";
import { parseGameyeCsv, type GameyeRow } from "./gameye-csv";

export interface ImportOptions {
  /** Replace the user's existing collection (default) instead of appending to it. */
  replace?: boolean;
  /** Queue box-art resolution for new games once the import commits (default true). */
  covers?: boolean;
}

type LookupTable = "platforms" | "categories" | "countries" | "releaseTypes" | "ownerships" | "genres" | "companies";
type NameMap = Map<string, string>;

const CHUNK_SIZE = 200;

const chunk = <T>(items: T[], size = CHUNK_SIZE): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
};

const distinct = (values: Array<string | null>): string[] => [
  ...new Set(values.filter((value): value is string => value !== null))
];

/** Insert any names that don't exist yet, then return name → id for all of them. */
const upsertLookup = async (trx: Knex.Transaction, table: LookupTable, names: string[]): Promise<NameMap> => {
  const map: NameMap = new Map();
  for (const batch of chunk(names)) {
    await trx(table)
      .insert(batch.map((name) => ({ name })))
      .onConflict("name")
      .ignore();
    const rows: Array<{ id: string; name: string }> = await trx(table).whereIn("name", batch).select("id", "name");
    for (const row of rows) map.set(row.name, row.id);
  }
  return map;
};

/** The natural key of a catalog release, as a string for de-duplicating rows in memory. */
const gameKey = (parts: Array<string | null>): string => parts.map((part) => part ?? "").join("\u0001");

/**
 * Import a GAMEYE CSV export into a user's collection.
 *
 * Runs in one transaction: reference data is upserted into the lookup tables
 * (never duplicated), catalog games are upserted on their natural key, and one
 * collection item is created per game row — two rows for the same game are two
 * physical copies and stay two items. Only games are imported; hardware rows
 * come back in `skipped`.
 */
export const importCollection = async (
  app: Application,
  ownerId: string,
  csv: string,
  options: ImportOptions = {}
): Promise<ApiImportResult> => {
  const parsed = parseGameyeCsv(csv);
  const { total } = parsed;

  // The library is games-only: consoles and other hardware in the export
  // (category "Systems") are reported as skipped rather than imported.
  const isGame = (row: GameyeRow): boolean => row.category.toLowerCase() === GAME_CATEGORY.toLowerCase();
  const rows = parsed.rows.filter(isGame);
  const skipped = [
    ...parsed.skipped,
    ...parsed.rows.filter((row) => !isGame(row)).map((row) => ({ line: row.line, reason: `Not a game (${row.category})` }))
  ].sort((a, b) => a.line - b.line);

  const replace = options.replace ?? true;
  const db = app.get("postgresqlClient");

  const result = await db.transaction(async (trx) => {
    // ─── Reference data ─────────────────────────────────────────────────
    const platforms = await upsertLookup(trx, "platforms", distinct(rows.map((row) => row.platform)));
    const categories = await upsertLookup(trx, "categories", distinct(rows.map((row) => row.category)));
    const countries = await upsertLookup(trx, "countries", distinct(rows.map((row) => row.country)));
    const releaseTypes = await upsertLookup(trx, "releaseTypes", distinct(rows.map((row) => row.releaseType)));
    const ownerships = await upsertLookup(trx, "ownerships", distinct(rows.map((row) => row.ownership)));
    const genres = await upsertLookup(trx, "genres", distinct(rows.flatMap((row) => row.genres)));
    const companies = await upsertLookup(trx, "companies", distinct(rows.flatMap((row) => [row.publisher, row.developer])));

    const idOf = (map: NameMap, name: string | null): string | null => (name ? (map.get(name) ?? null) : null);
    const keyOf = (row: GameyeRow): string =>
      gameKey([
        row.title,
        idOf(platforms, row.platform),
        idOf(categories, row.category),
        idOf(countries, row.country),
        idOf(releaseTypes, row.releaseType)
      ]);

    // ─── Catalog games (one per distinct release) ───────────────────────
    const distinctGames = new Map<string, GameyeRow>();
    for (const row of rows) if (!distinctGames.has(keyOf(row))) distinctGames.set(keyOf(row), row);

    const gameIds = new Map<string, string>();
    let gamesCreated = 0;
    for (const batch of chunk([...distinctGames.values()])) {
      const inserted: Array<{
        id: string;
        title: string;
        platformId: string;
        categoryId: string;
        countryId: string | null;
        releaseTypeId: string | null;
        created: boolean;
      }> = await trx("games")
        .insert(
          batch.map((row) => ({
            title: row.title,
            platformId: idOf(platforms, row.platform),
            categoryId: idOf(categories, row.category),
            countryId: idOf(countries, row.country),
            releaseTypeId: idOf(releaseTypes, row.releaseType),
            publisherId: idOf(companies, row.publisher),
            developerId: idOf(companies, row.developer),
            metacritic: row.metacritic,
            priceLoose: row.priceLoose,
            priceCib: row.priceCib,
            priceNew: row.priceNew
          }))
        )
        .onConflict(["title", "platformId", "categoryId", "countryId", "releaseTypeId"])
        // Existing game: refresh what the export knows, keep anything it doesn't.
        .merge({
          publisherId: trx.raw('COALESCE(EXCLUDED."publisherId", "games"."publisherId")'),
          developerId: trx.raw('COALESCE(EXCLUDED."developerId", "games"."developerId")'),
          metacritic: trx.raw('COALESCE(EXCLUDED."metacritic", "games"."metacritic")'),
          priceLoose: trx.raw('COALESCE(EXCLUDED."priceLoose", "games"."priceLoose")'),
          priceCib: trx.raw('COALESCE(EXCLUDED."priceCib", "games"."priceCib")'),
          priceNew: trx.raw('COALESCE(EXCLUDED."priceNew", "games"."priceNew")'),
          updatedAt: trx.fn.now()
        })
        // `xmax = 0` is true only for rows this statement inserted (not updated).
        .returning(["id", "title", "platformId", "categoryId", "countryId", "releaseTypeId", trx.raw("(xmax = 0) AS created")]);

      for (const game of inserted) {
        gameIds.set(gameKey([game.title, game.platformId, game.categoryId, game.countryId, game.releaseTypeId]), game.id);
        if (game.created) gamesCreated++;
      }
    }

    // ─── Game ↔ genre links (additive: never removes genres added by hand) ──
    const genreLinks = [...distinctGames.entries()].flatMap(([key, row]) =>
      row.genres.map((genre) => ({ gameId: gameIds.get(key)!, genreId: genres.get(genre)! }))
    );
    for (const batch of chunk(genreLinks)) {
      await trx("gameGenres").insert(batch).onConflict(["gameId", "genreId"]).ignore();
    }

    // ─── The user's copies ──────────────────────────────────────────────
    if (replace) await trx("collectionItems").where({ ownerId }).delete();

    const items = rows.map((row) => ({
      ownerId,
      gameId: gameIds.get(keyOf(row))!,
      ownershipId: idOf(ownerships, row.ownership),
      status: row.status,
      value: row.value,
      pricePaid: row.pricePaid,
      priceSold: row.priceSold,
      itemCondition: row.itemCondition,
      boxCondition: row.boxCondition,
      manualCondition: row.manualCondition,
      otherCondition: row.otherCondition,
      notes: row.notes,
      acquiredAt: row.acquiredAt
    }));
    for (const batch of chunk(items)) await trx("collectionItems").insert(batch);

    return {
      rows: total,
      items: items.length,
      gamesCreated,
      gamesExisting: distinctGames.size - gamesCreated,
      skipped
    };
  });

  // Fetch box art for anything new, in the background.
  if (options.covers ?? true) void app.get("coverService").enqueueMissing();

  return result;
};
