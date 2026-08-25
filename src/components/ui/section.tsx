import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "page",
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "page" | "cream" | "dark";
  size?: "default" | "tight";
}) {
  return (
    <section
      id={id}
      className={cn(
        size === "tight" ? "py-12 md:py-16" : "py-16 md:py-20",
        tone === "cream" && "bg-cream",
        tone === "dark" && "bg-ink-900 text-white",
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/**
 * Centred section heading.
 *
 * Three parts, in this order: a small uppercase eyebrow in the UI face, the
 * title in the display face, then the gold diamond rule. The eyebrow carries
 * the "where am I" job that the title used to do by shouting in uppercase,
 * which frees the title to be read at a comfortable size and mixed case.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const onDark = tone === "light";

  return (
    <div className={cn("text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.2em]",
            onDark ? "text-gold-400" : "text-gold-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[clamp(1.6rem,3.4vw,2.15rem)] font-semibold leading-[1.15]",
          eyebrow && "mt-2.5",
          onDark ? "text-white" : "text-text",
        )}
      >
        {title}
      </h2>
      <span className="rule-ornament mt-4" aria-hidden="true">
        <span />
      </span>
      {lede && (
        <p
          className={cn(
            "mx-auto mt-5 max-w-xl text-pretty text-[14.5px] leading-relaxed",
            onDark ? "text-white/70" : "text-text-mid",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
