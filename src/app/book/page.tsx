import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/wizard";

export const metadata: Metadata = {
  title: "Book a slot",
  description:
    "Book a private theatre slot at Party Palace, Tirupati. Pick your room, date and slot, add a cake and decor, and hold it with a ₹750 advance.",
  robots: { index: false, follow: true },
};

function Skeleton() {
  return (
    <div className="shell py-16">
      <div className="h-[3px] w-full rounded-full bg-ink-800" />
      <div className="mt-10 h-9 w-64 rounded-sm bg-ink-900" />
      <div className="mt-4 h-4 w-96 max-w-full rounded-sm bg-ink-900" />
      <div className="mt-9 space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 rounded-md border border-ink-800 bg-ink-900/40" />
        ))}
      </div>
      <span className="sr-only">Loading the booking form…</span>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <BookingWizard />
    </Suspense>
  );
}
