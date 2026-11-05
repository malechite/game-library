import type { StoryObj, Meta } from "@storybook/react-vite";
import { Size } from "@game-library/types";
import { Surface } from "./Surface";
import { HStack, VStack } from "./Stack";
import { Spacer } from "./Spacer";
import { Divider } from "./Divider";
import { centerStory, LayoutLabel, SpacerViz, Placeholder } from "@storybook-decorators";

const meta: Meta<typeof Surface> = {
  title: "Armature/Layout/Surface",
  component: Surface,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  name: "Default (padding=4, gap=4, rounded)",
  render: () => (
    <LayoutLabel name="Surface" color="Surface" style={{ width: 300 }}>
      <Surface style={{ border: "1px solid #444", color: "white" }}>
        <Placeholder label="Content A" color="#aa66ff" />
        <Placeholder label="Content B" color="#aa66ff" />
      </Surface>
    </LayoutLabel>
  )
};

export const AsCard: Story = {
  name: "As a Card",
  render: () => (
    <LayoutLabel name="Surface (card)" color="Surface" style={{ width: 300 }}>
      <Surface style={{ border: "1px solid #333", backgroundColor: "#1a1a2e", color: "white" }}>
        <LayoutLabel name="HStack" color="HStack">
          <HStack center>
            <span style={{ fontSize: 14, fontWeight: "bold" }}>Card Title</span>
            <SpacerViz />
            <span style={{ fontSize: 12, color: "#888" }}>View All</span>
          </HStack>
        </LayoutLabel>
        <Divider color="#333" />
        <span style={{ fontSize: 13, color: "#aaa" }}>
          Card body content goes here. Surface provides the padding, gap, and rounded corners.
        </span>
      </Surface>
    </LayoutLabel>
  )
};

export const NestedContent: Story = {
  name: "Nested Composition",
  render: () => (
    <LayoutLabel name="Surface" color="Surface" style={{ width: 350 }}>
      <Surface style={{ border: "1px solid #333", backgroundColor: "#1a1a2e", color: "white" }}>
        <LayoutLabel name="HStack (header)" color="HStack">
          <HStack center gap={2}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#aa66ff40", flexShrink: 0 }} />
            <LayoutLabel name="VStack" color="VStack">
              <VStack>
                <span style={{ fontSize: 14, fontWeight: "bold" }}>Username</span>
                <span style={{ fontSize: 11, color: "#888" }}>2 hours ago</span>
              </VStack>
            </LayoutLabel>
            <SpacerViz />
            <Placeholder label="..." color="#888" />
          </HStack>
        </LayoutLabel>
        <Divider color="#333" />
        <span style={{ fontSize: 13, color: "#ccc" }}>
          This shows Surface containing an HStack header with avatar, text VStack, Spacer, and menu button, followed by a Divider
          and body text.
        </span>
      </Surface>
    </LayoutLabel>
  )
};

export const StatCard: Story = {
  name: "Stat Card Pattern",
  render: () => (
    <LayoutLabel name="Surface" color="Surface" style={{ width: 180, height: 140 }}>
      <Surface gap={2} expand style={{ border: "1px solid #333", backgroundColor: "#1a1a2e", color: "white" }}>
        <HStack center gap={2}>
          <span style={{ fontSize: 20 }}>1,234</span>
        </HStack>
        <SpacerViz />
        <span style={{ fontSize: 12, color: "#888" }}>Active Users</span>
      </Surface>
    </LayoutLabel>
  )
};
