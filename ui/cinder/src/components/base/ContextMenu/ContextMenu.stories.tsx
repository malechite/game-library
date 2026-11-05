import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Cinder/Overlay/ContextMenu",
  decorators: [centerStory],
  component: ContextMenu
};
export default meta;
type Story = StoryObj<typeof ContextMenu>;

const TriggerBox = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 150,
      width: 300,
      border: "2px dashed #ccc",
      borderRadius: 8
    }}
  >
    Right-click here
  </div>
);

export const Default: Story = {
  render: () => (
    <ContextMenu
      items={[
        { label: "Back", icon: "ArrowLeft", onClick: () => console.log("Back") },
        { label: "Forward", icon: "ArrowRight", onClick: () => console.log("Forward") },
        { label: "Reload", icon: "ArrowClockwise", onClick: () => console.log("Reload") },
        { type: "separator" },
        { label: "Delete", icon: "Trash", variant: "destructive", onClick: () => console.log("Delete") }
      ]}
    >
      <TriggerBox />
    </ContextMenu>
  )
};

export const WithGroups: Story = {
  render: () => (
    <ContextMenu
      items={[
        {
          type: "group",
          label: "Edit",
          items: [
            { label: "Cut", icon: "Scissors", onClick: () => {} },
            { label: "Copy", icon: "Copy", onClick: () => {} },
            { label: "Paste", icon: "ClipboardText", onClick: () => {} }
          ]
        },
        { type: "separator" },
        {
          type: "group",
          label: "View",
          items: [
            { label: "Zoom In", icon: "MagnifyingGlassPlus", onClick: () => {} },
            { label: "Zoom Out", icon: "MagnifyingGlassMinus", onClick: () => {} }
          ]
        }
      ]}
    >
      <TriggerBox />
    </ContextMenu>
  )
};

export const WithHiddenItems: Story = {
  render: () => (
    <ContextMenu
      items={[
        { label: "Visible", onClick: () => {} },
        { label: "Also Visible", onClick: () => {} },
        { label: "Hidden", onClick: () => {}, hidden: true },
        { type: "separator" },
        { label: "Disabled", onClick: () => {}, disabled: true }
      ]}
    >
      <TriggerBox />
    </ContextMenu>
  )
};
