import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "./NativeSelect";

const meta: Meta<typeof NativeSelect> = {
  title: "Cinder/Forms/NativeSelect",
  decorators: [centerStory],
  component: NativeSelect,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"]
    },
    disabled: { control: "boolean" }
  }
};
export default meta;
type Story = StoryObj<typeof NativeSelect>;

export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="">
      <NativeSelectOption value="" disabled>
        Select a fruit
      </NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  )
};

export const WithOptGroups: Story = {
  render: () => (
    <NativeSelect defaultValue="">
      <NativeSelectOption value="" disabled>
        Select a food
      </NativeSelectOption>
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
};

export const SmallSize: Story = {
  render: () => (
    <NativeSelect size="sm" defaultValue="">
      <NativeSelectOption value="" disabled>
        Small select
      </NativeSelectOption>
      <NativeSelectOption value="one">Option One</NativeSelectOption>
      <NativeSelectOption value="two">Option Two</NativeSelectOption>
    </NativeSelect>
  )
};

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled defaultValue="apple">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  )
};
