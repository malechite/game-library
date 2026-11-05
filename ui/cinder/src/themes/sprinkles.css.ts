import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./contract.css";

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" }
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline", "inline-flex", "grid", "inline-block"],
    flexDirection: ["row", "column", "row-reverse", "column-reverse"],
    justifyContent: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
    alignItems: ["flex-start", "flex-end", "center", "stretch", "baseline"],
    flexWrap: ["wrap", "nowrap", "wrap-reverse"],
    flexShrink: [0, 1],
    flexGrow: [0, 1],
    position: ["relative", "absolute", "fixed", "sticky"],
    overflow: ["hidden", "auto", "visible", "scroll"],
    overflowX: ["hidden", "auto", "visible", "scroll"],
    overflowY: ["hidden", "auto", "visible", "scroll"],
    width: { full: "100%", auto: "auto", screen: "100vw" },
    height: { full: "100%", auto: "auto", screen: "100vh" },
    gridTemplateColumns: {
      1: "repeat(1, 1fr)",
      2: "repeat(2, 1fr)",
      3: "repeat(3, 1fr)",
      4: "repeat(4, 1fr)",
      6: "repeat(6, 1fr)",
      12: "repeat(12, 1fr)"
    }
  }
});

const spacingProperties = defineProperties({
  properties: {
    paddingTop: vars.spacing,
    paddingBottom: vars.spacing,
    paddingLeft: vars.spacing,
    paddingRight: vars.spacing,
    marginTop: vars.spacing,
    marginBottom: vars.spacing,
    marginLeft: vars.spacing,
    marginRight: vars.spacing,
    gap: vars.spacing,
    rowGap: vars.spacing,
    columnGap: vars.spacing,
    top: vars.spacing,
    right: vars.spacing,
    bottom: vars.spacing,
    left: vars.spacing,
    borderRadius: vars.radius
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    inset: ["top", "right", "bottom", "left"]
  }
});

const visualProperties = defineProperties({
  properties: {
    opacity: { 0: "0", 50: "0.5", 100: "1" },
    zIndex: { 0: "0", 10: "10", 20: "20", 30: "30", 40: "40", 50: "50" },
    cursor: ["default", "pointer", "not-allowed", "grab", "grabbing", "text"],
    pointerEvents: ["none", "auto"],
    textAlign: ["left", "center", "right"],
    whiteSpace: ["nowrap", "normal", "pre", "pre-wrap"],
    textDecoration: ["none", "underline", "line-through"],
    textTransform: ["none", "uppercase", "lowercase", "capitalize"],
    boxShadow: vars.shadow
  }
});

const typographyProperties = defineProperties({
  properties: {
    fontSize: vars.font.size,
    fontWeight: vars.font.weight,
    lineHeight: vars.font.lineHeight
  }
});

export const sprinkles = createSprinkles(responsiveProperties, spacingProperties, visualProperties, typographyProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
