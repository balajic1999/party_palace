import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="beam -right-[6%] -top-[40%] h-[80vh] w-[60vw]" aria-hidden="true" />
      <div className="shell relative grid min-h-[62vh] place-items-center py-24 text-center">
        <div className="enter-up max-w-md">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold-700">Error 404</p>
          <h1 className="mt-6 font-display text-[clamp(2rem,5vw,2.9rem)] font-semibold leading-[1.06]">
            Nothing showing on this screen.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-text-mid">
            The page you were after has moved or never existed. The rooms are all
            still here though.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/#packages" size="lg" variant="outline">
              See the packages
            </ButtonLink>
          </div>
          <p className="mt-8 text-[13px] text-text-soft">
            Looking for a booking? Call{" "}
            <a href={site.phoneHref} className="text-gold-700">
              {site.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
