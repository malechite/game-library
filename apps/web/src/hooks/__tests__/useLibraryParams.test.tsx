import type { PropsWithChildren } from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { LibrarySort, LibraryView } from "../../lib/libraryOptions";
import { LibraryFilterKey, useLibraryParams } from "../useLibraryParams";

const PLATFORM = "11111111-1111-4111-8111-111111111111";
const GENRE = "22222222-2222-4222-8222-222222222222";

const renderAt = (url: string) =>
  renderHook(() => useLibraryParams(), {
    wrapper: ({ children }: PropsWithChildren) => <MemoryRouter initialEntries={[url]}>{children}</MemoryRouter>
  });

describe("useLibraryParams", () => {
  beforeEach(() => window.localStorage.clear());

  it("starts with the defaults", () => {
    const { result } = renderAt("/");
    expect(result.current).toMatchObject({
      search: "",
      filters: {},
      favoritesOnly: false,
      sort: LibrarySort.TitleAsc,
      page: 0,
      view: LibraryView.Tiles,
      pageSize: 100,
      hasFilters: false
    });
    expect(result.current.pageQuery("")).toEqual({ $sort: { title: 1 }, $limit: 100, $skip: 0 });
  });

  it("reads filters, sort, page and view from the URL", () => {
    const { result } = renderAt(
      `/?q=zelda&platform=${PLATFORM}&genre=${GENRE}&status=wishlist&favorites=1&sort=-value&page=3&view=list`
    );

    expect(result.current.filters).toEqual({
      [LibraryFilterKey.Platform]: PLATFORM,
      [LibraryFilterKey.Genre]: GENRE,
      [LibraryFilterKey.Status]: "wishlist"
    });
    expect(result.current.favoritesOnly).toBe(true);
    expect(result.current.pageQuery("zelda")).toEqual({
      title: { $ilike: "%zelda%" },
      platformId: PLATFORM,
      genreId: GENRE,
      status: "wishlist",
      isFavorite: true,
      $sort: { value: -1 },
      $limit: 100,
      $skip: 200
    });
  });

  it("toggles the favorites filter and returns to the first page", () => {
    const { result } = renderAt("/?page=2");

    act(() => result.current.setFavoritesOnly(true));
    expect(result.current.favoritesOnly).toBe(true);
    expect(result.current.hasFilters).toBe(true);
    expect(result.current.page).toBe(0);
    expect(result.current.filterQuery("")).toEqual({ isFavorite: true });

    act(() => result.current.setFavoritesOnly(false));
    expect(result.current.filterQuery("")).toEqual({});
  });

  it("ignores the old category filter", () => {
    const { result } = renderAt("/?category=11111111-1111-4111-8111-111111111111");
    expect(result.current.hasFilters).toBe(false);
    expect(result.current.filterQuery("")).toEqual({});
  });

  it("falls back to defaults for unknown values", () => {
    const { result } = renderAt("/?sort=price&view=cards&page=abc&status=sold");
    expect(result.current.sort).toBe(LibrarySort.TitleAsc);
    expect(result.current.view).toBe(LibraryView.Tiles);
    expect(result.current.page).toBe(0);
    expect(result.current.filterQuery("")).toEqual({});
  });

  it("returns to the first page when a filter or the sort changes", () => {
    const { result } = renderAt("/?page=4");
    expect(result.current.page).toBe(3);

    act(() => result.current.setFilter(LibraryFilterKey.Platform, PLATFORM));
    expect(result.current.page).toBe(0);
    expect(result.current.filters).toEqual({ [LibraryFilterKey.Platform]: PLATFORM });

    act(() => result.current.setPage(2));
    act(() => result.current.setSort(LibrarySort.ValueDesc));
    expect(result.current.page).toBe(0);
    expect(result.current.sort).toBe(LibrarySort.ValueDesc);
  });

  it("clears the search and every filter but keeps the sort", () => {
    const { result } = renderAt(`/?q=mario&platform=${PLATFORM}&favorites=1&sort=-value`);
    expect(result.current.hasFilters).toBe(true);

    act(() => result.current.clearFilters());
    expect(result.current.hasFilters).toBe(false);
    expect(result.current.search).toBe("");
    expect(result.current.sort).toBe(LibrarySort.ValueDesc);
  });

  it("escapes LIKE wildcards in the search text", () => {
    const { result } = renderAt("/");
    expect(result.current.filterQuery("100%_done")).toEqual({ title: { $ilike: "%100\\%\\_done%" } });
  });

  it("remembers the chosen view and keeps the page when switching", () => {
    const first = renderAt("/?page=2");
    act(() => first.result.current.setView(LibraryView.List));
    expect(first.result.current.view).toBe(LibraryView.List);
    expect(first.result.current.page).toBe(1);

    // A fresh visit without ?view= picks up the stored preference.
    const second = renderAt("/");
    expect(second.result.current.view).toBe(LibraryView.List);
  });
});
