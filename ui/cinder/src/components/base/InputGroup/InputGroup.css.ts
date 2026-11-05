import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

export const inputGroupStyle = style({
  position: "relative",
  display: "flex",
  height: "28px",
  width: "100%",
  minWidth: 0,
  alignItems: "center",
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.input}`,
  backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
  transition: "color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
  outline: "none"
});

/* Focus-visible ring when child control is focused */
globalStyle(`${inputGroupStyle}:has([data-slot=input-group-control]:focus-visible)`, {
  borderColor: vars.color.ring,
  boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`
});

/* Invalid state */
globalStyle(`${inputGroupStyle}:has([data-slot][aria-invalid=true])`, {
  borderColor: vars.color.destructive,
  boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
});

/* Has textarea => auto height + rounded */
globalStyle(`${inputGroupStyle}:has(textarea)`, {
  borderRadius: vars.radius.md,
  height: "auto"
});

/* Block-end/start alignment => auto height + column */
globalStyle(`${inputGroupStyle}:has(> [data-align=block-end])`, {
  height: "auto",
  flexDirection: "column"
});

globalStyle(`${inputGroupStyle}:has(> [data-align=block-start])`, {
  height: "auto",
  flexDirection: "column"
});

/* Block-aligned input padding */
globalStyle(`${inputGroupStyle}:has(> [data-align=block-end]) > input`, {
  paddingTop: vars.spacing[3]
});

globalStyle(`${inputGroupStyle}:has(> [data-align=block-start]) > input`, {
  paddingBottom: vars.spacing[3]
});

/* Inline-aligned input padding */
globalStyle(`${inputGroupStyle}:has(> [data-align=inline-end]) > input`, {
  paddingRight: vars.spacing[2]
});

globalStyle(`${inputGroupStyle}:has(> [data-align=inline-start]) > input`, {
  paddingLeft: vars.spacing[2]
});

/* Block-end/start alignment => rounded for has-data */
globalStyle(`${inputGroupStyle}:has([data-align=block-end])`, {
  borderRadius: vars.radius.md
});

globalStyle(`${inputGroupStyle}:has([data-align=block-start])`, {
  borderRadius: vars.radius.md
});

export const inputGroupAddonRecipe = recipe({
  base: {
    display: "flex",
    height: "auto",
    cursor: "text",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.spacing[1],
    paddingBlock: vars.spacing[2],
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
    fontWeight: vars.font.weight.medium,
    color: vars.color.mutedForeground,
    userSelect: "none"
  },
  variants: {
    align: {
      "inline-start": {
        order: -1,
        paddingLeft: vars.spacing[2]
      },
      "inline-end": {
        order: 999,
        paddingRight: vars.spacing[2]
      },
      "block-start": {
        order: -1,
        width: "100%",
        justifyContent: "flex-start",
        paddingInline: vars.spacing[2],
        paddingTop: vars.spacing[2]
      },
      "block-end": {
        order: 999,
        width: "100%",
        justifyContent: "flex-start",
        paddingInline: vars.spacing[2],
        paddingBottom: vars.spacing[2]
      }
    }
  },
  defaultVariants: {
    align: "inline-start"
  }
});

const addonBase = style({});
export const inputGroupAddonBase = addonBase;

/* Disabled state for addon */
globalStyle(`[data-slot=input-group][data-disabled=true] ${addonBase}`, {
  opacity: 0.5
});

/* SVG sizing in addons */
globalStyle(`${addonBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

/* Kbd styling inside addons */
globalStyle(`${addonBase} [data-slot=kbd]`, {
  borderRadius: `calc(${vars.radius.sm} - 2px)`,
  backgroundColor: `color-mix(in oklch, ${vars.color.mutedForeground} 10%, transparent)`,
  paddingInline: vars.spacing[1],
  fontSize: "0.625rem"
});

/* inline-start addon button offset */
globalStyle(`${addonBase}[data-align=inline-start]:has(> button)`, {
  marginLeft: "-0.275rem"
});

globalStyle(`${addonBase}[data-align=inline-start]:has(> kbd)`, {
  marginLeft: "-0.275rem"
});

/* inline-end addon button offset */
globalStyle(`${addonBase}[data-align=inline-end]:has(> button)`, {
  marginRight: "-0.275rem"
});

globalStyle(`${addonBase}[data-align=inline-end]:has(> kbd)`, {
  marginRight: "-0.275rem"
});

export const inputGroupButtonRecipe = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: vars.spacing[2],
    borderRadius: vars.radius.md,
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
    boxShadow: "none"
  },
  variants: {
    size: {
      xs: {
        height: "20px",
        gap: vars.spacing[1],
        borderRadius: `calc(${vars.radius.sm} - 2px)`,
        paddingInline: vars.spacing[1]
      },
      sm: {
        gap: vars.spacing[1]
      },
      "icon-xs": {
        width: "24px",
        height: "24px",
        padding: 0
      },
      "icon-sm": {
        width: "28px",
        height: "28px",
        padding: 0
      }
    }
  },
  defaultVariants: {
    size: "xs"
  }
});

const igButtonBase = style({});
export const inputGroupButtonBase = igButtonBase;

globalStyle(`${igButtonBase}[data-size=xs] svg:not([class*='size-'])`, {
  width: "12px",
  height: "12px"
});

export const inputGroupTextStyle = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground
});

globalStyle(`${inputGroupTextStyle} svg`, {
  pointerEvents: "none"
});

globalStyle(`${inputGroupTextStyle} svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

export const inputGroupInputStyle = style({
  flex: 1,
  borderRadius: 0,
  border: 0,
  backgroundColor: "transparent",
  boxShadow: "none",
  selectors: {
    "&:focus-visible": {
      boxShadow: "none"
    },
    "&[aria-invalid]": {
      boxShadow: "none"
    }
  }
});

export const inputGroupTextareaStyle = style({
  flex: 1,
  resize: "none",
  borderRadius: 0,
  border: 0,
  backgroundColor: "transparent",
  paddingBlock: vars.spacing[2],
  boxShadow: "none",
  selectors: {
    "&:focus-visible": {
      boxShadow: "none"
    },
    "&[aria-invalid]": {
      boxShadow: "none"
    }
  }
});

export type InputGroupAddonVariants = RecipeVariants<typeof inputGroupAddonRecipe>;
export type InputGroupButtonVariants = RecipeVariants<typeof inputGroupButtonRecipe>;
