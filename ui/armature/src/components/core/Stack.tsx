import { forwardRef } from "react";
import { Orientation } from "@game-library/types";
import { Box, type BoxProps } from "./Box";

interface StackProps extends BoxProps {}

/**
 * Horizontal Stack (HStack) Component
 *
 * This component is a specialized version of the `Box` component that arranges its children
 * horizontally. It inherits all properties from `Box`, allowing you to apply layout, spacing,
 * padding, and other flexbox behaviors in a horizontal orientation by default.
 *
 * @component
 * @param {StackProps} props - Inherits all the properties of `BoxProps` with the orientation preset to horizontal.
 *
 * @example
 * <HStack gap={2} padding={4} expand>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </HStack>
 */

export const HStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => (
  <Box ref={ref} {...props} orientation={Orientation.Horizontal} />
));

HStack.displayName = "HStack";

/**
 * Vertical Stack (VStack) Component
 *
 * Similar to `HStack`, this component is a specialized version of the `Box` component designed
 * for vertical stacking of its children. It supports all `Box` properties, enabling the application
 * of layout, spacing, padding, and other flexbox behaviors in a vertical orientation.
 *
 * @component
 * @param {StackProps} props - Inherits all the properties of `BoxProps` with the orientation preset to vertical.
 *
 * @example
 * <VStack gap={2} padding={4} expand>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </VStack>
 */

export const VStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => (
  <Box ref={ref} {...props} orientation={Orientation.Vertical} />
));

VStack.displayName = "VStack";
