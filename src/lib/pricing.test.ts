import { describe, expect, it } from "vitest";
import { quote } from "@/lib/pricing";
import { site } from "@/content/site";

const base = { pkg: "birthday", guests: 6, slot: "evening", addOns: {} };

describe("quote", () => {
  it("charges only the package price at or under the base group size", () => {
    expect(quote({ ...base, guests: 2 }).total).toBe(2999);
    expect(quote({ ...base, guests: 6 }).total).toBe(2999);
  });

  it("charges per head beyond the base group size", () => {
    // 9 guests on the Birthday Package = 3 extra at 300
    expect(quote({ ...base, guests: 9 }).total).toBe(2999 + 900);
  });

  it("never charges beyond a package's maximum capacity", () => {
    const overflow = quote({ ...base, guests: 99 });
    expect(overflow.total).toBe(quote({ ...base, guests: 12 }).total);
  });

  it("prices each package from its own rate", () => {
    expect(quote({ ...base, pkg: "movie-night", guests: 4 }).total).toBe(1999);
    expect(quote({ ...base, pkg: "couple", guests: 2 }).total).toBe(2499);
  });

  it("adds add-ons", () => {
    expect(quote({ ...base, addOns: { fog: 1 } }).total).toBe(2999 + 399);
  });

  it("multiplies quantities", () => {
    expect(quote({ ...base, addOns: { popcorn: 3 } }).total).toBe(2999 + 299 * 3);
  });

  it("ignores unknown add-on ids and zero quantities", () => {
    expect(quote({ ...base, addOns: { "not-a-real-id": 2, popcorn: 0 } }).total).toBe(2999);
  });

  it("applies a coupon and caps the discount", () => {
    const q = quote({ ...base, coupon: "palace10" });
    expect(q.discount).toBe(300); // 10% of 2999, rounded
    expect(q.total).toBe(2999 - 300);

    // 15% of a large booking (subtotal 7,495) would be 1,124 — the cap binds
    const big = quote({
      pkg: "birthday",
      guests: 12,
      slot: "evening",
      addOns: { photography: 1, "decor-upgrade": 1, pyro: 1, fog: 1 },
      coupon: "WEEKDAY15",
    });
    expect(big.subtotal).toBe(7495);
    expect(big.discount).toBe(1000);
  });

  it("ignores an unknown coupon code", () => {
    const q = quote({ ...base, coupon: "NOTACODE" });
    expect(q.discount).toBe(0);
    expect(q.discountLabel).toBeNull();
  });

  it("splits the total into advance and balance", () => {
    const q = quote({ ...base, guests: 9 });
    expect(q.advance).toBe(site.advance);
    expect(q.advance + q.balanceDue).toBe(q.total);
  });

  it("returns an empty quote for an unknown package", () => {
    const q = quote({ ...base, pkg: "does-not-exist" });
    expect(q.total).toBe(0);
    expect(q.lines).toHaveLength(0);
  });
});
