import { globalStyle } from "@vanilla-extract/css";
import { gradients } from "@game-library/tokens";
import { vars } from "./contract.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  borderWidth: "0",
  borderStyle: "solid",
  borderColor: vars.color.border
});

globalStyle("html", {
  lineHeight: 1.5,
  WebkitTextSizeAdjust: "100%",
  tabSize: 4
});

globalStyle("body", {
  margin: 0,
  lineHeight: "inherit",
  fontFamily: "var(--font-sans, system-ui, sans-serif)",
  backgroundColor: vars.color.background,
  backgroundImage: gradients.surface.css,
  backgroundAttachment: "fixed",
  color: vars.color.foreground,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale"
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  fontSize: "inherit",
  fontWeight: "inherit",
  margin: 0
});

// Strip UA default margins from the common block elements (preflight parity).
globalStyle("p, blockquote, figure, pre, hr, dl, dd", {
  margin: 0
});

globalStyle("ol, ul, menu", {
  listStyle: "none",
  margin: 0,
  padding: 0
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "inherit"
});

globalStyle("button, input, optgroup, select, textarea", {
  fontFamily: "inherit",
  fontSize: "100%",
  fontWeight: "inherit",
  lineHeight: "inherit",
  color: "inherit",
  margin: 0,
  padding: 0
});

globalStyle("button, [role='button']", {
  cursor: "pointer"
});

globalStyle("img, svg, video, canvas, audio, iframe, embed, object", {
  display: "block",
  verticalAlign: "middle"
});

globalStyle("img, video", {
  maxWidth: "100%",
  height: "auto"
});
