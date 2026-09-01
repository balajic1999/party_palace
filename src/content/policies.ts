export type Policy = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

/**
 * Plain-language placeholder policies for the demo.
 * Have these reviewed by the owner (and ideally a lawyer) before launch.
 */
export const policies: Policy[] = [
  {
    slug: "refund",
    title: "Refunds & rescheduling",
    updated: "August 2026",
    intro:
      "The short version: cancel more than 10 days ahead and the advance comes back. Inside 10 days it stays with us, because the room is blocked and the decoration is usually already ordered.",
    sections: [
      {
        heading: "The advance",
        body: [
          "A ₹2,000 advance is collected when you book. It is adjusted against your final bill on the day of your celebration.",
          "The balance is settled at the venue, by cash or UPI, before your slot ends.",
        ],
      },
      {
        heading: "Cancelling",
        body: [
          "More than 10 days before your slot: the advance is refunded.",
          "Within 10 days of your slot: the advance is not refundable.",
          "If we cancel for any reason on our side, the advance is refunded in full to the original payment method within 5 to 7 working days.",
        ],
      },
      {
        heading: "Rescheduling",
        body: [
          "Once a slot is confirmed the time cannot be changed. Please pick your slot carefully.",
          "Rooftop bookings affected by rain can be moved indoors at no charge, or rescheduled free of cost.",
        ],
      },
      {
        heading: "Damage & conduct",
        body: [
          "Any damage to the property — the screen, seating, lighting, decoration or sound equipment — is charged at repair cost, in addition to your bill.",
          "Outside snacks and cool drinks are not allowed. Party poppers and snow sprays are strictly not permitted anywhere on the premises.",
          "Smoking and alcohol are not permitted anywhere on the premises. We reserve the right to end a slot early, without refund, if this is ignored.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of use",
    updated: "August 2026",
    intro:
      "These terms cover bookings made through this website and visits to the venue at Leela Mahal Circle, Tirupati.",
    sections: [
      {
        heading: "Bookings",
        body: [
          "A booking is confirmed only once the advance is received and you have a booking reference beginning with PP-.",
          "The person who books is responsible for their whole group for the duration of the slot.",
          "Please arrive on time. A slot cannot be extended past its end time if the next slot is booked.",
        ],
      },
      {
        heading: "What we screen",
        body: [
          "Party Palace is a private venue, not a cinema. We do not screen films that are currently in theatrical release.",
          "You choose and log into your own streaming account, or bring your own media. You are responsible for having the right to play the content you bring.",
        ],
      },
      {
        heading: "What a booking covers",
        body: [
          "Every package includes its decoration. The price on the card covers a stated number of members; anyone beyond that is charged the extra-member rate for that room.",
          "Children under seven are not counted as members and are not charged.",
          "The midnight slot carries a flat ₹2,000 surcharge.",
          "Customised decoration is available. The cost depends on the balloon colours and the design — ask us for a quote before you book.",
        ],
      },
      {
        heading: "Capacity & safety",
        body: [
          "Each room has a stated maximum occupancy which cannot be exceeded, for safety reasons.",
          "Children are welcome but must be supervised at all times, particularly on the rooftop.",
          "Open flames other than candles supplied by us are not permitted indoors.",
        ],
      },
      {
        heading: "Photography",
        body: [
          "You are welcome to photograph and film your own celebration.",
          "We may ask whether we can use photographs of your setup for our own social media. We will only do so if you say yes.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    updated: "August 2026",
    intro:
      "We collect the minimum needed to hold your slot and call you if something changes. We do not sell your details to anyone.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "Your name, phone number and email address, so we can confirm and manage your booking.",
          "Your booking details — room, date, slot, occasion, add-ons and any note you leave us.",
          "Nothing more. We do not ask for your date of birth, your address or your ID.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To confirm your booking, to reach you if a slot or the weather changes, and to have your setup ready before you arrive.",
          "We may send you an occasional offer by WhatsApp. Reply STOP once and we will not send another.",
        ],
      },
      {
        heading: "Payment details",
        body: [
          "Card and UPI details are handled entirely by our payment provider. They never reach our servers and we cannot see them.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "Ask us at any time for a copy of what we hold about you, or to delete it. Call or WhatsApp the number on the contact page and we will action it within seven days.",
        ],
      },
    ],
  },
];

export const policyBySlug = (slug: string) => policies.find((p) => p.slug === slug);
