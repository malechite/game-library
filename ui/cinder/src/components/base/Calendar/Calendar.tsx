"use client";

import * as React from "react";
import { DayPicker, getDefaultClassNames, type DayButton, type Locale } from "react-day-picker";

import { cn } from "../../../lib/utils";
import { Button, buttonVariants } from "../Button/Button";
import { CaretLeftIcon, CaretRightIcon, CaretDownIcon } from "@phosphor-icons/react";
import {
  calendarRootStyle,
  calendarContainerStyle,
  calendarMonthsStyle,
  calendarMonthStyle,
  calendarNavStyle,
  calendarNavButtonStyle,
  calendarMonthCaptionStyle,
  calendarDropdownsStyle,
  calendarDropdownRootStyle,
  calendarDropdownStyle,
  calendarCaptionLabelBaseStyle,
  calendarCaptionLabelStyle,
  calendarCaptionLabelDropdownStyle,
  calendarTableStyle,
  calendarWeekdaysStyle,
  calendarWeekdayStyle,
  calendarWeekStyle,
  calendarWeekNumberHeaderStyle,
  calendarWeekNumberStyle,
  calendarDayStyle,
  calendarRangeStartStyle,
  calendarRangeMiddleStyle,
  calendarRangeEndStyle,
  calendarTodayStyle,
  calendarOutsideStyle,
  calendarDisabledStyle,
  calendarHiddenStyle,
  calendarChevronStyle,
  calendarDayButtonStyle,
  calendarWeekNumberDisplayStyle
} from "./Calendar.css";

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) => {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(calendarRootStyle, className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters
      }}
      classNames={{
        root: cn(calendarContainerStyle, defaultClassNames.root),
        months: cn(calendarMonthsStyle, defaultClassNames.months),
        month: cn(calendarMonthStyle, defaultClassNames.month),
        nav: cn(calendarNavStyle, defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          calendarNavButtonStyle,
          defaultClassNames.button_previous
        ),
        button_next: cn(buttonVariants({ variant: buttonVariant }), calendarNavButtonStyle, defaultClassNames.button_next),
        month_caption: cn(calendarMonthCaptionStyle, defaultClassNames.month_caption),
        dropdowns: cn(calendarDropdownsStyle, defaultClassNames.dropdowns),
        dropdown_root: cn(calendarDropdownRootStyle, defaultClassNames.dropdown_root),
        dropdown: cn(calendarDropdownStyle, defaultClassNames.dropdown),
        caption_label: cn(
          calendarCaptionLabelBaseStyle,
          captionLayout === "label" ? calendarCaptionLabelStyle : calendarCaptionLabelDropdownStyle,
          defaultClassNames.caption_label
        ),
        table: calendarTableStyle,
        weekdays: cn(calendarWeekdaysStyle, defaultClassNames.weekdays),
        weekday: cn(calendarWeekdayStyle, defaultClassNames.weekday),
        week: cn(calendarWeekStyle, defaultClassNames.week),
        week_number_header: cn(calendarWeekNumberHeaderStyle, defaultClassNames.week_number_header),
        week_number: cn(calendarWeekNumberStyle, defaultClassNames.week_number),
        day: cn(calendarDayStyle, defaultClassNames.day),
        range_start: cn(calendarRangeStartStyle, defaultClassNames.range_start),
        range_middle: cn(calendarRangeMiddleStyle, defaultClassNames.range_middle),
        range_end: cn(calendarRangeEndStyle, defaultClassNames.range_end),
        today: cn(calendarTodayStyle, defaultClassNames.today),
        outside: cn(calendarOutsideStyle, defaultClassNames.outside),
        disabled: cn(calendarDisabledStyle, defaultClassNames.disabled),
        hidden: cn(calendarHiddenStyle, defaultClassNames.hidden),
        ...classNames
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <CaretLeftIcon className={cn(calendarChevronStyle, className)} {...props} />;
          }

          if (orientation === "right") {
            return <CaretRightIcon className={cn(calendarChevronStyle, className)} {...props} />;
          }

          return <CaretDownIcon className={cn(calendarChevronStyle, className)} {...props} />;
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className={calendarWeekNumberDisplayStyle}>{children}</div>
            </td>
          );
        },
        ...components
      }}
      {...props}
    />
  );
};

const CalendarDayButton = ({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) => {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(calendarDayButtonStyle, defaultClassNames.day, className)}
      {...props}
    />
  );
};

export { Calendar, CalendarDayButton };
