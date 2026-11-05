import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

const toggleBase = style({});

export const toggleRecipe = recipe({
  base: [
    toggleBase,
    {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      borderRadius: vars.radius.md,
      fontSize: vars.font.size.xs,
      fontWeight: vars.font.weight.medium,
      whiteSpace: "nowrap",
      transition: "all 150ms ease",
      outline: "none",
      selectors: {
        "&:hover": {
          backgroundColor: vars.color.muted,
          color: vars.color.foreground
        },
        "&:focus-visible": {
          borderColor: vars.color.ring,
          boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.ring} 50%, transparent)`
        },
        "&:disabled": {
          pointerEvents: "none",
          opacity: 0.5
        },
        "&[aria-invalid='true']": {
          borderColor: vars.color.destructive,
          boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
        },
        "&[aria-pressed='true']": {
          backgroundColor: vars.color.muted
        },
        "&[data-state='on']": {
          backgroundColor: vars.color.muted
        }
      }
    }
  ],
  variants: {
    variant: {
      default: {
        backgroundColor: "transparent"
      },
      outline: {
        border: `1px solid ${vars.color.input}`,
        backgroundColor: "transparent",
        selectors: {
          "&:hover": {
            backgroundColor: vars.color.muted
          }
        }
      }
    },
    size: {
      default: {
        height: "28px",
        minWidth: "28px",
        paddingLeft: "8px",
        paddingRight: "8px"
      },
      sm: {
        height: "24px",
        minWidth: "24px",
        borderRadius: `min(${vars.radius.md}, 8px)`,
        paddingLeft: "6px",
        paddingRight: "6px",
        fontSize: "0.625rem"
      },
      lg: {
        height: "32px",
        minWidth: "32px",
        paddingLeft: "8px",
        paddingRight: "8px"
      }
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

/* SVG base styles inside toggle */
globalStyle(`${toggleBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${toggleBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${toggleBase}[data-size='sm'] svg:not([class*='size-'])`, {
  width: "12px",
  height: "12px"
});

export type ToggleVariants = RecipeVariants<typeof toggleRecipe>;
