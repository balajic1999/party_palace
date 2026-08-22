export type Faq = { q: string; a: string };

/** The six questions from the brief, in the order they appear on the page. */
export const faqs: Faq[] = [
  {
    q: "How do I make a booking?",
    a: "Pick a package, date and slot on this site and pay a ₹750 advance to hold it. You can also call or WhatsApp us on +91 90323 21122 and we will book it for you in a couple of minutes.",
  },
  {
    q: "What is included in the packages?",
    a: "Every package includes the private theatre for a full three-hour slot. Beyond that it depends: the Birthday Package adds theme decoration, a cake and food; the Movie Night Package adds popcorn, snacks and beverages; the Couple Package adds romantic decor and food for two. The full list is on each package.",
  },
  {
    q: "What is the advance payment?",
    a: "A flat ₹750, whichever package you choose. It holds the slot in your name and comes off your final bill. The balance is settled at the venue on the day by cash or UPI.",
  },
  {
    q: "Is outside food allowed?",
    a: "Yes, and there is no corkage or cake-cutting charge. We also serve snacks, combos and beverages to the room if you would rather not carry anything. No alcohol on the premises.",
  },
  {
    q: "Can I reschedule my booking?",
    a: "Yes — one free reschedule if you tell us at least 24 hours before your slot, subject to availability. Call or WhatsApp us with your booking reference and we will move it.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancel more than 48 hours before your slot and the ₹750 advance carries over as credit for 90 days. Within 48 hours the advance is not refundable, because the room stays blocked and the decor is usually already ordered.",
  },
];
