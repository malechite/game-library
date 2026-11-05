import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Cinder/Layout/Accordion",
  decorators: [centerStory],
  component: Accordion
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion
      items={[
        {
          value: "accessible",
          trigger: "Is it accessible?",
          content: "Yes. It adheres to the WAI-ARIA design pattern."
        },
        {
          value: "styled",
          trigger: "Is it styled?",
          content: "Yes. It comes with default styles that match the other components."
        },
        {
          value: "animated",
          trigger: "Is it animated?",
          content: "Yes. It is animated by default, but you can disable it if you prefer."
        }
      ]}
      className="max-w-[500px]"
    />
  )
};

export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion
      items={[
        {
          value: "section-1",
          trigger: "Section 1 (open by default)",
          content: "This section is open when the page loads."
        },
        {
          value: "section-2",
          trigger: "Section 2",
          content: "Click to expand this section."
        },
        {
          value: "section-3",
          trigger: "Section 3",
          content: "Another collapsible section."
        }
      ]}
      defaultValue="section-1"
    />
  )
};

export const MultipleOpen: Story = {
  render: () => (
    <Accordion
      items={[
        {
          value: "first",
          trigger: "First Item",
          content: "Content for the first item."
        },
        {
          value: "second",
          trigger: "Second Item",
          content: "Content for the second item."
        },
        {
          value: "third",
          trigger: "Third Item",
          content: "Content for the third item."
        }
      ]}
      defaultValue={["first", "second"]}
    />
  )
};
