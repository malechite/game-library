import * as React from "react";

import { cn } from "../../../lib/utils";
import { card, cardHeader, cardTitle, cardDescription, cardAction, cardContent, cardFooter } from "./Card.css";

const Card = ({ className, size = "default", ...props }: React.ComponentProps<"div"> & { size?: "default" | "sm" }) => (
  <div data-slot="card" data-size={size} className={cn(card, className)} {...props} />
);

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-header" className={cn(cardHeader, className)} {...props} />
);

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-title" className={cn(cardTitle, className)} {...props} />
);

const CardDescription = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-description" className={cn(cardDescription, className)} {...props} />
);

const CardAction = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-action" className={cn(cardAction, className)} {...props} />
);

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-content" className={cn(cardContent, className)} {...props} />
);

const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-footer" className={cn(cardFooter, className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
