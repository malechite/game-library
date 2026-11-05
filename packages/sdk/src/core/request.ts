import type { GameLibraryApiClient } from "../client";

/**
 * Helpers for the API's custom HTTP routes — endpoints that aren't standard
 * Feathers service methods (CSV import, library summary, cover sync) and so
 * can't be reached through `client.service(...)`.
 */

type QueryValue = string | number | boolean | null | undefined | QueryValue[] | { [key: string]: QueryValue };

const appendQuery = (parts: string[], key: string, value: QueryValue): void => {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    value.forEach((entry, index) => appendQuery(parts, `${key}[${index}]`, entry));
  } else if (typeof value === "object") {
    for (const [child, entry] of Object.entries(value)) appendQuery(parts, `${key}[${child}]`, entry);
  } else {
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  }
};

/**
 * Serialize a Feathers-style query (nested operators) the way the REST
 * transport does, e.g. `{ title: { $ilike: "%a%" } }` → `title[$ilike]=%25a%25`.
 */
export const toQueryString = (query: Record<string, QueryValue> = {}): string => {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(query)) appendQuery(parts, key, value);
  return parts.length > 0 ? `?${parts.join("&")}` : "";
};

export interface ApiRequestOptions {
  method?: "GET" | "POST";
  query?: Record<string, QueryValue>;
  body?: unknown;
}

/** Call a custom route with the signed-in user's JWT; throws with the server's message on failure. */
export const apiRequest = async <T>(
  client: GameLibraryApiClient,
  host: string,
  path: string,
  { method = "GET", query, body }: ApiRequestOptions = {}
): Promise<T> => {
  const token = await client.authentication.getAccessToken();
  const res = await fetch(`${host}${path}${toQueryString(query)}`, {
    method,
    headers: {
      accept: "application/json",
      ...(body !== undefined ? { "content-type": "application/json" } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {})
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {})
  });

  const payload = (await res.json().catch(() => null)) as (T & { message?: string }) | null;
  if (!res.ok) throw new Error(payload?.message ?? `Request failed (${res.status})`);
  return payload as T;
};
