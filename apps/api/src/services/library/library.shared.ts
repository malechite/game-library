import type { LibraryService } from "./library.class";

export type { LibraryItem, LibraryQuery } from "./library.class";

// Read-only: no create/patch/remove. `summary` is reached through GET /library/summary.
export const libraryMethods: Array<keyof LibraryService> = ["find", "get", "summary"];
