/**
 * Color Style Utilities
 *
 * Provides helper functions to generate style objects from color names.
 * Used by the content type registry to map color names to full gradient/color styles.
 */

import { colors, type ColorValue } from "./colors";
import { gradients, type GradientDef } from "./gradients";
import { defaultColorName } from "./semantic";

/**
 * Represents the visual style properties for a color
 */
export interface ColorStyle {
  /** The gradient definition (access .css or .oklchCss) */
  gradient: GradientDef;
  /** The hover state gradient definition */
  gradientHover: GradientDef;
  /** The primary solid color (access .oklch or .hex) */
  color: ColorValue;
  /** The lighter shade of the color (access .oklch or .hex) */
  colorLight: ColorValue;
}

/** Color families that have numeric/string shade keys */
type ColorFamily = Record<string | number, ColorValue>;

/** Color entries in the colors object — either a family of shades or a direct ColorValue */
type ColorEntry = ColorFamily | ColorValue;

/** Gradient color names derived from gradient keys (excluding Hover/Pressed variants) */
export type GradientColorName = keyof {
  [K in keyof typeof gradients as K extends `${string}Hover` | `${string}Pressed` ? never : K]: true;
};

/** Check if a value is a ColorValue (has oklch + hex) vs a family of shades */
const isColorValue = (v: ColorEntry): v is ColorValue => typeof (v as ColorValue).oklch === "string";

/** Get a gradient by name with fallback */
const getGradient = (name: string, fallback: string = defaultColorName): GradientDef =>
  (gradients as Record<string, GradientDef>)[name] ?? (gradients as Record<string, GradientDef>)[fallback];

/** Get a shade from a color family with fallback */
const getShade = (family: ColorFamily, shade: number | string, fallback?: ColorValue): ColorValue =>
  family[shade] ?? fallback ?? family[500];

/** Get the color family for a name, resolving direct ColorValue entries */
const getColorFamily = (name: string): ColorFamily => {
  const entry = (colors as Record<string, ColorEntry>)[name] ?? (colors as Record<string, ColorEntry>)[defaultColorName];
  // If it's a direct ColorValue (like white/black), wrap it as a family
  if (isColorValue(entry)) return { 500: entry, 300: entry };
  return entry as ColorFamily;
};

/**
 * Get the full style object for a color name.
 * Dynamically builds the style from gradients and colors tokens.
 *
 * @param colorName - The color name (e.g., "sapphire", "jade", "ruby")
 * @returns The full ColorStyle object with gradient, gradientHover, color, and colorLight
 */
export function getColorStyle(colorName: string): ColorStyle {
  const name = colorName.toLowerCase();
  const family = getColorFamily(name);

  const gradient = getGradient(name);
  const gradientHover = getGradient(`${name}Hover`, `${defaultColorName}Hover`);

  const color = getShade(family, 500);
  const colorLight = getShade(family, 300, color);

  return { gradient, gradientHover, color, colorLight };
}
