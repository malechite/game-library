import { Box } from "../core/Box";
import { Circle } from "../shapes/Circle";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner = ({ size, color = "currentColor" }: SpinnerProps) => {
  const width = size || 16;
  const height = width;

  return (
    <Box style={{ width, height }}>
      <Circle
        size={1}
        absolute
        spin
        style={{
          borderWidth: 2,
          borderStyle: "solid",
          borderTopColor: "transparent",
          borderRightColor: color,
          borderBottomColor: color,
          borderLeftColor: color
        }}
      />
    </Box>
  );
};
