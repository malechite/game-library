import type { Params } from "@feathersjs/feathers";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";

import type { Application } from "../../declarations";
import type { Lookup, LookupData, LookupPatch, LookupQuery } from "./lookup.schema";

export type { Lookup, LookupData, LookupPatch, LookupQuery };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LookupParams extends KnexAdapterParams<LookupQuery> {}

/** One class serves every lookup table; the table name comes from `getOptions`. */
export class LookupService<ServiceParams extends Params = LookupParams> extends KnexService<
  Lookup,
  LookupData,
  ServiceParams,
  LookupPatch
> {}

export const getOptions = (app: Application, table: string): KnexAdapterOptions => ({
  // Lookups feed filter dropdowns, so return whole (small) tables by default.
  paginate: { default: 100, max: 500 },
  Model: app.get("postgresqlClient"),
  name: table
});
