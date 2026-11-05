import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Icon
} from "@game-library/cinder";
import type { ApiLibraryItem } from "@game-library/types";

export interface GameActionsMenuProps {
  item: ApiLibraryItem;
  onEdit: (item: ApiLibraryItem) => void;
  onDelete: (item: ApiLibraryItem) => void;
  /** Class for the trigger button (tiles and rows style it differently). */
  triggerClassName?: string;
}

/** The "⋮" menu on a tile or row: edit or delete that entry. */
export const GameActionsMenu = ({ item, onEdit, onDelete, triggerClassName }: GameActionsMenuProps) => (
  <DropdownMenuRoot>
    <DropdownMenuTrigger
      aria-label={`Actions for ${item.title}`}
      className={triggerClassName}
      // The tile itself is clickable; opening the menu must not also open the editor.
      onClick={(event) => event.stopPropagation()}
    >
      <Icon type="DotsThreeVertical" weight="bold" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" sideOffset={6}>
      <DropdownMenuItem
        onClick={(event) => {
          event.stopPropagation();
          onEdit(item);
        }}
      >
        <Icon type="PencilSimple" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        variant="destructive"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(item);
        }}
      >
        <Icon type="Trash" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
);
