import type { Metadata } from "next";
import { PaymentPanel } from "@/components/booking/payment-panel";

export const metadata: Metadata = {
  title: "Confirm & pay",
  description: "Review your booking and pay the ₹2,000 advance.",
  robots: { index: false, follow: false },
};

export default function ConfirmPage() {
  return <PaymentPanel />;
}
