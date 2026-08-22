"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarX, Search } from "lucide-react";

import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Field, inputClass } from "@/components/ui/field";
import { packageBySlug } from "@/content/packages";
import { slotById } from "@/content/slots";
import { site } from "@/content/site";
import { allBookings, bookingsForPhone } from "@/lib/storage";
import type { Booking } from "@/lib/types";
import { cn, formatINR, fromISODate, to12h, toISODate } from "@/lib/utils";

export function MyBookings() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<Booking[] | null>(null);
  const [hasAny, setHasAny] = useState(false);

  // localStorage is client-only; checked after mount to stay hydration-safe.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHasAny(allBookings().length > 0), []);

  const lookup = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Enter the 10-digit number you booked with.");
      setResults(null);
      return;
    }
    setError("");
    setResults(bookingsForPhone(phone));
  };

  const showAll = () => {
    setError("");
    setPhone("");
    setResults(allBookings());
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="rounded-md border border-line bg-white/50 p-6">
          <Field
            label="Mobile number"
            htmlFor="lookup-phone"
            hint="The one you booked with"
            error={error}
          >
            <input
              id="lookup-phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lookup()}
              placeholder="9876543210"
              className={cn(inputClass, "tnum")}
            />
          </Field>

          <Button onClick={lookup} size="lg" className="mt-5 w-full">
            <Search strokeWidth={1.5} className="size-4" />
            Find my bookings
          </Button>

          {hasAny && (
            <button
              type="button"
              onClick={showAll}
              className="mt-4 w-full text-center text-[12.5px] text-text-soft underline-offset-4 transition-colors hover:text-text-mid hover:underline"
            >
              Show everything saved on this device
            </button>
          )}
        </div>

        <p className="mt-5 text-[12.5px] leading-relaxed text-text-soft">
          Bookings are saved to the browser you booked from. If you booked on
          another phone or laptop, call us on{" "}
          <a href={site.phoneHref} className="text-gold-700">
            {site.phone}
          </a>{" "}
          and we will pull it up.
        </p>
      </div>

      <div className="lg:col-span-7">
        {results === null ? (
          <EmptyState
            title="Nothing to show yet"
            body="Enter the number you booked with and we'll list your slots."
          />
        ) : results.length === 0 ? (
          <EmptyState
            title="No bookings under that number"
            body="Double-check the number, or start a fresh booking — most slots are still open."
            action
          />
        ) : (
          <ul className="space-y-3">
            {results.map((b) => (
              <BookingRow key={b.ref} booking={b} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const pkg = packageBySlug(booking.pkg);
  const slot = slotById(booking.slot);
  const past = booking.date < toISODate(new Date());

  return (
    <li>
      <Link
        href={`/booking/${booking.ref}`}
        className={cn(
          "group flex items-start justify-between gap-5 rounded-md border border-line p-5",
          "transition-colors duration-300 ease-out-soft hover:border-gold-500/40 hover:bg-white",
          past && "opacity-60",
        )}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="tnum text-[11px] tracking-[0.08em] text-gold-700">
              {booking.ref}
            </span>
            <Badge tone={past ? "off" : "ok"}>{past ? "Past" : "Upcoming"}</Badge>
          </div>

          <h2 className="mt-2.5 text-[21px] leading-none text-text transition-colors group-hover:text-gold-700">
            {pkg?.name ?? "Private theatre"}
          </h2>

          <p className="mt-2 text-[13.5px] text-text-mid">
            {booking.date &&
              fromISODate(booking.date).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "long",
              })}
            {slot && (
              <>
                <span className="mx-2 text-text-soft">·</span>
                <span className="tnum">
                  {to12h(slot.start)} &ndash; {to12h(slot.end)}
                </span>
              </>
            )}
            <span className="mx-2 text-text-soft">·</span>
            <span className="tnum">{booking.guests}</span> guests
          </p>

          {booking.balanceDue > 0 && !past && (
            <p className="mt-2.5 text-[12.5px] text-text-soft">
              <span className="tnum text-text">
                {formatINR(booking.balanceDue)}
              </span>{" "}
              due at the venue
            </p>
          )}
        </div>

        <ArrowUpRight
          strokeWidth={1.25}
          className="mt-1 size-5 shrink-0 text-text-soft transition-all duration-[420ms] ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600"
        />
      </Link>
    </li>
  );
}

function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: boolean;
}) {
  return (
    <div className="grid place-items-center rounded-md border border-dashed border-line px-6 py-16 text-center">
      <CalendarX strokeWidth={1} className="size-8 text-text-soft" />
      <h2 className="mt-5 text-[21px] leading-tight text-text">{title}</h2>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-text-mid">{body}</p>
      {action && (
        <ButtonLink href="/book" size="md" className="mt-7">
          Book a slot
        </ButtonLink>
      )}
    </div>
  );
}
