"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "../../../lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../Dialog/Dialog";
import { InputGroup, InputGroupAddon } from "../InputGroup/InputGroup";
import { MagnifyingGlassIcon, CheckIcon } from "@phosphor-icons/react";
import {
  commandStyle,
  commandDialogContentStyle,
  commandInputWrapperStyle,
  commandInputGroupStyle,
  commandInputStyle,
  commandSearchIconStyle,
  commandListStyle,
  commandEmptyStyle,
  commandGroupStyle,
  commandItemStyle,
  commandItemCheckIconStyle,
  commandShortcutStyle,
  commandSeparatorStyle
} from "./Command.css";

const CommandRoot = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive data-slot="command" className={cn(commandStyle, className)} {...props} />
);

const CommandDialog = ({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}) => (
  <Dialog {...props}>
    <DialogHeader className="sr-only">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
    <DialogContent className={cn(commandDialogContentStyle, className)} showCloseButton={showCloseButton}>
      {children}
    </DialogContent>
  </Dialog>
);

const CommandInput = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) => (
  <div data-slot="command-input-wrapper" className={commandInputWrapperStyle}>
    <InputGroup className={commandInputGroupStyle}>
      <CommandPrimitive.Input data-slot="command-input" className={cn(commandInputStyle, className)} {...props} />
      <InputGroupAddon>
        <MagnifyingGlassIcon className={commandSearchIconStyle} />
      </InputGroupAddon>
    </InputGroup>
  </div>
);

const CommandList = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List data-slot="command-list" className={cn(commandListStyle, className)} {...props} />
);

const CommandEmpty = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty data-slot="command-empty" className={cn(commandEmptyStyle, className)} {...props} />
);

const CommandGroup = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group data-slot="command-group" className={cn(commandGroupStyle, className)} {...props} />
);

const CommandSeparator = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator data-slot="command-separator" className={cn(commandSeparatorStyle, className)} {...props} />
);

const CommandItem = ({ className, children, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item data-slot="command-item" className={cn(commandItemStyle, className)} {...props}>
    {children}
    <CheckIcon className={commandItemCheckIconStyle} />
  </CommandPrimitive.Item>
);

const CommandShortcut = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span data-slot="command-shortcut" className={cn(commandShortcutStyle, className)} {...props} />
);

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
};
