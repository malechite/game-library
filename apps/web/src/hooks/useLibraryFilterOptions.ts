import { useMemo } from "react";
import type { FilterBarFilter } from "@game-library/cinder";
import { useGenres, useOwnerships, usePlatforms } from "@game-library/sdk";
import type { ApiLookup } from "@game-library/types";
import { STATUS_OPTIONS } from "../lib/libraryOptions";
import { LibraryFilterKey } from "./useLibraryParams";

export interface UseLibraryFilterOptionsOptions {
  /** Offer the owned / wishlist dropdown. Off where the status is fixed by the page. */
  includeStatus?: boolean;
}

const toOptions = (rows: ApiLookup[]) => rows.map((row) => ({ value: row.id, label: row.name }));

/**
 * The library's dropdown filters, with their options loaded from the lookup
 * tables, in the shape cinder's `FilterBar` takes. Keys match `useLibraryParams`.
 *
 * @example
 * const filters = useLibraryFilterOptions();
 * <FilterBar filters={filters} values={params.filters} onFilterChange={params.setFilter} />
 */
export const useLibraryFilterOptions = ({ includeStatus = true }: UseLibraryFilterOptionsOptions = {}): FilterBarFilter[] => {
  const { data: platforms } = usePlatforms();
  const { data: genres } = useGenres();
  const { data: ownerships } = useOwnerships();

  return useMemo<FilterBarFilter[]>(
    () => [
      { key: LibraryFilterKey.Platform, label: "Platforms", options: toOptions(platforms ?? []) },
      { key: LibraryFilterKey.Genre, label: "Genres", options: toOptions(genres ?? []) },
      { key: LibraryFilterKey.Ownership, label: "Ownership", allLabel: "Any ownership", options: toOptions(ownerships ?? []) },
      ...(includeStatus
        ? [{ key: LibraryFilterKey.Status, label: "Statuses", allLabel: "Owned + wishlist", options: STATUS_OPTIONS }]
        : [])
    ],
    [platforms, genres, ownerships, includeStatus]
  );
};
