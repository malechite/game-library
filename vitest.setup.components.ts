import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());

// jsdom lacks ResizeObserver / matchMedia; provide inert defaults so layout hooks mount.
if (typeof globalThis.ResizeObserver === "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
}

if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    }) as MediaQueryList;
}

// jsdom has no Web Animations API; Base UI's ScrollArea calls getAnimations() when scrolling settles.
if (typeof Element !== "undefined" && typeof Element.prototype.getAnimations !== "function") {
  Element.prototype.getAnimations = () => [];
}

// jsdom has no scrolling; make scrollTo a no-op on elements.
if (typeof Element !== "undefined" && typeof Element.prototype.scrollTo !== "function") {
  Element.prototype.scrollTo = () => {};
}
