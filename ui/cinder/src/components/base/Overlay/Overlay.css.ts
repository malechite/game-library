import { style, globalStyle } from "@vanilla-extract/css";
import { gradients } from "@game-library/tokens";
import { fadeIn, fadeOut } from "../../../themes/animations.css";

const withAlpha = (oklch: string, alpha: number) => oklch.replace(")", ` / ${alpha})`);

const { stops, angle } = gradients.overlay;
const overlayBg = `linear-gradient(in oklch ${angle}deg, ${withAlpha(stops[0].color.oklch, 0.6)}, ${withAlpha(stops[1].color.oklch, 0.6)})`;

export const overlayBase = style({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  background: overlayBg,
  backdropFilter: "blur(0px)",
  transition: "backdrop-filter 300ms ease",
  isolation: "isolate",
  selectors: {
    '&[data-state="open"]': {
      animationName: fadeIn,
      animationDuration: "200ms",
      animationFillMode: "forwards",
      backdropFilter: "blur(2px)"
    },
    '&[data-state="closing"]': {
      animationName: fadeOut,
      animationDuration: "200ms",
      animationFillMode: "forwards",
      backdropFilter: "blur(0px)"
    }
  }
});

// Noise layer to break up gradient banding
globalStyle(`${overlayBase}::after`, {
  content: '""',
  position: "absolute",
  inset: 0,
  opacity: 0.4,
  mixBlendMode: "overlay",
  filter: "url(#overlay-noise)",
  pointerEvents: "none"
});
