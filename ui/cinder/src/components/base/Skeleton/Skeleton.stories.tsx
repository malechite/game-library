import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Cinder/Feedback/Skeleton",
  decorators: [centerStory],
  component: Skeleton
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    style: { width: "200px", height: "20px" }
  }
};

export const Circle: Story = {
  args: {
    style: { width: "48px", height: "48px", borderRadius: "50%" }
  }
};

export const Card: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Skeleton style={{ width: "250px", height: "16px" }} />
      <Skeleton style={{ width: "200px", height: "16px" }} />
      <Skeleton style={{ width: "150px", height: "16px" }} />
    </div>
  )
};
