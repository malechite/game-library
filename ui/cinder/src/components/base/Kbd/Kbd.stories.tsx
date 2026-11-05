import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd, KbdGroup } from "./Kbd";

const meta: Meta<typeof Kbd> = {
  title: "Cinder/Display/Kbd",
  decorators: [centerStory],
  component: Kbd
};
export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: { children: "K" }
};

export const Modifier: Story = {
  args: { children: "Ctrl" }
};

export const Shortcut: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>C</Kbd>
    </KbdGroup>
  )
};

export const ComplexShortcut: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Cmd</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  )
};

export const Escape: Story = {
  args: { children: "Esc" }
};

export const Enter: Story = {
  args: { children: "Enter" }
};
