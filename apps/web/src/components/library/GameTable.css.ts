import { style } from "@vanilla-extract/css";
import { vars } from "@game-library/cinder/theme";

export const row = style({
  cursor: "pointer"
});

export const thumb = style({
  width: 40,
  height: 40,
  borderRadius: vars.radius.sm,
  overflow: "hidden",
  flexShrink: 0
});

export const titleCell = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[3],
  minWidth: 0
});

export const titleText = style({
  fontWeight: vars.font.weight.medium,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: 360
});

export const muted = style({
  color: vars.color.mutedForeground
});

export const numeric = style({
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap"
});

export const genres = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.spacing[1]
});

// Favorite heart + "⋮" menu at the end of a row.
export const rowControls = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[1]
});

export const rowActions = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  padding: 0,
  borderRadius: vars.radius.md,
  border: "none",
  background: "none",
  color: vars.color.mutedForeground,
  cursor: "pointer",
  selectors: {
    "&:hover, &[data-popup-open]": { color: vars.color.foreground, backgroundColor: vars.color.muted }
  }
});
