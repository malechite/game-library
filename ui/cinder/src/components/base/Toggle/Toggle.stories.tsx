import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Cinder/Actions/Toggle",
  decorators: [centerStory],
  component: Toggle,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"]
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"]
    },
    disabled: { control: "boolean" }
  }
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: { children: "Toggle" }
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" }
};

export const Small: Story = {
  args: { size: "sm", children: "Small" }
};

export const Large: Story = {
  args: { size: "lg", children: "Large" }
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" }
};

export const Pressed: Story = {
  args: { defaultPressed: true, children: "Pressed" }
};
