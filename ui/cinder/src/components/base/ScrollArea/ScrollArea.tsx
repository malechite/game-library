"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { cn } from "../../../lib/utils";
import { scrollAreaRoot, scrollAreaViewport, scrollBarStyle, scrollThumbStyle } from "./ScrollArea.css";

const ScrollArea = ({ className, children, ...props }: ScrollAreaPrimitive.Root.Props) => (
  <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn(scrollAreaRoot, className)} {...props}>
    <ScrollAreaPrimitive.Viewport data-slot="scroll-area-viewport" className={scrollAreaViewport}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

const ScrollBar = ({ className, orientation = "vertical", ...props }: ScrollAreaPrimitive.Scrollbar.Props) => (
  <ScrollAreaPrimitive.Scrollbar
    data-slot="scroll-area-scrollbar"
    data-orientation={orientation}
    orientation={orientation}
    className={cn(scrollBarStyle, className)}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" className={scrollThumbStyle} />
  </ScrollAreaPrimitive.Scrollbar>
);

export { ScrollArea, ScrollBar };
