import type { StoryObj } from "@storybook/react-vite";
import { Size, IconType } from "@game-library/types";
import { Circle as CircleComponent } from "./Circle";
import { centerStory } from "@storybook-decorators";

export default {
  title: "Armature/Shapes/Circle",
  component: CircleComponent,
  decorators: [centerStory],
  argTypes: {
    color: {
      control: "color"
    },
    size: {
      control: "select",
      options: Object.values(Size)
    },
    icon: {
      control: "select",
      options: Object.values(IconType)
    }
  }
};

type Story = StoryObj<typeof CircleComponent>;

export const Circle: Story = {
  args: {
    color: "#ffffff",
    size: Size.XXLarge
  }
};
