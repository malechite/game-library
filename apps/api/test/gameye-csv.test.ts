import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { CollectionStatus } from "@game-library/types";
import {
  cleanText,
  parseExportDate,
  parseGameyeCsv,
  parseGenres,
  parseOptionalAmount,
  parsePrice,
  parseScore
} from "../src/import/gameye-csv";

const fixture = readFileSync(path.resolve(__dirname, "fixtures/collection.csv"), "utf8");

describe("GAMEYE CSV normalization", () => {
  it("turns the export's placeholders into null", () => {
    expect(cleanText("Missing Field")).toBeNull();
    expect(cleanText("?")).toBeNull();
    expect(cleanText("  ")).toBeNull();
    expect(cleanText(' "Konami" ')).toBe("Konami");
  });

  it("parses prices and treats negatives as unknown", () => {
    expect(parsePrice("17.48")).toBe(17.48);
    expect(parsePrice("-1.0")).toBeNull();
    expect(parsePrice(' "-1.0"')).toBeNull();
    expect(parsePrice("0.0")).toBe(0);
  });

  it("treats a zero price paid / sold as not recorded", () => {
    expect(parseOptionalAmount("0.0")).toBeNull();
    expect(parseOptionalAmount("45.50")).toBe(45.5);
  });

  it("keeps only real metacritic scores", () => {
    expect(parseScore("92")).toBe(92);
    expect(parseScore("0")).toBeNull();
    expect(parseScore("Missing Field")).toBeNull();
  });

  it("converts export dates to ISO", () => {
    expect(parseExportDate("Aug 6, 2022")).toBe("2022-08-06");
    expect(parseExportDate("Dec 23, 2023")).toBe("2023-12-23");
    expect(parseExportDate("not a date")).toBeNull();
  });

  it("splits genres but never company names", () => {
    expect(parseGenres("Action, Shoot 'em up")).toEqual(["Action", "Shoot 'em up"]);
    expect(parseGenres("Missing Field")).toEqual([]);
  });
});

describe("parseGameyeCsv", () => {
  const parsed = parseGameyeCsv(fixture);

  it("reads every data row and skips the one without a title", () => {
    expect(parsed.total).toBe(8);
    expect(parsed.rows).toHaveLength(7);
    expect(parsed.skipped).toEqual([{ line: 9, reason: "Missing title" }]);
  });

  it("keeps commas inside publisher and developer names", () => {
    const chrono = parsed.rows.find((row) => row.title === "Fixture Chrono Trigger")!;
    expect(chrono.publisher).toBe("Square Soft, Inc.");
    const goldeneye = parsed.rows.find((row) => row.title === "Fixture GoldenEye 007")!;
    expect(goldeneye.developer).toBe("Rare, Ltd.");
  });

  it("maps record type, ownership and amounts", () => {
    const wishlist = parsed.rows.find((row) => row.title === "Fixture Final Fantasy VII")!;
    expect(wishlist.status).toBe(CollectionStatus.Wishlist);
    expect(wishlist.value).toBeNull();
    expect(wishlist.priceNew).toBeNull();
    expect(wishlist.metacritic).toBeNull();
    expect(wishlist.genres).toEqual(["RPG", "Adventure"]);

    const secondCopy = parsed.rows.filter((row) => row.title === "Fixture Contra")[1]!;
    expect(secondCopy.ownership).toBe("CIB");
    expect(secondCopy.pricePaid).toBe(45.5);
    expect(secondCopy.notes).toBe("Second copy");
    expect(secondCopy.acquiredAt).toBe("2022-08-07");
  });

  it("leaves a blank country and missing companies empty", () => {
    const homebrew = parsed.rows.find((row) => row.title === "Fixture Homebrew")!;
    expect(homebrew.country).toBeNull();
    expect(homebrew.publisher).toBeNull();
    expect(homebrew.releaseType).toBe("Unlicensed");
  });

  it("rejects a file that isn't a GAMEYE export", () => {
    expect(() => parseGameyeCsv("name,email\nAda,ada@example.com\n")).toThrow(/GAMEYE export/);
  });
});
