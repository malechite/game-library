"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "../../../lib/utils";
import { tooltipPositioner, tooltipContent, tooltipArrow } from "./Tooltip.css";

const TooltipProvider = ({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) => (
  <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />
);

const Tooltip = ({ ...props }: TooltipPrimitive.Root.Props) => <TooltipPrimitive.Root data-slot="tooltip" {...props} />;

const TooltipTrigger = ({ ...props }: TooltipPrimitive.Trigger.Props) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

const TooltipContent = ({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props & Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={tooltipPositioner}
    >
      <TooltipPrimitive.Popup data-slot="tooltip-content" className={cn(tooltipContent, className)} {...props}>
        {children}
        <TooltipPrimitive.Arrow className={tooltipArrow} />
      </TooltipPrimitive.Popup>
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
