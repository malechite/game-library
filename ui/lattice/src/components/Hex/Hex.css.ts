import { style } from "@vanilla-extract/css";

export const hexCell = style({
  position: "absolute",
  pointerEvents: "none"
});

export const hexContent = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "auto"
});
