"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import {
  inputGroupStyle,
  inputGroupAddonRecipe,
  inputGroupAddonBase,
  inputGroupButtonRecipe,
  inputGroupButtonBase,
  inputGroupTextStyle,
  inputGroupInputStyle,
  inputGroupTextareaStyle,
  type InputGroupAddonVariants,
  type InputGroupButtonVariants
} from "./InputGroup.css";

const InputGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="input-group" role="group" className={cn(inputGroupStyle, className)} {...props} />
);

const InputGroupAddon = ({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & InputGroupAddonVariants) => (
  <div
    role="group"
    data-slot="input-group-addon"
    data-align={align}
    className={cn(inputGroupAddonRecipe({ align }), inputGroupAddonBase, className)}
    onClick={(e) => {
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }
      e.currentTarget.parentElement?.querySelector("input")?.focus();
    }}
    {...props}
  />
);

const InputGroupButton = ({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  InputGroupButtonVariants & {
    type?: "button" | "submit" | "reset";
  }) => (
  <Button
    type={type}
    data-size={size}
    variant={variant}
    className={cn(inputGroupButtonRecipe({ size }), inputGroupButtonBase, className)}
    {...props}
  />
);

const InputGroupText = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span className={cn(inputGroupTextStyle, className)} {...props} />
);

const InputGroupInput = ({ className, ...props }: React.ComponentProps<"input">) => (
  <Input data-slot="input-group-control" className={cn(inputGroupInputStyle, className)} {...props} />
);

const InputGroupTextarea = ({ className, ...props }: React.ComponentProps<"textarea">) => (
  <Textarea data-slot="input-group-control" className={cn(inputGroupTextareaStyle, className)} {...props} />
);

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea };
