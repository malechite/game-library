import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { scaleIn, scaleOut, fadeIn, fadeOut } from "../../../themes/animations.css";

export const menubarStyle = style({
  display: "flex",
  height: "36px",
  alignItems: "center",
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
  padding: vars.spacing[1]
});

export const menubarTriggerStyle = style({
  display: "flex",
  alignItems: "center",
  borderRadius: `calc(${vars.radius.md} - 2px)`,
  paddingInline: vars.spacing[2],
  paddingBlock: "3.4px",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.medium,
  outline: "none",
  userSelect: "none",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.muted
    },
    "&[aria-expanded='true']": {
      backgroundColor: vars.color.muted
    }
  }
});

export const menubarContentStyle = style({
  minWidth: "128px",
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.popover,
  padding: vars.spacing[1],
  color: vars.color.popoverForeground,
  boxShadow: vars.shadow.md,
  outline: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  outlineOffset: "-1px",
  transitionDuration: "100ms",
  selectors: {
    "&[data-open]": {
      animation: `${scaleIn} 150ms ease, ${fadeIn} 150ms ease`
    }
  }
});

const menubarItemBase = style({});

export const menubarItemStyle = style([
  menubarItemBase,
  {
    minHeight: "28px",
    gap: vars.spacing[2],
    borderRadius: vars.radius.md,
    paddingInline: vars.spacing[2],
    paddingBlock: vars.spacing[1],
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
    selectors: {
      "&:focus": {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground
      },
      "&[data-inset]": {
        paddingLeft: "30px"
      },
      "&[data-variant='destructive']": {
        color: vars.color.destructive
      },
      "&[data-variant='destructive']:focus": {
        backgroundColor: `color-mix(in oklch, ${vars.color.destructive} 10%, transparent)`,
        color: vars.color.destructive
      },
      "&[data-disabled]": {
        opacity: 0.5
      }
    }
  }
]);

globalStyle(`${menubarItemBase}:not([data-variant='destructive']):focus svg`, {
  color: vars.color.accentForeground
});

globalStyle(`${menubarItemBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${menubarItemBase}[data-variant='destructive'] svg`, {
  color: `${vars.color.destructive} !important`
});

const checkboxItemBase = style({});

export const menubarCheckboxItemStyle = style([
  checkboxItemBase,
  {
    position: "relative",
    display: "flex",
    minHeight: "28px",
    cursor: "default",
    alignItems: "center",
    gap: vars.spacing[2],
    borderRadius: vars.radius.md,
    paddingBlock: "6px",
    paddingRight: vars.spacing[2],
    paddingLeft: "30px",
    fontSize: vars.font.size.xs,
    outline: "none",
    userSelect: "none",
    selectors: {
      "&:focus": {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground
      },
      "&[data-inset]": {
        paddingLeft: "30px"
      },
      "&[data-disabled]": {
        pointerEvents: "none",
        opacity: 0.5
      }
    }
  }
]);

globalStyle(`${checkboxItemBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${checkboxItemBase}:focus svg`, {
  color: vars.color.accentForeground
});

export const menubarCheckboxIndicatorWrapperStyle = style({
  pointerEvents: "none",
  position: "absolute",
  left: vars.spacing[2],
  display: "flex",
  width: "16px",
  height: "16px",
  alignItems: "center",
  justifyContent: "center"
});

globalStyle(`${menubarCheckboxIndicatorWrapperStyle} svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

const radioItemBase = style({});

export const menubarRadioItemStyle = style([
  radioItemBase,
  {
    position: "relative",
    display: "flex",
    minHeight: "28px",
    cursor: "default",
    alignItems: "center",
    gap: vars.spacing[2],
    borderRadius: vars.radius.md,
    paddingBlock: "6px",
    paddingRight: vars.spacing[2],
    paddingLeft: "30px",
    fontSize: vars.font.size.xs,
    outline: "none",
    userSelect: "none",
    selectors: {
      "&:focus": {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground
      },
      "&[data-inset]": {
        paddingLeft: "30px"
      },
      "&[data-disabled]": {
        pointerEvents: "none",
        opacity: 0.5
      }
    }
  }
]);

globalStyle(`${radioItemBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${radioItemBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${radioItemBase}:focus svg`, {
  color: vars.color.accentForeground
});

export const menubarRadioIndicatorWrapperStyle = style({
  pointerEvents: "none",
  position: "absolute",
  left: vars.spacing[2],
  display: "flex",
  width: "16px",
  height: "16px",
  alignItems: "center",
  justifyContent: "center"
});

globalStyle(`${menubarRadioIndicatorWrapperStyle} svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

export const menubarLabelStyle = style({
  paddingInline: vars.spacing[2],
  paddingBlock: "6px",
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground,
  selectors: {
    "&[data-inset]": {
      paddingLeft: "30px"
    }
  }
});

export const menubarSeparatorStyle = style({
  marginInline: `calc(-1 * ${vars.spacing[1]})`,
  marginBlock: vars.spacing[1],
  height: "1px",
  backgroundColor: `color-mix(in oklch, ${vars.color.border} 50%, transparent)`
});

export const menubarShortcutStyle = style({
  marginLeft: "auto",
  fontSize: "0.625rem",
  letterSpacing: "0.1em",
  color: vars.color.mutedForeground
});

export const menubarSubTriggerStyle = style({
  minHeight: "28px",
  gap: vars.spacing[2],
  borderRadius: vars.radius.md,
  paddingInline: vars.spacing[2],
  paddingBlock: vars.spacing[1],
  fontSize: vars.font.size.xs,
  selectors: {
    "&:focus": {
      backgroundColor: vars.color.accent,
      color: vars.color.accentForeground
    },
    "&[data-inset]": {
      paddingLeft: "30px"
    },
    "&[data-open]": {
      backgroundColor: vars.color.accent,
      color: vars.color.accentForeground
    }
  }
});

globalStyle(`${menubarSubTriggerStyle}:not([data-variant='destructive']):focus svg`, {
  color: vars.color.accentForeground
});

globalStyle(`${menubarSubTriggerStyle} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

export const menubarSubContentStyle = style({
  minWidth: "128px",
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.popover,
  padding: vars.spacing[1],
  color: vars.color.popoverForeground,
  boxShadow: vars.shadow.md,
  outline: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  outlineOffset: "-1px",
  transitionDuration: "100ms",
  selectors: {
    "&[data-open]": {
      animation: `${scaleIn} 150ms ease, ${fadeIn} 150ms ease`
    },
    "&[data-closed]": {
      animation: `${scaleOut} 150ms ease, ${fadeOut} 150ms ease`
    }
  }
});
