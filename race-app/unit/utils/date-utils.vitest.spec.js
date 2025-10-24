import { describe, it, expect } from "vitest";
import { formatDate } from "@/utils/date-utils";

describe("formatDate", () => {
  it("formats date as YYYY-MM-DD", () => {
    const date = new Date("2025-10-24T12:00:00Z");
    expect(formatDate(date)).toBe("2025-10-24");
  });

  it("returns empty string for invalid date", () => {
    expect(formatDate(null)).toBe("");
  });
});
