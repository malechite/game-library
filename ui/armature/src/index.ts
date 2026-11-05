/**
 * @packageDocumentation
 * @module @game-library/armature
 * @preferred
 *
 * # Armature
 *
 * Armature is a compositional React layout library where components use
 * declarative boolean/number props instead of CSS class strings.
 *
 * ## Usage
 *
 * Import the components you need:
 * ```typescript
 * import { Box, HStack, VStack, Text } from '@game-library/armature';
 * ```
 *
 * Import the required CSS in your app's entry point:
 * ```typescript
 * import '@game-library/armature/styles.css';
 * ```
 */

// Core components
export * from "./components/core/Box";
export * from "./components/core/Divider";
export * from "./components/core/Grid";
export * from "./components/core/InlineList";
export * from "./components/core/List";
export * from "./components/core/Spacer";
export * from "./components/core/Stack";
export * from "./components/core/Surface";

// Layout components
export * from "./components/layout/FullScreenViewport";

// Images
export * from "./components/images/Img";

// Text
export * from "./components/text/Text";

// Loading
export * from "./components/loading/Spinner";

// Shapes
export * from "./components/shapes/Circle";
export * from "./components/shapes/Chevron";

// Modals
export * from "./components/modals/Overlay";
export * from "./providers/ModalProvider";

// Utilities
export * from "./util/style.util";

// Hooks
export * from "./hooks/useInteractiveState";
export * from "./hooks/useRefDimensions";
export * from "./hooks/useBodyScrollLock";
export * from "./hooks/useModal";
export * from "./hooks/useOnKeyDown";
export * from "./hooks/useHotKeys";
export * from "./hooks/useModifierKeys";
export * from "./hooks/useMediaQuery";
export * from "./hooks/useInView";

// Theme system
export * from "./themes";
