import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { MyBookings } from "@/components/booking/my-bookings";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "My bookings",
  description: "Look up a Party Palace booking with the mobile number you booked with.",
  robots: { index: false, follow: true },
};

export default function MyBookingsPage() {
  return (
    <>
      <PageHeader
        title="Find a booking."
        lede="Enter the mobile number you booked with and we'll show your slots, references and what's still to pay."
        crumbs={[{ href: "/", label: "Home" }]}
      />

      <Section size="tight">
        <MyBookings />
      </Section>
    </>
  );
}
