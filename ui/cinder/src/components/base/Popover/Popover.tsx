"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "../../../lib/utils";
import { popoverPositioner, popoverContent, popoverHeader, popoverTitle, popoverDescription } from "./Popover.css";

const Popover = ({ ...props }: PopoverPrimitive.Root.Props) => <PopoverPrimitive.Root data-slot="popover" {...props} />;

const PopoverTrigger = ({ ...props }: PopoverPrimitive.Trigger.Props) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);

const PopoverContent = ({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props & Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={popoverPositioner}
    >
      <PopoverPrimitive.Popup data-slot="popover-content" className={cn(popoverContent, className)} {...props} />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
);

const PopoverHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="popover-header" className={cn(popoverHeader, className)} {...props} />
);

const PopoverTitle = ({ className, ...props }: PopoverPrimitive.Title.Props) => (
  <PopoverPrimitive.Title data-slot="popover-title" className={cn(popoverTitle, className)} {...props} />
);

const PopoverDescription = ({ className, ...props }: PopoverPrimitive.Description.Props) => (
  <PopoverPrimitive.Description data-slot="popover-description" className={cn(popoverDescription, className)} {...props} />
);

export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger };
