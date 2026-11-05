"use client";
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import rest from "@feathersjs/rest-client";
import socketioClient from "@feathersjs/socketio-client";
import { io } from "socket.io-client";
import { createClient, type GameLibraryApiClient } from "../client";

export type GameLibraryApiTransport = "rest" | "socketio";

/** localStorage key the Feathers auth client persists the JWT under. */
export const JWT_STORAGE_KEY = "feathers-jwt";

interface GameLibraryApiContextValue {
  /** The Feathers client — `null` until the provider has mounted and created it. */
  client: GameLibraryApiClient | null;
  /** Base API URL — used for endpoints that aren't standard Feathers methods (asset upload). */
  host: string;
}

export interface GameLibraryApiProviderProps {
  /** API origin, e.g. `http://localhost:3030`. Empty string means same-origin. */
  host: string;
  /** `rest` (default) or `socketio` for realtime events. */
  transport?: GameLibraryApiTransport;
  /** Supply your own QueryClient (tests, custom defaults); otherwise one is created. */
  queryClient?: QueryClient;
}

export const GameLibraryApiContext = createContext<GameLibraryApiContextValue>({
  client: null,
  host: ""
});

const createDefaultQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false
      }
    }
  });

/**
 * Provides a typed Feathers client plus a TanStack QueryClient to the tree.
 * The client is created on mount (it needs `window`), so hooks guard on `client`.
 */
export const GameLibraryApiProvider = ({
  children,
  host,
  transport = "rest",
  queryClient: externalQueryClient
}: PropsWithChildren<GameLibraryApiProviderProps>) => {
  const [client, setClient] = useState<GameLibraryApiClient | null>(null);
  const [queryClient] = useState(() => externalQueryClient || createDefaultQueryClient());

  useEffect(() => {
    const connection =
      transport === "socketio"
        ? socketioClient(io(host || window.location.origin, { transports: ["websocket"] }))
        : rest(host).fetch(window.fetch.bind(window));
    setClient(createClient(connection, { storageKey: JWT_STORAGE_KEY }));
  }, [host, transport]);

  const value = useMemo(() => ({ client, host }), [client, host]);

  return (
    <QueryClientProvider client={queryClient}>
      <GameLibraryApiContext.Provider value={value}>{children}</GameLibraryApiContext.Provider>
    </QueryClientProvider>
  );
};

export const useGameLibraryApi = (): GameLibraryApiContextValue => useContext(GameLibraryApiContext);
