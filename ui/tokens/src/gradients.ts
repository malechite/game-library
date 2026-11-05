/**
 * Gradient Tokens
 *
 * Structured gradient definitions using oklch color values by default.
 *
 * Access: `gradients.ruby.css` — oklch colors, sRGB interpolation (default)
 *         `gradients.ruby.oklchCss` — oklch colors, oklch interpolation (smoother perceptual transitions)
 *         `gradients.ruby.hexCss` — hex colors (SVG compatibility)
 */

import { colors, type ColorValue } from "./colors";

/** A color stop within a gradient */
export interface GradientStop {
  color: ColorValue;
  position: string;
}

/** A structured gradient definition with multiple CSS output formats */
export interface GradientDef {
  /** CSS gradient using oklch color values with default sRGB interpolation */
  readonly css: string;
  /** CSS gradient using oklch color values with oklch interpolation — smoother perceptual transitions */
  readonly oklchCss: string;
  /** CSS gradient using hex color values — for SVG linearGradient and legacy contexts */
  readonly hexCss: string;
  /** Angle in degrees */
  readonly angle: number;
  /** Structured stops for programmatic access */
  readonly stops: readonly GradientStop[];
}

/** Create a GradientDef from angle and color stops */
const grad = (angle: number, ...stops: [ColorValue, string][]): GradientDef => {
  const structured = stops.map(([color, position]) => ({ color, position }));
  return {
    css: `linear-gradient(${angle}deg, ${structured.map((s) => `${s.color.oklch} ${s.position}`).join(", ")})`,
    oklchCss: `linear-gradient(in oklch ${angle}deg, ${structured.map((s) => `${s.color.oklch} ${s.position}`).join(", ")})`,
    hexCss: `linear-gradient(${angle}deg, ${structured.map((s) => `${s.color.hex} ${s.position}`).join(", ")})`,
    angle,
    stops: structured
  };
};

// ─── Gemstone Gradients ──────────────────────────────────────────────

export const gradients = {
  // Ruby
  ruby: grad(135, [colors.ruby[500], "0%"], [colors.jasper[500], "100%"]),
  rubyHover: grad(135, [colors.ruby[400], "0%"], [colors.jasper[400], "100%"]),

  // Jasper
  jasper: grad(135, [colors.jasper[500], "0%"], [colors.topaz[500], "100%"]),
  jasperHover: grad(135, [colors.jasper[400], "0%"], [colors.topaz[400], "100%"]),

  // Topaz
  topaz: grad(135, [colors.topaz[500], "0%"], [colors.topaz[300], "100%"]),
  topazHover: grad(135, [colors.topaz[400], "0%"], [colors.topaz[200], "100%"]),

  // Jade
  jade: grad(135, [colors.jade[500], "0%"], [colors.jade[300], "100%"]),
  jadeHover: grad(135, [colors.jade[600], "0%"], [colors.jade[400], "100%"]),

  // Sapphire
  sapphire: grad(135, [colors.sapphire[500], "0%"], [colors.sapphire[300], "100%"]),
  sapphireHover: grad(135, [colors.sapphire[400], "0%"], [colors.sapphire[200], "100%"]),

  // Amethyst
  amethyst: grad(102, [colors.amethyst[500], "0%"], [colors.amethyst[300], "100%"]),
  amethystHover: grad(102, [colors.amethyst[400], "0%"], [colors.amethyst[200], "100%"]),
  amethystPressed: grad(66, [colors.amethyst[400], "0%"], [colors.amethyst[200], "100%"]),

  // Slate / Steel
  slate: grad(135, [colors.steel[400], "0%"], [colors.steel[500], "100%"]),
  slateHover: grad(135, [colors.steel[300], "0%"], [colors.steel[600], "100%"]),
  steel: grad(135, [colors.steel[400], "0%"], [colors.steel[500], "100%"]),
  steelHover: grad(135, [colors.steel[300], "0%"], [colors.steel[600], "100%"]),

  // ─── UI Component Gradients ───────────────────────────────────────────

  disabled: grad(102, [colors.pewter[500], "0%"], [colors.pewter[400], "100%"]),
  disabledHover: grad(102, [colors.ui.disabledHover1, "0%"], [colors.ui.disabledHover2, "100%"]),

  checkbox: grad(102, [colors.pewter[500], "0%"], [colors.pewter[600], "100%"]),
  checkboxCheck: grad(102, [colors.ui.checkboxCheck1, "0%"], [colors.ui.checkboxCheck2, "100%"]),

  dropdown: grad(102, [colors.pewter[500], "0%"], [colors.pewter[400], "100%"]),
  dropdownHover: grad(102, [colors.ui.dropdownHover1, "0%"], [colors.ui.dropdownHover2, "100%"]),
  dropdownSelected: grad(102, [colors.ui.dropdownSelected1, "0%"], [colors.ui.dropdownSelected2, "100%"]),

  tabInactive: grad(102, [colors.ui.tabInactive1, "0%"], [colors.ui.tabInactive2, "100%"]),
  tabHover: grad(102, [colors.ui.tabHover1, "0%"], [colors.ui.tabHover2, "100%"]),
  tabActive: grad(102, [colors.ui.tabActive1, "0%"], [colors.ui.tabActive2, "100%"]),

  tooltip: grad(102, [colors.ui.tooltip1, "0%"], [colors.ui.tooltip2, "100%"]),

  // ─── Surface Gradients ────────────────────────────────────────────────

  surface: grad(145, [colors.onyx[800], "0%"], [colors.onyx[900], "100%"]),
  panel: grad(145, [colors.onyx[700], "0%"], [colors.onyx[900], "100%"]),
  overlay: grad(113, [colors.onyx[900], "0%"], [colors.black, "100%"])
} as const;
