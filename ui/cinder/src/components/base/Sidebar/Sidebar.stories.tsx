import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Cinder/Layout/Sidebar",
  decorators: [centerStory],
  component: Sidebar
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const menuItems = [
  { title: "Dashboard", url: "#" },
  { title: "Projects", url: "#" },
  { title: "Tasks", url: "#" },
  { title: "Settings", url: "#" },
  { title: "Help", url: "#" }
];

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div style={{ padding: "0 8px", fontWeight: 600 }}>My App</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map(({ title, url }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton render={<a href={url} />}>{title}</SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div style={{ padding: "0 8px", fontSize: 12, color: "#999" }}>v1.0.0</div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 16,
            borderBottom: "1px solid #e5e5e5"
          }}
        >
          <SidebarTrigger />
          <span>Page Content</span>
        </header>
        <div style={{ padding: 16 }}>
          <p>Main content area. Use the trigger to toggle the sidebar.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
};
