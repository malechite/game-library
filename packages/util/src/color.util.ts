// ─── OKLCH Types ─────────────────────────────────────────────────────

export interface OklchColor {
  l: number;
  c: number;
  h: number;
}

// ─── Parsing ─────────────────────────────────────────────────────────

export const parseOklch = (oklch: string): OklchColor => {
  const m = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  return m ? { l: +m[1], c: +m[2], h: +m[3] } : { l: 0, c: 0, h: 0 };
};

export const toOklchString = (c: OklchColor) => `oklch(${c.l} ${c.c} ${c.h})`;

// ─── Interpolation ──────────────────────────────────────────────────

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const lerpHue = (a: number, b: number, t: number) => {
  let d = b - a;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return (((a + d * t) % 360) + 360) % 360;
};

export const lerpOklch = (from: OklchColor, to: OklchColor, t: number): OklchColor => ({
  l: lerp(from.l, to.l, t),
  c: lerp(from.c, to.c, t),
  h: lerpHue(from.h, to.h, t)
});

// ─── Easing ──────────────────────────────────────────────────────────

export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
