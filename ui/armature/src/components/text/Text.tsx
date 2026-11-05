import { createElement } from "react";
import { clsx } from "clsx";
import { TextElement, TextSize, type Font } from "@game-library/types";
import { sprinkles, type Sprinkles } from "../../themes";
import { truncateText, lineClampBase, widthFull } from "../../styles/utilities.css";
import { textSizeStyles } from "./text.css";

export interface TextProps {
  children: React.ReactNode;
  full?: boolean;
  block?: boolean;
  elementType?: TextElement;
  style?: React.CSSProperties;
  className?: string;
  font?: Font | string;
  color?: string;
  size?: TextSize;
  bold?: boolean;
  underline?: boolean;
  truncate?: boolean;
  nowrap?: boolean;
  capitalize?: boolean;
  uppercase?: boolean;
  maxLines?: number;
  stay?: boolean;
  center?: boolean;
  right?: boolean;
  href?: string;
  fontSize?: Sprinkles["fontSize"];
  fontWeight?: Sprinkles["fontWeight"];
  lineHeight?: Sprinkles["lineHeight"];
}

export const Text = ({
  children,
  className = "",
  font,
  style,
  block,
  full,
  elementType = TextElement.Span,
  color,
  size = TextSize.StaticMedium,
  bold,
  underline,
  truncate: truncateProp,
  nowrap,
  capitalize,
  uppercase,
  maxLines,
  stay,
  center,
  right,
  href,
  fontSize: themeFontSize,
  fontWeight: themeFontWeight,
  lineHeight: themeLineHeight
}: TextProps): React.ReactElement => {
  const sprinklesClass = sprinkles({
    ...(themeFontSize ? { fontSize: themeFontSize } : {}),
    ...(themeFontWeight ? { fontWeight: themeFontWeight } : bold ? { fontWeight: "bold" } : {}),
    ...(themeLineHeight ? { lineHeight: themeLineHeight } : {}),
    ...(truncateProp ? { textDecoration: undefined } : underline ? { textDecoration: "underline" } : {}),
    ...(capitalize ? { textTransform: "capitalize" } : uppercase ? { textTransform: "uppercase" } : {}),
    ...(stay ? { flexShrink: 0 } : {}),
    textAlign: center ? "center" : right ? "right" : "left",
    ...(nowrap ? { whiteSpace: "nowrap" } : {}),
    ...(block ? { display: "block" } : {})
  } as Sprinkles);

  const props = {
    className: clsx(
      sprinklesClass,
      !themeFontSize && textSizeStyles[size],
      truncateProp && truncateText,
      maxLines && lineClampBase,
      (full || truncateProp) && widthFull,
      className
    ),
    href,
    style: {
      color: typeof color === "string" && (color.startsWith("#") || color.startsWith("rgb")) ? color : undefined,
      fontFamily: font,
      ...style,
      ...(maxLines ? { WebkitLineClamp: maxLines } : {})
    }
  };

  return createElement(href ? TextElement.A : elementType, props, children);
};

const create = (displayName: string, elementType: TextElement, defaults?: Partial<TextProps>) => {
  const Component = (props: TextProps) => <Text elementType={elementType} {...{ ...defaults, ...props }} />;
  Component.displayName = displayName;
  return Component;
};

export const PageTitle = create("PageTitle", TextElement.H1, { size: TextSize.DynamicHeading1 });
export const Heading = create("Heading", TextElement.H2, { size: TextSize.DynamicHeading2 });
export const SubHeading = create("SubHeading", TextElement.H3, { size: TextSize.DynamicHeading3 });
export const Caption = create("Caption", TextElement.Span, { size: TextSize.StaticSmall });
export const Title = create("Title", TextElement.H4, { size: TextSize.DynamicHeading4 });
export const SubTitle = create("SubTitle", TextElement.H5, { size: TextSize.StaticMedium, bold: true });
export const Span = create("Span", TextElement.Span, { size: TextSize.StaticMedium });
export const P = create("P", TextElement.P, { size: TextSize.StaticMedium });
export const Link = create("Link", TextElement.Span, { size: TextSize.StaticMedium });
