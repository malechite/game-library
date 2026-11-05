import { style, styleVariants } from "@vanilla-extract/css";
import { themeContract } from "../../themes/contract.css";

const dynamicBase = style({
  fontWeight: "700"
});

export const textSizeStyles = styleVariants({
  DynamicHeading1: [
    dynamicBase,
    {
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      lineHeight: "1.1"
    }
  ],
  DynamicHeading2: [
    dynamicBase,
    {
      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
      lineHeight: "1.15"
    }
  ],
  DynamicHeading3: [
    dynamicBase,
    {
      fontSize: "clamp(1.25rem, 3vw, 2rem)",
      lineHeight: "1.2"
    }
  ],
  DynamicHeading4: [
    dynamicBase,
    {
      fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
      lineHeight: "1.25"
    }
  ],
  DynamicHeading5: [
    dynamicBase,
    {
      fontSize: "clamp(1rem, 2vw, 1.25rem)",
      lineHeight: "1.3"
    }
  ],
  DynamicHeading6: [
    dynamicBase,
    {
      fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
      lineHeight: "1.35"
    }
  ],
  DynamicBody: {
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
    lineHeight: "1.5"
  },
  StaticXXLarge: {
    fontSize: themeContract.typography.fontSizes["2xl"]
  },
  StaticXLarge: {
    fontSize: themeContract.typography.fontSizes.xl
  },
  StaticLarge: {
    fontSize: themeContract.typography.fontSizes.lg
  },
  StaticMedium: {
    fontSize: themeContract.typography.fontSizes.md
  },
  StaticSmall: {
    fontSize: themeContract.typography.fontSizes.sm
  },
  StaticXSmall: {
    fontSize: themeContract.typography.fontSizes.xs
  }
});
