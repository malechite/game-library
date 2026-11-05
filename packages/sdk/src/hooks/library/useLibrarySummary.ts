import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiLibrarySummary } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import { apiRequest } from "../../core/request";
import type { LibraryQuery } from "../../client/services/library";

/** How often to re-check while the server is still fetching cover art. */
const COVER_SYNC_POLL_MS = 4000;

/**
 * Totals for the signed-in user's library under the given filters (paging and
 * sort are ignored). While the server is fetching cover art in the background
 * it polls, and refreshes the library list whenever more covers have arrived.
 */
export const useLibrarySummary = (query?: Omit<LibraryQuery, "$limit" | "$skip" | "$sort">) => {
  const { client, host } = useGameLibraryApi();
  const queryClient = useQueryClient();

  const result = useQuery<ApiLibrarySummary>({
    queryKey: ["library", "summary", query],
    queryFn: () => apiRequest<ApiLibrarySummary>(client!, host, `/${ApiServicePath.Library}/summary`, { query }),
    enabled: !!client,
    refetchInterval: (state) => (state.state.data?.coverSyncActive ? COVER_SYNC_POLL_MS : false)
  });

  // New artwork landed since the last poll → reload the visible page of tiles.
  const missingCovers = result.data?.missingCovers;
  const previousMissing = useRef(missingCovers);
  useEffect(() => {
    if (missingCovers !== undefined && previousMissing.current !== undefined && missingCovers < previousMissing.current) {
      queryClient.invalidateQueries({ queryKey: ["library", "list"] });
    }
    previousMissing.current = missingCovers;
  }, [missingCovers, queryClient]);

  return result;
};
