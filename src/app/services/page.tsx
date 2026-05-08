import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionIntro } from "@/components/section-primitives";
import { services } from "@/lib/site-data";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services Overview"
        title="Specialized service lines for serious academic and professional growth."
        copy="From CSS/PMS preparation to admissions guidance and event execution, every service is designed with clarity, trust, and premium delivery in mind."
        dark
      />

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="All Services"
              title="Built for aspirants, families, institutions, and event partners."
              copy="Each card gives a quick sense of who the service is for, the benefits you can expect, and the next best action."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={index * 70}
                className={`card-shell p-8 ${index % 4 === 0 ? "md:col-span-2 xl:col-span-2" : ""}`}
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
                  {service.detail ? "Detailed Service" : "Contact-Led Service"}
                </div>
                <h2 className="display-title mt-4 text-3xl text-navy">{service.name}</h2>
                <p className="mt-4 leading-8 text-ink/78">{service.short}</p>
                <div className="mt-6 rounded-[16px] bg-mist p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-navy">
                    Who It Is For
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink/76">{service.audience}</p>
                </div>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-ink/78">
                  {service.benefits.map((benefit) => (
                    <li key={benefit}>• {benefit}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={service.detail ? `/services/${service.slug}` : "/contact"}
                    className="button-primary"
                  >
                    {service.detail ? "Learn More" : "Contact"}
                  </Link>
                  <Link href="/contact" className="button-ghost">
                    {service.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
