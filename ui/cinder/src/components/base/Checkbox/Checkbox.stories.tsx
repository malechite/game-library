import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Cinder/Forms/Checkbox",
  decorators: [centerStory],
  component: Checkbox,
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" }
  }
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

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
