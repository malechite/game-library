"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import { cn } from "../../../lib/utils";
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react";
import {
  dropdownMenuPositionerStyle,
  dropdownMenuContentStyle,
  dropdownMenuLabelStyle,
  dropdownMenuItemStyle,
  dropdownMenuSubTriggerStyle,
  dropdownMenuSubContentStyle,
  dropdownMenuCheckboxItemStyle,
  dropdownMenuCheckboxIndicatorWrapperStyle,
  dropdownMenuRadioItemStyle,
  dropdownMenuSeparatorStyle,
  dropdownMenuShortcutStyle,
  dropdownMenuCaretRightStyle
} from "./DropdownMenu.css";

const DropdownMenuRoot = ({ ...props }: MenuPrimitive.Root.Props) => <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;

const DropdownMenuPortal = ({ ...props }: MenuPrimitive.Portal.Props) => (
  <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
);

const DropdownMenuTrigger = ({ ...props }: MenuPrimitive.Trigger.Props) => (
  <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
);

const DropdownMenuContent = ({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props & Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Positioner
      className={dropdownMenuPositionerStyle}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
    >
      <MenuPrimitive.Popup data-slot="dropdown-menu-content" className={cn(dropdownMenuContentStyle, className)} {...props} />
    </MenuPrimitive.Positioner>
  </MenuPrimitive.Portal>
);

const DropdownMenuGroup = ({ ...props }: MenuPrimitive.Group.Props) => (
  <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
);

const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) => (
  <MenuPrimitive.GroupLabel
    data-slot="dropdown-menu-label"
    data-inset={inset}
    className={cn(dropdownMenuLabelStyle, className)}
    {...props}
  />
);

const DropdownMenuItem = ({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) => (
  <MenuPrimitive.Item
    data-slot="dropdown-menu-item"
    data-inset={inset}
    data-variant={variant}
    className={cn(dropdownMenuItemStyle, className)}
    {...props}
  />
);

const DropdownMenuSub = ({ ...props }: MenuPrimitive.SubmenuRoot.Props) => (
  <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
);

const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) => (
  <MenuPrimitive.SubmenuTrigger
    data-slot="dropdown-menu-sub-trigger"
    data-inset={inset}
    className={cn(dropdownMenuSubTriggerStyle, className)}
    {...props}
  >
    {children}
    <CaretRightIcon className={dropdownMenuCaretRightStyle} />
  </MenuPrimitive.SubmenuTrigger>
);

const DropdownMenuSubContent = ({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) => (
  <DropdownMenuContent
    data-slot="dropdown-menu-sub-content"
    className={cn(dropdownMenuSubContentStyle, className)}
    align={align}
    alignOffset={alignOffset}
    side={side}
    sideOffset={sideOffset}
    {...props}
  />
);

const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) => (
  <MenuPrimitive.CheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    data-inset={inset}
    className={cn(dropdownMenuCheckboxItemStyle, className)}
    checked={checked}
    {...props}
  >
    <span className={dropdownMenuCheckboxIndicatorWrapperStyle} data-slot="dropdown-menu-checkbox-item-indicator">
      <MenuPrimitive.CheckboxItemIndicator>
        <CheckIcon />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
);

const DropdownMenuRadioGroup = ({ ...props }: MenuPrimitive.RadioGroup.Props) => (
  <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
);

const DropdownMenuRadioItem = ({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) => (
  <MenuPrimitive.RadioItem
    data-slot="dropdown-menu-radio-item"
    data-inset={inset}
    className={cn(dropdownMenuRadioItemStyle, className)}
    {...props}
  >
    <span className={dropdownMenuCheckboxIndicatorWrapperStyle} data-slot="dropdown-menu-radio-item-indicator">
      <MenuPrimitive.RadioItemIndicator>
        <CheckIcon />
      </MenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
);

const DropdownMenuSeparator = ({ className, ...props }: MenuPrimitive.Separator.Props) => (
  <MenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn(dropdownMenuSeparatorStyle, className)} {...props} />
);

const DropdownMenuShortcut = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span data-slot="dropdown-menu-shortcut" className={cn(dropdownMenuShortcutStyle, className)} {...props} />
);

export {
  DropdownMenuRoot,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
};
