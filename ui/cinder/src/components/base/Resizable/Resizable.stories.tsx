import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./Resizable";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Cinder/Layout/Resizable",
  decorators: [centerStory],
  component: ResizablePanelGroup
};
export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ minHeight: 200, maxWidth: 600, border: "1px solid #e5e5e5", borderRadius: 8 }}
    >
      <ResizablePanel defaultSize={50}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Panel One</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Panel Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
};

export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ minHeight: 200, maxWidth: 600, border: "1px solid #e5e5e5", borderRadius: 8 }}
    >
      <ResizablePanel defaultSize={30}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      style={{ minHeight: 400, maxWidth: 600, border: "1px solid #e5e5e5", borderRadius: 8 }}
    >
      <ResizablePanel defaultSize={30}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Header</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
};

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ minHeight: 200, maxWidth: 600, border: "1px solid #e5e5e5", borderRadius: 8 }}
    >
      <ResizablePanel defaultSize={25}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Left</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Center</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>Right</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
};
