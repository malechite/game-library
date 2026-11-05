import knex from "knex";
import type { Knex } from "knex";
import { types } from "pg";
import type { Application } from "./declarations";

declare module "./declarations" {
  interface Configuration {
    postgresqlClient: Knex;
  }
}

// node-postgres returns NUMERIC and BIGINT as strings (they can exceed a JS
// number). Our values — prices, counts, file sizes — are well within range, so
// parse them to numbers once here instead of in every consumer.
types.setTypeParser(types.builtins.NUMERIC, (value) => parseFloat(value));
types.setTypeParser(types.builtins.INT8, (value) => parseInt(value, 10));
// DATE has no time zone; keep it as the plain "YYYY-MM-DD" string rather than
// a Date that shifts across zones when serialized.
types.setTypeParser(types.builtins.DATE, (value) => value);

export const postgresql = (app: Application) => {
  const config = app.get("postgresql" as never) as Knex.Config | undefined;
  const db = knex(config!);
  app.set("postgresqlClient", db);
};
