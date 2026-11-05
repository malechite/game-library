/**
 * Color Tokens (gemstone palette)
 *
 * Dual-format color definitions: OKLCH (primary, for CSS) + hex (reference, for SVG/display).
 * Access: `colors.ruby[500].oklch` or `colors.ruby[500].hex`
 *
 * OKLCH values generated using culori for accuracy.
 */

/** A color value in both OKLCH (primary) and hex (reference) formats */
export interface ColorValue {
  /** OKLCH CSS string — primary format for CSS properties */
  readonly oklch: string;
  /** Hex CSS string — for SVG fills, display, and backwards compatibility */
  readonly hex: string;
}

/** Helper to create a frozen ColorValue */
const cv = (oklch: string, hex: string): ColorValue => ({ oklch, hex });

// ─── Gemstone Colors ──────────────────────────────────────────────────

export const colors = {
  ruby: {
    400: cv("oklch(0.5792 0.2244 31.20)", "#e02000"),
    500: cv("oklch(0.5441 0.213163 30.8088)", "#cf1900")
  },

  jasper: {
    400: cv("oklch(0.6502 0.2024 40.39)", "#ef5500"),
    500: cv("oklch(0.6052 0.2006 37.43)", "#df4400")
  },

  topaz: {
    200: cv("oklch(0.86 0.1702 88.18)", "#ffc920"),
    300: cv("oklch(0.8272 0.171067 80.5261)", "#ffb800"),
    400: cv("oklch(0.7847 0.1668 66.39)", "#ffa020"),
    500: cv("oklch(0.7554 0.177697 59.6859)", "#ff8f00")
  },

  jade: {
    300: cv("oklch(0.633 0.1833 147.4)", "#0ca640"),
    400: cv("oklch(0.6804 0.1965 147.51)", "#0eb748"),
    500: cv("oklch(0.5116 0.1064 162.53)", "#117954"),
    600: cv("oklch(0.5622 0.1177 162.45)", "#138a60")
  },

  sapphire: {
    200: cv("oklch(0.6647 0.1534 254.75)", "#4b95ef"),
    300: cv("oklch(0.6115 0.1552 255.1)", "#3a84de"),
    400: cv("oklch(0.4918 0.1283 252.91)", "#2062a7"),
    500: cv("oklch(0.4384 0.1269 255.98)", "#195196")
  },

  amethyst: {
    200: cv("oklch(0.6298 0.1966 310.59)", "#ae5edf"),
    300: cv("oklch(0.5704 0.2374 308.99)", "#a03ade"),
    400: cv("oklch(0.4848 0.2082 294.79)", "#6c35c5"),
    500: cv("oklch(0.3722 0.1828 291.79)", "#481996"),
    600: cv("oklch(0.3342 0.0270 321.10)", "#3d323f"),
    700: cv("oklch(0.2817 0.0213 319.46)", "#2e2630"),
    light: cv("oklch(0.6459 0.0978 306.38)", "#9d7ebd"),
    lighter: cv("oklch(0.5314 0.0990 306.69)", "#7b5c99")
  },

  // ─── Neutral Colors ──────────────────────────────────────────────────

  steel: {
    300: cv("oklch(0.5741 0.0728 253.71)", "#5a7ba3"),
    400: cv("oklch(0.4858 0.0638 254.58)", "#466183"),
    500: cv("oklch(0.3391 0.0518 253.49)", "#243952"),
    600: cv("oklch(0.4273 0.0641 257.14)", "#385072")
  },

  pewter: {
    300: cv("oklch(0.4986 0.0215 250.78)", "#5a646f"),
    400: cv("oklch(0.4421 0.0214 253.50)", "#4b545f"),
    500: cv("oklch(0.4517 0.0110 258.36)", "#52565c"),
    600: cv("oklch(0.3866 0.0186 251.40)", "#3d454e")
  },

  chrome: {
    light: cv("oklch(0.6033 0.0126 269.47)", "#7e8189"),
    dark: cv("oklch(0.2603 0.0000 0.00)", "#242424"),
    medium: cv("oklch(0.3772 0.0101 253.96)", "#3e4247")
  },

  onyx: {
    500: cv("oklch(0.3013 0.0056 271.23)", "#2d2e31"),
    700: cv("oklch(0.2603 0.0000 0.00)", "#242424"),
    800: cv("oklch(0.2632 0.0168 280.18)", "#23242D"),
    900: cv("oklch(0.2029 0.0119 285.29)", "#16161C")
  },

  slate: {
    500: cv("oklch(0.3391 0.0518 253.49)", "#243952")
  },

  // ─── Pure Values ──────────────────────────────────────────────────────

  white: cv("oklch(1 0 0)", "#ffffff"),
  black: cv("oklch(0 0 0)", "#000000"),

  // ─── UI-Specific Colors ────────────────────────────────────────────────
  // Colors used in UI component gradients (checkbox, dropdown, tabs, tooltip)

  ui: {
    checkboxCheck1: cv("oklch(0.8736 0.0339 255.22)", "#C7D7EC"),
    checkboxCheck2: cv("oklch(0.6828 0.0766 253.81)", "#789CC8"),
    dropdownHover1: cv("oklch(0.5035 0.0154 251.68)", "#5E656D"),
    dropdownHover2: cv("oklch(0.4844 0.0284 254.10)", "#54606F"),
    dropdownSelected1: cv("oklch(0.5660 0.0150 251.65)", "#70777F"),
    dropdownSelected2: cv("oklch(0.5181 0.0326 251.69)", "#5B6A7B"),
    tabInactive1: cv("oklch(0.3260 0.0089 276.87)", "#333439"),
    tabInactive2: cv("oklch(0.3181 0.0090 276.86)", "#313237"),
    tabHover1: cv("oklch(0.3667 0.0095 260.72)", "#3C3F44"),
    tabHover2: cv("oklch(0.3620 0.0102 253.96)", "#3A3E43"),
    tabActive1: cv("oklch(0.4039 0.0114 258.36)", "#45494F"),
    tabActive2: cv("oklch(0.4164 0.0183 251.37)", "#454D56"),
    tooltip1: cv("oklch(0.3534 0.0110 248.14)", "#373C41"),
    tooltip2: cv("oklch(0.2507 0.0048 248.02)", "#202224"),
    disabledHover1: cv("oklch(0.5270 0.0225 253.01)", "#626C78"),
    disabledHover2: cv("oklch(0.4769 0.0305 253.75)", "#515E6E")
  }
} as const;
