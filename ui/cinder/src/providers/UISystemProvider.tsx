"use client";

import React, { createContext, useState, useRef, useCallback, useMemo, useEffect, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useOnEscKey } from "@game-library/armature";
import { Intent } from "@game-library/types";
import { type Gemstone, intentGemstone, primaryGemstone } from "@game-library/tokens";
import { overlayBase } from "../components/base/Overlay/Overlay.css";
import { uiSystemCenter, uiSystemModalWrapper } from "./UISystemProvider.css";

// ─── LightBar State ──────────────────────────────────────────────────

export interface LightBarState {
  gradient: Gemstone;
  animate: boolean;
  setGradient: (gradient: Gemstone) => void;
  setAnimate: (animate: boolean) => void;
}

// ─── Context ─────────────────────────────────────────────────────────

export interface UISystemContextType {
  openModal: (component: React.ReactElement) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  lightBar: LightBarState;
}

export const UISystemContext = createContext<UISystemContextType | null>(null);

// ─── Provider ────────────────────────────────────────────────────────

export const UISystemProvider = ({ children }: PropsWithChildren) => {
  // LightBar state
  const [gradient, setGradient] = useState<Gemstone>(primaryGemstone);
  const [animate, setAnimate] = useState(true);
  const savedGradient = useRef<Gemstone | null>(null);

  // Modal state
  const [modalComponent, setModalComponent] = useState<React.ReactNode>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  const openModal = useCallback((component: React.ReactElement) => {
    setModalComponent(component);
    setClosing(false);
    setVisible(true);

    // Infer intent from the modal's props if present
    const intent = (component.props as Record<string, unknown>)?.intent as Intent | undefined;
    if (intent) {
      setGradient((current) => {
        savedGradient.current = current;
        return intentGemstone[intent];
      });
    }
  }, []);

  const closeModal = useCallback(() => {
    setClosing(true);

    // Restore previous gradient
    if (savedGradient.current !== null) {
      setGradient(savedGradient.current);
      savedGradient.current = null;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setModalComponent(null);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Esc closes the open modal (no-op while none is shown).
  useOnEscKey(() => closeModal(), { disabled: !visible });

  const lightBar = useMemo<LightBarState>(() => ({ gradient, animate, setGradient, setAnimate }), [gradient, animate]);

  const value = useMemo<UISystemContextType>(
    () => ({ openModal, closeModal, isModalOpen: visible, lightBar }),
    [openModal, closeModal, visible, lightBar]
  );

  const state = closing ? "closing" : "open";

  return (
    <UISystemContext.Provider value={value}>
      {children}
      {visible &&
        createPortal(
          <>
            <div className={overlayBase} data-state={state} />
            <div className={uiSystemCenter} data-state={state}>
              <div className={uiSystemModalWrapper} data-state={state}>
                {modalComponent}
              </div>
            </div>
          </>,
          document.body
        )}
    </UISystemContext.Provider>
  );
};
