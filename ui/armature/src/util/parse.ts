import type { Size } from "@game-library/types";

type SpacingValue = boolean | number | undefined;
type SizeValue = boolean | Size | undefined;

const DEFAULT_GAP_LEVEL = 1;
const DEFAULT_PADDING_LEVEL = 4;
const DEFAULT_MARGIN_LEVEL = 4;
const DEFAULT_POSITION_VALUE = 0;
const DEFAULT_BORDER_LEVEL = 2;

const getValue = (value: SpacingValue, defaultValue: number): number => {
  if (value === true) return defaultValue;
  if (!value) return 0;
  return value;
};

export const isSet = (value: any) => value !== null && value !== undefined;

export const parseGap = (gap: SpacingValue) => getValue(gap, DEFAULT_GAP_LEVEL);
export const parsePadding = (padding: SpacingValue) => getValue(padding, DEFAULT_PADDING_LEVEL);
export const parseMargin = (margin: SpacingValue) => getValue(margin, DEFAULT_MARGIN_LEVEL);
export const parsePosition = (position: SpacingValue) => getValue(position, DEFAULT_POSITION_VALUE);
export const parseBorder = (border: SpacingValue) => getValue(border, DEFAULT_BORDER_LEVEL);

const roundedSizeMap: Record<string, string> = {
  xxsmall: "sm",
  xsmall: "sm",
  small: "sm",
  medium: "md",
  large: "lg",
  xlarge: "xl",
  xxlarge: "xl"
};

export const parseRounded = (rounded: SizeValue): string => {
  if (rounded === true) return "md";
  if (!rounded) return "none";
  return roundedSizeMap[rounded as string] ?? "md";
};
