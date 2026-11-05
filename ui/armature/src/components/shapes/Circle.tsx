import { Size, SizeMap } from "@game-library/types";
import { Box, BoxProps } from "../core/Box";
import { getSizeValueFromMap } from "../../util/style.util";

export interface CircleProps extends BoxProps {
  color?: string;
  size?: Size | number;
}

// Circle diameter in rem
const defaultCircleSizes: SizeMap = {
  [Size.XXSmall]: 0.5, // 8px
  [Size.XSmall]: 1, // 16px
  [Size.Small]: 1.5, // 24px
  [Size.Medium]: 2, // 32px
  [Size.Large]: 4, // 64px
  [Size.XLarge]: 6, // 96px
  [Size.XXLarge]: 8 // 128px
};

export const Circle = ({ color, size: circleSize, style, ...rest }: CircleProps) => {
  const size = getSizeValueFromMap(circleSize, defaultCircleSizes);
  return (
    <Box
      center
      stay
      style={{
        transition: "all 0.2s",
        borderRadius: "50%",
        backgroundColor: color,
        width: `${size}rem`,
        height: `${size}rem`,
        ...style
      }}
      {...rest}
    />
  );
};
