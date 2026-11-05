"use client";

import { SFIcon, type SFIconProps, type SFIconType } from "@game-library/icon";
import { Size } from "@game-library/types";
import type { SizeMap } from "@game-library/types";

/**
 * CinderIconType — All available icon names for Cinder.
 * Type alias for SFIconType (Phosphor icons).
 */
export type CinderIconType = SFIconType;

/** @deprecated Use CinderIconType or SFIconType */
export type PhosphorIconName = SFIconType;

// Cinder icon sizes (UI-appropriate)
const cinderIconSizes: SizeMap = {
  [Size.XXSmall]: 0.5, // 8px
  [Size.XSmall]: 0.75, // 12px
  [Size.Small]: 1, // 16px (default)
  [Size.Medium]: 1.25, // 20px
  [Size.Large]: 1.5, // 24px
  [Size.XLarge]: 2, // 32px
  [Size.XXLarge]: 3 // 48px
};

export interface CinderIconProps extends Omit<SFIconProps, "sizeMap"> {
  type: CinderIconType;
}

/**
 * Cinder Icon — UI library wrapper around the shared SFIcon.
 *
 * Defaults to "regular" weight and UI-appropriate sizes.
 * Supports gradient fills via linear-gradient() strings.
 */
export const Icon = (props: CinderIconProps) => <SFIcon sizeMap={cinderIconSizes} {...props} />;

Icon.displayName = "CinderIcon";
