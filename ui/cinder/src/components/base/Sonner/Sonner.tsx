"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react";

import { vars } from "../../../themes/contract.css";
import { iconSize, spinnerIcon } from "./Sonner.css";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircleIcon className={iconSize} />,
        info: <InfoIcon className={iconSize} />,
        warning: <WarningIcon className={iconSize} />,
        error: <XCircleIcon className={iconSize} />,
        loading: <SpinnerIcon className={spinnerIcon} />
      }}
      style={
        {
          "--normal-bg": vars.color.popover,
          "--normal-text": vars.color.popoverForeground,
          "--normal-border": vars.color.border,
          "--border-radius": vars.radius.md
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast"
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
