import type { BookingDraft } from "@/lib/types";

/**
 * The booking wizard keeps its selections in the URL so the flow is shareable
 * and back-button safe. Personal details deliberately do NOT go in — a phone
 * number has no business sitting in a URL, in history, or in a referrer header.
 *
 * This lives apart from the wizard because the payment screen has to be able to
 * build the same links. Its "Change" links used to point at a bare `/book?step=N`,
 * which reset the whole draft to defaults the moment anyone used one.
 */

export function decodeAddOns(raw: string | null): Record<string, number> {
  if (!raw) return {};
  const out: Record<string, number> = {};
  for (const pair of raw.split(",")) {
    const [id, qty] = pair.split(":");
    if (id) out[id] = Number(qty) || 1;
  }
  return out;
}

export function encodeAddOns(addOns: Record<string, number>): string {
  return Object.entries(addOns)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => `${id}:${q}`)
    .join(",");
}

/** Every selection in the draft, as the query the wizard reads back. */
export function bookingQuery(draft: BookingDraft, step?: number): URLSearchParams {
  const q = new URLSearchParams();
  if (step !== undefined) q.set("step", String(step));
  q.set("pkg", draft.pkg);
  if (draft.pack) q.set("pack", draft.pack);
  q.set("guests", String(draft.guests));
  if (draft.date) q.set("date", draft.date);
  if (draft.slot) q.set("slot", draft.slot);
  if (draft.celebrant) q.set("celebrant", draft.celebrant);
  if (draft.screenMessage) q.set("msg", draft.screenMessage);
  if (draft.cakeFlavour) q.set("cake", draft.cakeFlavour);
  const addons = encodeAddOns(draft.addOns);
  if (addons) q.set("addons", addons);
  if (draft.coupon) q.set("coupon", draft.coupon);
  return q;
}

/** Link back into a given step of the wizard with the draft intact. */
export function bookingHref(draft: BookingDraft, step: number): string {
  return `/book?${bookingQuery(draft, step).toString()}`;
}
