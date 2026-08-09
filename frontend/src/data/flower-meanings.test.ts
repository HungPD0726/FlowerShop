import { describe, expect, it } from "vitest";
import { FLOWER_MEANINGS } from "./flower-meanings";

const expectedProductTypes = [
  "Hoa Hồng",
  "Hoa Tulip",
  "Hoa Hướng Dương",
  "Hoa Mẫu Đơn",
  "Hoa Lan",
  "Hoa Cẩm Tú Cầu",
  "Hoa Ly",
  "Hoa Cẩm Chướng",
  "Hoa Đồng Tiền",
  "Hoa Sen",
];

describe("FLOWER_MEANINGS", () => {
  it("contains ten complete, uniquely illustrated flowers", () => {
    expect(FLOWER_MEANINGS).toHaveLength(10);
    expect(new Set(FLOWER_MEANINGS.map((flower) => flower.id)).size).toBe(10);
    expect(new Set(FLOWER_MEANINGS.map((flower) => flower.imageSrc)).size).toBe(10);

    for (const flower of FLOWER_MEANINGS) {
      expect(flower.name).toBeTruthy();
      expect(flower.scientificName).toBeTruthy();
      expect(flower.shortMeaning).toBeTruthy();
      expect(flower.description).toBeTruthy();
      expect(flower.imageAlt).toBeTruthy();
      expect(flower.intents.length).toBeGreaterThan(0);
      expect(flower.colors.length).toBeGreaterThan(0);
      expect(flower.occasions.length).toBeGreaterThan(0);
      expect(flower.recipients.length).toBeGreaterThan(0);
      expect(flower.note).toBeTruthy();
    }
  });

  it("maps every guide entry to the exact backend flowerType", () => {
    expect(FLOWER_MEANINGS.map((flower) => flower.productFlowerType)).toEqual(expectedProductTypes);
  });
});
