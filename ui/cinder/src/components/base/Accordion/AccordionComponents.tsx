"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "../../../lib/utils";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import {
  accordionRoot,
  accordionItem,
  accordionHeader,
  accordionTrigger,
  accordionTriggerIconDown,
  accordionTriggerIconUp,
  accordionPanel,
  accordionContentInner
} from "./Accordion.css";

const AccordionRoot = ({ className, ...props }: AccordionPrimitive.Root.Props) => (
  <AccordionPrimitive.Root data-slot="accordion" className={cn(accordionRoot, className)} {...props} />
);

const AccordionItem = ({ className, ...props }: AccordionPrimitive.Item.Props) => (
  <AccordionPrimitive.Item data-slot="accordion-item" className={cn(accordionItem, className)} {...props} />
);

const AccordionTrigger = ({ className, children, ...props }: AccordionPrimitive.Trigger.Props) => (
  <AccordionPrimitive.Header className={accordionHeader}>
    <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn(accordionTrigger, className)} {...props}>
      {children}
      <CaretDownIcon data-slot="accordion-trigger-icon" className={accordionTriggerIconDown} />
      <CaretUpIcon data-slot="accordion-trigger-icon" className={accordionTriggerIconUp} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({ className, children, ...props }: AccordionPrimitive.Panel.Props) => (
  <AccordionPrimitive.Panel data-slot="accordion-content" className={accordionPanel} {...props}>
    <div className={cn(accordionContentInner, className)}>{children}</div>
  </AccordionPrimitive.Panel>
);

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent };
