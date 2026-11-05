import { style } from "@vanilla-extract/css";
import { vars } from "@game-library/cinder/theme";

// ─── Form layout ───────────────────────────────────────────────────────

// Long forms scroll inside the modal instead of pushing its footer off screen.
export const formBody = style({
  display: "flex",
  gap: vars.spacing[5],
  maxHeight: "min(74vh, 760px)",
  overflowY: "auto",
  paddingRight: vars.spacing[1]
});

export const formFields = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: `${vars.spacing[3]} ${vars.spacing[4]}`,
  flex: "1 1 auto",
  minWidth: 0,
  alignContent: "start"
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[1],
  minWidth: 0
});

/** A field that spans both columns. */
export const fieldWide = style({
  gridColumn: "1 / -1"
});

export const fieldLabel = style({
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground
});

// cinder's Select trigger sizes to its content; in a form it should fill its column.
export const fullWidthSelect = style({
  width: "100% !important"
});

export const sectionTitle = style({
  gridColumn: "1 / -1",
  marginTop: vars.spacing[2],
  paddingBottom: vars.spacing[1],
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.mutedForeground
});

export const errorText = style({
  gridColumn: "1 / -1",
  fontSize: vars.font.size.xs,
  color: vars.color.destructive
});

// ─── Genre chips ───────────────────────────────────────────────────────

export const chips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.spacing[1]
});

export const chip = style({
  padding: `2px ${vars.spacing[2]}`,
  borderRadius: vars.radius.full,
  border: `1px solid ${vars.color.input}`,
  background: "none",
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground,
  cursor: "pointer",
  transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
  selectors: {
    "&:hover": { color: vars.color.foreground },
    "&[aria-pressed='true']": {
      borderColor: vars.color.primary,
      backgroundColor: `color-mix(in oklch, ${vars.color.primary} 25%, transparent)`,
      color: vars.color.foreground
    },
    "&:disabled": { cursor: "default", opacity: 0.6 }
  }
});

// ─── Catalog summary (adding a copy of an existing game) ───────────────

export const catalogSummary = style({
  gridColumn: "1 / -1",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: vars.spacing[3],
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.muted
});

export const catalogSummaryTitle = style({
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.semibold
});

export const mutedText = style({
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground
});

// ─── Search results (add game) ─────────────────────────────────────────

export const searchRow = style({
  display: "flex",
  gap: vars.spacing[2]
});

export const results = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[1],
  minHeight: 220,
  maxHeight: "min(52vh, 440px)",
  overflowY: "auto"
});

export const resultsHeading = style({
  marginTop: vars.spacing[2],
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.mutedForeground
});

export const result = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[3],
  width: "100%",
  padding: vars.spacing[2],
  borderRadius: vars.radius.md,
  border: "1px solid transparent",
  background: "none",
  color: vars.color.foreground,
  textAlign: "left",
  cursor: "pointer",
  transition: "background-color 150ms ease, border-color 150ms ease",
  selectors: {
    "&:hover, &:focus-visible": {
      backgroundColor: vars.color.muted,
      borderColor: vars.color.border,
      outline: "none"
    }
  }
});

export const resultThumb = style({
  width: 44,
  height: 44,
  borderRadius: vars.radius.sm,
  overflow: "hidden",
  flexShrink: 0
});

export const resultText = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  flex: "1 1 auto"
});

export const resultTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

export const resultsEmpty = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[2],
  flex: "1 1 auto",
  padding: vars.spacing[6],
  textAlign: "center",
  fontSize: vars.font.size.sm,
  color: vars.color.mutedForeground
});

// ─── Import ────────────────────────────────────────────────────────────

export const dropZone = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing[2],
  padding: vars.spacing[6],
  borderRadius: vars.radius.lg,
  border: `1px dashed ${vars.color.input}`,
  textAlign: "center",
  color: vars.color.mutedForeground
});

export const switchRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[3],
  fontSize: vars.font.size.sm
});

export const stats = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: vars.spacing[3]
});

export const stat = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: vars.spacing[3],
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.muted
});

export const statValue = style({
  fontSize: vars.font.size["2xl"],
  fontWeight: vars.font.weight.semibold,
  fontVariantNumeric: "tabular-nums"
});
