import { useEffect, useRef } from "react";
import { isInputElement } from "../util/style.util";

export interface HotKeyBinding {
  /** Key to listen for (e.g. "a", "b", "d") */
  key: string;
  /** Action to execute when the key is pressed */
  action: () => void;
  /** If true, this binding is skipped */
  disabled?: boolean;
}

/**
 * Registers multiple keyboard shortcuts at once.
 * Automatically skips when an input field (input/textarea/contentEditable) is focused.
 *
 * Uses a single keydown listener with a ref to avoid the variable-hook-count problem.
 *
 * @example
 * ```tsx
 * useHotKeys([
 *   { key: "a", action: selectTool },
 *   { key: "b", action: boundaryTool },
 *   { key: "d", action: doorTool, disabled: !isEditorOpen },
 * ]);
 * ```
 */
export const useHotKeys = (bindings: HotKeyBinding[]) => {
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isInputElement(e.target)) return;

      for (const binding of bindingsRef.current) {
        if (binding.disabled) continue;
        if (e.key.toLowerCase() === binding.key.toLowerCase()) {
          e.preventDefault();
          binding.action();
          return;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
};
