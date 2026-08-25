import Link from "next/link";
import { ArrowRight, CalendarCheck, MessageCircle, Phone } from "lucide-react";

import { Section, SectionHead } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import { HeroMedia } from "@/components/home/hero-media";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { ExperienceGlyph, ReasonGlyph } from "@/components/ui/icons";
import { PackageCard } from "@/components/package-card";
import { ReviewsMarquee } from "@/components/home/reviews-marquee";

import { site, whatsappLink } from "@/content/site";
import { experiences, reasons } from "@/content/experiences";
import { packages } from "@/content/packages";
import { galleryPreview } from "@/content/gallery";
import { faqs } from "@/content/faqs";
import { formatINR } from "@/lib/utils";

export default function HomePage() {
  const half = Math.ceil(faqs.length / 2);

  return (
    <>
      {/* ── 1 · hero ───────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-plum-900">
        <HeroMedia />

        <div className="shell relative py-20 md:py-28 lg:py-32">
          <div className="max-w-xl">
            <p className="enter-up text-[11px] font-semibold uppercase tracking-[0.24em] text-coral-400">
              Private theatre &middot; {site.city}
            </p>

            <h1 className="enter-up stagger-1 mt-5 font-display text-[clamp(2.4rem,7vw,3.6rem)] font-semibold leading-[1.06] text-white">
              Celebrate.
              <br />
              Watch.
              <br />
              <span className="text-coral-400">Experience.</span>
            </h1>

            <p className="enter-up stagger-2 mt-6 max-w-md text-[15.5px] leading-relaxed text-white/75">
              Private theatre experiences in {site.city} that make every moment
              special.
            </p>

            <div className="enter-up stagger-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/book" size="lg" className="group">
                <CalendarCheck strokeWidth={1.8} className="size-[18px]" />
                Book Your Experience
                <ArrowRight
                  strokeWidth={2}
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(
                  `Hi ${site.name}, I would like to check availability for a booking.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="onDark"
              >
                <MessageCircle strokeWidth={1.8} className="size-[18px]" />
                WhatsApp Us
              </ButtonLink>
            </div>

            <a
              href={site.phoneHref}
              className="enter-up stagger-4 mt-7 inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors duration-200 hover:text-coral-400"
            >
              <Phone strokeWidth={1.8} className="size-4 text-coral-500" />
              Call Us: <span className="tnum text-white">{site.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2 · experiences ────────────────────────────────────── */}
      <Section id="experiences">
        <SectionHead
          eyebrow="What we do"
          title="Choose your kind of celebration"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp, i) => (
            <Reveal key={exp.slug} delay={i * 0.05}>
              <Link
                href={`/packages/${exp.packageSlug}`}
                className="lift flex h-full gap-4 rounded-md border border-line bg-white p-5 lg:flex-col lg:gap-3"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-coral-50 text-coral-700">
                  <ExperienceGlyph name={exp.icon} />
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-text">{exp.name}</span>
                  <span className="mt-1.5 block text-[13px] leading-relaxed text-text-mid">
                    {exp.blurb}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 3 · packages ───────────────────────────────────────── */}
      <Section id="packages" tone="cream">
        <SectionHead
          eyebrow="Packages"
          title="Priced up front, nothing hidden"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={i * 0.06} className="h-full">
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-[13.5px] text-text-mid">
          All packages include the theatre for a full three-hour slot. Hold any
          slot with a{" "}
          <span className="tnum font-semibold text-text">{formatINR(site.advance)}</span>{" "}
          advance — the balance is paid at the venue.
        </p>
      </Section>

      {/* ── 4 · gallery preview ────────────────────────────────── */}
      <Section id="gallery">
        <SectionHead eyebrow="Gallery" title="Inside the room" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {galleryPreview.map((item, i) => (
            <Reveal
              key={item.seed}
              delay={i * 0.04}
              className={i === 0 ? "col-span-2 sm:col-span-1" : undefined}
            >
              <Link
                href="/gallery"
                className="lift group block overflow-hidden rounded-md border border-line"
                aria-label={`Gallery — ${item.alt}`}
              >
                <Frame
                  src={item.src}
                  alt={item.alt}
                  seed={item.seed}
                  ratio="aspect-[4/3]"
                  className="transition-transform duration-[600ms] ease-out-soft group-hover:scale-[1.04]"
                />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <ButtonLink href="/gallery" variant="outline" size="md">
            View Full Gallery
          </ButtonLink>
        </div>
      </Section>

      {/* ── 5 · why choose us (also the About Us anchor) ───────── */}
      <Section id="about" tone="cream">
        <SectionHead
          eyebrow="Why us"
          title="Why people book with Party Palace"
          lede="Tirupati's premium destination for private theatre experiences and unforgettable celebrations."
        />
        <ul className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05} as="li" className="group text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full border border-coral-500/40 bg-white text-coral-700 transition-all duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:border-coral-500 group-hover:bg-coral-50">
                <ReasonGlyph name={r.icon} />
              </span>
              <h3 className="mt-4 text-[14.5px] font-bold text-text">{r.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-text-mid">{r.blurb}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── 6 · testimonials ───────────────────────────────────────
           Full-bleed on purpose: the strip runs edge to edge so it reads as
           continuing past the screen, which is the whole point of a marquee.
           `Section` is not used here because it constrains to .shell. */}
      <section className="overflow-hidden bg-plum-900 py-16 md:py-20">
        <div className="shell">
          <SectionHead
            eyebrow="Reviews"
            title="What our guests say"
            tone="light"
          />
        </div>
        <div className="mt-10">
          <ReviewsMarquee />
        </div>
      </section>

      {/* ── 7 · faq ────────────────────────────────────────────── */}
      <Section id="faq" tone="cream">
        <SectionHead eyebrow="FAQ" title="Questions we get asked" />
        <div className="mt-10 grid gap-3 md:grid-cols-2 md:gap-5">
          <Accordion items={faqs.slice(0, half)} />
          <Accordion items={faqs.slice(half)} />
        </div>
      </Section>

      {/* closing call to action */}
      <section className="bg-plum-900">
        <div className="shell flex flex-col items-center gap-6 py-14 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-[24px] font-semibold leading-tight text-white sm:text-[29px]">
              Ready to plan your celebration?
            </h2>
            <p className="mt-2 text-[14px] text-white/65">
              Pick a package and hold your slot in under two minutes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book" size="lg">
              Book Now
            </ButtonLink>
            <ButtonLink href={site.phoneHref} size="lg" variant="onDark">
              <Phone strokeWidth={1.8} className="size-4" />
              {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
