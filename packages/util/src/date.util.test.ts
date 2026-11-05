import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatAge, isValidDate } from "./date.util";

describe("formatAge", () => {
  // Pin "now" so the relative math is deterministic.
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-03T12:00:00.000Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns null for missing values", () => {
    expect(formatAge(null)).toBeNull();
    expect(formatAge(undefined)).toBeNull();
  });

  it("returns null for invalid dates", () => {
    expect(formatAge("not-a-date")).toBeNull();
  });

  it("returns null for future dates", () => {
    expect(formatAge("2027-01-01")).toBeNull();
  });

  it("reports a newborn as 0 mo", () => {
    expect(formatAge("2026-06-03")).toBe("0 mo");
  });

  it("reports months under a year", () => {
    expect(formatAge("2026-01-03")).toBe("5 mo");
  });

  it("switches to years at 12 months", () => {
    expect(formatAge("2025-06-03")).toBe("1 yr");
    expect(formatAge("2025-05-03")).toBe("1 yr");
  });

  it("reports whole years", () => {
    expect(formatAge("2023-06-03")).toBe("3 yr");
  });

  it("accepts Date objects", () => {
    expect(formatAge(new Date("2026-01-03T00:00:00.000Z"))).toBe("5 mo");
  });
});

describe("isValidDate", () => {
  it("is true for valid dates and false otherwise", () => {
    expect(isValidDate("2026-06-03")).toBe(true);
    expect(isValidDate("nope")).toBe(false);
    expect(isValidDate(null)).toBe(false);
  });
});
