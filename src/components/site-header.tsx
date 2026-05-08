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

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-b-[rgba(201,168,76,0.3)] bg-[rgba(15,36,71,0.92)] backdrop-blur-xl"
            : "border-b-transparent bg-navy"
        }`}
      >
        <div className="site-container flex h-20 items-center justify-between gap-6">
          <Link href="/" className="block w-[244px] shrink-0 text-cream">
            <div className="display-title text-[1.34rem] leading-tight">
              Hazara Global Consultancy
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              Premium Mentorship Academy
            </div>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
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

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="button-primary hidden min-h-[44px] rounded-[10px] bg-navy px-5 py-[10px] text-[0.72rem] text-gold md:inline-flex"
            >
              Book Consultation
            </Link>
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold xl:hidden"
            >
              <span className="text-2xl leading-none">≡</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-[rgba(6,14,28,0.55)] transition-opacity xl:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-navy px-6 py-6 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="w-[220px] text-cream">
              <div className="display-title text-2xl leading-tight">
                Hazara Global Consultancy
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                Premium Mentorship Academy
              </div>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`display-title text-4xl ${
                  isActive(pathname, link.href) ? "text-gold" : "text-cream"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12">
            <Link
              href="/contact"
              className="button-secondary"
              onClick={() => setOpen(false)}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
