"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

import { cn } from "../../../lib/utils";
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react";
import {
  contextMenuTriggerStyle,
  contextMenuPositionerStyle,
  contextMenuContentStyle,
  contextMenuLabelStyle,
  contextMenuItemStyle,
  contextMenuSubTriggerStyle,
  contextMenuSubContentStyle,
  contextMenuCheckboxItemStyle,
  contextMenuIndicatorWrapperStyle,
  contextMenuRadioItemStyle,
  contextMenuSeparatorStyle,
  contextMenuShortcutStyle,
  contextMenuCaretRightStyle
} from "./ContextMenu.css";

const ContextMenuRoot = ({ ...props }: ContextMenuPrimitive.Root.Props) => (
  <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
);

const ContextMenuPortal = ({ ...props }: ContextMenuPrimitive.Portal.Props) => (
  <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
);

const ContextMenuTrigger = ({ className, ...props }: ContextMenuPrimitive.Trigger.Props) => (
  <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" className={cn(contextMenuTriggerStyle, className)} {...props} />
);

const ContextMenuContent = ({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Positioner
      className={contextMenuPositionerStyle}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
    >
      <ContextMenuPrimitive.Popup
        data-slot="context-menu-content"
        className={cn(contextMenuContentStyle, className)}
        {...props}
      />
    </ContextMenuPrimitive.Positioner>
  </ContextMenuPrimitive.Portal>
);

const ContextMenuGroup = ({ ...props }: ContextMenuPrimitive.Group.Props) => (
  <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
);

const ContextMenuLabel = ({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) => (
  <ContextMenuPrimitive.GroupLabel
    data-slot="context-menu-label"
    data-inset={inset}
    className={cn(contextMenuLabelStyle, className)}
    {...props}
  />
);

const ContextMenuItem = ({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) => (
  <ContextMenuPrimitive.Item
    data-slot="context-menu-item"
    data-inset={inset}
    data-variant={variant}
    className={cn(contextMenuItemStyle, className)}
    {...props}
  />
);

const ContextMenuSub = ({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) => (
  <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
);

const ContextMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) => (
  <ContextMenuPrimitive.SubmenuTrigger
    data-slot="context-menu-sub-trigger"
    data-inset={inset}
    className={cn(contextMenuSubTriggerStyle, className)}
    {...props}
  >
    {children}
    <CaretRightIcon className={contextMenuCaretRightStyle} />
  </ContextMenuPrimitive.SubmenuTrigger>
);

const ContextMenuSubContent = ({ ...props }: React.ComponentProps<typeof ContextMenuContent>) => (
  <ContextMenuContent data-slot="context-menu-sub-content" className={contextMenuSubContentStyle} side="right" {...props} />
);

const ContextMenuCheckboxItem = ({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) => (
  <ContextMenuPrimitive.CheckboxItem
    data-slot="context-menu-checkbox-item"
    data-inset={inset}
    className={cn(contextMenuCheckboxItemStyle, className)}
    checked={checked}
    {...props}
  >
    <span className={contextMenuIndicatorWrapperStyle}>
      <ContextMenuPrimitive.CheckboxItemIndicator>
        <CheckIcon />
      </ContextMenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
);

const ContextMenuRadioGroup = ({ ...props }: ContextMenuPrimitive.RadioGroup.Props) => (
  <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
);

const ContextMenuRadioItem = ({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) => (
  <ContextMenuPrimitive.RadioItem
    data-slot="context-menu-radio-item"
    data-inset={inset}
    className={cn(contextMenuRadioItemStyle, className)}
    {...props}
  >
    <span className={contextMenuIndicatorWrapperStyle}>
      <ContextMenuPrimitive.RadioItemIndicator>
        <CheckIcon />
      </ContextMenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
);

const ContextMenuSeparator = ({ className, ...props }: ContextMenuPrimitive.Separator.Props) => (
  <ContextMenuPrimitive.Separator
    data-slot="context-menu-separator"
    className={cn(contextMenuSeparatorStyle, className)}
    {...props}
  />
);

const ContextMenuShortcut = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span data-slot="context-menu-shortcut" className={cn(contextMenuShortcutStyle, className)} {...props} />
);

export {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup
};
