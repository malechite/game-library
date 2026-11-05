import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { fadeIn, fadeOut, scaleIn, scaleOut } from "../../../themes/animations.css";

export const alertDialogOverlay = style({
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

export const alertDialogContent = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  zIndex: 50,
  display: "grid",
  width: "100%",
  transform: "translate(-50%, -50%)",
  gap: vars.spacing[3],
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.background,
  padding: vars.spacing[4],
  border: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  transition: "all 100ms ease",
  outline: "none",
  selectors: {
    "&[data-size='default']": {
      maxWidth: "320px"
    },
    "&[data-size='sm']": {
      maxWidth: "256px"
    },
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
  },
  "@media": {
    "(min-width: 640px)": {
      selectors: {
        "&[data-size='default']": {
          maxWidth: "384px"
        }
      }
    }
  }
});

export const alertDialogHeader = style({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  placeItems: "center",
  gap: vars.spacing[1],
  textAlign: "center"
});

/* Header with media present */
globalStyle(`${alertDialogHeader}:has([data-slot='alert-dialog-media'])`, {
  gridTemplateRows: "auto auto 1fr",
  columnGap: vars.spacing[4]
});

/* Responsive: default size header alignment */
const alertDialogContentBase = alertDialogContent;

globalStyle(`${alertDialogContentBase}[data-size='default'] ${alertDialogHeader}`, {
  "@media": {
    "(min-width: 640px)": {
      placeItems: "start",
      textAlign: "left"
    }
  }
});

globalStyle(`${alertDialogContentBase}[data-size='default'] ${alertDialogHeader}:has([data-slot='alert-dialog-media'])`, {
  "@media": {
    "(min-width: 640px)": {
      gridTemplateRows: "auto 1fr"
    }
  }
});

export const alertDialogFooter = style({
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

/* sm size footer uses grid layout */
globalStyle(`${alertDialogContentBase}[data-size='sm'] ${alertDialogFooter}`, {
  display: "grid",
  gridTemplateColumns: "1fr 1fr"
});

export const alertDialogMedia = style({
  marginBottom: vars.spacing[2],
  display: "inline-flex",
  width: "32px",
  height: "32px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.muted
});

/* Media spans 2 rows at sm+ for default size */
globalStyle(`${alertDialogContentBase}[data-size='default'] ${alertDialogMedia}`, {
  "@media": {
    "(min-width: 640px)": {
      gridRow: "span 2"
    }
  }
});

globalStyle(`${alertDialogMedia} svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

export const alertDialogTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium
});

/* Title col-start-2 when media is present at sm+ for default size */
globalStyle(`${alertDialogContentBase}[data-size='default']:has([data-slot='alert-dialog-media']) ${alertDialogTitle}`, {
  "@media": {
    "(min-width: 640px)": {
      gridColumnStart: 2
    }
  }
});

export const alertDialogDescription = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  textWrap: "balance",
  color: vars.color.mutedForeground,
  "@media": {
    "(min-width: 768px)": {
      textWrap: "pretty"
    }
  }
});

globalStyle(`${alertDialogDescription} a`, {
  textDecoration: "underline",
  textUnderlineOffset: "3px"
});

globalStyle(`${alertDialogDescription} a:hover`, {
  color: vars.color.foreground
});
