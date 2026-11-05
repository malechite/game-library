import { Orientation, Size } from "@game-library/types";
import { Box, type BoxProps } from "./Box";

export const Surface = ({ style, ...rest }: BoxProps) => {
  return (
    <Box
      {...{
        orientation: Orientation.Vertical,
        rounded: Size.Small,
        padding: 4,
        gap: 4,
        style,
        ...rest
      }}
    />
  );
};
