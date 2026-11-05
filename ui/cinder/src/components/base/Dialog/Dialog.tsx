"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import { XIcon } from "@phosphor-icons/react";
import {
  dialogOverlay,
  dialogContent,
  dialogCloseButton,
  dialogHeader,
  dialogFooter,
  dialogTitle,
  dialogDescription,
  srOnly
} from "./Dialog.css";

const Dialog = ({ ...props }: DialogPrimitive.Root.Props) => <DialogPrimitive.Root data-slot="dialog" {...props} />;

const DialogTrigger = ({ ...props }: DialogPrimitive.Trigger.Props) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);

const DialogPortal = ({ ...props }: DialogPrimitive.Portal.Props) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

const DialogClose = ({ ...props }: DialogPrimitive.Close.Props) => <DialogPrimitive.Close data-slot="dialog-close" {...props} />;

const DialogOverlay = ({ className, ...props }: DialogPrimitive.Backdrop.Props) => (
  <DialogPrimitive.Backdrop data-slot="dialog-overlay" className={cn(dialogOverlay, className)} {...props} />
);

const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Popup data-slot="dialog-content" className={cn(dialogContent, className)} {...props}>
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          render={<Button variant="ghost" className={dialogCloseButton} size="icon-sm" />}
        >
          <XIcon />
          <span className={srOnly}>Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="dialog-header" className={cn(dialogHeader, className)} {...props} />
);

const DialogFooter = ({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) => (
  <div data-slot="dialog-footer" className={cn(dialogFooter, className)} {...props}>
    {children}
    {showCloseButton && <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>}
  </div>
);

const DialogTitle = ({ className, ...props }: DialogPrimitive.Title.Props) => (
  <DialogPrimitive.Title data-slot="dialog-title" className={cn(dialogTitle, className)} {...props} />
);

const DialogDescription = ({ className, ...props }: DialogPrimitive.Description.Props) => (
  <DialogPrimitive.Description data-slot="dialog-description" className={cn(dialogDescription, className)} {...props} />
);

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};
