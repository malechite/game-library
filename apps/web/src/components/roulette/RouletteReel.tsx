import type { ApiLibraryTitle } from "@game-library/types";
import { caption, reel, reelTitle } from "./roulette.css";

export interface RouletteReelProps {
  /** The title passing by right now. */
  entry: ApiLibraryTitle | null;
}

/**
 * The spinning reel: names only, never cover art. Hidden from assistive tech —
 * dozens of titles a second is noise; the page announces the landing instead.
 */
export const RouletteReel = ({ entry }: RouletteReelProps) => (
  <div className={reel} aria-hidden data-slot="roulette-reel">
    {/* Keyed by game so each new title replays the tick animation. */}
    <span key={entry?.id} className={reelTitle}>
      {entry?.title}
    </span>
    <span className={caption}>{entry?.platformName}</span>
  </div>
);
