"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Clock,
  Loader2,
  Lock,
  Pencil,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button, ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { packageBySlug } from "@/content/packages";
import { slotById } from "@/content/slots";
import { addOnById } from "@/content/addons";
import { site } from "@/content/site";
import { bookingHref } from "@/lib/booking-url";
import { quote } from "@/lib/pricing";
import { DEMO } from "@/lib/demo";
import { clearDraft, loadDraft, makeRef, saveBooking } from "@/lib/storage";
import type { BookingDraft } from "@/lib/types";
import { cn, formatINR, fromISODate, to12h } from "@/lib/utils";

type Status = "idle" | "processing" | "failed";

export function PaymentPanel() {
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft | null | undefined>(undefined);
  const [status, setStatus] = useState<Status>("idle");
  const [forceFail, setForceFail] = useState(false);

  // The draft is handed over in sessionStorage, so it can only be read client-side.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setDraft(loadDraft()), []);

  const q = useMemo(
    () =>
      draft
        ? quote({
            pkg: draft.pkg,
            guests: draft.guests,
            slot: draft.slot,
            addOns: draft.addOns,
            coupon: draft.coupon,
          })
        : null,
    [draft],
  );

  if (draft === undefined) {
    return (
      <div className="shell py-24 text-center">
        <Loader2 className="mx-auto size-5 animate-spin text-gold-600" />
        <span className="sr-only">Loading your booking…</span>
      </div>
    );
  }

  if (!draft || !q) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="font-display text-[30px] font-semibold leading-tight">
          We lost track of that booking.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-text-mid">
          Nothing was charged. Start again and it will only take a minute — your
          slot is almost certainly still free.
        </p>
        <ButtonLink href="/book" size="lg" className="mt-8">
          Start again
        </ButtonLink>
      </div>
    );
  }

  const pkg = packageBySlug(draft.pkg);
  const slot = slotById(draft.slot);

  const extras = Object.entries(draft.addOns)
    .filter(([id, qty]) => qty > 0 && !id.endsWith("-none"))
    .map(([id, qty]) => ({ addOn: addOnById(id), qty }))
    .filter((e) => e.addOn);

  const pay = () => {
    setStatus("processing");
    window.setTimeout(() => {
      if (forceFail) {
        setStatus("failed");
        return;
      }
      const ref = makeRef();
      saveBooking({
        ...draft,
        ref,
        createdAt: new Date().toISOString(),
        amountPaid: q.advance,
        balanceDue: q.balanceDue,
        total: q.total,
      });
      clearDraft();
      router.push(`/booking/${ref}`);
    }, DEMO.processingMs);
  };

  // Every "Change" link carries the whole draft. Pointing them at a bare
  // /book?step=N reset the booking to defaults — and the two that aimed at
  // step 5 landed on step 1, because the wizard only has four steps.
  const backTo = (step: number) => bookingHref(draft, step);

  return (
    <>
      <PageHeader
        eyebrow="Almost there"
        title="One last look, then we hold it."
        lede="Nothing has been charged yet. Change anything below, or pay the advance to lock the slot in."
        crumbs={[
          { href: "/", label: "Home" },
          { href: backTo(1), label: "Booking" },
        ]}
      >
        <Link
          href={backTo(4)}
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-text-mid transition-colors duration-200 hover:text-gold-700"
        >
          <ArrowLeft
            strokeWidth={1.5}
            className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to your details
        </Link>
      </PageHeader>

      <div className="shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* review */}
          <div className="lg:col-span-7">
            <div className="rounded-md border border-line bg-white shadow-card">
              <div className="flex items-start justify-between gap-4 border-b border-line p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gold-700">
                    {pkg?.tagline}
                  </p>
                  <h2 className="mt-2 font-display text-[27px] font-semibold leading-tight text-text">
                    {pkg?.name}
                  </h2>
                </div>
                <Link
                  href={backTo(1)}
                  className="flex shrink-0 items-center gap-1.5 text-[12.5px] text-text-mid transition-colors hover:text-gold-700"
                >
                  <Pencil strokeWidth={1.25} className="size-3.5" />
                  Change
                </Link>
              </div>

              <dl className="grid gap-5 p-6 sm:grid-cols-2">
                <Fact icon={CalendarDays} k="Date" href={backTo(2)}>
                  {draft.date
                    ? fromISODate(draft.date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                    : "—"}
                </Fact>
                <Fact icon={Clock} k="Slot" href={backTo(2)}>
                  {slot ? `${to12h(slot.start)} – ${to12h(slot.end)}` : "—"}
                </Fact>
                <Fact icon={Users} k="Guests" href={backTo(1)}>
                  {draft.guests} guests
                </Fact>
              </dl>

              {(draft.screenMessage || extras.length > 0) && (
                <div className="border-t border-line p-6">
                  {draft.screenMessage && (
                    <p className="text-[13.5px] text-text-mid">
                      On the screen:{" "}
                      <span className="text-gold-700">&ldquo;{draft.screenMessage}&rdquo;</span>
                    </p>
                  )}
                  {extras.length > 0 && (
                    <div className={draft.screenMessage ? "mt-4" : ""}>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-text-soft">
                          Added
                        </p>
                        <Link
                          href={backTo(3)}
                          className="text-[12.5px] text-text-mid transition-colors duration-200 hover:text-gold-700"
                        >
                          Change
                        </Link>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {extras.map(({ addOn, qty }) => (
                          <li
                            key={addOn!.id}
                            className="flex justify-between gap-4 text-[13.5px]"
                          >
                            <span className="text-text-mid">
                              {addOn!.name}
                              {qty > 1 && (
                                <span className="tnum text-text-soft"> ×{qty}</span>
                              )}
                            </span>
                            <span className="tnum shrink-0 text-text-soft">
                              {addOn!.price === 0 ? "Free" : formatINR(addOn!.price * qty)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-line p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-text-soft">
                    Booked by
                  </p>
                  <Link
                    href={backTo(4)}
                    className="text-[12.5px] text-text-mid transition-colors duration-200 hover:text-gold-700"
                  >
                    Change
                  </Link>
                </div>
                <p className="mt-3 text-[14.5px] text-text">{draft.name}</p>
                <p className="tnum mt-0.5 text-[13px] text-text-mid">
                  {draft.phone}
                </p>
                {draft.email && (
                  <p className="mt-0.5 text-[13px] text-text-mid">{draft.email}</p>
                )}
                {draft.notes && (
                  <p className="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-text-mid">
                    {draft.notes}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* payment */}
          <div className="lg:col-span-5">
            <div className="sticky top-[var(--sticky-top)] rounded-md border border-line bg-cream p-6 shadow-card">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold-700">
                Pay the advance
              </p>

              <p className="mt-4 flex items-baseline gap-2">
                <span className="tnum text-[40px] font-semibold leading-none text-text">
                  {formatINR(q.advance)}
                </span>
                <span className="text-[12.5px] text-text-soft">now</span>
              </p>

              <dl className="mt-5 space-y-2 border-y border-line py-4 text-[13px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-text-mid">Booking total</dt>
                  <dd className="tnum text-text">{formatINR(q.total)}</dd>
                </div>
                {q.discount > 0 && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-ok">{q.discountLabel}</dt>
                    <dd className="tnum text-ok">−{formatINR(q.discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-text-mid">Balance at the venue</dt>
                  <dd className="tnum text-text">{formatINR(q.balanceDue)}</dd>
                </div>
              </dl>

              {status === "failed" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex gap-3 rounded-sm border border-off/40 bg-off/5 px-4 py-3.5"
                  role="alert"
                >
                  <AlertCircle strokeWidth={1.25} className="mt-0.5 size-4 shrink-0 text-off" />
                  <div>
                    <p className="text-[13.5px] text-off">Payment didn&rsquo;t go through.</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-text-mid">
                      Nothing was charged and your slot is still held for a few more
                      minutes. Try again, or call {site.phone}.
                    </p>
                  </div>
                </motion.div>
              )}

              <Button
                size="lg"
                onClick={pay}
                disabled={status === "processing"}
                className="mt-5 w-full"
              >
                {status === "processing" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Confirming your slot…
                  </>
                ) : status === "failed" ? (
                  "Try the payment again"
                ) : (
                  <>
                    <Lock strokeWidth={1.5} className="size-4" />
                    Pay {formatINR(q.advance)} &amp; confirm
                  </>
                )}
              </Button>

              <p className="mt-4 flex items-start gap-2.5 text-[11.5px] leading-relaxed text-text-soft">
                <ShieldCheck strokeWidth={1.25} className="mt-0.5 size-3.5 shrink-0 text-gold-600" />
                UPI, card and net banking. Free reschedule with 24 hours&rsquo;
                notice; advance held as credit if you cancel more than 48 hours out.
              </p>

              {DEMO.showFailureToggle && (
                <label
                  className={cn(
                    "mt-5 flex cursor-pointer items-center gap-2.5 rounded-sm border border-dashed border-line px-3.5 py-2.5",
                    "text-[11.5px] text-text-soft",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={forceFail}
                    onChange={(e) => setForceFail(e.target.checked)}
                    className="size-3.5 accent-gold-400"
                  />
                  Demo control — simulate a failed payment
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Fact({
  icon: Icon,
  k,
  href,
  children,
}: {
  icon: React.ComponentType<{ strokeWidth?: number; className?: string }>;
  k: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-text-soft">
        <Icon strokeWidth={1.25} className="size-3.5 text-gold-600" />
        {k}
      </dt>
      <dd className="mt-1.5">
        <Link
          href={href}
          className="text-[14.5px] text-text transition-colors hover:text-gold-700"
        >
          {children}
        </Link>
      </dd>
    </div>
  );
}
