export type Testimonial = {
  name: string;
  quote: string;
  rating: number;
};

/**
 * Placeholder reviews carried over from the design brief.
 * Replace with real, permission-given reviews (or the venue's actual Google
 * reviews) before launch. Do not ship invented quotes as real ones.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Rahul Kumar",
    rating: 5,
    quote:
      "Amazing experience! The private theatre and decorations were perfect for my birthday.",
  },
  {
    name: "Sneha Reddy",
    rating: 5,
    quote:
      "One of the best places in Tirupati to celebrate special occasions. Highly recommended!",
  },
  {
    name: "Arjun & Priya",
    rating: 5,
    quote:
      "Great ambience, lovely food and excellent service. We will definitely come again.",
  },
];
