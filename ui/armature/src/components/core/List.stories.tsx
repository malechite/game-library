import type { StoryObj, Meta } from "@storybook/react-vite";
import { List } from "./List";
import { centerStory, LayoutLabel, Placeholder } from "@storybook-decorators";

const meta: Meta<typeof List> = {
  title: "Armature/Layout/List",
  component: List,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: () => (
    <LayoutLabel name="List" color="List" style={{ width: 250 }}>
      <List>
        <li>
          <Placeholder label="Item A" color="#cc88ff" />
        </li>
        <li>
          <Placeholder label="Item B" color="#cc88ff" />
        </li>
        <li>
          <Placeholder label="Item C" color="#cc88ff" />
        </li>
      </List>
    </LayoutLabel>
  )
};

export const WithGap: Story = {
  name: "With Gap",
  render: () => (
    <LayoutLabel name="List gap={3}" color="List" style={{ width: 250 }}>
      <List gap={3}>
        <li>
          <Placeholder label="Item A" color="#cc88ff" />
        </li>
        <li>
          <Placeholder label="Item B" color="#cc88ff" />
        </li>
        <li>
          <Placeholder label="Item C" color="#cc88ff" />
        </li>
      </List>
    </LayoutLabel>
  )
};
