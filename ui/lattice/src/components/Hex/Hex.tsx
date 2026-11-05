"use client";

import { useRef, useEffect, type FC } from "react";
import type { HexProps } from "../../types";
import { hexCell, hexContent } from "./Hex.css";

export const Hex: FC<HexProps> = ({ coord, x, y, width, height, path, fill, opacity, onRegister, children }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const registered = useRef(false);

  useEffect(() => {
    const el = divRef.current;
    if (!el || registered.current) return;
    const svgPath = el.querySelector("path");
    if (svgPath && onRegister) {
      registered.current = true;
      onRegister(coord, el, svgPath as SVGPathElement);
    }
    return () => {
      registered.current = false;
    };
  });

  return (
    <div
      ref={divRef}
      className={hexCell}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        opacity
      }}
    >
      <svg
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} fill={fill} />
      </svg>
      {children && <div className={hexContent}>{children}</div>}
    </div>
  );
};
