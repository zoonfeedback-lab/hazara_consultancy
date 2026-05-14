import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionIntro } from "@/components/section-primitives";
import { getServices } from "@/lib/data/public";

export const metadata = {
  title: "Services",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        label="Services Overview"
        title="Specialized service lines for serious academic and professional growth."
        copy="From CSS and PMS preparation to admissions guidance and event execution, every service is designed with clarity, trust, and premium delivery in mind."
        dark
      />

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="All Services"
              title="Built for aspirants, families, institutions, and event partners."
              copy="Each card gives a quick sense of who the service is for, the benefits you can expect, and the best next step."
            />
          </Reveal>

          {services.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <Reveal
                  key={service.id}
                  delay={index * 70}
                  className={`card-shell p-5 sm:p-6 lg:p-8 ${
                    index % 4 === 0 ? "md:col-span-2 xl:col-span-2" : ""
                  }`}
                >
                  <div className="text-sm uppercase tracking-[0.18em] text-gold">
                    Detailed Service
                  </div>
                  <h2 className="display-title mt-4 text-2xl text-navy md:text-3xl">{service.name}</h2>
                  <p className="mt-4 leading-8 text-ink/78">
                    {service.description || service.tagline || "More details coming soon."}
                  </p>
                  <div className="mt-6 rounded-[16px] bg-mist p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] text-navy">
                      Who It Is For
                    </div>
                    <p className="mt-3 text-sm leading-7 text-ink/76">
                      {service.whoItsFor || "Tailored support for serious candidates and families."}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-ink/78">
                    {service.benefits.map((benefit) => (
                      <li key={benefit}>• {benefit}</li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link href={`/services/${service.slug}`} className="button-primary w-full sm:w-auto">
                      Learn More
                    </Link>
                    <Link href="/contact" className="button-ghost w-full sm:w-auto">
                      Book Consultation
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 card-shell p-8 text-sm leading-7 text-ink/76">
              No services are published yet. Please check back soon.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
