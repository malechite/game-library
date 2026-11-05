import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Cinder/Feedback/Spinner",
  decorators: [centerStory],
  component: Spinner
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {}
};

export const CustomSize: Story = {
  args: {
    style: { width: "32px", height: "32px" }
  }
};
