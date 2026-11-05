import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Cinder/Feedback/Progress",
  decorators: [centerStory],
  component: Progress,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } }
  }
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 50 }
};

export const Empty: Story = {
  args: { value: 0 }
};

export const Quarter: Story = {
  args: { value: 25 }
};

export const ThreeQuarters: Story = {
  args: { value: 75 }
};

export const Complete: Story = {
  args: { value: 100 }
};
