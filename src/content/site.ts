/**
 * Single source of truth for business facts.
 * Everything here is real, verified information for the Tirupati venue.
 */

export const site = {
  name: "Party Palace",
  legalName: "Party Palace — Private Theatre",
  city: "Tirupati",

  tagline: "Celebrate in style",
  shortDesc:
    "Private theatre experiences in Tirupati that make every moment special. Birthdays, movie nights, anniversaries and proposals — the whole room to yourselves.",

  phone: "+91 90323 21122",
  phoneHref: "tel:+919032321122",
  whatsapp: "919032321122",
  email: "hello@partypalace.in",

  address: {
    line1: "American Towers, 20-3-125A",
    line2: "Leela Mahal Circle, opposite Keerthi Medicals",
    line3: "Srinivasa Nagar, Akkarampalle",
    city: "Tirupati",
    state: "Andhra Pradesh",
    pin: "517501",
  },

  mapsUrl: "https://maps.app.goo.gl/2otZHWpYgVr21GNfA",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Party+Palace+Private+Theater,+American+Towers,+Leela+Mahal+Circle,+Akkarampalle,+Tirupati,+Andhra+Pradesh+517501&output=embed",

  hoursLabel: "10:00 AM – 12:30 AM",
  hoursNote: "All days · the midnight slot carries a ₹2,000 surcharge",

  /** Advance held at the time of booking; the rest is settled at the venue. */
  advance: 2000,

  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
} as const;

export const addressLines = [
  site.address.line1,
  site.address.line2,
  site.address.line3,
  `${site.address.city}, ${site.address.state} ${site.address.pin}`,
];

export const addressOneLine = addressLines.join(", ");

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
