import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemHeader,
  ItemFooter
} from "./Item";
import { Button } from "../Button/Button";

const meta: Meta<typeof Item> = {
  title: "Cinder/Display/Item",
  decorators: [centerStory],
  component: Item,
  argTypes: {
    variant: {
      control: "select",
      options: ["default"]
    },
    size: {
      control: "select",
      options: ["default"]
    }
  }
};
export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <Item>
      <ItemContent>
        <ItemTitle>List Item</ItemTitle>
        <ItemDescription>This is a simple list item with a title and description.</ItemDescription>
      </ItemContent>
    </Item>
  )
};

export const WithMedia: Story = {
  render: () => (
    <Item>
      <ItemMedia>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: "#e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 600
          }}
        >
          A
        </div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Item with Media</ItemTitle>
        <ItemDescription>An avatar or icon on the left side.</ItemDescription>
      </ItemContent>
    </Item>
  )
};

export const WithActions: Story = {
  render: () => (
    <Item>
      <ItemContent>
        <ItemTitle>Actionable Item</ItemTitle>
        <ItemDescription>This item has actions on the right.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </ItemActions>
    </Item>
  )
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Item>
      <ItemContent>
        <ItemHeader>
          <ItemTitle>Card-style Item</ItemTitle>
        </ItemHeader>
        <ItemDescription>This item uses header and footer sections for more complex layouts.</ItemDescription>
        <ItemFooter>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </ItemFooter>
      </ItemContent>
    </Item>
  )
};

export const GroupedItems: Story = {
  render: () => (
    <ItemGroup>
      <Item>
        <ItemMedia>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600
            }}
          >
            1
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>First Item</ItemTitle>
          <ItemDescription>Description for the first item.</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600
            }}
          >
            2
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Second Item</ItemTitle>
          <ItemDescription>Description for the second item.</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600
            }}
          >
            3
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Third Item</ItemTitle>
          <ItemDescription>Description for the third item.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
};
