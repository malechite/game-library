import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { pulse } from "../../../themes/animations.css";

export const skeletonStyle = style({
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.muted
});
