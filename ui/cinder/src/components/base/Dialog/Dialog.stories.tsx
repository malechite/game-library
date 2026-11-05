import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "./Dialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof Dialog> = {
  title: "Cinder/Overlay/Dialog",
  decorators: [centerStory],
  component: Dialog
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
        </DialogHeader>
        <p>Dialog body content goes here.</p>
        <DialogFooter>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
