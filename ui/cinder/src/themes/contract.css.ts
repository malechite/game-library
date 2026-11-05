import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    background: null,
    foreground: null,
    card: null,
    cardForeground: null,
    popover: null,
    popoverForeground: null,
    primary: null,
    primaryForeground: null,
    secondary: null,
    secondaryForeground: null,
    muted: null,
    mutedForeground: null,
    accent: null,
    accentForeground: null,
    destructive: null,
    destructiveForeground: null,
    border: null,
    input: null,
    ring: null,
    chart1: null,
    chart2: null,
    chart3: null,
    chart4: null,
    chart5: null,
    sidebar: null,
    sidebarForeground: null,
    sidebarPrimary: null,
    sidebarPrimaryForeground: null,
    sidebarAccent: null,
    sidebarAccentForeground: null,
    sidebarBorder: null,
    sidebarRing: null
  },
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
  radius: {
    none: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    "2xl": null,
    "3xl": null,
    "4xl": null,
    full: null
  },
  shadow: {
    sm: null,
    md: null,
    lg: null,
    xl: null
  },
  font: {
    size: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      "2xl": null
    },
    weight: {
      normal: null,
      medium: null,
      semibold: null,
      bold: null
    },
    lineHeight: {
      tight: null,
      normal: null,
      relaxed: null
    }
  }
});
