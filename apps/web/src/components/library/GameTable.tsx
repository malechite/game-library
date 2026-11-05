import { Badge, FadeIn, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@game-library/cinder";
import { CollectionStatus, type ApiLibraryItem } from "@game-library/types";
import { formatCurrency, formatDate } from "../../lib/format";
import { FavoriteButton } from "./FavoriteButton";
import { GameActionsMenu } from "./GameActionsMenu";
import { GameCover } from "./GameCover";
import { row, thumb, titleCell, titleText, muted, numeric, genres, rowControls, rowActions } from "./GameTable.css";

/** Genres shown per row before collapsing the rest into "+N". */
const MAX_GENRES = 2;

export interface GameTableProps {
  items: ApiLibraryItem[];
  onEdit: (item: ApiLibraryItem) => void;
  onDelete: (item: ApiLibraryItem) => void;
  onToggleFavorite: (item: ApiLibraryItem) => void;
}

/** The list view: one row per copy with its key details. */
export const GameTable = ({ items, onEdit, onDelete, onToggleFavorite }: GameTableProps) => (
  <FadeIn>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>Genres</TableHead>
          <TableHead>Ownership</TableHead>
          <TableHead className={numeric}>Value</TableHead>
          <TableHead>Added</TableHead>
          <TableHead aria-label="Actions" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className={row} onClick={() => onEdit(item)}>
            <TableCell>
              <div className={titleCell}>
                <div className={thumb}>
                  <GameCover url={item.coverUrl} title={item.title} compact />
                </div>
                <span className={titleText}>{item.title}</span>
                {item.status === CollectionStatus.Wishlist && <Badge variant="secondary">Wishlist</Badge>}
              </div>
            </TableCell>
            <TableCell>{item.platformName}</TableCell>
            <TableCell>
              <div className={genres}>
                {item.genreNames.slice(0, MAX_GENRES).map((genre) => (
                  <Badge key={genre} variant="outline">
                    {genre}
                  </Badge>
                ))}
                {item.genreNames.length > MAX_GENRES && <span className={muted}>+{item.genreNames.length - MAX_GENRES}</span>}
              </div>
            </TableCell>
            <TableCell className={muted}>{item.ownershipName ?? "—"}</TableCell>
            <TableCell className={numeric}>{formatCurrency(item.value)}</TableCell>
            <TableCell className={muted} style={{ whiteSpace: "nowrap" }}>
              {formatDate(item.acquiredAt)}
            </TableCell>
            <TableCell style={{ width: 1 }}>
              <div className={rowControls}>
                <FavoriteButton item={item} onToggle={onToggleFavorite} className={rowActions} />
                <GameActionsMenu item={item} onEdit={onEdit} onDelete={onDelete} triggerClassName={rowActions} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </FadeIn>
);
