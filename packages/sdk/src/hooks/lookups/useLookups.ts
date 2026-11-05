import { ApiServicePath } from "@game-library/types";
import { useLookup, type UseLookupOptions } from "./useLookup";

// Named shorthands for each lookup table. They are one-line bindings of
// `useLookup`, so they live together rather than in seven near-empty files.

export const usePlatforms = (options?: UseLookupOptions) => useLookup(ApiServicePath.Platforms, options);
export const useCategories = (options?: UseLookupOptions) => useLookup(ApiServicePath.Categories, options);
export const useCountries = (options?: UseLookupOptions) => useLookup(ApiServicePath.Countries, options);
export const useReleaseTypes = (options?: UseLookupOptions) => useLookup(ApiServicePath.ReleaseTypes, options);
export const useOwnerships = (options?: UseLookupOptions) => useLookup(ApiServicePath.Ownerships, options);
export const useGenres = (options?: UseLookupOptions) => useLookup(ApiServicePath.Genres, options);
export const useCompanies = (options?: UseLookupOptions) => useLookup(ApiServicePath.Companies, options);
