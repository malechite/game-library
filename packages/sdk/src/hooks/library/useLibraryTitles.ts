import { useQuery } from "@tanstack/react-query";
import { ApiServicePath, type ApiLibraryTitle } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import { apiRequest } from "../../core/request";
import type { LibraryQuery } from "../../client/services/library";

/**
 * The id, title and platform of every library item matching the filters, in
 * one unpaginated response. Meant to be held client-side — the roulette spins
 * through these names without another request.
 *
 * @example
 * const { data: pool = [] } = useLibraryTitles({ platformId, status: CollectionStatus.Owned });
 */
export const useLibraryTitles = (query?: Omit<LibraryQuery, "$limit" | "$skip" | "$sort">) => {
  const { client, host } = useGameLibraryApi();

  return useQuery<ApiLibraryTitle[]>({
    // Under ["library"], so every collection mutation refreshes the pool too.
    queryKey: ["library", "titles", query],
    queryFn: () => apiRequest<ApiLibraryTitle[]>(client!, host, `/${ApiServicePath.Library}/titles`, { query }),
    enabled: !!client
  });
};
