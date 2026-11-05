import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { fadeIn, fadeOut, scaleIn, scaleOut } from "../../../themes/animations.css";

export const hoverCardPositioner = style({
  isolation: "isolate",
  zIndex: 50
});

export const hoverCardContent = style({
  zIndex: 50,
  width: "288px",
  transformOrigin: "var(--transform-origin)",
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.popover,
  padding: "10px",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.popoverForeground,
  boxShadow: vars.shadow.md,
  outline: "none",
  transition: "all 100ms ease",
  border: `1px solid color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
  selectors: {
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
