import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner, PageHero, SectionIntro } from "@/components/section-primitives";
import { getServiceBySlug, getServices } from "@/lib/data/public";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.name,
    description: service.description || service.tagline || "Service details",
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const processSteps = [
    "Book a consultation to discuss your goals and current stage.",
    "Receive a tailored plan with the right service scope and next steps.",
    "Move forward with structured support, review, and accountability.",
  ];

  return (
    <>
      <PageHero
        label="Service Detail"
        title={service.name}
        copy={service.description || service.tagline || "Service details coming soon."}
        dark
        actions={
          <>
            <Link href="/contact" className="button-secondary">
              Book Consultation
            </Link>
            <Link href="/services" className="button-ghost border-white/15 text-cream">
              Back to Services
            </Link>
          </>
        }
        aside={
          <div className="card-shell paper-panel rounded-[24px] p-7 text-navy">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Service Focus
            </div>
            <p className="mt-4 text-base leading-8">
              {service.tagline || "Details and pricing are shared after your initial inquiry."}
            </p>
          </div>
        }
      />

      <section className="section-frame bg-cream">
        <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionIntro
              label="Who It Is For"
              title="Designed for focused candidates who want more than generic guidance."
              copy={service.whoItsFor || "This service is tailored to people who need high-trust, structured support."}
            />
          </Reveal>

          <Reveal delay={100} className="card-shell p-8 md:p-10">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Core Benefits
            </div>
            <ul className="mt-5 space-y-4 text-base leading-8 text-ink/82">
              {service.benefits.length > 0 ? (
                service.benefits.map((benefit) => <li key={benefit}>â€¢ {benefit}</li>)
              ) : (
                <li>â€¢ More benefit details will be added soon.</li>
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-frame bg-paper">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="How It Works"
              title="A clear process with accountable checkpoints."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal key={step} delay={index * 90} className="card-shell p-8">
                <div className="display-title text-4xl text-gold">0{index + 1}</div>
                <p className="mt-4 text-base leading-8 text-ink/82">{step}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationBanner
        title={`Ready to start ${service.name.toLowerCase()}?`}
        copy="We'll help you choose the right scope, timeline, and support level for your current stage."
        label="Book Consultation"
      />
    </>
  );
}
