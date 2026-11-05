import { useQuery } from "@tanstack/react-query";
import { ApiServicePath, type ApiCatalogSearchResult } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

/** Minimum characters before a search is sent. */
export const CATALOG_SEARCH_MIN_LENGTH = 2;

/**
 * Search for a game to add: matches in our own catalog plus results from the
 * external game database when one is configured (`provider` is null otherwise).
 * Stays idle until the term is long enough — debounce the term before passing it.
 */
export const useCatalogSearch = (term: string, platformId?: string) => {
  const { client } = useGameLibraryApi();
  const q = term.trim();

  return useQuery<ApiCatalogSearchResult>({
    queryKey: [ApiServicePath.CatalogSearch, q, platformId],
    queryFn: () => client!.service(ApiServicePath.CatalogSearch).find({ query: { q, ...(platformId ? { platformId } : {}) } }),
    enabled: !!client && q.length >= CATALOG_SEARCH_MIN_LENGTH,
    staleTime: 1000 * 60
  });
};
