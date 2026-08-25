import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site, addressOneLine } from "@/content/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://partypalace.in"),
  title: {
    default: "Party Palace — Private Theatre in Tirupati",
    template: "%s · Party Palace, Tirupati",
  },
  description: site.shortDesc,
  keywords: [
    "private theatre Tirupati",
    "birthday celebration Tirupati",
    "movie night Tirupati",
    "couple private theatre",
    "Leela Mahal Circle",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: "Party Palace — Private Theatre in Tirupati",
    description: site.shortDesc,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2e1526",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovieTheater",
  name: site.legalName,
  description: site.shortDesc,
  telephone: site.phone,
  email: site.email,
  url: "https://partypalace.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.pin,
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 10:00-22:00",
  priceRange: "₹₹",
  hasMap: site.mapsUrl,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {/* clears the fixed header: 70px bar on mobile, + 36px utility strip
            from md. --header-h in globals.css holds the same two numbers, and
            anything else that has to clear the bar reads them from there. */}
        {/* No entrance animation wraps this element, deliberately. A page-level
            opacity wrapper drops every fixed overlay inside the page (the
            gallery lightbox, the booking wizard's mobile bar) behind the fixed
            header, because both a filling keyframe and a running transition
            make the wrapper a stacking context. Page entrances are applied per
            element instead — see .enter-up in globals.css. */}
        <main id="main" className="pt-[var(--header-h)]">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#fffaf5",
              border: "1px solid #e6d3c2",
              color: "#35222f",
            },
          }}
        />
        <span className="sr-only">{addressOneLine}</span>
      </body>
    </html>
  );
}
