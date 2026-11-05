"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { Icon, type CinderIconType } from "../Icon";
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "./TabsComponents";
export interface TabConfig {
  /** Unique value identifying this tab */
  value: string;
  /** Label rendered in the tab trigger */
  label: ReactNode;
  /** Content rendered in the tab panel */
  content: ReactNode;
  /** Optional icon shown before the label */
  icon?: CinderIconType;
  /** Whether this tab is disabled */
  disabled?: boolean;
}

export interface TabsViewProps {
  /** Array of tab configurations */
  tabs: TabConfig[];
  /** Default active tab value */
  defaultValue?: string;
  /** Controlled active tab value */
  value?: string;
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void;
  /** Tab list style variant */
  variant?: "default" | "line";
  /** Additional CSS class */
  className?: string;
}

/**
 * Tabs — Prop-driven tabbed interface.
 *
 * Pass an array of `tabs` instead of composing Tabs/TabsList/TabsTrigger/TabsContent manually.
 *
 * @example
 * <Tabs
 *   tabs={[
 *     { value: "overview", label: "Overview", content: <OverviewPanel /> },
 *     { value: "settings", label: "Settings", icon: "Gear", content: <SettingsPanel /> },
 *   ]}
 *   defaultValue="overview"
 * />
 */
export const Tabs = ({ tabs, defaultValue, value, onValueChange, variant, className }: TabsViewProps) => {
  const resolvedDefault = defaultValue ?? tabs[0]?.value;

  return (
    <TabsRoot defaultValue={resolvedDefault} value={value} onValueChange={onValueChange as any} className={cn(className)}>
      <TabsList variant={variant}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} disabled={tab.disabled}>
            {tab.icon && <Icon type={tab.icon} />}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
};
