import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { LibraryQuery } from "@game-library/sdk";
import type { CollectionStatus } from "@game-library/types";
import {
  DEFAULT_SORT,
  DEFAULT_VIEW,
  LibrarySort,
  LibraryView,
  PAGE_SIZE,
  SORT_QUERY,
  parseSort,
  parseStatus,
  parseView
} from "../lib/libraryOptions";

/** The dropdown filters, keyed the way they appear in the URL. */
export enum LibraryFilterKey {
  Platform = "platform",
  Genre = "genre",
  Ownership = "ownership",
  Status = "status"
}

const SEARCH_PARAM = "q";
const FAVORITES_PARAM = "favorites";
const SORT_PARAM = "sort";
const PAGE_PARAM = "page";
const VIEW_PARAM = "view";
const VIEW_STORAGE_KEY = "game-library:view";

export type LibraryFilterValues = Partial<Record<LibraryFilterKey, string>>;

export interface UseLibraryParamsResult {
  /** Text in the search box. */
  search: string;
  /** Current dropdown filter values (absent = "all"). */
  filters: LibraryFilterValues;
  /** Show only favorites. */
  favoritesOnly: boolean;
  sort: LibrarySort;
  /** Zero-based page index. */
  page: number;
  view: LibraryView;
  pageSize: number;
  /** True when the search, a dropdown or the favorites toggle is narrowing the library. */
  hasFilters: boolean;
  setSearch: (value: string) => void;
  setFilter: (key: string, value: string | undefined) => void;
  setFavoritesOnly: (favoritesOnly: boolean) => void;
  setSort: (sort: LibrarySort) => void;
  setPage: (page: number) => void;
  setView: (view: LibraryView) => void;
  clearFilters: () => void;
  /** Filters as a Feathers query (no paging/sort) — for totals. */
  filterQuery: (searchTerm: string) => LibraryQuery;
  /** The full query for one page of results. */
  pageQuery: (searchTerm: string) => LibraryQuery;
}

const readStoredView = (): LibraryView | null => {
  try {
    return parseView(window.localStorage.getItem(VIEW_STORAGE_KEY));
  } catch {
    // Storage can be unavailable (private mode); the default view is fine.
    return null;
  }
};

/** Escape LIKE wildcards so the search text is matched literally. */
const likePattern = (text: string): string => `%${text.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;

/**
 * Library filters, sort, page and view mode, stored in the URL so a view can
 * be bookmarked, shared and survives a refresh. Changing a filter or the sort
 * returns to the first page. The view mode is also remembered locally.
 *
 * @example
 * const params = useLibraryParams();
 * const { data } = useLibrary(params.pageQuery(debouncedSearch));
 */
export const useLibraryParams = (): UseLibraryParamsResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(SEARCH_PARAM) ?? "";
  const favoritesOnly = searchParams.get(FAVORITES_PARAM) === "1";
  const sort = parseSort(searchParams.get(SORT_PARAM));
  const page = Math.max(0, (Number.parseInt(searchParams.get(PAGE_PARAM) ?? "1", 10) || 1) - 1);
  const view = parseView(searchParams.get(VIEW_PARAM)) ?? readStoredView() ?? DEFAULT_VIEW;

  const filters = useMemo<LibraryFilterValues>(() => {
    const values: LibraryFilterValues = {};
    for (const key of Object.values(LibraryFilterKey)) {
      const value = searchParams.get(key);
      if (value) values[key] = value;
    }
    return values;
  }, [searchParams]);

  /** Apply changes to the URL; `undefined`/empty removes a param. Resets the page unless told otherwise. */
  const update = useCallback(
    (changes: Record<string, string | undefined>, { keepPage = false }: { keepPage?: boolean } = {}) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          for (const [key, value] of Object.entries(changes)) {
            if (value) next.set(key, value);
            else next.delete(key);
          }
          if (!keepPage) next.delete(PAGE_PARAM);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setSearch = useCallback((value: string) => update({ [SEARCH_PARAM]: value || undefined }), [update]);
  const setFilter = useCallback((key: string, value: string | undefined) => update({ [key]: value }), [update]);
  const setFavoritesOnly = useCallback((next: boolean) => update({ [FAVORITES_PARAM]: next ? "1" : undefined }), [update]);
  const setSort = useCallback(
    (next: LibrarySort) => update({ [SORT_PARAM]: next === DEFAULT_SORT ? undefined : next }),
    [update]
  );
  const setPage = useCallback(
    (next: number) => update({ [PAGE_PARAM]: next > 0 ? String(next + 1) : undefined }, { keepPage: true }),
    [update]
  );
  const setView = useCallback(
    (next: LibraryView) => {
      try {
        window.localStorage.setItem(VIEW_STORAGE_KEY, next);
      } catch {
        // Not persisted (storage unavailable) — the URL still carries the choice.
      }
      // Both views show the same page of items, so the page is kept.
      update({ [VIEW_PARAM]: next }, { keepPage: true });
    },
    [update]
  );
  const clearFilters = useCallback(
    () =>
      update({
        [SEARCH_PARAM]: undefined,
        [FAVORITES_PARAM]: undefined,
        ...Object.fromEntries(Object.values(LibraryFilterKey).map((key) => [key, undefined]))
      }),
    [update]
  );

  const filterQuery = useCallback(
    (searchTerm: string): LibraryQuery => {
      const term = searchTerm.trim();
      const status: CollectionStatus | undefined = parseStatus(filters[LibraryFilterKey.Status] ?? null);
      return {
        ...(term ? { title: { $ilike: likePattern(term) } } : {}),
        ...(filters[LibraryFilterKey.Platform] ? { platformId: filters[LibraryFilterKey.Platform] } : {}),
        ...(filters[LibraryFilterKey.Genre] ? { genreId: filters[LibraryFilterKey.Genre] } : {}),
        ...(filters[LibraryFilterKey.Ownership] ? { ownershipId: filters[LibraryFilterKey.Ownership] } : {}),
        ...(status ? { status } : {}),
        ...(favoritesOnly ? { isFavorite: true } : {})
      };
    },
    [filters, favoritesOnly]
  );

  const pageQuery = useCallback(
    (searchTerm: string): LibraryQuery => ({
      ...filterQuery(searchTerm),
      $sort: SORT_QUERY[sort],
      $limit: PAGE_SIZE,
      $skip: page * PAGE_SIZE
    }),
    [filterQuery, sort, page]
  );

  return {
    search,
    filters,
    favoritesOnly,
    sort,
    page,
    view,
    pageSize: PAGE_SIZE,
    hasFilters: Boolean(search) || favoritesOnly || Object.keys(filters).length > 0,
    setSearch,
    setFilter,
    setFavoritesOnly,
    setSort,
    setPage,
    setView,
    clearFilters,
    filterQuery,
    pageQuery
  };
};
