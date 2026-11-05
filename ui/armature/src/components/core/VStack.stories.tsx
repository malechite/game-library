import type { StoryObj, Meta } from "@storybook/react-vite";
import { VStack } from "./Stack";
import { Spacer } from "./Spacer";
import { Divider } from "./Divider";
import { centerStory, LayoutLabel, SpacerViz, Placeholder } from "@storybook-decorators";

const meta: Meta<typeof VStack> = {
  title: "Armature/Layout/VStack",
  component: VStack,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof VStack>;

export const Default: Story = {
  render: () => (
    <LayoutLabel name="VStack" color="VStack" style={{ width: 300 }}>
      <VStack padding={4}>
        <Placeholder label="First" color="#44cc88" />
        <Placeholder label="Second" color="#44cc88" />
        <Placeholder label="Third" color="#44cc88" />
      </VStack>
    </LayoutLabel>
  )
};

export const WithGap: Story = {
  name: "With Gap",
  render: () => (
    <LayoutLabel name="VStack gap={4}" color="VStack" style={{ width: 300 }}>
      <VStack gap={4} padding={4}>
        <Placeholder label="Item 1" color="#44cc88" />
        <Placeholder label="Item 2" color="#44cc88" />
        <Placeholder label="Item 3" color="#44cc88" />
      </VStack>
    </LayoutLabel>
  )
};

export const ExpandWithSpacer: Story = {
  name: "Expand with Spacer (Sidebar Pattern)",
  render: () => (
    <LayoutLabel name="VStack expand" color="VStack" style={{ width: 240, height: 400 }}>
      <VStack expand padding={4} gap={2}>
        <Placeholder label="Nav Item 1" color="#44cc88" />
        <Placeholder label="Nav Item 2" color="#44cc88" />
        <Placeholder label="Nav Item 3" color="#44cc88" />
        <SpacerViz />
        <Placeholder label="Settings" color="#aa66ff" />
      </VStack>
    </LayoutLabel>
  )
};

export const WithDivider: Story = {
  name: "With Divider",
  render: () => (
    <LayoutLabel name="VStack" color="VStack" style={{ width: 300 }}>
      <VStack gap={4} padding={4}>
        <Placeholder label="Section A" color="#44cc88" />
        <Divider color="#444" />
        <Placeholder label="Section B" color="#4488ff" />
      </VStack>
    </LayoutLabel>
  )
};
