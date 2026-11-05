import { createTheme } from "@vanilla-extract/css";
import { vars } from "./contract.css";
import {
  lightColors,
  spacingValues,
  radiusValues,
  shadowValues,
  fontSizeValues,
  fontWeightValues,
  lineHeightValues
} from "./tokens";

export const lightTheme = createTheme(vars, {
  color: lightColors,
  spacing: spacingValues,
  radius: radiusValues,
  shadow: shadowValues,
  font: {
    size: fontSizeValues,
    weight: fontWeightValues,
    lineHeight: lineHeightValues
  }
});
