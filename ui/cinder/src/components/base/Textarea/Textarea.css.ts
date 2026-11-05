import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const textareaStyle = style({
  display: "flex",
  fieldSizing: "content",
  minHeight: "64px",
  width: "100%",
  resize: "none",
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.input}`,
  backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
  paddingInline: vars.spacing[2],
  paddingBlock: vars.spacing[2],
  fontSize: vars.font.size.sm,
  transition: "color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
  outline: "none",
  selectors: {
    "&::placeholder": {
      color: vars.color.mutedForeground
    },
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
    }
  },
  "@media": {
    "(min-width: 768px)": {
      fontSize: vars.font.size.xs,
      lineHeight: vars.font.lineHeight.relaxed
    }
  }
});
