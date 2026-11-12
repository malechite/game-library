import type { Knex } from "knex";

// Read model for the pick history: a pick with the catalog fields the UI lists.
const VIEW_SQL = `
  CREATE VIEW "roulettePickItems" AS
  SELECT
    rp."id",
    rp."ownerId",
    rp."gameId",
    rp."collectionItemId",
    rp."createdAt",
    rp."updatedAt",
    g."title",
    p."name" AS "platformName",
    g."coverUrl"
  FROM "roulettePicks" rp
  JOIN "games" g ON g."id" = rp."gameId"
  JOIN "platforms" p ON p."id" = g."platformId"
`;

export async function up(knex: Knex): Promise<void> {
  // A game the roulette landed on and the user chose to play. Picking the same
  // game twice is two rows: this is a log, not a set.
  await knex.schema.createTable("roulettePicks", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("ownerId").notNullable().references("id").inTable("users").onDelete("CASCADE");
    // The history points at the catalog game, so it survives the copy being sold
    // or removed; `collectionItemId` only remembers which copy was picked.
    table.uuid("gameId").notNullable().references("id").inTable("games").onDelete("CASCADE");
    table.uuid("collectionItemId").nullable().references("id").inTable("collectionItems").onDelete("SET NULL");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());

    // The history lists one user's picks newest-first.
    table.index(["ownerId", "createdAt"]);
  });

  await knex.raw(VIEW_SQL);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP VIEW IF EXISTS "roulettePickItems"');
  await knex.schema.dropTable("roulettePicks");
}
