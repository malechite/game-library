import type { StoryObj, Meta } from "@storybook/react-vite";
import { HStack } from "./Stack";
import { Spacer } from "./Spacer";
import { centerStory, LayoutLabel, SpacerViz, Placeholder } from "@storybook-decorators";

const meta: Meta<typeof HStack> = {
  title: "Armature/Layout/HStack",
  component: HStack,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof HStack>;

export const Default: Story = {
  render: () => (
    <LayoutLabel name="HStack" color="HStack">
      <HStack padding={4}>
        <Placeholder label="Left" />
        <Placeholder label="Center" />
        <Placeholder label="Right" />
      </HStack>
    </LayoutLabel>
  )
};

export const WithGap: Story = {
  name: "With Gap",
  render: () => (
    <LayoutLabel name="HStack gap={4}" color="HStack">
      <HStack gap={4} padding={4}>
        <Placeholder label="Item 1" />
        <Placeholder label="Item 2" />
        <Placeholder label="Item 3" />
      </HStack>
    </LayoutLabel>
  )
};

export const Centered: Story = {
  render: () => (
    <LayoutLabel name="HStack center" color="HStack">
      <HStack center gap={2} padding={4} style={{ height: 80 }}>
        <Placeholder label="Short" height={30} />
        <Placeholder label="Tall" height={60} />
        <Placeholder label="Medium" height={45} />
      </HStack>
    </LayoutLabel>
  )
};

export const WithSpacer: Story = {
  name: "With Spacer (Push Apart)",
  render: () => (
    <LayoutLabel name="HStack" color="HStack" style={{ width: 500 }}>
      <HStack center gap={2} padding={4} full>
        <Placeholder label="Logo" color="#44cc88" />
        <Placeholder label="Title" color="#44cc88" />
        <SpacerViz />
        <Placeholder label="Settings" color="#aa66ff" />
        <Placeholder label="Avatar" color="#aa66ff" />
      </HStack>
    </LayoutLabel>
  )
};

export const MultipleGroups: Story = {
  name: "Two Spacers (Three Groups)",
  render: () => (
    <LayoutLabel name="HStack" color="HStack" style={{ width: 600 }}>
      <HStack center gap={2} padding={4} full>
        <Placeholder label="Back" color="#44cc88" />
        <SpacerViz />
        <Placeholder label="Page Title" color="#4488ff" />
        <SpacerViz />
        <Placeholder label="Next" color="#aa66ff" />
      </HStack>
    </LayoutLabel>
  )
};
