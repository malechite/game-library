import { useState } from "react";
import { Icon } from "@game-library/cinder";
import { cover, coverBackdrop, coverImage, coverPlaceholder } from "./GameCover.css";

export interface GameCoverProps {
  /** Cover image URL; a placeholder is shown when absent or if it fails to load. */
  url?: string | null;
  /** Game title, used as the image's alt text. */
  title: string;
  /** Thumbnail mode: no inset around the art and a small placeholder icon. */
  compact?: boolean;
}

/** Box art that fills its container, fading in once the image has loaded. */
export const GameCover = ({ url, title, compact = false }: GameCoverProps) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(url) && !failed;

  return (
    <div className={cover} data-slot="game-cover">
      {showImage ? (
        <>
          <img className={coverBackdrop} src={url!} alt="" aria-hidden data-loaded={loaded ? "" : undefined} loading="lazy" />
          <img
            className={coverImage}
            src={url!}
            alt={`${title} cover art`}
            loading="lazy"
            data-loaded={loaded ? "" : undefined}
            data-compact={compact ? "" : undefined}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <div className={coverPlaceholder}>
          <Icon type="GameController" size={compact ? 1 : 3} weight="duotone" />
        </div>
      )}
    </div>
  );
};
