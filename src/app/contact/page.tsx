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
      />

      <section className="section-frame bg-cream">
        <div className="site-container grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionIntro
              label="Primary Contact"
              title="Fastest response via WhatsApp."
              copy="For urgent questions, consultation booking, or quick direction, WhatsApp is the most direct way to reach our team."
            />

            <div className="mt-8 rounded-[24px] bg-navy p-7 text-cream shadow-[0_20px_44px_rgba(15,36,71,0.14)]">
              <div className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                Preferred Channel
              </div>
              <h3 className="display-title mt-4 text-3xl">Fastest response via WhatsApp</h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-cream/82">
                Send us your question, program interest, or consultation request and
                our team will guide you to the right next step.
              </p>
              <div className="mt-6">
                <a href={office.whatsapp} className="button-whatsapp">
                  Message on WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-[22px] bg-paper p-7 shadow-[0_20px_44px_rgba(15,36,71,0.08)]">
              <div className="space-y-4 text-sm leading-7 text-ink/78">
                <p>
                  <span className="font-semibold text-navy">Office:</span> {office.address}
                </p>
                <p>
                  <span className="font-semibold text-navy">Location Detail:</span>{" "}
                  {office.locationNote}
                </p>
                <p>
                  <span className="font-semibold text-navy">Phone:</span> {office.phone}
                </p>
                <p>
                  <span className="font-semibold text-navy">Email:</span> {office.email}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="card-shell p-8 md:p-10">
            <SectionIntro
              label="Secondary Contact"
              title="Send a detailed inquiry."
              copy="Use the form below for longer messages, event collaboration requests, or admissions and mentorship questions."
            />

            <form className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium">
                Name
                <input
                  className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
                  placeholder="Your full name"
                />
              </label>
              <label className="text-sm font-medium">
                Email
                <input
                  className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
                  placeholder="name@example.com"
                  type="email"
                />
              </label>
              <label className="text-sm font-medium">
                Phone
                <input
                  className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
                  placeholder="+92..."
                />
              </label>
              <label className="text-sm font-medium">
                Subject
                <input
                  className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
                  placeholder="How can we help?"
                />
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
                <textarea
                  className="mt-2 min-h-40 w-full rounded-[14px] border border-line px-4 py-3 outline-none"
                  placeholder="Share your goals, timeline, or the kind of support you need."
                />
              </label>
              <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
                <button type="button" className="button-primary">
                  Submit Inquiry
                </button>
                <p className="text-sm text-ink/62">We respond within 2 business hours.</p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
