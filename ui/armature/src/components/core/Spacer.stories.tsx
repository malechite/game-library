import type { StoryObj, Meta } from "@storybook/react-vite";
import { Spacer } from "./Spacer";
import { HStack, VStack } from "./Stack";
import { Box } from "./Box";
import { Orientation } from "@game-library/types";
import { centerStory, LayoutLabel, SpacerViz, Placeholder } from "@storybook-decorators";

const meta: Meta<typeof Spacer> = {
  title: "Armature/Layout/Spacer",
  component: Spacer,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const PushApart: Story = {
  name: "Push Apart (Horizontal)",
  render: () => (
    <VStack gap={6} style={{ width: 500 }}>
      <LayoutLabel name="HStack + Spacer" color="HStack">
        <HStack center gap={2} padding={4} full>
          <Placeholder label="Title" color="#44cc88" />
          <SpacerViz />
          <Placeholder label="Close" color="#ff6688" />
        </HStack>
      </LayoutLabel>

      <LayoutLabel name="HStack + Spacer (multiple left)" color="HStack">
        <HStack center gap={2} padding={4} full>
          <Placeholder label="Icon" color="#44cc88" />
          <Placeholder label="Title" color="#44cc88" />
          <SpacerViz />
          <Placeholder label="Action" color="#ff6688" />
        </HStack>
      </LayoutLabel>
    </VStack>
  )
};

export const RightAligned: Story = {
  name: "Right-Aligned Buttons",
  render: () => (
    <LayoutLabel name="HStack" color="HStack" style={{ width: 400 }}>
      <HStack gap={2} padding={4} full>
        <SpacerViz />
        <Placeholder label="Cancel" color="#888" />
        <Placeholder label="Save" color="#4488ff" />
      </HStack>
    </LayoutLabel>
  )
};

export const VerticalPushApart: Story = {
  name: "Push Apart (Vertical)",
  render: () => (
    <LayoutLabel name="VStack + Spacer" color="VStack" style={{ width: 240, height: 350 }}>
      <VStack expand padding={4} gap={2}>
        <Placeholder label="Header" color="#44cc88" />
        <Placeholder label="Nav 1" color="#4488ff" />
        <Placeholder label="Nav 2" color="#4488ff" />
        <SpacerViz />
        <Placeholder label="Footer" color="#aa66ff" />
      </VStack>
    </LayoutLabel>
  )
};

export const ConstrainedWidth: Story = {
  name: "Constrained Width (max 6rem)",
  render: () => (
    <LayoutLabel name="HStack" color="HStack" style={{ width: 500 }}>
      <HStack center gap={2} padding={4} full>
        <Placeholder label="Left" color="#44cc88" />
        <SpacerViz style={{ maxWidth: "6rem" }} />
        <Placeholder label="Right" color="#aa66ff" />
      </HStack>
    </LayoutLabel>
  )
};

export const ConstrainedHeight: Story = {
  name: "Constrained Height (max 3rem)",
  render: () => (
    <LayoutLabel name="VStack" color="VStack" style={{ width: 250, height: 300 }}>
      <VStack expand padding={4} gap={2}>
        <Placeholder label="Top" color="#44cc88" />
        <SpacerViz style={{ maxHeight: "3rem" }} />
        <Placeholder label="Middle" color="#4488ff" />
        <SpacerViz />
        <Placeholder label="Bottom" color="#aa66ff" />
      </VStack>
    </LayoutLabel>
  )
};

export const MultipleSpacers: Story = {
  name: "Multiple Spacers (Even Distribution)",
  render: () => (
    <LayoutLabel name="HStack" color="HStack" style={{ width: 500 }}>
      <HStack center padding={4} full>
        <Placeholder label="A" color="#44cc88" />
        <SpacerViz />
        <Placeholder label="B" color="#4488ff" />
        <SpacerViz />
        <Placeholder label="C" color="#aa66ff" />
      </HStack>
    </LayoutLabel>
  )
};

export const VsSpaceBetween: Story = {
  name: "Spacer vs space-between",
  render: () => (
    <VStack gap={6} style={{ width: 500 }}>
      {/* space-between comparison */}
      <VStack gap={2}>
        <div style={{ color: "#ff6688", fontFamily: "monospace", fontSize: 12 }}>
          justify-content: space-between (3 items spread evenly)
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            border: "1px dashed #ff6688",
            borderRadius: 2,
            width: "100%"
          }}
        >
          <Placeholder label="Logo" color="#ff6688" />
          <Placeholder label="Title" color="#ff6688" />
          <Placeholder label="Close" color="#ff6688" />
        </div>
      </VStack>

      {/* Spacer version */}
      <VStack gap={2}>
        <div style={{ color: "#44cc88", fontFamily: "monospace", fontSize: 12 }}>
          HStack + Spacer (Logo & Title grouped, Close pushed right)
        </div>
        <LayoutLabel name="HStack + Spacer" color="HStack">
          <HStack center gap={2} padding={4} full>
            <Placeholder label="Logo" color="#44cc88" />
            <Placeholder label="Title" color="#44cc88" />
            <SpacerViz />
            <Placeholder label="Close" color="#44cc88" />
          </HStack>
        </LayoutLabel>
      </VStack>
    </VStack>
  )
};
