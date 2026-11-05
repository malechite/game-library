import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const commandStyle = style({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.popover,
  padding: vars.spacing[1],
  color: vars.color.popoverForeground
});

export const commandDialogContentStyle = style({
  top: "33.333%",
  transform: "translateY(0)",
  overflow: "hidden",
  borderRadius: `${vars.radius.xl} !important`,
  padding: "0 !important"
});

export const commandInputWrapperStyle = style({
  padding: vars.spacing[1],
  paddingBottom: 0
});

export const commandInputGroupStyle = style({
  height: "32px !important",
  backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`
});

export const commandInputStyle = style({
  width: "100%",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  outline: "none",
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5
    }
  }
});

export const commandSearchIconStyle = style({
  width: "14px",
  height: "14px",
  flexShrink: 0,
  opacity: 0.5
});

export const commandListStyle = style({
  maxHeight: "288px",
  scrollPaddingBlock: vars.spacing[1],
  overflowX: "hidden",
  overflowY: "auto",
  outline: "none",
  /* Hide scrollbar */
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
});

export const commandEmptyStyle = style({
  paddingBlock: vars.spacing[6],
  textAlign: "center",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed
});

const commandGroupBase = style({});

export const commandGroupStyle = style([
  commandGroupBase,
  {
    overflow: "hidden",
    padding: vars.spacing[1],
    color: vars.color.foreground
  }
]);

globalStyle(`${commandGroupBase} [cmdk-group-heading]`, {
  paddingInline: "10px",
  paddingBlock: "6px",
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.mutedForeground
});

const commandItemBase = style({});

export const commandItemStyle = style([
  commandItemBase,
  {
    position: "relative",
    display: "flex",
    minHeight: "28px",
    cursor: "default",
    alignItems: "center",
    gap: vars.spacing[2],
    borderRadius: vars.radius.md,
    paddingInline: "10px",
    paddingBlock: "6px",
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
    outline: "none",
    userSelect: "none",
    selectors: {
      "&[data-disabled='true']": {
        pointerEvents: "none",
        opacity: 0.5
      },
      "&[data-selected='true']": {
        backgroundColor: vars.color.muted,
        color: vars.color.foreground
      }
    }
  }
]);

globalStyle(`${commandItemBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${commandItemBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${commandItemBase}[data-selected='true'] svg`, {
  color: vars.color.foreground
});

export const commandItemCheckIconStyle = style({
  marginLeft: "auto",
  opacity: 0,
  selectors: {
    "[data-checked='true'] > &": {
      opacity: 1
    }
  }
});

export const commandShortcutStyle = style({
  marginLeft: "auto",
  fontSize: "0.625rem",
  letterSpacing: "0.1em",
  color: vars.color.mutedForeground,
  selectors: {
    "[data-selected='true'] > &": {
      color: vars.color.foreground
    }
  }
});

/* Hide check icon when shortcut is present */
globalStyle(`${commandItemBase}:has([data-slot="command-shortcut"]) .${commandItemCheckIconStyle}`, {
  display: "none"
});

export const commandSeparatorStyle = style({
  marginInline: `calc(-1 * ${vars.spacing[1]})`,
  marginBlock: vars.spacing[1],
  height: "1px",
  backgroundColor: `color-mix(in oklch, ${vars.color.border} 50%, transparent)`
});
