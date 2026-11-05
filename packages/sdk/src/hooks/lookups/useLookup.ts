import { useQuery } from "@tanstack/react-query";
import type { ApiLookup, ApiLookupPath } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";
import type { LookupQuery } from "../../client/services/lookup";

export interface UseLookupOptions {
  /** Extra query (e.g. `{ name: { $ilike: "%son%" } }` for type-ahead). */
  query?: LookupQuery;
  /** Skip the request (e.g. until a search term is long enough). */
  skip?: boolean;
}

/** Reference data changes rarely; keep it fresh for a while. */
const LOOKUP_STALE_TIME = 1000 * 60 * 10;

/**
 * All rows of a lookup table (platforms, genres, …), sorted by name.
 *
 * @example
 * const { data: platforms = [] } = useLookup(ApiServicePath.Platforms);
 */
export const useLookup = (path: ApiLookupPath, { query, skip = false }: UseLookupOptions = {}) => {
  const { client } = useGameLibraryApi();

  return useQuery<ApiLookup[]>({
    queryKey: [path, query],
    queryFn: () =>
      client!
        // Lookup paths share one service shape; any member of the union types the call.
        .service(path as typeof path)
        .find({ query: { $sort: { name: 1 }, $limit: 500, ...query } })
        .then((res) => res.data),
    enabled: !!client && !skip,
    staleTime: LOOKUP_STALE_TIME
  });
};
