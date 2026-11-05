import type { CSSProperties, PropsWithChildren } from "react";

/**
 * Color scheme for layout component visualization in stories.
 * Each component type gets a distinct color for easy identification.
 */
const LABEL_COLORS = {
  Box: "#888888",
  HStack: "#4488ff",
  VStack: "#44cc88",
  Surface: "#aa66ff",
  Spacer: "#ff8844",
  Grid: "#44cccc",
  List: "#cc88ff",
  Divider: "#ff6688",
  Default: "#888888"
} as const;

type LabelColor = keyof typeof LABEL_COLORS;

interface LayoutLabelProps {
  /** Component name displayed as a floating label */
  name: string;
  /** Color key or a raw CSS color string */
  color?: LabelColor | string;
  /** Override the outline style (default: dashed) */
  outline?: "dashed" | "dotted" | "solid";
  /** Apply a background tint based on the color */
  tint?: boolean;
  /** Additional inline styles for the wrapper */
  style?: CSSProperties;
}

/**
 * LayoutLabel - Visualization wrapper for invisible structural components in Storybook stories.
 *
 * Renders a dashed outline and a floating label showing the component name,
 * making the invisible structure of Armature layout components visible.
 */
export const LayoutLabel = ({
  name,
  color,
  outline = "dashed",
  tint = false,
  style,
  children
}: PropsWithChildren<LayoutLabelProps>) => {
  const resolvedColor = color && color in LABEL_COLORS ? LABEL_COLORS[color as LabelColor] : (color ?? LABEL_COLORS.Default);

  const wrapperStyle: CSSProperties = {
    position: "relative",
    border: `1px ${outline} ${resolvedColor}`,
    borderRadius: 2,
    ...(tint ? { backgroundColor: `${resolvedColor}10` } : {}),
    ...style
  };

  const labelStyle: CSSProperties = {
    position: "absolute",
    top: -10,
    left: 4,
    fontSize: 10,
    lineHeight: "12px",
    fontFamily: "monospace",
    color: resolvedColor,
    backgroundColor: "#1a1a2e",
    padding: "1px 4px",
    borderRadius: 2,
    zIndex: 100,
    pointerEvents: "none",
    whiteSpace: "nowrap"
  };

  return (
    <div style={wrapperStyle}>
      <span style={labelStyle}>{name}</span>
      {children}
    </div>
  );
};

/**
 * SpacerViz - Visualization for the invisible Spacer component.
 *
 * Renders a hatched background pattern so the expanding space is visible.
 * Use this in stories wherever a Spacer is shown.
 */
export const SpacerViz = ({ style, children }: PropsWithChildren<{ style?: CSSProperties }>) => {
  const vizStyle: CSSProperties = {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",
    minHeight: 20,
    minWidth: 20,
    backgroundImage: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(255,136,68,0.15) 4px,
      rgba(255,136,68,0.15) 8px
    )`,
    border: "1px dashed #ff8844",
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style
  };

  const labelStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 10,
    fontFamily: "monospace",
    color: "#ff8844",
    backgroundColor: "#1a1a2e",
    padding: "1px 4px",
    borderRadius: 2,
    whiteSpace: "nowrap",
    pointerEvents: "none"
  };

  return (
    <div style={vizStyle}>
      <span style={labelStyle}>Spacer</span>
      {children}
    </div>
  );
};

/**
 * Placeholder - A simple colored box for demonstrating layout behavior.
 * Used as children in layout stories to make structure visible.
 */
export const Placeholder = ({
  label,
  color = "#4488ff",
  width,
  height,
  style
}: {
  label?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
}) => (
  <div
    style={{
      background: `${color}20`,
      border: `1px solid ${color}40`,
      padding: "8px 12px",
      borderRadius: 4,
      color: `${color}`,
      fontSize: 13,
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      width,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      ...style
    }}
  >
    {label}
  </div>
);
