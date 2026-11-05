import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const progressRoot = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.spacing[3]
});

export const progressTrack = style({
  position: "relative",
  display: "flex",
  height: "0.25rem",
  width: "100%",
  alignItems: "center",
  overflowX: "hidden",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.muted
});

export const progressIndicator = style({
  height: "100%",
  backgroundColor: vars.color.primary,
  transition: "all"
});

export const progressLabel = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.medium
});

export const progressValue = style({
  marginLeft: "auto",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground,
  fontVariantNumeric: "tabular-nums"
});
