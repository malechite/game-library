import { style } from "@vanilla-extract/css";
import { vars } from "@game-library/cinder/theme";

// ─── Grid ──────────────────────────────────────────────────────────────

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
  gap: vars.spacing[4],
  width: "100%"
});

// ─── Tile ──────────────────────────────────────────────────────────────

// Overrides cinder Card's padding/gap: the cover runs edge to edge.
export const tile = style({
  position: "relative",
  aspectRatio: "1 / 1",
  padding: "0 !important",
  gap: "0 !important",
  cursor: "pointer",
  outline: "none",
  transition: "box-shadow 200ms ease, transform 200ms ease",
  selectors: {
    "&:hover, &:focus-visible": {
      transform: "translateY(-2px)",
      boxShadow: `0 0 0 1px color-mix(in oklch, ${vars.color.primary} 70%, transparent), 0 10px 24px -12px rgba(0, 0, 0, 0.7)`
    }
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
      selectors: { "&:hover, &:focus-visible": { transform: "none" } }
    }
  }
});

// Title + platform + value over a scrim at the bottom of the cover.
export const tileInfo = style({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: `${vars.spacing[8]} ${vars.spacing[3]} ${vars.spacing[3]}`,
  background: "linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.72) 45%, transparent 100%)",
  pointerEvents: "none"
});

export const tileTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  color: vars.color.foreground,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden"
});

export const tileMeta = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.spacing[2],
  fontSize: vars.font.size.xs,
  color: `color-mix(in oklch, ${vars.color.foreground} 70%, transparent)`
});

export const tilePlatform = style({
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

export const tileValue = style({
  flexShrink: 0,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.foreground,
  fontVariantNumeric: "tabular-nums"
});

export const tileBadge = style({
  position: "absolute",
  top: vars.spacing[2],
  left: vars.spacing[2]
});

// Favorite heart + "⋮" menu, top right of the tile.
export const tileControls = style({
  position: "absolute",
  top: vars.spacing[2],
  right: vars.spacing[2],
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[1]
});

// A round control button: quiet until the tile is hovered or focused — except a
// favorited heart, which stays visible so favorites can be spotted at a glance.
export const tileControl = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  padding: 0,
  borderRadius: vars.radius.full,
  border: "none",
  color: vars.color.foreground,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  backdropFilter: "blur(6px)",
  cursor: "pointer",
  opacity: 0,
  transition: "opacity 160ms ease, background-color 160ms ease, transform 160ms ease",
  selectors: {
    [`${tile}:hover &, ${tile}:focus-within &, &[data-popup-open], &[data-favorite]`]: { opacity: 1 },
    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
    "&:active": { transform: "scale(0.9)" }
  },
  "@media": {
    // No hover on touch devices: keep the controls reachable.
    "(hover: none)": { opacity: 1 }
  }
});

// ─── Skeleton (loading) ────────────────────────────────────────────────

export const tileSkeleton = style({
  aspectRatio: "1 / 1",
  borderRadius: vars.radius.lg
});
