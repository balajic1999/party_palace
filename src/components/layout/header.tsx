"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { site, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", hash: "", label: "Home" },
  { href: "/#experiences", hash: "experiences", label: "Experiences" },
  { href: "/#packages", hash: "packages", label: "Packages" },
  { href: "/#gallery", hash: "gallery", label: "Gallery" },
  { href: "/#about", hash: "about", label: "About Us" },
  { href: "/#faq", hash: "faq", label: "FAQ" },
  { href: "/#contact", hash: "contact", label: "Contact Us" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the drawer on navigation. Adjusting state during render (React's
  // documented pattern) rather than in an effect avoids a second pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Lift the bar off the page once it stops sitting on the hero. Passive
  // listener, one boolean — cheap enough to run on every scroll frame.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section is currently in view.
  useEffect(() => {
    // Off the home page there are no sections to spy on; isActive() already
    // requires pathname === "/", so nothing needs resetting here.
    if (pathname !== "/") return;
    const sections = NAV.map((n) => n.hash)
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (item: (typeof NAV)[number]) =>
    pathname === "/" && item.hash === active;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:rounded-sm focus:bg-coral-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      {/* utility strip */}
      <div className="hidden bg-plum-900 text-white/80 md:block">
        <div className="shell flex h-9 items-center justify-between text-[12px]">
          <p className="flex items-center gap-1.5">
            <MapPin strokeWidth={1.5} className="size-3.5 text-coral-500" />
            {site.address.city}, {site.address.state}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 transition-colors hover:text-coral-400"
            >
              <Phone strokeWidth={1.5} className="size-3.5 text-coral-500" />
              <span className="tnum">{site.phone}</span>
            </a>
            <a
              href={whatsappLink(
                `Hi ${site.name}, I would like to know more about your packages.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-coral-400"
            >
              <MessageCircle strokeWidth={1.5} className="size-3.5 text-coral-500" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div
        className={cn(
          "border-b bg-page/90 backdrop-blur transition-[box-shadow,border-color] duration-300 ease-out-soft",
          scrolled ? "border-line shadow-bar" : "border-transparent",
        )}
      >
        <div className="shell flex h-[70px] items-center justify-between gap-6 md:h-[78px]">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item) ? "page" : undefined}
                className={cn(
                  "link-sweep text-[14px] transition-colors duration-200",
                  isActive(item)
                    ? "font-semibold text-coral-700"
                    : "text-text-mid hover:text-coral-700",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="/book" size="sm" className="hidden sm:inline-flex">
              Book Now
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-sm border border-line text-text transition-colors duration-200 hover:border-coral-500 hover:text-coral-700 lg:hidden"
            >
              {open ? (
                <X strokeWidth={1.6} className="size-5 enter-scale" />
              ) : (
                <Menu strokeWidth={1.6} className="size-5 enter-scale" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="drawer-in fixed inset-x-0 bottom-0 top-[70px] z-40 overflow-y-auto border-t border-line bg-page lg:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-4 text-[16px] text-text transition-colors duration-200 hover:text-coral-700"
              >
                {item.label}
                <ChevronRight
                  strokeWidth={1.5}
                  className="size-4 text-text-soft"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>
          <div className="shell space-y-3 pb-10 pt-6">
            <ButtonLink href="/book" size="lg" className="w-full">
              Book Now
            </ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              size="lg"
              variant="outline"
              className="w-full"
            >
              <Phone strokeWidth={1.6} className="size-4" />
              Call {site.phone}
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
