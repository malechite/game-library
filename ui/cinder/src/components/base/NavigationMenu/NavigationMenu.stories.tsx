import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "./NavigationMenu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Cinder/Navigation/NavigationMenu",
  decorators: [centerStory],
  component: NavigationMenu
};
export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div style={{ padding: 16, width: 400 }}>
              <h3 style={{ marginBottom: 8 }}>Introduction</h3>
              <p style={{ fontSize: 14, color: "#666" }}>Re-usable components built with Base UI and Vanilla Extract.</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                padding: 16,
                width: 400
              }}
            >
              <NavigationMenuLink href="#">Alert Dialog</NavigationMenuLink>
              <NavigationMenuLink href="#">Hover Card</NavigationMenuLink>
              <NavigationMenuLink href="#">Progress</NavigationMenuLink>
              <NavigationMenuLink href="#">Scroll Area</NavigationMenuLink>
              <NavigationMenuLink href="#">Tabs</NavigationMenuLink>
              <NavigationMenuLink href="#">Tooltip</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
};
