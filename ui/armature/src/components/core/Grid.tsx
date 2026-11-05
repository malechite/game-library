import { forwardRef } from "react";
import { Box, type BoxProps } from "./Box";
import { sprinkles, type Sprinkles } from "../../themes";

interface GridProps extends BoxProps {
  cols?: number;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(({ cols = 1, className, ...rest }, ref) => (
  <Box
    grid
    className={`${sprinkles({ gridTemplateColumns: cols as Sprinkles["gridTemplateColumns"] })} ${className ?? ""}`}
    ref={ref}
    {...rest}
  />
));

Grid.displayName = "Grid";
