import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

export const fieldSetStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[4]
});

globalStyle(`${fieldSetStyle}:has(> [data-slot=checkbox-group])`, {
  gap: vars.spacing[3]
});

globalStyle(`${fieldSetStyle}:has(> [data-slot=radio-group])`, {
  gap: vars.spacing[3]
});

export const fieldLegendStyle = style({
  marginBottom: vars.spacing[2],
  fontWeight: vars.font.weight.medium,
  selectors: {
    '&[data-variant="label"]': {
      fontSize: vars.font.size.xs,
      lineHeight: vars.font.lineHeight.relaxed
    },
    '&[data-variant="legend"]': {
      fontSize: vars.font.size.sm
    }
  }
});

export const fieldGroupStyle = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: vars.spacing[4],
  // container for responsive
  containerType: "inline-size",
  containerName: "field-group"
});

globalStyle(`${fieldGroupStyle}[data-slot=checkbox-group]`, {
  gap: vars.spacing[3]
});

globalStyle(`${fieldGroupStyle} > [data-slot=field-group]`, {
  gap: vars.spacing[4]
});

export const fieldRecipe = recipe({
  base: {
    display: "flex",
    width: "100%",
    gap: vars.spacing[2],
    selectors: {
      '&[data-invalid="true"]': {
        color: vars.color.destructive
      }
    }
  },
  variants: {
    orientation: {
      vertical: {
        flexDirection: "column"
      },
      horizontal: {
        flexDirection: "row",
        alignItems: "center"
      },
      responsive: {
        flexDirection: "column"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

/* Vertical: children full width */
globalStyle(`${fieldRecipe.classNames.variants.orientation.vertical} > *`, {
  width: "100%"
});

globalStyle(`${fieldRecipe.classNames.variants.orientation.vertical} > .sr-only`, {
  width: "auto"
});

/* Horizontal: field-label auto flex */
globalStyle(`${fieldRecipe.classNames.variants.orientation.horizontal} > [data-slot=field-label]`, {
  flex: "auto"
});

/* Horizontal: items-start when has field-content */
globalStyle(`${fieldRecipe.classNames.variants.orientation.horizontal}:has(> [data-slot=field-content])`, {
  alignItems: "flex-start"
});

export const fieldContentStyle = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "2px",
  lineHeight: 1.4
});

export const fieldLabelStyle = style({
  display: "flex",
  width: "fit-content",
  gap: vars.spacing[2],
  lineHeight: 1.4
});

globalStyle(`[data-slot=field][data-disabled=true] ${fieldLabelStyle}`, {
  opacity: 0.5
});

globalStyle(`${fieldLabelStyle}:has([data-checked])`, {
  backgroundColor: `color-mix(in oklch, ${vars.color.primary} 5%, transparent)`
});

globalStyle(`${fieldLabelStyle}:has(> [data-slot=field])`, {
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  width: "100%",
  flexDirection: "column"
});

globalStyle(`${fieldLabelStyle} > [data-slot=field]`, {
  padding: vars.spacing[2]
});

export const fieldTitleStyle = style({
  display: "flex",
  width: "fit-content",
  alignItems: "center",
  gap: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.medium
});

globalStyle(`[data-slot=field][data-disabled=true] ${fieldTitleStyle}`, {
  opacity: 0.5
});

export const fieldDescriptionStyle = style({
  textAlign: "left",
  fontSize: vars.font.size.xs,
  lineHeight: "1.5",
  fontWeight: vars.font.weight.normal,
  color: vars.color.mutedForeground
});

globalStyle(`${fieldDescriptionStyle} > a`, {
  textDecoration: "underline",
  textUnderlineOffset: "4px"
});

globalStyle(`${fieldDescriptionStyle} > a:hover`, {
  color: vars.color.primary
});

globalStyle(`${fieldDescriptionStyle}:last-child`, {
  marginTop: 0
});

globalStyle(`${fieldDescriptionStyle}:nth-last-child(2)`, {
  marginTop: "-4px"
});

globalStyle(`[data-variant=legend] + ${fieldDescriptionStyle}`, {
  marginTop: "-6px"
});

export const fieldSeparatorStyle = style({
  position: "relative",
  marginBlock: `calc(-1 * ${vars.spacing[2]})`,
  height: "20px",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed
});

export const fieldSeparatorLineStyle = style({
  position: "absolute",
  inset: 0,
  top: "50%"
});

export const fieldSeparatorContentStyle = style({
  position: "relative",
  display: "block",
  width: "fit-content",
  marginInline: "auto",
  backgroundColor: vars.color.background,
  paddingInline: vars.spacing[2],
  color: vars.color.mutedForeground
});

export const fieldErrorStyle = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.normal,
  color: vars.color.destructive
});

export const fieldErrorListStyle = style({
  marginLeft: vars.spacing[4],
  display: "flex",
  listStyleType: "disc",
  flexDirection: "column",
  gap: vars.spacing[1]
});

export type FieldVariants = RecipeVariants<typeof fieldRecipe>;
