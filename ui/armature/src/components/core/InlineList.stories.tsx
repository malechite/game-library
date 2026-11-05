import type { StoryObj, Meta } from "@storybook/react-vite";
import { TextSize } from "@game-library/types";
import { InlineList } from "./InlineList";
import { VStack } from "./Stack";
import { centerStory, LayoutLabel } from "@storybook-decorators";

const meta: Meta<typeof InlineList> = {
  title: "Armature/Layout/InlineList",
  component: InlineList,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof InlineList>;

const sampleItems = [{ label: "Action" }, { label: "Adventure" }, { label: "RPG" }];

export const Default: Story = {
  render: () => (
    <LayoutLabel name="InlineList" color="List">
      <InlineList items={sampleItems} />
    </LayoutLabel>
  )
};

export const WithDelimiter: Story = {
  name: "Custom Delimiters",
  render: () => (
    <VStack gap={4}>
      <LayoutLabel name='delimiter="•" (default)' color="List">
        <InlineList items={sampleItems} />
      </LayoutLabel>
      <LayoutLabel name='delimiter="|"' color="List">
        <InlineList items={sampleItems} delimiter="|" />
      </LayoutLabel>
      <LayoutLabel name='delimiter="/"' color="List">
        <InlineList items={sampleItems} delimiter="/" />
      </LayoutLabel>
    </VStack>
  )
};

export const Styled: Story = {
  name: "Bold & Sized",
  render: () => (
    <VStack gap={4}>
      <LayoutLabel name="bold" color="List">
        <InlineList items={sampleItems} bold />
      </LayoutLabel>
      <LayoutLabel name="textSize=StaticSmall" color="List">
        <InlineList items={sampleItems} textSize={TextSize.StaticSmall} />
      </LayoutLabel>
      <LayoutLabel name="textSize=StaticLarge bold" color="List">
        <InlineList items={sampleItems} textSize={TextSize.StaticLarge} bold />
      </LayoutLabel>
    </VStack>
  )
};

export const Centered: Story = {
  render: () => (
    <LayoutLabel name="InlineList center" color="List" style={{ width: 400 }}>
      <div style={{ width: "100%" }}>
        <InlineList items={sampleItems} center bold />
      </div>
    </LayoutLabel>
  )
};
