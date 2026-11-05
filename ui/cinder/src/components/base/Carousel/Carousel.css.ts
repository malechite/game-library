import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const carouselRoot = style({
  position: "relative"
});

export const carouselViewport = style({
  overflow: "hidden"
});

export const carouselContentHorizontal = style({
  display: "flex",
  marginLeft: "-16px"
});

export const carouselContentVertical = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "-16px"
});

export const carouselItemHorizontal = style({
  minWidth: 0,
  flexShrink: 0,
  flexGrow: 0,
  flexBasis: "100%",
  paddingLeft: "16px"
});

export const carouselItemVertical = style({
  minWidth: 0,
  flexShrink: 0,
  flexGrow: 0,
  flexBasis: "100%",
  paddingTop: "16px"
});

export const carouselButtonPrevHorizontal = style({
  position: "absolute",
  touchAction: "manipulation",
  borderRadius: vars.radius.full,
  top: "50%",
  left: "-48px",
  transform: "translateY(-50%)"
});

export const carouselButtonPrevVertical = style({
  position: "absolute",
  touchAction: "manipulation",
  borderRadius: vars.radius.full,
  top: "-48px",
  left: "50%",
  transform: "translateX(-50%) rotate(90deg)"
});

export const carouselButtonNextHorizontal = style({
  position: "absolute",
  touchAction: "manipulation",
  borderRadius: vars.radius.full,
  top: "50%",
  right: "-48px",
  transform: "translateY(-50%)"
});

export const carouselButtonNextVertical = style({
  position: "absolute",
  touchAction: "manipulation",
  borderRadius: vars.radius.full,
  bottom: "-48px",
  left: "50%",
  transform: "translateX(-50%) rotate(90deg)"
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0
});
