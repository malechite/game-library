import { useMediaQuery } from "@game-library/armature";

/**
 * True when the viewport is at most `maxWidth` px wide. Companion to cinder's
 * `useIsMobile` for intermediate (e.g. tablet) breakpoints.
 */
export const useMaxWidth = (maxWidth: number): boolean => useMediaQuery(`(max-width: ${maxWidth}px)`);
