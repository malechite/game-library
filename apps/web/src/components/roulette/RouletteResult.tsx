import { Button } from "@game-library/cinder";
import type { ApiLibraryTitle } from "@game-library/types";
import { GameCover } from "../library/GameCover";
import { caption, result, resultActions, resultCover, resultTitle } from "./roulette.css";

export interface RouletteResultProps {
  /** The game the roulette landed on. */
  winner: ApiLibraryTitle;
  /** Its cover art, once known; a placeholder is shown without one. */
  coverUrl?: string | null;
  /** Its genres, shown under the platform when known. */
  genres?: string[];
  /** True while the pick is being logged. */
  saving?: boolean;
  /** Called when the user takes this game. */
  onPlay: () => void;
  /** Called when the user passes on this game and wants another spin. */
  onSpinAgain: () => void;
}

/** The landing: the chosen game with its cover art, and the choice to play it or spin again. */
export const RouletteResult = ({ winner, coverUrl, genres = [], saving = false, onPlay, onSpinAgain }: RouletteResultProps) => (
  <div className={result} data-slot="roulette-result">
    <div className={resultCover}>
      {/* Keyed by URL: the cover keeps its own loaded/failed state, which must not carry over to another image. */}
      <GameCover key={coverUrl ?? "none"} url={coverUrl} title={winner.title} />
    </div>
    <span className={resultTitle}>{winner.title}</span>
    <span className={caption}>{[winner.platformName, ...genres].join(" · ")}</span>
    <div className={resultActions}>
      <Button size="lg" icon="Play" loading={saving} onClick={onPlay}>
        Play this
      </Button>
      <Button size="lg" variant="outline" icon="ArrowsClockwise" disabled={saving} onClick={onSpinAgain}>
        Spin again
      </Button>
    </div>
    <span className={caption}>Spinning again takes this game out of the pool for now.</span>
  </div>
);
