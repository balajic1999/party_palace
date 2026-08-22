import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Simple banner for inner pages (gallery, bookings, policies). */
export function PageHeader({
  title,
  lede,
  crumbs,
}: {
  title: string;
  lede?: string;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <header className="border-b border-line bg-cream">
      <div className="shell py-10 md:py-14">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-text-soft">
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  <Link href={c.href} className="transition-colors hover:text-gold-700">
                    {c.label}
                  </Link>
                  <ChevronRight strokeWidth={1.5} className="size-3" aria-hidden="true" />
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="text-[clamp(1.9rem,4.6vw,2.5rem)] font-bold leading-tight">
          {title}
        </h1>
        {lede && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-mid">{lede}</p>
        )}
      </div>
    </header>
  );
}
