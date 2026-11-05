import { ApiServicePath, type ApiLookupPath } from "@game-library/types";
import type { LookupService } from "./lookup.class";

export type { Lookup, LookupData, LookupPatch, LookupQuery } from "./lookup.class";

export const lookupMethods: Array<keyof LookupService> = ["find", "get", "create", "patch", "remove"];

/** Service path → database table for every lookup. */
export const LOOKUP_TABLES: Record<ApiLookupPath, string> = {
  [ApiServicePath.Platforms]: "platforms",
  [ApiServicePath.Categories]: "categories",
  [ApiServicePath.Countries]: "countries",
  [ApiServicePath.ReleaseTypes]: "releaseTypes",
  [ApiServicePath.Ownerships]: "ownerships",
  [ApiServicePath.Genres]: "genres",
  [ApiServicePath.Companies]: "companies"
};
