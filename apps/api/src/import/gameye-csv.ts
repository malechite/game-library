import { parse } from "csv-parse/sync";
import { BadRequest } from "@feathersjs/errors";
import { CollectionStatus } from "@game-library/types";

/**
 * Parser for the CSV export of the GAMEYE mobile app.
 *
 * Pure functions only (no database): turn the raw text into clean, typed rows
 * with the export's placeholder values ("Missing Field", -1.0, "?", 0) removed.
 */

/** One collection entry from the export, normalized. */
export interface GameyeRow {
  /** 1-based line number in the file (the header is line 1). */
  line: number;
  platform: string;
  category: string;
  status: CollectionStatus;
  title: string;
  country: string | null;
  releaseType: string | null;
  publisher: string | null;
  developer: string | null;
  genres: string[];
  /** ISO date (YYYY-MM-DD). */
  acquiredAt: string | null;
  ownership: string | null;
  priceLoose: number | null;
  priceCib: number | null;
  priceNew: number | null;
  /** Current value of this copy ("YourPrice"). */
  value: number | null;
  pricePaid: number | null;
  priceSold: number | null;
  itemCondition: string | null;
  boxCondition: string | null;
  manualCondition: string | null;
  otherCondition: string | null;
  notes: string | null;
  metacritic: number | null;
}

export interface ParsedCollection {
  /** Data rows in the file. */
  total: number;
  rows: GameyeRow[];
  skipped: Array<{ line: number; reason: string }>;
}

const REQUIRED_COLUMNS = ["Platform", "Category", "Title"];
const PLACEHOLDERS = new Set(["", "missing field", "?", "n/a"]);
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Trim, strip stray quotes, and turn the export's placeholders into null. */
export const cleanText = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const text = value.replace(/^[\s"]+|[\s"]+$/g, "");
  return PLACEHOLDERS.has(text.toLowerCase()) ? null : text;
};

/** Parse a price; the export uses -1.0 for "unknown". */
export const parsePrice = (value: unknown): number | null => {
  const text = cleanText(value);
  if (text === null) return null;
  const amount = Number(text.replace(/[$,]/g, ""));
  return Number.isFinite(amount) && amount >= 0 ? Math.round(amount * 100) / 100 : null;
};

/** Like `parsePrice`, but 0 also means "not recorded" (price paid / sold). */
export const parseOptionalAmount = (value: unknown): number | null => parsePrice(value) || null;

/** Metacritic score 1–100; the export uses 0 for "none". */
export const parseScore = (value: unknown): number | null => {
  const text = cleanText(value);
  if (text === null) return null;
  const score = Number(text);
  return Number.isInteger(score) && score > 0 && score <= 100 ? score : null;
};

/** "Aug 6, 2022" → "2022-08-06". */
export const parseExportDate = (value: unknown): string | null => {
  const text = cleanText(value);
  const match = text?.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2}), (\d{4})$/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1]!.toLowerCase());
  if (month < 0) return null;
  return `${match[3]}-${String(month + 1).padStart(2, "0")}-${match[2]!.padStart(2, "0")}`;
};

/**
 * Genres are the one multi-valued column ("Action, Adventure, Platformer").
 * Publisher and developer are NOT split — their names contain commas
 * ("Capcom USA, Inc.").
 */
export const parseGenres = (value: unknown): string[] => {
  const text = cleanText(value);
  if (text === null) return [];
  const genres = text
    .split(",")
    .map((genre) => cleanText(genre))
    .filter((genre): genre is string => genre !== null);
  return [...new Set(genres)];
};

const toRow = (record: Record<string, string>, line: number): GameyeRow | string => {
  const platform = cleanText(record.Platform);
  const title = cleanText(record.Title);
  if (!title) return "Missing title";
  if (!platform) return "Missing platform";

  return {
    line,
    platform,
    category: cleanText(record.Category) ?? "Games",
    status: cleanText(record.UserRecordType)?.toLowerCase() === "wishlist" ? CollectionStatus.Wishlist : CollectionStatus.Owned,
    title,
    country: cleanText(record.Country),
    releaseType: cleanText(record.ReleaseType),
    publisher: cleanText(record.Publisher),
    developer: cleanText(record.Developer),
    genres: parseGenres(record.Genre),
    acquiredAt: parseExportDate(record.CreatedAt),
    ownership: cleanText(record.Ownership),
    priceLoose: parsePrice(record.PriceLoose),
    priceCib: parsePrice(record.PriceCIB),
    priceNew: parsePrice(record.PriceNew),
    value: parsePrice(record.YourPrice),
    pricePaid: parseOptionalAmount(record.PricePaid),
    priceSold: parseOptionalAmount(record.PriceSold),
    itemCondition: cleanText(record.ItemCondition),
    boxCondition: cleanText(record.BoxCondition),
    manualCondition: cleanText(record.ManualCondition),
    otherCondition: cleanText(record.OtherCondition),
    notes: cleanText(record.Notes),
    metacritic: parseScore(record.metacritic)
  };
};

/**
 * Parse a GAMEYE collection export.
 *
 * @throws BadRequest when the text isn't CSV or lacks the expected columns.
 */
export const parseGameyeCsv = (csv: string): ParsedCollection => {
  let records: Array<Record<string, string>>;
  try {
    records = parse(csv, {
      columns: true,
      bom: true,
      skip_empty_lines: true,
      relax_quotes: true,
      relax_column_count: true,
      trim: true
    });
  } catch (error) {
    throw new BadRequest(`Could not read the CSV file: ${(error as Error).message}`);
  }

  const columns = records[0] ? Object.keys(records[0]) : [];
  const missing = REQUIRED_COLUMNS.filter((column) => !columns.includes(column));
  if (records.length > 0 && missing.length > 0) {
    throw new BadRequest(`This doesn't look like a GAMEYE export (missing column: ${missing.join(", ")})`);
  }

  const rows: GameyeRow[] = [];
  const skipped: ParsedCollection["skipped"] = [];
  records.forEach((record, index) => {
    const line = index + 2; // header is line 1
    const row = toRow(record, line);
    if (typeof row === "string") skipped.push({ line, reason: row });
    else rows.push(row);
  });

  return { total: records.length, rows, skipped };
};
