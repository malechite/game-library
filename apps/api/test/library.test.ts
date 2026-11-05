import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { ApiImportResult, ApiLibraryItem, ApiLibrarySummary, ApiLookup } from "@game-library/types";
import { apiFor, app, createTestUser, removeTestUsers, startApp, stopApp, type TestUser } from "./helpers";

const csv = readFileSync(path.resolve(__dirname, "fixtures/collection.csv"), "utf8");

interface Page<T> {
  total: number;
  limit: number;
  skip: number;
  data: T[];
}

const LOOKUP_TABLES = ["platforms", "categories", "countries", "releaseTypes", "ownerships", "genres", "companies"];

describe("collection import and library", () => {
  let owner: TestUser;
  let other: TestUser;
  let api: ReturnType<typeof apiFor>;
  let otherApi: ReturnType<typeof apiFor>;

  const lookupId = async (pathName: string, name: string): Promise<string> => {
    const { body } = await api<Page<ApiLookup>>(`/${pathName}?name=${encodeURIComponent(name)}`);
    return body.data[0]!.id;
  };

  beforeAll(async () => {
    await startApp();
    owner = await createTestUser("owner");
    other = await createTestUser("other");
    api = apiFor(owner);
    otherApi = apiFor(other);
  });

  afterAll(async () => {
    await removeTestUsers([owner, other]);
    await stopApp();
  });

  it("imports a GAMEYE export for the signed-in user", async () => {
    const { status, body } = await api<ApiImportResult>("/collection-items/import", { method: "POST", body: { csv } });

    expect(status).toBe(201);
    expect(body.rows).toBe(8);
    expect(body.items).toBe(6);
    // The library is games-only: the console row is reported, not imported.
    expect(body.skipped).toEqual([
      { line: 7, reason: "Not a game (Systems)" },
      { line: 9, reason: "Missing title" }
    ]);
    // Two of the six rows are copies of the same release → five catalog games.
    expect(body.gamesCreated + body.gamesExisting).toBe(5);
  });

  it("imports games only, never hardware", async () => {
    const { body } = await api<Page<ApiLibraryItem>>("/library");
    expect(body.data.every((item) => item.categoryName === "Games")).toBe(true);
    expect(body.data.map((item) => item.title)).not.toContain("Fixture N64 System");
  });

  it("never duplicates a value in a lookup table", async () => {
    const db = app.get("postgresqlClient");
    for (const table of LOOKUP_TABLES) {
      const duplicates = await db(table).select("name").groupBy("name").havingRaw("count(*) > 1");
      expect(duplicates, `${table} has duplicate names`).toEqual([]);
    }
    // "Missing Field" is a placeholder in the export, never a real value.
    for (const table of ["genres", "companies"]) {
      expect(await db(table).where({ name: "Missing Field" })).toEqual([]);
    }
  });

  it("requires authentication", async () => {
    const res = await fetch(`http://localhost:${app.get("port")}/library`, { headers: { accept: "application/json" } });
    expect(res.status).toBe(401);
  });

  it("lists the collection with game and lookup data joined in", async () => {
    const { body } = await api<Page<ApiLibraryItem>>("/library");
    expect(body.total).toBe(6);
    // A page holds 100 items unless the client asks for fewer.
    expect(body.limit).toBe(100);

    const chrono = body.data.find((item) => item.title === "Fixture Chrono Trigger")!;
    expect(chrono).toMatchObject({
      platformName: "Test SNES",
      categoryName: "Games",
      countryName: "United States of America",
      releaseTypeName: "Official",
      publisherName: "Square Soft, Inc.",
      developerName: "Squaresoft",
      ownershipName: "Loose",
      genreNames: ["RPG"],
      value: 279.98,
      metacritic: 92,
      acquiredAt: "2022-08-07",
      status: "owned"
    });
    expect(chrono.genreIds).toHaveLength(1);
  });

  it("keeps two copies of the same game as two items of one catalog entry", async () => {
    const { body } = await api<Page<ApiLibraryItem>>(`/library?title=${encodeURIComponent("Fixture Contra")}`);
    expect(body.total).toBe(2);
    expect(body.data[0]!.gameId).toBe(body.data[1]!.gameId);
    expect(body.data.map((item) => item.ownershipName).sort()).toEqual(["CIB", "Loose"]);
  });

  it("filters by platform, genre, status and search text", async () => {
    const nes = await lookupId("platforms", "Test NES");
    const rpg = await lookupId("genres", "RPG");

    expect((await api<Page<ApiLibraryItem>>(`/library?platformId=${nes}`)).body.total).toBe(3);
    expect((await api<Page<ApiLibraryItem>>(`/library?genreId=${rpg}`)).body.data.map((item) => item.title)).toEqual([
      "Fixture Chrono Trigger",
      "Fixture Final Fantasy VII"
    ]);
    expect((await api<Page<ApiLibraryItem>>("/library?status=wishlist")).body.total).toBe(1);
    expect((await api<Page<ApiLibraryItem>>(`/library?title[$ilike]=${encodeURIComponent("%chrono%")}`)).body.total).toBe(1);
    // Filters combine.
    expect((await api<Page<ApiLibraryItem>>(`/library?genreId=${rpg}&status=owned`)).body.total).toBe(1);
  });

  it("sorts by value with unpriced items last, and by title by default", async () => {
    const byValue = await api<Page<ApiLibraryItem>>("/library?$sort[value]=-1&$limit=50");
    expect(byValue.body.data[0]!.title).toBe("Fixture Chrono Trigger");
    expect(byValue.body.data.at(-1)!.value).toBeNull();

    const byDefault = await api<Page<ApiLibraryItem>>("/library?$limit=50");
    const titles = byDefault.body.data.map((item) => item.title);
    expect(titles).toEqual([...titles].sort());
  });

  it("paginates with a stable total", async () => {
    const first = await api<Page<ApiLibraryItem>>("/library?$limit=3");
    expect(first.body.data).toHaveLength(3);
    expect(first.body.total).toBe(6);

    const last = await api<Page<ApiLibraryItem>>("/library?$limit=3&$skip=5");
    expect(last.body.data).toHaveLength(1);

    const ids = new Set([...first.body.data, ...last.body.data].map((item) => item.id));
    expect(ids.size).toBe(4);
  });

  it("rejects a sort or filter on an unknown column", async () => {
    expect((await api("/library?$sort[notAColumn]=1")).status).toBe(400);
    expect((await api("/library?password=x")).status).toBe(400);
  });

  it("summarizes the (filtered) library", async () => {
    const all = await api<ApiLibrarySummary>("/library/summary");
    expect(all.status).toBe(200);
    expect(all.body.count).toBe(6);
    expect(all.body.totalValue).toBeCloseTo(30 + 100 + 279.98 + 20 + 15, 2);
    expect(all.body.missingCovers).toBeGreaterThan(0);
    expect(all.body.coverSyncActive).toBe(false);

    const rpg = await lookupId("genres", "RPG");
    const filtered = await api<ApiLibrarySummary>(`/library/summary?genreId=${rpg}`);
    expect(filtered.body.count).toBe(2);
    expect(filtered.body.totalValue).toBeCloseTo(279.98, 2);
  });

  it("scopes everything to the owner", async () => {
    expect((await otherApi<Page<ApiLibraryItem>>("/library")).body.total).toBe(0);
    expect((await otherApi<ApiLibrarySummary>("/library/summary")).body.count).toBe(0);

    const { body } = await api<Page<ApiLibraryItem>>("/library?$limit=1");
    const itemId = body.data[0]!.id;
    expect((await otherApi(`/library/${itemId}`)).status).toBe(404);
    expect((await otherApi(`/collection-items/${itemId}`, { method: "PATCH", body: { notes: "mine now" } })).status).toBe(404);
    expect((await otherApi(`/collection-items/${itemId}`, { method: "DELETE" })).status).toBe(404);
  });

  it("re-importing replaces by default and appends on request", async () => {
    await api("/collection-items/import", { method: "POST", body: { csv } });
    expect((await api<Page<ApiLibraryItem>>("/library")).body.total).toBe(6);

    const appended = await api<ApiImportResult>("/collection-items/import", { method: "POST", body: { csv, replace: false } });
    expect(appended.body.gamesCreated).toBe(0);
    expect((await api<Page<ApiLibraryItem>>("/library")).body.total).toBe(12);

    await api("/collection-items/import", { method: "POST", body: { csv } });
    expect((await api<Page<ApiLibraryItem>>("/library")).body.total).toBe(6);
  });

  it("marks favorites and filters by them", async () => {
    const { body } = await api<Page<ApiLibraryItem>>(`/library?title=${encodeURIComponent("Fixture GoldenEye 007")}`);
    const item = body.data[0]!;
    expect(item.isFavorite).toBe(false);

    const patched = await api<{ isFavorite: boolean }>(`/collection-items/${item.id}`, {
      method: "PATCH",
      body: { isFavorite: true }
    });
    expect(patched.status).toBe(200);
    expect(patched.body.isFavorite).toBe(true);

    const favorites = await api<Page<ApiLibraryItem>>("/library?isFavorite=true");
    expect(favorites.body.data.map((entry) => entry.title)).toEqual(["Fixture GoldenEye 007"]);
    expect((await api<Page<ApiLibraryItem>>("/library?isFavorite=false")).body.total).toBe(5);
    expect((await api<ApiLibrarySummary>("/library/summary?isFavorite=true")).body).toMatchObject({ count: 1, totalValue: 20 });

    // Favorites are per copy and per owner.
    expect((await otherApi<Page<ApiLibraryItem>>("/library?isFavorite=true")).body.total).toBe(0);

    await api(`/collection-items/${item.id}`, { method: "PATCH", body: { isFavorite: false } });
    expect((await api<Page<ApiLibraryItem>>("/library?isFavorite=true")).body.total).toBe(0);
  });

  it("adds a new game and its copy in one call, reusing the catalog entry next time", async () => {
    const platformId = await lookupId("platforms", "Test N64");
    const genreId = await lookupId("genres", "Puzzle");
    const title = `Fixture Added ${Date.now()}`;
    // No category: new entries are filed under "Games" by the API.
    const game = { title, platformId, genreIds: [genreId] };

    const first = await api<{ id: string; gameId: string; ownerId: string }>("/collection-items", {
      method: "POST",
      body: { game, value: 12.5, notes: "From the form" }
    });
    expect(first.status).toBe(201);
    expect(first.body.ownerId).toBe(owner.id);

    const second = await otherApi<{ gameId: string }>("/collection-items", { method: "POST", body: { game } });
    expect(second.body.gameId).toBe(first.body.gameId);

    const { body: item } = await api<ApiLibraryItem>(`/library/${first.body.id}`);
    expect(item).toMatchObject({
      title,
      platformName: "Test N64",
      categoryName: "Games",
      genreNames: ["Puzzle"],
      value: 12.5
    });

    expect((await api("/collection-items", { method: "POST", body: { value: 1 } })).status).toBe(400);
  });

  it("edits and removes a copy", async () => {
    const { body } = await api<Page<ApiLibraryItem>>("/library?$limit=1&$sort[value]=-1");
    const item = body.data[0]!;

    const patched = await api<{ value: number; notes: string }>(`/collection-items/${item.id}`, {
      method: "PATCH",
      body: { value: 300, notes: "Re-priced" }
    });
    expect(patched.status).toBe(200);
    expect(patched.body).toMatchObject({ value: 300, notes: "Re-priced" });

    // A copy can't be moved to another owner or game.
    expect((await api(`/collection-items/${item.id}`, { method: "PATCH", body: { ownerId: other.id } })).status).toBe(400);

    const before = (await api<Page<ApiLibraryItem>>("/library")).body.total;
    expect((await api(`/collection-items/${item.id}`, { method: "DELETE" })).status).toBe(200);
    expect((await api<Page<ApiLibraryItem>>("/library")).body.total).toBe(before - 1);
  });

  it("edits a catalog game's genres through the games service", async () => {
    const { body } = await api<Page<ApiLibraryItem>>(`/library?title=${encodeURIComponent("Fixture Homebrew")}`);
    const item = body.data[0]!;
    const action = await lookupId("genres", "Action");

    const patched = await api<{ genreIds: string[] }>(`/games/${item.gameId}`, {
      method: "PATCH",
      body: { genreIds: [...item.genreIds, action] }
    });
    expect(patched.status).toBe(200);
    expect(patched.body.genreIds).toHaveLength(2);

    const { body: updated } = await api<ApiLibraryItem>(`/library/${item.id}`);
    expect(updated.genreNames).toEqual(["Action", "Puzzle"]);
  });

  it("only lets the server fetch cover art from known hosts", async () => {
    const platformId = await lookupId("platforms", "Test N64");
    const categoryId = await lookupId("categories", "Games");
    const { status } = await api("/collection-items", {
      method: "POST",
      body: { game: { title: "SSRF probe", platformId, categoryId, coverSourceUrl: "http://169.254.169.254/latest/meta-data" } }
    });
    expect(status).toBe(400);
  });

  it("treats lookup creation as find-or-create", async () => {
    const first = await api<ApiLookup>("/companies", { method: "POST", body: { name: "Fixture Studio" } });
    const second = await api<ApiLookup>("/companies", { method: "POST", body: { name: "  Fixture Studio " } });
    expect(first.status).toBe(201);
    expect(second.body.id).toBe(first.body.id);
  });

  it("searches the local catalog when no external provider is configured", async () => {
    const { status, body } = await api<{ local: Array<{ title: string }>; external: unknown[]; provider: string | null }>(
      "/catalog-search?q=fixture%20chrono"
    );
    expect(status).toBe(200);
    expect(body.provider).toBeNull();
    expect(body.external).toEqual([]);
    expect(body.local.map((game) => game.title)).toContain("Fixture Chrono Trigger");
  });
});
