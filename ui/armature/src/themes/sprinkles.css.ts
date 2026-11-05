import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { themeContract } from "./contract.css";

/**
 * Responsive layout properties
 *
 * These properties support responsive conditions:
 * mobile (default), tablet (768px+), desktop (1024px+)
 */
const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" }
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline", "inline-block", "grid"],
    flexDirection: ["row", "column"],
    justifyContent: ["stretch", "flex-start", "center", "flex-end", "space-around", "space-between"],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    flexWrap: ["nowrap", "wrap"],
    flexShrink: [0, 1],
    flexGrow: [0, 1],
    flex: { 1: "1", auto: "auto", none: "none" },
    position: ["relative", "absolute", "fixed", "sticky"],
    overflow: ["visible", "hidden", "auto", "scroll"],
    overflowX: ["visible", "hidden", "auto", "scroll"],
    overflowY: ["visible", "hidden", "auto", "scroll"],
    width: { full: "100%", auto: "auto" },
    height: { full: "100%", auto: "auto" },
    gridTemplateColumns: {
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
      7: "repeat(7, minmax(0, 1fr))",
      8: "repeat(8, minmax(0, 1fr))",
      9: "repeat(9, minmax(0, 1fr))",
      10: "repeat(10, minmax(0, 1fr))",
      11: "repeat(11, minmax(0, 1fr))",
      12: "repeat(12, minmax(0, 1fr))"
    }
  },
  shorthands: {
    placeItems: ["justifyContent", "alignItems"]
  }
});

/**
 * Spacing properties (from theme contract)
 */
const spacingProperties = defineProperties({
  properties: {
    paddingTop: themeContract.spacing,
    paddingBottom: themeContract.spacing,
    paddingLeft: themeContract.spacing,
    paddingRight: themeContract.spacing,
    marginTop: themeContract.spacing,
    marginBottom: themeContract.spacing,
    marginLeft: themeContract.spacing,
    marginRight: themeContract.spacing,
    gap: themeContract.spacing,
    rowGap: themeContract.spacing,
    columnGap: themeContract.spacing,
    top: themeContract.spacing,
    right: themeContract.spacing,
    bottom: themeContract.spacing,
    left: themeContract.spacing,
    borderWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px"
    },
    borderRadius: themeContract.radii
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

/**
 * Visual properties (unconditional)
 */
const visualProperties = defineProperties({
  properties: {
    opacity: { 0: "0", 100: "1" },
    zIndex: {
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50"
    },
    cursor: ["default", "pointer", "grab", "grabbing", "not-allowed"],
    pointerEvents: ["none", "auto"],
    textAlign: ["left", "center", "right"],
    whiteSpace: ["normal", "nowrap", "pre-wrap"],
    textDecoration: ["none", "underline"],
    textTransform: ["none", "capitalize", "uppercase"],
    boxShadow: themeContract.shadows
  }
});

/**
 * Typography properties (from theme contract)
 */
const typographyProperties = defineProperties({
  properties: {
    fontSize: themeContract.typography.fontSizes,
    fontWeight: themeContract.typography.fontWeights,
    lineHeight: themeContract.typography.lineHeights
  }
});

export const sprinkles = createSprinkles(responsiveProperties, spacingProperties, visualProperties, typographyProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
