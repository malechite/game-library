import { style, keyframes } from "@vanilla-extract/css";

const spinKeyframes = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" }
});

export const iconSpin = style({
  display: "inline-flex",
  animation: `${spinKeyframes} 1s linear infinite`
});
