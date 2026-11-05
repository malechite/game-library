import { style, keyframes } from "@vanilla-extract/css";

const modalIn = keyframes({
  from: { opacity: "0", transform: "scale(0.95)" },
  to: { opacity: "1", transform: "scale(1)" }
});

const modalOut = keyframes({
  from: { opacity: "1", transform: "scale(1)" },
  to: { opacity: "0", transform: "scale(0.95)" }
});

export const uiSystemCenter = style({
  position: "fixed",
  inset: 0,
  zIndex: 51,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none"
});

export const uiSystemModalWrapper = style({
  pointerEvents: "auto",
  selectors: {
    '&[data-state="open"]': {
      animationName: modalIn,
      animationDuration: "200ms",
      animationFillMode: "forwards"
    },
    '&[data-state="closing"]': {
      animationName: modalOut,
      animationDuration: "200ms",
      animationFillMode: "forwards"
    }
  }
});
