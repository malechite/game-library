import type { StoryContext } from "@storybook/react";
import { Box } from "@game-library/armature";

/**
 * Center Story Decorator for Storybook
 *
 * Wraps a Storybook story component within a `Box` component configured to center its content both
 * vertically and horizontally, and expand to fill the viewport height.
 */
export const centerStory = (Story: React.FC, context: StoryContext) => (
  <Box center expand style={{ height: "100vh", color: "#ffffff" }}>
    <Story {...context.args} />
  </Box>
);
