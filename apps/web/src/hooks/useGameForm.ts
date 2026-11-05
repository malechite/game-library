import { useCallback, useMemo, useState } from "react";
import {
  useCompanies,
  useCreateCollectionItem,
  useCreateLookup,
  useUpdateCollectionItem,
  useUpdateGame,
  type GameData
} from "@game-library/sdk";
import { ApiServicePath, CollectionStatus, type ApiGame, type ApiLibraryItem } from "@game-library/types";
import { todayIsoDate } from "../lib/format";

/** Form state. Select fields hold an id or "" for "none"; amounts are kept as typed text. */
export interface GameFormValues {
  title: string;
  platformId: string;
  countryId: string;
  releaseTypeId: string;
  publisher: string;
  developer: string;
  genreIds: string[];
  coverUrl: string | null;
  coverAssetId: string | null;
  ownershipId: string;
  status: CollectionStatus;
  value: string;
  pricePaid: string;
  notes: string;
}

/** Values to start a new entry from (e.g. a pick from the external catalog search). */
export interface GameFormPrefill extends Partial<GameFormValues> {
  /** Where the server should fetch the cover from (an allowed cover host). */
  coverSourceUrl?: string | null;
  externalSource?: string | null;
  externalId?: string | null;
}

export interface UseGameFormOptions {
  /** Edit this library entry (the copy and its catalog game). Omit to add a new one. */
  item?: ApiLibraryItem;
  /** Add a copy of a game already in the catalog; its catalog fields are not editable. */
  catalogGame?: ApiGame;
  /** Starting values for a brand-new entry. */
  prefill?: GameFormPrefill;
  /** Called after a successful save. */
  onSaved?: () => void;
}

export interface UseGameFormResult {
  values: GameFormValues;
  /** Update one field. */
  setValue: <K extends keyof GameFormValues>(key: K, value: GameFormValues[K]) => void;
  /** Add or remove a genre. */
  toggleGenre: (genreId: string) => void;
  isEditing: boolean;
  /** True when the catalog fields (title, platform, …) can be changed. */
  catalogEditable: boolean;
  canSubmit: boolean;
  isSubmitting: boolean;
  /** Message of the last failed save, if any. */
  error: string | null;
  submit: () => Promise<void>;
}

const CATALOG_KEYS = [
  "title",
  "platformId",
  "countryId",
  "releaseTypeId",
  "publisher",
  "developer",
  "genreIds",
  "coverUrl"
] as const satisfies ReadonlyArray<keyof GameFormValues>;

const amountText = (value: number | null | undefined): string => (value === null || value === undefined ? "" : String(value));
const parseAmount = (text: string): number | null => {
  const value = Number(text);
  return text.trim() !== "" && Number.isFinite(value) && value >= 0 ? value : null;
};

const initialValues = ({ item, catalogGame, prefill }: UseGameFormOptions): GameFormValues => ({
  title: item?.title ?? catalogGame?.title ?? "",
  platformId: item?.platformId ?? catalogGame?.platformId ?? "",
  countryId: item?.countryId ?? catalogGame?.countryId ?? "",
  releaseTypeId: item?.releaseTypeId ?? catalogGame?.releaseTypeId ?? "",
  publisher: item?.publisherName ?? "",
  developer: item?.developerName ?? "",
  genreIds: item?.genreIds ?? catalogGame?.genreIds ?? [],
  coverUrl: item?.coverUrl ?? catalogGame?.coverUrl ?? null,
  coverAssetId: null,
  ownershipId: item?.ownershipId ?? "",
  status: item?.status ?? CollectionStatus.Owned,
  value: amountText(item?.value),
  pricePaid: amountText(item?.pricePaid),
  notes: item?.notes ?? "",
  ...prefill
});

/**
 * State and submit logic for the add/edit game form. One form covers three
 * cases: editing an entry, adding a copy of a catalog game, and adding a
 * brand-new game (which creates the catalog entry and the copy together).
 *
 * @example
 * const form = useGameForm({ item, onSaved: closeModal });
 * <Input value={form.values.title} onChange={(e) => form.setValue("title", e.target.value)} />
 * <Button disabled={!form.canSubmit} onClick={() => void form.submit()}>Save</Button>
 */
export const useGameForm = (options: UseGameFormOptions): UseGameFormResult => {
  const { item, catalogGame, prefill, onSaved } = options;
  const [initial] = useState(() => initialValues(options));
  const [values, setValues] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  const { data: companies = [] } = useCompanies();
  const createLookup = useCreateLookup();
  const createItem = useCreateCollectionItem();
  const updateItem = useUpdateCollectionItem();
  const updateGame = useUpdateGame();

  const isEditing = Boolean(item);
  const catalogEditable = !catalogGame;
  const isSubmitting = createLookup.isPending || createItem.isPending || updateItem.isPending || updateGame.isPending;

  const setValue = useCallback<UseGameFormResult["setValue"]>((key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
  }, []);

  const toggleGenre = useCallback((genreId: string) => {
    setValues((current) => ({
      ...current,
      genreIds: current.genreIds.includes(genreId)
        ? current.genreIds.filter((id) => id !== genreId)
        : [...current.genreIds, genreId]
    }));
  }, []);

  const companyIds = useMemo(() => new Map(companies.map((company) => [company.name.toLowerCase(), company.id])), [companies]);

  /** Publisher/developer are typed as names: reuse the matching company or add it. */
  const resolveCompany = async (name: string): Promise<string | null> => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const known = companyIds.get(trimmed.toLowerCase());
    if (known) return known;
    return (await createLookup.mutateAsync({ path: ApiServicePath.Companies, name: trimmed })).id;
  };

  // No category: the library is games-only and the API files new entries under "Games".
  const catalogData = async (): Promise<GameData> => ({
    title: values.title.trim(),
    platformId: values.platformId,
    countryId: values.countryId || null,
    releaseTypeId: values.releaseTypeId || null,
    publisherId: await resolveCompany(values.publisher),
    developerId: await resolveCompany(values.developer),
    genreIds: values.genreIds,
    // Only send cover fields the user actually changed (an upload), so the
    // server-resolved artwork isn't overwritten.
    ...(values.coverUrl !== initial.coverUrl ? { coverUrl: values.coverUrl, coverAssetId: values.coverAssetId } : {})
  });

  const copyData = () => ({
    ownershipId: values.ownershipId || null,
    status: values.status,
    value: parseAmount(values.value),
    pricePaid: parseAmount(values.pricePaid),
    notes: values.notes.trim() || null
  });

  const canSubmit = !isSubmitting && values.title.trim().length > 0 && Boolean(values.platformId);

  const submit = async () => {
    if (!canSubmit) return;
    setError(null);

    try {
      if (item) {
        // Touch the shared catalog entry only if one of its fields really changed.
        const catalogChanged = CATALOG_KEYS.some((key) => JSON.stringify(values[key]) !== JSON.stringify(initial[key]));
        if (catalogChanged) await updateGame.mutateAsync({ id: item.gameId, data: await catalogData() });
        await updateItem.mutateAsync({ id: item.id, data: copyData() });
      } else if (catalogGame) {
        await createItem.mutateAsync({ gameId: catalogGame.id, ...copyData(), acquiredAt: todayIsoDate() });
      } else {
        await createItem.mutateAsync({
          game: {
            ...(await catalogData()),
            ...(prefill?.coverSourceUrl ? { coverSourceUrl: prefill.coverSourceUrl } : {}),
            ...(prefill?.externalSource ? { externalSource: prefill.externalSource, externalId: prefill.externalId } : {})
          },
          ...copyData(),
          acquiredAt: todayIsoDate()
        });
      }
      onSaved?.();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save the game");
    }
  };

  return { values, setValue, toggleGenre, isEditing, catalogEditable, canSubmit, isSubmitting, error, submit };
};
