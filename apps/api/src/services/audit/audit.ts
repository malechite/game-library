import { authenticate } from "@feathersjs/authentication";
import { hooks as schemaHooks } from "@feathersjs/schema";
import { ApiServicePath } from "@game-library/types";

import {
  auditDataValidator,
  auditQueryValidator,
  auditResolver,
  auditExternalResolver,
  auditDataResolver,
  auditQueryResolver
} from "./audit.schema";

import type { Application } from "../../declarations";
import { requireSuperAdmin, internalOnly } from "../../hooks/super-admin";
import { AuditService, getOptions } from "./audit.class";
import { auditMethods } from "./audit.shared";

export * from "./audit.class";
export * from "./audit.schema";

export const audit = (app: Application) => {
  app.use(ApiServicePath.Audit, new AuditService(getOptions(app)), {
    methods: auditMethods,
    events: []
  });
  app.service(ApiServicePath.Audit).hooks({
    around: {
      all: [schemaHooks.resolveExternal(auditExternalResolver), schemaHooks.resolveResult(auditResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(auditQueryValidator), schemaHooks.resolveQuery(auditQueryResolver)],
      // Reading the trail is super-admin only.
      find: [authenticate("jwt"), requireSuperAdmin],
      get: [authenticate("jwt"), requireSuperAdmin],
      // Writes come only from the audit hook (internal); never over HTTP.
      create: [internalOnly, schemaHooks.validateData(auditDataValidator), schemaHooks.resolveData(auditDataResolver)]
    },
    after: { all: [] },
    error: { all: [] }
  });
};

declare module "../../declarations" {
  interface ServiceTypes {
    [ApiServicePath.Audit]: AuditService;
  }
}
