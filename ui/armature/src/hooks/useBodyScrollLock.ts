import { useEffect } from "react";

/**
 * A hook that locks the body scroll when enabled.
 * Useful for modals and overlays to prevent background scrolling.
 *
 * @param {boolean} lock - Whether to lock the body scroll
 *
 * @example
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * useBodyScrollLock(isModalOpen);
 */
export const useBodyScrollLock = (lock: boolean): void => {
  useEffect(() => {
    if (!lock) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lock]);
};
