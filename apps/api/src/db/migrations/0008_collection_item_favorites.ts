import type { Knex } from "knex";

/**
 * Favorites: a per-copy flag on `collectionItems`, surfaced through the
 * `libraryItems` view so the library can show and filter by it.
 *
 * A view's column list is fixed when it is created, so adding a column means
 * recreating it. `CREATE OR REPLACE VIEW` allows appending columns to the end.
 */
const viewSql = (withFavorite: boolean): string => `
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
    COALESCE(gg."genreNames", '{}'::text[]) AS "genreNames"${withFavorite ? ',\n    ci."isFavorite"' : ""}
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
`;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("collectionItems", (table) => {
    table.boolean("isFavorite").notNullable().defaultTo(false);
  });
  // Favorites are looked up per owner, and are a small slice of a collection.
  await knex.raw(`
    CREATE INDEX "collectionitems_owner_favorites_index"
    ON "collectionItems" ("ownerId") WHERE "isFavorite"
  `);
  await knex.raw(`CREATE OR REPLACE VIEW "libraryItems" AS ${viewSql(true)}`);
}

export async function down(knex: Knex): Promise<void> {
  // Removing a view column requires dropping the view first.
  await knex.raw(`DROP VIEW IF EXISTS "libraryItems"`);
  await knex.raw(`CREATE VIEW "libraryItems" AS ${viewSql(false)}`);
  await knex.raw(`DROP INDEX IF EXISTS "collectionitems_owner_favorites_index"`);
  await knex.schema.alterTable("collectionItems", (table) => {
    table.dropColumn("isFavorite");
  });
}
