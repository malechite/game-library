import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { AuditService } from "./audit.class";

// ─── Main schema ──────────────────────────────────────────────────────────
export const auditSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    // Nullable so the trail survives deletion of the acting user.
    userId: Type.Union([Type.String({ format: "uuid" }), Type.Null()]),
    userEmail: Type.Union([Type.String(), Type.Null()]),
    service: Type.String(),
    method: Type.String(),
    targetId: Type.Union([Type.String(), Type.Null()]),
    createdAt: Type.String()
  },
  { $id: "AuditLog", additionalProperties: false }
);
export type AuditLog = Static<typeof auditSchema>;
export const auditResolver = resolve<AuditLog, HookContext<AuditService>>({});
export const auditExternalResolver = resolve<AuditLog, HookContext<AuditService>>({});

// ─── Create ───────────────────────────────────────────────────────────────
// Entries are written internally by the audit hook only (never over HTTP), so
// the create shape is the full set of writable fields.
export const auditDataSchema = Type.Object(
  {
    userId: Type.Optional(Type.Union([Type.String({ format: "uuid" }), Type.Null()])),
    userEmail: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    service: Type.String(),
    method: Type.String(),
    targetId: Type.Optional(Type.Union([Type.String(), Type.Null()]))
  },
  { $id: "AuditLogData", additionalProperties: false }
);
export type AuditLogData = Static<typeof auditDataSchema>;
export const auditDataValidator = getValidator(auditDataSchema, dataValidator);
export const auditDataResolver = resolve<AuditLog, HookContext<AuditService>>({});

// ─── Query ────────────────────────────────────────────────────────────────
export const auditQueryProperties = Type.Pick(auditSchema, ["id", "userId", "service", "method", "createdAt"]);
export const auditQuerySchema = Type.Intersect(
  [querySyntax(auditQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
);
export type AuditQuery = Static<typeof auditQuerySchema>;
export const auditQueryValidator = getValidator(auditQuerySchema, queryValidator);
export const auditQueryResolver = resolve<AuditQuery, HookContext<AuditService>>({});
