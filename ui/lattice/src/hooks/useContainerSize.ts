"use client";

import { useState, useEffect } from "react";

interface ContainerSize {
  width: number;
  height: number;
}

export const useContainerSize = (ref: React.RefObject<HTMLDivElement | null>): ContainerSize => {
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
};
