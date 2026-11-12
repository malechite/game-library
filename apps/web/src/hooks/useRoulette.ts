import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ApiLibraryTitle } from "@game-library/types";

/** Where a spin is in its life. */
export enum RoulettePhase {
  /** Waiting for a spin. */
  Idle = "idle",
  /** Titles are flashing by. */
  Spinning = "spinning",
  /** Landed on a game; waiting for the user to take it or spin again. */
  Result = "result"
}

/** Titles shown in one spin, the last being the game it lands on. */
export const SPIN_TICKS = 28;
/** Milliseconds a title stays up at full speed. */
const FASTEST_TICK_MS = 50;
/** Milliseconds the last title before the landing stays up. */
const SLOWEST_TICK_MS = 450;

/** How long tick `index` stays up: flat and fast at first, then slowing sharply into the landing. */
const tickDelay = (index: number): number =>
  Math.round(FASTEST_TICK_MS + (SLOWEST_TICK_MS - FASTEST_TICK_MS) * (index / (SPIN_TICKS - 1)) ** 3);

export interface UseRouletteOptions {
  /** Every game that may come up, already filtered. Held in memory; a spin makes no requests. */
  pool: ApiLibraryTitle[];
  /** Skip the flashing titles and land at once (reduced-motion preference). */
  reducedMotion?: boolean;
  /** Source of randomness in [0, 1); injectable so tests can script a spin. */
  random?: () => number;
}

export interface UseRouletteResult {
  phase: RoulettePhase;
  /** The title on screen: a passing one while spinning, the winner once landed. */
  display: ApiLibraryTitle | null;
  /** The game this spin lands on. Known from the start of the spin, so its details can load meanwhile. */
  winner: ApiLibraryTitle | null;
  /** Games still in the pool (not skipped). */
  remaining: number;
  /** Games skipped this session. */
  skipped: number;
  /** Start a spin over the remaining games. Does nothing when none are left. */
  spin: () => void;
  /** Skip the game it landed on — it leaves the pool — and spin again. */
  reject: () => void;
  /** Stop and return to idle, keeping the skipped games out. */
  reset: () => void;
  /** Put every skipped game back in the pool. */
  resetPool: () => void;
}

/**
 * The roulette: picks a random game from the pool and plays a reel of passing
 * titles that slows into it. Skipped games stay out of the pool until
 * `resetPool` (or a reload) — nothing here is persisted.
 *
 * @example
 * const roulette = useRoulette({ pool });
 * <Button onClick={roulette.spin}>Spin</Button>
 * {roulette.phase === RoulettePhase.Result && <p>{roulette.winner?.title}</p>}
 */
export const useRoulette = ({ pool, reducedMotion = false, random = Math.random }: UseRouletteOptions): UseRouletteResult => {
  const [phase, setPhase] = useState(RoulettePhase.Idle);
  const [display, setDisplay] = useState<ApiLibraryTitle | null>(null);
  const [winner, setWinner] = useState<ApiLibraryTitle | null>(null);
  const [skippedIds, setSkippedIds] = useState<ReadonlySet<string>>(() => new Set());
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const available = useMemo(() => pool.filter((entry) => !skippedIds.has(entry.id)), [pool, skippedIds]);
  // Skipped games that the current filters would otherwise offer.
  const skipped = pool.length - available.length;

  const stop = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = undefined;
  }, []);

  const reset = useCallback(() => {
    stop();
    setPhase(RoulettePhase.Idle);
    setDisplay(null);
    setWinner(null);
  }, [stop]);

  const start = useCallback(
    (candidates: ApiLibraryTitle[]) => {
      stop();
      if (candidates.length === 0) return;

      const pickIndex = () => Math.min(candidates.length - 1, Math.floor(random() * candidates.length));
      const landing = candidates[pickIndex()]!;
      setWinner(landing);

      // Nothing to flash through with one candidate, and nothing should flash for reduced motion.
      if (reducedMotion || candidates.length === 1) {
        setDisplay(landing);
        setPhase(RoulettePhase.Result);
        return;
      }

      let shown: ApiLibraryTitle | null = null;
      const tick = (index: number) => {
        if (index === SPIN_TICKS - 1) {
          timer.current = undefined;
          setDisplay(landing);
          setPhase(RoulettePhase.Result);
          return;
        }
        // Never repeat the title already up, and keep the winner off the tick before
        // the landing, so every tick — the last included — visibly changes the reel.
        const avoid = index === SPIN_TICKS - 2 ? landing.id : shown?.id;
        let next = pickIndex();
        if (candidates[next]!.id === avoid) next = (next + 1) % candidates.length;
        shown = candidates[next]!;
        setDisplay(shown);
        timer.current = setTimeout(() => tick(index + 1), tickDelay(index));
      };

      setPhase(RoulettePhase.Spinning);
      tick(0);
    },
    [random, reducedMotion, stop]
  );

  const spin = useCallback(() => start(available), [start, available]);

  const reject = useCallback(() => {
    if (!winner) return;
    const rest = available.filter((entry) => entry.id !== winner.id);
    setSkippedIds((current) => new Set(current).add(winner.id));
    if (rest.length === 0) reset();
    else start(rest);
  }, [winner, available, reset, start]);

  const resetPool = useCallback(() => setSkippedIds(new Set()), []);

  // The pool follows the filters: if the game in play is no longer in it, the spin is void.
  const winnerInPool = !winner || pool.some((entry) => entry.id === winner.id);
  useEffect(() => {
    if (!winnerInPool) reset();
  }, [winnerInPool, reset]);

  // A pending tick must not fire after the page is gone.
  useEffect(() => stop, [stop]);

  return { phase, display, winner, remaining: available.length, skipped, spin, reject, reset, resetPool };
};
