import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // The shared catalog: one row per distinct release of a game (or console).
  await knex.schema.createTable("games", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("title").notNullable();
    table.uuid("platformId").notNullable().references("id").inTable("platforms").onDelete("RESTRICT");
    table.uuid("categoryId").notNullable().references("id").inTable("categories").onDelete("RESTRICT");
    table.uuid("countryId").nullable().references("id").inTable("countries").onDelete("RESTRICT");
    table.uuid("releaseTypeId").nullable().references("id").inTable("releaseTypes").onDelete("RESTRICT");
    table.uuid("publisherId").nullable().references("id").inTable("companies").onDelete("RESTRICT");
    table.uuid("developerId").nullable().references("id").inTable("companies").onDelete("RESTRICT");
    table.smallint("metacritic").nullable();
    // Market values by completeness, as reported by the price source.
    table.decimal("priceLoose", 10, 2).nullable();
    table.decimal("priceCib", 10, 2).nullable();
    table.decimal("priceNew", 10, 2).nullable();
    // Cover art: `coverUrl` is what clients render (our object storage once
    // resolved); `coverSourceUrl` records where the art was fetched from.
    table.string("coverUrl", 1024).nullable();
    table.uuid("coverAssetId").nullable().references("id").inTable("assets").onDelete("SET NULL");
    table.string("coverSourceUrl", 1024).nullable();
    // Identity in an external catalog (e.g. "igdb" + its game id), when known.
    table.string("externalSource").nullable();
    table.string("externalId").nullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());

    table.index("platformId");
    table.index("title");
  });

  // Natural key of a release. NULLS NOT DISTINCT so two rows with a null
  // country/release type still collide (Postgres 15+).
  await knex.raw(`
    CREATE UNIQUE INDEX "games_natural_key_unique"
    ON "games" ("title", "platformId", "categoryId", "countryId", "releaseTypeId")
    NULLS NOT DISTINCT
  `);

  // Games ↔ genres (many-to-many).
  await knex.schema.createTable("gameGenres", (table) => {
    table.uuid("gameId").notNullable().references("id").inTable("games").onDelete("CASCADE");
    table.uuid("genreId").notNullable().references("id").inTable("genres").onDelete("RESTRICT");
    table.primary(["gameId", "genreId"]);
    table.index("genreId");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("gameGenres");
  await knex.schema.dropTable("games");
}
