import { style } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const separatorBase = style({
  flexShrink: 0,
  backgroundColor: vars.color.border,
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: "1px",
      width: "100%"
    },
    '&[data-orientation="vertical"]': {
      width: "1px",
      alignSelf: "stretch"
    }
  }
});
