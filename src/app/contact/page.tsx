import { Reveal } from "@/components/reveal";
import { PageHero, SectionIntro } from "@/components/section-primitives";
import { office, services } from "@/lib/site-data";

export const metadata = {
  title: "Contact and Inquiry",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact & Inquiry"
        title="Start the conversation from Abbottabad."
        copy="Reach out for general inquiries, service guidance, institutional collaborations, or a direct consultation booking."
        dark
        actions={
          <a href={office.whatsapp} className="button-whatsapp">
            WhatsApp
          </a>
        }
      />

      <section className="section-frame bg-cream">
        <div className="site-container grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionIntro
              label="Send Inquiry"
              title="Tell us what you need and we’ll route it properly."
              copy="Expected response time: within 24 hours on working days."
            />
            <div className="mt-8 rounded-[22px] bg-paper p-7 shadow-[0_20px_44px_rgba(15,36,71,0.08)]">
              <div className="space-y-4 text-sm leading-7 text-ink/78">
                <p>
                  <span className="font-semibold text-navy">Office:</span> {office.address}
                </p>
                <p>
                  <span className="font-semibold text-navy">Phone:</span> {office.phone}
                </p>
                <p>
                  <span className="font-semibold text-navy">Email:</span> {office.email}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={office.whatsapp} className="button-whatsapp">
                  WhatsApp Us
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="button-ghost"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="button-ghost"
                >
                  Facebook
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="card-shell p-8 md:p-10">
            <form className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium">
                Name
                <input className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="Your full name" />
              </label>
              <label className="text-sm font-medium">
                Email
                <input className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="name@example.com" type="email" />
              </label>
              <label className="text-sm font-medium">
                Phone
                <input className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="+92..." />
              </label>
              <label className="text-sm font-medium">
                Subject
                <input className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="How can we help?" />
              </label>
              <label className="text-sm font-medium md:col-span-2">
                Service of Interest
                <select className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none">
                  {services.map((service) => (
                    <option key={service.slug}>{service.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium md:col-span-2">
                Message
                <textarea className="mt-2 min-h-40 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="Share your goals, timeline, or the kind of support you need." />
              </label>
              <div className="md:col-span-2">
                <button type="button" className="button-primary">
                  Submit Inquiry
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
