import {
  calculateDistanceMeters,
  findDistanceRange,
  calculateDeliveryFee,
  calculateSmallOrderSurcharge,
} from "./math";

describe("calculateDistanceMeters", () => {
  it("should return 0 when both coordinates are the same", () => {
    const lat = 60.17094;
    const lng = 24.93087;
    expect(calculateDistanceMeters(lat, lng, lat, lng)).toBe(0);
  });

  it("should return a positive number for different coordinates", () => {
    const distance = calculateDistanceMeters(
      60.17094,
      24.93087,
      60.17194,
      24.93087,
    );
    expect(distance).toBeGreaterThan(0);
  });

  it("should handle negative coordinates correctly", () => {
    const distance = calculateDistanceMeters(
      -60.17094,
      -24.93087,
      60.17094,
      24.93087,
    );
    expect(distance).toBeGreaterThan(0);
  });

  it("should calculate correct distance for known coordinates", () => {
    // Example: Distance between Helsinki (60.17094, 24.93087) and Espoo (60.2055, 24.6559)
    // Straight line distance should be around 15-16 km (internet says 15.650 km)
    const distance = calculateDistanceMeters(
      60.17094,
      24.93087,
      60.2055,
      24.6559,
    );
    expect(distance).toBeCloseTo(15650, -2);
  });

  it("should round the distance correctly", () => {
    const distance = calculateDistanceMeters(
      60.17094,
      24.93087,
      60.17095,
      24.93088,
    );
    expect(typeof distance).toBe("number");
    expect(distance).toBe(Math.round(distance));
  });
});

describe("findDistanceRange", () => {
  const ranges = [
    { min: 0, max: 500, a: 0, b: 0 },
    { min: 500, max: 1000, a: 100, b: 1 },
    { min: 1000, max: 0, a: 0, b: 0 },
  ];

  it("returns the correct a/b for distance within the first range", () => {
    expect(findDistanceRange(100, ranges)).toEqual({ a: 0, b: 0 });
  });

  it("returns the correct a/b for distance within the second range", () => {
    expect(findDistanceRange(600, ranges)).toEqual({ a: 100, b: 1 });
  });

  it("returns null for distance >= 1000", () => {
    expect(findDistanceRange(1000, ranges)).toBeNull();
    expect(findDistanceRange(1500, ranges)).toBeNull();
  });
});

describe("calculateDeliveryFee", () => {
  it("returns base price if a=0, b=0, distance=any", () => {
    expect(calculateDeliveryFee(100, 0, 0, 500)).toBe(100);
  });

  it("adds a correct constant amount", () => {
    expect(calculateDeliveryFee(100, 50, 0, 500)).toBe(150);
  });

  it("adds distance-based fee (b * distance / 10)", () => {
    // base=100, a=0, b=2, distance=1000 => 100 + (2 * 1000 / 10) = 100 + 200 = 300
    expect(calculateDeliveryFee(100, 0, 2, 1000)).toBe(300);
  });

  it("rounds to nearest integer", () => {
    // e.g. distance=550 => b=1 => 550/10 = 55 => 100 + 0 + 55
    expect(calculateDeliveryFee(100, 0, 1, 550)).toBe(155);
  });
});

describe("calculateSmallOrderSurcharge", () => {
  it("returns 0 if cart >= threshold", () => {
    expect(calculateSmallOrderSurcharge(1000, 1000)).toBe(0);
    expect(calculateSmallOrderSurcharge(1100, 1000)).toBe(0);
  });

  it("returns difference if cart < threshold", () => {
    expect(calculateSmallOrderSurcharge(800, 1000)).toBe(200);
  });

  it("never returns negative", () => {
    expect(calculateSmallOrderSurcharge(2000, 1000)).toBe(0);
  });
});
