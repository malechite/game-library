import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Cinder/Display/Badge",
  decorators: [centerStory],
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"]
    }
  }
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge" }
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" }
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" }
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" }
};
