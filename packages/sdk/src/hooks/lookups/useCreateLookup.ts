import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiLookup, ApiLookupPath } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

export interface CreateLookupInput {
  path: ApiLookupPath;
  name: string;
}

/**
 * Add a value to a lookup table (a new platform, company, …). The API treats
 * this as "find or create", so it is safe to call with a name that may exist.
 */
export const useCreateLookup = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiLookup, Error, CreateLookupInput>({
    mutationFn: async ({ path, name }) => {
      if (!client) throw new Error("GameLibraryApi client not initialized");
      return client.service(path as typeof path).create({ name });
    },
    onSuccess: (_lookup, { path }) => {
      queryClient.invalidateQueries({ queryKey: [path] });
    }
  });
};
