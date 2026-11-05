import { style } from "@vanilla-extract/css";

export const appRoot = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column"
});

export const appLightBar = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 52
});

export const appContent = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  selectors: {
    // Only page content sits in the centered column; full-bleed screens (login) fill the viewport.
    "&[data-has-chrome]": {
      maxWidth: 1280,
      marginInline: "auto"
    }
  }
});
