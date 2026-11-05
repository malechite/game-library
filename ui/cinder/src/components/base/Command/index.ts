// High-level prop-driven component (recommended)
export { CommandMenu, type CommandViewProps, type CommandGroupConfig, type CommandItemConfig } from "./Command";

// Low-level building blocks (for advanced customization)
export {
  CommandRoot,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
} from "./CommandComponents";
