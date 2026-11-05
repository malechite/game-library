import { useCallback, useEffect, useState } from "react";

export interface UseInViewOptions {
  /** Grow or shrink the viewport box used for the check (CSS margin syntax). Default "0px". */
  rootMargin?: string;
  /** Fraction of the element that must be visible (0–1). Default 0. */
  threshold?: number;
  /** Stop observing after the first time the element is seen. Default true. */
  once?: boolean;
}

export interface UseInViewResult<T extends Element> {
  /** Attach to the element to observe. */
  ref: (element: T | null) => void;
  /** True once the element has entered the viewport. */
  inView: boolean;
}

const supportsObserver = (): boolean => typeof window !== "undefined" && "IntersectionObserver" in window;

/**
 * Report when an element scrolls into view. Without IntersectionObserver
 * (server render, old browsers, jsdom) the element is treated as visible so
 * content is never left hidden.
 *
 * @example
 * const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "80px" });
 * return <div ref={ref} style={{ opacity: inView ? 1 : 0 }} />;
 */
export const useInView = <T extends Element = HTMLElement>({
  rootMargin = "0px",
  threshold = 0,
  once = true
}: UseInViewOptions = {}): UseInViewResult<T> => {
  const [element, setElement] = useState<T | null>(null);
  const [inView, setInView] = useState<boolean>(() => !supportsObserver());

  const ref = useCallback((node: T | null) => setElement(node), []);

  useEffect(() => {
    if (!element || !supportsObserver()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, rootMargin, threshold, once]);

  return { ref, inView };
};
