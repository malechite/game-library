import { useState, useEffect, useMemo } from "react";

export interface ModifierKeys {
  meta: boolean;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
}

const DEFAULT_MODIFIERS: ModifierKeys = {
  meta: false,
  ctrl: false,
  shift: false,
  alt: false
};

/**
 * Tracks which modifier keys are currently held down.
 * Updates on keydown/keyup and resets when the window loses focus.
 */
export const useModifierKeys = (): ModifierKeys => {
  const [modifiers, setModifiers] = useState<ModifierKeys>(DEFAULT_MODIFIERS);

  useEffect(() => {
    const update = (e: KeyboardEvent) => {
      setModifiers({
        meta: e.metaKey,
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey
      });
    };

    const reset = () => setModifiers(DEFAULT_MODIFIERS);

    window.addEventListener("keydown", update);
    window.addEventListener("keyup", update);
    window.addEventListener("blur", reset);

    return () => {
      window.removeEventListener("keydown", update);
      window.removeEventListener("keyup", update);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return useMemo(() => modifiers, [modifiers]);
};
