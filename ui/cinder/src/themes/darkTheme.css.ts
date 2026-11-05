import { createTheme } from "@vanilla-extract/css";
import { vars } from "./contract.css";
import {
  darkColors,
  spacingValues,
  radiusValues,
  shadowValues,
  fontSizeValues,
  fontWeightValues,
  lineHeightValues
} from "./tokens";

export const darkTheme = createTheme(vars, {
  color: darkColors,
  spacing: spacingValues,
  radius: radiusValues,
  shadow: shadowValues,
  font: {
    size: fontSizeValues,
    weight: fontWeightValues,
    lineHeight: lineHeightValues
  }
});
