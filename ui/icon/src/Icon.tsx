import React, { useMemo } from "react";
import { Size, BASE_FONT_SIZE } from "@game-library/types";
import type { SizeMap, IconWeight } from "@game-library/types";
import { getIcon, type SFIconType } from "./registry";
import { GradientFill } from "./GradientFill";
import { iconSpin } from "./Icon.css";

// ---------------------------------------------------------------------------
// Size utilities (inlined to avoid depending on armature)
// ---------------------------------------------------------------------------

const getSizeValue = (input: Size | number, defaults: SizeMap): number => (typeof input === "number" ? input : defaults[input]);

const remToPx = (rem: number): number => rem * BASE_FONT_SIZE;

// ---------------------------------------------------------------------------
// Default sizes
// ---------------------------------------------------------------------------

const defaultIconSizes: SizeMap = {
  [Size.XXSmall]: 0.5, // 8px
  [Size.XSmall]: 1, // 16px
  [Size.Small]: 1.5, // 24px
  [Size.Medium]: 2, // 32px
  [Size.Large]: 3, // 48px
  [Size.XLarge]: 4, // 64px
  [Size.XXLarge]: 6 // 96px
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SFIconProps {
  /** Phosphor icon name (e.g. "Gear", "Star", "CaretLeft") */
  type: SFIconType;
  /** Size — a Size enum value or a raw number (rem) */
  size?: Size | number;
  /** Icon weight/style */
  weight?: IconWeight;
  /** Icon color (any CSS color string) */
  color?: string;
  /** Fill color or linear-gradient() string for gradient fills */
  fill?: string;
  /** Apply a spinning animation */
  spin?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Override the default size map (used by consuming packages for custom scales) */
  sizeMap?: SizeMap;
}

// ---------------------------------------------------------------------------
// Internal renderer
// ---------------------------------------------------------------------------

const RenderIcon = ({ type, size, fill, weight }: { type: string; size: number; fill?: string; weight?: IconWeight }) => {
  // Icons come from the registry (see registry.ts) so only registered ones are bundled.
  const Component = getIcon(type);
  if (!Component) return null;

  const props: any = {
    width: size,
    height: size,
    style: { pointerEvents: "none" }
  };
  if (fill) props.fill = fill;
  if (weight) props.weight = weight;

  return <Component {...props} />;
};

// ---------------------------------------------------------------------------
// Icon component
// ---------------------------------------------------------------------------

const iconContainerStyle = (sizeRem: number, color?: string): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: `${sizeRem}rem`,
  height: `${sizeRem}rem`,
  color
});

/**
 * SFIcon — the unified icon component (SF = "shared foundation").
 *
 * Renders a registered Phosphor icon by name with support for gradient fills,
 * custom weights, spin animation, and configurable size scales. Register the
 * icons an app uses once at boot with `registerIcons()`.
 *
 * @example
 * <SFIcon type="Gear" size={Size.Large} />
 * <SFIcon type="Sparkle" fill="linear-gradient(135deg, #481996 0%, #A03ADE 100%)" />
 * <SFIcon type="Spinner" spin />
 */
export const SFIcon = ({
  type,
  size: iconSize = Size.XSmall,
  weight = "regular",
  color,
  fill,
  spin,
  className,
  onClick,
  sizeMap
}: SFIconProps) => {
  const sizes = sizeMap ?? defaultIconSizes;
  const sizeRem = getSizeValue(iconSize, sizes);
  const sizePx = remToPx(sizeRem);

  const gradientId = useMemo(
    () => (fill?.includes("gradient") ? `sf-gradient-${Math.random().toString(36).substring(2, 11)}` : undefined),
    [fill]
  );

  const wrapSpin = (el: React.ReactElement) => (spin ? <span className={iconSpin}>{el}</span> : el);

  const iconElement = (
    <span style={iconContainerStyle(sizeRem, color)} onClick={onClick}>
      <RenderIcon type={type} size={sizePx} fill={gradientId ? `url(#${gradientId})` : fill} weight={weight} />
    </span>
  );

  // Gradient fill path
  if (fill?.includes("gradient") && gradientId) {
    return wrapSpin(
      <GradientFill id={gradientId} gradient={fill} className={className}>
        {iconElement}
      </GradientFill>
    );
  }

  // Standard path
  if (className) {
    return wrapSpin(<span className={className}>{iconElement}</span>);
  }

  return wrapSpin(iconElement);
};

SFIcon.displayName = "SFIcon";
