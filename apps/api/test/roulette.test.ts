import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { ApiLibraryItem, ApiLibraryTitle, ApiLookup, ApiRoulettePick } from "@game-library/types";
import { apiFor, createTestUser, removeTestUsers, startApp, stopApp, type TestUser } from "./helpers";

const csv = readFileSync(path.resolve(__dirname, "fixtures/collection.csv"), "utf8");

interface Page<T> {
  total: number;
  limit: number;
  skip: number;
  data: T[];
}

describe("roulette pool and pick history", () => {
  let owner: TestUser;
  let other: TestUser;
  let api: ReturnType<typeof apiFor>;
  let otherApi: ReturnType<typeof apiFor>;
  let titles: ApiLibraryTitle[];

  const pick = (collectionItemId: string, client = api) =>
    client<ApiRoulettePick>("/roulette-picks", { method: "POST", body: { collectionItemId } });

  beforeAll(async () => {
    await startApp();
    owner = await createTestUser("roulette-owner");
    other = await createTestUser("roulette-other");
    api = apiFor(owner);
    otherApi = apiFor(other);
    await api("/collection-items/import", { method: "POST", body: { csv } });
    titles = (await api<ApiLibraryTitle[]>("/library/titles")).body;
  });

  afterAll(async () => {
    await removeTestUsers([owner, other]);
    await stopApp();
  });

  it("lists every library title without paging", async () => {
    // $limit is ignored: the pool is the whole filtered library.
    const { status, body } = await api<ApiLibraryTitle[]>("/library/titles?$limit=2");

    expect(status).toBe(200);
    expect(body).toHaveLength(6);
    expect(Object.keys(body[0]!).sort()).toEqual(["id", "platformName", "title"]);
    expect(body.map((item) => item.title)).toEqual([...body.map((item) => item.title)].sort());
  });

  it("filters the titles like the library", async () => {
    const owned = await api<ApiLibraryTitle[]>("/library/titles?status=owned");
    expect(owned.body).toHaveLength(5);
    expect(owned.body.map((item) => item.title)).not.toContain("Fixture Final Fantasy VII");

    const genres = await api<Page<ApiLookup>>("/genres?name=RPG");
    const rpg = await api<ApiLibraryTitle[]>(`/library/titles?status=owned&genreId=${genres.body.data[0]!.id}`);
    expect(rpg.body.map((item) => item.title)).toEqual(["Fixture Chrono Trigger"]);

    expect((await api("/library/titles?password=x")).status).toBe(400);
  });

  it("scopes the titles to the owner", async () => {
    expect((await otherApi<ApiLibraryTitle[]>("/library/titles")).body).toEqual([]);
  });

  it("logs a pick for the caller, joined with its game", async () => {
    const target = titles.find((item) => item.title === "Fixture Chrono Trigger")!;
    const { status, body } = await pick(target.id);

    expect(status).toBe(201);
    expect(body.ownerId).toBe(owner.id);
    expect(body.collectionItemId).toBe(target.id);
    expect(body.title).toBe("Fixture Chrono Trigger");
    expect(body.platformName).toBe("Test SNES");
    expect(body.coverUrl).toBeNull();

    const item = await api<ApiLibraryItem>(`/library/${target.id}`);
    expect(body.gameId).toBe(item.body.gameId);
  });

  it("rejects a pick of someone else's copy or a malformed one", async () => {
    expect((await pick(titles[0]!.id, otherApi)).status).toBe(404);
    expect((await api("/roulette-picks", { method: "POST", body: {} })).status).toBe(400);
    expect(
      (await api("/roulette-picks", { method: "POST", body: { collectionItemId: titles[0]!.id, ownerId: other.id } })).status
    ).toBe(400);
  });

  it("lists the caller's picks newest first", async () => {
    const second = await pick(titles.find((item) => item.title === "Fixture GoldenEye 007")!.id);
    const { body } = await api<Page<ApiRoulettePick>>("/roulette-picks");

    expect(body.total).toBe(2);
    expect(body.data.map((entry) => entry.title)).toEqual(["Fixture GoldenEye 007", "Fixture Chrono Trigger"]);
    expect(body.data[0]!.id).toBe(second.body.id);

    expect((await otherApi<Page<ApiRoulettePick>>("/roulette-picks")).body.total).toBe(0);
  });

  it("keeps a pick when its copy leaves the collection", async () => {
    const target = titles.find((item) => item.title === "Fixture Homebrew")!;
    const created = await pick(target.id);
    await api(`/collection-items/${target.id}`, { method: "DELETE" });

    const { status, body } = await api<ApiRoulettePick>(`/roulette-picks/${created.body.id}`);
    expect(status).toBe(200);
    expect(body.collectionItemId).toBeNull();
    expect(body.title).toBe("Fixture Homebrew");
  });

  it("removes only the caller's own picks", async () => {
    const { body } = await api<Page<ApiRoulettePick>>("/roulette-picks");
    const target = body.data[0]!;

    expect((await otherApi(`/roulette-picks/${target.id}`)).status).toBe(404);
    expect((await otherApi(`/roulette-picks/${target.id}`, { method: "DELETE" })).status).toBe(404);

    const removed = await api<ApiRoulettePick>(`/roulette-picks/${target.id}`, { method: "DELETE" });
    expect(removed.status).toBe(200);
    expect(removed.body.id).toBe(target.id);
    expect((await api<Page<ApiRoulettePick>>("/roulette-picks")).body.total).toBe(body.total - 1);
  });
});
