"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BOOKING_WINDOW_DAYS, openSlotCount } from "@/lib/availability";
import { cn, toISODate } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** Month grid over the 60-day booking window. No date library needed. */
export function Calendar({
  pkg,
  value,
  onChange,
}: {
  pkg: string;
  value: string;
  onChange: (iso: string) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const last = useMemo(() => {
    const d = new Date(today);
    d.setDate(today.getDate() + BOOKING_WINDOW_DAYS - 1);
    return d;
  }, [today]);

  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const canPrev = cursor > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = cursor < new Date(last.getFullYear(), last.getMonth(), 1);

  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const lead = first.getDay();

    const out: (Date | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= daysInMonth; d++) {
      out.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    }
    return out;
  }, [cursor]);

  const shift = (n: number) =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + n, 1));

  const navBtn =
    "grid size-9 place-items-center rounded-full border border-line text-text transition-colors hover:border-coral-500 hover:text-coral-700 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="rounded-md border border-line bg-white p-4 sm:p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="font-display text-[18px] font-semibold text-text">
          {cursor.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
            className={navBtn}
          >
            <ChevronLeft strokeWidth={1.4} className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            disabled={!canNext}
            aria-label="Next month"
            className={navBtn}
          >
            <ChevronRight strokeWidth={1.4} className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="grid h-7 place-items-center text-[10px] uppercase tracking-[0.1em] text-text-soft"
          >
            {d}
          </span>
        ))}

        {cells.map((d, i) => {
          if (!d) return <span key={`pad-${i}`} />;

          const iso = toISODate(d);
          const outOfWindow = d < today || d > last;
          const open = outOfWindow ? 0 : openSlotCount(iso, pkg);
          const disabled = outOfWindow || open === 0;
          const selected = value === iso;
          const isToday = iso === toISODate(today);

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={`${d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}${
                disabled ? " — unavailable" : ` — ${open} slots open`
              }`}
              onClick={() => onChange(iso)}
              className={cn(
                "relative grid aspect-square place-items-center rounded-sm text-[13.5px]",
                "transition-all duration-200 ease-out-soft",
                selected
                  ? "bg-coral-600 font-semibold text-white shadow-card"
                  : disabled
                    ? "cursor-not-allowed text-text-soft/40"
                    : "text-text hover:bg-coral-50 hover:text-coral-700",
                isToday && !selected && "ring-1 ring-inset ring-coral-400",
              )}
            >
              <span className="tnum">{d.getDate()}</span>
              {!disabled && !selected && (
                <span
                  className={cn(
                    "absolute bottom-1.5 size-1 rounded-full",
                    open <= 2 ? "bg-warn" : "bg-ok",
                  )}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        {[
          { c: "bg-ok", l: "Slots open" },
          { c: "bg-warn", l: "Almost full" },
          { c: "bg-plum-700", l: "Sold out" },
        ].map((k) => (
          <span key={k.l} className="flex items-center gap-2 text-[11.5px] text-text-soft">
            <span className={cn("size-1.5 rounded-full", k.c)} aria-hidden="true" />
            {k.l}
          </span>
        ))}
      </div>
    </div>
  );
}
