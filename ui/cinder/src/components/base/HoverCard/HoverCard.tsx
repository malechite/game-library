"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { cn } from "../../../lib/utils";
import { hoverCardPositioner, hoverCardContent } from "./HoverCard.css";

const HoverCard = ({ ...props }: PreviewCardPrimitive.Root.Props) => (
  <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
);

const HoverCardTrigger = ({ ...props }: PreviewCardPrimitive.Trigger.Props) => (
  <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
);

const HoverCardContent = ({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) => (
  <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
    <PreviewCardPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={hoverCardPositioner}
    >
      <PreviewCardPrimitive.Popup data-slot="hover-card-content" className={cn(hoverCardContent, className)} {...props} />
    </PreviewCardPrimitive.Positioner>
  </PreviewCardPrimitive.Portal>
);

export { HoverCard, HoverCardTrigger, HoverCardContent };
