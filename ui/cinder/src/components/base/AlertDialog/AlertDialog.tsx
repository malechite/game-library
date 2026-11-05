"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import {
  alertDialogOverlay,
  alertDialogContent,
  alertDialogHeader,
  alertDialogFooter,
  alertDialogMedia,
  alertDialogTitle,
  alertDialogDescription
} from "./AlertDialog.css";

const AlertDialog = ({ ...props }: AlertDialogPrimitive.Root.Props) => (
  <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
);

const AlertDialogTrigger = ({ ...props }: AlertDialogPrimitive.Trigger.Props) => (
  <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
);

const AlertDialogPortal = ({ ...props }: AlertDialogPrimitive.Portal.Props) => (
  <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
);

const AlertDialogOverlay = ({ className, ...props }: AlertDialogPrimitive.Backdrop.Props) => (
  <AlertDialogPrimitive.Backdrop data-slot="alert-dialog-overlay" className={cn(alertDialogOverlay, className)} {...props} />
);

const AlertDialogContent = ({
  className,
  size = "default",
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  size?: "default" | "sm";
}) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Popup
      data-slot="alert-dialog-content"
      data-size={size}
      className={cn(alertDialogContent, className)}
      {...props}
    />
  </AlertDialogPortal>
);

const AlertDialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="alert-dialog-header" className={cn(alertDialogHeader, className)} {...props} />
);

const AlertDialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="alert-dialog-footer" className={cn(alertDialogFooter, className)} {...props} />
);

const AlertDialogMedia = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="alert-dialog-media" className={cn(alertDialogMedia, className)} {...props} />
);

const AlertDialogTitle = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn(alertDialogTitle, className)} {...props} />
);

const AlertDialogDescription = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description
    data-slot="alert-dialog-description"
    className={cn(alertDialogDescription, className)}
    {...props}
  />
);

const AlertDialogAction = ({ className, ...props }: React.ComponentProps<typeof Button>) => (
  <Button data-slot="alert-dialog-action" className={cn(className)} {...props} />
);

const AlertDialogCancel = ({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogPrimitive.Close.Props & Pick<React.ComponentProps<typeof Button>, "variant" | "size">) => (
  <AlertDialogPrimitive.Close
    data-slot="alert-dialog-cancel"
    className={cn(className)}
    render={<Button variant={variant} size={size} />}
    {...props}
  />
);

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
};
