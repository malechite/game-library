import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const resizablePanelGroup = style({
  display: "flex",
  height: "100%",
  width: "100%",
  selectors: {
    "&[aria-orientation='vertical']": {
      flexDirection: "column"
    }
  }
});

const handleBase = style({});

export const resizableHandle = style([
  handleBase,
  {
    position: "relative",
    display: "flex",
    width: "1px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: vars.color.border,
    selectors: {
      "&:focus-visible": {
        boxShadow: `0 0 0 1px ${vars.color.ring}`,
        outline: "none"
      },
      "&[aria-orientation='horizontal']": {
        height: "1px",
        width: "100%"
      }
    },
    "::after": {
      content: '""',
      position: "absolute",
      inset: "0 auto",
      left: "50%",
      width: "4px",
      transform: "translateX(-50%)"
    }
  }
]);

/* Horizontal orientation after */
globalStyle(`${handleBase}[aria-orientation='horizontal']::after`, {
  left: 0,
  height: "4px",
  width: "100%",
  transform: "translateX(0) translateY(-50%)"
});

/* Horizontal orientation: rotate inner handle div */
globalStyle(`${handleBase}[aria-orientation='horizontal'] > div`, {
  transform: "rotate(90deg)"
});

export const resizableHandleBar = style({
  zIndex: 10,
  display: "flex",
  height: "24px",
  width: "4px",
  flexShrink: 0,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.border
});
