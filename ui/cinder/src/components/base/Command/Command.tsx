"use client";

import { cn } from "../../../lib/utils";
import { Icon, type CinderIconType } from "../Icon";
import {
  CommandRoot,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut
} from "./CommandComponents";

export interface CommandItemConfig {
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: CinderIconType;
  /** Callback when selected */
  onSelect: () => void;
  /** Optional keyboard shortcut display */
  shortcut?: string;
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface CommandGroupConfig {
  /** Optional group heading */
  heading?: string;
  /** Items in this group */
  items: CommandItemConfig[];
}

export interface CommandViewProps {
  /** Array of command groups to render */
  groups: CommandGroupConfig[];
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Message shown when no results match */
  emptyMessage?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * CommandMenu — Prop-driven command palette.
 *
 * Pass an array of `groups` (each with items) instead of composing
 * Command/CommandInput/CommandList/CommandGroup/CommandItem manually.
 *
 * @example
 * <CommandMenu
 *   groups={[
 *     {
 *       heading: "Actions",
 *       items: [
 *         { label: "New File", icon: "FilePlus", onSelect: handleNew, shortcut: "⌘N" },
 *         { label: "Search", icon: "MagnifyingGlass", onSelect: handleSearch, shortcut: "⌘K" },
 *       ],
 *     },
 *   ]}
 * />
 */
export const CommandMenu = ({
  groups,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  className
}: CommandViewProps) => {
  return (
    <CommandRoot className={cn(className)}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        {groups.map((group, groupIndex) => (
          <CommandGroup key={groupIndex} heading={group.heading}>
            {group.items.map((item, itemIndex) => (
              <CommandItem key={itemIndex} onSelect={item.onSelect} disabled={item.disabled}>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.label}</span>
                {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandRoot>
  );
};
