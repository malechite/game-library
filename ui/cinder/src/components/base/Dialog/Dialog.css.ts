import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { fadeIn, fadeOut, scaleIn, scaleOut } from "../../../themes/animations.css";

export const dialogOverlay = style({
  position: "fixed",
  inset: 0,
  isolation: "isolate",
  zIndex: 50,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  transition: "all 100ms ease",
  "@supports": {
    "(backdrop-filter: blur(4px))": {
      backdropFilter: "blur(4px)"
    }
  },
  selectors: {
    "&[data-open]": {
      animationName: fadeIn,
      animationDuration: "150ms",
      animationFillMode: "forwards"
    },
    "&[data-closed]": {
      animationName: fadeOut,
      animationDuration: "150ms",
      animationFillMode: "forwards"
    }
  }
});

export const dialogContent = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  zIndex: 50,
  display: "grid",
  width: "100%",
  maxWidth: "calc(100% - 2rem)",
  transform: "translate(-50%, -50%)",
  gap: vars.spacing[4],
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.background,
  padding: vars.spacing[4],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  border: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  transition: "all 100ms ease",
  outline: "none",
  "@media": {
    "(min-width: 640px)": {
      maxWidth: "384px"
    }
  },
  selectors: {
    "&[data-open]": {
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

export const dialogCloseButton = style({
  position: "absolute",
  top: vars.spacing[2],
  right: vars.spacing[2]
});

export const dialogHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[1]
});

export const dialogFooter = style({
  display: "flex",
  flexDirection: "column-reverse",
  gap: vars.spacing[2],
  "@media": {
    "(min-width: 640px)": {
      flexDirection: "row",
      justifyContent: "flex-end"
    }
  }
});

export const dialogTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium
});

export const dialogDescription = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground
});

globalStyle(`${dialogDescription} a`, {
  textDecoration: "underline",
  textUnderlineOffset: "3px"
});

globalStyle(`${dialogDescription} a:hover`, {
  color: vars.color.foreground
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0
});
