import { authenticate } from "@feathersjs/authentication";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath } from "@game-library/types";

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from "./user.schema";

import type { Application } from "../../declarations";
import { UserService, getOptions } from "./user.class";
import { userMethods } from "./user.shared";
import { limitToSelf } from "../../hooks/scope";
import { requireSuperAdmin } from "../../hooks/super-admin";

export * from "./user.class";
export * from "./user.schema";

export const user = (app: Application) => {
  app.use(ApiServicePath.Users, new UserService(getOptions(app)), {
    methods: userMethods,
    events: []
  });
  app.service(ApiServicePath.Users).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      // Listing every account is an admin surface; everyone else is scoped to their own row.
      find: [authenticate("jwt"), requireSuperAdmin],
      get: [authenticate("jwt"), limitToSelf],
      // Open registration — no auth on create.
      create: [schemaHooks.validateData(userDataValidator), schemaHooks.resolveData(userDataResolver)],
      patch: [
        authenticate("jwt"),
        limitToSelf,
        schemaHooks.validateData(userPatchValidator),
        schemaHooks.resolveData(userPatchResolver)
      ],
      remove: [authenticate("jwt"), limitToSelf]
    },
    after: { all: [] },
    error: { all: [] }
  });
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.Users]: UserService;
  }
}
