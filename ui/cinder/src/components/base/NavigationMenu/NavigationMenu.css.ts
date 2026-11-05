import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { scaleIn, scaleOut, fadeIn, fadeOut } from "../../../themes/animations.css";

const navMenuBase = style({});

export const navigationMenuStyle = style([
  navMenuBase,
  {
    position: "relative",
    display: "flex",
    maxWidth: "max-content",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
]);

export const navigationMenuListStyle = style({
  display: "flex",
  flex: 1,
  listStyle: "none",
  alignItems: "center",
  justifyContent: "center",
  gap: 0
});

export const navigationMenuItemStyle = style({
  position: "relative"
});

export const navigationMenuTriggerBaseStyle = style({
  display: "inline-flex",
  height: "36px",
  width: "max-content",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.background,
  paddingInline: "10px",
  paddingBlock: "6px",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.medium,
  transition: "all 150ms ease",
  outline: "none",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.muted
    },
    "&:focus": {
      backgroundColor: vars.color.muted
    },
    "&:focus-visible": {
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`,
      outlineWidth: "1px"
    },
    "&:disabled": {
      pointerEvents: "none",
      opacity: 0.5
    },
    "&[data-popup-open]": {
      backgroundColor: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`
    },
    "&[data-popup-open]:hover": {
      backgroundColor: vars.color.muted
    },
    "&[data-popup-open]:focus": {
      backgroundColor: vars.color.muted
    },
    "&[data-open]": {
      backgroundColor: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`
    },
    "&[data-open]:hover": {
      backgroundColor: vars.color.muted
    },
    "&[data-open]:focus": {
      backgroundColor: vars.color.muted
    }
  }
});

export const navigationMenuTriggerIconStyle = style({
  position: "relative",
  top: "1px",
  marginLeft: vars.spacing[1],
  width: "12px",
  height: "12px",
  transition: "transform 300ms ease",
  selectors: {
    "[data-popup-open] > &": {
      transform: "rotate(180deg)"
    },
    "[data-open] > &": {
      transform: "rotate(180deg)"
    }
  }
});

const contentBase = style({});

export const navigationMenuContentStyle = style([
  contentBase,
  {
    height: "100%",
    width: "auto",
    padding: "6px",
    transition:
      "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), translate 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
    selectors: {
      "&[data-ending-style]": {
        opacity: 0
      },
      "&[data-starting-style]": {
        opacity: 0
      },
      "&[data-ending-style][data-activation-direction='left']": {
        transform: "translateX(50%)"
      },
      "&[data-ending-style][data-activation-direction='right']": {
        transform: "translateX(-50%)"
      },
      "&[data-starting-style][data-activation-direction='left']": {
        transform: "translateX(-50%)"
      },
      "&[data-starting-style][data-activation-direction='right']": {
        transform: "translateX(50%)"
      }
    }
  }
]);

/* Styles for when viewport=false on the parent navigation-menu group */
globalStyle(`[data-viewport='false'] ${contentBase}`, {
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.popover,
  color: vars.color.popoverForeground,
  boxShadow: vars.shadow.md,
  outline: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  outlineOffset: "-1px",
  transitionDuration: "300ms"
});

globalStyle(`[data-viewport='false'] ${contentBase}[data-open]`, {
  animation: `${scaleIn} 150ms ease, ${fadeIn} 150ms ease`
});

globalStyle(`[data-viewport='false'] ${contentBase}[data-closed]`, {
  animation: `${scaleOut} 150ms ease, ${fadeOut} 150ms ease`
});

/* Link styles inside content should not have focus ring */
globalStyle(`${contentBase} [data-slot="navigation-menu-link"]:focus`, {
  boxShadow: "none",
  outline: "none"
});

export const navigationMenuPositionerStyle = style({
  isolation: "isolate",
  zIndex: 50,
  height: "var(--positioner-height)",
  width: "var(--positioner-width)",
  maxWidth: "var(--available-width)",
  transition:
    "top 0.35s cubic-bezier(0.22, 1, 0.36, 1), left 0.35s cubic-bezier(0.22, 1, 0.36, 1), right 0.35s cubic-bezier(0.22, 1, 0.36, 1), bottom 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&[data-instant]": {
      transition: "none"
    }
  }
});

export const navigationMenuPopupStyle = style({
  position: "relative",
  height: "var(--popup-height)",
  width: "var(--popup-width)",
  transformOrigin: "var(--transform-origin)",
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.popover,
  color: vars.color.popoverForeground,
  boxShadow: vars.shadow.md,
  outline: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  outlineOffset: "-1px",
  transition:
    "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), width 0.35s cubic-bezier(0.22, 1, 0.36, 1), height 0.35s cubic-bezier(0.22, 1, 0.36, 1), scale 0.35s cubic-bezier(0.22, 1, 0.36, 1), translate 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
  selectors: {
    "&[data-ending-style]": {
      transform: "scale(0.9)",
      opacity: 0,
      transitionTimingFunction: "ease",
      transitionDuration: "150ms"
    },
    "&[data-starting-style]": {
      transform: "scale(0.9)",
      opacity: 0
    }
  }
});

export const navigationMenuViewportStyle = style({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden"
});

export const navigationMenuLinkStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  borderRadius: vars.radius.lg,
  padding: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  transition: "all 150ms ease",
  outline: "none",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.muted
    },
    "&:focus": {
      backgroundColor: vars.color.muted
    },
    "&:focus-visible": {
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`,
      outlineWidth: "1px"
    },
    "&[data-active='true']": {
      backgroundColor: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`
    },
    "&[data-active='true']:hover": {
      backgroundColor: vars.color.muted
    },
    "&[data-active='true']:focus": {
      backgroundColor: vars.color.muted
    }
  }
});

globalStyle(`${navigationMenuLinkStyle} svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

export const navigationMenuIndicatorStyle = style({
  top: "100%",
  zIndex: 1,
  display: "flex",
  height: "6px",
  alignItems: "flex-end",
  justifyContent: "center",
  overflow: "hidden",
  selectors: {
    "&[data-state='hidden']": {
      animation: `${fadeOut} 150ms ease`
    },
    "&[data-state='visible']": {
      animation: `${fadeIn} 150ms ease`
    }
  }
});

export const navigationMenuIndicatorArrowStyle = style({
  position: "relative",
  top: "60%",
  width: "8px",
  height: "8px",
  transform: "rotate(45deg)",
  borderTopLeftRadius: "2px",
  backgroundColor: vars.color.border,
  boxShadow: vars.shadow.md
});
