import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardContent } from "../Card";
import { FadeIn } from "./FadeIn";

const meta: Meta<typeof FadeIn> = {
  title: "Cinder/Display/FadeIn",
  decorators: [centerStory],
  component: FadeIn,
  argTypes: {
    delay: { control: { type: "number", min: 0, max: 1000, step: 50 } }
  }
};
export default meta;
type Story = StoryObj<typeof FadeIn>;

export const Default: Story = {
  args: { delay: 0 },
  render: (args) => (
    <FadeIn {...args}>
      <Card style={{ width: 240 }}>
        <CardContent>Fades in when it enters the viewport.</CardContent>
      </Card>
    </FadeIn>
  )
};

/** Stagger siblings by index for a quick cascade. */
export const Staggered: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 120px)", gap: 12 }}>
      {Array.from({ length: 12 }, (_, index) => (
        <FadeIn key={index} delay={index * 40}>
          <Card size="sm" style={{ height: 120, alignItems: "center", justifyContent: "center" }}>
            <CardContent>{index + 1}</CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  )
};
