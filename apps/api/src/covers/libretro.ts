import { logger } from "../logger";

/**
 * Box art from the libretro thumbnail server — free, no API key.
 *
 * Files are named after No-Intro / Redump releases, e.g.
 *   Nintendo - Nintendo Entertainment System/Named_Boxarts/Contra (USA).png
 * so finding a cover means matching our title against a system's file listing.
 */

export const LIBRETRO_HOST = "thumbnails.libretro.com";

/** Our platform name → libretro system directory. Platforms not listed have no libretro art. */
export const LIBRETRO_SYSTEMS: Record<string, string> = {
  "NES/Famicom": "Nintendo - Nintendo Entertainment System",
  "SNES/Super Famicom": "Nintendo - Super Nintendo Entertainment System",
  "Nintendo 64": "Nintendo - Nintendo 64",
  "Nintendo GameCube": "Nintendo - GameCube",
  "Nintendo Wii": "Nintendo - Wii",
  "Nintendo Wii U": "Nintendo - Wii U",
  "Nintendo Game Boy": "Nintendo - Game Boy",
  "Nintendo Game Boy Color": "Nintendo - Game Boy Color",
  "Nintendo Game Boy Advance": "Nintendo - Game Boy Advance",
  "Nintendo DS": "Nintendo - Nintendo DS",
  "Nintendo 3DS": "Nintendo - Nintendo 3DS",
  "Nintendo Virtual Boy": "Nintendo - Virtual Boy",
  "Sony PlayStation": "Sony - PlayStation",
  "Sony PlayStation 2": "Sony - PlayStation 2",
  "Sony PlayStation 3": "Sony - PlayStation 3",
  "Sony PlayStation 4": "Sony - PlayStation 4",
  "Sony PSP": "Sony - PlayStation Portable",
  "Sony PS Vita": "Sony - PlayStation Vita",
  "Sega Genesis/Mega Drive": "Sega - Mega Drive - Genesis",
  "Sega Master System": "Sega - Master System - Mark III",
  "Sega Saturn": "Sega - Saturn",
  "Sega Dreamcast": "Sega - Dreamcast",
  "Sega CD": "Sega - Mega-CD - Sega CD",
  "Sega 32X": "Sega - 32X",
  "Sega Game Gear": "Sega - Game Gear",
  "Atari 2600": "Atari - 2600",
  "Atari Jaguar": "Atari - Jaguar",
  "TurboGrafx 16": "NEC - PC Engine - TurboGrafx 16",
  Intellivision: "Mattel - Intellivision",
  "Microsoft Xbox": "Microsoft - Xbox",
  "Microsoft Xbox 360": "Microsoft - Xbox 360",
  Vectrex: "GCE - Vectrex"
};

/** Words that carry no identity for matching ("The Legend of…" vs "Legend of…, The"). */
const STOP_WORDS = new Set(["the", "a", "an", "and"]);

/**
 * Reduce a title or file name to a comparable key: no region/revision tags,
 * no punctuation, no articles, lowercase ASCII.
 *
 * @example
 * normalizeTitle("Legend of Zelda, The (USA) (Rev 1)") // "legend of zelda"
 * normalizeTitle("Tetris & Dr. Mario")                 // "tetris dr mario"
 */
export const normalizeTitle = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\([^)]*\)|\[[^\]]*\]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((word) => word && !STOP_WORDS.has(word))
    .join(" ");

/** Our country name → the region tag libretro files carry. */
const REGION_TAGS: Record<string, string> = {
  "United States of America": "USA",
  Japan: "Japan",
  "United Kingdom": "Europe",
  World: "World"
};

const UNWANTED_TAGS = /\((beta|proto|demo|sample|pirate|kiosk)[^)]*\)/i;

/** Score how well a libretro file matches a title; 0 means "not a match". */
const scoreFile = (key: string, file: string, country?: string | null): number => {
  const base = normalizeTitle(file.replace(/\.png$/i, ""));
  let score: number;
  if (base === key) score = 100;
  // The file has a longer name (e.g. a subtitle we don't carry).
  else if (base.startsWith(`${key} `)) score = 60 - (base.length - key.length) * 0.1;
  // Our title is longer than the file's.
  else if (key.startsWith(`${base} `) && base.length >= 4) score = 50 - (key.length - base.length) * 0.1;
  else return 0;

  // Region tags look like "(USA)" or "(USA, Europe)"; match whole entries so
  // "(Capcom USA)" doesn't count as a region.
  const hasRegion = (region: string): boolean => new RegExp(`\\((?:[^)]*, )?${region}(?:, [^)]*)?\\)`).test(file);
  const wanted = country ? REGION_TAGS[country] : undefined;
  if (wanted && hasRegion(wanted)) score += 10;
  else if (hasRegion("USA") || hasRegion("World")) score += 5;

  if (UNWANTED_TAGS.test(file)) score -= 30;
  if (/\(Disc [2-9]\)/i.test(file)) score -= 3;

  // Prefer the plain release: every extra tag — "(Rev 1)", "(Virtual Console)",
  // "(PlayChoice-10)" — marks a variant whose art may differ from the retail box.
  const tagCount = (file.match(/\([^)]*\)/g) ?? []).length;
  score -= Math.max(0, tagCount - 1) * 2;

  return score;
};

/** Pick the best box art file for a title from a system's file listing, or null. */
export const pickBoxart = (title: string, files: string[], country?: string | null): string | null => {
  const key = normalizeTitle(title);
  if (!key) return null;

  let best: { file: string; score: number } | null = null;
  for (const file of files) {
    const score = scoreFile(key, file, country);
    if (score > 0 && (!best || score > best.score)) best = { file, score };
  }
  return best?.file ?? null;
};

const decodeHtml = (value: string): string =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Extract the `.png` file names from a libretro directory listing page. */
export const parseListing = (html: string): string[] => {
  const files: string[] = [];
  for (const match of html.matchAll(/href="([^"?/][^"]*\.png)"/gi)) {
    try {
      files.push(decodeHtml(decodeURIComponent(match[1]!)));
    } catch {
      // Malformed percent-encoding in one entry — skip it, keep the rest.
    }
  }
  return files;
};

/** Looks up box art URLs, caching each system's file listing for the life of the process. */
export class LibretroCovers {
  private listings = new Map<string, Promise<string[]>>();

  private loadListing(system: string): Promise<string[]> {
    let listing = this.listings.get(system);
    if (!listing) {
      listing = fetch(`https://${LIBRETRO_HOST}/${encodeURIComponent(system)}/Named_Boxarts/`, {
        signal: AbortSignal.timeout(60_000)
      })
        .then(async (res) => (res.ok ? parseListing(await res.text()) : []))
        .catch((error) => {
          logger.warn(`libretro listing failed for "${system}": %O`, error);
          // Don't cache a failure — let the next lookup retry.
          this.listings.delete(system);
          return [];
        });
      this.listings.set(system, listing);
    }
    return listing;
  }

  /** URL of the best-matching box art, or null when the platform or title isn't covered. */
  async findCoverUrl(title: string, platformName: string, countryName?: string | null): Promise<string | null> {
    const system = LIBRETRO_SYSTEMS[platformName];
    if (!system) return null;

    const file = pickBoxart(title, await this.loadListing(system), countryName);
    if (!file) return null;

    return `https://${LIBRETRO_HOST}/${encodeURIComponent(system)}/Named_Boxarts/${encodeURIComponent(file)}`;
  }
}
