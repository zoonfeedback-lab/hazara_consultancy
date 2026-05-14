import Link from "next/link";
import type { Settings } from "@/lib/types/database";

export function SiteFooter({ settings }: { settings: Settings | null }) {
  const socialLinks = [
    { href: settings?.facebookUrl, label: "Facebook" },
    { href: settings?.instagramUrl, label: "Instagram" },
    { href: settings?.youtubeUrl, label: "YouTube" },
    { href: settings?.linkedinUrl, label: "LinkedIn" },
  ].filter((entry) => entry.href);

  return (
    <footer className="bg-navy py-12 text-cream md:py-16">
      <div className="site-container">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          <div className="space-y-5 text-center md:text-left">
            <div className="display-title text-2xl md:text-3xl">Hazara Global Consultancy</div>
            <p className="mx-auto max-w-sm text-sm leading-7 text-cream/78 md:mx-0">
              A premium mentorship academy from Abbottabad helping students and
              families move from uncertainty to strategy with world-class guidance.
            </p>
          </div>

          <div className="text-center md:text-left">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Quick Links
            </div>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/programs">Programs & Bootcamps</Link>
              <Link href="/events">Events</Link>
              <Link href="/blog">Blog & Resources</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Contact & Social
            </div>
            <div className="mt-5 space-y-3 text-sm text-cream/84">
              {settings?.address ? <p>{settings.address}</p> : null}
              {settings?.phone ? <p>{settings.phone}</p> : null}
              {settings?.contactEmail ? <p>{settings.contactEmail}</p> : null}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              {settings?.whatsappUrl ? (
                <a href={settings.whatsappUrl} className="button-whatsapp w-full md:w-auto">
                  WhatsApp
                </a>
              ) : null}
              {socialLinks.map((entry) => (
                <a
                  key={entry.label}
                  href={entry.href ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="button-ghost border-white/15 text-cream"
                >
                  {entry.label}
                </a>
              ))}
              {!settings?.whatsappUrl && socialLinks.length === 0 ? (
                <span className="text-sm text-cream/62">Social links coming soon.</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-12 h-px bg-gold/45" />
        <div className="mt-6 text-center text-sm uppercase tracking-[0.14em] text-cream/62 md:text-left">
          &copy; 2026 Hazara Global Consultancy.
          <br className="md:hidden" /> Abbottabad, Pakistan.
        </div>
      </div>
    </footer>
  );
}
