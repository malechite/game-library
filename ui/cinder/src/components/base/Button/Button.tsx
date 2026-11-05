"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { SpinnerGapIcon } from "@phosphor-icons/react";

import { cn } from "../../../lib/utils";
import { Icon, type CinderIconType } from "../Icon";
import {
  buttonRecipe,
  buttonDisabledOverlay,
  buttonLoadingOverlay,
  buttonLoadingSpinner,
  buttonLoadingContent,
  type ButtonVariants
} from "./Button.css";

export interface ButtonProps extends ButtonPrimitive.Props, NonNullable<ButtonVariants> {
  /** Leading icon (left side) — accepts a CinderIconType string */
  icon?: CinderIconType;
  /** Trailing icon (right side) — accepts a CinderIconType string */
  rightIcon?: CinderIconType;
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
}

const Button = ({
  className,
  variant = "default",
  size = "default",
  icon,
  rightIcon,
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const content = (
    <>
      {icon && <Icon type={icon} />}
      {children}
      {rightIcon && <Icon type={rightIcon} />}
    </>
  );

  return (
    <ButtonPrimitive
      data-slot="button"
      data-size={size}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonRecipe({ variant, size }), className)}
      {...props}
    >
      <span className={buttonDisabledOverlay} />
      {loading ? (
        <>
          <span className={buttonLoadingContent}>{content}</span>
          <span className={buttonLoadingOverlay}>
            <SpinnerGapIcon className={buttonLoadingSpinner} />
          </span>
        </>
      ) : (
        content
      )}
    </ButtonPrimitive>
  );
};

const buttonVariants = buttonRecipe;

export { Button, buttonRecipe, buttonVariants };
export type { ButtonVariants };
