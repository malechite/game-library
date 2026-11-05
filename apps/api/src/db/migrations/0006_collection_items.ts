import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // A user's physical copy of a catalog game. No uniqueness on (ownerId, gameId):
  // owning two copies of the same release is legitimate.
  await knex.schema.createTable("collectionItems", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("ownerId").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.uuid("gameId").notNullable().references("id").inTable("games").onDelete("RESTRICT");
    table.uuid("ownershipId").nullable().references("id").inTable("ownerships").onDelete("RESTRICT");
    table.string("status").notNullable().defaultTo("owned");
    // What this copy is worth today (the "current value" sort).
    table.decimal("value", 10, 2).nullable();
    table.decimal("pricePaid", 10, 2).nullable();
    table.decimal("priceSold", 10, 2).nullable();
    table.string("itemCondition").nullable();
    table.string("boxCondition").nullable();
    table.string("manualCondition").nullable();
    table.string("otherCondition").nullable();
    table.text("notes").nullable();
    table.date("acquiredAt").nullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());

    table.index("ownerId");
    table.index("gameId");
  });

  await knex.raw(`
    ALTER TABLE "collectionItems"
    ADD CONSTRAINT "collectionItems_status_check" CHECK ("status" IN ('owned', 'wishlist'))
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("collectionItems");
}
