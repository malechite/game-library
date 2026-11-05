import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

const alertBase = style({});

export const alertRecipe = recipe({
  base: [
    alertBase,
    {
      position: "relative",
      display: "grid",
      width: "100%",
      gap: "2px",
      borderRadius: vars.radius.lg,
      border: `1px solid ${vars.color.border}`,
      paddingLeft: vars.spacing[2],
      paddingRight: vars.spacing[2],
      paddingTop: "6px",
      paddingBottom: "6px",
      textAlign: "left",
      fontSize: vars.font.size.xs,
      lineHeight: vars.font.lineHeight.relaxed
    }
  ],
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.card,
        color: vars.color.cardForeground
      },
      destructive: {
        backgroundColor: vars.color.card,
        color: vars.color.destructive
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

/* When has alert-action, add right padding */
globalStyle(`${alertBase}:has([data-slot='alert-action'])`, {
  position: "relative",
  paddingRight: "72px"
});

/* When has direct svg child, use grid with icon column */
globalStyle(`${alertBase}:has(> svg)`, {
  gridTemplateColumns: "auto 1fr",
  columnGap: "6px"
});

/* Direct SVG children styling */
globalStyle(`${alertBase} > svg`, {
  gridRow: "span 2",
  transform: "translateY(2px)",
  color: "currentColor"
});

globalStyle(`${alertBase} > svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

/* Destructive variant description */
globalStyle(`${alertBase}[data-variant='destructive'] [data-slot='alert-description']`, {
  color: `color-mix(in oklch, ${vars.color.destructive} 90%, transparent)`
});

/* Destructive variant svg */
globalStyle(`${alertBase}[data-variant='destructive'] > svg`, {
  color: "currentColor"
});

export const alertTitle = style({
  fontWeight: vars.font.weight.medium
});

/* Title col-start-2 when alert has svg */
globalStyle(`${alertBase}:has(> svg) ${alertTitle}`, {
  gridColumnStart: 2
});

globalStyle(`${alertTitle} a`, {
  textDecoration: "underline",
  textUnderlineOffset: "3px"
});

globalStyle(`${alertTitle} a:hover`, {
  color: vars.color.foreground
});

export const alertDescription = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  textWrap: "balance",
  color: vars.color.mutedForeground,
  "@media": {
    "(min-width: 768px)": {
      textWrap: "pretty"
    }
  }
});

globalStyle(`${alertDescription} a`, {
  textDecoration: "underline",
  textUnderlineOffset: "3px"
});

globalStyle(`${alertDescription} a:hover`, {
  color: vars.color.foreground
});

globalStyle(`${alertDescription} p:not(:last-child)`, {
  marginBottom: vars.spacing[4]
});

export const alertAction = style({
  position: "absolute",
  top: "6px",
  right: vars.spacing[2]
});

export type AlertVariants = RecipeVariants<typeof alertRecipe>;
