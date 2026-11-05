import { style } from "@vanilla-extract/css";
import { colors } from "@game-library/tokens";
import { vars } from "@game-library/cinder/theme";

export const cover = style({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  backgroundColor: colors.onyx[900].oklch
});

// Box art comes in every shape (tall NES boxes, wide SNES boxes, square jewel
// cases). The art itself is shown whole; a blurred, darkened copy of the same
// image fills the rest of the square so no tile has empty bars.
export const coverBackdrop = style({
  position: "absolute",
  inset: "-12%",
  width: "124%",
  height: "124%",
  objectFit: "cover",
  filter: "blur(18px) saturate(1.2)",
  opacity: 0,
  transition: "opacity 400ms ease-out",
  selectors: {
    "&[data-loaded]": { opacity: 0.45 }
  }
});

export const coverImage = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  padding: vars.spacing[3],
  opacity: 0,
  transform: "scale(0.985)",
  transition: "opacity 320ms ease-out, transform 320ms ease-out",
  selectors: {
    "&[data-loaded]": { opacity: 1, transform: "none" },
    // Thumbnails: no inset, so the art uses the whole (small) box.
    "&[data-compact]": { padding: 0 }
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none", transform: "none" }
  }
});

export const coverPlaceholder = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: `color-mix(in oklch, ${vars.color.mutedForeground} 45%, transparent)`,
  background: `radial-gradient(circle at 50% 35%, ${colors.onyx[500].oklch}, ${colors.onyx[900].oklch})`
});
