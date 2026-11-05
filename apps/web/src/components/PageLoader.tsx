import { VStack, Caption, Spinner } from "@game-library/armature";
import { vars } from "@game-library/cinder/theme";
import { HEADER_HEIGHT } from "../lib/ui";

interface PageLoaderProps {
  label?: string;
}

/** Full-height centered loading state (fills the area below the app header). */
export const PageLoader = ({ label = "Loading…" }: PageLoaderProps) => (
  <VStack center gap={3} style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }} role="status">
    <Spinner size={36} />
    <Caption style={{ color: vars.color.mutedForeground }}>{label}</Caption>
  </VStack>
);
