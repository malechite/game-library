"use client";

import { useRef } from "react";
import { type Gemstone, gradients, primaryGemstone } from "@game-library/tokens";
import { cn } from "../../../lib/utils";
import { useLightBarAnimation } from "../../../hooks/useLightBarAnimation";
import { lightBarBase } from "./LightBar.css";

export interface LightBarProps {
  gradient?: Gemstone;
  animate?: boolean;
  height?: number;
  className?: string;
}

export const LightBar = ({ gradient = primaryGemstone, animate = false, height = 2, className }: LightBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useLightBarAnimation(ref, gradients[gradient], animate);

  return <div ref={ref} data-slot="light-bar" className={cn(lightBarBase, className)} style={{ height }} />;
};
