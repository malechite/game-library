export const BASE_FONT_SIZE = 16;

export enum Size {
  XXSmall = "xxsmall",
  XSmall = "xsmall",
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xlarge",
  XXLarge = "xxlarge"
}

// Values from Tailwind CSS
export const responsiveBreakpoints: {
  [key in Size]: number;
} = {
  [Size.XXSmall]: 0,
  [Size.XSmall]: 320,
  [Size.Small]: 640,
  [Size.Medium]: 768,
  [Size.Large]: 1024,
  [Size.XLarge]: 1280,
  [Size.XXLarge]: 1536
};

export type SizeMap = {
  [key in Size]: number;
};

export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface InlineListItem {
  label: string;
  icon?: string;
  img?: string;
}

export interface PositionAndDimensions extends Position, Dimensions {}

export enum Orientation {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

export enum Direction {
  Left = "left",
  Right = "right",
  Up = "up",
  Down = "down"
}

export enum Intent {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
  Warning = "warning",
  Success = "success",
  Info = "info"
}

export enum TextElement {
  A = "a",
  P = "p",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Span = "span"
}

interface GradientElement {
  color: string;
  opacity?: number;
  percent: number;
}

export type Gradient = GradientElement[];

export enum InteractiveRole {
  Default = "default",
  Info = "info",
  Brand = "brand",
  Success = "success",
  Warning = "warning",
  Danger = "danger"
}

export enum InteractiveState {
  Rest = "rest",
  Hover = "hover",
  Active = "active",
  Focus = "focus",
  Selected = "selected",
  Disabled = "disabled",
  Visited = "visited",
  Loading = "loading"
}

export enum AnimationState {
  Entering = "entering",
  Entered = "entered",
  Exiting = "exiting",
  Exited = "exited"
}

export enum TextSize {
  DynamicHeading1 = "DynamicHeading1",
  DynamicHeading2 = "DynamicHeading2",
  DynamicHeading3 = "DynamicHeading3",
  DynamicHeading4 = "DynamicHeading4",
  DynamicHeading5 = "DynamicHeading5",
  DynamicHeading6 = "DynamicHeading6",
  DynamicBody = "DynamicBody",
  StaticXXLarge = "StaticXXLarge",
  StaticXLarge = "StaticXLarge",
  StaticLarge = "StaticLarge",
  StaticMedium = "StaticMedium",
  StaticSmall = "StaticSmall",
  StaticXSmall = "StaticXSmall"
}

export enum InputVariant {
  Default = "default",
  Error = "error",
  Success = "success",
  Code = "code"
}

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Ghost = "ghost",
  Destructive = "destructive"
}

export enum LabelVariant {
  Default = "default",
  Required = "required",
  Optional = "optional",
  Error = "error"
}

export enum ResizeMode {
  None = "none",
  Vertical = "vertical",
  Horizontal = "horizontal",
  Both = "both"
}

export enum FontWeight {
  Normal = "normal",
  Medium = "medium",
  Semibold = "semibold",
  Bold = "bold"
}

export enum Font {
  // System fonts (always available)
  SystemUI = "system-ui",
  SansSerif = "sans-serif",
  Serif = "serif",
  Monospace = "monospace",

  // Web fonts (loaded by the app shell)
  Figtree = "Figtree",
  GeistMono = "Geist Mono",
  Montserrat = "Montserrat"
}

export enum Side {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left"
}
