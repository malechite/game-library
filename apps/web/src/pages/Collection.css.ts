import { style } from "@vanilla-extract/css";
import { colors } from "@game-library/tokens";
import { vars } from "@game-library/cinder/theme";

// The collection's worth, in the palette's emerald (jade).
export const totalValue = style({
  color: colors.jade[400].oklch,
  fontWeight: vars.font.weight.medium,
  fontVariantNumeric: "tabular-nums"
});

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[5],
  width: "100%",
  padding: vars.spacing[6]
});

// While the next page loads, the previous one stays on screen, slightly dimmed.
export const content = style({
  minHeight: 320,
  transition: "opacity 200ms ease",
  selectors: {
    "&[data-refreshing]": { opacity: 0.6 }
  }
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[4],
  flexWrap: "wrap"
});

export const range = style({
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground,
  fontVariantNumeric: "tabular-nums"
});

export const footerPagination = style({
  marginLeft: "auto"
});

export const viewToggleIcon = style({
  display: "inline-flex"
});
