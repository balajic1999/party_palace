export type Package = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  price: number;
  baseGuests: number;
  maxGuests: number;
  extraGuestPrice: number;
  durationHours: number;
  features: string[];
  includes: string[];
  image?: string;
  seed: string;
  popular?: boolean;
};

/**
 * The three headline packages.
 * Prices are placeholders from the design brief — confirm with the owner.
 * `image` currently points at licensed stock, not the real venue — see
 * public/images/README.md.
 */
export const packages: Package[] = [
  {
    slug: "birthday",
    name: "Birthday Package",
    tagline: "The perfect birthday celebration for your special day.",
    blurb:
      "Walk into a room that is already decorated, with the name on the screen and the cake kept cold until you call for it. Three hours, entirely yours.",
    price: 2999,
    baseGuests: 6,
    maxGuests: 12,
    extraGuestPrice: 300,
    durationHours: 3,
    popular: true,
    features: ["Private Theatre", "Theme Decoration", "Cake", "Food & Beverages"],
    includes: [
      "Private theatre for the full three-hour slot",
      "Theme decoration set up before you arrive",
      "Half-kilo cake in your choice of flavour",
      "Name or message shown on the big screen",
      "Food and beverages served to your seat",
      "Free parking at American Towers",
    ],
    image: "/images/pkg-birthday.jpg",
    seed: "pkg-birthday",
  },
  {
    slug: "movie-night",
    name: "Movie Night Package",
    tagline: "Enjoy movies with your loved ones.",
    blurb:
      "No decoration, no occasion, no fuss — just the whole theatre to yourselves with whatever you feel like watching, and snacks that keep coming.",
    price: 1999,
    baseGuests: 4,
    maxGuests: 10,
    extraGuestPrice: 250,
    durationHours: 3,
    features: ["Private Theatre", "Popcorn & Snacks", "Beverages", "Comfort Seating"],
    includes: [
      "Private theatre for the full three-hour slot",
      "Stream from your own Netflix, Prime or YouTube",
      "Popcorn and a snack platter",
      "Soft drinks and beverages",
      "Recliner-style comfort seating",
      "Free parking at American Towers",
    ],
    image: "/images/pkg-movie.jpg",
    seed: "pkg-movie",
  },
  {
    slug: "couple",
    name: "Couple Package",
    tagline: "A cozy and private experience just for two.",
    blurb:
      "Built for anniversaries, first dates and proposals. Low lighting, a rose path to the seats, and staff who stay out of your photographs.",
    price: 2499,
    baseGuests: 2,
    maxGuests: 4,
    extraGuestPrice: 350,
    durationHours: 3,
    features: ["Private Theatre", "Romantic Decor", "Food & Drinks", "Special Add-ons"],
    includes: [
      "Private theatre for the full three-hour slot",
      "Romantic decor with candles and florals",
      "Rose petal path and low ambient lighting",
      "Food and drinks for two",
      "Your message timed to the exact minute",
      "Free parking at American Towers",
    ],
    image: "/images/pkg-couple.jpg",
    seed: "pkg-couple",
  },
];

export const packageBySlug = (slug: string) => packages.find((p) => p.slug === slug);

export const startingPrice = Math.min(...packages.map((p) => p.price));
