import type { Params } from "@feathersjs/feathers";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";

import type { Application } from "../../declarations";
import type { AuditLog, AuditLogData, AuditQuery } from "./audit.schema";

export type { AuditLog, AuditLogData, AuditQuery };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuditParams extends KnexAdapterParams<AuditQuery> {}

// Audit entries are immutable: only find/get (external, super-admin) and the
// internal create issued by the audit hook are exposed — no patch/remove.
export class AuditService<ServiceParams extends Params = AuditParams> extends KnexService<
  AuditLog,
  AuditLogData,
  ServiceParams
> {}

export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get("paginate"),
  Model: app.get("postgresqlClient"),
  name: "auditLogs"
});
