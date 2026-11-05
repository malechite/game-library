import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { fadeIn, fadeOut } from "../../../themes/animations.css";

export const drawerOverlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
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

export const drawerContent = style({
  position: "fixed",
  zIndex: 50,
  display: "flex",
  height: "auto",
  flexDirection: "column",
  backgroundColor: "transparent",
  padding: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: vars.spacing[2],
      zIndex: -1,
      borderRadius: vars.radius.xl,
      border: `1px solid ${vars.color.border}`,
      backgroundColor: vars.color.background
    },
    "&[data-vaul-drawer-direction='bottom']": {
      left: 0,
      right: 0,
      bottom: 0,
      marginTop: "96px",
      maxHeight: "80vh"
    },
    "&[data-vaul-drawer-direction='top']": {
      left: 0,
      right: 0,
      top: 0,
      marginBottom: "96px",
      maxHeight: "80vh"
    },
    "&[data-vaul-drawer-direction='left']": {
      top: 0,
      bottom: 0,
      left: 0,
      width: "75%"
    },
    "&[data-vaul-drawer-direction='right']": {
      top: 0,
      bottom: 0,
      right: 0,
      width: "75%"
    }
  },
  "@media": {
    "(min-width: 640px)": {
      selectors: {
        "&[data-vaul-drawer-direction='left']": {
          maxWidth: "384px"
        },
        "&[data-vaul-drawer-direction='right']": {
          maxWidth: "384px"
        }
      }
    }
  }
});

export const drawerHandle = style({
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: vars.spacing[4],
  display: "none",
  height: "6px",
  width: "100px",
  flexShrink: 0,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.muted
});

/* Show handle only when drawer direction is bottom */
globalStyle(`${drawerContent}[data-vaul-drawer-direction='bottom'] > ${drawerHandle}`, {
  display: "block"
});

export const drawerHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[1],
  padding: vars.spacing[4]
});

/* Center header text when drawer is bottom or top */
globalStyle(`${drawerContent}[data-vaul-drawer-direction='bottom'] ${drawerHeader}`, {
  textAlign: "center"
});

globalStyle(`${drawerContent}[data-vaul-drawer-direction='top'] ${drawerHeader}`, {
  textAlign: "center"
});

globalStyle(`${drawerHeader}`, {
  "@media": {
    "(min-width: 768px)": {
      textAlign: "left"
    }
  }
});

export const drawerFooter = style({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[2],
  padding: vars.spacing[4]
});

export const drawerTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.foreground
});

export const drawerDescription = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground
});
