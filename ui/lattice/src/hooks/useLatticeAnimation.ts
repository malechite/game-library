"use client";

import { useRef, useEffect, useCallback } from "react";
import { easeInOut, lerp } from "@game-library/util";
import type { LatticeAnimationState, HexState, WaveAnimationConfig, ActiveWave, OffsetCoord } from "../types";
import { hexDistance, coordKey } from "../math/grid";

let waveIdCounter = 0;
const nextWaveId = () => `wave_${++waveIdCounter}`;

// ─── Wave Delay Pre-computation ─────────────────────────────────────

const computeWaveDelays = (config: WaveAnimationConfig, hexStates: Map<string, HexState>): Map<string, number> => {
  const delays = new Map<string, number>();
  const coords = [...hexStates.values()].map((s) => s.coord);

  if (coords.length === 0) return delays;

  // Find grid extents
  let maxRow = 0,
    maxCol = 0;
  for (const c of coords) {
    if (c.row > maxRow) maxRow = c.row;
    if (c.col > maxCol) maxCol = c.col;
  }

  const center: OffsetCoord = {
    row: Math.floor(maxRow / 2),
    col: Math.floor(maxCol / 2)
  };

  const origin = config.origin ?? center;

  for (const c of coords) {
    let delay: number;
    switch (config.direction) {
      case "left-to-right":
        delay = c.col * config.stagger;
        break;
      case "right-to-left":
        delay = (maxCol - c.col) * config.stagger;
        break;
      case "top-to-bottom":
        delay = c.row * config.stagger;
        break;
      case "bottom-to-top":
        delay = (maxRow - c.row) * config.stagger;
        break;
      case "center-out":
        delay = hexDistance(c, center) * config.stagger;
        break;
      case "radial":
        delay = hexDistance(c, origin) * config.stagger;
        break;
    }
    delays.set(coordKey(c), delay);
  }

  return delays;
};

// ─── Apply Animation Value to DOM ───────────────────────────────────

const applyValue = (state: HexState, property: WaveAnimationConfig["property"], value: number | string, relative: boolean) => {
  const { element, pathElement } = state;
  if (!element || !pathElement) return;

  switch (property) {
    case "opacity": {
      // In relative mode, value is a multiplier against the hex's base opacity
      const final = relative ? state.baseOpacity * (value as number) : (value as number);
      element.style.opacity = String(final);
      state.opacity = final;
      break;
    }
    case "scale": {
      const final = relative ? state.baseScale * (value as number) : (value as number);
      element.style.transform = `scale(${final})`;
      state.scale = final;
      break;
    }
    case "fill":
      pathElement.setAttribute("fill", String(value));
      state.fill = String(value);
      break;
  }
};

// ─── Interpolate ────────────────────────────────────────────────────

const interpolateValue = (from: number | string, to: number | string, t: number): number | string => {
  if (typeof from === "number" && typeof to === "number") {
    return lerp(from, to, t);
  }
  // For string values (colors), snap at midpoint
  return t < 0.5 ? from : to;
};

// ─── Hook ───────────────────────────────────────────────────────────

export const useLatticeAnimation = (hexStatesRef: React.RefObject<Map<string, HexState>>) => {
  const state = useRef<LatticeAnimationState>({
    hexStates: hexStatesRef.current!,
    waves: new Map(),
    running: false,
    rafId: 0
  });

  // Persistent rAF loop
  const startLoop = useCallback(() => {
    const s = state.current;
    if (s.running) return;
    s.running = true;

    const tick = (now: number) => {
      if (!s.running) return;

      const currentHexStates = hexStatesRef.current!;
      let anyActive = false;

      for (const [waveId, wave] of s.waves) {
        if (wave.completed) continue;
        anyActive = true;

        const { config, delays, startTime } = wave;
        const easeFn = config.easing ?? easeInOut;
        let allDone = true;

        for (const [key, hexState] of currentHexStates) {
          const delay = delays.get(key);
          if (delay === undefined) continue;

          const elapsed = now - startTime - delay;
          let t = elapsed / config.hexDuration;

          if (t < 0) {
            // Wave hasn't reached this hex yet
            allDone = false;
            continue;
          }

          if (t > 1) {
            t = 1;
          } else {
            allDone = false;
          }

          // Apply yoyo: reverse on odd phases
          const eased = config.yoyo ? (t <= 0.5 ? easeFn(t * 2) : 1 - easeFn((t - 0.5) * 2)) : easeFn(t);

          const value = interpolateValue(config.from, config.to, eased);
          applyValue(hexState, config.property, value, config.relative ?? false);
        }

        if (allDone) {
          const repeat = config.repeat ?? 1;
          wave.repeatCount++;

          if (repeat === 0 || wave.repeatCount < repeat) {
            // Restart the wave
            wave.startTime = now;
          } else {
            wave.completed = true;
            s.waves.delete(waveId);
            config.onComplete?.();
          }
        }
      }

      if (anyActive) {
        s.rafId = requestAnimationFrame(tick);
      } else {
        s.running = false;
      }
    };

    s.rafId = requestAnimationFrame(tick);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      state.current.running = false;
      cancelAnimationFrame(state.current.rafId);
    };
  }, []);

  const triggerWave = useCallback(
    (config: WaveAnimationConfig): string => {
      const s = state.current;
      const id = nextWaveId();
      const currentHexStates = hexStatesRef.current!;
      const delays = computeWaveDelays(config, currentHexStates);

      const hexCount = currentHexStates.size;
      const withElements = [...currentHexStates.values()].filter((h) => h.element !== null).length;
      console.log(
        `[Lattice] triggerWave "${id}" prop=${config.property} from=${config.from} to=${config.to} relative=${config.relative} | hexes: ${hexCount} total, ${withElements} with DOM elements, ${delays.size} with delays`
      );

      const wave: ActiveWave = {
        id,
        config,
        startTime: performance.now(),
        delays,
        completed: false,
        repeatCount: 0
      };

      s.waves.set(id, wave);
      startLoop();
      return id;
    },
    [startLoop]
  );

  const stopWave = useCallback((waveId: string) => {
    state.current.waves.delete(waveId);
  }, []);

  const stopAll = useCallback(() => {
    const s = state.current;
    s.waves.clear();
    s.running = false;
    cancelAnimationFrame(s.rafId);
  }, []);

  return { triggerWave, stopWave, stopAll };
};
