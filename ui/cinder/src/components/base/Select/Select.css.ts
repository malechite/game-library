import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";
import { scaleIn, scaleOut, fadeIn, fadeOut } from "../../../themes/animations.css";

const triggerBase = style({});

export const selectGroupStyle = style({
  padding: vars.spacing[1],
  scrollMarginBlock: vars.spacing[1]
});

export const selectValueStyle = style({
  display: "flex",
  flex: 1,
  textAlign: "left"
});

export const selectTriggerRecipe = recipe({
  base: [
    triggerBase,
    {
      display: "flex",
      width: "fit-content",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "6px",
      borderRadius: vars.radius.md,
      border: `1px solid ${vars.color.input}`,
      backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
      paddingInline: vars.spacing[2],
      paddingBlock: "6px",
      fontSize: vars.font.size.xs,
      lineHeight: vars.font.lineHeight.relaxed,
      whiteSpace: "nowrap",
      transition: "color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
      outline: "none",
      selectors: {
        "&:focus-visible": {
          borderColor: vars.color.ring,
          boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`
        },
        "&:disabled": {
          cursor: "not-allowed",
          opacity: 0.5
        },
        "&[aria-invalid]": {
          borderColor: vars.color.destructive,
          boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
        },
        "&[data-placeholder]": {
          color: vars.color.mutedForeground
        }
      }
    }
  ],
  variants: {
    size: {
      default: { height: "28px" },
      sm: { height: "24px" }
    }
  },
  defaultVariants: {
    size: "default"
  }
});

globalStyle(`${triggerBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${triggerBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${triggerBase} [data-slot="select-value"]`, {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

export const selectIconStyle = style({
  pointerEvents: "none",
  width: "14px",
  height: "14px",
  color: vars.color.mutedForeground
});

export const selectPositionerStyle = style({
  isolation: "isolate",
  // Above the modal layer (overlay 50 / content 51) so the popup shows over modals.
  zIndex: 60
});

const contentBase = style({});

export const selectContentStyle = style([
  contentBase,
  {
    position: "relative",
    isolation: "isolate",
    zIndex: 50,
    maxHeight: "var(--available-height)",
    width: "var(--anchor-width)",
    minWidth: "128px",
    transformOrigin: "var(--transform-origin)",
    overflowX: "hidden",
    overflowY: "auto",
    borderRadius: vars.radius.lg,
    backgroundColor: vars.color.popover,
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
      },
      "&[data-align-trigger='true']": {
        animationName: "none"
      }
    }
  }
]);

export const selectLabelStyle = style({
  paddingInline: vars.spacing[2],
  paddingBlock: "6px",
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground
});

const itemBase = style({});

export const selectItemStyle = style([
  itemBase,
  {
    position: "relative",
    display: "flex",
    minHeight: "28px",
    width: "100%",
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

globalStyle(`${itemBase}:focus svg`, {
  color: vars.color.accentForeground
});

export const selectItemTextStyle = style({
  display: "flex",
  flex: 1,
  flexShrink: 0,
  gap: vars.spacing[2],
  whiteSpace: "nowrap"
});

export const selectItemIndicatorStyle = style({
  pointerEvents: "none",
  position: "absolute",
  right: vars.spacing[2],
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const selectSeparatorStyle = style({
  pointerEvents: "none",
  marginInline: `calc(-1 * ${vars.spacing[1]})`,
  marginBlock: vars.spacing[1],
  height: "1px",
  backgroundColor: `color-mix(in oklch, ${vars.color.border} 50%, transparent)`
});

export const selectScrollButtonStyle = style({
  zIndex: 10,
  display: "flex",
  width: "100%",
  cursor: "default",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.color.popover,
  paddingBlock: vars.spacing[1]
});

globalStyle(`${selectScrollButtonStyle} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});
