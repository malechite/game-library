import { style } from "@vanilla-extract/css";
import { vars } from "@game-library/cinder/theme";

export const pageHeader = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.spacing[3],
  width: "100%"
});

// Two-column grid: the icon shares the title's row (so it lines up with the
// heading text, not the title + subtitle block) and the subtitle spans both
// columns, starting flush left under the icon.
export const titleBlock = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: vars.spacing[1],
  alignItems: "center",
  minWidth: 0,
  selectors: {
    "&[data-has-icon]": {
      gridTemplateColumns: "auto 1fr",
      columnGap: vars.spacing[3]
    }
  }
});

export const iconCell = style({
  gridColumn: 1,
  gridRow: 1,
  display: "inline-flex",
  alignItems: "center"
});

export const titleCell = style({
  gridRow: 1,
  minWidth: 0,
  selectors: {
    [`${titleBlock}[data-has-icon] &`]: { gridColumn: 2 }
  }
});

export const subtitleCell = style({
  gridRow: 2,
  gridColumn: "1 / -1",
  color: vars.color.mutedForeground
});

export const actions = style({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[2],
  flexShrink: 0
});
