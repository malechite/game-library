import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./ButtonGroup";
import { Button } from "../Button/Button";

const meta: Meta<typeof ButtonGroup> = {
  title: "Cinder/Actions/ButtonGroup",
  decorators: [centerStory],
  component: ButtonGroup,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    }
  }
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
};

export const WithSeparators: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Cut</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  )
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Label:</ButtonGroupText>
      <Button variant="outline">Option A</Button>
      <Button variant="outline">Option B</Button>
    </ButtonGroup>
  )
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  )
};
