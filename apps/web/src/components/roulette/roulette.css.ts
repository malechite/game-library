import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "@game-library/cinder/theme";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// ─── Stage ────────────────────────────────────────────────────────────────
// The framed area the whole spin happens in. Its height is fixed across the
// phases so the page doesn't jump when the reel gives way to the result.
export const stage = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[5],
  minHeight: 520,
  padding: vars.spacing[8],
  overflow: "hidden",
  textAlign: "center",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.card,
  backgroundImage: `radial-gradient(ellipse at 50% 0%, color-mix(in oklch, ${vars.color.primary} 14%, transparent), transparent 65%)`
});

export const caption = style({
  fontSize: vars.font.size.sm,
  color: vars.color.mutedForeground,
  fontVariantNumeric: "tabular-nums"
});

// Read by screen readers only: the reel itself is hidden from them while it flashes.
export const visuallyHidden = style({
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap"
});

// ─── Start button ─────────────────────────────────────────────────────────
// Cinder's largest button is 32px; the spin button is the page's centerpiece,
// so it is scaled up here. `&&` outranks the recipe's own size classes.
export const startButton = style({
  selectors: {
    "&&": {
      height: 72,
      padding: `0 ${vars.spacing[10]}`,
      gap: vars.spacing[3],
      fontSize: vars.font.size["2xl"],
      borderRadius: vars.radius.full,
      boxShadow: vars.shadow.lg
    }
  }
});

// The button recipe pins its icons to the size of its small label; match the bigger one.
globalStyle(`${startButton}${startButton}[data-size] svg:not([class*='size-'])`, {
  width: "1.5rem",
  height: "1.5rem"
});

// ─── Reel ─────────────────────────────────────────────────────────────────
const reelTick = keyframes({
  // Starts mostly visible: at full speed a title is replaced before the animation ends.
  from: { opacity: 0.6, transform: "translateY(-0.25em)" },
  to: { opacity: 1, transform: "none" }
});

export const reel = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[2],
  width: "100%",
  // Room for a two-line title, so a long name passing by doesn't move the platform line.
  minHeight: "8.5rem"
});

export const reelTitle = style({
  maxWidth: "24ch",
  fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
  fontWeight: vars.font.weight.bold,
  lineHeight: vars.font.lineHeight.tight,
  color: vars.color.foreground,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  animation: `${reelTick} 90ms ease-out`,
  "@media": {
    [REDUCED_MOTION]: { animation: "none" }
  }
});

// ─── Result ───────────────────────────────────────────────────────────────
const reveal = keyframes({
  from: { opacity: 0, transform: "scale(0.92)" },
  to: { opacity: 1, transform: "none" }
});

export const result = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing[4],
  width: "100%"
});

export const resultCover = style({
  width: "min(260px, 60vw)",
  aspectRatio: "1",
  flexShrink: 0,
  overflow: "hidden",
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.xl,
  animation: `${reveal} 360ms ease-out`,
  "@media": {
    [REDUCED_MOTION]: { animation: "none" }
  }
});

export const resultTitle = style({
  maxWidth: "28ch",
  fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
  fontWeight: vars.font.weight.bold,
  lineHeight: vars.font.lineHeight.tight,
  color: vars.color.foreground
});

export const resultActions = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: vars.spacing[3]
});

// ─── History ──────────────────────────────────────────────────────────────
export const history = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[3],
  minWidth: 0
});

export const historyHeading = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.spacing[2],
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.foreground
});

export const historyList = style({
  display: "flex",
  flexDirection: "column",
  margin: 0,
  padding: 0,
  listStyle: "none",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.card,
  overflow: "hidden"
});

export const historyRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[3],
  padding: `${vars.spacing[2]} ${vars.spacing[3]}`,
  selectors: {
    "& + &": { borderTop: `1px solid ${vars.color.border}` }
  }
});

export const historyThumb = style({
  width: 40,
  height: 40,
  flexShrink: 0,
  overflow: "hidden",
  borderRadius: vars.radius.sm
});

export const historyText = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0
});

export const historyTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.foreground,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

export const historyMeta = style({
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});
