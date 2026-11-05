import type { Params } from "@feathersjs/feathers";
import type { ApiCatalogSearchResult } from "@game-library/types";

export interface CatalogSearchQuery {
  /** Title text (2+ characters). */
  q: string;
  /** Narrow the search to one platform. */
  platformId?: string;
}

// Not a stored entity: `find` returns one result object (local + external matches).
export interface CatalogSearchService {
  find(params?: Params<CatalogSearchQuery>): Promise<ApiCatalogSearchResult>;
}

export const catalogSearchMethods = ["find"] as const;
