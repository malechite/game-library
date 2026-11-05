import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./Sheet";
import { Button } from "../Button/Button";

const meta: Meta<typeof Sheet> = {
  title: "Cinder/Overlay/Sheet",
  decorators: [centerStory],
  component: Sheet
};
export default meta;
type Story = StoryObj<typeof Sheet>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button />}>Open Right Sheet</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This sheet slides in from the right.</SheetDescription>
        </SheetHeader>
        <p>Sheet content goes here.</p>
      </SheetContent>
    </Sheet>
  )
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button />}>Open Left Sheet</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse the sidebar menu.</SheetDescription>
        </SheetHeader>
        <p>Sidebar content goes here.</p>
      </SheetContent>
    </Sheet>
  )
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button />}>Open Top Sheet</SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>This sheet slides in from the top.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button />}>Open Bottom Sheet</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Actions</SheetTitle>
          <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
};
