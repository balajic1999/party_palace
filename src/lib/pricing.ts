import { addOnById, coupons } from "@/content/addons";
import { site } from "@/content/site";
import { slotById } from "@/content/slots";
import { packageBySlug } from "@/content/packages";
import { plural } from "@/lib/utils";

export type PriceLine = {
  key: string;
  label: string;
  detail?: string;
  amount: number;
};

export type Quote = {
  lines: PriceLine[];
  subtotal: number;
  discount: number;
  discountLabel: string | null;
  total: number;
  advance: number;
  balanceDue: number;
};

export type QuoteInput = {
  pkg: string;
  guests: number;
  slot: string;
  addOns: Record<string, number>;
  coupon?: string;
};

/**
 * The ONLY place a total is computed. Pages never do their own arithmetic.
 * Pure and synchronous so it can be unit-tested and later swapped for an API call.
 */
export function quote(input: QuoteInput): Quote {
  const lines: PriceLine[] = [];
  const pkg = packageBySlug(input.pkg);

  if (pkg) {
    lines.push({
      key: "base",
      label: pkg.name,
      detail: `${pkg.durationHours}-hour slot · up to ${pkg.baseGuests} guests`,
      amount: pkg.price,
    });

    const extra = Math.max(0, Math.min(input.guests, pkg.maxGuests) - pkg.baseGuests);
    if (extra > 0) {
      lines.push({
        key: "extra-guests",
        label: `${extra} extra ${plural(extra, "guest")}`,
        detail: `${pkg.extraGuestPrice} each`,
        amount: extra * pkg.extraGuestPrice,
      });
    }
  }

  const slot = slotById(input.slot);
  if (slot && slot.surcharge > 0) {
    lines.push({
      key: "slot",
      label: `${slot.label} slot`,
      detail: "Surcharge",
      amount: slot.surcharge,
    });
  }

  for (const [id, qty] of Object.entries(input.addOns)) {
    if (qty <= 0) continue;
    const addOn = addOnById(id);
    if (!addOn) continue;

    lines.push({
      key: id,
      label: addOn.name,
      detail: qty > 1 ? `× ${qty}` : undefined,
      amount: addOn.price * qty,
    });
  }

  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);

  const code = (input.coupon ?? "").trim().toUpperCase();
  const rule = code ? coupons[code] : undefined;
  const discount = rule
    ? Math.min(Math.round((subtotal * rule.percent) / 100), rule.cap)
    : 0;

  const total = Math.max(0, subtotal - discount);
  const advance = Math.min(site.advance, total);

  return {
    lines,
    subtotal,
    discount,
    discountLabel: rule ? rule.label : null,
    total,
    advance,
    balanceDue: total - advance,
  };
}
