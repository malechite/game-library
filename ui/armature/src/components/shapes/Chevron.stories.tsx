import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chevron } from "./Chevron";

const meta = {
  title: "Armature/Shapes/Chevron",
  component: Chevron,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark"
    }
  },
  argTypes: {
    size: {
      control: { type: "range", min: 8, max: 48, step: 2 }
    },
    rotation: {
      control: { type: "range", min: -180, max: 180, step: 15 }
    },
    fill: {
      control: "color"
    }
  }
} satisfies Meta<typeof Chevron>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 12,
    rotation: 0,
    fill: "#7E8189"
  }
};

export const PointingRight: Story = {
  args: {
    size: 12,
    rotation: 0,
    fill: "#7E8189"
  }
};

export const PointingDown: Story = {
  args: {
    size: 12,
    rotation: 90,
    fill: "#7E8189"
  }
};

export const PointingUp: Story = {
  args: {
    size: 12,
    rotation: -90,
    fill: "#7E8189"
  }
};

export const PointingLeft: Story = {
  args: {
    size: 12,
    rotation: 180,
    fill: "#7E8189"
  }
};

export const Large: Story = {
  args: {
    size: 24,
    rotation: 0,
    fill: "#7E8189"
  }
};

export const Colored: Story = {
  args: {
    size: 16,
    rotation: 90,
    fill: "#A03ADE"
  }
};

export const AllDirections: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Chevron rotation={-90} />
        <div style={{ marginTop: "0.5rem", fontSize: "10px", color: "#aaa" }}>Up</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Chevron rotation={0} />
        <div style={{ marginTop: "0.5rem", fontSize: "10px", color: "#aaa" }}>Right</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Chevron rotation={90} />
        <div style={{ marginTop: "0.5rem", fontSize: "10px", color: "#aaa" }}>Down</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Chevron rotation={180} />
        <div style={{ marginTop: "0.5rem", fontSize: "10px", color: "#aaa" }}>Left</div>
      </div>
    </div>
  )
};
