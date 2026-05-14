"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-b-[rgba(201,168,76,0.3)] bg-[rgba(15,36,71,0.92)] backdrop-blur-xl"
            : "border-b-transparent bg-navy"
        }`}
      >
        <div className="site-container flex h-16 items-center justify-between gap-3 lg:h-[72px]">
          <Link href="/" className="min-w-0 max-w-[calc(100%-3.5rem)] shrink text-cream md:max-w-[calc(100%-4rem)] lg:max-w-none">
            <div className="display-title text-[1rem] leading-tight sm:text-[1.1rem] md:text-[1.12rem] lg:text-[1.34rem]">
              <span className="sm:hidden">HGC</span>
              <span className="hidden sm:inline lg:hidden">Hazara Global</span>
              <span className="hidden lg:inline">Hazara Global Consultancy</span>
            </div>
            <div className="mt-1 hidden text-xs font-semibold uppercase tracking-[0.18em] text-gold md:block lg:text-sm">
              <span className="lg:hidden">Premium Mentorship</span>
              <span className="hidden lg:inline">Premium Mentorship Academy</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  isActive(pathname, link.href) ? "nav-link-active" : "text-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/contact" className="button-primary hidden rounded-[10px] bg-navy px-5 text-gold lg:inline-flex">
              Book Consultation
            </Link>
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold lg:hidden"
            >
              <span className="text-2xl leading-none" aria-hidden="true">
                &#9776;
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-[rgba(6,14,28,0.55)] transition-opacity lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 flex h-full flex-col bg-navy px-4 py-5 sm:px-6 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 pr-3 text-cream">
              <div className="display-title text-[1.3rem] leading-tight sm:text-[1.6rem]">
                Hazara Global Consultancy
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                Premium Mentorship Academy
              </div>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold"
            >
              <span className="text-2xl leading-none" aria-hidden="true">
                &times;
              </span>
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col gap-2 overflow-y-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`display-title flex min-h-14 items-center border-b border-white/10 py-2 text-[1.5rem] sm:text-[1.75rem] ${
                  isActive(pathname, link.href) ? "text-gold" : "text-cream"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <Link href="/contact" className="button-secondary w-full" onClick={() => setOpen(false)}>
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
