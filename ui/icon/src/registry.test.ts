import { describe, it, expect, beforeEach, vi } from "vitest";
import { Gear, Star } from "@phosphor-icons/react";
import { registerIcons, getIcon, getRegisteredIconNames, clearIcons } from "./registry";

describe("icon registry", () => {
  beforeEach(() => clearIcons());

  it("resolves registered icons by name", () => {
    registerIcons({ Gear, Star });
    expect(getIcon("Gear")).toBe(Gear);
    expect(getRegisteredIconNames().sort()).toEqual(["Gear", "Star"]);
  });

  it("returns undefined and warns once for an unregistered icon", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(getIcon("Acorn")).toBeUndefined();
    expect(getIcon("Acorn")).toBeUndefined();
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});
