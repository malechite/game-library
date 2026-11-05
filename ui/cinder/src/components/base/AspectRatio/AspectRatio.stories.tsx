import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "Cinder/Layout/AspectRatio",
  component: AspectRatio,
  argTypes: {
    ratio: { control: "number" }
  },
  decorators: [
    centerStory,
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    )
  ]
};
export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Ratio16by9: Story = {
  args: {
    ratio: 16 / 9,
    style: { backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" },
    children: "16:9"
  }
};

export const Ratio4by3: Story = {
  args: {
    ratio: 4 / 3,
    style: { backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" },
    children: "4:3"
  }
};

export const Square: Story = {
  args: {
    ratio: 1,
    style: { backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" },
    children: "1:1"
  }
};
