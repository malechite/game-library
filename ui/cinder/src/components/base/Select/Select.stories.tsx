import { centerStory } from "@storybook-decorators";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Cinder/Forms/Select",
  decorators: [centerStory],
  component: Select
};
export default meta;
type Story = StoryObj<typeof Select>;

const SelectExample = () => {
  const [value, setValue] = useState("");

  return (
    <Select
      options={[
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" }
      ]}
      value={value}
      onValueChange={setValue}
      placeholder="Select a fruit"
    />
  );
};

export const Default: Story = {
  render: () => <SelectExample />
};

const WithDescriptionsExample = () => {
  const [value, setValue] = useState("");

  return (
    <Select
      options={[
        { value: "sm", label: "Small", description: "For compact layouts" },
        { value: "md", label: "Medium", description: "Default size" },
        { value: "lg", label: "Large", description: "For spacious layouts" }
      ]}
      value={value}
      onValueChange={setValue}
      placeholder="Select a size"
    />
  );
};

export const WithDescriptions: Story = {
  render: () => <WithDescriptionsExample />
};

const SmallSizeExample = () => {
  const [value, setValue] = useState("");

  return (
    <Select
      options={[
        { value: "one", label: "Option One" },
        { value: "two", label: "Option Two" },
        { value: "three", label: "Option Three" }
      ]}
      value={value}
      onValueChange={setValue}
      placeholder="Small select"
      size="sm"
    />
  );
};

export const SmallSize: Story = {
  render: () => <SmallSizeExample />
};

const WithDisabledExample = () => {
  const [value, setValue] = useState("");

  return (
    <Select
      options={[
        { value: "active", label: "Active" },
        { value: "disabled", label: "Disabled Option", disabled: true },
        { value: "another", label: "Another Active" }
      ]}
      value={value}
      onValueChange={setValue}
      placeholder="Select an option"
    />
  );
};

export const WithDisabledOption: Story = {
  render: () => <WithDisabledExample />
};
