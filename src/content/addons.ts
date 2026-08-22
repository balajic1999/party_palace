export type AddOn = {
  id: string;
  name: string;
  price: number;
  note?: string;
};

export type AddOnGroup = {
  id: string;
  name: string;
  blurb: string;
  /** quantity steppers instead of a simple on/off */
  quantity?: boolean;
  items: AddOn[];
};

/**
 * Optional extras on top of a package. Every package already includes its own
 * decor and food — these are upgrades.
 * Prices are placeholders; confirm with the owner.
 */
export const addOnGroups: AddOnGroup[] = [
  {
    id: "extras",
    name: "Add a little extra",
    blurb: "Timed to your cue by the attendant on duty. All optional.",
    items: [
      { id: "decor-upgrade", name: "Premium decor upgrade", price: 799, note: "Balloon ceiling or floral arch" },
      { id: "fog", name: "Fog entry", price: 399, note: "Low fog as the door opens" },
      { id: "pyro", name: "Cold pyros (pair)", price: 499, note: "Indoor-safe sparks" },
      { id: "led-board", name: "LED name board", price: 299 },
      { id: "rose-path", name: "Rose petal path", price: 299 },
      { id: "photography", name: "Photographer, 30 minutes", price: 999, note: "Edited photos within 48 hours" },
    ],
  },
  {
    id: "food",
    name: "Food & drinks",
    blurb: "Served at your seat. Outside food is fine too — there is no corkage.",
    quantity: true,
    items: [
      { id: "popcorn", name: "Popcorn + soda combo", price: 299, note: "Serves 2" },
      { id: "nachos", name: "Loaded nachos platter", price: 349 },
      { id: "snackbox", name: "Party snack box", price: 549, note: "Serves 4" },
      { id: "mocktail", name: "Mocktail pitcher", price: 399, note: "Serves 4" },
      { id: "cake-upgrade", name: "Upgrade to a 1kg cake", price: 650 },
    ],
  },
];

export const allAddOns: AddOn[] = addOnGroups.flatMap((g) => g.items);

export const addOnById = (id: string) => allAddOns.find((a) => a.id === id);

/** Coupon codes. Applied against the pre-advance subtotal. */
export const coupons: Record<string, { label: string; percent: number; cap: number }> = {
  PALACE10: { label: "10% off — welcome offer", percent: 10, cap: 700 },
  WEEKDAY15: { label: "15% off — Monday to Thursday", percent: 15, cap: 1000 },
};
