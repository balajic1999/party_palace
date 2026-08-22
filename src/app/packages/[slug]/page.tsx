import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Clock, Users } from "lucide-react";

import { Section, SectionHead } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import { PackageCard } from "@/components/package-card";
import { packageBySlug, packages } from "@/content/packages";
import { addOnGroups } from "@/content/addons";
import { site } from "@/content/site";
import { formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) return {};
  return { title: pkg.name, description: pkg.tagline };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) notFound();

  const others = packages.filter((p) => p.slug !== pkg.slug);

  return (
    <>
      {/* header */}
      <div className="border-b border-line bg-cream">
        <div className="shell py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-[12px] text-text-soft">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-700">
                  Home
                </Link>
              </li>
              <ChevronRight strokeWidth={1.5} className="size-3" aria-hidden="true" />
              <li>
                <Link href="/#packages" className="transition-colors hover:text-gold-700">
                  Packages
                </Link>
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Frame
                src={pkg.image}
                alt={pkg.name}
                seed={pkg.seed}
                label={pkg.name.replace(" Package", "")}
                ratio="aspect-[16/9]"
                className="rounded-md"
              />
            </div>

            <div className="lg:col-span-5">
              <h1 className="text-[clamp(1.9rem,4.6vw,2.5rem)] font-bold leading-tight">
                {pkg.name}
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-text-mid">
                {pkg.blurb}
              </p>

              <div className="mt-6 flex items-end gap-4 border-y border-line py-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-text-soft">
                    Starts from
                  </p>
                  <p className="tnum mt-1 text-[32px] font-bold leading-none text-gold-600">
                    {formatINR(pkg.price)}
                  </p>
                </div>
                <ul className="ml-auto space-y-1.5 text-[13px] text-text-mid">
                  <li className="flex items-center gap-2">
                    <Users strokeWidth={1.5} className="size-3.5 text-gold-600" />
                    <span className="tnum">
                      {pkg.baseGuests}&ndash;{pkg.maxGuests} guests
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock strokeWidth={1.5} className="size-3.5 text-gold-600" />
                    {pkg.durationHours} hours
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/book?pkg=${pkg.slug}`} size="lg" className="group">
                  Book this package
                  <ArrowRight
                    strokeWidth={2}
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </ButtonLink>
                <ButtonLink href={site.phoneHref} size="lg" variant="outline">
                  Call to ask
                </ButtonLink>
              </div>

              <p className="mt-4 text-[12.5px] text-text-soft">
                Hold your slot with a{" "}
                <span className="tnum font-semibold text-text">
                  {formatINR(site.advance)}
                </span>{" "}
                advance. Balance paid at the venue.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* what's included */}
      <Section size="tight">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h2 className="text-[20px] font-bold">What&rsquo;s included</h2>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-text-mid">
              Everything below is part of the {formatINR(pkg.price)} price. Nothing
              appears on your bill that isn&rsquo;t listed here or chosen by you.
            </p>
          </div>
          <ul className="grid gap-3 md:col-span-7 sm:grid-cols-2">
            {pkg.includes.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-text-mid">
                <Check strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-gold-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* optional extras */}
      <Section size="tight" tone="cream">
        <SectionHead
          title="Optional Extras"
          lede="Add any of these while booking, or decide on the day."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {addOnGroups.map((group) => (
            <div key={group.id} className="rounded-md border border-line bg-white p-5">
              <h3 className="text-[16px] font-bold">{group.name}</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]"
                  >
                    <span className="text-text-mid">{item.name}</span>
                    <span className="tnum shrink-0 font-semibold text-text">
                      {formatINR(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* other packages */}
      <Section size="tight">
        <SectionHead title="Other Packages" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {others.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
