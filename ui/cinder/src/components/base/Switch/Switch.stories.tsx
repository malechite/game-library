import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Cinder/Forms/Switch",
  decorators: [centerStory],
  component: Switch,
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"]
    },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" }
  }
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {}
};

export const Checked: Story = {
  args: { defaultChecked: true }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true }
};

export const Small: Story = {
  args: { size: "sm" }
};
