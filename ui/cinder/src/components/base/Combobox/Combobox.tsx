"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../InputGroup/InputGroup";
import { CaretDownIcon, XIcon, CheckIcon } from "@phosphor-icons/react";
import {
  comboboxTriggerStyle,
  comboboxTriggerIconStyle,
  comboboxInputGroupStyle,
  comboboxInputTriggerButtonStyle,
  comboboxPositionerStyle,
  comboboxContentStyle,
  comboboxListStyle,
  comboboxItemStyle,
  comboboxItemIndicatorStyle,
  comboboxLabelStyle,
  comboboxEmptyStyle,
  comboboxSeparatorStyle,
  comboboxChipsStyle,
  comboboxChipStyle,
  comboboxChipRemoveStyle,
  comboboxChipsInputStyle
} from "./Combobox.css";

const Combobox = ComboboxPrimitive.Root;

const ComboboxValue = ({ ...props }: ComboboxPrimitive.Value.Props) => (
  <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
);

const ComboboxTrigger = ({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) => (
  <ComboboxPrimitive.Trigger data-slot="combobox-trigger" className={cn(comboboxTriggerStyle, className)} {...props}>
    {children}
    <CaretDownIcon className={comboboxTriggerIconStyle} />
  </ComboboxPrimitive.Trigger>
);

const ComboboxClear = ({ className, ...props }: ComboboxPrimitive.Clear.Props) => (
  <ComboboxPrimitive.Clear
    data-slot="combobox-clear"
    render={<InputGroupButton variant="ghost" size="icon-xs" />}
    className={cn(className)}
    {...props}
  >
    <XIcon style={{ pointerEvents: "none" }} />
  </ComboboxPrimitive.Clear>
);

const ComboboxInput = ({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) => (
  <InputGroup className={cn(comboboxInputGroupStyle, className)}>
    <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
    <InputGroupAddon align="inline-end">
      {showTrigger && (
        <InputGroupButton
          size="icon-xs"
          variant="ghost"
          render={<ComboboxTrigger />}
          data-slot="input-group-button"
          className={comboboxInputTriggerButtonStyle}
          disabled={disabled}
        />
      )}
      {showClear && <ComboboxClear disabled={disabled} />}
    </InputGroupAddon>
    {children}
  </InputGroup>
);

const ComboboxContent = ({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignOffset" | "anchor">) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      anchor={anchor}
      className={comboboxPositionerStyle}
    >
      <ComboboxPrimitive.Popup
        data-slot="combobox-content"
        data-chips={!!anchor}
        className={cn(comboboxContentStyle, className)}
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
);

const ComboboxList = ({ className, ...props }: ComboboxPrimitive.List.Props) => (
  <ComboboxPrimitive.List data-slot="combobox-list" className={cn(comboboxListStyle, className)} {...props} />
);

const ComboboxItem = ({ className, children, ...props }: ComboboxPrimitive.Item.Props) => (
  <ComboboxPrimitive.Item data-slot="combobox-item" className={cn(comboboxItemStyle, className)} {...props}>
    {children}
    <ComboboxPrimitive.ItemIndicator render={<span className={comboboxItemIndicatorStyle} />}>
      <CheckIcon style={{ pointerEvents: "none" }} />
    </ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>
);

const ComboboxGroup = ({ className, ...props }: ComboboxPrimitive.Group.Props) => (
  <ComboboxPrimitive.Group data-slot="combobox-group" className={cn(className)} {...props} />
);

const ComboboxLabel = ({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) => (
  <ComboboxPrimitive.GroupLabel data-slot="combobox-label" className={cn(comboboxLabelStyle, className)} {...props} />
);

const ComboboxCollection = ({ ...props }: ComboboxPrimitive.Collection.Props) => (
  <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
);

const ComboboxEmpty = ({ className, ...props }: ComboboxPrimitive.Empty.Props) => (
  <ComboboxPrimitive.Empty data-slot="combobox-empty" className={cn(comboboxEmptyStyle, className)} {...props} />
);

const ComboboxSeparator = ({ className, ...props }: ComboboxPrimitive.Separator.Props) => (
  <ComboboxPrimitive.Separator data-slot="combobox-separator" className={cn(comboboxSeparatorStyle, className)} {...props} />
);

const ComboboxChips = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props) => (
  <ComboboxPrimitive.Chips data-slot="combobox-chips" className={cn(comboboxChipsStyle, className)} {...props} />
);

const ComboboxChip = ({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) => (
  <ComboboxPrimitive.Chip data-slot="combobox-chip" className={cn(comboboxChipStyle, className)} {...props}>
    {children}
    {showRemove && (
      <ComboboxPrimitive.ChipRemove
        render={<Button variant="ghost" size="icon-xs" />}
        className={comboboxChipRemoveStyle}
        data-slot="combobox-chip-remove"
      >
        <XIcon style={{ pointerEvents: "none" }} />
      </ComboboxPrimitive.ChipRemove>
    )}
  </ComboboxPrimitive.Chip>
);

const ComboboxChipsInput = ({ className, ...props }: ComboboxPrimitive.Input.Props) => (
  <ComboboxPrimitive.Input data-slot="combobox-chip-input" className={cn(comboboxChipsInputStyle, className)} {...props} />
);

const useComboboxAnchor = () => React.useRef<HTMLDivElement | null>(null);

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor
};
