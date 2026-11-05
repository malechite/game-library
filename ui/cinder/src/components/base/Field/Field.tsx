"use client";

import { useMemo } from "react";

import { cn } from "../../../lib/utils";
import { Label } from "../Label/Label";
import { Separator } from "../Separator/Separator";
import {
  fieldSetStyle,
  fieldLegendStyle,
  fieldGroupStyle,
  fieldRecipe,
  fieldContentStyle,
  fieldLabelStyle,
  fieldTitleStyle,
  fieldDescriptionStyle,
  fieldSeparatorStyle,
  fieldSeparatorLineStyle,
  fieldSeparatorContentStyle,
  fieldErrorStyle,
  fieldErrorListStyle,
  type FieldVariants
} from "./Field.css";

const FieldSet = ({ className, ...props }: React.ComponentProps<"fieldset">) => (
  <fieldset data-slot="field-set" className={cn(fieldSetStyle, className)} {...props} />
);

const FieldLegend = ({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) => (
  <legend data-slot="field-legend" data-variant={variant} className={cn(fieldLegendStyle, className)} {...props} />
);

const FieldGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="field-group" className={cn(fieldGroupStyle, className)} {...props} />
);

const Field = ({ className, orientation = "vertical", ...props }: React.ComponentProps<"div"> & FieldVariants) => (
  <div
    role="group"
    data-slot="field"
    data-orientation={orientation}
    className={cn(fieldRecipe({ orientation }), className)}
    {...props}
  />
);

const FieldContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="field-content" className={cn(fieldContentStyle, className)} {...props} />
);

const FieldLabel = ({ className, ...props }: React.ComponentProps<typeof Label>) => (
  <Label data-slot="field-label" className={cn(fieldLabelStyle, className)} {...props} />
);

const FieldTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="field-label" className={cn(fieldTitleStyle, className)} {...props} />
);

const FieldDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p data-slot="field-description" className={cn(fieldDescriptionStyle, className)} {...props} />
);

const FieldSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) => (
  <div data-slot="field-separator" data-content={!!children} className={cn(fieldSeparatorStyle, className)} {...props}>
    <Separator className={fieldSeparatorLineStyle} />
    {children && (
      <span className={fieldSeparatorContentStyle} data-slot="field-separator-content">
        {children}
      </span>
    )}
  </div>
);

const FieldError = ({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) => {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className={fieldErrorListStyle}>
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div role="alert" data-slot="field-error" className={cn(fieldErrorStyle, className)} {...props}>
      {content}
    </div>
  );
};

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle
};
