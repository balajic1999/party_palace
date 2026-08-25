import { cn } from "@/lib/utils";

type Tone = "neutral" | "gold" | "ok" | "warn" | "off";

const tones: Record<Tone, string> = {
  neutral: "border-line text-text-mid",
  gold: "border-coral-500/40 text-coral-700 bg-coral-50",
  ok: "border-ok/30 text-ok bg-ok/5",
  warn: "border-warn/35 text-warn bg-warn/5",
  off: "border-line text-text-soft",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "text-[10px] uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
