import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionIntro } from "@/components/section-primitives";
import { getServices, getSettings } from "@/lib/data/public";

export const metadata = {
  title: "Contact and Inquiry",
};

export const revalidate = 60;

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

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

            <div className="mt-8 rounded-[24px] bg-navy p-5 text-cream shadow-[0_20px_44px_rgba(15,36,71,0.14)] sm:p-6 md:p-7">
              <div className="text-sm uppercase tracking-[0.18em] text-gold-soft">
                Preferred Channel
              </div>
              <h3 className="display-title mt-4 text-2xl md:text-3xl">Fastest response via WhatsApp</h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-cream/82">
                Send us your question, program interest, or consultation request and
                our team will guide you to the right next step.
              </p>
              <div className="mt-6">
                {settings?.whatsappUrl ? (
                  <a href={settings.whatsappUrl} className="button-whatsapp w-full sm:w-auto">
                    Message on WhatsApp
                  </a>
                ) : (
                  <span className="text-sm text-cream/70">WhatsApp link coming soon.</span>
                )}
              </div>
            </div>

            <div className="mt-8 rounded-[22px] bg-paper p-5 shadow-[0_20px_44px_rgba(15,36,71,0.08)] sm:p-6 md:p-7">
              <div className="space-y-4 text-sm leading-7 text-ink/78">
                <p>
                  <span className="font-semibold text-navy">Office:</span>{" "}
                  {settings?.address || "Abbottabad office details coming soon."}
                </p>
                {settings?.whatsappNumber ? (
                  <p>
                    <span className="font-semibold text-navy">WhatsApp:</span>{" "}
                    {settings.whatsappNumber}
                  </p>
                ) : null}
                <p>
                  <span className="font-semibold text-navy">Phone:</span>{" "}
                  {settings?.phone || "Phone number coming soon."}
                </p>
                <p>
                  <span className="font-semibold text-navy">Email:</span>{" "}
                  {settings?.contactEmail || "Email address coming soon."}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="card-shell p-5 sm:p-6 md:p-10">
            <SectionIntro
              label="Secondary Contact"
              title="Send a detailed inquiry."
              copy="Use the form below for longer messages, event collaboration requests, or admissions and mentorship questions."
            />

            <ContactForm services={services.map((service) => ({ id: service.id, name: service.name }))} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
