import { Box, type BoxProps } from "./Box";

interface SpacerProps extends BoxProps {
  width?: number;
  height?: number;
}

/**
 * Spacer Component
 *
 * A utility component that leverages the `Box` component to create space within layouts.
 * It automatically expands to fill available space along both the horizontal and vertical axes,
 * making it useful for separating components or groups of components within a layout. All properties
 * of the `Box` component are supported, allowing for extensive customization of the spacer's appearance
 * and behavior.
 *
 * @component
 * @param {SpacerProps} props - Inherits all the properties of `BoxProps`. The `expand` property is preset
 * to true to ensure the spacer expands to fill available space, but can be overridden via props.
 * @param {number} [props.width] - The max width of the spacer in rem, specified as a number.
 * @param {number} [props.height] - The max height of the spacer in rem, specified as a number.
 *
 * @example
 * // Creates a spacer that fills available horizontal space
 * <Spacer />
 */
export const Spacer = ({ width, height, ...rest }: SpacerProps) => {
  return (
    <Box
      expand
      {...rest}
      style={{
        maxHeight: height ? `${height}rem` : undefined,
        maxWidth: width ? `${width}rem` : undefined,
        ...rest.style
      }}
    />
  );
};
