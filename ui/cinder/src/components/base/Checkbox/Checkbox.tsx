"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { cn } from "../../../lib/utils";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { checkboxRoot, checkboxIndicator } from "./Checkbox.css";

const Checkbox = ({ className, indeterminate, ...props }: CheckboxPrimitive.Root.Props) => (
  <CheckboxPrimitive.Root data-slot="checkbox" indeterminate={indeterminate} className={cn(checkboxRoot, className)} {...props}>
    <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={checkboxIndicator}>
      {indeterminate ? <MinusIcon weight="bold" /> : <CheckIcon />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export { Checkbox };
