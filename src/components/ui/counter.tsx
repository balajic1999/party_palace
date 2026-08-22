"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Counter({
  value,
  onChange,
  min = 0,
  max = 99,
  label,
  size = "md",
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const btn = cn(
    "grid place-items-center rounded-full border border-line text-text",
    "transition-colors duration-200 hover:border-gold-500 hover:text-gold-700",
    "disabled:pointer-events-none disabled:opacity-30",
    size === "sm" ? "size-8" : "size-10",
  );

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={"Decrease " + label}
      >
        <Minus strokeWidth={1.5} className="size-4" />
      </button>
      <span
        className={cn(
          "tnum text-center",
          size === "sm" ? "w-6 text-sm" : "w-8 text-base",
        )}
        aria-live="polite"
        aria-label={label + ": " + value}
      >
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={"Increase " + label}
      >
        <Plus strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  );
}
