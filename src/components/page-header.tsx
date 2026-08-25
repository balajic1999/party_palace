import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { href: string; label: string };

/**
 * Breadcrumb trail. Shared so the packages page and the PageHeader banner
 * cannot drift apart — they were two separate copies before.
 */
export function Breadcrumb({
  crumbs,
  className,
}: {
  crumbs: Crumb[];
  className?: string;
}) {
  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-text-soft">
        {crumbs.map((c) => (
          <li key={c.href} className="flex items-center gap-1.5">
            <Link
              href={c.href}
              className="link-sweep transition-colors duration-200 hover:text-coral-700"
            >
              {c.label}
            </Link>
            <ChevronRight strokeWidth={1.5} className="size-3" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Banner for inner pages — gallery, bookings, policies, and the booking flow.
 * Every page that is not the homepage opens with this, so the step down from
 * the fixed header into the page reads the same way everywhere.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  /** optional slot on the right — step counters, actions */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative isolate overflow-hidden border-b border-line bg-cream",
        className,
      )}
    >
      {/* warm glow, top-right. Decoration only. */}
      <div
        className="beam -right-[10%] -top-[120%] h-[300px] w-[520px]"
        aria-hidden="true"
      />

      <div className="shell relative py-10 md:py-14">
        {crumbs && crumbs.length > 0 && <Breadcrumb crumbs={crumbs} className="mb-5" />}

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="enter-up">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coral-700">
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "font-display text-[clamp(1.9rem,4.6vw,2.6rem)] font-semibold leading-[1.12]",
                eyebrow && "mt-2.5",
              )}
            >
              {title}
            </h1>
            <span className="rule-ornament is-start mt-4" aria-hidden="true">
              <span />
            </span>
            {lede && (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-text-mid">
                {lede}
              </p>
            )}
          </div>

          {children && <div className="enter-up stagger-2">{children}</div>}
        </div>
      </div>
    </header>
  );
}
