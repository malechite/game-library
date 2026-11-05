import type { StoryObj, Meta } from "@storybook/react-vite";
import { Divider } from "./Divider";
import { VStack } from "./Stack";
import { centerStory, LayoutLabel, Placeholder } from "@storybook-decorators";

const meta: Meta<typeof Divider> = {
  title: "Armature/Layout/Divider",
  component: Divider,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <VStack gap={4} style={{ width: 300 }}>
      <Placeholder label="Content Above" color="#44cc88" />
      <LayoutLabel name="Divider" color="Divider">
        <Divider />
      </LayoutLabel>
      <Placeholder label="Content Below" color="#4488ff" />
    </VStack>
  )
};

export const WithColor: Story = {
  name: "Custom Colors",
  render: () => (
    <VStack gap={6} style={{ width: 300 }}>
      <VStack gap={2}>
        <LayoutLabel name='color="#ff6688"' color="Divider">
          <Divider color="#ff6688" />
        </LayoutLabel>
      </VStack>
      <VStack gap={2}>
        <LayoutLabel name='color="#44cc88"' color="#44cc88">
          <Divider color="#44cc88" />
        </LayoutLabel>
      </VStack>
      <VStack gap={2}>
        <LayoutLabel name='color="#4488ff"' color="#4488ff">
          <Divider color="#4488ff" />
        </LayoutLabel>
      </VStack>
    </VStack>
  )
};
