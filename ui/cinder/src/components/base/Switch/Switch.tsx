"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "../../../lib/utils";
import { switchRecipe, thumbDefault, thumbSizeDefault, thumbSizeSm } from "./Switch.css";

const Switch = ({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) => (
  <SwitchPrimitive.Root data-slot="switch" data-size={size} className={cn(switchRecipe({ size }), className)} {...props}>
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(thumbDefault, size === "sm" ? thumbSizeSm : thumbSizeDefault)}
    />
  </SwitchPrimitive.Root>
);

export { Switch };
