import { createTheme } from "@vanilla-extract/css";
import { themeContract } from "./contract.css";

/**
 * Armature Default Theme
 *
 * A minimal, neutral theme that fills the structural contract
 * with standard values. Consumers can create their own themes
 * by calling createTheme(themeContract, { ... }).
 */
export const defaultTheme = createTheme(themeContract, {
  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
    32: "128px",
    40: "160px",
    48: "192px",
    56: "224px",
    64: "256px"
  },
  radii: {
    none: "0px",
    sm: "2px",
    md: "4px",
    lg: "8px",
    xl: "12px",
    full: "9999px"
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  },
  typography: {
    fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px"
    },
    fontWeights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700"
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75"
    }
  }
});
