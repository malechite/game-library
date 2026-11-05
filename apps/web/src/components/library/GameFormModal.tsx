import { useId, type ReactNode } from "react";
import { Input, Modal, Select, Textarea, toast, useModal } from "@game-library/cinder";
import { useCompanies, useCountries, useGenres, useOwnerships, usePlatforms, useReleaseTypes } from "@game-library/sdk";
import { CollectionStatus, Intent, type ApiLookup } from "@game-library/types";
import { useGameForm, type UseGameFormOptions } from "../../hooks/useGameForm";
import { STATUS_OPTIONS } from "../../lib/libraryOptions";
import { ImageUpload } from "../ImageUpload";
import {
  formBody,
  formFields,
  field,
  fieldWide,
  fieldLabel,
  fullWidthSelect,
  sectionTitle,
  errorText,
  chips,
  chip,
  catalogSummary,
  catalogSummaryTitle,
  mutedText
} from "./modals.css";

/** Select value standing for "nothing chosen" (Select needs a concrete string). */
const NONE = "__none__";

const toOptions = (rows: ApiLookup[], { optional = false }: { optional?: boolean } = {}) => [
  ...(optional ? [{ value: NONE, label: "—" }] : []),
  ...rows.map((row) => ({ value: row.id, label: row.name }))
];

interface FormFieldProps {
  label: string;
  /** Span both columns. */
  wide?: boolean;
  htmlFor?: string;
  children: ReactNode;
}

const FormField = ({ label, wide, htmlFor, children }: FormFieldProps) => (
  <div className={wide ? `${field} ${fieldWide}` : field}>
    <label className={fieldLabel} htmlFor={htmlFor}>
      {label}
    </label>
    {children}
  </div>
);

export type GameFormModalProps = Omit<UseGameFormOptions, "onSaved">;

/**
 * Add or edit a library entry. The top half describes the catalog game (shared
 * by everyone who owns it); the bottom half is the user's own copy.
 */
export const GameFormModal = (props: GameFormModalProps) => {
  const { closeModal } = useModal();
  const id = useId();

  const form = useGameForm({
    ...props,
    onSaved: () => {
      closeModal();
      toast.success(props.item ? "Changes saved" : "Added to your collection");
    }
  });
  const { values, setValue } = form;

  const { data: platforms = [] } = usePlatforms();
  const { data: countries = [] } = useCountries();
  const { data: releaseTypes = [] } = useReleaseTypes();
  const { data: ownerships = [] } = useOwnerships();
  const { data: genres = [] } = useGenres();
  const { data: companies = [] } = useCompanies();

  const platformName = platforms.find((platform) => platform.id === values.platformId)?.name;

  return (
    <Modal
      title={form.isEditing ? "Edit game" : "Add game"}
      icon={form.isEditing ? "PencilSimple" : "Plus"}
      intent={Intent.Primary}
      width={760}
      okText={form.isEditing ? "Save changes" : "Add to collection"}
      okDisabled={!form.canSubmit}
      onOk={() => void form.submit()}
      onCancel={closeModal}
      onClose={closeModal}
    >
      <div className={formBody}>
        <ImageUpload
          value={values.coverUrl}
          size={176}
          placeholderIcon="GameController"
          alt={`${values.title || "Game"} cover art`}
          onUploaded={(url, asset) => {
            setValue("coverUrl", url);
            setValue("coverAssetId", asset.id);
          }}
        />

        <div className={formFields}>
          {form.catalogEditable ? (
            <>
              <FormField label="Title" wide htmlFor={`${id}-title`}>
                <Input
                  id={`${id}-title`}
                  value={values.title}
                  placeholder="Chrono Trigger"
                  autoFocus={!form.isEditing}
                  onChange={(event) => setValue("title", event.target.value)}
                />
              </FormField>

              <FormField label="Platform" wide>
                <Select
                  triggerClassName={fullWidthSelect}
                  placeholder="Choose a platform"
                  options={toOptions(platforms)}
                  value={values.platformId}
                  onValueChange={(value) => setValue("platformId", value)}
                />
              </FormField>

              <FormField label="Publisher" htmlFor={`${id}-publisher`}>
                <Input
                  id={`${id}-publisher`}
                  list={`${id}-companies`}
                  value={values.publisher}
                  onChange={(event) => setValue("publisher", event.target.value)}
                />
              </FormField>
              <FormField label="Developer" htmlFor={`${id}-developer`}>
                <Input
                  id={`${id}-developer`}
                  list={`${id}-companies`}
                  value={values.developer}
                  onChange={(event) => setValue("developer", event.target.value)}
                />
              </FormField>
              {/* Type-ahead over known companies; a new name is added on save. */}
              <datalist id={`${id}-companies`}>
                {companies.map((company) => (
                  <option key={company.id} value={company.name} />
                ))}
              </datalist>

              <FormField label="Country">
                <Select
                  triggerClassName={fullWidthSelect}
                  options={toOptions(countries, { optional: true })}
                  value={values.countryId || NONE}
                  onValueChange={(value) => setValue("countryId", value === NONE ? "" : value)}
                />
              </FormField>
              <FormField label="Release type">
                <Select
                  triggerClassName={fullWidthSelect}
                  options={toOptions(releaseTypes, { optional: true })}
                  value={values.releaseTypeId || NONE}
                  onValueChange={(value) => setValue("releaseTypeId", value === NONE ? "" : value)}
                />
              </FormField>

              <FormField label="Genres" wide>
                <div className={chips}>
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      className={chip}
                      aria-pressed={values.genreIds.includes(genre.id)}
                      onClick={() => form.toggleGenre(genre.id)}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </FormField>
            </>
          ) : (
            <div className={catalogSummary}>
              <span className={catalogSummaryTitle}>{values.title}</span>
              <span className={mutedText}>{platformName ?? "—"} · already in the catalog</span>
            </div>
          )}

          <div className={sectionTitle}>Your copy</div>

          <FormField label="Ownership">
            <Select
              triggerClassName={fullWidthSelect}
              options={toOptions(ownerships, { optional: true })}
              value={values.ownershipId || NONE}
              onValueChange={(value) => setValue("ownershipId", value === NONE ? "" : value)}
            />
          </FormField>
          <FormField label="Status">
            <Select
              triggerClassName={fullWidthSelect}
              options={STATUS_OPTIONS}
              value={values.status}
              onValueChange={(value) => setValue("status", value as CollectionStatus)}
            />
          </FormField>

          <FormField label="Current value (USD)" htmlFor={`${id}-value`}>
            <Input
              id={`${id}-value`}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={values.value}
              onChange={(event) => setValue("value", event.target.value)}
            />
          </FormField>
          <FormField label="Price paid (USD)" htmlFor={`${id}-paid`}>
            <Input
              id={`${id}-paid`}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={values.pricePaid}
              onChange={(event) => setValue("pricePaid", event.target.value)}
            />
          </FormField>

          <FormField label="Notes" wide htmlFor={`${id}-notes`}>
            <Textarea
              id={`${id}-notes`}
              rows={2}
              value={values.notes}
              onChange={(event) => setValue("notes", event.target.value)}
            />
          </FormField>

          {form.error && <div className={errorText}>{form.error}</div>}
        </div>
      </div>
    </Modal>
  );
};
