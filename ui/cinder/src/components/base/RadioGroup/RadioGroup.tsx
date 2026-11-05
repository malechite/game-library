"use client";

import { cn } from "../../../lib/utils";
import { Label } from "../Label/Label";
import { RadioGroupRoot, RadioGroupItem } from "./RadioGroupComponents";

export interface RadioOption {
  /** The option value */
  value: string;
  /** Display label */
  label: string;
  /** Optional description shown below the label */
  description?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface RadioGroupViewProps {
  /** Array of radio options to render */
  options: RadioOption[];
  /** Currently selected value */
  value: string;
  /** Callback when value changes */
  onValueChange: (value: string) => void;
  /** Layout orientation */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS class */
  className?: string;
}

/**
 * RadioGroup — Prop-driven radio group.
 *
 * Pass an array of `options` instead of composing RadioGroup/RadioGroupItem/Label manually.
 *
 * @example
 * <RadioGroup
 *   options={[
 *     { value: "a", label: "Option A" },
 *     { value: "b", label: "Option B", description: "With description" },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 */
export const RadioGroup = ({ options, value, onValueChange, orientation = "vertical", className }: RadioGroupViewProps) => {
  return (
    <RadioGroupRoot
      value={value}
      onValueChange={onValueChange}
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        gap: orientation === "horizontal" ? "16px" : "8px"
      }}
    >
      {options.map((option) => (
        <div key={option.value} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
          <RadioGroupItem value={option.value} id={option.value} disabled={option.disabled} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Label htmlFor={option.value}>{option.label}</Label>
            {option.description && <span style={{ fontSize: "0.875rem", opacity: 0.6 }}>{option.description}</span>}
          </div>
        </div>
      ))}
    </RadioGroupRoot>
  );
};
