import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { fadeIn, fadeOut, scaleIn, scaleOut } from "../../../themes/animations.css";

export const popoverPositioner = style({
  isolation: "isolate",
  // Above the modal layer (overlay 50 / content 51) so popovers show over modals.
  zIndex: 60
});

export const popoverContent = style({
  zIndex: 50,
  display: "flex",
  width: "288px",
  transformOrigin: "var(--transform-origin)",
  flexDirection: "column",
  gap: vars.spacing[4],
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.popover,
  padding: "10px",
  fontSize: vars.font.size.xs,
  color: vars.color.popoverForeground,
  boxShadow: vars.shadow.md,
  outline: "none",
  transition: "all 100ms ease",
  border: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  selectors: {
    "&[data-side='bottom']": {
      animationName: `${fadeIn}, ${scaleIn}`
    },
    "&[data-side='top']": {
      animationName: `${fadeIn}, ${scaleIn}`
    },
    "&[data-open]": {
      animationName: `${fadeIn}, ${scaleIn}`,
      animationDuration: "150ms",
      animationFillMode: "forwards"
    },
    "&[data-closed]": {
      animationName: `${fadeOut}, ${scaleOut}`,
      animationDuration: "150ms",
      animationFillMode: "forwards"
    }
  }
});

export const popoverHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[1],
  fontSize: vars.font.size.xs
});

export const popoverTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium
});

export const popoverDescription = style({
  color: vars.color.mutedForeground
});
