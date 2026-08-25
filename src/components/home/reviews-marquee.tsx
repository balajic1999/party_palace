import { Quote } from "lucide-react";

import { Stars } from "@/components/ui/icons";
import { testimonials } from "@/content/testimonials";

/**
 * Reviews that drift sideways on their own.
 *
 * CSS-only, like the rest of the motion in this build: no observer, no timer,
 * no carousel library. The track is two identical halves and the animation
 * translates it by exactly -50%, so the loop point lands where the second half
 * starts and the seam is invisible.
 *
 * A half has to be at least as wide as the viewport or a gap opens up at the
 * loop point, which is why the list is repeated inside each half. With only
 * three reviews on file that means a guest on a very wide screen can see the
 * same name twice at once — the honest fix is more real reviews, not more
 * repeats. See the note in src/content/testimonials.ts before adding any.
 */
const HALF = [...testimonials, ...testimonials];

export function ReviewsMarquee() {
  return (
    <div
      className="marquee relative"
      // ~50px/s. One half of the track is roughly 2300px wide, so a full pass
      // takes about this long. Retune if the card width or the list changes.
      style={{ "--marquee-duration": "46s" } as React.CSSProperties}
      // The whole strip is decorative repetition; announce it once, as a group.
      role="group"
      aria-label="What our guests say"
    >
      {/* the track fades out into the plum at both ends rather than being cut */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-plum-900 to-transparent sm:w-28"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-plum-900 to-transparent sm:w-28"
        aria-hidden="true"
      />

      <div className="marquee-track flex gap-4 py-1 sm:gap-5">
        {HALF.map((t, i) => (
          <ReviewCard key={`a-${i}`} {...t} />
        ))}
        {/* the visual duplicate that makes the loop seamless — never read out */}
        {HALF.map((t, i) => (
          <ReviewCard key={`b-${i}`} {...t} aria-hidden />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({
  name,
  quote,
  rating,
  "aria-hidden": ariaHidden,
}: {
  name: string;
  quote: string;
  rating: number;
  "aria-hidden"?: boolean;
}) {
  return (
    <figure
      aria-hidden={ariaHidden}
      className="relative flex w-[280px] shrink-0 flex-col rounded-md border border-white/10 bg-page p-6 shadow-lift sm:w-[360px]"
    >
      <Quote
        strokeWidth={1.5}
        className="absolute right-5 top-5 size-7 text-coral-100"
        aria-hidden="true"
      />

      <Stars count={rating} />

      <blockquote className="relative mt-4 flex-1 text-[14.5px] leading-relaxed text-text-mid">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full bg-coral-100 font-display text-[15px] font-semibold text-coral-700"
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
        <span className="font-display text-[15px] font-semibold text-text">{name}</span>
      </figcaption>
    </figure>
  );
}
