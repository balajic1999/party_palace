"use client";

import { useId, useState } from "react";
import { ChevronRight } from "lucide-react";
import type { Faq } from "@/content/faqs";
import { cn } from "@/lib/utils";

export function Accordion({ items, className }: { items: Faq[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <div className={cn("space-y-2.5", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-${i}`;

        return (
          <div
            key={item.q}
            className={cn(
              "overflow-hidden rounded-sm border bg-white transition-colors duration-200",
              isOpen ? "border-coral-400" : "border-line hover:border-coral-400/60",
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
              >
                <span
                  className={cn(
                    "text-[14px] font-medium",
                    isOpen ? "text-coral-700" : "text-text",
                  )}
                >
                  {item.q}
                </span>
                <ChevronRight
                  strokeWidth={2}
                  className={cn(
                    "size-4 shrink-0 text-text-soft transition-transform duration-200",
                    isOpen && "rotate-90 text-coral-700",
                  )}
                />
              </button>
            </h3>

            {/* grid-rows trick: animates height without measuring, and the answer
                stays in the DOM for search engines and find-in-page */}
            <div
              id={panelId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out-soft",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-[13.5px] leading-relaxed text-text-mid">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
