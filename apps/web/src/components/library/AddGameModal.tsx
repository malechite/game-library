import { useMemo, useState } from "react";
import { Badge, Input, Modal, Select, useModal } from "@game-library/cinder";
import { CATALOG_SEARCH_MIN_LENGTH, useCatalogSearch, useGenres, usePlatforms } from "@game-library/sdk";
import { Intent, type ApiCatalogResult, type ApiGame } from "@game-library/types";
import { useDebounce } from "../../hooks/useDebounce";
import type { GameFormPrefill } from "../../hooks/useGameForm";
import { GameCover } from "./GameCover";
import { GameFormModal } from "./GameFormModal";
import {
  searchRow,
  results,
  resultsHeading,
  result,
  resultThumb,
  resultText,
  resultTitle,
  resultsEmpty,
  mutedText
} from "./modals.css";

/** Select value standing for "any platform". */
const ANY_PLATFORM = "__any__";

const normalize = (text: string): string => text.toLowerCase().replace(/[^a-z0-9]+/g, "");

interface ResultRowProps {
  title: string;
  subtitle: string;
  coverUrl?: string | null;
  badge: string;
  onSelect: () => void;
}

const ResultRow = ({ title, subtitle, coverUrl, badge, onSelect }: ResultRowProps) => (
  <button type="button" className={result} onClick={onSelect}>
    <div className={resultThumb}>
      <GameCover url={coverUrl} title={title} compact />
    </div>
    <div className={resultText}>
      <span className={resultTitle}>{title}</span>
      <span className={mutedText}>{subtitle}</span>
    </div>
    <Badge variant="outline">{badge}</Badge>
  </button>
);

/**
 * First step of adding a game: search. Shows games already in our catalog
 * and, when the API has an external game database configured, matches from it.
 * Picking a result (or "Add manually") opens the game form prefilled.
 */
export const AddGameModal = () => {
  const { openModal, closeModal } = useModal();
  const [term, setTerm] = useState("");
  const [platformId, setPlatformId] = useState<string | undefined>();
  const debouncedTerm = useDebounce(term, 300);

  const { data: platforms = [] } = usePlatforms();
  const { data: genres = [] } = useGenres();
  const { data, isFetching } = useCatalogSearch(debouncedTerm, platformId);

  const platformNames = useMemo(() => new Map(platforms.map((platform) => [platform.id, platform.name])), [platforms]);

  const openForm = (props: { catalogGame?: ApiGame; prefill?: GameFormPrefill }) => openModal(<GameFormModal {...props} />);

  /** Turn an external result into starting values, mapping its names onto our lookups where they match. */
  const prefillFrom = (match: ApiCatalogResult): GameFormPrefill => {
    const wanted = new Set(match.genres.map(normalize));
    // Without a platform filter, take the one platform of ours the result clearly names.
    const namedPlatforms = platforms.filter((platform) =>
      match.platformNames.some((name) => normalize(platform.name).includes(normalize(name)))
    );
    const matchedPlatformId = platformId ?? (namedPlatforms.length === 1 ? namedPlatforms[0]!.id : undefined);

    return {
      title: match.title,
      ...(matchedPlatformId ? { platformId: matchedPlatformId } : {}),
      genreIds: genres.filter((genre) => wanted.has(normalize(genre.name))).map((genre) => genre.id),
      publisher: match.publisher ?? "",
      developer: match.developer ?? "",
      coverUrl: match.coverUrl ?? null,
      coverSourceUrl: match.coverUrl ?? null,
      externalSource: match.source,
      externalId: match.externalId
    };
  };

  const local = data?.local ?? [];
  const external = data?.external ?? [];
  const searching = debouncedTerm.trim().length >= CATALOG_SEARCH_MIN_LENGTH;
  const nothingFound = searching && !isFetching && local.length === 0 && external.length === 0;

  return (
    <Modal
      title="Add game"
      icon="Plus"
      intent={Intent.Primary}
      width={620}
      onClose={closeModal}
      buttons={[
        { label: "Cancel", variant: "outline", onClick: closeModal },
        {
          label: "Add manually",
          onClick: () => openForm({ prefill: { title: term.trim(), ...(platformId ? { platformId } : {}) } })
        }
      ]}
    >
      <div className={searchRow}>
        <Input
          autoFocus
          type="search"
          aria-label="Search for a game"
          placeholder="Search for a game…"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
        <Select
          value={platformId ?? ANY_PLATFORM}
          onValueChange={(value) => setPlatformId(value === ANY_PLATFORM ? undefined : value)}
          options={[
            { value: ANY_PLATFORM, label: "Any platform" },
            ...platforms.map((platform) => ({ value: platform.id, label: platform.name }))
          ]}
        />
      </div>

      <div className={results}>
        {!searching && <div className={resultsEmpty}>Type a title to search the catalog.</div>}

        {nothingFound && (
          <div className={resultsEmpty}>
            No matches for “{debouncedTerm.trim()}”.
            <span>Use “Add manually” to create it.</span>
          </div>
        )}

        {local.length > 0 && <div className={resultsHeading}>In the catalog</div>}
        {local.map((game) => (
          <ResultRow
            key={game.id}
            title={game.title}
            subtitle={platformNames.get(game.platformId) ?? "Unknown platform"}
            coverUrl={game.coverUrl}
            badge="Catalog"
            onSelect={() => openForm({ catalogGame: game })}
          />
        ))}

        {external.length > 0 && <div className={resultsHeading}>From {data?.provider?.toUpperCase()}</div>}
        {external.map((match) => (
          <ResultRow
            key={`${match.source}-${match.externalId}`}
            title={match.title}
            subtitle={[match.releaseYear, match.platformNames.slice(0, 3).join(", ")].filter(Boolean).join(" · ")}
            coverUrl={match.coverUrl}
            badge={match.source.toUpperCase()}
            onSelect={() => openForm({ prefill: prefillFrom(match) })}
          />
        ))}

        {searching && data && data.provider === null && (
          <div className={mutedText}>
            Searching the local catalog only. Add IGDB credentials to the API to search an external game database.
          </div>
        )}
      </div>
    </Modal>
  );
};
