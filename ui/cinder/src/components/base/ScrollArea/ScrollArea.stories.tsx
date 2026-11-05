import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Cinder/Layout/ScrollArea",
  decorators: [centerStory],
  component: ScrollArea
};
export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea style={{ height: "200px", width: "300px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ padding: "16px" }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ margin: "8px 0" }}>
            Item {i + 1} - Scrollable content
          </p>
        ))}
      </div>
    </ScrollArea>
  )
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea style={{ width: "300px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ display: "flex", gap: "16px", padding: "16px", width: "800px" }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: "100px",
              height: "100px",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
};
