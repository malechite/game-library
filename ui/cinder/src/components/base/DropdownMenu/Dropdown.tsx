"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { Icon, type CinderIconType } from "../Icon";
import { Button } from "../Button/Button";
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "./DropdownMenuComponents";
import { type MenuItemConfig, isMenuItemVisible } from "../../../lib/menu-types";

export interface DropdownTriggerProps {
  /** Button variant */
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  /** Button size */
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-xs" | "icon-lg";
  /** Icon to display on the trigger button */
  icon?: CinderIconType;
  /** Content for the trigger button */
  children?: ReactNode;
}

export interface DropdownProps {
  /** Array of menu items to render */
  items: MenuItemConfig[];
  /** Custom trigger button configuration */
  trigger?: DropdownTriggerProps;
  /** Content alignment relative to trigger */
  align?: "start" | "center" | "end";
  /** Side to render the content */
  side?: "top" | "right" | "bottom" | "left";
  /** Additional CSS class for the content popup */
  contentClassName?: string;
  /** Optional header content above items */
  header?: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Accessibility label */
  "aria-label"?: string;
  /** Additional CSS class for the trigger */
  className?: string;
}

const DEFAULT_TRIGGER: DropdownTriggerProps = {
  variant: "ghost",
  size: "icon",
  icon: "DotsThreeVertical"
};

const renderItem = (item: MenuItemConfig, index: number): ReactNode => {
  if (!isMenuItemVisible(item)) return null;

  if (item.type === "separator") {
    return <DropdownMenuSeparator key={index} />;
  }

  if (item.type === "label") {
    return (
      <DropdownMenuGroup key={index}>
        <DropdownMenuLabel style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {item.icon && <Icon type={item.icon} />}
          {item.label}
        </DropdownMenuLabel>
      </DropdownMenuGroup>
    );
  }

  if (item.type === "group") {
    const visibleItems = item.items.filter(isMenuItemVisible);
    if (visibleItems.length === 0) return null;

    return (
      <DropdownMenuGroup key={index}>
        {item.label && <DropdownMenuLabel>{item.label}</DropdownMenuLabel>}
        {item.items.map(renderItem)}
      </DropdownMenuGroup>
    );
  }

  // Default: "item" type
  return (
    <DropdownMenuItem key={index} variant={item.variant} disabled={item.disabled} onClick={item.onClick}>
      {item.icon && <Icon type={item.icon} />}
      {item.label}
    </DropdownMenuItem>
  );
};

/**
 * Dropdown — Prop-driven dropdown menu.
 *
 * Pass an array of `items` (items, separators, labels, groups) instead of
 * composing DropdownMenu/Trigger/Content/Item manually.
 *
 * @example
 * <Dropdown
 *   items={[
 *     { label: "Edit", icon: "PencilSimple", onClick: handleEdit },
 *     { type: "separator" },
 *     { label: "Delete", icon: "Trash", variant: "destructive", onClick: handleDelete },
 *   ]}
 * />
 */
export const Dropdown = ({
  items,
  trigger,
  align = "end",
  side,
  contentClassName,
  header,
  open,
  onOpenChange,
  "aria-label": ariaLabel,
  className
}: DropdownProps) => {
  const visibleItems = items.filter(isMenuItemVisible);
  if (visibleItems.length === 0) return null;

  const { children, ...buttonProps } = { ...DEFAULT_TRIGGER, ...trigger };

  return (
    <DropdownMenuRoot open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className={cn(className)}
        render={<Button {...buttonProps}>{children}</Button>}
      />
      <DropdownMenuContent align={align} side={side} className={contentClassName}>
        {header}
        {items.map(renderItem)}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
