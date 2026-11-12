import { Button } from "@game-library/cinder";
import type { ApiRoulettePick } from "@game-library/types";
import { formatDateTime } from "../../lib/format";
import { GameCover } from "../library/GameCover";
import {
  caption,
  history,
  historyHeading,
  historyList,
  historyMeta,
  historyRow,
  historyText,
  historyThumb,
  historyTitle
} from "./roulette.css";

export interface RouletteHistoryProps {
  /** The most recent picks, newest first. */
  picks: ApiRoulettePick[];
  /** How many picks exist in all (the list may show fewer). */
  total: number;
  /** Called with a pick when its remove button is pressed. */
  onRemove: (pick: ApiRoulettePick) => void;
}

/** "Recent picks": the games the user chose to play from the roulette. */
export const RouletteHistory = ({ picks, total, onRemove }: RouletteHistoryProps) => (
  <section className={history} aria-label="Recent picks" data-slot="roulette-history">
    <span className={historyHeading}>
      Recent picks
      {total > picks.length && (
        <span className={caption}>
          latest {picks.length} of {total.toLocaleString()}
        </span>
      )}
    </span>
    {picks.length === 0 ? (
      <span className={caption}>Games you choose to play will show up here.</span>
    ) : (
      <ul className={historyList}>
        {picks.map((pick) => (
          <li key={pick.id} className={historyRow}>
            <div className={historyThumb}>
              <GameCover url={pick.coverUrl} title={pick.title} compact />
            </div>
            <div className={historyText}>
              <span className={historyTitle}>{pick.title}</span>
              <span className={historyMeta}>
                {pick.platformName} · {formatDateTime(pick.createdAt)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              icon="Trash"
              aria-label={`Remove ${pick.title} from recent picks`}
              onClick={() => onRemove(pick)}
            />
          </li>
        ))}
      </ul>
    )}
  </section>
);
