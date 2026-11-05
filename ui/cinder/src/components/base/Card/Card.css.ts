import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

const cardBase = style({});

export const card = style([
  cardBase,
  {
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing[4],
    overflow: "hidden",
    borderRadius: vars.radius.lg,
    backgroundColor: vars.color.card,
    paddingTop: vars.spacing[4],
    paddingBottom: vars.spacing[4],
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
    color: vars.color.cardForeground,
    boxShadow: `0 0 0 1px color-mix(in oklch, ${vars.color.foreground} 10%, transparent)`,
    selectors: {
      "&[data-size='sm']": {
        gap: vars.spacing[3],
        paddingTop: vars.spacing[3],
        paddingBottom: vars.spacing[3]
      }
    }
  }
]);

globalStyle(`${cardBase}:has(> img:first-child)`, {
  paddingTop: 0
});

globalStyle(`${cardBase} > img:first-child`, {
  borderTopLeftRadius: vars.radius.lg,
  borderTopRightRadius: vars.radius.lg
});

globalStyle(`${cardBase} > img:last-child`, {
  borderBottomLeftRadius: vars.radius.lg,
  borderBottomRightRadius: vars.radius.lg
});

const headerBase = style({});

export const cardHeader = style([
  headerBase,
  {
    display: "grid",
    gridAutoRows: "min-content",
    alignItems: "start",
    gap: vars.spacing[1],
    borderTopLeftRadius: vars.radius.lg,
    borderTopRightRadius: vars.radius.lg,
    paddingLeft: vars.spacing[4],
    paddingRight: vars.spacing[4],
    containerType: "inline-size",
    containerName: "card-header"
  }
]);

globalStyle(`${cardBase}[data-size='sm'] ${headerBase}`, {
  paddingLeft: vars.spacing[3],
  paddingRight: vars.spacing[3]
});

globalStyle(`${headerBase}:has([data-slot='card-action'])`, {
  gridTemplateColumns: "1fr auto"
});

globalStyle(`${headerBase}:has([data-slot='card-description'])`, {
  gridTemplateRows: "auto auto"
});

globalStyle(`${headerBase}.border-b`, {
  paddingBottom: vars.spacing[4]
});

globalStyle(`${cardBase}[data-size='sm'] ${headerBase}.border-b`, {
  paddingBottom: vars.spacing[3]
});

export const cardTitle = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium
});

export const cardDescription = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground
});

export const cardAction = style({
  gridColumnStart: 2,
  gridRowStart: 1,
  gridRowEnd: "span 2",
  alignSelf: "start",
  justifySelf: "end"
});

export const cardContent = style({
  paddingLeft: vars.spacing[4],
  paddingRight: vars.spacing[4]
});

globalStyle(`${cardBase}[data-size='sm'] ${cardContent}`, {
  paddingLeft: vars.spacing[3],
  paddingRight: vars.spacing[3]
});

export const cardFooter = style({
  display: "flex",
  alignItems: "center",
  borderBottomLeftRadius: vars.radius.lg,
  borderBottomRightRadius: vars.radius.lg,
  paddingLeft: vars.spacing[4],
  paddingRight: vars.spacing[4]
});

globalStyle(`${cardBase}[data-size='sm'] ${cardFooter}`, {
  paddingLeft: vars.spacing[3],
  paddingRight: vars.spacing[3]
});

globalStyle(`${cardFooter}.border-t`, {
  paddingTop: vars.spacing[4]
});

globalStyle(`${cardBase}[data-size='sm'] ${cardFooter}.border-t`, {
  paddingTop: vars.spacing[3]
});
