import { BASE_FONT_SIZE, type Gradient, type Size, type SizeMap } from "@game-library/types";

export const getSizeValueFromMap = (input: Size | number = "medium" as Size, defaults: SizeMap): number => {
  return typeof input === "number" ? input : defaults[input];
};

export const remToPx = (rem: number): number => rem * BASE_FONT_SIZE;

export const hexToRGBA = (hex: string, opacity = 1): string => {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const linearGradient = (degrees: number, gradient: Gradient) => {
  const parts = gradient.map((e) => {
    const rgbaColor = hexToRGBA(e.color, e.opacity);
    return `${rgbaColor} ${e.percent}%`;
  });

  return `linear-gradient(${degrees}deg, ${parts.join(", ")})`;
};

export const isInputElement = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || target.isContentEditable;
};
