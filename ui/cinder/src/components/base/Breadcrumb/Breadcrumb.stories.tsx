import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Cinder/Navigation/Breadcrumbs",
  decorators: [centerStory],
  component: Breadcrumbs
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Current Page" }]} />
  )
};

export const SingleCrumb: Story = {
  render: () => <Breadcrumbs crumbs={[{ label: "Dashboard" }]} />
};

export const ManyLevels: Story = {
  render: () => (
    <Breadcrumbs
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Category", href: "/category" },
        { label: "Sub-Category", href: "/category/sub" },
        { label: "Product", href: "/category/sub/product" },
        { label: "Details" }
      ]}
    />
  )
};

export const WithoutLinks: Story = {
  render: () => <Breadcrumbs crumbs={[{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]} />
};
