import { Skeleton } from "@game-library/cinder";
import type { ApiLibraryItem } from "@game-library/types";
import { GameTile } from "./GameTile";
import { grid, tileSkeleton } from "./GameTile.css";

export interface GameGridProps {
  items: ApiLibraryItem[];
  onEdit: (item: ApiLibraryItem) => void;
  onDelete: (item: ApiLibraryItem) => void;
  onToggleFavorite: (item: ApiLibraryItem) => void;
}

/** The tile view: a responsive grid of square game tiles. */
export const GameGrid = ({ items, onEdit, onDelete, onToggleFavorite }: GameGridProps) => (
  <div className={grid} data-slot="game-grid">
    {items.map((item, index) => (
      <GameTile key={item.id} item={item} index={index} onEdit={onEdit} onDelete={onDelete} onToggleFavorite={onToggleFavorite} />
    ))}
  </div>
);

export interface GameGridSkeletonProps {
  /** How many placeholder tiles to show. */
  count: number;
}

/** Placeholder grid shown while the first page loads. */
export const GameGridSkeleton = ({ count }: GameGridSkeletonProps) => (
  <div className={grid} aria-hidden>
    {Array.from({ length: count }, (_, index) => (
      <Skeleton key={index} className={tileSkeleton} />
    ))}
  </div>
);
