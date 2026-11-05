import { centerStory } from "@storybook-decorators";
import { Intent } from "@game-library/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Modal } from "./Modal";

const intents = Object.values(Intent);

const meta: Meta<typeof Modal> = {
  title: "Cinder/Overlay/Modal",
  decorators: [centerStory],
  component: Modal,
  argTypes: {
    intent: {
      control: "select",
      options: [undefined, ...intents]
    },
    width: {
      control: { type: "number", min: 320, max: 800 }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: "Modal Title",
    width: 480,
    children: <p>This is the modal content area. You can put any content here.</p>
  }
};

export const WithIntent: Story = {
  args: {
    title: "Success",
    intent: Intent.Success,
    width: 480,
    children: <p>Operation completed successfully.</p>
  }
};

export const WithCustomButtons: Story = {
  args: {
    title: "Custom Actions",
    intent: Intent.Danger,
    width: 480,
    buttons: [
      { label: "Delete", variant: "destructive", icon: "Trash" },
      { label: "Keep", variant: "outline" }
    ],
    children: <p>Are you sure you want to delete this item?</p>
  }
};

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {intents.map((intent) => (
        <Modal key={intent} title={`${intent} Intent`} intent={intent} width={320} showFooter={false}>
          <p>
            This modal uses the <strong>{intent}</strong> intent.
          </p>
        </Modal>
      ))}
    </div>
  )
};
