import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // the booking flow and confirmations carry personal data — keep them out of search
      disallow: ["/book", "/book/confirm", "/booking/", "/my-bookings"],
    },
    sitemap: "https://partypalace.co.in/sitemap.xml",
  };
}
