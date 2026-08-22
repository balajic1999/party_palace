"use client";

import { useMemo, useState } from "react";
import { Frame } from "@/components/ui/frame";
import { Lightbox } from "@/components/ui/lightbox";
import { gallery, galleryTags } from "@/content/gallery";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => (tag === "All" ? gallery : gallery.filter((g) => g.tag === tag)),
    [tag],
  );

  const slides = items.map((g) => ({ src: g.src, alt: g.alt, seed: g.seed }));

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter photos"
        className="flex flex-wrap gap-2 border-b border-line pb-6"
      >
        {galleryTags.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tag === t}
            onClick={() => {
              setTag(t);
              setOpen(null);
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-[10.5px] uppercase tracking-[0.14em]",
              "transition-colors duration-300 ease-out-soft",
              tag === t
                ? "border-gold-500 bg-gold-50 text-gold-700"
                : "border-line text-text-mid hover:border-line hover:text-text",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid auto-rows-[190px] grid-cols-2 gap-2.5 sm:auto-rows-[220px] lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={item.seed}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo — ${item.alt}`}
            className={cn(
              "group relative overflow-hidden rounded-md",
            )}
          >
            <Frame
              fill
              src={item.src}
              alt={item.alt}
              seed={item.seed}
              className="transition-transform duration-[700ms] ease-out-soft group-hover:scale-[1.05]"
            />
            <span className="absolute bottom-3 left-3 z-10 rounded-full border border-line bg-white/75 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.14em] text-text-mid opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              {item.tag}
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        slides={slides}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </>
  );
}
