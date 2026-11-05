import { centerStory } from "@storybook-decorators";
import { VStack } from "@game-library/armature";
import { Gemstone } from "@game-library/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LightBar } from "./LightBar";

const gemstones = Object.values(Gemstone);

const meta: Meta<typeof LightBar> = {
  title: "Cinder/Display/LightBar",
  decorators: [centerStory],
  component: LightBar,
  argTypes: {
    gradient: {
      control: "select",
      options: gemstones
    },
    animate: {
      control: "boolean"
    },
    height: {
      control: { type: "number", min: 1, max: 12 }
    }
  }
};
export default meta;
type Story = StoryObj<typeof LightBar>;

export const Default: Story = {
  args: { gradient: Gemstone.Sapphire }
};

export const Animated: Story = {
  args: { gradient: Gemstone.Sapphire, animate: true }
};

export const AllGemstones: Story = {
  render: (args) => (
    <VStack gap={4} full style={{ width: "100%" }}>
      {gemstones.map((gem) => (
        <VStack key={gem} gap={1}>
          <span style={{ fontSize: 12, opacity: 0.6 }}>{gem}</span>
          <LightBar {...args} gradient={gem} />
        </VStack>
      ))}
    </VStack>
  ),
  args: { animate: true, height: 2 }
};
