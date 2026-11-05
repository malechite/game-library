import type { Paginated, Params } from "@feathersjs/feathers";
import type { ApiLookup } from "@game-library/types";

// One interface for every lookup table (platforms, genres, companies, …):
// they share a shape and a service implementation on the server.

export interface LookupData {
  name: string;
}

export interface LookupPatch {
  name?: string;
}

export interface LookupQuery {
  id?: string;
  /** Exact name, or `{ $ilike: "%son%" }` for type-ahead search. */
  name?: string | { $ilike?: string };
  $limit?: number;
  $skip?: number;
  $sort?: Record<string, 1 | -1>;
}

export interface LookupService {
  find(params?: Params<LookupQuery>): Promise<Paginated<ApiLookup>>;
  get(id: string, params?: Params<LookupQuery>): Promise<ApiLookup>;
  /** Idempotent: creating a name that already exists returns the existing row. */
  create(data: LookupData, params?: Params<LookupQuery>): Promise<ApiLookup>;
  patch(id: string, data: LookupPatch, params?: Params<LookupQuery>): Promise<ApiLookup>;
  remove(id: string, params?: Params<LookupQuery>): Promise<ApiLookup>;
}

export const lookupMethods = ["find", "get", "create", "patch", "remove"] as const;
