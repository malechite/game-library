import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";
import { Button } from "../Button/Button";

const meta: Meta<typeof Collapsible> = {
  title: "Cinder/Layout/Collapsible",
  decorators: [centerStory],
  component: Collapsible
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible style={{ maxWidth: "350px" }}>
      <CollapsibleTrigger render={<Button variant="outline" />}>Toggle Content</CollapsibleTrigger>
      <CollapsibleContent>
        <div
          style={{
            padding: "0.75rem",
            marginTop: "0.5rem",
            borderRadius: "0.375rem",
            border: "1px solid #e5e7eb"
          }}
        >
          <p style={{ margin: 0 }}>
            This is the collapsible content. It can be expanded or collapsed by clicking the trigger button above.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
};
