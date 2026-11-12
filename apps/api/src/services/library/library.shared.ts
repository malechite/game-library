import type { LibraryService } from "./library.class";

export type { LibraryItem, LibraryQuery } from "./library.class";

// Read-only: no create/patch/remove. `summary` and `titles` are reached through
// GET /library/summary and GET /library/titles.
export const libraryMethods: Array<keyof LibraryService> = ["find", "get", "summary", "titles"];
