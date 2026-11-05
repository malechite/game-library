import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const paginationNav = style({
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  width: "100%",
  justifyContent: "center"
});

export const paginationContent = style({
  display: "flex",
  alignItems: "center",
  gap: "2px"
});

export const paginationPrevious = style({
  paddingLeft: `${vars.spacing[2]} !important`
});

export const paginationNext = style({
  paddingRight: `${vars.spacing[2]} !important`
});

export const paginationText = style({
  display: "none",
  "@media": {
    "(min-width: 640px)": {
      display: "block"
    }
  }
});

const ellipsisBase = style({
  display: "flex",
  width: "28px",
  height: "28px",
  alignItems: "center",
  justifyContent: "center"
});

export const paginationEllipsis = ellipsisBase;

globalStyle(`${ellipsisBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0
});
