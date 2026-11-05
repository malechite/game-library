"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../../../lib/utils";
import {
  drawerOverlay,
  drawerContent,
  drawerHandle,
  drawerHeader,
  drawerFooter,
  drawerTitle,
  drawerDescription
} from "./Drawer.css";

const Drawer = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root data-slot="drawer" {...props} />
);

const DrawerTrigger = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) => (
  <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
);

const DrawerPortal = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) => (
  <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
);

const DrawerClose = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) => (
  <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
);

const DrawerOverlay = ({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) => (
  <DrawerPrimitive.Overlay data-slot="drawer-overlay" className={cn(drawerOverlay, className)} {...props} />
);

const DrawerContent = ({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) => (
  <DrawerPortal data-slot="drawer-portal">
    <DrawerOverlay />
    <DrawerPrimitive.Content data-slot="drawer-content" className={cn(drawerContent, className)} {...props}>
      <div className={drawerHandle} />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);

const DrawerHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="drawer-header" className={cn(drawerHeader, className)} {...props} />
);

const DrawerFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="drawer-footer" className={cn(drawerFooter, className)} {...props} />
);

const DrawerTitle = ({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title data-slot="drawer-title" className={cn(drawerTitle, className)} {...props} />
);

const DrawerDescription = ({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description data-slot="drawer-description" className={cn(drawerDescription, className)} {...props} />
);

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
};
