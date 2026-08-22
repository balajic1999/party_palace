import { slots } from "@/content/slots";
import { hash, toISODate } from "@/lib/utils";

export type SlotState = "open" | "filling" | "sold-out" | "past";

export const SLOT_STATE_LABEL: Record<SlotState, string> = {
  open: "Available",
  filling: "Filling fast",
  "sold-out": "Sold out",
  past: "Passed",
};

/** How far ahead bookings are accepted. */
export const BOOKING_WINDOW_DAYS = 60;

/**
 * Seeded, not random.
 *
 * The demo needs a slot grid that looks alive — some sold out, some filling —
 * but that shows the SAME thing on every reload, so a client walkthrough is
 * repeatable. Hashing (date + package + slot) gives us both.
 *
 * Swap this one function for an API call when a real backend exists.
 */
export function slotState(dateISO: string, pkg: string, slotId: string): SlotState {
  if (!dateISO || !pkg || !slotId) return "open";

  const today = toISODate(new Date());
  if (dateISO < today) return "past";

  const slot = slots.find((s) => s.id === slotId);
  if (dateISO === today && slot) {
    const nowMins = new Date().getHours() * 60 + new Date().getMinutes();
    const [h, m] = slot.start.split(":").map(Number);
    // 90 minutes of lead time before a slot can be booked
    if (h * 60 + m - 90 <= nowMins) return "past";
  }

  const n = hash(`${dateISO}|${pkg}|${slotId}`) % 100;

  // Weekends run fuller than weekdays.
  const day = new Date(dateISO + "T00:00:00").getDay();
  const busy = day === 0 || day === 5 || day === 6;
  const soldOutBelow = busy ? 26 : 13;
  const fillingBelow = busy ? 52 : 33;

  if (n < soldOutBelow) return "sold-out";
  if (n < fillingBelow) return "filling";
  return "open";
}

export function isBookable(state: SlotState) {
  return state === "open" || state === "filling";
}

/** Slots left on a given day for a room — powers the "3 slots left" nudges. */
export function openSlotCount(dateISO: string, pkg: string): number {
  return slots.filter((s) => isBookable(slotState(dateISO, pkg, s.id))).length;
}

/** The 60-day window the calendar renders. */
export function bookingWindow(): Date[] {
  const out: Date[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < BOOKING_WINDOW_DAYS; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push(d);
  }
  return out;
}

/**
 * First date within the window that still has a bookable slot for this room.
 * Used by the booking wizard so it never opens on a fully-booked day,
 * so neither greets a visitor with a wall of "sold out".
 * Returns "" if nothing is open in the window.
 */
export function nextOpenDate(pkg: string, withinDays = 14): string {
  const now = new Date();
  for (let i = 0; i < withinDays; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const iso = toISODate(d);
    if (openSlotCount(iso, pkg) > 0) return iso;
  }
  return "";
}
