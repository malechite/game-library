import { centerStory } from "@storybook-decorators";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarGroup,
  MenubarLabel,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from "./Menubar";

const meta: Meta<typeof Menubar> = {
  title: "Cinder/Navigation/Menubar",
  decorators: [centerStory],
  component: Menubar
};
export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showPanel, setShowPanel] = useState(false);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab
              <MenubarShortcut>Ctrl+T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window
              <MenubarShortcut>Ctrl+N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email Link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print
              <MenubarShortcut>Ctrl+P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo
              <MenubarShortcut>Ctrl+Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo
              <MenubarShortcut>Ctrl+Y</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>Appearance</MenubarLabel>
              <MenubarCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                Status Bar
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
                Panel
              </MenubarCheckboxItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  }
};
