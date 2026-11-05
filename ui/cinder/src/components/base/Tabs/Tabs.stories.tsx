import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Cinder/Layout/Tabs",
  decorators: [centerStory],
  component: Tabs
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs
      tabs={[
        { value: "account", label: "Account", content: <p>Make changes to your account here.</p> },
        { value: "password", label: "Password", content: <p>Change your password here.</p> },
        { value: "settings", label: "Settings", content: <p>Adjust your settings here.</p> }
      ]}
      defaultValue="account"
    />
  )
};

export const WithIcons: Story = {
  render: () => (
    <Tabs
      tabs={[
        { value: "overview", label: "Overview", icon: "ChartBar", content: <p>Overview dashboard content.</p> },
        { value: "analytics", label: "Analytics", icon: "ChartLine", content: <p>Analytics data and charts.</p> },
        { value: "settings", label: "Settings", icon: "Gear", content: <p>Configuration settings.</p> }
      ]}
    />
  )
};

export const LineVariant: Story = {
  render: () => (
    <Tabs
      variant="line"
      tabs={[
        { value: "tab1", label: "First Tab", content: <p>Content for the first tab.</p> },
        { value: "tab2", label: "Second Tab", content: <p>Content for the second tab.</p> },
        { value: "tab3", label: "Third Tab", content: <p>Content for the third tab.</p> }
      ]}
    />
  )
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs
      tabs={[
        { value: "active", label: "Active", content: <p>This tab is active.</p> },
        { value: "disabled", label: "Disabled", content: <p>This tab is disabled.</p>, disabled: true },
        { value: "another", label: "Another", content: <p>Another active tab.</p> }
      ]}
    />
  )
};
