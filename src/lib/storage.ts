import type { Booking, BookingDraft } from "@/lib/types";

/**
 * Demo persistence. No backend in this build — bookings live in the browser so
 * the confirmation page and My Bookings work during a walkthrough.
 * Replace these four functions with API calls when a server exists.
 */

const KEY = "party-palace:bookings";

function read(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

function write(list: Booking[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* private mode / quota — the demo still works, it just will not persist */
  }
}

export function saveBooking(booking: Booking) {
  const list = read().filter((b) => b.ref !== booking.ref);
  write([booking, ...list].slice(0, 50));
}

export function getBooking(ref: string): Booking | undefined {
  return read().find((b) => b.ref.toUpperCase() === ref.toUpperCase());
}

export function allBookings(): Booking[] {
  return read();
}

export function bookingsForPhone(phone: string): Booking[] {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (digits.length < 10) return [];
  return read().filter((b) => b.phone.replace(/\D/g, "").slice(-10) === digits);
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1 — read aloud over the phone

export function makeRef(): string {
  let out = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return `PP-${out}`;
}

/* ── in-flight draft, handed from the wizard to the payment screen ── */

const DRAFT_KEY = "party-palace:draft";

export function saveDraft(draft: BookingDraft) {
  try {
    window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export function loadDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as BookingDraft) : null;
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}
