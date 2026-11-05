import { resolve } from "@feathersjs/schema";
import { Type, getValidator } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { queryValidator } from "../../validators";
import type { CatalogSearchService } from "./catalog-search.class";

// ─── Query ────────────────────────────────────────────────────────────────
// This service has no stored entity: it searches our catalog and, when
// configured, an external game database.
export const catalogSearchQuerySchema = Type.Object(
  {
    /** Title text to search for. */
    q: Type.String({ minLength: 2, maxLength: 100 }),
    /** Narrow both searches to one platform. */
    platformId: Type.Optional(Type.String({ format: "uuid" }))
  },
  { $id: "CatalogSearchQuery", additionalProperties: false }
);
export type CatalogSearchQuery = Static<typeof catalogSearchQuerySchema>;
export const catalogSearchQueryValidator = getValidator(catalogSearchQuerySchema, queryValidator);
export const catalogSearchQueryResolver = resolve<CatalogSearchQuery, HookContext<CatalogSearchService>>({});
