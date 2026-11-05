import type { StoryObj, Meta } from "@storybook/react-vite";
import { Orientation, Size } from "@game-library/types";
import { Box } from "./Box";
import { centerStory, LayoutLabel, Placeholder } from "@storybook-decorators";

const meta: Meta<typeof Box> = {
  title: "Armature/Layout/Box",
  component: Box,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  name: "Default (Vertical Column)",
  render: () => (
    <LayoutLabel name="Box" color="Box" style={{ width: 300 }}>
      <Box gap={2} padding={4}>
        <Placeholder label="Child 1" />
        <Placeholder label="Child 2" />
        <Placeholder label="Child 3" />
      </Box>
    </LayoutLabel>
  )
};

export const Horizontal: Story = {
  render: () => (
    <LayoutLabel name="Box (horizontal)" color="Box" style={{ width: 400 }}>
      <Box orientation={Orientation.Horizontal} gap={2} padding={4}>
        <Placeholder label="Child 1" />
        <Placeholder label="Child 2" />
        <Placeholder label="Child 3" />
      </Box>
    </LayoutLabel>
  )
};

export const WithGap: Story = {
  name: "Gap Comparison",
  render: () => (
    <Box orientation={Orientation.Horizontal} gap={6}>
      <LayoutLabel name="gap={1} (4px)" color="Box" style={{ width: 200 }}>
        <Box gap={1} padding={2}>
          <Placeholder label="A" />
          <Placeholder label="B" />
          <Placeholder label="C" />
        </Box>
      </LayoutLabel>
      <LayoutLabel name="gap={2} (8px)" color="Box" style={{ width: 200 }}>
        <Box gap={2} padding={2}>
          <Placeholder label="A" />
          <Placeholder label="B" />
          <Placeholder label="C" />
        </Box>
      </LayoutLabel>
      <LayoutLabel name="gap={4} (16px)" color="Box" style={{ width: 200 }}>
        <Box gap={4} padding={2}>
          <Placeholder label="A" />
          <Placeholder label="B" />
          <Placeholder label="C" />
        </Box>
      </LayoutLabel>
    </Box>
  )
};

export const WithPadding: Story = {
  name: "Padding Comparison",
  render: () => (
    <Box orientation={Orientation.Horizontal} gap={6}>
      <LayoutLabel name="padding={2} (8px)" color="Box">
        <Box padding={2} gap={2} style={{ background: "rgba(136,136,136,0.1)" }}>
          <Placeholder label="Content" />
        </Box>
      </LayoutLabel>
      <LayoutLabel name="padding={4} (16px)" color="Box">
        <Box padding={4} gap={2} style={{ background: "rgba(136,136,136,0.1)" }}>
          <Placeholder label="Content" />
        </Box>
      </LayoutLabel>
      <LayoutLabel name="padding={6} (24px)" color="Box">
        <Box padding={6} gap={2} style={{ background: "rgba(136,136,136,0.1)" }}>
          <Placeholder label="Content" />
        </Box>
      </LayoutLabel>
    </Box>
  )
};

export const Centered: Story = {
  render: () => (
    <LayoutLabel name="Box center" color="Box">
      <Box center style={{ width: 300, height: 200, background: "rgba(136,136,136,0.1)" }}>
        <Placeholder label="Centered content" />
      </Box>
    </LayoutLabel>
  )
};

export const Expand: Story = {
  name: "Expand (fills container)",
  render: () => (
    <LayoutLabel name="Container (fixed 400x200)" color="Box" style={{ width: 400, height: 200 }}>
      <Box orientation={Orientation.Horizontal} gap={2} padding={2} style={{ height: "100%" }}>
        <Placeholder label="Fixed" />
        <LayoutLabel name="expand" color="#44cc88">
          <Box expand center style={{ background: "rgba(68,204,136,0.1)" }}>
            <Placeholder label="I expand to fill" color="#44cc88" />
          </Box>
        </LayoutLabel>
      </Box>
    </LayoutLabel>
  )
};

export const Scrollable: Story = {
  render: () => (
    <LayoutLabel name="Box scroll" color="Box">
      <Box scroll padding={2} gap={2} style={{ height: 150, width: 250 }}>
        <Placeholder label="Item 1" />
        <Placeholder label="Item 2" />
        <Placeholder label="Item 3" />
        <Placeholder label="Item 4" />
        <Placeholder label="Item 5" />
        <Placeholder label="Item 6" />
        <Placeholder label="Item 7" />
      </Box>
    </LayoutLabel>
  )
};

export const AbsolutePositioning: Story = {
  name: "Absolute Positioning",
  render: () => (
    <LayoutLabel name="Box (relative container)" color="Box">
      <Box padding={4} style={{ width: 300, height: 200, background: "rgba(136,136,136,0.1)" }}>
        <Placeholder label="Normal flow" />
        <LayoutLabel name="absolute top={0} right={0}" color="#ff6688">
          <Box absolute top={0} right={0} padding={2}>
            <Placeholder label="Absolute" color="#ff6688" />
          </Box>
        </LayoutLabel>
        <LayoutLabel name="absolute bottom={0} left={0}" color="#ff6688">
          <Box absolute bottom={0} left={0} padding={2}>
            <Placeholder label="Absolute" color="#ff6688" />
          </Box>
        </LayoutLabel>
      </Box>
    </LayoutLabel>
  )
};

export const Rounded: Story = {
  name: "Border & Rounded",
  render: () => (
    <Box orientation={Orientation.Horizontal} gap={4}>
      <LayoutLabel name="rounded (default md)" color="Box">
        <Box rounded padding={4} border style={{ borderColor: "#888" }}>
          <Placeholder label="md" />
        </Box>
      </LayoutLabel>
      <LayoutLabel name="rounded={Size.Large}" color="Box">
        <Box rounded={Size.Large} padding={4} border style={{ borderColor: "#888" }}>
          <Placeholder label="lg" />
        </Box>
      </LayoutLabel>
      <LayoutLabel name="rounded={Size.XLarge}" color="Box">
        <Box rounded={Size.XLarge} padding={4} border style={{ borderColor: "#888" }}>
          <Placeholder label="xl" />
        </Box>
      </LayoutLabel>
    </Box>
  )
};
