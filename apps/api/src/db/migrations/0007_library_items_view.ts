import type { Knex } from "knex";

/**
 * Read model for the library UI: one row per collection item with its game and
 * every lookup name joined in, plus the game's genres as arrays. Column names
 * are unique across the row, so the `library` service can expose it with the
 * standard Feathers query syntax (filter, $sort, $ilike, pagination).
 */
export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE VIEW "libraryItems" AS
    SELECT
      ci."id",
      ci."ownerId",
      ci."gameId",
      ci."status",
      ci."ownershipId",
      o."name" AS "ownershipName",
      ci."value",
      ci."pricePaid",
      ci."priceSold",
      ci."itemCondition",
      ci."boxCondition",
      ci."manualCondition",
      ci."otherCondition",
      ci."notes",
      ci."acquiredAt",
      ci."createdAt",
      ci."updatedAt",
      g."title",
      g."platformId",
      p."name" AS "platformName",
      g."categoryId",
      c."name" AS "categoryName",
      g."countryId",
      co."name" AS "countryName",
      g."releaseTypeId",
      rt."name" AS "releaseTypeName",
      g."publisherId",
      pub."name" AS "publisherName",
      g."developerId",
      dev."name" AS "developerName",
      g."metacritic",
      g."priceLoose",
      g."priceCib",
      g."priceNew",
      g."coverUrl",
      COALESCE(gg."genreIds", '{}'::uuid[]) AS "genreIds",
      COALESCE(gg."genreNames", '{}'::text[]) AS "genreNames"
    FROM "collectionItems" ci
    JOIN "games" g ON g."id" = ci."gameId"
    JOIN "platforms" p ON p."id" = g."platformId"
    JOIN "categories" c ON c."id" = g."categoryId"
    LEFT JOIN "countries" co ON co."id" = g."countryId"
    LEFT JOIN "releaseTypes" rt ON rt."id" = g."releaseTypeId"
    LEFT JOIN "companies" pub ON pub."id" = g."publisherId"
    LEFT JOIN "companies" dev ON dev."id" = g."developerId"
    LEFT JOIN "ownerships" o ON o."id" = ci."ownershipId"
    LEFT JOIN LATERAL (
      SELECT
        array_agg(ge."id" ORDER BY ge."name") AS "genreIds",
        array_agg(ge."name"::text ORDER BY ge."name") AS "genreNames"
      FROM "gameGenres" x
      JOIN "genres" ge ON ge."id" = x."genreId"
      WHERE x."gameId" = g."id"
    ) gg ON TRUE
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP VIEW IF EXISTS "libraryItems"`);
}
