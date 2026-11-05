import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  title: "Cinder/Actions/ToggleGroup",
  decorators: [centerStory],
  component: ToggleGroup,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"]
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"]
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    }
  }
};
export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  args: {}
};

export const Outline: Story = {
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
  args: { variant: "outline" }
};

export const Small: Story = {
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  args: { size: "sm" }
};

export const Vertical: Story = {
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="top">Top</ToggleGroupItem>
      <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
      <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
    </ToggleGroup>
  ),
  args: { orientation: "vertical" }
};
