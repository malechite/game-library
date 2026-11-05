import type { AuditService } from "./audit.class";

export type { AuditLog, AuditLogData, AuditQuery } from "./audit.class";

// `create` is internal-only (written by the audit hook), so it is registered but
// blocked for external callers — see the `internalOnly` hook in audit.ts.
export const auditMethods: Array<keyof AuditService> = ["find", "get", "create"];
