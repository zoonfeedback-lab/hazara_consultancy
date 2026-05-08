import Link from "next/link";
import { office } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-navy py-16 text-cream">
      <div className="site-container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="display-title text-3xl">Hazara Global Consultancy</div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-cream/78">
              A premium mentorship academy from Abbottabad helping students and
              families move from uncertainty to strategy with world-class guidance.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Quick Links
            </div>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link href="/services">Services</Link>
              <Link href="/programs">Programs & Bootcamps</Link>
              <Link href="/events">Events</Link>
              <Link href="/blog">Blog & Resources</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Contact & Social
            </div>
            <div className="mt-5 space-y-3 text-sm text-cream/84">
              <p>{office.address}</p>
              <p>{office.phone}</p>
              <p>{office.email}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={office.whatsapp} className="button-whatsapp">
                WhatsApp
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="button-ghost border-white/15 text-cream"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 h-px bg-gold/45" />
        <div className="mt-6 text-[11px] uppercase tracking-[0.18em] text-cream/62">
          © 2026 Hazara Global Consultancy. Abbottabad, Pakistan.
        </div>
      </div>
    </footer>
  );
}
