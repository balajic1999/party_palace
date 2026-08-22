import { cn } from "@/lib/utils";

/**
 * Layout passthrough.
 *
 * This used to run a scroll-triggered fade. It was removed deliberately: an
 * entrance animation that starts at opacity 0 leaves content invisible whenever
 * the animation driver does not tick — a background tab, throttled rAF, a JS
 * error — and none of these sections are worth that risk on a marketing page.
 * Hover motion is handled in CSS (`.lift`), which degrades safely.
 *
 * `delay` is accepted so call sites read consistently, and ignored.
 */
export function Reveal({
  children,
  className,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  /** no longer used — kept so call sites stay unchanged */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  return <Comp className={cn(className)}>{children}</Comp>;
}
