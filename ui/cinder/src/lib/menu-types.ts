import type { CinderIconType } from "../components/base/Icon";

export interface MenuItem {
  type?: "item";
  label: string;
  icon?: CinderIconType;
  onClick: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
  hidden?: boolean;
}

export interface MenuSeparator {
  type: "separator";
}

export interface MenuLabel {
  type: "label";
  label: string;
  icon?: CinderIconType;
}

export interface MenuGroup {
  type: "group";
  label?: string;
  items: MenuItemConfig[];
}

export type MenuItemConfig = MenuItem | MenuSeparator | MenuLabel | MenuGroup;

/** Check if a menu item should be visible */
export const isMenuItemVisible = (item: MenuItemConfig): boolean => {
  if ("hidden" in item && item.hidden) return false;
  return true;
};
