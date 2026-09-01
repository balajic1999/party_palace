/**
 * A package is sold in one or more duration packs. Price, the number of
 * members the price covers, and whether a cake is included all change with the
 * pack — so they live on the pack, not on the package.
 */
export type PackagePack = {
  id: string;
  /** What the pack is called on the price card. */
  label: string;
  /** Undefined for packs that are not sold by the hour (the rooftop). */
  hours?: number;
  price: number;
  /** Members the price covers before the extra-member charge starts. */
  baseGuests: number;
  /** Cake included in this pack, or null when the card says "without cake". */
  cake: string | null;
};

export type Package = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  packs: PackagePack[];
  /** Room capacity. Members beyond a pack's baseGuests cost extraGuestPrice each. */
  maxGuests: number;
  extraGuestPrice: number;
  features: string[];
  includes: string[];
  image?: string;
  seed: string;
  popular?: boolean;
};

/**
 * The rooms and their packs, taken from the printed price cards
 * (PackageDetails.pdf). Every package includes its decoration.
 *
 * `image` currently points at licensed stock, not the real venue — see
 * public/images/README.md.
 */
export const packages: Package[] = [
  {
    slug: "love-box",
    name: "Love Box",
    tagline: "A private room for two, decorated before you walk in.",
    blurb:
      "The smallest and quietest of the rooms. Built for anniversaries, first dates and proposals — the decoration is already up when you arrive, and the price covers the two of you.",
    packs: [
      { id: "1h", label: "1 hour", hours: 1, price: 599, baseGuests: 2, cake: null },
      { id: "2h", label: "2 hours", hours: 2, price: 1299, baseGuests: 2, cake: null },
    ],
    maxGuests: 2,
    extraGuestPrice: 0,
    features: ["Private theatre", "Decoration complimentary", "2 members entry", "1 or 2 hour packs"],
    includes: [
      "The private theatre for your whole pack",
      "Decoration set up before you arrive — complimentary",
      "Entry for 2 members",
      "Name or message shown on the big screen",
      "Cake is not part of this pack — tell us and we will arrange one",
      "Free parking at American Towers",
    ],
    image: "/images/pkg-couple.jpg",
    seed: "pkg-love-box",
  },
  {
    slug: "fun-box",
    name: "Fun Box",
    tagline: "The everyday celebration room, cake included on the 2-hour pack.",
    blurb:
      "Room enough for a small group, decorated and ready. Take the two-hour pack and a cool cake comes with it; bring up to eight in total at ₹200 a head beyond the pack.",
    packs: [
      { id: "1h", label: "1 hour", hours: 1, price: 1299, baseGuests: 4, cake: null },
      { id: "2h", label: "2 hours", hours: 2, price: 2650, baseGuests: 5, cake: "Cool cake" },
    ],
    maxGuests: 8,
    extraGuestPrice: 200,
    popular: true,
    features: ["Private theatre", "Decoration complimentary", "Up to 8 members", "Cool cake on the 2-hour pack"],
    includes: [
      "The private theatre for your whole pack",
      "Decoration set up before you arrive — complimentary",
      "4 members on the 1-hour pack, 5 on the 2-hour pack",
      "A cool cake with the 2-hour pack, in the flavour you pick",
      "Extra members at ₹200 each, up to 8 in the room",
      "Name or message shown on the big screen",
      "Free parking at American Towers",
    ],
    image: "/images/pkg-birthday.jpg",
    seed: "pkg-fun-box",
  },
  {
    slug: "hunter-box",
    name: "Hunter Box",
    tagline: "The big indoor room — up to fifteen, cake on the 2-hour pack.",
    blurb:
      "The largest of the theatre rooms. Decorated before you arrive, big enough for the whole group, and the two-hour pack comes with a cake in the flavour you choose.",
    packs: [
      { id: "1h", label: "1 hour", hours: 1, price: 1799, baseGuests: 4, cake: null },
      { id: "2h", label: "2 hours", hours: 2, price: 3150, baseGuests: 5, cake: "Cake" },
    ],
    maxGuests: 15,
    extraGuestPrice: 300,
    features: ["Private theatre", "Decoration complimentary", "Up to 15 members", "Cake on the 2-hour pack"],
    includes: [
      "The private theatre for your whole pack",
      "Decoration set up before you arrive — complimentary",
      "4 members on the 1-hour pack, 5 on the 2-hour pack",
      "A cake with the 2-hour pack, in the flavour you pick",
      "Extra members at ₹300 each, up to 15 in the room",
      "Name or message shown on the big screen",
      "Free parking at American Towers",
    ],
    image: "/images/pkg-movie.jpg",
    seed: "pkg-hunter-box",
  },
  {
    slug: "roof-top",
    name: "Roof Top",
    tagline: "Open air, ten members in, and room for thirty-five.",
    blurb:
      "The rooftop is booked as one package rather than by the hour. Decoration is included, the sound system takes Bluetooth from your phone, and the space holds thirty-five.",
    packs: [
      { id: "package", label: "Full package", price: 6499, baseGuests: 10, cake: null },
    ],
    maxGuests: 35,
    extraGuestPrice: 300,
    features: ["Open-air rooftop", "Decoration included", "10 members entry", "Bluetooth sound system"],
    includes: [
      "The rooftop to yourselves",
      "Decoration included",
      "Entry for 10 members",
      "Extra members at ₹300 each, up to 35 on the roof",
      "Sound system with Bluetooth connectivity",
      "Free parking at American Towers",
    ],
    image: "/images/g-string-lights.jpg",
    seed: "pkg-roof-top",
  },
];

export const packageBySlug = (slug: string) => packages.find((p) => p.slug === slug);

/** The pack a package opens on, and the one a price is quoted "from". */
export const defaultPack = (pkg: Package) => pkg.packs[0];

export const packBySlug = (slug: string, packId: string) =>
  packageBySlug(slug)?.packs.find((p) => p.id === packId);

/**
 * The pack to price a booking at: the one asked for, falling back to the
 * package's first pack so a stale or missing id never zeroes out a quote.
 */
export const resolvePack = (pkg: Package, packId: string | undefined) =>
  pkg.packs.find((p) => p.id === packId) ?? defaultPack(pkg);

/** Lowest price in a package — what the cards show as "starts from". */
export const packageFrom = (pkg: Package) => Math.min(...pkg.packs.map((p) => p.price));

export const startingPrice = Math.min(...packages.map(packageFrom));
