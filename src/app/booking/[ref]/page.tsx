import type { Metadata } from "next";
import { Confirmation } from "@/components/booking/confirmation";

export const metadata: Metadata = {
  title: "Your booking",
  description: "Your Party Palace booking confirmation.",
  robots: { index: false, follow: false },
};

export default async function BookingPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  return <Confirmation reference={decodeURIComponent(ref)} />;
}
