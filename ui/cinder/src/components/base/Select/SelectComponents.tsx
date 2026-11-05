"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";

import { cn } from "../../../lib/utils";
import { CaretDownIcon, CheckIcon, CaretUpIcon } from "@phosphor-icons/react";
import {
  selectGroupStyle,
  selectValueStyle,
  selectTriggerRecipe,
  selectIconStyle,
  selectPositionerStyle,
  selectContentStyle,
  selectLabelStyle,
  selectItemStyle,
  selectItemTextStyle,
  selectItemIndicatorStyle,
  selectSeparatorStyle,
  selectScrollButtonStyle
} from "./Select.css";

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = ({ className, ...props }: SelectPrimitive.Group.Props) => (
  <SelectPrimitive.Group data-slot="select-group" className={cn(selectGroupStyle, className)} {...props} />
);

const SelectValue = ({ className, ...props }: SelectPrimitive.Value.Props) => (
  <SelectPrimitive.Value data-slot="select-value" className={cn(selectValueStyle, className)} {...props} />
);

const SelectTrigger = ({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
}) => (
  <SelectPrimitive.Trigger
    data-slot="select-trigger"
    data-size={size}
    className={cn(selectTriggerRecipe({ size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon render={<CaretDownIcon className={selectIconStyle} />} />
  </SelectPrimitive.Trigger>
);

const SelectContent = ({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger">) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      alignItemWithTrigger={alignItemWithTrigger}
      className={selectPositionerStyle}
    >
      <SelectPrimitive.Popup
        data-slot="select-content"
        data-align-trigger={alignItemWithTrigger}
        className={cn(selectContentStyle, className)}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.List>{children}</SelectPrimitive.List>
        <SelectScrollDownButton />
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
);

const SelectLabel = ({ className, ...props }: SelectPrimitive.GroupLabel.Props) => (
  <SelectPrimitive.GroupLabel data-slot="select-label" className={cn(selectLabelStyle, className)} {...props} />
);

const SelectItem = ({ className, children, ...props }: SelectPrimitive.Item.Props) => (
  <SelectPrimitive.Item data-slot="select-item" className={cn(selectItemStyle, className)} {...props}>
    <SelectPrimitive.ItemText className={selectItemTextStyle}>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator render={<span className={selectItemIndicatorStyle} />}>
      <CheckIcon style={{ pointerEvents: "none" }} />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

const SelectSeparator = ({ className, ...props }: SelectPrimitive.Separator.Props) => (
  <SelectPrimitive.Separator data-slot="select-separator" className={cn(selectSeparatorStyle, className)} {...props} />
);

const SelectScrollUpButton = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) => (
  <SelectPrimitive.ScrollUpArrow
    data-slot="select-scroll-up-button"
    className={cn(selectScrollButtonStyle, className)}
    {...props}
  >
    <CaretUpIcon />
  </SelectPrimitive.ScrollUpArrow>
);

const SelectScrollDownButton = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) => (
  <SelectPrimitive.ScrollDownArrow
    data-slot="select-scroll-down-button"
    className={cn(selectScrollButtonStyle, className)}
    {...props}
  >
    <CaretDownIcon />
  </SelectPrimitive.ScrollDownArrow>
);

export {
  SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
};
