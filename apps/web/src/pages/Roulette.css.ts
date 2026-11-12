import { style } from "@vanilla-extract/css";
import { vars } from "@game-library/cinder/theme";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[5],
  width: "100%",
  padding: vars.spacing[6]
});

// The stage, with the pick history beside it on wide screens and below it on narrow ones.
export const layout = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 340px",
  alignItems: "start",
  gap: vars.spacing[6],
  "@media": {
    "(max-width: 960px)": { gridTemplateColumns: "minmax(0, 1fr)" }
  }
});
