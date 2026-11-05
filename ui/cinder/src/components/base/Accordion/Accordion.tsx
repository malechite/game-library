"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "./AccordionComponents";

export interface AccordionItemConfig {
  /** Unique value identifying this item */
  value: string;
  /** Content rendered in the trigger/header */
  trigger: ReactNode;
  /** Content rendered in the expandable panel */
  content: ReactNode;
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface AccordionViewProps {
  /** Array of accordion items to render */
  items: AccordionItemConfig[];
  /** Default open item(s) — pass a string or array of strings */
  defaultValue?: string | string[];
  /** Additional CSS class */
  className?: string;
}

/**
 * Accordion — Prop-driven accordion.
 *
 * Pass an array of `items` instead of composing Accordion/AccordionItem/Trigger/Content manually.
 *
 * @example
 * <Accordion
 *   items={[
 *     { value: "faq-1", trigger: "What is Game Library?", content: "A place to track your games." },
 *     { value: "faq-2", trigger: "How do I get started?", content: "Run pnpm dev." },
 *   ]}
 * />
 */
export const Accordion = ({ items, defaultValue, className }: AccordionViewProps) => {
  const resolvedDefault = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : undefined;

  return (
    <AccordionRoot defaultValue={resolvedDefault} className={cn(className)}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};
