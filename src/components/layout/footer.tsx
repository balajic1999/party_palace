import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { site, addressLines, whatsappLink } from "@/content/site";

const QUICK = [
  { href: "/", label: "Home" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/#packages", label: "Packages" },
  { href: "/#gallery", label: "Gallery" },
];

const MORE = [
  { href: "/#about", label: "About Us" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact Us" },
  { href: "/book", label: "Book Now" },
];

export function Footer() {
  const waLink = whatsappLink(
    `Hi ${site.name}, I would like to check availability for a booking.`,
  );

  return (
    <>
      {/* Quick contact — phone only, matching the mobile layout */}
      <section className="bg-ink-800 py-8 sm:hidden" aria-label="Quick contact">
        <h2 className="text-center font-display text-[18px] font-semibold text-white">
          Quick Contact
        </h2>
        <div className="mt-5 flex items-start justify-center gap-10">
          <QuickAction href={site.phoneHref} label="Call Us">
            <Phone strokeWidth={1.6} className="size-[18px]" />
          </QuickAction>
          <QuickAction href={waLink} label="WhatsApp" external>
            <MessageCircle strokeWidth={1.6} className="size-[18px]" />
          </QuickAction>
          <QuickAction href={site.mapsUrl} label="Directions" external>
            <Navigation strokeWidth={1.6} className="size-[18px]" />
          </QuickAction>
        </div>

        <h2 className="mt-8 text-center text-[13px] font-semibold uppercase tracking-[0.2em] text-white/70">
          Follow Us
        </h2>
        <div className="mt-4 flex justify-center gap-3">
          <Social href={site.socials.facebook} label="Facebook">
            <FacebookGlyph />
          </Social>
          <Social href={site.socials.instagram} label="Instagram">
            <InstagramGlyph />
          </Social>
        </div>
      </section>

      <footer id="contact" className="bg-ink-900 text-white/75">
        <div className="shell py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            {/* brand */}
            <div className="md:col-span-4">
              <Logo tone="light" className="!text-left" />
              <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-white/60">
                Tirupati&rsquo;s premium destination for private theatre
                experiences and unforgettable celebrations.
              </p>
              <div className="mt-6 flex gap-2.5">
                <Social href={site.socials.facebook} label="Facebook">
                  <FacebookGlyph />
                </Social>
                <Social href={site.socials.instagram} label="Instagram">
                  <InstagramGlyph />
                </Social>
                <Social href={waLink} label="WhatsApp">
                  <MessageCircle strokeWidth={1.5} className="size-[17px]" />
                </Social>
              </div>
            </div>

            {/* links */}
            <div className="md:col-span-3">
              <FooterHeading>Quick Links</FooterHeading>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                <ul className="space-y-3">
                  {QUICK.map((l) => (
                    <li key={l.label}>
                      <FooterLink href={l.href}>{l.label}</FooterLink>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {MORE.map((l) => (
                    <li key={l.label}>
                      <FooterLink href={l.href}>{l.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* contact */}
            <div className="md:col-span-3">
              <FooterHeading>Contact Us</FooterHeading>
              <address className="mt-5 space-y-3.5 not-italic text-[13.5px] leading-relaxed">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 text-white/60 transition-colors hover:text-white"
                >
                  <MapPin strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  <span>
                    {addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </a>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 text-white/60 transition-colors hover:text-white"
                >
                  <Phone strokeWidth={1.5} className="size-4 shrink-0 text-gold-500" />
                  <span className="tnum">{site.phone}</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-white/60 transition-colors hover:text-white"
                >
                  <Mail strokeWidth={1.5} className="size-4 shrink-0 text-gold-500" />
                  {site.email}
                </a>
                <p className="flex items-center gap-2.5 text-white/60">
                  <Clock strokeWidth={1.5} className="size-4 shrink-0 text-gold-500" />
                  <span className="tnum">
                    {site.hoursLabel} ({site.hoursNote})
                  </span>
                </p>
              </address>
            </div>

            {/* map */}
            <div className="md:col-span-2">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-sm border border-white/15"
                aria-label="Open Party Palace in Google Maps"
              >
                <iframe
                  src={site.mapEmbedUrl}
                  title={`Map showing ${site.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none h-[150px] w-full border-0"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="shell flex flex-col gap-3 py-5 text-[12.5px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/policies/privacy"
                  className="link-sweep transition-colors duration-200 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/terms"
                  className="link-sweep transition-colors duration-200 hover:text-white"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

function QuickAction({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex w-20 flex-col items-center gap-2 text-center"
    >
      <span className="grid size-12 place-items-center rounded-full border border-gold-500/50 bg-white/5 text-gold-400 transition-all duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:border-gold-400 group-hover:bg-white/10">
        {children}
      </span>
      <span className="text-[12px] text-white/70">{label}</span>
    </a>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-500">
      {children}
    </h2>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="link-sweep text-[13.5px] text-white/60 transition-colors duration-200 hover:text-gold-400"
    >
      {children}
    </Link>
  );
}

/* Brand glyphs were removed from lucide-react, so these are drawn here. */
function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[17px]" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[17px]" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14.6 8.4h-1.2c-.85 0-1.4.55-1.4 1.35V11h2.45l-.35 2.35H12V19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.8 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center rounded-full border border-white/20 text-white/70 transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-gold-500 hover:bg-white/5 hover:text-gold-400"
    >
      {children}
    </a>
  );
}
