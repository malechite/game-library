import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const labelStyle = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.medium,
  userSelect: "none",
  selectors: {
    ":is([data-disabled=true] *) &": {
      pointerEvents: "none",
      opacity: 0.5
    },
    ":disabled + &, :disabled ~ &": {
      cursor: "not-allowed",
      opacity: 0.5
    }
  }
});
