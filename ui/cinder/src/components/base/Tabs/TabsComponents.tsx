"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "../../../lib/utils";
import { tabsRoot, tabsListRecipe, tabsTrigger, tabsContent, type TabsListVariants } from "./Tabs.css";

const TabsRoot = ({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) => (
  <TabsPrimitive.Root data-slot="tabs" data-orientation={orientation} className={cn(tabsRoot, className)} {...props} />
);

const TabsList = ({ className, variant = "default", ...props }: TabsPrimitive.List.Props & TabsListVariants) => (
  <TabsPrimitive.List
    data-slot="tabs-list"
    data-variant={variant}
    className={cn(tabsListRecipe({ variant }), className)}
    {...props}
  />
);

const TabsTrigger = ({ className, ...props }: TabsPrimitive.Tab.Props) => (
  <TabsPrimitive.Tab data-slot="tabs-trigger" className={cn(tabsTrigger, className)} {...props} />
);

const TabsContent = ({ className, ...props }: TabsPrimitive.Panel.Props) => (
  <TabsPrimitive.Panel data-slot="tabs-content" className={cn(tabsContent, className)} {...props} />
);

const tabsListVariants = tabsListRecipe;

export { TabsRoot, TabsList, TabsTrigger, TabsContent, tabsListVariants };
