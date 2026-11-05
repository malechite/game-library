// High-level prop-driven component (recommended)
export { Dropdown, type DropdownProps, type DropdownTriggerProps } from "./Dropdown";

// Shared menu item types (also used by ContextMenu)
export {
  type MenuItemConfig,
  type MenuItem,
  type MenuSeparator,
  type MenuLabel,
  type MenuGroup,
  isMenuItemVisible
} from "../../../lib/menu-types";

// Low-level building blocks (for advanced customization)
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
} from "./DropdownMenuComponents";
