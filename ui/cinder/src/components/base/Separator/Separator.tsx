"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "../../../lib/utils";
import { separatorBase } from "./Separator.css";

const Separator = ({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) => (
  <SeparatorPrimitive data-slot="separator" orientation={orientation} className={cn(separatorBase, className)} {...props} />
);

export { Separator };
