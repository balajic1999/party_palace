"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell grid min-h-[62vh] place-items-center py-24 text-center">
      <div className="enter-up max-w-md">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold-700">Something broke</p>
        <h1 className="mt-6 font-display text-[clamp(2rem,5vw,2.9rem)] font-semibold leading-[1.06]">
          That didn&rsquo;t load properly.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-mid">
          Our end, not yours. Try again — and if you were midway through a
          booking, nothing has been charged.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" size="lg" variant="outline">
            Back to home
          </ButtonLink>
        </div>
        <p className="mt-8 text-[13px] text-text-soft">
          Need a slot right now? Call{" "}
          <a href={site.phoneHref} className="text-gold-700">
            {site.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
