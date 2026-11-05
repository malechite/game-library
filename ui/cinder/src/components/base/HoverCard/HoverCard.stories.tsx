import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./HoverCard";

const meta: Meta<typeof HoverCard> = {
  title: "Cinder/Overlay/HoverCard",
  decorators: [centerStory],
  component: HoverCard
};
export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "4rem", display: "flex", justifyContent: "center" }}>
      <HoverCard>
        <HoverCardTrigger
          render={
            <a
              href="https://example.com"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "underline", cursor: "pointer" }}
            />
          }
        >
          @nextjs
        </HoverCardTrigger>
        <HoverCardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h4 style={{ margin: 0, fontWeight: 600 }}>Next.js</h4>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>The React Framework - created and maintained by @vercel.</p>
            <span style={{ fontSize: "0.75rem", color: "gray" }}>Joined December 2021</span>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
};
