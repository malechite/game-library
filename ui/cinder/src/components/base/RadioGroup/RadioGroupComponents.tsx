"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "../../../lib/utils";
import { radioGroupRoot, radioGroupItem, radioGroupIndicator, radioGroupCircle } from "./RadioGroup.css";

const RadioGroupRoot = ({ className, ...props }: RadioGroupPrimitive.Props) => (
  <RadioGroupPrimitive data-slot="radio-group" className={cn(radioGroupRoot, className)} {...props} />
);

const RadioGroupItem = ({ className, ...props }: RadioPrimitive.Root.Props) => (
  <RadioPrimitive.Root data-slot="radio-group-item" className={cn(radioGroupItem, className)} {...props}>
    <RadioPrimitive.Indicator data-slot="radio-group-indicator" className={radioGroupIndicator}>
      <span className={radioGroupCircle} />
    </RadioPrimitive.Indicator>
  </RadioPrimitive.Root>
);

export { RadioGroupRoot, RadioGroupItem };
