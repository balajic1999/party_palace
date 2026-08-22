import {
  Cake,
  Film,
  Heart,
  PartyPopper,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import type { IconKey } from "@/content/experiences";
import type { ReasonIcon } from "@/content/experiences";
import { cn } from "@/lib/utils";

const EXPERIENCE = {
  cake: Cake,
  film: Film,
  heart: Heart,
  sparkles: Sparkles,
} as const satisfies Record<IconKey, unknown>;

const REASON = {
  lock: ShieldCheck,
  star: Star,
  smile: Smile,
  food: UtensilsCrossed,
  calendar: PartyPopper,
} as const satisfies Record<ReasonIcon, unknown>;

export function ExperienceGlyph({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const Icon = EXPERIENCE[name];
  return <Icon strokeWidth={1.5} className={cn("size-5", className)} aria-hidden="true" />;
}

export function ReasonGlyph({
  name,
  className,
}: {
  name: ReasonIcon;
  className?: string;
}) {
  const Icon = REASON[name];
  return <Icon strokeWidth={1.5} className={cn("size-6", className)} aria-hidden="true" />;
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <p className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className="size-3.5 fill-gold-500 text-gold-500" aria-hidden="true" />
      ))}
    </p>
  );
}
