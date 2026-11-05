import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { Orientation } from "@game-library/types";
import type { Size } from "@game-library/types";
import { sprinkles, type Sprinkles } from "../../themes";
import { isSet, parseGap, parsePadding, parseMargin, parsePosition, parseBorder, parseRounded } from "../../util/parse";
import { animateSpin, noScrollbar, expandFull, widthFull } from "../../styles/utilities.css";

export interface BoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  orientation?: Orientation;
  center?: boolean;
  justifyCenter?: boolean;
  justifyLeft?: boolean;
  wrap?: boolean;
  expand?: boolean;
  full?: boolean;
  gap?: boolean | number;
  padding?: boolean | number;
  paddingX?: boolean | number;
  paddingY?: boolean | number;
  paddingTop?: boolean | number;
  paddingRight?: boolean | number;
  paddingBottom?: boolean | number;
  paddingLeft?: boolean | number;
  border?: boolean | number;
  rounded?: boolean | Size;
  margin?: boolean | number;
  marginTop?: boolean | number;
  marginRight?: boolean | number;
  marginBottom?: boolean | number;
  marginLeft?: boolean | number;
  absolute?: boolean;
  top?: boolean | number;
  right?: boolean | number;
  bottom?: boolean | number;
  left?: boolean | number;
  stay?: boolean;
  fixed?: boolean;
  overflow?: boolean;
  grid?: boolean;
  block?: boolean;
  noscrollbar?: boolean;
  scroll?: boolean;
  layer1?: boolean;
  layer2?: boolean;
  layer5?: boolean;
  invisible?: boolean;
  passThrough?: boolean;
  spin?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const {
    className,
    style,
    orientation,
    center,
    justifyCenter,
    justifyLeft,
    gap,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    border,
    rounded,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    wrap,
    expand,
    full,
    absolute,
    top,
    right,
    bottom,
    left,
    stay,
    fixed,
    overflow,
    grid,
    block,
    noscrollbar,
    scroll,
    layer1,
    layer2,
    layer5,
    invisible,
    passThrough,
    spin: spinProp,
    onClick,
    ...rest
  } = props;

  const horizontal = orientation === Orientation.Horizontal;
  const vertical = orientation === Orientation.Vertical;
  const absolutePosition = absolute || fixed;

  const sprinklesClass = sprinkles({
    display: grid ? "grid" : block ? "block" : "flex",
    flexDirection: grid || block ? undefined : horizontal ? "row" : "column",
    justifyContent: (center && (vertical || !orientation)) || justifyCenter ? "center" : justifyLeft ? "flex-start" : undefined,
    alignItems: center ? "center" : undefined,
    flexWrap: wrap ? "wrap" : undefined,
    flexShrink: stay ? 0 : undefined,
    position: absolute ? "absolute" : fixed ? "fixed" : "relative",
    overflow: scroll ? "auto" : !overflow && !scroll ? "hidden" : undefined,
    opacity: invisible ? 0 : 100,
    cursor: onClick ? "pointer" : undefined,
    pointerEvents: passThrough ? "none" : undefined,
    textAlign: center && vertical && !justifyLeft ? "center" : undefined,
    zIndex: layer5 ? 50 : layer2 ? 20 : layer1 ? 10 : undefined,

    // Spacing
    ...(gap ? { gap: parseGap(gap) as keyof Sprinkles["gap"] } : {}),
    ...(padding ? { padding: parsePadding(padding) as keyof Sprinkles["padding"] } : {}),
    ...(isSet(paddingX) ? { paddingX: parsePadding(paddingX) as keyof Sprinkles["paddingX"] } : {}),
    ...(isSet(paddingY) ? { paddingY: parsePadding(paddingY) as keyof Sprinkles["paddingY"] } : {}),
    ...(isSet(paddingTop) ? { paddingTop: parsePadding(paddingTop) as keyof Sprinkles["paddingTop"] } : {}),
    ...(isSet(paddingRight) ? { paddingRight: parsePadding(paddingRight) as keyof Sprinkles["paddingRight"] } : {}),
    ...(isSet(paddingBottom) ? { paddingBottom: parsePadding(paddingBottom) as keyof Sprinkles["paddingBottom"] } : {}),
    ...(isSet(paddingLeft) ? { paddingLeft: parsePadding(paddingLeft) as keyof Sprinkles["paddingLeft"] } : {}),
    ...(margin ? { margin: parseMargin(margin) as keyof Sprinkles["margin"] } : {}),
    ...(isSet(marginTop) ? { marginTop: parseMargin(marginTop) as keyof Sprinkles["marginTop"] } : {}),
    ...(isSet(marginRight) ? { marginRight: parseMargin(marginRight) as keyof Sprinkles["marginRight"] } : {}),
    ...(isSet(marginBottom) ? { marginBottom: parseMargin(marginBottom) as keyof Sprinkles["marginBottom"] } : {}),
    ...(isSet(marginLeft) ? { marginLeft: parseMargin(marginLeft) as keyof Sprinkles["marginLeft"] } : {}),
    ...(border ? { borderWidth: parseBorder(border) as keyof Sprinkles["borderWidth"] } : {}),
    ...(rounded ? { borderRadius: parseRounded(rounded) as keyof Sprinkles["borderRadius"] } : {}),

    // Positioning
    ...(absolutePosition && isSet(top) ? { top: parsePosition(top) as keyof Sprinkles["top"] } : {}),
    ...(absolutePosition && isSet(right) ? { right: parsePosition(right) as keyof Sprinkles["right"] } : {}),
    ...(absolutePosition && isSet(bottom) ? { bottom: parsePosition(bottom) as keyof Sprinkles["bottom"] } : {}),
    ...(absolutePosition && isSet(left) ? { left: parsePosition(left) as keyof Sprinkles["left"] } : {})
  } as Sprinkles);

  return (
    <div
      {...{
        ...rest,
        className: clsx(
          sprinklesClass,
          expand && expandFull,
          full && widthFull,
          spinProp && animateSpin,
          noscrollbar && noScrollbar,
          className
        ),
        style,
        ref,
        onClick
      }}
    />
  );
});

Box.displayName = "Box";
