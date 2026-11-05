import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Cinder/Forms/Label",
  decorators: [centerStory],
  component: Label
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: "Email address" }
};

export const WithHtmlFor: Story = {
  args: { children: "Username", htmlFor: "username" }
};
