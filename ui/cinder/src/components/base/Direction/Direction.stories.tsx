import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DirectionProvider } from "./Direction";

const meta: Meta<typeof DirectionProvider> = {
  title: "Cinder/Display/Direction",
  decorators: [centerStory],
  component: DirectionProvider
};

export default meta;
type Story = StoryObj<typeof DirectionProvider>;

export const LTR: Story = {
  render: () => (
    <DirectionProvider direction="ltr">
      <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <p>This content renders in LTR (left-to-right) direction.</p>
        <p style={{ textAlign: "start" }}>Text aligned to start.</p>
      </div>
    </DirectionProvider>
  )
};

export const RTL: Story = {
  render: () => (
    <DirectionProvider direction="rtl">
      <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <p>This content renders in RTL (right-to-left) direction.</p>
        <p style={{ textAlign: "start" }}>Text aligned to start (which is right in RTL).</p>
      </div>
    </DirectionProvider>
  )
};
