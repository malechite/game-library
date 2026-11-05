import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Cinder/Forms/Slider",
  component: Slider,
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    disabled: { control: "boolean" }
  },
  decorators: [
    centerStory,
    (Story) => (
      <div style={{ width: "300px", padding: "20px" }}>
        <Story />
      </div>
    )
  ]
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [50] }
};

export const Range: Story = {
  args: { defaultValue: [25, 75] }
};

export const CustomRange: Story = {
  args: { defaultValue: [30], min: 0, max: 200 }
};

export const Disabled: Story = {
  args: { defaultValue: [50], disabled: true }
};
