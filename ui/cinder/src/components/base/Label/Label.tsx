"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import { labelStyle } from "./Label.css";

const Label = ({ className, ...props }: React.ComponentProps<"label">) => (
  <label data-slot="label" className={cn(labelStyle, className)} {...props} />
);

export { Label };
