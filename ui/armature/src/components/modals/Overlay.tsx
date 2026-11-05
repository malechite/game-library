import React from "react";
import { Box, type BoxProps } from "../core/Box";
import { Orientation } from "@game-library/types";

export interface OverlayProps extends BoxProps {
  /** Custom background color with opacity (defaults to rgba(0, 0, 0, 0.5)) */
  overlayColor?: string;
}

/** @deprecated Use Overlay instead */
export type ModalOverlayProps = OverlayProps;

/**
 * Overlay
 *
 * A full-screen overlay component that covers the viewport with a semi-transparent background.
 * Useful as a backdrop for modals, dialogs, drawers, and other floating content.
 *
 * @example
 * <Overlay>
 *   <MyContent />
 * </Overlay>
 *
 * @example
 * <Overlay overlayColor="rgba(0, 0, 100, 0.7)">
 *   <MyContent />
 * </Overlay>
 */
export const Overlay = ({ overlayColor = "rgba(0, 0, 0, 0.5)", style, children, ...rest }: OverlayProps) => {
  const overlayStyle: React.CSSProperties = {
    backgroundColor: overlayColor,
    ...style
  };

  return (
    <Box expand fixed layer5 top left center orientation={Orientation.Vertical} style={overlayStyle} {...rest}>
      {children}
    </Box>
  );
};

/** @deprecated Use Overlay instead */
export const ModalOverlay = Overlay;
