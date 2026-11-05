import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

export const switchRecipe = recipe({
  base: {
    position: "relative",
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    borderRadius: vars.radius.full,
    border: "1px solid transparent",
    transition: "all 150ms ease",
    outline: "none",
    selectors: {
      "&::after": {
        content: '""',
        position: "absolute",
        top: "-8px",
        bottom: "-8px",
        left: "-12px",
        right: "-12px"
      },
      "&:focus-visible": {
        borderColor: vars.color.ring,
        boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`
      },
      "&[aria-invalid='true']": {
        borderColor: vars.color.destructive,
        boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
      },
      "&[data-checked]": {
        backgroundColor: vars.color.primary
      },
      "&[data-unchecked]": {
        backgroundColor: vars.color.input
      },
      "&[data-disabled]": {
        cursor: "not-allowed",
        opacity: 0.5
      }
    }
  },
  variants: {
    size: {
      default: {
        height: "16.6px",
        width: "28px"
      },
      sm: {
        height: "14px",
        width: "24px"
      }
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export const thumbDefault = style({
  pointerEvents: "none",
  display: "block",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.background,
  boxShadow: "none",
  transition: "transform 150ms ease"
});

export const thumbSizeDefault = style({
  width: "14px",
  height: "14px",
  selectors: {
    "[data-checked] &": {
      transform: "translateX(calc(100% - 2px))"
    },
    "[data-unchecked] &": {
      transform: "translateX(0)"
    }
  }
});

export const thumbSizeSm = style({
  width: "12px",
  height: "12px",
  selectors: {
    "[data-checked] &": {
      transform: "translateX(calc(100% - 2px))"
    },
    "[data-unchecked] &": {
      transform: "translateX(0)"
    }
  }
});

export type SwitchVariants = RecipeVariants<typeof switchRecipe>;
