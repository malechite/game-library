import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Cinder/Overlay/Tooltip",
  component: Tooltip,
  decorators: [
    centerStory,
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "4rem", display: "flex", justifyContent: "center" }}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
        <TooltipContent>This is a tooltip</TooltipContent>
      </Tooltip>
    </div>
  )
};
