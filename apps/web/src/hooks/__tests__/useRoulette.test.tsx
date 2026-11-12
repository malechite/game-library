import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { ApiLibraryTitle } from "@game-library/types";
import { RoulettePhase, SPIN_TICKS, useRoulette, type UseRouletteOptions } from "../useRoulette";

const POOL: ApiLibraryTitle[] = ["Contra", "Chrono Trigger", "GoldenEye 007", "Tetris"].map((title, index) => ({
  id: `item-${index}`,
  title,
  platformName: "Test System"
}));

/** A scripted random source: returns the given values in order, then repeats the last. */
const sequence = (...values: number[]) => {
  let calls = 0;
  return () => values[Math.min(calls++, values.length - 1)]!;
};

const renderRoulette = (options: Partial<UseRouletteOptions> = {}) =>
  renderHook((props: UseRouletteOptions) => useRoulette(props), { initialProps: { pool: POOL, ...options } });

const finishSpin = () => act(() => vi.runAllTimers());

describe("useRoulette", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("starts idle with the whole pool", () => {
    const { result } = renderRoulette();
    expect(result.current).toMatchObject({ phase: RoulettePhase.Idle, display: null, winner: null, remaining: 4, skipped: 0 });
  });

  it("flashes titles, slows down, and lands on the chosen game", () => {
    // First draw picks the winner (index 2); later draws drive the reel.
    const { result } = renderRoulette({ random: sequence(0.5, 0, 0.3, 0.9) });
    const shown: string[] = [];

    act(() => result.current.spin());
    expect(result.current.phase).toBe(RoulettePhase.Spinning);
    expect(result.current.winner).toEqual(POOL[2]);

    const delays: number[] = [];
    while (result.current.phase === RoulettePhase.Spinning) {
      shown.push(result.current.display!.id);
      const before = Date.now();
      act(() => vi.advanceTimersToNextTimer());
      delays.push(Date.now() - before);
    }

    expect(result.current.phase).toBe(RoulettePhase.Result);
    expect(result.current.display).toEqual(POOL[2]);
    // One title per tick, each different from the one before, and the landing is a change too.
    expect(shown).toHaveLength(SPIN_TICKS - 1);
    shown.forEach((id, index) => index > 0 && expect(id).not.toBe(shown[index - 1]));
    expect(shown.at(-1)).not.toBe(POOL[2]!.id);
    // Fast at the start, slow at the end, never speeding back up.
    expect(delays[0]).toBeLessThan(100);
    expect(delays.at(-1)).toBeGreaterThan(300);
    delays.forEach((delay, index) => index > 0 && expect(delay).toBeGreaterThanOrEqual(delays[index - 1]!));
  });

  it("lands at once when motion is reduced", () => {
    const { result } = renderRoulette({ reducedMotion: true, random: sequence(0) });

    act(() => result.current.spin());

    expect(result.current.phase).toBe(RoulettePhase.Result);
    expect(result.current.display).toEqual(POOL[0]);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("takes a skipped game out of the pool and spins again", () => {
    // Always draws the first candidate, so each spin lands on the first game still in the pool.
    const { result } = renderRoulette({ random: sequence(0) });

    act(() => result.current.spin());
    finishSpin();
    expect(result.current.winner).toEqual(POOL[0]);

    act(() => result.current.reject());
    expect(result.current.phase).toBe(RoulettePhase.Spinning);
    expect(result.current).toMatchObject({ remaining: 3, skipped: 1 });
    finishSpin();
    expect(result.current.winner).toEqual(POOL[1]);
  });

  it("returns to idle once every game has been skipped, until the pool is reset", () => {
    const { result } = renderRoulette({ random: sequence(0) });

    act(() => result.current.spin());
    for (let skips = 0; skips < POOL.length; skips++) {
      finishSpin();
      act(() => result.current.reject());
    }

    expect(result.current).toMatchObject({ phase: RoulettePhase.Idle, winner: null, remaining: 0, skipped: 4 });
    act(() => result.current.spin());
    expect(result.current.phase).toBe(RoulettePhase.Idle);

    act(() => result.current.resetPool());
    expect(result.current).toMatchObject({ remaining: 4, skipped: 0 });
  });

  it("voids the spin when the filters drop the game in play", () => {
    const { result, rerender } = renderRoulette({ random: sequence(0) });

    act(() => result.current.spin());
    expect(result.current.winner).toEqual(POOL[0]);

    rerender({ pool: POOL.slice(1), random: sequence(0) });

    expect(result.current).toMatchObject({ phase: RoulettePhase.Idle, winner: null, display: null });
    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops ticking when unmounted", () => {
    const { result, unmount } = renderRoulette();

    act(() => result.current.spin());
    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
