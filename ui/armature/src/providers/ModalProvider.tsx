import React, { createContext, useState, useCallback, useMemo, PropsWithChildren } from "react";
import { Overlay as ModalOverlay } from "../components/modals/Overlay";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

export interface ModalContextType {
  openModal: (component: React.ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
}

export type ModalProviderProps = PropsWithChildren;

export const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
  isOpen: false
});

/**
 * ModalProvider
 *
 * A context provider that manages modal state and renders the modal overlay.
 * Wrap your application with this provider to enable modal functionality.
 *
 * @example
 * <ModalProvider>
 *   <App />
 * </ModalProvider>
 *
 * // Then in any component:
 * const { openModal, closeModal } = useModal();
 * openModal(<MyModalContent />);
 */
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalComponent, setModalComponent] = useState<React.ReactNode>(null);

  useBodyScrollLock(!!modalComponent);

  const openModal = useCallback((component: React.ReactNode) => {
    setModalComponent(component);
  }, []);

  const closeModal = useCallback(() => {
    setModalComponent(null);
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      isOpen: !!modalComponent
    }),
    [openModal, closeModal, modalComponent]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalComponent && <ModalOverlay>{modalComponent}</ModalOverlay>}
    </ModalContext.Provider>
  );
};
