import { useMemo } from "react";
import {
  Button,
  FilterBar,
  Icon,
  Pagination,
  ToggleGroup,
  ToggleGroupItem,
  usePagination,
  type FilterBarFilter
} from "@game-library/cinder";
import { useGenres, useLibrary, useLibrarySummary, useOwnerships, usePlatforms, useToggleFavorite } from "@game-library/sdk";
import type { ApiLibraryItem, ApiLookup } from "@game-library/types";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { GameGrid, GameGridSkeleton } from "../components/library/GameGrid";
import { GameTable } from "../components/library/GameTable";
import { useDebounce } from "../hooks/useDebounce";
import { useLibraryModals } from "../hooks/useLibraryModals";
import { LibraryFilterKey, useLibraryParams } from "../hooks/useLibraryParams";
import { formatTotal } from "../lib/format";
import { LibrarySort, LibraryView, SORT_OPTIONS, STATUS_OPTIONS } from "../lib/libraryOptions";
import { page, content, footer, range, footerPagination, viewToggleIcon, totalValue } from "./Collection.css";

const toOptions = (rows: ApiLookup[]) => rows.map((row) => ({ value: row.id, label: row.name }));

/** The home page: the signed-in user's whole collection, as tiles or a list. */
export const Collection = () => {
  const params = useLibraryParams();
  const modals = useLibraryModals();
  // The box updates on every keystroke; the query waits for a pause.
  const searchTerm = useDebounce(params.search, 250);

  const { data: platforms = [] } = usePlatforms();
  const { data: genres = [] } = useGenres();
  const { data: ownerships = [] } = useOwnerships();
  const toggleFavorite = useToggleFavorite();
  const handleToggleFavorite = (item: ApiLibraryItem) => toggleFavorite.mutate({ id: item.id, isFavorite: !item.isFavorite });

  const { data: result, isPending, isPlaceholderData } = useLibrary(params.pageQuery(searchTerm));
  const { data: summary } = useLibrarySummary(params.filterQuery(searchTerm));

  const items = result?.data ?? [];
  const total = result?.total ?? 0;

  const pagination = usePagination({
    pageIndex: params.page,
    totalCount: total,
    pageSize: params.pageSize,
    onPageChange: (next) => {
      params.setPage(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  const filters = useMemo<FilterBarFilter[]>(
    () => [
      { key: LibraryFilterKey.Platform, label: "Platforms", options: toOptions(platforms) },
      { key: LibraryFilterKey.Genre, label: "Genres", options: toOptions(genres) },
      { key: LibraryFilterKey.Ownership, label: "Ownership", allLabel: "Any ownership", options: toOptions(ownerships) },
      { key: LibraryFilterKey.Status, label: "Statuses", allLabel: "Owned + wishlist", options: STATUS_OPTIONS }
    ],
    [platforms, genres, ownerships]
  );

  const subtitle = summary ? (
    <>
      {summary.count.toLocaleString()} {summary.count === 1 ? "game" : "games"} ·{" "}
      <span className={totalValue}>{formatTotal(summary.totalValue)} total value</span>
    </>
  ) : (
    "Loading your collection…"
  );

  const firstShown = total === 0 ? 0 : params.page * params.pageSize + 1;
  const lastShown = Math.min(total, (params.page + 1) * params.pageSize);

  return (
    <div className={page}>
      <PageHeader
        title="Collection"
        icon="GameController"
        subtitle={subtitle}
        action={
          <>
            <Button variant="outline" icon="UploadSimple" onClick={modals.openImport}>
              Import CSV
            </Button>
            <Button icon="Plus" onClick={modals.openAddGame}>
              Add game
            </Button>
            <ToggleGroup
              variant="outline"
              aria-label="View"
              value={[params.view]}
              onValueChange={(value) => {
                const next = value[0] as LibraryView | undefined;
                // Base UI lets the active item be toggled off; keep one view selected.
                if (next) params.setView(next);
              }}
            >
              <ToggleGroupItem value={LibraryView.Tiles} aria-label="Tile view">
                <span className={viewToggleIcon}>
                  <Icon type="SquaresFour" />
                </span>
              </ToggleGroupItem>
              <ToggleGroupItem value={LibraryView.List} aria-label="List view">
                <span className={viewToggleIcon}>
                  <Icon type="ListBullets" />
                </span>
              </ToggleGroupItem>
            </ToggleGroup>
          </>
        }
      />

      <FilterBar
        search={{ value: params.search, onChange: params.setSearch, placeholder: "Search your collection" }}
        filters={filters}
        values={params.filters}
        onFilterChange={params.setFilter}
        toggles={[
          {
            key: "favorites",
            label: "Favorites",
            icon: <Icon type="Heart" weight={params.favoritesOnly ? "fill" : "regular"} />,
            pressed: params.favoritesOnly,
            onPressedChange: params.setFavoritesOnly
          }
        ]}
        sort={{ value: params.sort, options: SORT_OPTIONS, onChange: (value) => params.setSort(value as LibrarySort) }}
        onClear={params.clearFilters}
      />

      <div className={content} data-refreshing={isPlaceholderData ? "" : undefined}>
        {isPending ? (
          <GameGridSkeleton count={18} />
        ) : items.length === 0 ? (
          params.hasFilters ? (
            <EmptyState
              icon="MagnifyingGlass"
              title="No games match"
              description="Try a different search or loosen the filters."
              action={
                <Button variant="outline" onClick={params.clearFilters}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon="GameController"
              title="Your collection is empty"
              description="Import a GAMEYE export or add your first game."
              action={
                <>
                  <Button icon="UploadSimple" onClick={modals.openImport}>
                    Import CSV
                  </Button>
                  <Button variant="outline" icon="Plus" onClick={modals.openAddGame}>
                    Add game
                  </Button>
                </>
              }
            />
          )
        ) : params.view === LibraryView.Tiles ? (
          <GameGrid
            items={items}
            onEdit={modals.openEditGame}
            onDelete={modals.confirmDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <GameTable
            items={items}
            onEdit={modals.openEditGame}
            onDelete={modals.confirmDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>

      {total > 0 && (
        <div className={footer}>
          <span className={range}>
            {firstShown.toLocaleString()}–{lastShown.toLocaleString()} of {total.toLocaleString()}
          </span>
          {total > params.pageSize && (
            <div className={footerPagination}>
              <Pagination {...pagination.paginationProps} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
