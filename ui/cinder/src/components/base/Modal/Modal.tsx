"use client";

import type { ReactNode } from "react";
// Icons cinder renders itself are imported directly (not by name), so the
// library never depends on what an app registered in the icon registry.
import { XIcon } from "@phosphor-icons/react";
import { Box, BoxProps } from "@game-library/armature";
import { Intent } from "@game-library/types";
import { intentGemstone } from "@game-library/tokens";
import { cn } from "../../../lib/utils";
import { Button, type ButtonProps } from "../Button/Button";
import { Icon, type CinderIconType } from "../Icon";
import { LightBar } from "../LightBar/LightBar";
import { modalSurface, modalHeader, modalTitle, modalContent, modalDescription, modalFooter } from "./Modal.css";

export interface ModalButtonConfig extends Omit<ButtonProps, "children"> {
  label: string;
}

export interface ModalProps extends BoxProps {
  title?: string;
  /** Icon rendered next to the title in the header. */
  icon?: CinderIconType;
  intent?: Intent;
  /** Body text — handy for simple dialogs (e.g. confirmations) without children. */
  description?: string;
  children?: ReactNode;
  onClose?: () => void;
  okText?: string;
  onOk?: () => void;
  okDisabled?: boolean;
  showOk?: boolean;
  cancelText?: string;
  onCancel?: () => void;
  showCancel?: boolean;
  showFooter?: boolean;
  buttons?: ModalButtonConfig[];
  width?: number | string;
  className?: string;
}

export const Modal = ({
  title,
  icon,
  intent,
  description,
  children,
  onClose,
  okText = "Save",
  onOk,
  okDisabled = false,
  showOk = true,
  cancelText = "Cancel",
  onCancel,
  showCancel = true,
  showFooter = true,
  buttons,
  width = 480,
  className,
  ...rest
}: ModalProps) => {
  const gemstone = intent ? intentGemstone[intent] : undefined;

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const handleOk = () => {
    if (!okDisabled) onOk?.();
  };

  // A destructive intent turns the primary action red (e.g. delete confirmations).
  const okVariant = intent === Intent.Danger ? "destructive" : "default";

  const defaultButtons = (
    <>
      {showCancel && (
        <Button variant="outline" onClick={handleCancel}>
          <XIcon />
          {cancelText}
        </Button>
      )}
      {showOk && (
        <Button variant={okVariant} onClick={handleOk} disabled={okDisabled}>
          {okText}
        </Button>
      )}
    </>
  );

  const customButtons = buttons?.map(({ label, ...props }, i) => (
    <Button key={i} {...props}>
      {label}
    </Button>
  ));

  return (
    <Box
      data-slot="modal"
      className={cn(modalSurface, className)}
      style={{ width: typeof width === "number" ? `${width}px` : width }}
      {...rest}
    >
      <LightBar gradient={gemstone} animate />
      {(title || icon || onClose) && (
        <div data-slot="modal-header" className={modalHeader}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {icon && <Icon type={icon} />}
            {title && <span className={modalTitle}>{title}</span>}
          </span>
          {onClose && (
            <Button variant="ghost" size="icon-sm" aria-label="Close" onClick={onClose}>
              <XIcon />
            </Button>
          )}
        </div>
      )}
      {(description || children) && (
        <div data-slot="modal-content" className={modalContent}>
          {description && <p className={modalDescription}>{description}</p>}
          {children}
        </div>
      )}
      {showFooter && (
        <div data-slot="modal-footer" className={modalFooter}>
          {customButtons ?? defaultButtons}
        </div>
      )}
    </Box>
  );
};
