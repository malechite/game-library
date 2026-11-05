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
      // `summary` receives the filters as its data argument (see the route in app.ts);
      // the same query validator coerces and checks them, and the method scopes to the caller.
      summary: [authenticate("jwt"), schemaHooks.validateData(libraryQueryValidator)]
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
