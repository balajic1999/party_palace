export type AddOn = {
  id: string;
  name: string;
  price: number;
  note?: string;
  /** What you get, spelled out. Rendered as a list wherever there is room. */
  details?: string[];
  /** Short flag beside the name — "Save ₹400", "Best value". */
  badge?: string;
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
 * decoration — these are additions to it.
 *
 * Decor and cake prices come from the printed add-on card (PackageDetails.pdf);
 * photography comes from the photography package sheet.
 */
export const addOnGroups: AddOnGroup[] = [
  {
    id: "decor",
    name: "Decoration & entry",
    blurb:
      "Set up and timed to your cue by the attendant on duty. Customised decoration is available too — the cost depends on the balloon colours and the design.",
    items: [
      { id: "fog-entry", name: "Fog entry", price: 1500, note: "Low fog as the door opens" },
      { id: "rose-petal-entry", name: "Rose petal entry", price: 700 },
      { id: "bubble-entry", name: "Bubble entry", price: 500 },
      { id: "cold-fire-2", name: "Cold fire, 2 pieces", price: 900, note: "Indoor-safe sparks" },
      { id: "cold-fire-4", name: "Cold fire, 4 pieces", price: 1300, note: "Indoor-safe sparks" },
      { id: "flower-bouquet", name: "Flower bouquet", price: 500 },
      { id: "photo-clips", name: "Photo clips hanging", price: 300, note: "Your photos strung across the room" },
      { id: "flex-board", name: "Flex board", price: 600, note: "2/3 size" },
      { id: "hunter-box-extra", name: "For Hunter", price: 700 },
      { id: "fun-box-extra", name: "Fun Box", price: 500 },
      { id: "love-box-extra", name: "Love Box", price: 500 },
    ],
  },
  {
    id: "photography",
    name: "Photography & video",
    blurb:
      "Capturing your special moments in the private theatre — timeless and memorable. Professional-grade photos, delivered digitally in HD. Pick one session length; the video add-on works with any of them.",
    items: [
      {
        id: "photo-quick",
        name: "Quick Moments — 30 minutes",
        price: 1200,
        note: "The essentials, done quickly",
        details: ["Unlimited photos", "Delivered digitally in HD"],
      },
      {
        id: "photo-hour",
        name: "Celebration Hour — 1 hour",
        price: 2000,
        badge: "Save ₹400",
        note: "Time enough to shoot the whole group",
        details: [
          "Unlimited photos",
          "Group and solo shots",
          "Natural and posed styles",
          "One location or room setup",
          "Delivered digitally in HD",
        ],
      },
      {
        id: "photo-grand",
        name: "Grand Memories — 2 hours",
        price: 3500,
        badge: "Best value · Save ₹700",
        note: "The full celebration, start to finish",
        details: [
          "Unlimited photos",
          "Multiple group and solo captures",
          "Candid and artistic photography",
          "2 outfit changes, if you want them",
          "Multiple room and angle setups",
          "Delivered digitally in HD",
        ],
      },
      {
        id: "photo-video",
        name: "Entry + cake cutting video",
        price: 400,
        note: "Adds to any session above",
        details: ["Your entry, filmed", "The cake cutting, filmed"],
      },
    ],
  },
  {
    id: "cake",
    name: "Cake upgrades",
    blurb:
      "On top of the cake that comes with your pack. Pick the flavour separately — every flavour on the list is included at no extra cost.",
    items: [
      { id: "cake-eggless", name: "Eggless", price: 300 },
      { id: "cake-photo", name: "Photo cake", price: 300, note: "Your photo printed on top" },
      { id: "cake-red-velvet", name: "Red velvet", price: 300 },
    ],
  },
];

/**
 * Every flavour on the cake list. Free to choose — the paid upgrades
 * (eggless, photo, red velvet) are add-ons above.
 */
export const cakeFlavours = [
  "Cool Cake",
  "Vanilla",
  "Black Forest",
  "Strawberry",
  "Pineapple",
  "Kiwi",
  "Black Currant",
  "Mango",
  "Butterscotch",
  "Blueberry",
  "Choco Truffle",
  "Italian Cake",
  "Choco Nuts",
];

export const allAddOns: AddOn[] = addOnGroups.flatMap((g) => g.items);

export const addOnById = (id: string) => allAddOns.find((a) => a.id === id);

/** Coupon codes. Applied against the pre-advance subtotal. */
export const coupons: Record<string, { label: string; percent: number; cap: number }> = {
  PALACE10: { label: "10% off — welcome offer", percent: 10, cap: 700 },
  WEEKDAY15: { label: "15% off — Monday to Thursday", percent: 15, cap: 1000 },
};
