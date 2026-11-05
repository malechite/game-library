import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "./Card";
import { Button } from "../Button/Button";

const meta: Meta<typeof Card> = {
  title: "Cinder/Layout/Card",
  decorators: [centerStory],
  component: Card
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: "350px" }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some details about the item.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
};

export const WithAction: Story = {
  render: () => (
    <Card style={{ maxWidth: "350px" }}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Notification list would go here.</p>
      </CardContent>
    </Card>
  )
};

export const Small: Story = {
  render: () => (
    <Card size="sm" style={{ maxWidth: "300px" }}>
      <CardHeader>
        <CardTitle>Compact Card</CardTitle>
        <CardDescription>A smaller card variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Compact content.</p>
      </CardContent>
    </Card>
  )
};
