/**
 * Semantic Color Mappings
 *
 * Maps high-level Intent concepts to specific gemstone colors, gradients, and Gemstone enum values.
 */

import { Intent } from "@game-library/types";
import { colors, type ColorValue } from "./colors";
import { Gemstone } from "./gemstone";
import { gradients, type GradientDef } from "./gradients";

// ─── Primary ──────────────────────────────────────────────────────────
// The single switch for the brand color. Every "primary" usage — button
// gradient, light bar, focus ring, theme `primary` — derives from these.

/** The gemstone that represents "primary" across the design system. */
export const primaryGemstone: Gemstone = Gemstone.Sapphire;

/** Solid primary color (links, badges, active indicators). */
export const primaryColor: ColorValue = colors.sapphire[300];

/** Primary gradient for filled surfaces (buttons, focus rings). */
export const primaryGradient: GradientDef = gradients[primaryGemstone];

/** Hover state of the primary gradient. */
export const primaryGradientHover: GradientDef = gradients[`${primaryGemstone}Hover`];

// ─── Intent mappings ──────────────────────────────────────────────────

export const semanticColors: Record<Intent, ColorValue> = {
  [Intent.Primary]: primaryColor,
  [Intent.Secondary]: colors.steel[400],
  [Intent.Success]: colors.jade[500],
  [Intent.Warning]: colors.topaz[300],
  [Intent.Danger]: colors.ruby[500],
  [Intent.Info]: colors.sapphire[300]
};

export const disabledColor = colors.pewter[400];

export const intentGemstone: Record<Intent, Gemstone> = {
  [Intent.Primary]: primaryGemstone,
  [Intent.Secondary]: Gemstone.Steel,
  [Intent.Success]: Gemstone.Jade,
  [Intent.Warning]: Gemstone.Topaz,
  [Intent.Danger]: Gemstone.Ruby,
  [Intent.Info]: Gemstone.Sapphire
};

export const defaultColorName = Gemstone.Steel;
