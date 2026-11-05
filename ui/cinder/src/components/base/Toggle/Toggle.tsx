"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";

import { cn } from "../../../lib/utils";
import { toggleRecipe, type ToggleVariants } from "./Toggle.css";

const Toggle = ({ className, variant = "default", size = "default", ...props }: TogglePrimitive.Props & ToggleVariants) => (
  <TogglePrimitive data-slot="toggle" data-size={size} className={cn(toggleRecipe({ variant, size }), className)} {...props} />
);

const toggleVariants = toggleRecipe;

export { Toggle, toggleRecipe, toggleVariants };
export type { ToggleVariants };
