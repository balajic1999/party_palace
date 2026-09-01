import { describe, expect, it } from "vitest";
import { quote } from "@/lib/pricing";
import { site } from "@/content/site";

const base = { pkg: "fun-box", pack: "2h", guests: 5, slot: "evening", addOns: {} };

describe("quote", () => {
  it("charges only the pack price at or under the pack's member count", () => {
    expect(quote({ ...base, guests: 2 }).total).toBe(2650);
    expect(quote({ ...base, guests: 5 }).total).toBe(2650);
  });

  it("charges per head beyond the pack's member count", () => {
    // 8 members on the Fun Box 2-hour pack = 3 extra at 200
    expect(quote({ ...base, guests: 8 }).total).toBe(2650 + 600);
  });

  it("never charges beyond a package's maximum capacity", () => {
    const overflow = quote({ ...base, guests: 99 });
    expect(overflow.total).toBe(quote({ ...base, guests: 8 }).total);
  });

  it("prices each pack of a package from its own rate", () => {
    expect(quote({ ...base, pack: "1h", guests: 4 }).total).toBe(1299);
    expect(quote({ ...base, pack: "2h", guests: 5 }).total).toBe(2650);
  });

  it("prices each package from its own card", () => {
    expect(quote({ ...base, pkg: "love-box", pack: "1h", guests: 2 }).total).toBe(599);
    expect(quote({ ...base, pkg: "hunter-box", pack: "2h", guests: 5 }).total).toBe(3150);
    expect(quote({ ...base, pkg: "roof-top", pack: "package", guests: 10 }).total).toBe(6499);
  });

  it("falls back to the package's first pack for a missing or stale pack id", () => {
    expect(quote({ ...base, pack: undefined, guests: 4 }).total).toBe(1299);
    expect(quote({ ...base, pack: "17h", guests: 4 }).total).toBe(1299);
  });

  it("never charges extra members on a room that has no extra-member rate", () => {
    // The Love Box seats two and prints no extra-member price.
    expect(quote({ ...base, pkg: "love-box", pack: "2h", guests: 9 }).total).toBe(1299);
  });

  it("adds the midnight slot surcharge", () => {
    expect(quote({ ...base, slot: "midnight" }).total).toBe(2650 + 2000);
  });

  it("adds add-ons", () => {
    expect(quote({ ...base, addOns: { "fog-entry": 1 } }).total).toBe(2650 + 1500);
  });

  it("multiplies quantities", () => {
    expect(quote({ ...base, addOns: { "photo-clips": 3 } }).total).toBe(2650 + 300 * 3);
  });

  it("ignores unknown add-on ids and zero quantities", () => {
    expect(
      quote({ ...base, addOns: { "not-a-real-id": 2, "photo-clips": 0 } }).total,
    ).toBe(2650);
  });

  it("applies a coupon and caps the discount", () => {
    const q = quote({ ...base, coupon: "palace10" });
    expect(q.discount).toBe(265); // 10% of 2,650
    expect(q.total).toBe(2650 - 265);

    // 15% of a large booking would clear the cap
    const big = quote({
      pkg: "roof-top",
      pack: "package",
      guests: 35,
      slot: "evening",
      addOns: { "photo-grand": 1, "fog-entry": 1 },
      coupon: "WEEKDAY15",
    });
    expect(big.subtotal).toBe(6499 + 25 * 300 + 3500 + 1500);
    expect(big.discount).toBe(1000);
  });

  it("ignores an unknown coupon code", () => {
    const q = quote({ ...base, coupon: "NOTACODE" });
    expect(q.discount).toBe(0);
    expect(q.discountLabel).toBeNull();
  });

  it("splits the total into advance and balance", () => {
    const q = quote({ ...base, guests: 8 });
    expect(q.advance).toBe(site.advance);
    expect(q.advance + q.balanceDue).toBe(q.total);
  });

  it("returns an empty quote for an unknown package", () => {
    const q = quote({ ...base, pkg: "does-not-exist" });
    expect(q.total).toBe(0);
    expect(q.lines).toHaveLength(0);
  });
});
