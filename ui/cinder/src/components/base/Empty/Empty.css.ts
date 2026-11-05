import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

export const emptyRoot = style({
  display: "flex",
  width: "100%",
  minWidth: 0,
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[4],
  borderRadius: vars.radius.xl,
  borderStyle: "dashed",
  padding: vars.spacing[6],
  textAlign: "center",
  textWrap: "balance"
});

export const emptyHeader = style({
  display: "flex",
  maxWidth: "24rem",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing[1]
});

export const emptyMedia = recipe({
  base: {
    marginBottom: vars.spacing[2],
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "transparent"
      },
      icon: {
        display: "flex",
        width: "2rem",
        height: "2rem",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: vars.radius.md,
        backgroundColor: vars.color.muted,
        color: vars.color.foreground
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const emptyMediaSvgBase = style({});

globalStyle(`${emptyMediaSvgBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

export const emptyMediaIconSvg = style({});

globalStyle(`${emptyMediaIconSvg} svg:not([class*='size-'])`, {
  width: "1rem",
  height: "1rem"
});

export const emptyTitle = style({
  fontFamily: "var(--font-heading, inherit)",
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  letterSpacing: "-0.025em"
});

export const emptyDescription = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground
});

globalStyle(`${emptyDescription} > a`, {
  textDecoration: "underline",
  textUnderlineOffset: "4px"
});

globalStyle(`${emptyDescription} > a:hover`, {
  color: vars.color.primary
});

export const emptyContent = style({
  display: "flex",
  width: "100%",
  maxWidth: "24rem",
  minWidth: 0,
  flexDirection: "column",
  alignItems: "center",
  gap: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  textWrap: "balance"
});
