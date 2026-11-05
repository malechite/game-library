/**
 * Minimal typed event emitter.
 *
 * `Events` maps event names to their payload types. Handlers are invoked synchronously
 * in subscription order. Errors thrown by a handler are isolated so one bad listener
 * cannot stop the others.
 *
 * @example
 * type Events = { "item:select": { id: string }; "view:change": { mode: string } };
 * const bus = createEventEmitter<Events>();
 * const off = bus.on("item:select", ({ id }) => console.log(id));
 * bus.emit("item:select", { id: "a" });
 * off();
 */
/** Any object type whose keys are event names and values are payload types. */
export type EventMap = object;

export type EventHandler<T> = (payload: T) => void;

export type AnyEventHandler<Events extends EventMap> = <K extends keyof Events>(type: K, payload: Events[K]) => void;

export interface EventEmitter<Events extends EventMap> {
  /** Subscribe to an event. Returns an unsubscribe function. */
  on<K extends keyof Events>(type: K, handler: EventHandler<Events[K]>): () => void;
  /** Subscribe to an event once. The handler is removed after its first call. */
  once<K extends keyof Events>(type: K, handler: EventHandler<Events[K]>): () => void;
  /** Unsubscribe a specific handler. */
  off<K extends keyof Events>(type: K, handler: EventHandler<Events[K]>): void;
  /** Subscribe to every event. Returns an unsubscribe function. */
  onAny(handler: AnyEventHandler<Events>): () => void;
  /** Emit an event to all subscribers. */
  emit<K extends keyof Events>(type: K, payload: Events[K]): void;
  /** Remove every subscriber (or every subscriber of one event). */
  clear(type?: keyof Events): void;
  /** Number of handlers registered for an event. */
  listenerCount(type: keyof Events): number;
}

export const createEventEmitter = <Events extends EventMap>(): EventEmitter<Events> => {
  const handlers = new Map<keyof Events, Set<EventHandler<any>>>();
  const anyHandlers = new Set<AnyEventHandler<Events>>();

  const safeCall = (fn: () => void) => {
    try {
      fn();
    } catch (error) {
      // Isolate listener failures so one bad subscriber can't break the rest.
      console.error("[EventEmitter] handler threw", error);
    }
  };

  const on: EventEmitter<Events>["on"] = (type, handler) => {
    let set = handlers.get(type);
    if (!set) {
      set = new Set();
      handlers.set(type, set);
    }
    set.add(handler);
    return () => off(type, handler);
  };

  const off: EventEmitter<Events>["off"] = (type, handler) => {
    const set = handlers.get(type);
    if (!set) return;
    set.delete(handler);
    if (set.size === 0) handlers.delete(type);
  };

  const once: EventEmitter<Events>["once"] = (type, handler) => {
    const wrapped: EventHandler<Events[typeof type]> = (payload) => {
      off(type, wrapped);
      handler(payload);
    };
    return on(type, wrapped);
  };

  const onAny: EventEmitter<Events>["onAny"] = (handler) => {
    anyHandlers.add(handler);
    return () => {
      anyHandlers.delete(handler);
    };
  };

  const emit: EventEmitter<Events>["emit"] = (type, payload) => {
    // Copy before iterating so handlers may unsubscribe during dispatch.
    const set = handlers.get(type);
    if (set) {
      for (const handler of Array.from(set)) safeCall(() => handler(payload));
    }
    for (const handler of Array.from(anyHandlers)) safeCall(() => handler(type, payload));
  };

  const clear: EventEmitter<Events>["clear"] = (type) => {
    if (type === undefined) {
      handlers.clear();
      anyHandlers.clear();
    } else {
      handlers.delete(type);
    }
  };

  const listenerCount: EventEmitter<Events>["listenerCount"] = (type) => handlers.get(type)?.size ?? 0;

  return { on, once, off, onAny, emit, clear, listenerCount };
};
