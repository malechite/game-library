import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast, Toaster as SonnerToaster } from "sonner";
import { Button } from "../Button/Button";

/**
 * The actual Toaster component from sonner.tsx uses next-themes' useTheme,
 * which is unavailable in the Storybook Vite environment.
 * We use sonner's Toaster directly here to demonstrate toast functionality.
 */
const meta: Meta = {
  title: "Cinder/Feedback/Sonner",
  decorators: [
    centerStory,
    (Story) => (
      <>
        <Story />
        <SonnerToaster />
      </>
    )
  ]
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button onClick={() => toast("This is a default toast")}>Default Toast</Button>
      <Button variant="outline" onClick={() => toast.success("Operation completed successfully")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Something went wrong")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Please be careful")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("Here is some information")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.loading("Loading data...")}>
        Loading
      </Button>
    </div>
  )
};
