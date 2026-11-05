"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";

import { cn } from "../../../lib/utils";
import { toggleRecipe, type ToggleVariants } from "../Toggle/Toggle.css";
import { toggleGroup, toggleGroupItem } from "./ToggleGroup.css";

const ToggleGroupContext = React.createContext<
  ToggleVariants & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});

const ToggleGroup = ({
  className,
  variant,
  size,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  ToggleVariants & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }) => (
  <ToggleGroupPrimitive
    data-slot="toggle-group"
    data-variant={variant}
    data-size={size}
    data-spacing={spacing}
    data-orientation={orientation}
    style={{ gap: spacing ? `${spacing * 4}px` : undefined } as React.CSSProperties}
    className={cn(toggleGroup, className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive>
);

const ToggleGroupItem = ({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & ToggleVariants) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleGroupItem,
        toggleRecipe({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
};

export { ToggleGroup, ToggleGroupItem };
