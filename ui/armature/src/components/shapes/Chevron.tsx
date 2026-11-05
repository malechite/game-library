import React from "react";
import { clsx } from "clsx";

export interface ChevronProps extends React.SVGAttributes<SVGSVGElement> {
  /** Size of the chevron container in pixels */
  size?: number;
  /** Rotation angle in degrees (0 = right, -90 = up, 90 = down, 180 = left) */
  rotation?: number;
  /** Fill color */
  fill?: string;
}

/**
 * Chevron component - a directional arrow indicator
 * Default points to the right, rotate to change direction
 */
export const Chevron = React.forwardRef<SVGSVGElement, ChevronProps>(
  ({ size = 12, rotation = 0, fill = "#7E8189", className, style, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: "inline-flex",
      width: `${size}px`,
      height: `${size}px`,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
      transition: "transform 0.2s ease",
      ...style
    };

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="10"
        viewBox="0 0 5 10"
        fill="none"
        className={clsx(className)}
        style={containerStyle}
        {...props}
      >
        <path d="M6 5L0 10V0L6 5Z" fill={fill} />
      </svg>
    );
  }
);

Chevron.displayName = "Chevron";
