import { PropsWithChildren } from "react";
import { Box, BoxProps } from "../core/Box";

interface FullScreenViewportProps extends BoxProps {
  style?: React.CSSProperties;
}

export const FullScreenViewport = ({ children, style, ...rest }: PropsWithChildren<FullScreenViewportProps>) => (
  <Box
    {...rest}
    style={{
      height: "100vh",
      width: "100vw",
      ...style
    }}
  >
    {children}
  </Box>
);
