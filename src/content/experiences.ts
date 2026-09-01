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
    blurb: "The Fun Box, decorated and ready, with a cool cake on the 2-hour pack.",
    icon: "cake",
    packageSlug: "fun-box",
  },
  {
    slug: "group-celebrations",
    name: "Group Celebrations",
    blurb: "Up to fifteen in the Hunter Box, cake included on the 2-hour pack.",
    icon: "film",
    packageSlug: "hunter-box",
  },
  {
    slug: "couple-experiences",
    name: "Couple Experiences",
    blurb: "The Love Box — a private hour for two, from ₹599.",
    icon: "heart",
    packageSlug: "love-box",
  },
  {
    slug: "rooftop-parties",
    name: "Rooftop Parties",
    blurb: "Open air for up to thirty-five, decoration and Bluetooth sound included.",
    icon: "sparkles",
    packageSlug: "roof-top",
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
