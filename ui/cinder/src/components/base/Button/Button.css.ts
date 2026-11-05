import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style, globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { gradients, colors, primaryColor, primaryGradient, primaryGradientHover } from "@game-library/tokens";

const buttonBase = style({});

// ─── Focus Rings ───────────────────────────────────────────────────────

const focusRing = {
  boxShadow: `inset 0 0 0 1px ${vars.color.ring}, 0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`
};

const destructiveFocusRing = {
  boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${vars.color.destructive} 40%, transparent), 0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
};

// ─── Gradient Layers ──────────────────────────────────────────────────
// Base gradient on ::after (z-index: -2), hover gradient on ::before (z-index: -1)
// Both behind text content thanks to isolation: isolate on the button

const gradientLayerBase = {
  content: '""',
  position: "absolute" as const,
  inset: "0",
  borderRadius: "inherit",
  pointerEvents: "none" as const
};

const gradientBaseLayer = {
  ...gradientLayerBase,
  zIndex: -2,
  transition: "background 300ms ease"
};

const gradientHoverLayer = {
  ...gradientLayerBase,
  zIndex: -1,
  opacity: 0,
  transition: "opacity 300ms ease"
};

// ─── Button Recipe ─────────────────────────────────────────────────────

export const buttonRecipe = recipe({
  base: [
    buttonBase,
    {
      display: "inline-flex",
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: vars.radius.md,
      border: "none",
      fontFamily: "Montserrat, system-ui, sans-serif",
      fontSize: vars.font.size.xs,
      lineHeight: vars.font.lineHeight.relaxed,
      fontWeight: "700",
      textShadow: "1px 1px 8px rgba(0, 0, 0, 0.65)",
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition:
        "translate 150ms ease, opacity 300ms ease, box-shadow 150ms ease, background-color 300ms ease, color 300ms ease",
      translate: "0 0",
      outline: "none",
      userSelect: "none",
      position: "relative",
      isolation: "isolate",
      marginBottom: 2,
      selectors: {
        "&:focus-visible, &[data-force-focus]": focusRing,
        "&:active, &[data-force-active]": {
          translate: "1.5px 1.5px"
        },
        "&:disabled, &[data-force-disabled]": {
          pointerEvents: "none",
          opacity: 0.6
        },
        "&[aria-invalid='true']": {
          boxShadow: `inset 0 0 0 1px ${vars.color.destructive}, 0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
        },
        "&[aria-busy='true']": {
          pointerEvents: "none",
          position: "relative"
        }
      }
    }
  ],
  variants: {
    variant: {
      // ─── Primary: the design system's primary gemstone gradient ──
      default: {
        color: colors.white.oklch,
        selectors: {
          "&::after": { ...gradientBaseLayer, background: primaryGradient.css },
          "&::before": { ...gradientHoverLayer, background: primaryGradientHover.css },
          "&:hover:not(:disabled)::before, &[data-force-hover]::before": { opacity: 1 }
        }
      },

      // ─── Secondary: Slate gradient ─────────────────────────────
      secondary: {
        color: colors.white.oklch,
        selectors: {
          "&::after": { ...gradientBaseLayer, background: gradients.slate.css },
          "&::before": { ...gradientHoverLayer, background: gradients.slateHover.css },
          "&:hover:not(:disabled)::before, &[data-force-hover]::before": { opacity: 1 }
        }
      },

      // ─── Outline: Border, transparent bg ───────────────────────
      outline: {
        background: "transparent",
        border: `1px solid ${colors.pewter[400].oklch}`,
        color: colors.white.oklch,
        selectors: {
          "&:hover:not(:disabled), &[data-force-hover]": {
            backgroundColor: colors.onyx[500].oklch
          },
          "&[aria-expanded='true']": {
            backgroundColor: colors.onyx[500].oklch
          }
        }
      },

      // ─── Ghost: Transparent, subtle hover ──────────────────────
      ghost: {
        background: "transparent",
        color: vars.color.mutedForeground,
        selectors: {
          "&:hover:not(:disabled), &[data-force-hover]": {
            backgroundColor: colors.onyx[500].oklch,
            color: colors.white.oklch
          },
          "&[aria-expanded='true']": {
            backgroundColor: colors.onyx[500].oklch,
            color: colors.white.oklch
          }
        }
      },

      // ─── Destructive: Ruby gradient ────────────────────────────
      destructive: {
        color: colors.white.oklch,
        selectors: {
          "&::after": { ...gradientBaseLayer, background: gradients.ruby.css },
          "&::before": { ...gradientHoverLayer, background: gradients.rubyHover.css },
          "&:hover:not(:disabled)::before, &[data-force-hover]::before": { opacity: 1 },
          "&:focus-visible, &[data-force-focus]": destructiveFocusRing
        }
      },

      // ─── Link: Text only, no background ────────────────────────
      link: {
        color: primaryColor.oklch,
        textUnderlineOffset: "4px",
        selectors: {
          "&:hover:not(:disabled), &[data-force-hover]": {
            textDecoration: "underline"
          }
        }
      }
    },
    size: {
      default: {
        height: "28px",
        gap: "4px",
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: vars.font.size.xs,
        lineHeight: vars.font.lineHeight.relaxed
      },
      xs: {
        height: "20px",
        gap: "4px",
        borderRadius: vars.radius.sm,
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "0.625rem"
      },
      sm: {
        height: "24px",
        gap: "4px",
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: vars.font.size.xs,
        lineHeight: vars.font.lineHeight.relaxed
      },
      lg: {
        height: "32px",
        gap: "4px",
        paddingLeft: "10px",
        paddingRight: "10px",
        fontSize: vars.font.size.xs,
        lineHeight: vars.font.lineHeight.relaxed
      },
      icon: {
        width: "28px",
        height: "28px"
      },
      "icon-xs": {
        width: "20px",
        height: "20px",
        borderRadius: vars.radius.sm
      },
      "icon-sm": {
        width: "24px",
        height: "24px"
      },
      "icon-lg": {
        width: "32px",
        height: "32px"
      }
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

// ─── Disabled Overlay ──────────────────────────────────────────────────

export const buttonDisabledOverlay = style({
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  background: gradients.disabled.css,
  opacity: 0,
  transition: "opacity 300ms ease",
  pointerEvents: "none",
  zIndex: -1,
  selectors: {
    "[disabled] > &, [data-force-disabled] > &": {
      opacity: 1
    }
  }
});

// ─── Loading State ─────────────────────────────────────────────────────

const spinKeyframes = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" }
});

export const buttonLoadingOverlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const buttonLoadingSpinner = style({
  animation: `${spinKeyframes} 1s linear infinite`
});

export const buttonLoadingContent = style({
  opacity: 0
});

// ─── SVG Sizing ────────────────────────────────────────────────────────

globalStyle(`${buttonBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${buttonBase} svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

globalStyle(`${buttonBase}[data-size='default'] svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${buttonBase}[data-size='xs'] svg:not([class*='size-'])`, {
  width: "10px",
  height: "10px"
});

globalStyle(`${buttonBase}[data-size='sm'] svg:not([class*='size-'])`, {
  width: "12px",
  height: "12px"
});

globalStyle(`${buttonBase}[data-size='lg'] svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

globalStyle(`${buttonBase}[data-size='icon'] svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

globalStyle(`${buttonBase}[data-size='icon-xs'] svg:not([class*='size-'])`, {
  width: "10px",
  height: "10px"
});

globalStyle(`${buttonBase}[data-size='icon-sm'] svg:not([class*='size-'])`, {
  width: "12px",
  height: "12px"
});

globalStyle(`${buttonBase}[data-size='icon-lg'] svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
