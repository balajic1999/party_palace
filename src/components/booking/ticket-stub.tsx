import { Crown } from "@/components/layout/logo";
import type { Booking } from "@/lib/types";
import { packageBySlug, resolvePack } from "@/content/packages";
import { slotById } from "@/content/slots";
import { addOnById } from "@/content/addons";
import { site, addressLines } from "@/content/site";
import { cn, formatINR, fromISODate, to12h } from "@/lib/utils";

/**
 * The cinema ticket. Perforated edge, tear line, mono reference — this is the
 * object people screenshot and send to whoever they're bringing.
 */
export function TicketStub({
  booking,
  className,
}: {
  booking: Booking;
  className?: string;
}) {
  const pkg = packageBySlug(booking.pkg);
  const pack = pkg ? resolvePack(pkg, booking.pack) : undefined;
  const slot = slotById(booking.slot);

  const extras = Object.entries(booking.addOns)
    .filter(([id, qty]) => qty > 0 && !id.endsWith("-none"))
    .map(([id, qty]) => ({ addOn: addOnById(id), qty }))
    .filter((e) => e.addOn);

  const facts = [
    {
      k: "Date",
      v: booking.date
        ? fromISODate(booking.date).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "—",
    },
    {
      k: "Slot",
      v: slot ? `${to12h(slot.start)} – ${to12h(slot.end)}` : "—",
    },
    { k: "Guests", v: String(booking.guests) },
    ...(pack ? [{ k: "Pack", v: pack.label }] : []),
    ...(booking.cakeFlavour ? [{ k: "Cake", v: booking.cakeFlavour }] : []),
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-line bg-white shadow-card",
        className,
      )}
    >
      {/* foil edge */}
      <div
        className="h-[3px] w-full bg-gradient-to-r from-coral-500 via-coral-300 to-coral-500"
        aria-hidden="true"
      />

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Crown className="size-5 text-coral-700" />
            <span className="font-display text-[17px] text-text">Party Palace</span>
          </div>
          <div className="text-right">
            <p className="text-[9.5px] uppercase tracking-[0.16em] text-text-soft">
              Booking ref
            </p>
            <p className="tnum mt-1 text-[15px] font-semibold tracking-[0.06em] text-coral-700">
              {booking.ref}
            </p>
          </div>
        </div>

        <h2 className="mt-7 font-display text-[clamp(1.9rem,5vw,2.6rem)] font-semibold leading-[1.08] text-text">
          {pkg?.name ?? "Private theatre"}
        </h2>
        {booking.screenMessage && (
          <p className="mt-2 text-[14px] italic text-coral-700/90">
            &ldquo;{booking.screenMessage}&rdquo; on the screen
          </p>
        )}

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="text-[9.5px] uppercase tracking-[0.14em] text-text-soft">
                {f.k}
              </dt>
              <dd className="mt-1.5 text-[14px] leading-snug text-text">{f.v}</dd>
            </div>
          ))}
        </dl>

        {extras.length > 0 && (
          <div className="mt-7 border-t border-line pt-5">
            <p className="text-[9.5px] uppercase tracking-[0.14em] text-text-soft">
              Added
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {extras.map(({ addOn, qty }) => (
                <li key={addOn!.id} className="text-[13px] text-text-mid">
                  {addOn!.name}
                  {qty > 1 && <span className="tnum text-text-soft"> ×{qty}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* tear line with punched edges */}
      <div className="relative" aria-hidden="true">
        <span className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-white" />
        <span className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-white" />
        <div className="tear mx-6" />
      </div>

      {/* stub */}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-7 p-6 sm:p-8">
        <div className="flex gap-8">
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.14em] text-text-soft">
              Paid
            </p>
            <p className="tnum mt-1.5 text-[19px] font-semibold text-ok">
              {formatINR(booking.amountPaid)}
            </p>
          </div>
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.14em] text-text-soft">
              Due at venue
            </p>
            <p className="tnum mt-1.5 text-[19px] font-semibold text-text">
              {formatINR(booking.balanceDue)}
            </p>
          </div>
        </div>

        <div className="max-w-[15rem] text-right">
          <p className="text-[9.5px] uppercase tracking-[0.14em] text-text-soft">
            Where
          </p>
          <address className="mt-1.5 not-italic text-[11.5px] leading-relaxed text-text-mid">
            {addressLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a
            href={site.phoneHref}
            className="tnum mt-1.5 inline-block text-[11.5px] text-coral-700"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
