import { useCallback } from "react";
import { toast, useConfirmationDialog, useModal } from "@game-library/cinder";
import { useDeleteCollectionItem } from "@game-library/sdk";
import type { ApiLibraryItem } from "@game-library/types";
import { AddGameModal } from "../components/library/AddGameModal";
import { GameFormModal } from "../components/library/GameFormModal";
import { ImportCollectionModal } from "../components/library/ImportCollectionModal";

export interface UseLibraryModalsResult {
  /** Open the "add game" search. */
  openAddGame: () => void;
  /** Open the editor for a library entry. */
  openEditGame: (item: ApiLibraryItem) => void;
  /** Open the CSV import dialog. */
  openImport: () => void;
  /** Ask for confirmation, then remove an entry from the library. */
  confirmDelete: (item: ApiLibraryItem) => void;
}

/** The collection page's dialogs, opened through cinder's modal system. */
export const useLibraryModals = (): UseLibraryModalsResult => {
  const { openModal } = useModal();
  const { openConfirmationDialog } = useConfirmationDialog();
  const deleteItem = useDeleteCollectionItem();

  const openAddGame = useCallback(() => openModal(<AddGameModal />), [openModal]);
  const openEditGame = useCallback((item: ApiLibraryItem) => openModal(<GameFormModal item={item} />), [openModal]);
  const openImport = useCallback(() => openModal(<ImportCollectionModal />), [openModal]);

  const confirmDelete = (item: ApiLibraryItem) =>
    openConfirmationDialog({
      title: "Remove from collection",
      message: `Remove “${item.title}” (${item.platformName}) from your collection? The game stays in the shared catalog.`,
      okText: "Remove",
      action: async () => {
        await deleteItem.mutateAsync(item.id);
        toast.success(`Removed ${item.title}`);
      }
    });

  return { openAddGame, openEditGame, openImport, confirmDelete };
};
