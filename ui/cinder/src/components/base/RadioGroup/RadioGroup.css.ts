import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const radioGroupRoot = style({
  display: "grid",
  width: "100%",
  gap: vars.spacing[3]
});

export const radioGroupItem = style({
  position: "relative",
  display: "flex",
  aspectRatio: "1",
  width: "16px",
  height: "16px",
  flexShrink: 0,
  borderRadius: vars.radius.full,
  border: `1px solid ${vars.color.input}`,
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
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.ring} 50%, transparent)`
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5
    },
    "&[aria-invalid='true']": {
      borderColor: vars.color.destructive,
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
    },
    "&[aria-invalid='true'][aria-checked='true']": {
      borderColor: vars.color.primary
    },
    "&[data-checked]": {
      borderColor: vars.color.primary,
      backgroundColor: vars.color.primary,
      color: vars.color.primaryForeground
    }
  }
});

export const radioGroupIndicator = style({
  display: "flex",
  width: "16px",
  height: "16px",
  alignItems: "center",
  justifyContent: "center"
});

export const radioGroupCircle = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "8px",
  height: "8px",
  transform: "translate(-50%, -50%)",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.primaryForeground
});
