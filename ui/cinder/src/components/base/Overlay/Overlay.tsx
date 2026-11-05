"use client";

import { cn } from "../../../lib/utils";
import { overlayBase } from "./Overlay.css";

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Overlay = ({ className, ...props }: OverlayProps) => (
  <div data-slot="overlay" className={cn(overlayBase, className)} {...props} />
);
