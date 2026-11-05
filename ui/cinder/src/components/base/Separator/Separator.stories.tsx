import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Cinder/Layout/Separator",
  decorators: [centerStory],
  component: Separator,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    }
  }
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <p>Above</p>
        <Story />
        <p>Below</p>
      </div>
    )
  ]
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", alignItems: "center", height: "40px", gap: "8px" }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    )
  ]
};
