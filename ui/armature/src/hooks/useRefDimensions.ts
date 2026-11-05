import { useEffect, useState } from "react";
import type { Dimensions } from "@game-library/types";

export const useRefDimensions = (ref: React.RefObject<HTMLElement | null>): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateDimensions = () => {
      const { width, height } = element.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return dimensions;
};
