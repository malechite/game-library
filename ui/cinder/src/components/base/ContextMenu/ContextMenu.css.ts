import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { scaleIn, scaleOut, fadeIn, fadeOut } from "../../../themes/animations.css";

export const contextMenuTriggerStyle = style({
  userSelect: "none"
});

export const contextMenuPositionerStyle = style({
  isolation: "isolate",
  zIndex: 50,
  outline: "none"
});

export const contextMenuContentStyle = style({
  zIndex: 50,
  maxHeight: "var(--available-height)",
  minWidth: "128px",
  transformOrigin: "var(--transform-origin)",
  overflowX: "hidden",
  overflowY: "auto",
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

export const contextMenuLabelStyle = style({
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

const itemBase = style({});

export const contextMenuItemStyle = style([
  itemBase,
  {
    position: "relative",
    display: "flex",
    minHeight: "28px",
    cursor: "default",
    alignItems: "center",
    gap: vars.spacing[2],
    borderRadius: vars.radius.md,
    paddingInline: vars.spacing[2],
    paddingBlock: vars.spacing[1],
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
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
      "&[data-variant='destructive']": {
        color: vars.color.destructive
      },
      "&[data-variant='destructive']:focus": {
        backgroundColor: `color-mix(in oklch, ${vars.color.destructive} 10%, transparent)`,
        color: vars.color.destructive
      },
      "&[data-disabled]": {
        pointerEvents: "none",
        opacity: 0.5
      }
    }
  }
]);

globalStyle(`${itemBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${itemBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${itemBase}:not([data-variant='destructive']):focus svg`, {
  color: vars.color.accentForeground
});

globalStyle(`${itemBase}[data-variant='destructive'] svg`, {
  color: vars.color.destructive
});

const subTriggerBase = style({});

export const contextMenuSubTriggerStyle = style([
  subTriggerBase,
  {
    display: "flex",
    minHeight: "28px",
    cursor: "default",
    alignItems: "center",
    gap: vars.spacing[2],
    borderRadius: vars.radius.md,
    paddingInline: vars.spacing[2],
    paddingBlock: vars.spacing[1],
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
      "&[data-open]": {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground
      }
    }
  }
]);

globalStyle(`${subTriggerBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${subTriggerBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${subTriggerBase}:not([data-variant='destructive']):focus svg`, {
  color: vars.color.accentForeground
});

export const contextMenuSubContentStyle = style({
  boxShadow: vars.shadow.lg
});

const checkboxItemBase = style({});

export const contextMenuCheckboxItemStyle = style([
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
    paddingRight: vars.spacing[8],
    paddingLeft: vars.spacing[2],
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

globalStyle(`${checkboxItemBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${checkboxItemBase}:focus svg`, {
  color: vars.color.accentForeground
});

export const contextMenuIndicatorWrapperStyle = style({
  pointerEvents: "none",
  position: "absolute",
  right: vars.spacing[2],
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const radioItemBase = style({});

export const contextMenuRadioItemStyle = style([
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
    paddingRight: vars.spacing[8],
    paddingLeft: vars.spacing[2],
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

export const contextMenuSeparatorStyle = style({
  marginInline: `calc(-1 * ${vars.spacing[1]})`,
  marginBlock: vars.spacing[1],
  height: "1px",
  backgroundColor: `color-mix(in oklch, ${vars.color.border} 50%, transparent)`
});

export const contextMenuShortcutStyle = style({
  marginLeft: "auto",
  fontSize: "0.625rem",
  letterSpacing: "0.1em",
  color: vars.color.mutedForeground
});

export const contextMenuCaretRightStyle = style({
  marginLeft: "auto"
});
