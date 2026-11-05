import type { SizeMap, Gradient } from "@game-library/types";
import { BASE_FONT_SIZE, responsiveBreakpoints, Size, IconType } from "@game-library/types";

type SpacingValue = boolean | number | undefined;
type SizeValue = boolean | Size | undefined;

// Defaults for Tailwind class levels
const DEFAULT_GAP_LEVEL = 1;
const DEFAULT_PADDING_LEVEL = 4;
const DEFAULT_MARGIN_LEVEL = 4;
const DEFAULT_POSITION_VALUE = 0;
const DEFAULT_BORDER_LEVEL = 2;

export const getSizeValueFromMap = (input: Size | number = Size.Medium, defaults: SizeMap): number => {
  return typeof input === "number" ? input : defaults[input];
};

export const getSizeFromWindowWidth = (width: number): Size => {
  const entries = Object.entries(responsiveBreakpoints);
  let windowSize = Size.Large;

  for (let [size, breakpoint] of entries) {
    if (width >= breakpoint) windowSize = size as Size;
  }

  return windowSize;
};

const getValue = (value: SpacingValue, defaultValue: number): number => {
  if (value === true) return defaultValue;
  if (!value) return 0;
  return value;
};

export const parseGap = (gap: SpacingValue) => getValue(gap, DEFAULT_GAP_LEVEL);
export const parsePadding = (padding: SpacingValue) => getValue(padding, DEFAULT_PADDING_LEVEL);
export const parseBorder = (border: SpacingValue) => getValue(border, DEFAULT_BORDER_LEVEL);
export const parseRounded = (rounded: SizeValue) =>
  `${rounded && typeof rounded === "boolean" ? "rounded" : roundedSizeMap[rounded as Size]}`;
export const parseMargin = (margin: SpacingValue) => getValue(margin, DEFAULT_MARGIN_LEVEL);
export const parsePosition = (position: SpacingValue) => getValue(position, DEFAULT_POSITION_VALUE);

const roundedSizeMap: {
  [key in Size]: string;
} = {
  [Size.XXSmall]: "rounded-sm",
  [Size.XSmall]: "rounded-sm",
  [Size.Small]: "rounded-sm",
  [Size.Medium]: "rounded-md",
  [Size.Large]: "rounded-lg",
  [Size.XLarge]: "rounded-xl",
  [Size.XXLarge]: "rounded-2xl"
};

export const hexToRGBA = (hex: string | undefined, opacity = 1): string => {
  if (!hex || !isHexValue(hex)) {
    console.error(`Invalid hex value: ${hex}`);
    return "rgba(0, 0, 0, 0)";
  }
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const remToPx = (rem: number): number => rem * BASE_FONT_SIZE;

export const linearGradient = (degrees: number, gradient: Gradient) => {
  const parts = gradient.map((e) => {
    const rgbaColor = hexToRGBA(e.color, e.opacity);
    return `${rgbaColor} ${e.percent}%`;
  });

  return `linear-gradient(${degrees}deg, ${parts.join(", ")})`;
};

export const getRandomIcon = (): IconType => {
  const icons = Object.values(IconType);
  return icons[Math.floor(Math.random() * icons.length)];
};

export const getRandomImageUrl = (size = 500): string => `https://picsum.photos/${size}`;
export const getRandomCourseLevel = (): number => Math.floor(Math.random() * 5) + 1;
export const getRandomEstimatedTime = (): number => Math.floor(Math.random() * 120);
export const getRandomBoolean = (): boolean => Math.random() > 0.5;

export const isHexValue = (value: string) => /^#[0-9A-Fa-f]{6}$/.test(value);
export const isColor = (value: string) => isHexValue(value) || value === "transparent";
export const isPath = (value: string) => /^[\w/]+(?:\/[\w/]+)*$/.test(value);

export const locationKey = ([x, y]: [number, number]) => `${x},${y}`;
