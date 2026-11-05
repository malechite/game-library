import { keyframes } from "@vanilla-extract/css";

export const fadeIn = keyframes({
  from: { opacity: "0" },
  to: { opacity: "1" }
});

export const fadeOut = keyframes({
  from: { opacity: "1" },
  to: { opacity: "0" }
});

export const slideInFromTop = keyframes({
  from: { transform: "translateY(-100%)" },
  to: { transform: "translateY(0)" }
});

export const slideInFromBottom = keyframes({
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" }
});

export const slideInFromLeft = keyframes({
  from: { transform: "translateX(-100%)" },
  to: { transform: "translateX(0)" }
});

export const slideInFromRight = keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" }
});

export const scaleIn = keyframes({
  from: { opacity: "0", transform: "scale(0.95)" },
  to: { opacity: "1", transform: "scale(1)" }
});

export const scaleOut = keyframes({
  from: { opacity: "1", transform: "scale(1)" },
  to: { opacity: "0", transform: "scale(0.95)" }
});

export const accordionOpen = keyframes({
  from: { height: "0", opacity: "0" },
  to: { height: "var(--accordion-content-height)", opacity: "1" }
});

export const accordionClose = keyframes({
  from: { height: "var(--accordion-content-height)", opacity: "1" },
  to: { height: "0", opacity: "0" }
});

export const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" }
});

export const pulse = keyframes({
  "0%, 100%": { opacity: "1" },
  "50%": { opacity: "0.5" }
});

export const indeterminate = keyframes({
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(400%)" }
});
