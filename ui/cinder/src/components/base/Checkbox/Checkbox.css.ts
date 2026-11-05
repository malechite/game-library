import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const checkboxRoot = style({
  position: "relative",
  display: "flex",
  width: "16px",
  height: "16px",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  border: `1px solid ${vars.color.input}`,
  transition: "box-shadow 150ms ease",
  outline: "none",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-8px",
      bottom: "-8px",
      left: "-12px",
      right: "-12px"
    },
    "&:focus-visible": {
      borderColor: vars.color.ring,
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5
    },
    "&[aria-invalid='true']": {
      borderColor: vars.color.destructive,
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
    },
    "&[aria-invalid='true'][aria-checked='true']": {
      borderColor: vars.color.primary
    },
    "&[data-checked], &[data-indeterminate]": {
      borderColor: vars.color.primary,
      backgroundColor: vars.color.primary,
      color: vars.color.primaryForeground
    }
  }
});

export const checkboxIndicator = style({
  display: "grid",
  placeContent: "center",
  color: "currentColor",
  transition: "none"
});

globalStyle(`${checkboxIndicator} > svg`, {
  width: "14px",
  height: "14px"
});
