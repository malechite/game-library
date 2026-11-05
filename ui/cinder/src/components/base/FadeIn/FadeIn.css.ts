import { style } from "@vanilla-extract/css";

// A quick, quiet reveal: fade up a few pixels, then get out of the way.
// Matches the pacing of the other ambient motion (LightBar, Lattice).
export const fadeInStyle = style({
  opacity: 0,
  transform: "translateY(6px)",
  transition: "opacity 320ms ease-out, transform 320ms ease-out",
  willChange: "opacity, transform",
  selectors: {
    "&[data-visible]": {
      opacity: 1,
      transform: "none"
    }
  },
  "@media": {
    // No motion requested: show content immediately.
    "(prefers-reduced-motion: reduce)": {
      opacity: 1,
      transform: "none",
      transition: "none"
    }
  }
});
