import { useEffect, useState } from "react";

const getMatches = (query: string): boolean =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(query).matches : false;

/**
 * Subscribe to a CSS media query.
 *
 * @example
 * const isWide = useMediaQuery("(min-width: 1100px)");
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};
