import type { HookContext } from "../declarations";

/** Before patch: stamp `updatedAt` so every edit is reflected on the row. */
export const touchUpdatedAt = async (context: HookContext): Promise<void> => {
  if (context.data && !Array.isArray(context.data)) {
    (context.data as Record<string, unknown>).updatedAt = new Date().toISOString();
  }
};
