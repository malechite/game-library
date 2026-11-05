import { createThemeContract } from "@vanilla-extract/css";

/**
 * Armature Theme Contract
 *
 * Defines the structural tokens that all themes must implement.
 * This contract is color-agnostic — consumers provide their own
 * colors through CSS custom properties, inline styles, or className.
 */
export const themeContract = createThemeContract({
  spacing: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    12: null,
    16: null,
    20: null,
    24: null,
    32: null,
    40: null,
    48: null,
    56: null,
    64: null
  },
  radii: {
    none: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    full: null
  },
  shadows: {
    sm: null,
    md: null,
    lg: null,
    xl: null
  },
  typography: {
    fontSizes: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      "2xl": null
    },
    fontWeights: {
      normal: null,
      medium: null,
      semibold: null,
      bold: null
    },
    lineHeights: {
      tight: null,
      normal: null,
      relaxed: null
    }
  }
});
