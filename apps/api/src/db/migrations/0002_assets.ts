import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("assets", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("ownerId").nullable().references("id").inTable("users").onDelete("SET NULL");
    table.string("filename").notNullable();
    table.string("contentType").notNullable();
    table.bigInteger("size").notNullable();
    table.string("key").notNullable();
    table.string("url").notNullable();
    table.jsonb("metadata").nullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());

    table.index("ownerId");
    table.index("key");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("assets");
}
