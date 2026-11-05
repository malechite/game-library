import { Forbidden } from "@feathersjs/errors";
import type { HookContext } from "../declarations";

/**
 * Restrict find/get/patch/remove to rows owned by the authenticated user by
 * adding `{ [field]: user.id }` to the query. Internal calls (no `params.user`,
 * e.g. the seed script) are left untouched.
 */
export const limitToOwner =
  (field = "ownerId") =>
  async (context: HookContext): Promise<void> => {
    const user = context.params.user as { id?: string } | undefined;
    if (user?.id) {
      context.params.query = { ...context.params.query, [field]: user.id };
    }
  };

/** Force a data field to the authenticated user's id on create (no spoofing). */
export const setOwnerOnData =
  (field = "ownerId") =>
  async (context: HookContext): Promise<void> => {
    const user = context.params.user as { id?: string } | undefined;
    if (user?.id && context.data && !Array.isArray(context.data)) {
      (context.data as Record<string, unknown>)[field] = user.id;
    }
  };

/**
 * Non-super-admins may only get/patch/remove their own row (by id). Used on the
 * users service, where "ownership" is the row itself. Internal calls pass through.
 */
export const limitToSelf = async (context: HookContext): Promise<void> => {
  if (!context.params.provider) return;
  const user = context.params.user as { id?: string; isSuperAdmin?: boolean } | undefined;
  if (user?.isSuperAdmin) return;
  if (!user?.id || context.id !== user.id) {
    throw new Forbidden("You can only access your own account");
  }
};
