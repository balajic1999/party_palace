export type GalleryItem = {
  seed: string;
  alt: string;
  tag: string;
  src?: string;
};

/**
 * NOTE: these are licensed stock photographs, not photographs of the Tirupati
 * venue. They are here so the site looks finished for the demo. Replace them
 * with real photos of the actual rooms before this goes live — see
 * public/images/README.md and CREDITS.md.
 *
 * The first five feed the homepage preview strip.
 */
export const gallery: GalleryItem[] = [
  {
    src: "/images/g-screen.jpg",
    seed: "g-screen",
    alt: "The screen lit up in a darkened theatre",
    tag: "Theatre",
  },
  {
    src: "/images/g-neon-together.jpg",
    seed: "g-neon-together",
    alt: "Neon lettering glowing above a decorated wall",
    tag: "Decor",
  },
  {
    src: "/images/g-candles-cake.jpg",
    seed: "g-candles-cake",
    alt: "Birthday candles lit in a dark room",
    tag: "Birthday",
  },
  {
    src: "/images/g-hall.jpg",
    seed: "g-hall",
    alt: "Theatre seating facing a lit screen",
    tag: "Theatre",
  },
  {
    src: "/images/g-string-lights.jpg",
    seed: "g-string-lights",
    alt: "Warm string lights strung overhead",
    tag: "Decor",
  },
  {
    src: "/images/g-audience.jpg",
    seed: "g-audience",
    alt: "A group settled into their seats for a film",
    tag: "Movie Night",
  },
  {
    src: "/images/g-curtains.jpg",
    seed: "g-curtains",
    alt: "Stage curtains lit above the seating",
    tag: "Theatre",
  },
  {
    src: "/images/g-celebration.jpg",
    seed: "g-celebration",
    alt: "Friends celebrating together under low light",
    tag: "Birthday",
  },
  {
    src: "/images/g-candles-warm.jpg",
    seed: "g-candles-warm",
    alt: "Candles set out for a couple's booking",
    tag: "Couple",
  },
  {
    src: "/images/g-rose-petals.jpg",
    seed: "g-rose-petals",
    alt: "Rose petals laid out before guests arrive",
    tag: "Couple",
  },
  {
    src: "/images/g-fairy-lights.jpg",
    seed: "g-fairy-lights",
    alt: "Fairy lights and decor detail",
    tag: "Decor",
  },
  {
    src: "/images/g-popcorn.jpg",
    seed: "g-popcorn",
    alt: "Fresh popcorn served to your seat",
    tag: "Food",
  },
];

export const galleryTags = ["All", ...Array.from(new Set(gallery.map((g) => g.tag)))];

export const galleryPreview = gallery.slice(0, 5);
