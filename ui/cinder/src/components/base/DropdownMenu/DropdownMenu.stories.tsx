import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Cinder/Overlay/Dropdown",
  decorators: [centerStory],
  component: Dropdown
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown
      trigger={{ children: "Open Menu", variant: "outline", size: "default" }}
      items={[
        { type: "label", label: "My Account" },
        { label: "Profile", icon: "User", onClick: () => console.log("Profile") },
        { label: "Settings", icon: "Gear", onClick: () => console.log("Settings") },
        { type: "separator" },
        { label: "Log out", icon: "SignOut", variant: "destructive", onClick: () => console.log("Logout") }
      ]}
    />
  )
};

export const WithGroups: Story = {
  render: () => (
    <Dropdown
      trigger={{ children: "Actions", variant: "outline", size: "default" }}
      items={[
        {
          type: "group",
          label: "Navigation",
          items: [
            { label: "Home", icon: "House", onClick: () => {} },
            { label: "Dashboard", icon: "ChartBar", onClick: () => {} }
          ]
        },
        { type: "separator" },
        {
          type: "group",
          label: "Danger Zone",
          items: [{ label: "Delete", icon: "Trash", variant: "destructive", onClick: () => {} }]
        }
      ]}
    />
  )
};

export const IconTrigger: Story = {
  render: () => (
    <Dropdown
      items={[
        { label: "Edit", icon: "PencilSimple", onClick: () => {} },
        { label: "Duplicate", icon: "Copy", onClick: () => {} },
        { type: "separator" },
        { label: "Delete", icon: "Trash", variant: "destructive", onClick: () => {} }
      ]}
    />
  )
};

export const WithHiddenItems: Story = {
  render: () => (
    <Dropdown
      trigger={{ children: "Menu", variant: "outline", size: "default" }}
      items={[
        { label: "Visible Item", onClick: () => {} },
        { label: "Hidden Item", onClick: () => {}, hidden: true },
        { label: "Disabled Item", onClick: () => {}, disabled: true },
        { type: "separator" },
        { label: "Another Visible", onClick: () => {} }
      ]}
    />
  )
};
