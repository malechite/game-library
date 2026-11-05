import { style } from "@vanilla-extract/css";
import { spin } from "../../../themes/animations.css";

export const spinnerStyle = style({
  width: "16px",
  height: "16px",
  animation: `${spin} 1s linear infinite`
});
