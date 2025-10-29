import { describe, it, expect } from "vitest";
import {
  getPositionIcon,
  getPositionIconColor,
  getPositionClass,
} from "@/utils/position-utils";

describe("position-utils.js", () => {
  describe("getPositionIcon", () => {
    it("returns correct icon for top 3 positions", () => {
      expect(getPositionIcon(1)).toBe("mdi-trophy");
      expect(getPositionIcon(2)).toBe("mdi-medal");
      expect(getPositionIcon(3)).toBe("mdi-medal-outline");
    });
    it("returns empty string for other positions", () => {
      expect(getPositionIcon(4)).toBe("");
      expect(getPositionIcon(0)).toBe("");
      expect(getPositionIcon(-1)).toBe("");
    });
  });

  describe("getPositionIconColor", () => {
    it("returns correct color for top 3 positions", () => {
      expect(getPositionIconColor(1)).toBe("amber");
      expect(getPositionIconColor(2)).toBe("grey");
      expect(getPositionIconColor(3)).toBe("orange");
    });
    it("returns grey for other positions", () => {
      expect(getPositionIconColor(4)).toBe("grey");
      expect(getPositionIconColor(0)).toBe("grey");
      expect(getPositionIconColor(-1)).toBe("grey");
    });
  });

  describe("getPositionClass", () => {
    it("returns correct class for top 3 positions", () => {
      expect(getPositionClass(1)).toBe("position-first");
      expect(getPositionClass(2)).toBe("position-second");
      expect(getPositionClass(3)).toBe("position-third");
    });
    it("returns position-other for other positions", () => {
      expect(getPositionClass(4)).toBe("position-other");
      expect(getPositionClass(0)).toBe("position-other");
      expect(getPositionClass(-1)).toBe("position-other");
    });
  });
});
