import { colors, primaryColor } from "@game-library/tokens";

// ─── Light Theme Colors ───────────────────────────────────────────────

export const lightColors = {
  // Neutrals
  background: "oklch(1 0 0)",
  foreground: "oklch(0.141 0.005 285.823)",
  card: "oklch(1 0 0)",
  cardForeground: "oklch(0.141 0.005 285.823)",
  popover: "oklch(1 0 0)",
  popoverForeground: "oklch(0.141 0.005 285.823)",
  secondary: "oklch(0.967 0.001 286.375)",
  secondaryForeground: "oklch(0.21 0.006 285.885)",
  muted: "oklch(0.967 0.001 286.375)",
  mutedForeground: "oklch(0.552 0.016 285.938)",
  accent: "oklch(0.967 0.001 286.375)",
  accentForeground: "oklch(0.21 0.006 285.885)",
  border: "oklch(0.92 0.004 286.32)",
  input: "oklch(0.92 0.004 286.32)",
  ring: "oklch(0.705 0.015 286.067)",

  // Semantic — wired to gemstone tokens
  primary: colors.sapphire[500].oklch,
  primaryForeground: colors.white.oklch,
  destructive: colors.ruby[500].oklch,
  destructiveForeground: colors.white.oklch,

  // Charts — gemstone rainbow
  chart1: colors.topaz[300].oklch,
  chart2: colors.jade[300].oklch,
  chart3: colors.sapphire[300].oklch,
  chart4: colors.amethyst[300].oklch,
  chart5: colors.ruby[500].oklch,

  // Sidebar
  sidebar: "oklch(0.985 0 0)",
  sidebarForeground: "oklch(0.141 0.005 285.823)",
  sidebarPrimary: colors.sapphire[300].oklch,
  sidebarPrimaryForeground: colors.white.oklch,
  sidebarAccent: "oklch(0.967 0.001 286.375)",
  sidebarAccentForeground: "oklch(0.21 0.006 285.885)",
  sidebarBorder: "oklch(0.92 0.004 286.32)",
  sidebarRing: "oklch(0.705 0.015 286.067)"
};

// ─── Dark Theme Colors ────────────────────────────────────────────────

export const darkColors = {
  // Neutrals — mapped to closest gemstone tokens
  // TODO: Add darker onyx shades (onyx.800, onyx.900) for exact matches
  background: colors.chrome.dark.oklch, // L=0.26 (orig L=0.14 — needs onyx.900)
  foreground: colors.white.oklch,
  card: colors.onyx[500].oklch, // L=0.30 (orig L=0.21 — needs onyx.800)
  cardForeground: colors.white.oklch,
  popover: colors.onyx[500].oklch,
  popoverForeground: colors.white.oklch,
  secondary: colors.onyx[500].oklch, // L=0.30 (orig L=0.27)
  secondaryForeground: colors.white.oklch,
  muted: colors.onyx[500].oklch,
  mutedForeground: colors.chrome.light.oklch, // L=0.60 (orig L=0.70 — needs lighter shade)
  accent: colors.onyx[500].oklch,
  accentForeground: colors.white.oklch,
  border: "oklch(1 0 0 / 10%)", // alpha — stays as-is
  input: "oklch(1 0 0 / 15%)", // alpha — stays as-is
  ring: colors.pewter[300].oklch, // L=0.50 (orig L=0.55)

  // Semantic — wired to gemstone tokens
  primary: primaryColor.oklch, // Follows the primary gemstone (see @game-library/tokens semantic.ts)
  primaryForeground: colors.white.oklch,
  destructive: colors.ruby[400].oklch,
  destructiveForeground: colors.white.oklch,

  // Charts — gemstone rainbow
  chart1: colors.topaz[300].oklch,
  chart2: colors.jade[300].oklch,
  chart3: colors.sapphire[300].oklch,
  chart4: colors.amethyst[300].oklch,
  chart5: colors.ruby[500].oklch,

  // Sidebar
  sidebar: "oklch(0.21 0.006 285.885)",
  sidebarForeground: "oklch(0.985 0 0)",
  sidebarPrimary: colors.sapphire[200].oklch,
  sidebarPrimaryForeground: colors.white.oklch,
  sidebarAccent: "oklch(0.274 0.006 286.033)",
  sidebarAccentForeground: "oklch(0.985 0 0)",
  sidebarBorder: "oklch(1 0 0 / 10%)",
  sidebarRing: "oklch(0.552 0.016 285.938)"
};

// ─── Shared Design Tokens ─────────────────────────────────────────────

export const spacingValues = {
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
};

export const radiusValues = {
  none: "0px",
  sm: "0.27rem",
  md: "0.36rem",
  lg: "0.45rem",
  xl: "0.63rem",
  "2xl": "0.81rem",
  "3xl": "0.99rem",
  "4xl": "1.17rem",
  full: "9999px"
};

export const shadowValues = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
};

export const fontSizeValues = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem"
};

export const fontWeightValues = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
};

export const lineHeightValues = {
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.75"
};
