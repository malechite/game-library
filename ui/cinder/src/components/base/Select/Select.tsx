"use client";

import { cn } from "../../../lib/utils";
import { Icon, type CinderIconType } from "../Icon";
import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./SelectComponents";

export interface SelectOption {
  /** The option value */
  value: string;
  /** Display label */
  label: string;
  /** Optional description shown alongside the label */
  description?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional leading icon, shown in the option and in the trigger when selected */
  icon?: CinderIconType;
}

const optionContent = { display: "inline-flex", alignItems: "center", gap: 8 } as const;

export interface SelectProps {
  /** HTML id for the trigger */
  id?: string;
  /** Array of options to render */
  options: SelectOption[];
  /** Currently selected value */
  value: string;
  /** Callback when value changes */
  onValueChange: (value: string) => void;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Trigger size variant */
  size?: "sm" | "default";
  /** Additional CSS class for the root */
  className?: string;
  /** Additional CSS class for the trigger */
  triggerClassName?: string;
  /** Additional CSS class for the content popup */
  contentClassName?: string;
}

/**
 * Select — Prop-driven select dropdown.
 *
 * Pass an array of `options` instead of composing SelectRoot/SelectTrigger/SelectContent/SelectItem manually.
 *
 * @example
 * <Select
 *   options={[
 *     { value: "a", label: "Option A" },
 *     { value: "b", label: "Option B", description: "With description" },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 */
export const Select = ({
  id,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  disabled,
  size,
  className,
  triggerClassName,
  contentClassName
}: SelectProps) => {
  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder;

  return (
    <SelectRoot
      value={value}
      onValueChange={(v) => {
        if (v !== null) onValueChange(v);
      }}
      disabled={disabled}
    >
      <SelectTrigger id={id} size={size} className={cn(triggerClassName, className)}>
        <SelectValue>
          <span style={optionContent}>
            {selectedOption?.icon && <Icon type={selectedOption.icon} size={1} />}
            {displayValue}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
            <span style={optionContent}>
              {option.icon && <Icon type={option.icon} size={1} />}
              {option.description ? (
                <>
                  <span style={{ fontWeight: 500 }}>{option.label}</span>{" "}
                  <span style={{ opacity: 0.6 }}>{option.description}</span>
                </>
              ) : (
                option.label
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
