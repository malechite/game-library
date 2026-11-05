import { centerStory } from "@storybook-decorators";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Cinder/Forms/RadioGroup",
  decorators: [centerStory],
  component: RadioGroup
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

const RadioGroupExample = () => {
  const [value, setValue] = useState("option-one");

  return (
    <RadioGroup
      options={[
        { value: "option-one", label: "Option One" },
        { value: "option-two", label: "Option Two" },
        { value: "option-three", label: "Option Three" }
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const Default: Story = {
  render: () => <RadioGroupExample />
};

const WithDescriptionsExample = () => {
  const [value, setValue] = useState("standard");

  return (
    <RadioGroup
      options={[
        { value: "standard", label: "Standard", description: "Free shipping in 5-7 days" },
        { value: "express", label: "Express", description: "Arrives in 2-3 days" },
        { value: "overnight", label: "Overnight", description: "Next business day" }
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const WithDescriptions: Story = {
  render: () => <WithDescriptionsExample />
};

const WithDisabledExample = () => {
  const [value, setValue] = useState("available");

  return (
    <RadioGroup
      options={[
        { value: "available", label: "Available" },
        { value: "disabled", label: "Disabled", disabled: true },
        { value: "another", label: "Another Option" }
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const WithDisabledOption: Story = {
  render: () => <WithDisabledExample />
};

const HorizontalExample = () => {
  const [value, setValue] = useState("left");

  return (
    <RadioGroup
      options={[
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" }
      ]}
      value={value}
      onValueChange={setValue}
      orientation="horizontal"
    />
  );
};

export const Horizontal: Story = {
  render: () => <HorizontalExample />
};
