import Link from "next/link";
import { Check } from "lucide-react";
import { Frame } from "@/components/ui/frame";
import { ButtonLink } from "@/components/ui/button";
import type { Package } from "@/content/packages";
import { cn, formatINR } from "@/lib/utils";

export function PackageCard({ pkg, className }: { pkg: Package; className?: string }) {
  return (
    <article
      className={cn(
        "lift flex h-full flex-col overflow-hidden rounded-md border border-line bg-white",
        className,
      )}
    >
      <div className="relative">
        <Frame
          src={pkg.image}
          alt={pkg.name}
          seed={pkg.seed}
          label={pkg.name.replace(" Package", "")}
          ratio="aspect-[16/9]"
        />
        {pkg.popular && (
          <span className="absolute left-3 top-3 rounded-sm bg-gold-500 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-ink-900">
            Most booked
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[18px] font-bold text-text">{pkg.name}</h3>
        {/* fixed height so the price row lines up across all three cards */}
        <p className="mt-1.5 min-h-[2.6em] text-[13.5px] leading-relaxed text-text-mid">
          {pkg.tagline}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-b border-line pb-4">
          <span className="text-[11px] uppercase tracking-[0.12em] text-text-soft">
            Starts from
          </span>
          <span className="tnum text-[24px] font-bold leading-none text-gold-600">
            {formatINR(pkg.price)}
          </span>
        </div>

        <ul className="mt-4 space-y-2">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[13.5px] text-text-mid">
              <Check strokeWidth={2} className="mt-0.5 size-3.5 shrink-0 text-gold-600" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-2 pt-1">
          <ButtonLink
            href={`/packages/${pkg.slug}`}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            View Details
          </ButtonLink>
          <ButtonLink href={`/book?pkg=${pkg.slug}`} size="sm" className="flex-1">
            Book Now
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

export function PackageCardCompact({ pkg }: { pkg: Package }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="lift block overflow-hidden rounded-md border border-line bg-white"
    >
      <Frame
        src={pkg.image}
        alt={pkg.name}
        seed={pkg.seed}
        label={pkg.name.replace(" Package", "")}
        ratio="aspect-[16/9]"
      />
      <div className="p-4">
        <h3 className="text-[17px] font-bold text-text">{pkg.name}</h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-text-soft">
          Starts from
        </p>
        <p className="tnum mt-0.5 text-[22px] font-bold leading-none text-gold-600">
          {formatINR(pkg.price)}
        </p>
      </div>
    </Link>
  );
}
