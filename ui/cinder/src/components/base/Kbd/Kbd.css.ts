import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const kbdStyle = style({
  pointerEvents: "none",
  display: "inline-flex",
  height: "20px",
  width: "fit-content",
  minWidth: "20px",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[1],
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.muted,
  paddingInline: vars.spacing[1],
  fontFamily: "sans-serif",
  fontSize: "0.625rem",
  fontWeight: vars.font.weight.medium,
  color: vars.color.mutedForeground,
  userSelect: "none",
  selectors: {
    '[data-slot="tooltip-content"] &': {
      backgroundColor: `color-mix(in oklch, ${vars.color.background} 20%, transparent)`,
      color: vars.color.background
    }
  }
});

export const kbdGroupStyle = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing[1]
});
