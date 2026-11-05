import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiServicePath, type ApiAsset } from "@game-library/types";
import { useGameLibraryApi } from "../../core/GameLibraryApiProvider";

export const useDeleteAsset = () => {
  const { client } = useGameLibraryApi();
  const queryClient = useQueryClient();

  return useMutation<ApiAsset, Error, string>({
    mutationFn: (id) => client!.service(ApiServicePath.Assets).remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    }
  });
};
