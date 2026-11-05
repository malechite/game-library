import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const sheetOverlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  transition: "opacity 150ms ease",
  "@supports": {
    "(backdrop-filter: blur(4px))": {
      backdropFilter: "blur(4px)"
    }
  },
  selectors: {
    "&[data-ending-style]": {
      opacity: 0
    },
    "&[data-starting-style]": {
      opacity: 0
    }
  }
});

const sheetContentBase = style({
  position: "fixed",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.background,
  backgroundClip: "padding-box",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  boxShadow: vars.shadow.lg,
  transition: "all 200ms ease-in-out",
  selectors: {
    "&[data-ending-style]": {
      opacity: 0
    },
    "&[data-starting-style]": {
      opacity: 0
    }
  }
});

export const sheetContentRight = style([
  sheetContentBase,
  {
    top: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    width: "75%",
    borderLeft: `1px solid ${vars.color.border}`,
    "@media": {
      "(min-width: 640px)": {
        maxWidth: "384px"
      }
    },
    selectors: {
      "&[data-ending-style]": {
        transform: "translateX(2.5rem)"
      },
      "&[data-starting-style]": {
        transform: "translateX(2.5rem)"
      }
    }
  }
]);

export const sheetContentLeft = style([
  sheetContentBase,
  {
    top: 0,
    bottom: 0,
    left: 0,
    height: "100%",
    width: "75%",
    borderRight: `1px solid ${vars.color.border}`,
    "@media": {
      "(min-width: 640px)": {
        maxWidth: "384px"
      }
    },
    selectors: {
      "&[data-ending-style]": {
        transform: "translateX(-2.5rem)"
      },
      "&[data-starting-style]": {
        transform: "translateX(-2.5rem)"
      }
    }
  }
]);

export const sheetContentTop = style([
  sheetContentBase,
  {
    top: 0,
    left: 0,
    right: 0,
    height: "auto",
    borderBottom: `1px solid ${vars.color.border}`,
    selectors: {
      "&[data-ending-style]": {
        transform: "translateY(-2.5rem)"
      },
      "&[data-starting-style]": {
        transform: "translateY(-2.5rem)"
      }
    }
  }
]);

export const sheetContentBottom = style([
  sheetContentBase,
  {
    bottom: 0,
    left: 0,
    right: 0,
    height: "auto",
    borderTop: `1px solid ${vars.color.border}`,
    selectors: {
      "&[data-ending-style]": {
        transform: "translateY(2.5rem)"
      },
      "&[data-starting-style]": {
        transform: "translateY(2.5rem)"
      }
    }
  }
]);

export const sheetCloseButton = style({
  position: "absolute",
  top: vars.spacing[4],
  right: vars.spacing[4]
});

export const sheetHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: vars.spacing[6]
});

export const sheetFooter = style({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[2],
  padding: vars.spacing[6]
});

export const sheetTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.foreground
});

export const sheetDescription = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground
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

export const sheetContentStyles = {
  right: sheetContentRight,
  left: sheetContentLeft,
  top: sheetContentTop,
  bottom: sheetContentBottom
} as const;
