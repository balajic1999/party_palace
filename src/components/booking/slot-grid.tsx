"use client";

import { slots } from "@/content/slots";
import { isBookable, slotState, SLOT_STATE_LABEL, type SlotState } from "@/lib/availability";
import { cn, formatINR, to12h } from "@/lib/utils";

const TONE: Record<SlotState, string> = {
  open: "text-ok",
  filling: "text-warn",
  "sold-out": "text-text-soft",
  past: "text-text-soft",
};

/** Slot picker used by step 2 of the booking wizard. */
export function SlotGrid({
  pkg,
  date,
  value,
  onChange,
  columns = 2,
}: {
  pkg: string;
  date: string;
  value: string;
  onChange: (slotId: string) => void;
  columns?: 1 | 2;
}) {
  if (!date) {
    return (
      <p className="rounded-sm border border-dashed border-line px-4 py-8 text-center text-[13.5px] text-text-soft">
        Pick a date to see what&rsquo;s open.
      </p>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Available time slots"
      className={cn("grid gap-2.5", columns === 2 && "sm:grid-cols-2")}
    >
      {slots.map((slot) => {
        const state = slotState(date, pkg, slot.id);
        const bookable = isBookable(state);
        const selected = value === slot.id;

        return (
          <button
            key={slot.id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={!bookable}
            onClick={() => onChange(slot.id)}
            className={cn(
              "group flex items-center justify-between gap-4 rounded-sm border px-4 py-3.5 text-left",
              "transition-all duration-300 ease-out-soft",
              selected
                ? "border-coral-500 bg-coral-50 shadow-card"
                : bookable
                  ? "border-line bg-white hover:-translate-y-0.5 hover:border-coral-400 hover:shadow-card"
                  : "cursor-not-allowed border-line opacity-45",
            )}
          >
            <span className="min-w-0">
              <span
                className={cn(
                  "tnum block text-[14px] font-medium",
                  selected ? "text-coral-700" : "text-text",
                )}
              >
                {to12h(slot.start)} &ndash; {to12h(slot.end)}
              </span>
              <span className="mt-1 block text-[12px] text-text-soft">
                {slot.label}
                {slot.surcharge > 0 && bookable && (
                  <span className="text-text-mid"> · +{formatINR(slot.surcharge)}</span>
                )}
                {slot.note && !slot.surcharge && (
                  <span className="text-text-mid"> · {slot.note}</span>
                )}
              </span>
            </span>

            <span className={cn("shrink-0 text-[11.5px]", TONE[state])}>
              {SLOT_STATE_LABEL[state]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
