import { authenticate } from "@feathersjs/authentication";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath } from "@game-library/types";

import { catalogSearchQueryValidator, catalogSearchQueryResolver } from "./catalog-search.schema";

import type { Application } from "../../declarations";
import { CatalogSearchService } from "./catalog-search.class";
import { catalogSearchMethods } from "./catalog-search.shared";

export * from "./catalog-search.class";
export * from "./catalog-search.schema";

export const catalogSearch = (app: Application) => {
  app.use(ApiServicePath.CatalogSearch, new CatalogSearchService(app), {
    methods: catalogSearchMethods,
    events: []
  });
  app.service(ApiServicePath.CatalogSearch).hooks({
    around: { all: [] },
    before: {
      all: [schemaHooks.validateQuery(catalogSearchQueryValidator), schemaHooks.resolveQuery(catalogSearchQueryResolver)],
      find: [authenticate("jwt")]
    },
    after: { all: [] },
    error: { all: [] }
  });
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.CatalogSearch]: CatalogSearchService;
  }
}
