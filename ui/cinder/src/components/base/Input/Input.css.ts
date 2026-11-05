import { style } from "@vanilla-extract/css";
import { colors, primaryGradient } from "@game-library/tokens";
import { vars } from "../../../themes/contract.css";

export const gradientBorderWrapper = style({
  position: "relative",
  borderRadius: vars.radius.md,
  padding: "1px",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      background: primaryGradient.hexCss,
      opacity: 0,
      transition: "opacity 400ms ease",
      pointerEvents: "none"
    },
    "&:focus-within::before": {
      opacity: 1
    }
  }
});

export const gradientInputStyle = style({
  position: "relative",
  height: "28px",
  width: "100%",
  minWidth: 0,
  borderRadius: `calc(${vars.radius.md} - 1px)`,
  border: `1px solid ${vars.color.input}`,
  backgroundColor: colors.onyx[800].hex,
  paddingInline: vars.spacing[2],
  paddingBlock: "2px",
  fontSize: vars.font.size.sm,
  fontFamily: "var(--font-kode-mono, 'Kode Mono', monospace)",
  lineHeight: vars.font.lineHeight.relaxed,
  transition: "color 400ms ease, border-color 400ms ease",
  outline: "none",
  selectors: {
    "&::placeholder": {
      color: vars.color.mutedForeground
    },
    "&:focus-visible": {
      borderColor: "transparent",
      boxShadow: "none"
    },
    "&:disabled": {
      pointerEvents: "none",
      cursor: "not-allowed",
      opacity: 0.5
    },
    "&[aria-invalid]": {
      borderColor: vars.color.destructive
    }
  },
  "@media": {
    "(min-width: 768px)": {
      fontSize: vars.font.size.xs,
      lineHeight: vars.font.lineHeight.relaxed
    }
  }
});

export const inputStyle = style({
  height: "28px",
  width: "100%",
  minWidth: 0,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.input}`,
  backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
  paddingInline: vars.spacing[2],
  paddingBlock: "2px",
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.relaxed,
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
      pointerEvents: "none",
      cursor: "not-allowed",
      opacity: 0.5
    },
    "&[aria-invalid]": {
      borderColor: vars.color.destructive,
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
    },
    "&::file-selector-button": {
      display: "inline-flex",
      height: "24px",
      border: 0,
      backgroundColor: "transparent",
      fontSize: vars.font.size.xs,
      lineHeight: vars.font.lineHeight.relaxed,
      fontWeight: vars.font.weight.medium,
      color: vars.color.foreground
    }
  },
  "@media": {
    "(min-width: 768px)": {
      fontSize: vars.font.size.xs,
      lineHeight: vars.font.lineHeight.relaxed
    }
  }
});
