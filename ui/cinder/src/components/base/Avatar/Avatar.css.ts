import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const avatarRoot = style({
  position: "relative",
  display: "flex",
  width: "32px",
  height: "32px",
  flexShrink: 0,
  borderRadius: vars.radius.full,
  userSelect: "none",
  selectors: {
    "&[data-size='lg']": {
      width: "40px",
      height: "40px"
    },
    "&[data-size='sm']": {
      width: "24px",
      height: "24px"
    }
  },
  "::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: vars.radius.full,
    border: `1px solid ${vars.color.border}`,
    mixBlendMode: "darken"
  }
});

/* dark mode: after pseudo uses lighten blend */
globalStyle(`.dark ${avatarRoot}::after, [data-theme='dark'] ${avatarRoot}::after`, {
  mixBlendMode: "lighten"
});

export const avatarImage = style({
  aspectRatio: "1",
  width: "100%",
  height: "100%",
  borderRadius: vars.radius.full,
  objectFit: "cover"
});

export const avatarFallback = style({
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.muted,
  fontSize: vars.font.size.sm,
  color: vars.color.mutedForeground
});

globalStyle(`${avatarRoot}[data-size='sm'] ${avatarFallback}`, {
  fontSize: vars.font.size.xs
});

export const avatarBadge = style({
  position: "absolute",
  right: 0,
  bottom: 0,
  zIndex: 10,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.primary,
  color: vars.color.primaryForeground,
  backgroundBlendMode: "color",
  boxShadow: `0 0 0 2px ${vars.color.background}`,
  userSelect: "none"
});

/* Size-based badge styles using parent avatar data-size */
globalStyle(`${avatarRoot}[data-size='sm'] ${avatarBadge}`, {
  width: "8px",
  height: "8px"
});

globalStyle(`${avatarRoot}[data-size='sm'] ${avatarBadge} > svg`, {
  display: "none"
});

globalStyle(`${avatarRoot}[data-size='default'] ${avatarBadge}`, {
  width: "10px",
  height: "10px"
});

globalStyle(`${avatarRoot}[data-size='default'] ${avatarBadge} > svg`, {
  width: "8px",
  height: "8px"
});

globalStyle(`${avatarRoot}[data-size='lg'] ${avatarBadge}`, {
  width: "12px",
  height: "12px"
});

globalStyle(`${avatarRoot}[data-size='lg'] ${avatarBadge} > svg`, {
  width: "8px",
  height: "8px"
});

const avatarGroupBase = style({});

export const avatarGroup = style([
  avatarGroupBase,
  {
    display: "flex"
  }
]);

globalStyle(`${avatarGroupBase} > [data-slot='avatar']`, {
  marginLeft: "-8px",
  boxShadow: `0 0 0 2px ${vars.color.background}`
});

globalStyle(`${avatarGroupBase} > [data-slot='avatar']:first-child`, {
  marginLeft: 0
});

export const avatarGroupCount = style({
  position: "relative",
  display: "flex",
  width: "32px",
  height: "32px",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.muted,
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.mutedForeground,
  boxShadow: `0 0 0 2px ${vars.color.background}`
});

globalStyle(`${avatarGroupCount} > svg`, {
  width: "16px",
  height: "16px"
});

/* Size overrides driven by avatar-group containing size variants */
globalStyle(`${avatarGroupBase}:has([data-size='lg']) ${avatarGroupCount}`, {
  width: "40px",
  height: "40px"
});

globalStyle(`${avatarGroupBase}:has([data-size='sm']) ${avatarGroupCount}`, {
  width: "24px",
  height: "24px"
});

globalStyle(`${avatarGroupBase}:has([data-size='lg']) ${avatarGroupCount} > svg`, {
  width: "20px",
  height: "20px"
});

globalStyle(`${avatarGroupBase}:has([data-size='sm']) ${avatarGroupCount} > svg`, {
  width: "12px",
  height: "12px"
});
