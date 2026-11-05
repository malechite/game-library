import type { CatalogSearchService } from "./catalog-search.class";

export type { CatalogSearchQuery } from "./catalog-search.class";

export const catalogSearchMethods: Array<keyof CatalogSearchService> = ["find"];
