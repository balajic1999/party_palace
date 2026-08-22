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

/** Centred uppercase title with the gold diamond rule underneath. */
export function SectionHead({
  title,
  lede,
  tone = "dark",
  className,
}: {
  title: string;
  lede?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <h2
        className={cn(
          "text-[19px] font-bold uppercase tracking-[0.14em] sm:text-[22px]",
          tone === "dark" ? "text-text" : "text-white",
        )}
      >
        {title}
      </h2>
      <span className="rule-ornament mt-3" aria-hidden="true">
        <span />
      </span>
      {lede && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-xl text-pretty text-[14.5px] leading-relaxed",
            tone === "dark" ? "text-text-mid" : "text-white/70",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
