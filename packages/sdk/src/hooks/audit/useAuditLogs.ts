import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Paginated } from "@feathersjs/feathers";
import { ApiServicePath, type ApiAuditLog } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { AuditQuery } from "../../client/services/audit";

/**
 * The audit log (super-admin only). Returns the full paginated envelope so
 * callers can drive server-side pagination; keeps the previous page while the
 * next loads, for flicker-free paging.
 */
export const useAuditLogs = (query?: AuditQuery) => {
  const { client } = useGameLibraryApi();

  return useQuery<Paginated<ApiAuditLog>>({
    queryKey: ["audit", "paginated", query],
    queryFn: () => client!.service(ApiServicePath.Audit).find({ query }),
    enabled: !!client,
    placeholderData: keepPreviousData
  });
};
