import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { GalleryGrid } from "@/components/gallery-grid";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Inside the private theatre at Party Palace, Tirupati — decor setups, birthdays, movie nights and couple celebrations.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Inside the room"
        lede="Decor setups, celebrations and the theatre itself. Tap any photo to open it full size."
        crumbs={[{ href: "/", label: "Home" }]}
      />

      <Section size="tight">
        <GalleryGrid />
      </Section>

    </>
  );
}
