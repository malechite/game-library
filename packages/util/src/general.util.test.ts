import { describe, expect, it } from "vitest";
import { bool, capitalize, isSet, stringToSlug } from "./general.util";

describe("capitalize", () => {
  it("uppercases the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("leaves already-capitalized strings unchanged", () => {
    expect(capitalize("Zone")).toBe("Zone");
  });

  it("handles an empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("bool", () => {
  it("parses truthy strings case-insensitively", () => {
    expect(bool("true")).toBe(true);
    expect(bool("TRUE")).toBe(true);
  });

  it("treats everything else as false", () => {
    expect(bool("false")).toBe(false);
    expect(bool("1")).toBe(false);
    expect(bool(null)).toBe(false);
    expect(bool(undefined)).toBe(false);
  });
});

describe("isSet", () => {
  it("is false only for null/undefined", () => {
    expect(isSet(null)).toBe(false);
    expect(isSet(undefined)).toBe(false);
    expect(isSet(0)).toBe(true);
    expect(isSet("")).toBe(true);
    expect(isSet(false)).toBe(true);
  });
});

describe("stringToSlug", () => {
  it("lowercases, strips specials and dashes spaces", () => {
    expect(stringToSlug("Albrook: Exterior")).toBe("albrook-exterior");
    expect(stringToSlug("Hello World!")).toBe("hello-world");
  });

  it("collapses repeats and trims edge dashes", () => {
    expect(stringToSlug("  --Multiple   Spaces--  ")).toBe("multiple-spaces");
  });
});
