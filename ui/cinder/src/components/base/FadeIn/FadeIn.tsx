"use client";

import * as React from "react";
import { useInView } from "@game-library/armature";

import { cn } from "../../../lib/utils";
import { fadeInStyle } from "./FadeIn.css";

export interface FadeInProps extends React.ComponentProps<"div"> {
  /** Delay before the fade starts, in ms — stagger siblings by index for a cascade. */
  delay?: number;
  /** Start the fade this far before the element reaches the viewport (CSS margin syntax). */
  rootMargin?: string;
}

/**
 * Fades its children in the first time they scroll into view.
 *
 * @example
 * {items.map((item, index) => (
 *   <FadeIn key={item.id} delay={Math.min(index, 8) * 30}>
 *     <Tile item={item} />
 *   </FadeIn>
 * ))}
 */
const FadeIn = ({ className, style, delay = 0, rootMargin = "40px", children, ...props }: FadeInProps) => {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin });

  return (
    <div
      ref={ref}
      data-slot="fade-in"
      data-visible={inView ? "" : undefined}
      className={cn(fadeInStyle, className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...props}
    >
      {children}
    </div>
  );
};

export { FadeIn };
