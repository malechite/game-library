import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea } from "./InputGroup";
import { MagnifyingGlassIcon, EnvelopeIcon } from "@phosphor-icons/react";

const meta: Meta<typeof InputGroup> = {
  title: "Cinder/Forms/InputGroup",
  decorators: [centerStory],
  component: InputGroup
};
export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>@</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Username" />
    </InputGroup>
  )
};

export const WithIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  )
};

export const WithButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter your email" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Subscribe</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
};

export const WithEndIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="you@example.com" />
      <InputGroupAddon align="inline-end">
        <EnvelopeIcon />
      </InputGroupAddon>
    </InputGroup>
  )
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <EnvelopeIcon />
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Write your message..." />
    </InputGroup>
  )
};
