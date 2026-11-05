import { authenticate } from "@feathersjs/authentication";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath, type ApiLookupPath } from "@game-library/types";

import {
  lookupDataValidator,
  lookupPatchValidator,
  lookupQueryValidator,
  lookupResolver,
  lookupExternalResolver,
  lookupDataResolver,
  lookupPatchResolver,
  lookupQueryResolver
} from "./lookup.schema";

import type { Application, HookContext } from "../../declarations";
import { requireSuperAdmin } from "../../hooks/super-admin";
import { touchUpdatedAt } from "../../hooks/timestamps";
import { LookupService, getOptions, type Lookup, type LookupData } from "./lookup.class";
import { lookupMethods, LOOKUP_TABLES } from "./lookup.shared";

export * from "./lookup.class";
export * from "./lookup.schema";

/**
 * Before create: names are unique, so creating one that already exists returns
 * the existing row instead of failing. Lets forms "pick or add" in one call.
 */
const returnExisting = async (context: HookContext<LookupService>): Promise<void> => {
  const name = (context.data as LookupData).name.trim();
  const [existing] = (await context.service.find({ query: { name, $limit: 1 }, paginate: false })) as Lookup[];
  if (existing) context.result = existing;
};

/** Register one lookup table as its own service path. */
const registerLookup = (app: Application, path: ApiLookupPath, table: string) => {
  // The paths share one implementation; narrow the union so `app.use` picks a single overload.
  const servicePath = path as ApiServicePath.Platforms;

  app.use(servicePath, new LookupService(getOptions(app, table)), {
    methods: lookupMethods,
    events: []
  });
  app.service(servicePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(lookupExternalResolver), schemaHooks.resolveResult(lookupResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(lookupQueryValidator), schemaHooks.resolveQuery(lookupQueryResolver)],
      find: [authenticate("jwt")],
      get: [authenticate("jwt")],
      create: [
        authenticate("jwt"),
        schemaHooks.validateData(lookupDataValidator),
        returnExisting,
        schemaHooks.resolveData(lookupDataResolver)
      ],
      // Renaming or deleting reference data affects every user's library.
      patch: [
        authenticate("jwt"),
        requireSuperAdmin,
        schemaHooks.validateData(lookupPatchValidator),
        touchUpdatedAt,
        schemaHooks.resolveData(lookupPatchResolver)
      ],
      remove: [authenticate("jwt"), requireSuperAdmin]
    },
    after: { all: [] },
    error: { all: [] }
  });
};

export const lookups = (app: Application) => {
  for (const [path, table] of Object.entries(LOOKUP_TABLES)) {
    registerLookup(app, path as ApiLookupPath, table);
  }
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.Platforms]: LookupService;
    [ApiServicePath.Categories]: LookupService;
    [ApiServicePath.Countries]: LookupService;
    [ApiServicePath.ReleaseTypes]: LookupService;
    [ApiServicePath.Ownerships]: LookupService;
    [ApiServicePath.Genres]: LookupService;
    [ApiServicePath.Companies]: LookupService;
  }
}
