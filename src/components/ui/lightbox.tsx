"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Frame } from "@/components/ui/frame";

export type LightboxSlide = { src?: string; alt: string; seed: string; label?: string };

export function Lightbox({
  slides,
  index,
  onClose,
  onIndexChange,
}: {
  slides: LightboxSlide[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + slides.length) % slides.length);
    },
    [index, slides.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [open, onClose, step]);

  // Controls sit on a dark scrim, so they are drawn light. A photo viewer on a
  // white ground fights the photograph for attention; ink lets it be the page.
  const navBtn =
    "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full " +
    "border border-white/25 bg-white/10 text-white backdrop-blur-sm " +
    "transition-colors duration-200 hover:border-coral-400 hover:bg-white/20 hover:text-coral-300";

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-[100] grid place-items-center bg-plum-900/92 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:border-coral-400 hover:bg-white/20 hover:text-coral-300"
          >
            <X strokeWidth={1.25} className="size-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className={navBtn + " left-3 md:left-8"}
          >
            <ChevronLeft strokeWidth={1.25} className="size-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className={navBtn + " right-3 md:right-8"}
          >
            <ChevronRight strokeWidth={1.25} className="size-5" />
          </button>

          <motion.div
            key={index}
            className="w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Frame {...slides[index]} ratio="aspect-[16/10]" className="rounded-md" />
            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.16em] text-white/70">
              <span className="tnum text-coral-400">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <span className="mx-3 text-white/35">&mdash;</span>
              {slides[index].alt}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
