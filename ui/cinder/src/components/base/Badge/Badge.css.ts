import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

export const badgeRecipe = recipe({
  base: {
    display: "inline-flex",
    height: "20px",
    width: "fit-content",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: vars.spacing[1],
    overflow: "hidden",
    borderRadius: vars.radius.full,
    border: "1px solid transparent",
    paddingInline: vars.spacing[2],
    paddingBlock: "2px",
    fontSize: "0.625rem",
    fontWeight: vars.font.weight.medium,
    whiteSpace: "nowrap",
    transition: "all 150ms ease",
    selectors: {
      "&:focus-visible": {
        borderColor: vars.color.ring,
        boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.ring} 50%, transparent)`
      },
      "&[aria-invalid]": {
        borderColor: vars.color.destructive,
        boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
      }
    }
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground,
        selectors: {
          "a&:hover": {
            backgroundColor: `color-mix(in oklch, ${vars.color.primary} 80%, transparent)`
          }
        }
      },
      secondary: {
        backgroundColor: vars.color.secondary,
        color: vars.color.secondaryForeground,
        selectors: {
          "a&:hover": {
            backgroundColor: `color-mix(in oklch, ${vars.color.secondary} 80%, transparent)`
          }
        }
      },
      destructive: {
        backgroundColor: `color-mix(in oklch, ${vars.color.destructive} 10%, transparent)`,
        color: vars.color.destructive,
        selectors: {
          "&:focus-visible": {
            boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
          },
          "a&:hover": {
            backgroundColor: `color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
          }
        }
      },
      outline: {
        borderColor: vars.color.border,
        backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
        color: vars.color.foreground,
        selectors: {
          "a&:hover": {
            backgroundColor: vars.color.muted,
            color: vars.color.mutedForeground
          }
        }
      },
      ghost: {
        selectors: {
          "&:hover": {
            backgroundColor: vars.color.muted,
            color: vars.color.mutedForeground
          }
        }
      },
      link: {
        color: vars.color.primary,
        textUnderlineOffset: "4px",
        selectors: {
          "&:hover": {
            textDecoration: "underline"
          }
        }
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
