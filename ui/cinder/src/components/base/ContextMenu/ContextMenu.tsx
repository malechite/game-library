"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { Icon } from "../Icon";
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuSeparator
} from "./ContextMenuComponents";
import { type MenuItemConfig, isMenuItemVisible } from "../../../lib/menu-types";

export interface ContextMenuViewProps {
  /** Array of menu items to render */
  items: MenuItemConfig[];
  /** The element that triggers the context menu on right-click */
  children: ReactNode;
  /** Content alignment */
  align?: "start" | "center" | "end";
  /** Additional CSS class for the content popup */
  contentClassName?: string;
  /** Additional CSS class for the trigger wrapper */
  className?: string;
}

const renderItem = (item: MenuItemConfig, index: number): ReactNode => {
  if (!isMenuItemVisible(item)) return null;

  if (item.type === "separator") {
    return <ContextMenuSeparator key={index} />;
  }

  if (item.type === "label") {
    return (
      <ContextMenuGroup key={index}>
        <ContextMenuLabel style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {item.icon && <Icon type={item.icon} />}
          {item.label}
        </ContextMenuLabel>
      </ContextMenuGroup>
    );
  }

  if (item.type === "group") {
    const visibleItems = item.items.filter(isMenuItemVisible);
    if (visibleItems.length === 0) return null;

    return (
      <ContextMenuGroup key={index}>
        {item.label && <ContextMenuLabel>{item.label}</ContextMenuLabel>}
        {item.items.map(renderItem)}
      </ContextMenuGroup>
    );
  }

  // Default: "item" type
  return (
    <ContextMenuItem key={index} variant={item.variant} disabled={item.disabled} onClick={item.onClick}>
      {item.icon && <Icon type={item.icon} />}
      {item.label}
    </ContextMenuItem>
  );
};

/**
 * ContextMenu — Prop-driven context (right-click) menu.
 *
 * Wraps `children` with a context menu trigger and renders `items` on right-click.
 *
 * @example
 * <ContextMenu
 *   items={[
 *     { label: "Copy", icon: "Copy", onClick: handleCopy },
 *     { type: "separator" },
 *     { label: "Delete", icon: "Trash", variant: "destructive", onClick: handleDelete },
 *   ]}
 * >
 *   <div>Right-click me</div>
 * </ContextMenu>
 */
export const ContextMenu = ({ items, children, align = "start", contentClassName, className }: ContextMenuViewProps) => {
  const visibleItems = items.filter(isMenuItemVisible);
  if (visibleItems.length === 0) return <>{children}</>;

  return (
    <ContextMenuRoot>
      <ContextMenuTrigger className={cn(className)}>{children}</ContextMenuTrigger>
      <ContextMenuContent align={align} className={contentClassName}>
        {items.map(renderItem)}
      </ContextMenuContent>
    </ContextMenuRoot>
  );
};
