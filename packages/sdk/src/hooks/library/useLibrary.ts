import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Paginated } from "@feathersjs/feathers";
import { ApiServicePath, type ApiLibraryItem } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { LibraryQuery } from "../../client/services/library";

/**
 * One page of the signed-in user's library. Returns the full paginated
 * envelope so callers can drive server-side pagination, and keeps the previous
 * page on screen while the next one loads.
 *
 * @example
 * const { data } = useLibrary({ platformId, $sort: { value: -1 }, $limit: 24, $skip: page * 24 });
 */
export const useLibrary = (query?: LibraryQuery) => {
  const { client } = useGameLibraryApi();

  return useQuery<Paginated<ApiLibraryItem>>({
    queryKey: ["library", "list", query],
    queryFn: () => client!.service(ApiServicePath.Library).find({ query }),
    enabled: !!client,
    placeholderData: keepPreviousData
  });
};
