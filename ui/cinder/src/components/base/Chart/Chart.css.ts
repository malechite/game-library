import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const chartContainerStyle = style({
  display: "flex",
  aspectRatio: "16 / 9",
  justifyContent: "center",
  fontSize: vars.font.size.xs
});

/* Recharts child element overrides */
globalStyle(`${chartContainerStyle} .recharts-cartesian-axis-tick text`, {
  fill: vars.color.mutedForeground
});

globalStyle(`${chartContainerStyle} .recharts-cartesian-grid line[stroke='#ccc']`, {
  stroke: `color-mix(in oklch, ${vars.color.border} 50%, transparent)`
});

globalStyle(`${chartContainerStyle} .recharts-curve.recharts-tooltip-cursor`, {
  stroke: vars.color.border
});

globalStyle(`${chartContainerStyle} .recharts-dot[stroke='#fff']`, {
  stroke: "transparent"
});

globalStyle(`${chartContainerStyle} .recharts-layer`, {
  outline: "none"
});

globalStyle(`${chartContainerStyle} .recharts-polar-grid [stroke='#ccc']`, {
  stroke: vars.color.border
});

globalStyle(`${chartContainerStyle} .recharts-radial-bar-background-sector`, {
  fill: vars.color.muted
});

globalStyle(`${chartContainerStyle} .recharts-rectangle.recharts-tooltip-cursor`, {
  fill: vars.color.muted
});

globalStyle(`${chartContainerStyle} .recharts-reference-line [stroke='#ccc']`, {
  stroke: vars.color.border
});

globalStyle(`${chartContainerStyle} .recharts-sector`, {
  outline: "none"
});

globalStyle(`${chartContainerStyle} .recharts-sector[stroke='#fff']`, {
  stroke: "transparent"
});

globalStyle(`${chartContainerStyle} .recharts-surface`, {
  outline: "none"
});

/* Tooltip content */
export const chartTooltipContentStyle = style({
  display: "grid",
  minWidth: "128px",
  alignItems: "flex-start",
  gap: vars.spacing[2],
  borderRadius: vars.radius.lg,
  border: `1px solid color-mix(in oklch, ${vars.color.border} 50%, transparent)`,
  backgroundColor: vars.color.background,
  paddingInline: "10px",
  paddingBlock: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  boxShadow: vars.shadow.xl
});

export const chartTooltipLabelStyle = style({
  fontWeight: vars.font.weight.medium
});

export const chartTooltipGridStyle = style({
  display: "grid",
  gap: vars.spacing[2]
});

export const chartTooltipItemStyle = style({
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  alignItems: "stretch",
  gap: vars.spacing[2]
});

globalStyle(`${chartTooltipItemStyle} > svg`, {
  height: "10px",
  width: "10px",
  color: vars.color.mutedForeground
});

export const chartTooltipItemDotStyle = style({
  alignItems: "center"
});

export const chartTooltipIndicatorBase = style({
  flexShrink: 0,
  borderRadius: "2px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "var(--color-border)",
  backgroundColor: "var(--color-bg)"
});

export const chartTooltipIndicatorDot = style({
  height: "10px",
  width: "10px"
});

export const chartTooltipIndicatorLine = style({
  width: "4px"
});

export const chartTooltipIndicatorDashed = style({
  width: 0,
  borderWidth: "1.5px",
  borderStyle: "dashed",
  backgroundColor: "transparent"
});

export const chartTooltipIndicatorDashedNested = style({
  marginBlock: "2px"
});

export const chartTooltipValueContainerStyle = style({
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  lineHeight: 1
});

export const chartTooltipValueContainerNestedStyle = style({
  alignItems: "flex-end"
});

export const chartTooltipValueContainerDefaultStyle = style({
  alignItems: "center"
});

export const chartTooltipNestedGridStyle = style({
  display: "grid",
  gap: vars.spacing[2]
});

export const chartTooltipItemLabelStyle = style({
  color: vars.color.mutedForeground
});

export const chartTooltipValueStyle = style({
  fontFamily: "monospace",
  fontWeight: vars.font.weight.medium,
  color: vars.color.foreground,
  fontVariantNumeric: "tabular-nums"
});

/* Legend */
export const chartLegendContentStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[4]
});

export const chartLegendTopStyle = style({
  paddingBottom: vars.spacing[3]
});

export const chartLegendBottomStyle = style({
  paddingTop: vars.spacing[3]
});

export const chartLegendItemStyle = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[2]
});

globalStyle(`${chartLegendItemStyle} > svg`, {
  height: "12px",
  width: "12px",
  color: vars.color.mutedForeground
});

export const chartLegendIndicatorStyle = style({
  height: "8px",
  width: "8px",
  flexShrink: 0,
  borderRadius: "2px"
});
