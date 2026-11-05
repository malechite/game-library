import { useRef, useState, type ChangeEvent } from "react";
import { Button, Icon, Modal, Switch, toast, useModal } from "@game-library/cinder";
import { useImportCollection } from "@game-library/sdk";
import { Intent, type ApiImportResult } from "@game-library/types";
import { dropZone, switchRow, stats, stat, statValue, mutedText, errorText } from "./modals.css";

interface StatProps {
  label: string;
  value: number;
}

const Stat = ({ label, value }: StatProps) => (
  <div className={stat}>
    <span className={statValue}>{value.toLocaleString()}</span>
    <span className={mutedText}>{label}</span>
  </div>
);

/**
 * Import a GAMEYE CSV export. Picks a file, optionally replaces the current
 * collection, then shows what the import did. Cover art is fetched by the
 * server afterwards, so tiles fill in over the next minute or two.
 */
export const ImportCollectionModal = () => {
  const { closeModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [replace, setReplace] = useState(true);
  const [result, setResult] = useState<ApiImportResult | null>(null);
  const importCollection = useImportCollection();

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
    importCollection.reset();
  };

  const handleImport = async () => {
    if (!file) return;
    try {
      const outcome = await importCollection.mutateAsync({ file, replace });
      setResult(outcome);
      toast.success(`Imported ${outcome.items.toLocaleString()} items`);
    } catch {
      // The failure is shown inline from the mutation's error state.
    }
  };

  if (result) {
    return (
      <Modal
        title="Import complete"
        icon="CheckCircle"
        intent={Intent.Success}
        width={520}
        onClose={closeModal}
        buttons={[{ label: "Done", onClick: closeModal }]}
      >
        <div className={stats}>
          <Stat label="Items imported" value={result.items} />
          <Stat label="New catalog games" value={result.gamesCreated} />
          <Stat label="Already in catalog" value={result.gamesExisting} />
        </div>
        {result.skipped.length > 0 && (
          <div className={mutedText}>
            {result.skipped.length} of {result.rows} rows were skipped (first: line {result.skipped[0]!.line},{" "}
            {result.skipped[0]!.reason.toLowerCase()}).
          </div>
        )}
        <div className={mutedText}>Cover art is being fetched in the background and will appear as it arrives.</div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Import collection"
      icon="UploadSimple"
      intent={Intent.Primary}
      width={520}
      okText={importCollection.isPending ? "Importing…" : "Import"}
      okDisabled={!file || importCollection.isPending}
      onOk={() => void handleImport()}
      onCancel={closeModal}
      onClose={closeModal}
    >
      <div className={dropZone}>
        <Icon type="FileCsv" size={3} />
        <span>{file ? file.name : "Choose the CSV exported from the GAMEYE app."}</span>
        <input ref={inputRef} type="file" accept=".csv,text/csv" onChange={handleFile} style={{ display: "none" }} />
        <Button variant="outline" onClick={() => inputRef.current?.click()}>
          {file ? "Choose another file" : "Choose file"}
        </Button>
      </div>

      <label className={switchRow}>
        <Switch checked={replace} onCheckedChange={setReplace} />
        <span>
          Replace my current collection
          <div className={mutedText}>
            {replace
              ? "Existing entries are removed first, so importing twice won't duplicate."
              : "Imported rows are added to what's already there."}
          </div>
        </span>
      </label>

      {importCollection.isError && <div className={errorText}>{importCollection.error.message}</div>}
    </Modal>
  );
};
