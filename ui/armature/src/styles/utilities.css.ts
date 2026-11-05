import { style, keyframes, globalStyle } from "@vanilla-extract/css";

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" }
});

export const animateSpin = style({
  animation: `${spin} 1s linear infinite`
});

export const noScrollbar = style({
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
});

export const truncateText = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

export const lineClampBase = style({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
});

export const listReset = style({
  listStyle: "none",
  padding: 0,
  margin: 0
});

export const objectCover = style({
  objectFit: "cover"
});

export const borderTop = style({
  borderTop: "1px solid currentColor"
});

export const expandFull = style({
  width: "100%",
  height: "100%",
  flex: 1
});

export const widthFull = style({
  width: "100%"
});
