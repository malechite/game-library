import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("name").notNullable();
    // Gates super-admin-only surfaces (e.g. the audit log). Defaults to false;
    // granted explicitly (see src/db/seed.ts).
    table.boolean("isSuperAdmin").notNullable().defaultTo(false);
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
