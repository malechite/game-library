import type { StoryObj, Meta } from "@storybook/react-vite";
import { Box } from "./Box";
import { HStack, VStack } from "./Stack";
import { Surface } from "./Surface";
import { Spacer } from "./Spacer";
import { Grid } from "./Grid";
import { Divider } from "./Divider";
import { List } from "./List";
import { Orientation } from "@game-library/types";
import { centerStory, LayoutLabel, SpacerViz, Placeholder } from "@storybook-decorators";

const meta: Meta = {
  title: "Armature/Patterns/Composition",
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj;

export const ModalLayout: Story = {
  name: "Modal Layout",
  render: () => (
    <LayoutLabel name="VStack (modal)" color="VStack" style={{ width: 480 }}>
      <VStack
        padding={6}
        gap={4}
        style={{ backgroundColor: "#1a1a2e", borderRadius: 8, border: "1px solid #333", color: "white" }}
      >
        {/* Header */}
        <LayoutLabel name="HStack (header)" color="HStack">
          <HStack center>
            <span style={{ fontSize: 16, fontWeight: "bold" }}>Confirm Action</span>
            <SpacerViz />
            <Placeholder label="X" color="#ff6688" />
          </HStack>
        </LayoutLabel>

        <Divider color="#333" />

        {/* Body */}
        <LayoutLabel name="VStack (body)" color="VStack">
          <VStack gap={3}>
            <span style={{ fontSize: 13, color: "#ccc" }}>Are you sure you want to proceed? This action cannot be undone.</span>
            <span style={{ fontSize: 12, color: "#888" }}>All associated data will be permanently removed.</span>
          </VStack>
        </LayoutLabel>

        <Divider color="#333" />

        {/* Footer */}
        <LayoutLabel name="HStack (footer)" color="HStack">
          <HStack gap={2}>
            <SpacerViz />
            <Placeholder label="Cancel" color="#888" />
            <Placeholder label="Confirm" color="#ff6688" />
          </HStack>
        </LayoutLabel>
      </VStack>
    </LayoutLabel>
  )
};

export const SidebarLayout: Story = {
  name: "Sidebar Layout",
  render: () => (
    <LayoutLabel name="HStack (page)" color="HStack" style={{ width: 700, height: 450 }}>
      <HStack expand>
        {/* Sidebar */}
        <LayoutLabel name="VStack (sidebar)" color="VStack" style={{ height: "100%" }}>
          <VStack
            padding={4}
            gap={2}
            stay
            style={{ width: 200, height: "100%", backgroundColor: "#12121e", borderRight: "1px solid #333", color: "white" }}
          >
            <span style={{ fontWeight: "bold", fontSize: 14, marginBottom: 8 }}>App Name</span>
            <Divider color="#333" />
            <LayoutLabel name="List (nav)" color="List">
              <List gap={1}>
                <li>
                  <Placeholder label="Dashboard" color="#4488ff" />
                </li>
                <li>
                  <Placeholder label="Projects" color="#4488ff" />
                </li>
                <li>
                  <Placeholder label="Analytics" color="#4488ff" />
                </li>
                <li>
                  <Placeholder label="Settings" color="#4488ff" />
                </li>
              </List>
            </LayoutLabel>
            <SpacerViz />
            <Placeholder label="v1.0.0" color="#555" />
          </VStack>
        </LayoutLabel>

        {/* Main content */}
        <LayoutLabel name="VStack (main)" color="#44cc88" style={{ height: "100%", flex: 1 }}>
          <VStack expand padding={6} gap={4} scroll style={{ backgroundColor: "#0d0d1a", color: "white" }}>
            <LayoutLabel name="HStack (page header)" color="HStack">
              <HStack center>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>Dashboard</span>
                <SpacerViz />
                <Placeholder label="+ New" color="#44cc88" />
              </HStack>
            </LayoutLabel>
            <Divider color="#333" />
            <Placeholder label="Page content area" color="#444" style={{ height: 200 }} />
          </VStack>
        </LayoutLabel>
      </HStack>
    </LayoutLabel>
  )
};

export const CardGrid: Story = {
  name: "Card Grid",
  render: () => (
    <LayoutLabel name="VStack (page)" color="VStack" style={{ width: 600 }}>
      <VStack gap={4} padding={4} style={{ color: "white" }}>
        <LayoutLabel name="HStack (header)" color="HStack">
          <HStack center>
            <span style={{ fontSize: 16, fontWeight: "bold" }}>Projects</span>
            <SpacerViz />
            <Placeholder label="Filter" color="#888" />
          </HStack>
        </LayoutLabel>

        <LayoutLabel name="Grid cols={3}" color="#44cccc">
          <Grid cols={3} gap={4}>
            {Array.from({ length: 6 }, (_, i) => (
              <LayoutLabel key={i} name="Surface" color="Surface">
                <Surface style={{ border: "1px solid #333", backgroundColor: "#1a1a2e" }}>
                  <span style={{ fontWeight: "bold", fontSize: 14 }}>Project {i + 1}</span>
                  <span style={{ fontSize: 12, color: "#888" }}>Description text</span>
                  <Divider color="#333" />
                  <LayoutLabel name="HStack" color="HStack">
                    <HStack center>
                      <span style={{ fontSize: 11, color: "#666" }}>Updated 2h ago</span>
                      <SpacerViz />
                      <span style={{ fontSize: 11, color: "#4488ff" }}>Open</span>
                    </HStack>
                  </LayoutLabel>
                </Surface>
              </LayoutLabel>
            ))}
          </Grid>
        </LayoutLabel>
      </VStack>
    </LayoutLabel>
  )
};

export const StatCards: Story = {
  name: "Stat Card Row",
  render: () => (
    <LayoutLabel name="Grid cols={4}" color="#44cccc" style={{ width: 600 }}>
      <Grid cols={4} gap={4}>
        {[
          { value: "1,234", label: "Users" },
          { value: "567", label: "Active" },
          { value: "89%", label: "Retention" },
          { value: "$12.3k", label: "Revenue" }
        ].map(({ value, label }) => (
          <LayoutLabel key={label} name="Surface" color="Surface">
            <Surface gap={2} expand style={{ border: "1px solid #333", backgroundColor: "#1a1a2e", color: "white" }}>
              <span style={{ fontSize: 22, fontWeight: "bold" }}>{value}</span>
              <SpacerViz />
              <span style={{ fontSize: 12, color: "#888" }}>{label}</span>
            </Surface>
          </LayoutLabel>
        ))}
      </Grid>
    </LayoutLabel>
  )
};

export const FormLayout: Story = {
  name: "Form Layout",
  render: () => {
    const Field = ({ label }: { label: string }) => (
      <LayoutLabel name="VStack (field)" color="VStack">
        <VStack gap={1}>
          <span style={{ fontSize: 12, fontWeight: "bold", color: "#ccc" }}>{label}</span>
          <div style={{ height: 36, backgroundColor: "#0d0d1a", border: "1px solid #444", borderRadius: 4, width: "100%" }} />
        </VStack>
      </LayoutLabel>
    );

    return (
      <LayoutLabel name="Surface (form)" color="Surface" style={{ width: 400 }}>
        <Surface padding={6} gap={4} style={{ border: "1px solid #333", backgroundColor: "#1a1a2e", color: "white" }}>
          <span style={{ fontSize: 16, fontWeight: "bold" }}>Create Account</span>

          <Field label="Full Name" />
          <Field label="Email Address" />
          <Field label="Password" />

          <Divider color="#333" />

          <LayoutLabel name="HStack (actions)" color="HStack">
            <HStack gap={2}>
              <SpacerViz />
              <Placeholder label="Cancel" color="#888" />
              <Placeholder label="Create" color="#4488ff" />
            </HStack>
          </LayoutLabel>
        </Surface>
      </LayoutLabel>
    );
  }
};
