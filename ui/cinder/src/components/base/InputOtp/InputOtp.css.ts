import { style, keyframes, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

const caretBlink = keyframes({
  "0%, 70%, 100%": { opacity: "1" },
  "20%, 50%": { opacity: "0" }
});

export const inputOtpContainerStyle = style({
  display: "flex",
  alignItems: "center"
});

globalStyle(`${inputOtpContainerStyle}:has(:disabled)`, {
  opacity: 0.5
});

export const inputOtpInputStyle = style({
  selectors: {
    "&:disabled": {
      cursor: "not-allowed"
    }
  }
});

export const inputOtpGroupStyle = style({
  display: "flex",
  alignItems: "center",
  borderRadius: vars.radius.md
});

globalStyle(`${inputOtpGroupStyle}:has([aria-invalid])`, {
  borderColor: vars.color.destructive,
  boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
});

export const inputOtpSlotStyle = style({
  position: "relative",
  display: "flex",
  width: "28px",
  height: "28px",
  alignItems: "center",
  justifyContent: "center",
  borderTop: `1px solid ${vars.color.input}`,
  borderBottom: `1px solid ${vars.color.input}`,
  borderRight: `1px solid ${vars.color.input}`,
  backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  transition: "all 150ms ease",
  outline: "none",
  selectors: {
    "&:first-child": {
      borderLeft: `1px solid ${vars.color.input}`,
      borderTopLeftRadius: vars.radius.md,
      borderBottomLeftRadius: vars.radius.md
    },
    "&:last-child": {
      borderTopRightRadius: vars.radius.md,
      borderBottomRightRadius: vars.radius.md
    },
    "&[data-active=true]": {
      zIndex: 10,
      borderColor: vars.color.ring,
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`
    },
    "&[aria-invalid][data-active=true]": {
      borderColor: vars.color.destructive,
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
    }
  }
});

export const inputOtpFakeCaretContainer = style({
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const inputOtpFakeCaret = style({
  height: "16px",
  width: "1px",
  backgroundColor: vars.color.foreground,
  animation: `${caretBlink} 1s step-end infinite`
});

export const inputOtpSeparatorStyle = style({
  display: "flex",
  alignItems: "center"
});

globalStyle(`${inputOtpSeparatorStyle} svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});
