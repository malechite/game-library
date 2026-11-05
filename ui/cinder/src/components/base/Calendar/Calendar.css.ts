import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

/* Root calendar wrapper */
export const calendarRootStyle = style({
  backgroundColor: vars.color.background,
  padding: vars.spacing[3],
  // CSS custom properties for cell sizing
  vars: {
    "--cell-radius": vars.radius.md,
    "--cell-size": vars.spacing[6]
  }
});

/* Root DayPicker container */
export const calendarContainerStyle = style({
  width: "fit-content"
});

/* Months wrapper */
export const calendarMonthsStyle = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[4],
  "@media": {
    "(min-width: 768px)": {
      flexDirection: "row"
    }
  }
});

/* Single month */
export const calendarMonthStyle = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: vars.spacing[4]
});

/* Nav bar */
export const calendarNavStyle = style({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing[1]
});

/* Nav button shared */
export const calendarNavButtonStyle = style({
  width: "var(--cell-size)",
  height: "var(--cell-size)",
  padding: 0,
  userSelect: "none",
  selectors: {
    "&[aria-disabled]": {
      opacity: 0.5
    }
  }
});

/* Month caption */
export const calendarMonthCaptionStyle = style({
  display: "flex",
  height: "var(--cell-size)",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: "var(--cell-size)"
});

/* Dropdowns container */
export const calendarDropdownsStyle = style({
  display: "flex",
  height: "var(--cell-size)",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing[2],
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium
});

/* Dropdown root */
export const calendarDropdownRootStyle = style({
  position: "relative",
  borderRadius: "var(--cell-radius)"
});

/* Dropdown select */
export const calendarDropdownStyle = style({
  position: "absolute",
  inset: 0,
  backgroundColor: vars.color.popover,
  opacity: 0
});

/* Caption label */
export const calendarCaptionLabelBaseStyle = style({
  fontWeight: vars.font.weight.medium,
  userSelect: "none"
});

export const calendarCaptionLabelStyle = style({
  fontSize: vars.font.size.sm
});

export const calendarCaptionLabelDropdownStyle = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing[1],
  borderRadius: "var(--cell-radius)",
  fontSize: vars.font.size.sm
});

globalStyle(`${calendarCaptionLabelDropdownStyle} > svg`, {
  width: "14px",
  height: "14px",
  color: vars.color.mutedForeground
});

/* Table */
export const calendarTableStyle = style({
  width: "100%",
  borderCollapse: "collapse"
});

/* Weekdays row */
export const calendarWeekdaysStyle = style({
  display: "flex"
});

/* Weekday cell */
export const calendarWeekdayStyle = style({
  flex: 1,
  borderRadius: "var(--cell-radius)",
  fontSize: "0.8rem",
  fontWeight: vars.font.weight.normal,
  color: vars.color.mutedForeground,
  userSelect: "none"
});

/* Week row */
export const calendarWeekStyle = style({
  marginTop: vars.spacing[2],
  display: "flex",
  width: "100%"
});

/* Week number header */
export const calendarWeekNumberHeaderStyle = style({
  width: "var(--cell-size)",
  userSelect: "none"
});

/* Week number */
export const calendarWeekNumberStyle = style({
  fontSize: "0.8rem",
  color: vars.color.mutedForeground,
  userSelect: "none"
});

/* Day cell */
export const calendarDayStyle = style({
  position: "relative",
  aspectRatio: "1",
  height: "100%",
  width: "100%",
  borderRadius: "var(--cell-radius)",
  padding: 0,
  textAlign: "center",
  userSelect: "none"
});

globalStyle(`${calendarDayStyle}:last-child[data-selected=true] button`, {
  borderTopRightRadius: "var(--cell-radius)",
  borderBottomRightRadius: "var(--cell-radius)"
});

globalStyle(`${calendarDayStyle}:first-child[data-selected=true] button`, {
  borderTopLeftRadius: "var(--cell-radius)",
  borderBottomLeftRadius: "var(--cell-radius)"
});

/* Range start */
export const calendarRangeStartStyle = style({
  position: "relative",
  isolation: "isolate",
  zIndex: 0,
  borderTopLeftRadius: "var(--cell-radius)",
  borderBottomLeftRadius: "var(--cell-radius)",
  backgroundColor: vars.color.muted,
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: vars.spacing[4],
      backgroundColor: vars.color.muted
    }
  }
});

/* Range middle */
export const calendarRangeMiddleStyle = style({
  borderRadius: 0
});

/* Range end */
export const calendarRangeEndStyle = style({
  position: "relative",
  isolation: "isolate",
  zIndex: 0,
  borderTopRightRadius: "var(--cell-radius)",
  borderBottomRightRadius: "var(--cell-radius)",
  backgroundColor: vars.color.muted,
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: vars.spacing[4],
      backgroundColor: vars.color.muted
    }
  }
});

/* Today */
export const calendarTodayStyle = style({
  borderRadius: "var(--cell-radius)",
  backgroundColor: vars.color.muted,
  color: vars.color.foreground,
  selectors: {
    '&[data-selected="true"]': {
      borderRadius: 0
    }
  }
});

/* Outside days */
export const calendarOutsideStyle = style({
  color: vars.color.mutedForeground,
  selectors: {
    "&[aria-selected]": {
      color: vars.color.mutedForeground
    }
  }
});

/* Disabled */
export const calendarDisabledStyle = style({
  color: vars.color.mutedForeground,
  opacity: 0.5
});

/* Hidden */
export const calendarHiddenStyle = style({
  visibility: "hidden"
});

/* Chevron icon */
export const calendarChevronStyle = style({
  width: "16px",
  height: "16px"
});

/* Day button */
export const calendarDayButtonStyle = style({
  position: "relative",
  isolation: "isolate",
  zIndex: 10,
  display: "flex",
  aspectRatio: "1",
  width: "100%",
  minWidth: "var(--cell-size)",
  flexDirection: "column",
  gap: vars.spacing[1],
  border: 0,
  lineHeight: 1,
  fontWeight: vars.font.weight.normal,
  selectors: {
    "&[data-range-end=true]": {
      borderRadius: "var(--cell-radius)",
      borderTopRightRadius: "var(--cell-radius)",
      borderBottomRightRadius: "var(--cell-radius)",
      backgroundColor: vars.color.primary,
      color: vars.color.primaryForeground
    },
    "&[data-range-middle=true]": {
      borderRadius: 0,
      backgroundColor: vars.color.muted,
      color: vars.color.foreground
    },
    "&[data-range-start=true]": {
      borderRadius: "var(--cell-radius)",
      borderTopLeftRadius: "var(--cell-radius)",
      borderBottomLeftRadius: "var(--cell-radius)",
      backgroundColor: vars.color.primary,
      color: vars.color.primaryForeground
    },
    "&[data-selected-single=true]": {
      backgroundColor: vars.color.primary,
      color: vars.color.primaryForeground
    }
  }
});

globalStyle(`[data-slot=item][data-focused=true] ${calendarDayButtonStyle}`, {
  position: "relative",
  zIndex: 10,
  borderColor: vars.color.ring,
  boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.ring} 50%, transparent)`
});

globalStyle(`${calendarDayButtonStyle} > span`, {
  fontSize: vars.font.size.xs,
  opacity: 0.7
});

/* Week number display in component */
export const calendarWeekNumberDisplayStyle = style({
  display: "flex",
  width: "var(--cell-size)",
  height: "var(--cell-size)",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center"
});

/* For the Root component */
export const calendarDataSlotStyle = style({});
