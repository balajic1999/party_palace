import Link from "next/link";
import { cn } from "@/lib/utils";

/** Crown mark. Drawn here rather than pulled from an icon set. */
export function Crown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 26" className={cn("h-5 w-auto", className)} aria-hidden="true">
      <path
        d="M2 6.5 9.4 14 16.2 3.2 22 12.4 27.8 3.2 34.6 14 42 6.5v13.2c0 .7-.6 1.3-1.3 1.3H3.3c-.7 0-1.3-.6-1.3-1.3V6.5Z"
        fill="currentColor"
      />
      <circle cx="2" cy="4.6" r="2" fill="currentColor" />
      <circle cx="42" cy="4.6" r="2" fill="currentColor" />
      <circle cx="22" cy="2" r="2" fill="currentColor" />
      <rect x="4.6" y="22.6" width="34.8" height="2.6" rx="1.3" fill="currentColor" />
    </svg>
  );
}

/**
 * @param tone `dark` for the light header, `light` for the dark footer.
 */
export function Logo({
  tone = "dark",
  className,
  href = "/",
}: {
  tone?: "dark" | "light";
  className?: string;
  href?: string;
}) {
  const inner = (
    <>
      <Crown className="mx-auto text-gold-500" />
      <span
        className={cn(
          "mt-1 block font-display text-[21px] leading-none tracking-[0.02em] sm:text-[23px]",
          tone === "dark" ? "text-text" : "text-white",
        )}
      >
        PARTY<span className="text-gold-500">PALACE</span>
      </span>
      <span
        className={cn(
          "mt-1 block text-[7.5px] uppercase tracking-[0.42em]",
          tone === "dark" ? "text-text-soft" : "text-white/55",
        )}
      >
        Celebrate in style
      </span>
    </>
  );

  return (
    <Link
      href={href}
      aria-label="Party Palace — home"
      className={cn("block shrink-0 text-center", className)}
    >
      {inner}
    </Link>
  );
}
