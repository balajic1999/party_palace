export type IconKey = "cake" | "film" | "heart" | "sparkles";

export type Experience = {
  slug: string;
  name: string;
  blurb: string;
  icon: IconKey;
  /** which package this experience naturally leads to */
  packageSlug: string;
};

export const experiences: Experience[] = [
  {
    slug: "birthday-celebrations",
    name: "Birthday Celebrations",
    blurb: "Make birthdays magical with private theatre, decor, cake & more.",
    icon: "cake",
    packageSlug: "birthday",
  },
  {
    slug: "movie-nights",
    name: "Movie Nights",
    blurb: "Enjoy the latest movies on big screen with premium comfort.",
    icon: "film",
    packageSlug: "movie-night",
  },
  {
    slug: "couple-experiences",
    name: "Couple Experiences",
    blurb: "Perfect private setup for couples to create beautiful memories.",
    icon: "heart",
    packageSlug: "couple",
  },
  {
    slug: "special-occasions",
    name: "Special Occasions",
    blurb: "Anniversaries, proposals, family get-togethers & more.",
    icon: "sparkles",
    packageSlug: "birthday",
  },
];

export type Reason = { title: string; blurb: string; icon: ReasonIcon };
export type ReasonIcon = "lock" | "star" | "smile" | "food" | "calendar";

export const reasons: Reason[] = [
  {
    title: "Private & Premium",
    blurb: "100% private spaces for you and your guests.",
    icon: "lock",
  },
  {
    title: "High Quality",
    blurb: "Premium sound, screen and comfort.",
    icon: "star",
  },
  {
    title: "Hassle Free",
    blurb: "We take care of everything, you enjoy.",
    icon: "smile",
  },
  {
    title: "Great Food",
    blurb: "Delicious food and customized menus.",
    icon: "food",
  },
  {
    title: "Perfect for Any Occasion",
    blurb: "Birthdays, dates, proposals, and more.",
    icon: "calendar",
  },
];
