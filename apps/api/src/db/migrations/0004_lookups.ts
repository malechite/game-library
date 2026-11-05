import type { Knex } from "knex";

/**
 * Reference tables. Every repeating value on a game or collection item
 * (platform, category, country, …) lives here once and is joined by id.
 * Publishers and developers share `companies`.
 */
const LOOKUP_TABLES = ["platforms", "categories", "countries", "releaseTypes", "ownerships", "genres", "companies"] as const;

export async function up(knex: Knex): Promise<void> {
  for (const name of LOOKUP_TABLES) {
    await knex.schema.createTable(name, (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name").notNullable().unique();
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  for (const name of [...LOOKUP_TABLES].reverse()) {
    await knex.schema.dropTable(name);
  }
}
