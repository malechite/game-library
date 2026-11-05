import { useEffect, useRef } from "react";

export interface UseOnKeyDownOptions {
  /** If true, the alt key must be pressed along with the specified key */
  altKey?: boolean;
  /** If true, the ctrl key must be pressed along with the specified key */
  ctrlKey?: boolean;
  /** If true, the meta (Command on macOS or Windows key on Windows) must be pressed */
  metaKey?: boolean;
  /** If true, disables the event listener */
  disabled?: boolean;
  /** Set to true to require all specified modifier keys to be pressed */
  requireAllModifiers?: boolean;
  /** If true, the key value will be treated as a key code instead of a key value */
  isKeyCode?: boolean;
  /** If false, the hook will not call event.preventDefault() — the callback must handle it. Default: true */
  preventDefault?: boolean;
  /** Callback fired when the key is released (keyup). Useful for "held key" patterns. */
  onRelease?: (event: KeyboardEvent) => void;
}

/**
 * Custom React hook to handle global key press events.
 * Can be configured to listen for specific keys with optional modifier keys (alt, ctrl, meta).
 *
 * @param key - The key to listen for. This should be a single character or a valid key value from KeyboardEvent.key.
 * @param fn - The callback function that executes when the specified key and modifiers are pressed.
 * @param options - Optional configuration for additional requirements.
 *
 * By default, no modifier keys are required. If any modifier keys are specified without setting
 * `requireAllModifiers` to true, the event will trigger if any one of the specified modifiers
 * is pressed along with the key.
 *
 * @example
 * // Simple key press
 * useOnKeyDown("Delete", handleDelete);
 *
 * @example
 * // With modifiers - triggers when both Control and Alt are pressed together
 * useOnKeyDown("Delete", handleDelete, { ctrlKey: true, altKey: true, requireAllModifiers: true });
 *
 * @example
 * // Using key code for special keys
 * useOnKeyDown("Enter", handleSubmit, { isKeyCode: true });
 */
export const useOnKeyDown = (key: string, fn: (event: KeyboardEvent) => void, options: UseOnKeyDownOptions = {}) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const {
        altKey,
        ctrlKey,
        metaKey,
        disabled,
        requireAllModifiers,
        isKeyCode,
        preventDefault: shouldPreventDefault = true
      } = optionsRef.current;
      if (disabled) return;

      const isKeyMatch = isKeyCode ? event.code === key : event.key.toLowerCase() === key.toLowerCase();

      const isModifierMatch = requireAllModifiers
        ? (!altKey || event.altKey) && (!ctrlKey || event.ctrlKey) && (!metaKey || event.metaKey)
        : (!altKey && !ctrlKey && !metaKey) ||
          (altKey && event.altKey) ||
          (ctrlKey && event.ctrlKey) ||
          (metaKey && event.metaKey);

      if (isKeyMatch && isModifierMatch) {
        fnRef.current(event);
        if (shouldPreventDefault) event.preventDefault();
      }
    };

    const releaseHandler = (event: KeyboardEvent) => {
      const { isKeyCode, onRelease } = optionsRef.current;
      if (!onRelease) return;

      const isKeyMatch = isKeyCode ? event.code === key : event.key.toLowerCase() === key.toLowerCase();

      if (isKeyMatch) onRelease(event);
    };

    window.addEventListener("keydown", handler);
    window.addEventListener("keyup", releaseHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("keyup", releaseHandler);
    };
  }, [key]);
};

/**
 * Convenience hook for listening to the Escape key
 * @example
 * useOnEscKey(() => setIsOpen(false));
 */
export const useOnEscKey = (fn: (event?: KeyboardEvent) => void, options?: UseOnKeyDownOptions) =>
  useOnKeyDown("escape", fn, options);

/**
 * Convenience hook for listening to the Enter key
 * @example
 * useOnEnterKey(handleSubmit);
 */
export const useOnEnterKey = (fn: (event?: KeyboardEvent) => void, options?: UseOnKeyDownOptions) =>
  useOnKeyDown("enter", fn, options);

/**
 * Convenience hook for listening to the Delete/Backspace key
 * @example
 * useOnDeleteKey(handleDelete);
 */
export const useOnDeleteKey = (fn: (event?: KeyboardEvent) => void, options?: UseOnKeyDownOptions) =>
  useOnKeyDown("delete", fn, options);

/**
 * Convenience hook for listening to the Space key
 * @example
 * useOnSpaceKey(togglePlay);
 */
export const useOnSpaceKey = (fn: (event?: KeyboardEvent) => void, options?: UseOnKeyDownOptions) =>
  useOnKeyDown(" ", fn, options);
