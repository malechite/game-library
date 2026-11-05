import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const sliderRoot = style({
  selectors: {
    '&[data-orientation="horizontal"]': {
      width: "100%"
    },
    '&[data-orientation="vertical"]': {
      height: "100%"
    }
  }
});

export const sliderControl = style({
  position: "relative",
  display: "flex",
  width: "100%",
  touchAction: "none",
  alignItems: "center",
  userSelect: "none",
  selectors: {
    "&[data-disabled]": {
      opacity: 0.5
    },
    '&[data-orientation="vertical"]': {
      height: "100%",
      minHeight: "10rem",
      width: "auto",
      flexDirection: "column"
    }
  }
});

export const sliderTrack = style({
  position: "relative",
  flexGrow: 1,
  overflow: "hidden",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.muted,
  userSelect: "none",
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: "0.75rem",
      width: "100%"
    },
    '&[data-orientation="vertical"]': {
      height: "100%",
      width: "0.75rem"
    }
  }
});

export const sliderIndicator = style({
  backgroundColor: vars.color.primary,
  userSelect: "none",
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: "100%"
    },
    '&[data-orientation="vertical"]': {
      width: "100%"
    }
  }
});

export const sliderThumb = style({
  display: "block",
  width: "1rem",
  height: "1rem",
  flexShrink: 0,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.primary}`,
  backgroundColor: "white",
  boxShadow: vars.shadow.sm,
  transition: "color",
  userSelect: "none",
  selectors: {
    "&:hover": {
      boxShadow: `0 0 0 4px color-mix(in srgb, ${vars.color.ring} 30%, transparent)`
    },
    "&:focus-visible": {
      boxShadow: `0 0 0 4px color-mix(in srgb, ${vars.color.ring} 30%, transparent)`,
      outline: "none"
    },
    "&:disabled": {
      pointerEvents: "none",
      opacity: 0.5
    }
  }
});
