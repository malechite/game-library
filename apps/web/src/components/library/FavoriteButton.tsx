import { Icon } from "@game-library/cinder";
import { colors } from "@game-library/tokens";
import type { ApiLibraryItem } from "@game-library/types";

export interface FavoriteButtonProps {
  item: ApiLibraryItem;
  /** Called with the item when the heart is clicked. */
  onToggle: (item: ApiLibraryItem) => void;
  /** Class for the button (tiles and rows style it differently). */
  className?: string;
}

/** The heart on a tile or row: outlined when off, filled red once favorited. */
export const FavoriteButton = ({ item, onToggle, className }: FavoriteButtonProps) => (
  <button
    type="button"
    className={className}
    aria-pressed={item.isFavorite}
    aria-label={item.isFavorite ? `Remove ${item.title} from favorites` : `Add ${item.title} to favorites`}
    data-favorite={item.isFavorite ? "" : undefined}
    onClick={(event) => {
      // The tile itself is clickable; favoriting must not also open the editor.
      event.stopPropagation();
      onToggle(item);
    }}
  >
    <Icon
      type="Heart"
      weight={item.isFavorite ? "fill" : "regular"}
      color={item.isFavorite ? colors.ruby[400].oklch : undefined}
    />
  </button>
);
