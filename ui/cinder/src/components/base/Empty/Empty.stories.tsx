import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from "./Empty";
import { Button } from "../Button/Button";

const meta: Meta<typeof Empty> = {
  title: "Cinder/Feedback/Empty",
  decorators: [centerStory],
  component: Empty
};
export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia />
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filter to find what you are looking for.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear Filters</Button>
      </EmptyContent>
    </Empty>
  )
};

export const IconVariant: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" />
        <EmptyTitle>No items yet</EmptyTitle>
        <EmptyDescription>Get started by creating your first item.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create Item</Button>
      </EmptyContent>
    </Empty>
  )
};
