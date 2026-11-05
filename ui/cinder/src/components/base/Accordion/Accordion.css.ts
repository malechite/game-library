import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { accordionOpen, accordionClose } from "../../../themes/animations.css";

export const accordionRoot = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`
});

export const accordionItem = style({
  selectors: {
    "&:not(:last-child)": {
      borderBottom: `1px solid ${vars.color.border}`
    },
    "&[data-open]": {
      backgroundColor: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`
    }
  }
});

export const accordionHeader = style({
  display: "flex"
});

const triggerBase = style({});

export const accordionTrigger = style([
  triggerBase,
  {
    position: "relative",
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: vars.spacing[6],
    border: "1px solid transparent",
    padding: vars.spacing[2],
    textAlign: "left",
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
    fontWeight: vars.font.weight.medium,
    transition: "all 150ms ease",
    outline: "none",
    selectors: {
      "&:hover": {
        textDecoration: "underline"
      },
      "&[aria-disabled='true']": {
        pointerEvents: "none",
        opacity: 0.5
      }
    }
  }
]);

globalStyle(`${triggerBase} [data-slot="accordion-trigger-icon"]`, {
  marginLeft: "auto",
  width: "16px",
  height: "16px",
  color: vars.color.mutedForeground
});

export const accordionTriggerIconDown = style({
  pointerEvents: "none",
  flexShrink: 0
});

export const accordionTriggerIconUp = style({
  pointerEvents: "none",
  flexShrink: 0,
  display: "none"
});

globalStyle(`${triggerBase}[aria-expanded='true'] .${accordionTriggerIconDown}`, {
  display: "none"
});

globalStyle(`${triggerBase}[aria-expanded='true'] .${accordionTriggerIconUp}`, {
  display: "inline"
});

export const accordionPanel = style({
  overflow: "hidden",
  paddingLeft: vars.spacing[2],
  paddingRight: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  selectors: {
    "&[data-open]": {
      animation: `${accordionOpen} 200ms ease-out`
    },
    "&[data-closed]": {
      animation: `${accordionClose} 200ms ease-out`
    }
  }
});

const contentInnerBase = style({
  height: "var(--accordion-panel-height)",
  paddingTop: 0,
  paddingBottom: vars.spacing[4]
});

export const accordionContentInner = contentInnerBase;

globalStyle(`${contentInnerBase}[data-ending-style]`, {
  height: 0
});

globalStyle(`${contentInnerBase}[data-starting-style]`, {
  height: 0
});

globalStyle(`${contentInnerBase} a`, {
  textDecoration: "underline",
  textUnderlineOffset: "3px"
});

globalStyle(`${contentInnerBase} a:hover`, {
  color: vars.color.foreground
});

globalStyle(`${contentInnerBase} p:not(:last-child)`, {
  marginBottom: vars.spacing[4]
});
