"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarPlus, Check, Loader2, MessageCircle, Printer } from "lucide-react";

import { TicketStub } from "@/components/booking/ticket-stub";
import { Button, ButtonLink } from "@/components/ui/button";
import { packageBySlug } from "@/content/packages";
import { slotById } from "@/content/slots";
import { site, addressOneLine, whatsappLink } from "@/content/site";
import { getBooking } from "@/lib/storage";
import type { Booking } from "@/lib/types";
import { formatINR, fromISODate, to12h } from "@/lib/utils";

/** Builds a calendar file in the browser — no server needed. */
function downloadIcs(booking: Booking) {
  const pkg = packageBySlug(booking.pkg);
  const slot = slotById(booking.slot);
  if (!slot || !booking.date) return;

  const [y, m, d] = booking.date.split("-").map(Number);
  const [sh, sm] = slot.start.split(":").map(Number);
  const [eh, em] = slot.end.split(":").map(Number);

  const start = new Date(y, m - 1, d, sh, sm);
  const end = new Date(y, m - 1, d, eh, em);
  // late slot ends after midnight
  if (end <= start) end.setDate(end.getDate() + 1);

  const stamp = (dt: Date) =>
    [
      dt.getFullYear(),
      String(dt.getMonth() + 1).padStart(2, "0"),
      String(dt.getDate()).padStart(2, "0"),
      "T",
      String(dt.getHours()).padStart(2, "0"),
      String(dt.getMinutes()).padStart(2, "0"),
      "00",
    ].join("");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Party Palace//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${booking.ref}@partypalace.co.in`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${pkg?.name ?? "Private theatre"} at Party Palace`,
    `DESCRIPTION:Booking ${booking.ref}. Balance due at the venue. Call ${site.phone}.`,
    `LOCATION:${addressOneLine}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `party-palace-${booking.ref}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function Confirmation({ reference }: { reference: string }) {
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);

  // Bookings live in localStorage, which does not exist during the server
  // render — reading it after mount is the only hydration-safe option.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setBooking(getBooking(reference) ?? null), [reference]);

  if (booking === undefined) {
    return (
      <div className="shell py-24 text-center">
        <Loader2 className="mx-auto size-5 animate-spin text-gold-600" />
        <span className="sr-only">Loading your booking…</span>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="font-display text-[30px] font-semibold leading-tight">
          We can&rsquo;t find booking {reference}.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-text-mid">
          Confirmations are saved to the browser you booked from. If you booked on
          another device, call us on {site.phone} and we will look it up.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/my-bookings" size="lg" variant="outline">
            My bookings
          </ButtonLink>
          <ButtonLink href="/book" size="lg">
            Book a slot
          </ButtonLink>
        </div>
      </div>
    );
  }

  const pkg = packageBySlug(booking.pkg);
  const slot = slotById(booking.slot);

  const shareText = [
    `We're booked at Party Palace 🎬`,
    pkg ? pkg.name : "",
    booking.date
      ? fromISODate(booking.date).toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      : "",
    slot ? `${to12h(slot.start)} – ${to12h(slot.end)}` : "",
    addressOneLine,
    `Booking ${booking.ref}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="shell py-12 md:py-16">
      {/* The entrance below is CSS keyframes, never a JS driver.
          This is the payoff screen — the booking someone just paid for — so an
          opacity-0 start is only acceptable because a CSS animation always
          resolves on its own. A JS-driven one does not: a background tab, a
          throttled rAF or a thrown error would leave the ticket blank. Reduced
          motion skips the rule entirely and the content is simply there. */}
      <div className="relative isolate">
        <div className="beam -left-[14%] -top-[70%] h-[320px] w-[520px]" aria-hidden="true" />

        <div className="enter-scale relative flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full border border-ok/40 bg-ok/10 text-ok">
            <Check strokeWidth={2} className="size-4" />
          </span>
          <p className="text-[10.5px] uppercase tracking-[0.18em] text-ok">
            Slot confirmed
          </p>
        </div>

        <h1 className="enter-up stagger-1 relative mt-6 max-w-2xl text-balance font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05]">
          {/* phrased to stay grammatical whether the celebrant is one name or two */}
          {booking.celebrant
            ? `Now to keep it from ${booking.celebrant}.`
            : "That's yours now."}
        </h1>
        <p className="enter-up stagger-2 relative mt-4 max-w-lg text-[15.5px] leading-relaxed text-text-mid">
          We&rsquo;ve got it in the book. You&rsquo;ll get a WhatsApp confirmation on{" "}
          <span className="tnum text-text">{booking.phone}</span> shortly
          — keep your reference handy.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="enter-up stagger-3 lg:col-span-8">
          <TicketStub booking={booking} />
        </div>

        <div className="enter-up stagger-4 lg:col-span-4">
          <div className="rounded-md border border-line bg-cream p-6">
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold-700">
              Before you go
            </p>

            <div className="mt-5 space-y-2.5 print:hidden">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => downloadIcs(booking)}
              >
                <CalendarPlus strokeWidth={1.5} className="size-4" />
                Add to calendar
              </Button>
              <ButtonLink
                href={whatsappLink(shareText)}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="w-full justify-start"
              >
                <MessageCircle strokeWidth={1.5} className="size-4" />
                Send to your group
              </ButtonLink>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.print()}
              >
                <Printer strokeWidth={1.5} className="size-4" />
                Print this ticket
              </Button>
            </div>

            <ul className="mt-6 space-y-3 border-t border-line pt-5 text-[13px] leading-relaxed text-text-mid">
              <li>Arrive about five minutes early — the room is already set up.</li>
              <li>
                Bring the balance of{" "}
                <span className="tnum text-text">
                  {formatINR(booking.balanceDue)}
                </span>{" "}
                in cash or pay by UPI at the desk.
              </li>
              <li>
                Need to change something? Call{" "}
                <a href={site.phoneHref} className="text-gold-700">
                  {site.phone}
                </a>{" "}
                at least 24 hours ahead.
              </li>
            </ul>

            <Link
              href="/my-bookings"
              className="link-sweep mt-6 inline-block text-[13.5px] text-gold-700 print:hidden"
            >
              See all my bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
