import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const tableContainer = style({
  position: "relative",
  width: "100%",
  overflowX: "auto"
});

export const table = style({
  width: "100%",
  captionSide: "bottom",
  fontSize: vars.font.size.xs
});

const headerBase = style({});
export const tableHeader = headerBase;

globalStyle(`${headerBase} tr`, {
  borderBottom: `1px solid ${vars.color.border}`
});

const bodyBase = style({});
export const tableBody = bodyBase;

globalStyle(`${bodyBase} tr:last-child`, {
  borderBottom: 0
});

const footerBase = style({});
export const tableFooter = style([
  footerBase,
  {
    borderTop: `1px solid ${vars.color.border}`,
    backgroundColor: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`,
    fontWeight: vars.font.weight.medium
  }
]);

globalStyle(`${footerBase} > tr:last-child`, {
  borderBottom: 0
});

export const tableRow = style({
  borderBottom: `1px solid ${vars.color.border}`,
  transition: "background-color 150ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: `color-mix(in oklch, ${vars.color.muted} 50%, transparent)`
    },
    "&[data-state='selected']": {
      backgroundColor: vars.color.muted
    }
  }
});

const headBase = style({});

export const tableHead = style([
  headBase,
  {
    height: "40px",
    paddingLeft: vars.spacing[2],
    paddingRight: vars.spacing[2],
    textAlign: "left",
    verticalAlign: "middle",
    fontWeight: vars.font.weight.medium,
    whiteSpace: "nowrap",
    color: vars.color.foreground
  }
]);

globalStyle(`${headBase}:has([role='checkbox'])`, {
  paddingRight: 0
});

const cellBase = style({});

export const tableCell = style([
  cellBase,
  {
    padding: vars.spacing[2],
    verticalAlign: "middle",
    whiteSpace: "nowrap"
  }
]);

globalStyle(`${cellBase}:has([role='checkbox'])`, {
  paddingRight: 0
});

export const tableCaption = style({
  marginTop: vars.spacing[4],
  fontSize: vars.font.size.xs,
  color: vars.color.mutedForeground
});
