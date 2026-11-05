import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Cinder/Forms/Textarea",
  decorators: [centerStory],
  component: Textarea,
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" }
  }
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {}
};

export const WithPlaceholder: Story = {
  args: { placeholder: "Type your message here..." }
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" }
};
