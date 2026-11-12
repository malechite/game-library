import { authenticate } from "@feathersjs/authentication";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath } from "@game-library/types";

import { libraryQueryValidator, libraryItemResolver, libraryItemExternalResolver, libraryQueryResolver } from "./library.schema";

import type { Application } from "../../declarations";
import { limitToOwner } from "../../hooks/scope";
import { LibraryService, getOptions } from "./library.class";
import { libraryMethods } from "./library.shared";

export * from "./library.class";
export * from "./library.schema";

export const library = (app: Application) => {
  app.use(ApiServicePath.Library, new LibraryService(getOptions(app), app), {
    methods: libraryMethods,
    events: []
  });
  app.service(ApiServicePath.Library).hooks({
    around: {
      find: [schemaHooks.resolveExternal(libraryItemExternalResolver), schemaHooks.resolveResult(libraryItemResolver)],
      get: [schemaHooks.resolveExternal(libraryItemExternalResolver), schemaHooks.resolveResult(libraryItemResolver)]
    },
    before: {
      find: [
        authenticate("jwt"),
        schemaHooks.validateQuery(libraryQueryValidator),
        schemaHooks.resolveQuery(libraryQueryResolver),
        limitToOwner()
      ],
      get: [
        authenticate("jwt"),
        schemaHooks.validateQuery(libraryQueryValidator),
        schemaHooks.resolveQuery(libraryQueryResolver),
        limitToOwner()
      ],
      // `summary` and `titles` receive the filters as their data argument (see src/routes.ts);
      // the same query validator coerces and checks them, and each method scopes to the caller.
      summary: [authenticate("jwt"), schemaHooks.validateData(libraryQueryValidator)],
      titles: [authenticate("jwt"), schemaHooks.validateData(libraryQueryValidator)]
    },
    after: { all: [] },
    error: { all: [] }
  });
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.Library]: LibraryService;
  }
}
