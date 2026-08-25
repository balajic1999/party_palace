"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronUp, Tag } from "lucide-react";

import {
  StepDateTime,
  StepDetails,
  StepExtras,
  StepPackage,
} from "@/components/booking/steps";
import { SummaryRail } from "@/components/booking/summary-rail";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { inputClass } from "@/components/ui/field";

import { packages } from "@/content/packages";
import { coupons } from "@/content/addons";
import { bookingQuery, decodeAddOns } from "@/lib/booking-url";
import { quote } from "@/lib/pricing";
import { saveDraft } from "@/lib/storage";
import { emptyDraft, type BookingDraft } from "@/lib/types";
import { cn, formatINR } from "@/lib/utils";

const STEPS = [
  {
    id: 1,
    label: "Package",
    heading: "Which package?",
    sub: "Every package books the theatre for a full three-hour slot.",
  },
  {
    id: 2,
    label: "Date",
    heading: "When?",
    sub: "Four slots a day, seven days a week. Green means open.",
  },
  {
    id: 3,
    label: "Extras",
    heading: "Anything to add?",
    sub: "Your package already covers decor and food. Everything here is optional.",
  },
  {
    id: 4,
    label: "Details",
    heading: "Who should we expect?",
    sub: "We only use this to confirm the booking and reach you if something changes.",
  },
];

const LAST_STEP = STEPS.length;

export function BookingWizard() {
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(() => {
    const n = Number(params.get("step"));
    return n >= 1 && n <= LAST_STEP ? n : 1;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  const [draft, setDraft] = useState<BookingDraft>(() => {
    const slug = params.get("pkg") || packages[0].slug;
    const base = packages.find((p) => p.slug === slug) ?? packages[0];
    return {
      ...emptyDraft,
      pkg: base.slug,
      guests: Number(params.get("guests")) || base.baseGuests,
      date: params.get("date") || "",
      slot: params.get("slot") || "",
      celebrant: params.get("celebrant") || "",
      screenMessage: params.get("msg") || "",
      addOns: decodeAddOns(params.get("addons")),
      coupon: params.get("coupon") || "",
    };
  });

  const set = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors({});
  }, []);

  // Mirror selections (not personal details) into the URL.
  useEffect(() => {
    router.replace(`/book?${bookingQuery(draft, step).toString()}`, { scroll: false });
  }, [draft, step, router]);

  const q = useMemo(
    () =>
      quote({
        pkg: draft.pkg,
        guests: draft.guests,
        slot: draft.slot,
        addOns: draft.addOns,
        coupon: draft.coupon,
      }),
    [draft],
  );

  const validate = (target: number): boolean => {
    if (step === 1 && !draft.pkg) return false;
    if (step === 2 && (!draft.date || !draft.slot)) return false;

    if (step === LAST_STEP && target > LAST_STEP) {
      const next: Record<string, string> = {};
      if (draft.name.trim().length < 2) next.name = "Please tell us your name.";
      if (draft.phone.replace(/\D/g, "").length < 10)
        next.phone = "Enter a 10-digit mobile number.";
      if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email))
        next.email = "That email address doesn't look right.";
      setErrors(next);
      return Object.keys(next).length === 0;
    }
    return true;
  };

  const blockedReason =
    step === 2 && !draft.slot
      ? draft.date
        ? "Pick a slot to continue"
        : "Pick a date to continue"
      : null;

  const go = (target: number) => {
    if (target > step && !validate(target)) return;

    if (target > LAST_STEP) {
      saveDraft(draft);
      router.push("/book/confirm");
      return;
    }
    setStep(Math.max(1, Math.min(LAST_STEP, target)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (coupons[code]) {
      set({ coupon: code });
      setCouponInput("");
    } else {
      setErrors({ coupon: "That code isn't valid." });
    }
  };

  const current = STEPS[step - 1];

  return (
    <>
      {/* The band every other page opens with, so the flow does not feel like
          it dropped out of the site. The progress rail lives in it and stays
          mounted across steps — a progress indicator that re-animates on every
          step reads as a reset rather than as progress. */}
      <PageHeader
        eyebrow="Booking"
        title="Book your slot"
        lede="Four short steps. Nothing is charged until the last one, and you can go back at any point."
        crumbs={[{ href: "/", label: "Home" }]}
      >
        <nav aria-label="Booking progress" className="w-full lg:w-[420px]">
          <ol className="flex gap-2">
            {STEPS.map((s) => {
              const done = s.id < step;
              const active = s.id === step;
              return (
                <li key={s.id} className="flex-1">
                  <button
                    type="button"
                    onClick={() => s.id < step && go(s.id)}
                    disabled={s.id > step}
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "w-full text-left disabled:cursor-default",
                      s.id < step && "cursor-pointer",
                    )}
                  >
                    <span
                      className={cn(
                        "block h-1 origin-left rounded-full transition-all duration-500 ease-out-soft",
                        active || done ? "bg-coral-500" : "bg-line",
                        active && "shadow-[0_0_0_3px_rgb(199_154_46_/_0.16)]",
                      )}
                    />
                    <span
                      className={cn(
                        "mt-2.5 hidden text-[12px] transition-colors duration-300 sm:block",
                        active
                          ? "font-semibold text-coral-700"
                          : done
                            ? "text-text-mid"
                            : "text-text-soft",
                      )}
                    >
                      {s.id}. {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-2.5 text-[12px] text-text-soft sm:hidden">
            Step {step} of {LAST_STEP} — {current.label}
          </p>
        </nav>
      </PageHeader>

      <div className="shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-8">
            {/* keyed on the step so the heading and the panel slide in together
                each time the step changes */}
            <div key={step} className="enter-side">
              <h2 className="font-display text-[clamp(1.7rem,4vw,2.2rem)] font-semibold leading-[1.15]">
                {current.heading}
              </h2>
              <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-text-mid">
                {current.sub}
              </p>

              <div className="mt-7">
                {step === 1 && <StepPackage draft={draft} set={set} />}
                {step === 2 && <StepDateTime draft={draft} set={set} />}
                {step === 3 && <StepExtras draft={draft} set={set} />}
                {step === 4 && <StepDetails draft={draft} set={set} errors={errors} />}
              </div>
            </div>

            {/* coupon, last step only */}
            {step === LAST_STEP && (
              <div className="mt-8 max-w-xl border-t border-line pt-6">
                {draft.coupon ? (
                  <p className="enter-scale flex items-center justify-between gap-4 rounded-sm border border-ok/40 bg-ok/5 px-4 py-3 text-[13.5px]">
                    <span className="flex items-center gap-2.5 text-ok">
                      <Tag strokeWidth={1.5} className="size-4" />
                      {draft.coupon} applied — {formatINR(q.discount)} off
                    </span>
                    <button
                      type="button"
                      onClick={() => set({ coupon: "" })}
                      className="shrink-0 text-text-soft underline-offset-4 hover:text-text hover:underline"
                    >
                      Remove
                    </button>
                  </p>
                ) : (
                  <>
                    <label
                      htmlFor="coupon"
                      className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-mid"
                    >
                      Have a code?
                    </label>
                    <div className="mt-2 flex gap-2.5">
                      <input
                        id="coupon"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                        placeholder="PALACE10"
                        className={cn(inputClass, "uppercase")}
                      />
                      <Button variant="dark" onClick={applyCoupon}>
                        Apply
                      </Button>
                    </div>
                    {errors.coupon && (
                      <p className="mt-2 text-[12.5px] text-off" role="alert">
                        {errors.coupon}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            {/* desktop nav */}
            <div className="mt-9 hidden items-center justify-between gap-4 border-t border-line pt-6 lg:flex">
              <Button variant="ghost" onClick={() => go(step - 1)} disabled={step === 1}>
                <ArrowLeft strokeWidth={1.8} className="size-4" />
                Back
              </Button>

              <div className="flex items-center gap-4">
                {blockedReason && (
                  <span className="text-[13px] text-text-soft">{blockedReason}</span>
                )}
                <Button size="lg" onClick={() => go(step + 1)} className="group">
                  {step === LAST_STEP ? `Pay ${formatINR(q.advance)} advance` : "Continue"}
                  <ArrowRight
                    strokeWidth={2}
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
          </div>

          <aside className="hidden lg:col-span-5 lg:block xl:col-span-4">
            <SummaryRail draft={draft} quote={q} className="sticky top-[var(--sticky-top)]" />
          </aside>
        </div>

        {/* mobile summary + nav */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/97 shadow-[0_-8px_24px_-20px_rgb(28_25_23_/_0.5)] backdrop-blur lg:hidden">
          {showSummary && (
            <div className="drawer-in max-h-[55vh] overflow-y-auto px-4 pt-4">
              <SummaryRail draft={draft} quote={q} />
            </div>
          )}

          <div className="flex items-center gap-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <button
              type="button"
              onClick={() => setShowSummary((v) => !v)}
              aria-expanded={showSummary}
              className="flex shrink-0 flex-col items-start"
            >
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.1em] text-text-soft">
                Total
                <ChevronUp
                  strokeWidth={2}
                  className={cn(
                    "size-3 transition-transform duration-200",
                    showSummary && "rotate-180",
                  )}
                />
              </span>
              <span className="tnum text-[17px] font-bold text-text">
                {formatINR(q.total)}
              </span>
            </button>

            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => go(step - 1)}
                aria-label="Back"
                className="shrink-0 px-4"
              >
                <ArrowLeft strokeWidth={1.8} className="size-4" />
              </Button>
            )}

            <Button onClick={() => go(step + 1)} className="flex-1">
              {step === LAST_STEP ? `Pay ${formatINR(q.advance)}` : "Continue"}
            </Button>
          </div>

          {blockedReason && (
            <p className="border-t border-line px-4 py-2 text-center text-[12px] text-text-soft">
              {blockedReason}
            </p>
          )}
        </div>

        <div className="h-24 lg:hidden" aria-hidden="true" />
      </div>
    </>
  );
}
