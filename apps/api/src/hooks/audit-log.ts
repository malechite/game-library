import { ApiServicePath } from "@game-library/types";
import type { HookContext, NextFunction } from "../declarations";
import { logger } from "../logger";

/**
 * Around-all hook: record every external API action in the audit log.
 *
 * Runs the call first, then writes one `auditLogs` row capturing who acted,
 * which service/method ran, and the affected record. Only client-originated
 * calls (those with a `provider`) are logged — internal/system calls (the seed,
 * the JWT strategy's own user lookup, and the audit write itself) carry no
 * `provider` and are skipped, which also prevents the write from recursing.
 * Logging is best-effort: a failure here must never break the actual request.
 */
export const auditLog = async (context: HookContext, next: NextFunction): Promise<void> => {
  await next();

  // Only log real, client-originated calls; never the audit service itself.
  if (!context.params.provider) return;
  if (context.path === ApiServicePath.Audit) return;

  try {
    // On login the user isn't in params yet, but is on the result.
    const user = (context.params.user ?? (context.result as { user?: unknown } | undefined)?.user) as
      { id?: string; email?: string } | undefined;

    // get/patch/remove carry the id in context.id; create returns it on result.
    const targetId = (context.id as string | undefined) ?? (context.result as { id?: string } | undefined)?.id ?? null;

    await context.app.service(ApiServicePath.Audit).create(
      {
        userId: user?.id ?? null,
        userEmail: user?.email ?? null,
        service: context.path,
        method: context.method,
        targetId
      },
      {} // internal call → no provider → not itself logged
    );
  } catch (error) {
    logger.error("Failed to write audit log entry: %O", error);
  }
};
