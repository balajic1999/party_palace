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
              "transition-all duration-300 ease-out-soft",
              tag === t
                ? "border-coral-500 bg-coral-50 text-coral-700 shadow-card"
                : "border-line text-text-mid hover:-translate-y-px hover:border-coral-400 hover:text-text",
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
              "reveal group relative overflow-hidden rounded-md border border-line",
              "transition-shadow duration-300 ease-out-soft hover:shadow-lift",
            )}
          >
            <Frame
              fill
              src={item.src}
              alt={item.alt}
              seed={item.seed}
              className="transition-transform duration-[700ms] ease-out-soft group-hover:scale-[1.05]"
            />
            {/* the plate underneath is dark, so the caption reads white */}
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-plum-900/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="absolute bottom-3 left-3 z-10 translate-y-1 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.14em] text-white opacity-0 backdrop-blur-sm transition-all duration-300 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100">
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
