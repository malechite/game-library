import React, { useMemo, type ReactNode } from "react";

export interface GradientStop {
  color: string;
  offset: string;
}

/**
 * Parse a CSS linear-gradient() string into an array of color stops.
 * Returns null if the string is not a valid linear-gradient.
 */
export const parseLinearGradient = (css: string): GradientStop[] | null => {
  const match = css.match(/linear-gradient\((?:in\s+oklch\s+)?([^,]+),\s*(.+)\)/);
  if (!match) return null;

  const stops = match[2]
    .split(/,(?![^(]*\))/)
    .map((stop) => {
      const m = stop.trim().match(/(#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\)|oklch\([^)]+\))\s+(\d+)%/);
      if (m) return { color: m[1], offset: m[2] };
      return null;
    })
    .filter((s): s is GradientStop => s !== null);

  return stops.length > 0 ? stops : null;
};

export interface GradientFillProps {
  /** Unique SVG gradient ID */
  id: string;
  /** CSS linear-gradient() string to parse */
  gradient: string;
  /** Content to render alongside the hidden gradient SVG */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * GradientFill — Renders an invisible SVG `<linearGradient>` definition
 * that child elements can reference via `fill="url(#id)"`.
 *
 * Parses CSS `linear-gradient()` strings into SVG gradient stops.
 *
 * @example
 * <GradientFill id="my-gradient" gradient="linear-gradient(135deg, #CF1900 0%, #DF4400 100%)">
 *   <svg><circle fill="url(#my-gradient)" /></svg>
 * </GradientFill>
 */
export const GradientFill = ({ id, gradient, children, className }: GradientFillProps) => {
  const stops = useMemo(() => parseLinearGradient(gradient), [gradient]);

  if (!stops) return <>{children}</>;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            {stops.map((stop, i) => (
              <stop key={i} offset={`${stop.offset}%`} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
      </svg>
      {children}
    </div>
  );
};
