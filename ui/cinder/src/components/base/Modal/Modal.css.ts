import { style } from "@vanilla-extract/css";
import { gradients } from "@game-library/tokens";
import { vars } from "../../../themes/contract.css";

export const modalSurface = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  background: gradients.panel.css,
  maxWidth: "calc(100% - 2rem)",
  maxHeight: "90vh",
  overflow: "hidden",
  outline: "none"
});

export const modalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 64,
  padding: 16,
  flexShrink: 0
});

export const modalTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.foreground
});

export const modalContent = style({
  flex: 1,
  overflow: "auto",
  padding: 16
});

export const modalDescription = style({
  margin: 0,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground
});

export const modalFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 8,
  padding: 16,
  flexShrink: 0
});
