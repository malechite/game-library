import type { StoryObj } from "@storybook/react-vite";
import { TextElement } from "@game-library/types";
import {
  Text,
  PageTitle as PageTitleComponent,
  Heading as HeadingComponent,
  SubHeading as SubHeadingComponent,
  SubTitle as SubTitleComponent,
  Title as TitleComponent,
  Span as SpanComponent,
  P
} from "./Text";
import { centerStory } from "@storybook-decorators";

export default {
  title: "Armature/Typography/Text",
  component: Text,
  decorators: [centerStory],
  argTypes: {
    elementType: {
      control: "select",
      options: Object.values(TextElement)
    },
    className: {
      control: "text"
    }
  }
};

type Story = StoryObj<typeof Text>;

export const DefaultTextComponent: Story = {
  args: {
    children: "Without specifying anything, the default <Text> component is rendered as a <span>"
  }
};

export const PageTitle: Story = {
  args: {
    children: "Page titles should be the only <h1> element on a page"
  },
  render: (args) => <PageTitleComponent {...args} />
};

export const Heading: Story = {
  args: {
    children: "Heading is rendered as an <h2> element by default"
  },
  render: (args) => <HeadingComponent {...args} />
};

export const SubHeading: Story = {
  args: {
    children: "SubHeading is rendered as an <h3> element by default"
  },
  render: (args) => <SubHeadingComponent {...args} />
};

export const Title: Story = {
  args: {
    children: "Title is rendered as an <h4> element by default"
  },
  render: (args) => <TitleComponent {...args} />
};

export const SubTitle: Story = {
  args: {
    children: "SubTitle is rendered as an <h5> element by default"
  },
  render: (args) => <SubTitleComponent {...args} />
};

export const Paragraph: Story = {
  args: {
    children: "This is a standard paragraph using a <p> element by default"
  },
  render: (args) => <P {...args} />
};

export const Span: Story = {
  args: {
    children: "This is a span"
  },
  render: (args) => <SpanComponent {...args} />
};
