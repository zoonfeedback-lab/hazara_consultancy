import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner, PageHero, SectionIntro } from "@/components/section-primitives";
import { getService, services } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services
    .filter((service) => service.detail)
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.name,
    description: service.short,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        label="Service Detail"
        title={service.name}
        copy={service.short}
        dark
        actions={
          <>
            <Link href="/contact" className="button-secondary">
              {service.cta}
            </Link>
            <Link href="/services" className="button-ghost border-white/15 text-cream">
              Back to Services
            </Link>
          </>
        }
        aside={
          <div className="card-shell paper-panel rounded-[24px] p-7 text-navy">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Optional Pricing
            </div>
            <p className="mt-4 text-base leading-8">
              {service.pricing ?? "Pricing shared on inquiry."}
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
              copy={service.audience}
            />
          </Reveal>

          <Reveal delay={100} className="card-shell p-8 md:p-10">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Core Benefits
            </div>
            <ul className="mt-5 space-y-4 text-base leading-8 text-ink/82">
              {service.benefits.map((benefit) => (
                <li key={benefit}>• {benefit}</li>
              ))}
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
            {service.process.map((step, index) => (
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
        label={service.cta}
      />
    </>
  );
}
