"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";

import { cn } from "../../../lib/utils";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "../DropdownMenu/DropdownMenuComponents";
import { CheckIcon } from "@phosphor-icons/react";
import {
  menubarStyle,
  menubarTriggerStyle,
  menubarContentStyle,
  menubarItemStyle,
  menubarCheckboxItemStyle,
  menubarCheckboxIndicatorWrapperStyle,
  menubarRadioItemStyle,
  menubarRadioIndicatorWrapperStyle,
  menubarLabelStyle,
  menubarSeparatorStyle,
  menubarShortcutStyle,
  menubarSubTriggerStyle,
  menubarSubContentStyle
} from "./Menubar.css";

const Menubar = ({ className, ...props }: MenubarPrimitive.Props) => (
  <MenubarPrimitive data-slot="menubar" className={cn(menubarStyle, className)} {...props} />
);

const MenubarMenu = ({ ...props }: React.ComponentProps<typeof DropdownMenuRoot>) => (
  <DropdownMenuRoot data-slot="menubar-menu" {...props} />
);

const MenubarGroup = ({ ...props }: React.ComponentProps<typeof DropdownMenuGroup>) => (
  <DropdownMenuGroup data-slot="menubar-group" {...props} />
);

const MenubarPortal = ({ ...props }: React.ComponentProps<typeof DropdownMenuPortal>) => (
  <DropdownMenuPortal data-slot="menubar-portal" {...props} />
);

const MenubarTrigger = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) => (
  <DropdownMenuTrigger data-slot="menubar-trigger" className={cn(menubarTriggerStyle, className)} {...props} />
);

const MenubarContent = ({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) => (
  <DropdownMenuContent
    data-slot="menubar-content"
    align={align}
    alignOffset={alignOffset}
    sideOffset={sideOffset}
    className={cn(menubarContentStyle, className)}
    {...props}
  />
);

const MenubarItem = ({ className, inset, variant = "default", ...props }: React.ComponentProps<typeof DropdownMenuItem>) => (
  <DropdownMenuItem
    data-slot="menubar-item"
    data-inset={inset}
    data-variant={variant}
    className={cn(menubarItemStyle, className)}
    {...props}
  />
);

const MenubarCheckboxItem = ({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) => (
  <MenuPrimitive.CheckboxItem
    data-slot="menubar-checkbox-item"
    data-inset={inset}
    className={cn(menubarCheckboxItemStyle, className)}
    checked={checked}
    {...props}
  >
    <span className={menubarCheckboxIndicatorWrapperStyle}>
      <MenuPrimitive.CheckboxItemIndicator>
        <CheckIcon />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
);

const MenubarRadioGroup = ({ ...props }: React.ComponentProps<typeof DropdownMenuRadioGroup>) => (
  <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
);

const MenubarRadioItem = ({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) => (
  <MenuPrimitive.RadioItem
    data-slot="menubar-radio-item"
    data-inset={inset}
    className={cn(menubarRadioItemStyle, className)}
    {...props}
  >
    <span className={menubarRadioIndicatorWrapperStyle}>
      <MenuPrimitive.RadioItemIndicator>
        <CheckIcon />
      </MenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
);

const MenubarLabel = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
  inset?: boolean;
}) => <DropdownMenuLabel data-slot="menubar-label" data-inset={inset} className={cn(menubarLabelStyle, className)} {...props} />;

const MenubarSeparator = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuSeparator>) => (
  <DropdownMenuSeparator data-slot="menubar-separator" className={cn(menubarSeparatorStyle, className)} {...props} />
);

const MenubarShortcut = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuShortcut>) => (
  <DropdownMenuShortcut data-slot="menubar-shortcut" className={cn(menubarShortcutStyle, className)} {...props} />
);

const MenubarSub = ({ ...props }: React.ComponentProps<typeof DropdownMenuSub>) => (
  <DropdownMenuSub data-slot="menubar-sub" {...props} />
);

const MenubarSubTrigger = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean;
}) => (
  <DropdownMenuSubTrigger
    data-slot="menubar-sub-trigger"
    data-inset={inset}
    className={cn(menubarSubTriggerStyle, className)}
    {...props}
  />
);

const MenubarSubContent = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuSubContent>) => (
  <DropdownMenuSubContent data-slot="menubar-sub-content" className={cn(menubarSubContentStyle, className)} {...props} />
);

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
};
