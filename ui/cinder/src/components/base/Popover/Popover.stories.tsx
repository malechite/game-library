import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from "./Popover";
import { Button } from "../Button/Button";

const meta: Meta<typeof Popover> = {
  title: "Cinder/Overlay/Popover",
  decorators: [centerStory],
  component: Popover
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "4rem", display: "flex", justifyContent: "center" }}>
      <Popover>
        <PopoverTrigger render={<Button />}>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>
          <p>Popover body content goes here.</p>
        </PopoverContent>
      </Popover>
    </div>
  )
};
