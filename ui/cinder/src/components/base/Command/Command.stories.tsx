import { centerStory } from "@storybook-decorators";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommandMenu } from "./Command";
import {
  CommandDialog,
  CommandRoot,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "./CommandComponents";
import { Button } from "../Button/Button";

const meta: Meta<typeof CommandMenu> = {
  title: "Cinder/Forms/CommandMenu",
  decorators: [centerStory],
  component: CommandMenu
};
export default meta;
type Story = StoryObj<typeof CommandMenu>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 400, border: "1px solid #e5e5e5", borderRadius: 8 }}>
      <CommandMenu
        groups={[
          {
            heading: "Suggestions",
            items: [
              { label: "Calendar", icon: "Calendar", onSelect: () => console.log("Calendar") },
              { label: "Search Emoji", icon: "Smiley", onSelect: () => console.log("Emoji") },
              { label: "Calculator", icon: "Calculator", onSelect: () => console.log("Calculator") }
            ]
          },
          {
            heading: "Settings",
            items: [
              { label: "Profile", icon: "User", onSelect: () => {}, shortcut: "⌘P" },
              { label: "Billing", icon: "CreditCard", onSelect: () => {}, shortcut: "⌘B" },
              { label: "Settings", icon: "Gear", onSelect: () => {}, shortcut: "⌘S" }
            ]
          }
        ]}
      />
    </div>
  )
};

export const WithCustomPlaceholder: Story = {
  render: () => (
    <div style={{ maxWidth: 400, border: "1px solid #e5e5e5", borderRadius: 8 }}>
      <CommandMenu
        placeholder="Search actions..."
        emptyMessage="No actions found."
        groups={[
          {
            heading: "Actions",
            items: [
              { label: "New File", icon: "FilePlus", onSelect: () => {}, shortcut: "⌘N" },
              { label: "Open File", icon: "FolderOpen", onSelect: () => {}, shortcut: "⌘O" },
              { label: "Save", icon: "FloppyDisk", onSelect: () => {}, shortcut: "⌘S" }
            ]
          }
        ]}
      />
    </div>
  )
};

export const InDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandRoot>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => setOpen(false)}>New File</CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>Open File</CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>Save</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandRoot>
        </CommandDialog>
      </>
    );
  }
};
