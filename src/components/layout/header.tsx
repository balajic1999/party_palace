"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:rounded-sm focus:bg-gold-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-900"
      >
        Skip to content
      </a>

      {/* utility strip */}
      <div className="hidden bg-ink-900 text-white/80 md:block">
        <div className="shell flex h-9 items-center justify-between text-[12px]">
          <p className="flex items-center gap-1.5">
            <MapPin strokeWidth={1.5} className="size-3.5 text-gold-500" />
            {site.address.city}, {site.address.state}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-400"
            >
              <Phone strokeWidth={1.5} className="size-3.5 text-gold-500" />
              <span className="tnum">{site.phone}</span>
            </a>
            <a
              href={whatsappLink(
                `Hi ${site.name}, I would like to know more about your packages.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-gold-400"
            >
              <MessageCircle strokeWidth={1.5} className="size-3.5 text-gold-500" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="border-b border-line bg-white/95 backdrop-blur">
        <div className="shell flex h-[70px] items-center justify-between gap-6 md:h-[78px]">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item) ? "page" : undefined}
                className={cn(
                  "text-[14px] transition-colors duration-200",
                  isActive(item)
                    ? "font-semibold text-gold-700"
                    : "text-text-mid hover:text-gold-700",
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
              className="grid size-10 place-items-center rounded-sm border border-line text-text transition-colors hover:border-gold-500 lg:hidden"
            >
              {open ? (
                <X strokeWidth={1.6} className="size-5" />
              ) : (
                <Menu strokeWidth={1.6} className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[70px] z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-[16px] text-text"
              >
                {item.label}
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
