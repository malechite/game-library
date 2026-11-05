import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Cinder/Forms/Input",
  decorators: [centerStory],
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search"]
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" }
  }
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {}
};

export const WithPlaceholder: Story = {
  args: { placeholder: "Enter your name..." }
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" }
};

export const Password: Story = {
  args: { type: "password", placeholder: "Enter password..." }
};
