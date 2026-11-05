import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const filterBar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.spacing[2],
  width: "100%",
  padding: vars.spacing[2],
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: `color-mix(in oklch, ${vars.color.card} 60%, transparent)`
});

// ─── Search ────────────────────────────────────────────────────────────

export const filterBarSearch = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flex: "1 1 200px",
  minWidth: 160,
  maxWidth: 320
});

export const filterBarSearchIcon = style({
  position: "absolute",
  left: vars.spacing[2],
  width: 14,
  height: 14,
  color: vars.color.mutedForeground,
  pointerEvents: "none"
});

// Room for the leading icon and the trailing clear button.
export const filterBarSearchInput = style({
  paddingLeft: "28px !important",
  paddingRight: "28px !important"
});

export const filterBarSearchClear = style({
  position: "absolute",
  right: 4,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  borderRadius: vars.radius.sm,
  border: "none",
  background: "none",
  color: vars.color.mutedForeground,
  cursor: "pointer",
  selectors: {
    "&:hover": { color: vars.color.foreground }
  }
});

// ─── Groups ────────────────────────────────────────────────────────────

export const filterBarGroup = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.spacing[2]
});

// Pushes the sort + trailing content to the right edge on wide layouts.
export const filterBarEnd = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.spacing[2],
  marginLeft: "auto"
});

export const filterBarLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing[1],
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground,
  whiteSpace: "nowrap"
});

// A filter that is narrowing the results gets a primary-tinted trigger.
export const filterBarActive = style({
  borderColor: `${vars.color.primary} !important`,
  color: vars.color.foreground
});

// On/off filters are Buttons restyled to sit level with the Select triggers
// beside them (same weight and typeface, no drop shadow, no pressed offset).
export const filterBarToggle = style({
  fontFamily: "inherit !important",
  fontWeight: `${vars.font.weight.normal} !important`,
  textShadow: "none !important",
  marginBottom: "0 !important",
  borderColor: `${vars.color.input} !important`,
  selectors: {
    "&[aria-pressed='true']": {
      borderColor: `${vars.color.primary} !important`,
      backgroundColor: `color-mix(in oklch, ${vars.color.primary} 18%, transparent)`
    }
  }
});
