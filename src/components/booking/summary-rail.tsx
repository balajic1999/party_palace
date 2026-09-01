"use client";

import { CalendarDays, Clock, Users } from "lucide-react";
import type { Quote } from "@/lib/pricing";
import type { BookingDraft } from "@/lib/types";
import { packageBySlug } from "@/content/packages";
import { slotById } from "@/content/slots";
import { site } from "@/content/site";
import { cn, formatINR, fromISODate, to12h } from "@/lib/utils";

export function SummaryRail({
  draft,
  quote,
  className,
}: {
  draft: BookingDraft;
  quote: Quote;
  className?: string;
}) {
  const pkg = packageBySlug(draft.pkg);
  const slot = slotById(draft.slot);

  return (
    <div
      className={cn(
        "rounded-md border border-line bg-cream p-5 sm:p-6 shadow-card",
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coral-700">
        Your booking
      </p>

      {pkg ? (
        <>
          <h2 className="mt-2.5 font-display text-[22px] font-semibold leading-tight text-text">
            {pkg.name}
          </h2>

          <ul className="mt-3 space-y-2 text-[13px] text-text-mid">
            {draft.date && (
              <li className="flex items-center gap-2.5">
                <CalendarDays strokeWidth={1.5} className="size-3.5 shrink-0 text-coral-700" />
                {fromISODate(draft.date).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                })}
              </li>
            )}
            {slot && (
              <li className="flex items-center gap-2.5">
                <Clock strokeWidth={1.5} className="size-3.5 shrink-0 text-coral-700" />
                <span className="tnum">
                  {to12h(slot.start)} &ndash; {to12h(slot.end)}
                </span>
              </li>
            )}
            <li className="flex items-center gap-2.5">
              <Users strokeWidth={1.5} className="size-3.5 shrink-0 text-coral-700" />
              <span className="tnum">{draft.guests}</span> guests
            </li>
          </ul>
        </>
      ) : (
        <p className="mt-3 text-[14px] text-text-soft">
          Pick a package to see your total.
        </p>
      )}

      {quote.lines.length > 0 && (
        <>
          <ul className="mt-5 space-y-2.5 border-t border-line pt-4">
            {quote.lines.map((line) => (
              <li
                key={line.key}
                className="flex items-baseline justify-between gap-4 text-[13px]"
              >
                <span className="min-w-0">
                  <span className="text-text-mid">{line.label}</span>
                  {line.detail && (
                    <span className="block text-[11.5px] text-text-soft">{line.detail}</span>
                  )}
                </span>
                <span className="tnum shrink-0 text-text">{formatINR(line.amount)}</span>
              </li>
            ))}

            {quote.discount > 0 && (
              <li className="flex items-baseline justify-between gap-4 text-[13px]">
                <span className="text-ok">{quote.discountLabel}</span>
                <span className="tnum shrink-0 text-ok">
                  &minus;{formatINR(quote.discount)}
                </span>
              </li>
            )}
          </ul>

          <div className="mt-4 border-t border-line pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[14px] font-semibold text-text">Total</span>
              <span
                className="tnum text-[26px] font-semibold leading-none text-text transition-colors duration-200"
                aria-live="polite"
              >
                {formatINR(quote.total)}
              </span>
            </div>

            <dl className="mt-4 space-y-1.5 rounded-sm bg-white p-3.5 text-[12.5px]">
              <div className="flex justify-between gap-4">
                <dt className="font-semibold text-coral-700">Pay now to hold the slot</dt>
                <dd className="tnum font-semibold text-coral-700">
                  {formatINR(quote.advance)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-soft">Balance at the venue</dt>
                <dd className="tnum text-text-soft">{formatINR(quote.balanceDue)}</dd>
              </div>
            </dl>
          </div>
        </>
      )}

      <p className="mt-4 text-[11.5px] leading-relaxed text-text-soft">
        Slot times cannot be changed once confirmed. Advance refunded if you
        cancel more than 10 days ahead. Call {site.phone} for anything urgent.
      </p>
    </div>
  );
}
