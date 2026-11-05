import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const breadcrumbList = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.spacing[2],
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  overflowWrap: "break-word",
  color: vars.color.mutedForeground
});

export const breadcrumbItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing[1]
});

export const breadcrumbLink = style({
  transition: "color 150ms ease",
  selectors: {
    "&:hover": {
      color: vars.color.foreground
    }
  }
});

export const breadcrumbPage = style({
  fontWeight: vars.font.weight.normal,
  color: vars.color.foreground
});

const separatorBase = style({});

export const breadcrumbSeparator = separatorBase;

globalStyle(`${separatorBase} > svg`, {
  width: "14px",
  height: "14px"
});

const ellipsisBase = style({
  display: "flex",
  width: "16px",
  height: "16px",
  alignItems: "center",
  justifyContent: "center"
});

export const breadcrumbEllipsis = ellipsisBase;

globalStyle(`${ellipsisBase} > svg`, {
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
