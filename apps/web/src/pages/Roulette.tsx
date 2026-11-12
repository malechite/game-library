import { useMemo } from "react";
import { useMediaQuery } from "@game-library/armature";
import { Button, FilterBar, Icon, Spinner, toast } from "@game-library/cinder";
import {
  useCreateRoulettePick,
  useDeleteRoulettePick,
  useLibraryItem,
  useLibraryTitles,
  useRoulettePicks
} from "@game-library/sdk";
import { CollectionStatus, type ApiLibraryTitle, type ApiRoulettePick } from "@game-library/types";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { RouletteHistory } from "../components/roulette/RouletteHistory";
import { RouletteReel } from "../components/roulette/RouletteReel";
import { RouletteResult } from "../components/roulette/RouletteResult";
import { RouletteStart } from "../components/roulette/RouletteStart";
import { stage, visuallyHidden } from "../components/roulette/roulette.css";
import { useDebounce } from "../hooks/useDebounce";
import { useLibraryFilterOptions } from "../hooks/useLibraryFilterOptions";
import { useLibraryParams } from "../hooks/useLibraryParams";
import { RoulettePhase, useRoulette } from "../hooks/useRoulette";
import { page, layout } from "./Roulette.css";

/** How many past picks the page lists. */
const HISTORY_SIZE = 10;

// One stable array while the pool loads, so the roulette doesn't see a "new" pool on every render.
const EMPTY_POOL: ApiLibraryTitle[] = [];

/** Game Roulette: spin through the filtered library and land on something to play. */
export const Roulette = () => {
  const params = useLibraryParams();
  // The box updates on every keystroke; the query waits for a pause.
  const searchTerm = useDebounce(params.search, 250);
  const filters = useLibraryFilterOptions({ includeStatus: false });

  // Only games on the shelf can be played, so the pool is always the owned ones.
  const { filterQuery } = params;
  const poolQuery = useMemo(() => ({ ...filterQuery(searchTerm), status: CollectionStatus.Owned }), [filterQuery, searchTerm]);
  // Every matching name is loaded once and kept; a spin then runs from memory.
  const { data: pool = EMPTY_POOL, isPending } = useLibraryTitles(poolQuery);

  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const roulette = useRoulette({ pool, reducedMotion });
  const { phase, winner } = roulette;

  // The winner is known as the spin starts, so its details (and cover URL) load
  // behind the reel. The cover itself is only rendered once the reel has landed.
  const { data: winnerItem } = useLibraryItem(winner?.id);
  const winnerDetails = winnerItem?.id === winner?.id ? winnerItem : undefined;

  const { data: picks } = useRoulettePicks({ $limit: HISTORY_SIZE });
  const createPick = useCreateRoulettePick();
  const deletePick = useDeleteRoulettePick();

  const handlePlay = () => {
    if (!winner) return;
    createPick.mutate(
      { collectionItemId: winner.id },
      {
        onSuccess: (pick) => {
          toast.success(`Enjoy ${pick.title}!`);
          roulette.reset();
        },
        onError: (error) => {
          console.error("[Roulette] Could not log the pick", error);
          toast.error("Could not save your pick. Try again.");
        }
      }
    );
  };

  const handleRemovePick = (pick: ApiRoulettePick) =>
    deletePick.mutate(pick.id, {
      onError: (error) => {
        console.error("[Roulette] Could not remove the pick", error);
        toast.error(`Could not remove ${pick.title}`);
      }
    });

  const subtitle = isPending ? (
    "Loading your games…"
  ) : (
    <>
      {roulette.remaining.toLocaleString()} {roulette.remaining === 1 ? "game" : "games"} in the pool
      {roulette.skipped > 0 && ` · ${roulette.skipped.toLocaleString()} skipped`}
    </>
  );

  const renderStage = () => {
    if (isPending) return <Spinner />;
    if (phase === RoulettePhase.Spinning) return <RouletteReel entry={roulette.display} />;
    if (phase === RoulettePhase.Result && winner) {
      return (
        <RouletteResult
          winner={winner}
          coverUrl={winnerDetails?.coverUrl}
          genres={winnerDetails?.genreNames}
          saving={createPick.isPending}
          onPlay={handlePlay}
          onSpinAgain={roulette.reject}
        />
      );
    }
    if (pool.length === 0) {
      return params.hasFilters ? (
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
          title="Nothing to spin yet"
          description="Add some owned games to your collection first."
        />
      );
    }
    if (roulette.remaining === 0) {
      return (
        <EmptyState
          icon="Shuffle"
          title="You've skipped every game"
          description="Put the skipped games back in the pool to keep spinning."
          action={<Button onClick={roulette.resetPool}>Reset pool</Button>}
        />
      );
    }
    return <RouletteStart remaining={roulette.remaining} onSpin={roulette.spin} />;
  };

  return (
    <div className={page}>
      <PageHeader
        title="Roulette"
        icon="Shuffle"
        subtitle={subtitle}
        action={
          roulette.skipped > 0 && (
            <Button variant="outline" icon="ArrowsClockwise" onClick={roulette.resetPool}>
              Reset pool
            </Button>
          )
        }
      />

      <FilterBar
        search={{ value: params.search, onChange: params.setSearch, placeholder: "Narrow the pool by title" }}
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
        onClear={params.clearFilters}
      />

      <div className={layout}>
        <section className={stage} aria-label="Roulette" data-phase={phase}>
          {renderStage()}
          {/* The reel is silent to screen readers; only the landing is announced. */}
          <span className={visuallyHidden} aria-live="polite">
            {phase === RoulettePhase.Result && winner ? `Landed on ${winner.title} for ${winner.platformName}.` : ""}
          </span>
        </section>

        <RouletteHistory picks={picks?.data ?? []} total={picks?.total ?? 0} onRemove={handleRemovePick} />
      </div>
    </div>
  );
};
