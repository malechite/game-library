import { useRef, useEffect } from "react";
import type { GradientDef } from "@game-library/tokens";
import { parseOklch, toOklchString, lerp, lerpHue, easeInOut, type OklchColor } from "@game-library/util";

const SHIMMER_DURATION = 3000;
const TRANSITION_DURATION = 600;

interface LightBarState {
  currentA: OklchColor;
  currentB: OklchColor;
  fromA: OklchColor | null;
  fromB: OklchColor | null;
  toA: OklchColor;
  toB: OklchColor;
  transitionStart: number;
  transitioning: boolean;
  shimmerStart: number;
  animate: boolean;
  rafId: number;
}

const parseStops = (def: GradientDef) => ({
  a: parseOklch(def.stops[0].color.oklch),
  b: parseOklch(def.stops[def.stops.length - 1].color.oklch)
});

const lerpColor = (from: OklchColor, to: OklchColor, t: number): OklchColor => ({
  l: lerp(from.l, to.l, t),
  c: lerp(from.c, to.c, t),
  h: lerpHue(from.h, to.h, t)
});

/**
 * Drives the LightBar's unified animation loop — handles both shimmer position
 * and oklch color transitions in a single persistent rAF, writing directly to
 * the DOM ref to avoid React re-renders disrupting the animation.
 */
export const useLightBarAnimation = (ref: React.RefObject<HTMLDivElement | null>, gradient: GradientDef, animate: boolean) => {
  const state = useRef<LightBarState | null>(null);

  // Lazy-init state on first render
  if (!state.current) {
    const { a, b } = parseStops(gradient);
    state.current = {
      currentA: a,
      currentB: b,
      fromA: null,
      fromB: null,
      toA: a,
      toB: b,
      transitionStart: 0,
      transitioning: false,
      shimmerStart: performance.now(),
      animate,
      rafId: 0
    };
  }

  // Start color transition when gradient changes
  useEffect(() => {
    const s = state.current!;
    const { a, b } = parseStops(gradient);
    s.fromA = { ...s.currentA };
    s.fromB = { ...s.currentB };
    s.toA = a;
    s.toB = b;
    s.transitionStart = performance.now();
    s.transitioning = true;
  }, [gradient]);

  // Sync animate prop
  useEffect(() => {
    state.current!.animate = animate;
  }, [animate]);

  // Persistent rAF loop
  useEffect(() => {
    const s = state.current!;
    let running = true;

    const tick = (now: number) => {
      if (!running) return;
      const el = ref.current;
      if (!el) {
        s.rafId = requestAnimationFrame(tick);
        return;
      }

      // Color transition
      if (s.transitioning && s.fromA && s.fromB) {
        const t = Math.min((now - s.transitionStart) / TRANSITION_DURATION, 1);
        const e = easeInOut(t);
        s.currentA = lerpColor(s.fromA, s.toA, e);
        s.currentB = lerpColor(s.fromB, s.toB, e);
        if (t >= 1) s.transitioning = false;
      }

      // Build gradient
      const a = toOklchString(s.currentA);
      const b = toOklchString(s.currentB);
      el.style.background = `linear-gradient(90deg, ${a}, ${b}, ${a}, ${b})`;

      // Shimmer position
      if (s.animate) {
        el.style.backgroundSize = "300% 100%";
        const phase = ((now - s.shimmerStart) % SHIMMER_DURATION) / SHIMMER_DURATION;
        el.style.backgroundPosition = `${(1 - phase) * 100}% 0%`;
      } else {
        el.style.backgroundSize = "100% 100%";
        el.style.backgroundPosition = "0% 0%";
      }

      s.rafId = requestAnimationFrame(tick);
    };

    s.rafId = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(s.rafId);
    };
  }, []);
};
