import type { KeyboardEvent } from "react";
import { Badge, Card, FadeIn } from "@game-library/cinder";
import { CollectionStatus, type ApiLibraryItem } from "@game-library/types";
import { formatCurrency } from "../../lib/format";
import { FavoriteButton } from "./FavoriteButton";
import { GameActionsMenu } from "./GameActionsMenu";
import { GameCover } from "./GameCover";
import {
  tile,
  tileInfo,
  tileTitle,
  tileMeta,
  tilePlatform,
  tileValue,
  tileBadge,
  tileControls,
  tileControl
} from "./GameTile.css";

/** Stagger step between neighbouring tiles, and the cap so late tiles don't lag. */
const STAGGER_MS = 28;
const MAX_STAGGERED = 12;

export interface GameTileProps {
  item: ApiLibraryItem;
  /** Position in the grid, used to stagger the fade-in. */
  index: number;
  onEdit: (item: ApiLibraryItem) => void;
  onDelete: (item: ApiLibraryItem) => void;
  onToggleFavorite: (item: ApiLibraryItem) => void;
}

/** A square library tile: cover art with the title, platform and value over it. */
export const GameTile = ({ item, index, onEdit, onDelete, onToggleFavorite }: GameTileProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Only when the tile itself has focus — not when a key is pressed inside its controls.
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onEdit(item);
    }
  };

  return (
    <FadeIn delay={Math.min(index, MAX_STAGGERED) * STAGGER_MS}>
      <Card
        className={tile}
        role="button"
        tabIndex={0}
        aria-label={`${item.title}, ${item.platformName}`}
        onClick={() => onEdit(item)}
        onKeyDown={handleKeyDown}
      >
        <GameCover url={item.coverUrl} title={item.title} />

        {item.status === CollectionStatus.Wishlist && (
          <Badge variant="secondary" className={tileBadge}>
            Wishlist
          </Badge>
        )}

        <div className={tileInfo}>
          <span className={tileTitle}>{item.title}</span>
          <span className={tileMeta}>
            <span className={tilePlatform}>{item.platformName}</span>
            {item.value !== null && item.value !== undefined && <span className={tileValue}>{formatCurrency(item.value)}</span>}
          </span>
        </div>

        <div className={tileControls}>
          <FavoriteButton item={item} onToggle={onToggleFavorite} className={tileControl} />
          <GameActionsMenu item={item} onEdit={onEdit} onDelete={onDelete} triggerClassName={tileControl} />
        </div>
      </Card>
    </FadeIn>
  );
};
