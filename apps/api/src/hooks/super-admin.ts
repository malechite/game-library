import { Forbidden } from "@feathersjs/errors";
import type { HookContext } from "../declarations";

/**
 * Restrict a method to super admins. Runs after `authenticate('jwt')`, so
 * `params.user` (the JWT entity, including `isSuperAdmin`) is populated.
 * Internal calls (no `provider`, e.g. seed/system) are left untouched.
 */
export const requireSuperAdmin = async (context: HookContext): Promise<void> => {
  if (!context.params.provider) return; // internal / system call
  const user = context.params.user as { isSuperAdmin?: boolean } | undefined;
  if (!user?.isSuperAdmin) {
    throw new Forbidden("Super admin access required");
  }
};

/**
 * Block a method from external (client) callers entirely — it may only be
 * invoked server-side. Used for methods that exist for internal bookkeeping
 * (e.g. writing an audit entry) but must never be reachable over HTTP.
 */
export const internalOnly = async (context: HookContext): Promise<void> => {
  if (context.params.provider) {
    throw new Forbidden("This action is not available");
  }
};
