import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("auditLogs", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    // The acting user. Nullable + SET NULL so the trail survives user deletion;
    // `userEmail` keeps a denormalized snapshot for display either way.
    table.uuid("userId").nullable().references("id").inTable("users").onDelete("SET NULL");
    table.string("userEmail").nullable();
    // The API action: the service path + method (e.g. "users" / "patch"), plus
    // the affected record id where there is one.
    table.string("service").notNullable();
    table.string("method").notNullable();
    table.string("targetId").nullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());

    // The log view lists newest-first and can filter by user.
    table.index(["createdAt"]);
    table.index(["userId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("auditLogs");
}
