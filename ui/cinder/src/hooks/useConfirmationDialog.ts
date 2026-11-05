"use client";

import { createElement } from "react";
import { Intent } from "@game-library/types";
import { useModal } from "./useModal";
import { Modal } from "../components/base/Modal";

export interface ConfirmationDialogConfig {
  title: string;
  message: string;
  okText?: string;
  /** Defaults to `Intent.Danger` so the confirm button is red (destructive). */
  intent?: Intent;
  action: () => void | Promise<void>;
}

/**
 * useConfirmationDialog
 *
 * A convenience hook for opening simple confirmation dialogs.
 * Wraps useModal + Modal into an imperative API.
 *
 * @example
 * const { openConfirmationDialog } = useConfirmationDialog();
 *
 * openConfirmationDialog({
 *   title: "Delete item",
 *   message: "Are you sure? This action cannot be undone.",
 *   okText: "Delete",
 *   action: () => deleteMutation.mutateAsync(itemId),
 * });
 */
export const useConfirmationDialog = () => {
  const { openModal, closeModal } = useModal();

  const openConfirmationDialog = (config: ConfirmationDialogConfig) => {
    openModal(
      createElement(Modal, {
        title: config.title,
        description: config.message,
        okText: config.okText,
        intent: config.intent ?? Intent.Danger,
        onOk: async () => {
          closeModal();
          await config.action();
        },
        onCancel: closeModal
      })
    );
  };

  return { openConfirmationDialog };
};
