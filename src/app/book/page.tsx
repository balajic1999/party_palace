import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/wizard";

export const metadata: Metadata = {
  title: "Book a slot",
  description:
    "Book a private theatre slot at Party Palace, Tirupati. Pick your room, date and slot, add a cake and decor, and hold it with a ₹2,000 advance.",
  robots: { index: false, follow: true },
};

/** Placeholder that matches the real layout: cream band, then the step cards.
 *  It was previously drawn in the dark palette this theme replaced, so it
 *  flashed near-black blocks on a white page. */
function Skeleton() {
  return (
    <>
      <div className="border-b border-line bg-cream">
        <div className="shell py-10 md:py-14">
          <div className="h-3 w-28 rounded-full bg-line" />
          <div className="mt-5 h-9 w-64 max-w-full rounded-sm bg-line" />
          <div className="mt-4 h-4 w-96 max-w-full rounded-sm bg-line-soft" />
        </div>
      </div>

      <div className="shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-3 lg:col-span-7 xl:col-span-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-32 rounded-md border border-line bg-cream/60"
              />
            ))}
          </div>
          <div className="hidden lg:col-span-5 lg:block xl:col-span-4">
            <div className="h-72 rounded-md border border-line bg-cream/60" />
          </div>
        </div>
      </div>

      <span className="sr-only">Loading the booking form…</span>
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <BookingWizard />
    </Suspense>
  );
}
