import { describe, it, expect, vi } from "vitest";
import { createEventEmitter } from "./event.util";

type Events = {
  ping: { n: number };
  text: string;
};

describe("createEventEmitter", () => {
  it("delivers payloads to subscribers in order", () => {
    const bus = createEventEmitter<Events>();
    const calls: number[] = [];
    bus.on("ping", ({ n }) => calls.push(n));
    bus.on("ping", ({ n }) => calls.push(n * 10));
    bus.emit("ping", { n: 2 });
    expect(calls).toEqual([2, 20]);
  });

  it("unsubscribes via the returned function and via off()", () => {
    const bus = createEventEmitter<Events>();
    const a = vi.fn();
    const b = vi.fn();
    const offA = bus.on("text", a);
    bus.on("text", b);
    offA();
    bus.off("text", b);
    bus.emit("text", "x");
    expect(a).not.toHaveBeenCalled();
    expect(b).not.toHaveBeenCalled();
    expect(bus.listenerCount("text")).toBe(0);
  });

  it("once() fires a single time", () => {
    const bus = createEventEmitter<Events>();
    const fn = vi.fn();
    bus.once("text", fn);
    bus.emit("text", "a");
    bus.emit("text", "b");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("onAny() receives every event with its type", () => {
    const bus = createEventEmitter<Events>();
    const fn = vi.fn();
    const off = bus.onAny(fn);
    bus.emit("ping", { n: 1 });
    bus.emit("text", "t");
    expect(fn).toHaveBeenNthCalledWith(1, "ping", { n: 1 });
    expect(fn).toHaveBeenNthCalledWith(2, "text", "t");
    off();
    bus.emit("text", "u");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("isolates handler errors", () => {
    const bus = createEventEmitter<Events>();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const ok = vi.fn();
    bus.on("text", () => {
      throw new Error("boom");
    });
    bus.on("text", ok);
    expect(() => bus.emit("text", "x")).not.toThrow();
    expect(ok).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("allows unsubscribing during dispatch", () => {
    const bus = createEventEmitter<Events>();
    const second = vi.fn();
    let off = () => {};
    bus.on("text", () => off());
    off = bus.on("text", second);
    bus.emit("text", "x");
    // `second` was subscribed before emit; removing it mid-dispatch must not crash,
    // and since we iterate a snapshot it still receives the current event.
    expect(second).toHaveBeenCalledTimes(1);
    bus.emit("text", "y");
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("clear() removes handlers", () => {
    const bus = createEventEmitter<Events>();
    bus.on("text", vi.fn());
    bus.on("ping", vi.fn());
    bus.clear("text");
    expect(bus.listenerCount("text")).toBe(0);
    expect(bus.listenerCount("ping")).toBe(1);
    bus.clear();
    expect(bus.listenerCount("ping")).toBe(0);
  });
});
