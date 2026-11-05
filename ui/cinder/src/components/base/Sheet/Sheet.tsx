"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import { XIcon } from "@phosphor-icons/react";
import {
  sheetOverlay,
  sheetContentStyles,
  sheetCloseButton,
  sheetHeader,
  sheetFooter,
  sheetTitle,
  sheetDescription,
  srOnly
} from "./Sheet.css";

const Sheet = ({ ...props }: SheetPrimitive.Root.Props) => <SheetPrimitive.Root data-slot="sheet" {...props} />;

const SheetTrigger = ({ ...props }: SheetPrimitive.Trigger.Props) => (
  <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
);

const SheetClose = ({ ...props }: SheetPrimitive.Close.Props) => <SheetPrimitive.Close data-slot="sheet-close" {...props} />;

const SheetPortal = ({ ...props }: SheetPrimitive.Portal.Props) => <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;

const SheetOverlay = ({ className, ...props }: SheetPrimitive.Backdrop.Props) => (
  <SheetPrimitive.Backdrop data-slot="sheet-overlay" className={cn(sheetOverlay, className)} {...props} />
);

const SheetContent = ({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Popup
      data-slot="sheet-content"
      data-side={side}
      className={cn(sheetContentStyles[side], className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <SheetPrimitive.Close
          data-slot="sheet-close"
          render={<Button variant="ghost" className={sheetCloseButton} size="icon-sm" />}
        >
          <XIcon />
          <span className={srOnly}>Close</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Popup>
  </SheetPortal>
);

const SheetHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sheet-header" className={cn(sheetHeader, className)} {...props} />
);

const SheetFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sheet-footer" className={cn(sheetFooter, className)} {...props} />
);

const SheetTitle = ({ className, ...props }: SheetPrimitive.Title.Props) => (
  <SheetPrimitive.Title data-slot="sheet-title" className={cn(sheetTitle, className)} {...props} />
);

const SheetDescription = ({ className, ...props }: SheetPrimitive.Description.Props) => (
  <SheetPrimitive.Description data-slot="sheet-description" className={cn(sheetDescription, className)} {...props} />
);

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
