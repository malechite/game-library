import type { Paginated, Params } from "@feathersjs/feathers";
import type { ApiAuditLog } from "@game-library/types";

export interface AuditQuery {
  id?: string;
  userId?: string;
  service?: string;
  method?: string;
  createdAt?: string | { $gte?: string; $lte?: string };
  $limit?: number;
  $skip?: number;
  $sort?: Record<string, 1 | -1>;
}

// Read-only over HTTP (super-admin gated). Entries are written server-side by
// the audit hook, so there is no client-facing create/patch/remove.
export interface AuditService {
  find(params?: Params<AuditQuery>): Promise<Paginated<ApiAuditLog>>;
  get(id: string, params?: Params<AuditQuery>): Promise<ApiAuditLog>;
}

export const auditMethods = ["find", "get"] as const;
