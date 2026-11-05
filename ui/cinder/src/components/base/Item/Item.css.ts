import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

export const itemGroupStyle = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: vars.spacing[4]
});

/* Adjust gap when group contains small/xs items */
globalStyle(`${itemGroupStyle}:has([data-size=sm])`, {
  gap: vars.spacing[3]
});

globalStyle(`${itemGroupStyle}:has([data-size=xs])`, {
  gap: vars.spacing[2]
});

export const itemSeparatorStyle = style({
  marginBlock: vars.spacing[2]
});

export const itemRecipe = recipe({
  base: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    borderRadius: vars.radius.md,
    border: "1px solid transparent",
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
    transition: "color 100ms ease, background-color 100ms ease",
    outline: "none",
    selectors: {
      "&:focus-visible": {
        borderColor: vars.color.ring,
        boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.ring} 50%, transparent)`
      }
    }
  },
  variants: {
    variant: {
      default: {
        borderColor: "transparent"
      },
      outline: {
        borderColor: vars.color.border
      },
      muted: {
        borderColor: "transparent",
        backgroundColor: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`
      }
    },
    size: {
      default: {
        gap: "10px",
        padding: `${vars.spacing[3]} ${vars.spacing[3]}`
      },
      sm: {
        gap: "10px",
        padding: `${vars.spacing[3]} ${vars.spacing[3]}`
      },
      xs: {
        gap: "10px",
        padding: `${vars.spacing[2]} ${vars.spacing[3]}`
      }
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

/* Transition on anchor children */
globalStyle(`${itemRecipe.classNames.base} a`, {
  transition: "color 100ms ease"
});

globalStyle(`${itemRecipe.classNames.base} a:hover`, {
  backgroundColor: vars.color.muted
});

export const itemMediaRecipe = recipe({
  base: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "transparent"
      },
      icon: {},
      image: {
        width: "32px",
        height: "32px",
        overflow: "hidden",
        borderRadius: vars.radius.sm
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

/* Item media translate when item has description */
const itemMediaBase = style({});
export const itemMediaBaseClass = itemMediaBase;

globalStyle(`[data-slot=item]:has([data-slot=item-description]) ${itemMediaBase}`, {
  transform: "translateY(2px)",
  alignSelf: "flex-start"
});

globalStyle(`${itemMediaBase}[data-variant=icon] svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

globalStyle(`${itemMediaBase}[data-variant=image] img`, {
  width: "100%",
  height: "100%",
  objectFit: "cover"
});

/* Image size adjustments for item sizes */
globalStyle(`[data-slot=item][data-size=sm] ${itemMediaBase}[data-variant=image]`, {
  width: "32px",
  height: "32px"
});

globalStyle(`[data-slot=item][data-size=xs] ${itemMediaBase}[data-variant=image]`, {
  width: "24px",
  height: "24px"
});

export const itemContentStyle = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: vars.spacing[1]
});

globalStyle(`[data-slot=item][data-size=xs] ${itemContentStyle}`, {
  gap: "2px"
});

globalStyle(`${itemContentStyle} + [data-slot=item-content]`, {
  flex: "none"
});

const itemTitleBase = style({
  width: "fit-content",
  alignItems: "center",
  gap: "8px",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.medium,
  textUnderlineOffset: "4px",
  overflow: "hidden",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical"
});

// We need both display:flex for alignment and -webkit-box for line-clamp
// Using globalStyle to set display to avoid TS duplicate property error
globalStyle(`${itemTitleBase}`, {
  display: "-webkit-box"
});

export const itemTitleStyle = itemTitleBase;

const itemDescriptionBase = style({
  textAlign: "left",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.normal,
  color: vars.color.mutedForeground,
  overflow: "hidden",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical"
});

globalStyle(`${itemDescriptionBase}`, {
  display: "-webkit-box"
});

export const itemDescriptionStyle = itemDescriptionBase;

globalStyle(`${itemDescriptionStyle} > a`, {
  textDecoration: "underline",
  textUnderlineOffset: "4px"
});

globalStyle(`${itemDescriptionStyle} > a:hover`, {
  color: vars.color.primary
});

export const itemActionsStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "8px"
});

export const itemHeaderStyle = style({
  display: "flex",
  flexBasis: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px"
});

export const itemFooterStyle = style({
  display: "flex",
  flexBasis: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px"
});

export type ItemVariants = RecipeVariants<typeof itemRecipe>;
export type ItemMediaVariants = RecipeVariants<typeof itemMediaRecipe>;
