import { useRef, useState, useEffect } from "react";
import type { GradientDef } from "@game-library/tokens";
import { parseOklch, toOklchString, lerpOklch, easeInOut, type OklchColor } from "@game-library/util";

export interface GradientTransitionOptions {
  /** Transition duration in ms (default 600) */
  duration?: number;
  /** Custom CSS builder. Receives interpolated oklch strings per stop. Default builds a linear-gradient. */
  buildCss?: (stops: string[], positions: string[], angle: number) => string;
}

export interface GradientTransitionResult {
  /** The current interpolated CSS gradient string */
  css: string;
  /** Whether a transition is in progress */
  transitioning: boolean;
}

const defaultBuildCss = (stops: string[], positions: string[], angle: number) =>
  `linear-gradient(${angle}deg, ${stops.map((s, i) => `${s} ${positions[i]}`).join(", ")})`;

/**
 * Animates between gradient definitions by interpolating oklch stop colors per-frame via rAF.
 *
 * @param gradient - The target GradientDef to transition to
 * @param angle - The gradient angle to use in the output CSS
 * @param options - Configuration (duration, custom CSS builder)
 */
export const useGradientTransition = (
  gradient: GradientDef,
  angle: number,
  { duration = 600, buildCss = defaultBuildCss }: GradientTransitionOptions = {}
): GradientTransitionResult => {
  const positions = gradient.stops.map((s) => s.position);
  const targetColors = gradient.stops.map((s) => parseOklch(s.color.oklch));

  const prevColors = useRef(targetColors);
  const rafId = useRef(0);
  const startTime = useRef(0);

  const makeCss = (colors: OklchColor[]) => buildCss(colors.map(toOklchString), positions, angle);

  const [css, setCss] = useState(() => makeCss(targetColors));
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const from = prevColors.current;
    const to = targetColors;

    const isSame = from.length === to.length && from.every((f, i) => f.l === to[i].l && f.c === to[i].c && f.h === to[i].h);
    if (isSame) return;

    cancelAnimationFrame(rafId.current);
    startTime.current = performance.now();
    setTransitioning(true);

    const animate = (now: number) => {
      const t = Math.min((now - startTime.current) / duration, 1);
      const eased = easeInOut(t);
      const interpolated = from.map((f, i) => lerpOklch(f, to[i], eased));

      setCss(makeCss(interpolated));

      if (t < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        prevColors.current = to;
        setTransitioning(false);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [gradient]);

  return { css, transitioning };
};
