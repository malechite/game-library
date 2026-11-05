import { useContext } from "react";
import { ModalContext, type ModalContextType } from "../providers/ModalProvider";

/**
 * useModal
 *
 * A hook to access the modal context for opening and closing modals.
 *
 * @returns {ModalContextType} The modal context containing openModal, closeModal, and isOpen
 * @throws {Error} If used outside of a ModalProvider
 *
 * @example
 * const { openModal, closeModal, isOpen } = useModal();
 *
 * // Open a modal
 * openModal(<MyModalContent onClose={closeModal} />);
 *
 * // Close the modal
 * closeModal();
 *
 * // Check if modal is open
 * if (isOpen) { ... }
 */
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
