"use client";

import { Check, Info, Users } from "lucide-react";

import { Calendar } from "@/components/booking/calendar";
import { SlotGrid } from "@/components/booking/slot-grid";
import { Counter } from "@/components/ui/counter";
import { Field, inputClass, textareaClass } from "@/components/ui/field";
import { Frame } from "@/components/ui/frame";

import { packages } from "@/content/packages";
import { addOnGroups } from "@/content/addons";
import type { BookingDraft } from "@/lib/types";
import { cn, formatINR, plural } from "@/lib/utils";

type StepProps = {
  draft: BookingDraft;
  set: (patch: Partial<BookingDraft>) => void;
  errors?: Record<string, string>;
};

/* ── 1 ── package & guests ──────────────────────────────────────── */

export function StepPackage({ draft, set }: StepProps) {
  const current = packages.find((p) => p.slug === draft.pkg);

  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Choose a package" className="grid gap-3">
        {packages.map((p) => {
          const selected = draft.pkg === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() =>
                set({
                  pkg: p.slug,
                  guests: Math.min(Math.max(draft.guests || p.baseGuests, 2), p.maxGuests),
                  slot: "",
                })
              }
              className={cn(
                "flex gap-4 rounded-md border p-3 text-left sm:gap-5 sm:p-4",
                "transition-all duration-300 ease-out-soft",
                selected
                  ? "border-gold-500 bg-gold-50 shadow-card"
                  : "border-line bg-white hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-lift",
              )}
            >
              <Frame
                seed={p.seed}
                alt={p.name}
                ratio="aspect-[4/3]"
                className="w-24 shrink-0 rounded-sm sm:w-32"
              />

              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-[19px] font-semibold leading-tight text-text">
                    {p.name}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border",
                      "transition-colors duration-200",
                      selected ? "border-gold-500 bg-gold-500" : "border-line",
                    )}
                    aria-hidden="true"
                  >
                    {selected && <Check strokeWidth={3} className="size-3 text-ink-900" />}
                  </span>
                </span>

                <span className="mt-1.5 block text-[13px] leading-relaxed text-text-mid">
                  {p.tagline}
                </span>

                <span className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
                  <span className="tnum font-bold text-gold-600">{formatINR(p.price)}</span>
                  <span className="flex items-center gap-1.5 text-text-soft">
                    <Users strokeWidth={1.5} className="size-3.5" />
                    <span className="tnum">
                      {p.baseGuests}&ndash;{p.maxGuests}
                    </span>
                  </span>
                  <span className="text-text-soft">{p.durationHours} hours</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {current && (
        <div className="rounded-md border border-line bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-[18px] font-semibold text-text">How many of you?</p>
              <p className="mt-1 text-[13px] text-text-mid">
                {formatINR(current.price)} covers {current.baseGuests} guests. Each
                extra guest is {formatINR(current.extraGuestPrice)}.
              </p>
            </div>
            <Counter
              label="Guests"
              value={draft.guests}
              onChange={(n) => set({ guests: n })}
              min={2}
              max={current.maxGuests}
            />
          </div>

          {draft.guests > current.baseGuests && (
            <p className="mt-4 flex gap-2.5 border-t border-line pt-4 text-[13px] text-text-mid">
              <Info strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold-600" />
              <span>
                {draft.guests - current.baseGuests} extra{" "}
                {plural(draft.guests - current.baseGuests, "guest")} &mdash; adds{" "}
                <span className="tnum font-semibold text-text">
                  {formatINR((draft.guests - current.baseGuests) * current.extraGuestPrice)}
                </span>
                .
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── 2 ── date & slot ───────────────────────────────────────────── */

export function StepDateTime({ draft, set }: StepProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Calendar
        pkg={draft.pkg}
        value={draft.date}
        onChange={(d) => set({ date: d, slot: "" })}
      />
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-text-soft">
          Choose a slot
        </p>
        <div className="mt-4">
          <SlotGrid
            pkg={draft.pkg}
            date={draft.date}
            value={draft.slot}
            onChange={(s) => set({ slot: s })}
            columns={1}
          />
        </div>
      </div>
    </div>
  );
}

/* ── 3 ── extras & the screen message ───────────────────────────── */

export function StepExtras({ draft, set }: StepProps) {
  const setQty = (id: string, qty: number) =>
    set({ addOns: { ...draft.addOns, [id]: qty } });

  return (
    <div className="space-y-9">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <Field label="Who is it for?" htmlFor="celebrant" hint="Optional">
            <input
              id="celebrant"
              value={draft.celebrant}
              onChange={(e) => set({ celebrant: e.target.value })}
              placeholder="e.g. Harika"
              maxLength={30}
              className={inputClass}
            />
          </Field>

          <Field label="Message on the screen" htmlFor="screen-message" hint="Free">
            <input
              id="screen-message"
              value={draft.screenMessage}
              onChange={(e) => set({ screenMessage: e.target.value })}
              placeholder="Happy birthday, Harika!"
              maxLength={48}
              className={inputClass}
            />
          </Field>

          <p className="text-[12.5px] leading-relaxed text-text-soft">
            This goes up on the screen before you walk in. If you want it held to
            an exact minute &mdash; a proposal, a surprise entry &mdash; tell us
            in the notes on the next step.
          </p>
        </div>

        {/* live preview */}
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-text-soft">
            On the screen
          </p>
          <div className="mt-4 rounded-md border border-line bg-white p-4">
            <div className="relative grid aspect-[16/9] place-items-center overflow-hidden rounded-sm bg-ink-900 px-6">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 90% at 50% 40%, rgba(217,174,69,0.22), transparent 72%)",
                }}
                aria-hidden="true"
              />
              <p className="relative text-balance text-center font-display text-[clamp(1rem,3.2vw,1.5rem)] leading-tight text-gold-300 transition-opacity duration-300">
                {draft.screenMessage ||
                  (draft.celebrant
                    ? `Happy celebrations, ${draft.celebrant}!`
                    : "Your message appears here")}
              </p>
            </div>
            <p className="mt-3 text-center text-[11.5px] text-text-soft">
              Preview &mdash; shown as you arrive
            </p>
          </div>
        </div>
      </div>

      {addOnGroups.map((group) => (
        <section key={group.id}>
          <h3 className="font-display text-[20px] font-semibold leading-tight text-text">
            {group.name}
          </h3>
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-text-mid">
            {group.blurb}
          </p>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {group.items.map((item) => {
              const qty = draft.addOns[item.id] ?? 0;
              const selected = qty > 0;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-sm border px-4 py-3",
                    "transition-colors duration-200",
                    selected
                      ? "border-gold-500 bg-gold-50"
                      : "border-line bg-white hover:border-gold-400",
                  )}
                >
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={selected}
                    onClick={() => setQty(item.id, selected ? 0 : 1)}
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-[4px] border",
                        "transition-colors duration-200",
                        selected ? "border-gold-500 bg-gold-500" : "border-line",
                      )}
                      aria-hidden="true"
                    >
                      {selected && <Check strokeWidth={3} className="size-2.5 text-ink-900" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] leading-snug text-text">
                        {item.name}
                      </span>
                      {item.note && (
                        <span className="mt-0.5 block text-[11.5px] text-text-soft">
                          {item.note}
                        </span>
                      )}
                    </span>
                  </button>

                  <div className="flex shrink-0 items-center gap-3">
                    {group.quantity && selected && (
                      <Counter
                        size="sm"
                        label={item.name}
                        value={qty}
                        min={0}
                        max={20}
                        onChange={(n) => setQty(item.id, n)}
                      />
                    )}
                    <span className="tnum text-[13.5px] font-semibold text-text">
                      {formatINR(item.price)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ── 4 ── your details ──────────────────────────────────────────── */

export function StepDetails({ draft, set, errors = {} }: StepProps) {
  return (
    <div className="max-w-xl space-y-5">
      <Field label="Your name" htmlFor="name" required error={errors.name}>
        <input
          id="name"
          value={draft.name}
          onChange={(e) => set({ name: e.target.value })}
          placeholder="Full name"
          autoComplete="name"
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>

      <Field
        label="Mobile number"
        htmlFor="phone"
        required
        hint="We confirm on WhatsApp"
        error={errors.phone}
      >
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          value={draft.phone}
          onChange={(e) => set({ phone: e.target.value })}
          placeholder="10-digit mobile number"
          autoComplete="tel"
          className={cn(inputClass, "tnum")}
          aria-invalid={Boolean(errors.phone)}
        />
      </Field>

      <Field label="Email" htmlFor="email" hint="Optional" error={errors.email}>
        <input
          id="email"
          type="email"
          value={draft.email}
          onChange={(e) => set({ email: e.target.value })}
          placeholder="you@example.com"
          autoComplete="email"
          className={inputClass}
          aria-invalid={Boolean(errors.email)}
        />
      </Field>

      <Field label="Anything we should know?" htmlFor="notes" hint="Optional">
        <textarea
          id="notes"
          value={draft.notes}
          onChange={(e) => set({ notes: e.target.value })}
          placeholder="Timing for the cake, a surprise entry, allergies, or anything else."
          maxLength={500}
          className={textareaClass}
        />
      </Field>
    </div>
  );
}
