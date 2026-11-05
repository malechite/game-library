import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

const groupBase = style({});

export const toggleGroup = style([
  groupBase,
  {
    display: "flex",
    width: "fit-content",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: vars.radius.md,
    selectors: {
      "&[data-size='sm']": {
        borderRadius: `min(${vars.radius.md}, 8px)`
      },
      "&[data-orientation='vertical']": {
        flexDirection: "column",
        alignItems: "stretch"
      }
    }
  }
]);

const itemBase = style({});

export const toggleGroupItem = style([
  itemBase,
  {
    flexShrink: 0,
    selectors: {
      "&:focus": {
        zIndex: 10
      },
      "&:focus-visible": {
        zIndex: 10
      }
    }
  }
]);

/* Zero-spacing styles (no gap between items) */
globalStyle(`${groupBase}[data-spacing='0'] ${itemBase}`, {
  borderRadius: 0,
  paddingLeft: vars.spacing[2],
  paddingRight: vars.spacing[2]
});

/* First item rounding: horizontal */
globalStyle(`${groupBase}[data-orientation='horizontal'][data-spacing='0'] ${itemBase}:first-child`, {
  borderTopLeftRadius: vars.radius.md,
  borderBottomLeftRadius: vars.radius.md
});

/* Last item rounding: horizontal */
globalStyle(`${groupBase}[data-orientation='horizontal'][data-spacing='0'] ${itemBase}:last-child`, {
  borderTopRightRadius: vars.radius.md,
  borderBottomRightRadius: vars.radius.md
});

/* First item rounding: vertical */
globalStyle(`${groupBase}[data-orientation='vertical'][data-spacing='0'] ${itemBase}:first-child`, {
  borderTopLeftRadius: vars.radius.md,
  borderTopRightRadius: vars.radius.md
});

/* Last item rounding: vertical */
globalStyle(`${groupBase}[data-orientation='vertical'][data-spacing='0'] ${itemBase}:last-child`, {
  borderBottomLeftRadius: vars.radius.md,
  borderBottomRightRadius: vars.radius.md
});

/* Outline variant border collapse: horizontal */
globalStyle(`${groupBase}[data-orientation='horizontal'][data-spacing='0'] ${itemBase}[data-variant='outline']`, {
  borderLeftWidth: 0
});

globalStyle(`${groupBase}[data-orientation='horizontal'][data-spacing='0'] ${itemBase}[data-variant='outline']:first-child`, {
  borderLeftWidth: "1px"
});

/* Outline variant border collapse: vertical */
globalStyle(`${groupBase}[data-orientation='vertical'][data-spacing='0'] ${itemBase}[data-variant='outline']`, {
  borderTopWidth: 0
});

globalStyle(`${groupBase}[data-orientation='vertical'][data-spacing='0'] ${itemBase}[data-variant='outline']:first-child`, {
  borderTopWidth: "1px"
});
