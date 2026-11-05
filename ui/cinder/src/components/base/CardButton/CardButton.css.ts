import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const cardButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[2],
  width: "100%",
  height: "100%",
  // Sensible floor when the button stands alone (not stretched by a grid row).
  minHeight: vars.spacing[40],
  padding: vars.spacing[6],
  borderRadius: vars.radius.lg,
  border: `2px dashed color-mix(in oklch, ${vars.color.foreground} 16%, transparent)`,
  backgroundColor: "transparent",
  color: vars.color.mutedForeground,
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "transform 160ms ease, border-color 160ms ease, color 160ms ease, background-color 160ms ease",
  selectors: {
    "&:hover": {
      transform: "scale(1.02)",
      borderColor: vars.color.primary,
      color: vars.color.primary,
      backgroundColor: `color-mix(in oklch, ${vars.color.primary} 7%, transparent)`
    },
    "&:active": {
      transform: "scale(1)"
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.ring}`,
      outlineOffset: "2px"
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
      transform: "none",
      borderColor: `color-mix(in oklch, ${vars.color.foreground} 16%, transparent)`,
      color: vars.color.mutedForeground,
      backgroundColor: "transparent"
    }
  }
});

export const cardButtonLabel = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium
});
