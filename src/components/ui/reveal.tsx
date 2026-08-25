import { cn } from "@/lib/utils";

/**
 * Scroll-triggered fade-up.
 *
 * This is deliberately CSS-only. An earlier version ran on a JS animation
 * driver and was removed, because an entrance that starts at opacity 0 leaves
 * content invisible whenever the driver does not tick — a background tab, a
 * throttled rAF, a thrown error. The rule now lives in `globals.css` behind
 * `@supports (animation-timeline: view())`: browsers without scroll-driven
 * animations never see the opacity-0 keyframe at all, so the worst case is
 * "no animation", never "no content". `prefers-reduced-motion` opts out too.
 *
 * `delay` is still accepted so call sites read consistently. It is mapped onto
 * the stagger classes rather than an inline style, because a scroll-driven
 * timeline has no wall-clock to delay against — the offset comes from where the
 * element sits on the page, which is what you actually want in a grid.
 */
export function Reveal({
  children,
  className,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  /** accepted for call-site symmetry; the offset comes from scroll position */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  return <Comp className={cn("reveal", className)}>{children}</Comp>;
}
