import type { HookContext } from "../declarations";

/**
 * Serialize the given data fields to JSON strings before they hit Postgres.
 * node-postgres auto-stringifies plain objects for json/jsonb columns but turns
 * JS arrays into Postgres array literals — so jsonb array columns (e.g. record
 * attachments) must be stringified explicitly. Stringifying objects too is safe.
 */
export const stringifyJsonb =
  (...fields: string[]) =>
  async (context: HookContext): Promise<void> => {
    const apply = (item: Record<string, unknown>) => {
      for (const field of fields) {
        const value = item[field];
        if (value !== undefined && value !== null && typeof value !== "string") {
          item[field] = JSON.stringify(value);
        }
      }
    };
    if (Array.isArray(context.data)) {
      context.data.forEach((item) => apply(item as Record<string, unknown>));
    } else if (context.data) {
      apply(context.data as Record<string, unknown>);
    }
  };
