import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { fadeIn, fadeOut, scaleIn, scaleOut } from "../../../themes/animations.css";

export const tooltipPositioner = style({
  isolation: "isolate",
  zIndex: 50
});

export const tooltipContent = style({
  zIndex: 50,
  display: "inline-flex",
  width: "fit-content",
  maxWidth: "320px",
  transformOrigin: "var(--transform-origin)",
  alignItems: "center",
  gap: "6px",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.foreground,
  paddingLeft: vars.spacing[3],
  paddingRight: vars.spacing[3],
  paddingTop: "6px",
  paddingBottom: "6px",
  fontSize: vars.font.size.xs,
  color: vars.color.background,
  selectors: {
    "&[data-open]": {
      animationName: `${fadeIn}, ${scaleIn}`,
      animationDuration: "150ms",
      animationFillMode: "forwards"
    },
    "&[data-state='delayed-open']": {
      animationName: `${fadeIn}, ${scaleIn}`,
      animationDuration: "150ms",
      animationFillMode: "forwards"
    },
    "&[data-closed]": {
      animationName: `${fadeOut}, ${scaleOut}`,
      animationDuration: "150ms",
      animationFillMode: "forwards"
    }
  }
});

globalStyle(`${tooltipContent}:has([data-slot='kbd'])`, {
  paddingRight: "6px"
});

globalStyle(`${tooltipContent} [data-slot='kbd']`, {
  position: "relative",
  isolation: "isolate",
  zIndex: 50,
  borderRadius: "2px"
});

export const tooltipArrow = style({
  zIndex: 50,
  width: "10px",
  height: "10px",
  transform: "translateY(calc(-50% - 2px)) rotate(45deg)",
  borderRadius: "2px",
  backgroundColor: vars.color.foreground,
  fill: vars.color.foreground,
  selectors: {
    "&[data-side='bottom']": {
      top: "4px"
    },
    "&[data-side='top']": {
      bottom: "-10px"
    },
    "&[data-side='left']": {
      top: "50%",
      right: "-4px",
      transform: "translateY(-50%) rotate(45deg)"
    },
    "&[data-side='right']": {
      top: "50%",
      left: "-4px",
      transform: "translateY(-50%) rotate(45deg)"
    },
    "&[data-side='inline-end']": {
      top: "50%",
      left: "-4px",
      transform: "translateY(-50%) rotate(45deg)"
    },
    "&[data-side='inline-start']": {
      top: "50%",
      right: "-4px",
      transform: "translateY(-50%) rotate(45deg)"
    }
  }
});
