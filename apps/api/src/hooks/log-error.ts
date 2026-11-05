import type { HookContext, NextFunction } from "../declarations";
import { logger } from "../logger";

export const logError = async (context: HookContext, next: NextFunction) => {
  try {
    await next();
  } catch (error: unknown) {
    const err = error as { stack?: string; data?: unknown };
    logger.error(err.stack);
    if (err.data) {
      logger.error("Data: %O", err.data);
    }
    throw error;
  }
};
