import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { scaleIn, scaleOut, fadeIn, fadeOut } from "../../../themes/animations.css";

const triggerBase = style({});

export const comboboxTriggerStyle = style([triggerBase, {}]);

globalStyle(`${triggerBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

export const comboboxTriggerIconStyle = style({
  pointerEvents: "none",
  width: "14px",
  height: "14px",
  color: vars.color.mutedForeground
});

export const comboboxInputGroupStyle = style({
  width: "auto"
});

export const comboboxInputTriggerButtonStyle = style({
  selectors: {
    "&[data-pressed]": {
      backgroundColor: "transparent"
    }
  }
});

export const comboboxPositionerStyle = style({
  isolation: "isolate",
  zIndex: 50
});

const contentBase = style({});

export const comboboxContentStyle = style([
  contentBase,
  {
    position: "relative",
    maxHeight: "var(--available-height)",
    width: "var(--anchor-width)",
    maxWidth: "var(--available-width)",
    minWidth: "calc(var(--anchor-width) + 28px)",
    transformOrigin: "var(--transform-origin)",
    overflow: "hidden",
    borderRadius: vars.radius.lg,
    backgroundColor: vars.color.popover,
    color: vars.color.popoverForeground,
    boxShadow: vars.shadow.md,
    outline: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
    outlineOffset: "-1px",
    transitionDuration: "100ms",
    selectors: {
      "&[data-chips='true']": {
        minWidth: "var(--anchor-width)"
      },
      "&[data-open]": {
        animation: `${scaleIn} 150ms ease, ${fadeIn} 150ms ease`
      },
      "&[data-closed]": {
        animation: `${scaleOut} 150ms ease, ${fadeOut} 150ms ease`
      }
    }
  }
]);

globalStyle(`${contentBase} [data-slot="input-group"]`, {
  margin: vars.spacing[1],
  marginBottom: 0,
  height: "28px",
  border: "none",
  backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
  boxShadow: "none"
});

export const comboboxListStyle = style({
  maxHeight: `min(calc(288px - 36px), calc(var(--available-height) - 36px))`,
  scrollPaddingBlock: vars.spacing[1],
  overflowY: "auto",
  overscrollBehavior: "contain",
  padding: vars.spacing[1],
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "&[data-empty]": {
      padding: 0
    }
  }
});

const itemBase = style({});

export const comboboxItemStyle = style([
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
      "&[data-highlighted]": {
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

globalStyle(`${itemBase}:not([data-variant='destructive'])[data-highlighted] svg`, {
  color: vars.color.accentForeground
});

export const comboboxItemIndicatorStyle = style({
  pointerEvents: "none",
  position: "absolute",
  right: vars.spacing[2],
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const comboboxLabelStyle = style({
  paddingInline: vars.spacing[2],
  paddingBlock: "6px",
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground
});

export const comboboxEmptyStyle = style({
  display: "none",
  width: "100%",
  justifyContent: "center",
  paddingBlock: vars.spacing[2],
  textAlign: "center",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground
});

globalStyle(`[data-empty] .${comboboxEmptyStyle}`, {
  display: "flex"
});

export const comboboxSeparatorStyle = style({
  marginInline: `calc(-1 * ${vars.spacing[1]})`,
  marginBlock: vars.spacing[1],
  height: "1px",
  backgroundColor: `color-mix(in oklch, ${vars.color.border} 50%, transparent)`
});

export const comboboxChipsStyle = style({
  display: "flex",
  minHeight: "28px",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.spacing[1],
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.input}`,
  backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
  backgroundClip: "padding-box",
  paddingInline: vars.spacing[2],
  paddingBlock: "2px",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  transition: "color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
  selectors: {
    "&:focus-within": {
      borderColor: vars.color.ring,
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`
    },
    "&:has([aria-invalid])": {
      borderColor: vars.color.destructive,
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
    },
    "&:has([data-slot='combobox-chip'])": {
      paddingInline: vars.spacing[1]
    }
  }
});

export const comboboxChipStyle = style({
  display: "flex",
  height: "19px",
  width: "fit-content",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[1],
  borderRadius: `calc(${vars.radius.sm} - 2px)`,
  backgroundColor: `color-mix(in oklch, ${vars.color.mutedForeground} 10%, transparent)`,
  paddingInline: "6px",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.medium,
  whiteSpace: "nowrap",
  color: vars.color.foreground,
  selectors: {
    "&:has(:disabled)": {
      pointerEvents: "none",
      cursor: "not-allowed",
      opacity: 0.5
    },
    "&:has([data-slot='combobox-chip-remove'])": {
      paddingRight: 0
    }
  }
});

export const comboboxChipRemoveStyle = style({
  marginLeft: "-4px",
  opacity: 0.5,
  selectors: {
    "&:hover": {
      opacity: 1
    }
  }
});

export const comboboxChipsInputStyle = style({
  minWidth: "64px",
  flex: 1,
  outline: "none"
});
