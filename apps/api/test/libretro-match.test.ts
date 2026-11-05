import { describe, it, expect } from "vitest";
import { isAllowedCoverUrl } from "../src/covers/cover-service";
import { normalizeTitle, parseListing, pickBoxart } from "../src/covers/libretro";

describe("normalizeTitle", () => {
  it("drops tags, punctuation and articles", () => {
    expect(normalizeTitle("Legend of Zelda, The (USA) (Rev 1)")).toBe("legend of zelda");
    expect(normalizeTitle("The Legend of Zelda")).toBe("legend of zelda");
    expect(normalizeTitle("Tetris & Dr. Mario")).toBe("tetris dr mario");
    expect(normalizeTitle("Tetris _ Dr. Mario (USA)")).toBe("tetris dr mario");
    expect(normalizeTitle("Pokémon Snap")).toBe("pokemon snap");
  });
});

describe("pickBoxart", () => {
  const files = [
    "Mega Man 2 (Japan).png",
    "Mega Man 2 (USA) (Virtual Console).png",
    "Mega Man 2 (USA).png",
    "Mega Man 2 (USA) (Beta).png",
    "Mega Man 3 (1990)(Capcom USA)(PlayChoice-10).png",
    "Mega Man 3 (USA).png",
    "Final Fantasy VII (USA) (Disc 1).png",
    "Final Fantasy VII (USA) (Disc 2).png",
    "Boy and His Blob, A - Trouble on Blobolonia (USA).png",
    "Contra (USA).png",
    "Contra Force (USA).png"
  ];

  it("prefers the plain release in the game's region", () => {
    expect(pickBoxart("Mega Man 2", files, "United States of America")).toBe("Mega Man 2 (USA).png");
    expect(pickBoxart("Mega Man 2", files, "Japan")).toBe("Mega Man 2 (Japan).png");
  });

  it("doesn't mistake a publisher name for a region tag", () => {
    expect(pickBoxart("Mega Man 3", files, "United States of America")).toBe("Mega Man 3 (USA).png");
  });

  it("picks disc 1 of a multi-disc game", () => {
    expect(pickBoxart("Final Fantasy VII", files, "United States of America")).toBe("Final Fantasy VII (USA) (Disc 1).png");
  });

  it("matches across articles and subtitle punctuation", () => {
    expect(pickBoxart("Boy and His Blob: Trouble on Blobolonia", files)).toBe(
      "Boy and His Blob, A - Trouble on Blobolonia (USA).png"
    );
  });

  it("prefers an exact title over a longer one that starts the same", () => {
    expect(pickBoxart("Contra", files)).toBe("Contra (USA).png");
  });

  it("returns null when nothing matches", () => {
    expect(pickBoxart("Totally Unknown Game", files)).toBeNull();
  });
});

describe("parseListing", () => {
  it("extracts decoded png file names from a directory listing", () => {
    const html = `
      <a href="../">../</a>
      <a href="Contra%20%28USA%29.png">Contra (USA).png</a>
      <a href="Tom%20%26amp%3B%20Jerry%20%28USA%29.png">Tom &amp; Jerry (USA).png</a>
      <a href="readme.txt">readme.txt</a>`;
    expect(parseListing(html)).toEqual(["Contra (USA).png", "Tom & Jerry (USA).png"]);
  });
});

describe("isAllowedCoverUrl", () => {
  it("accepts only https URLs on the known cover hosts", () => {
    expect(isAllowedCoverUrl("https://thumbnails.libretro.com/Sony%20-%20PlayStation/Named_Boxarts/x.png")).toBe(true);
    expect(isAllowedCoverUrl("https://images.igdb.com/igdb/image/upload/t_cover_big/abc.jpg")).toBe(true);
    expect(isAllowedCoverUrl("http://thumbnails.libretro.com/x.png")).toBe(false);
    expect(isAllowedCoverUrl("http://169.254.169.254/latest/meta-data")).toBe(false);
    expect(isAllowedCoverUrl("https://thumbnails.libretro.com.evil.example/x.png")).toBe(false);
    expect(isAllowedCoverUrl("not a url")).toBe(false);
  });
});
