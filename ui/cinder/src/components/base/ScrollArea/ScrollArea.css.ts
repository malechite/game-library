import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const scrollAreaRoot = style({
  position: "relative"
});

export const scrollAreaViewport = style({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  transition: "color, box-shadow",
  outline: "none",
  selectors: {
    "&:focus-visible": {
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.ring} 50%, transparent)`,
      outlineWidth: "1px"
    }
  }
});

export const scrollBarStyle = style({
  display: "flex",
  touchAction: "none",
  padding: "1px",
  transition: "color",
  userSelect: "none",
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: "0.625rem",
      flexDirection: "column",
      borderTop: "1px solid transparent"
    },
    '&[data-orientation="vertical"]': {
      height: "100%",
      width: "0.625rem",
      borderLeft: "1px solid transparent"
    }
  }
});

export const scrollThumbStyle = style({
  position: "relative",
  flex: 1,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.border
});
