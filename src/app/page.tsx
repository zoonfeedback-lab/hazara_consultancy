import Link from "next/link";
import { CountUpStat } from "@/components/count-up-stat";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner, SectionIntro } from "@/components/section-primitives";
import {
  announcements,
  events,
  featuredProgram,
  services,
  stats,
  testimonials,
} from "@/lib/site-data";

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const upcomingEvents = events.filter((event) => !event.isPast).slice(0, 2);

  return (
    <>
      <section className="gradient-panel relative overflow-hidden pt-24 text-cream">
        <div className="hero-orb" />
        <div className="hero-orb-alt" />
        <div className="site-container grid min-h-[72vh] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative z-10">
            <span className="eyebrow text-gold-soft">Hazara Global Consultancy</span>
            <h1 className="display-title mt-6 max-w-4xl text-[clamp(4rem,8vw,4.75rem)] leading-[0.98]">
              A premium consultancy institution for ambition, strategy, and public trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/82">
              We help students, families, and institutions across Abbottabad, Hazara,
              and Khyber Pakhtunkhwa move with more clarity through CSS and PMS
              preparation, admissions guidance, writing support, and purposeful programs.
            </p>
            <p className="urdu-accent mt-5 text-gold-soft">
              کامیابی محنت سے بنتی ہے، مگر رہنمائی اسے رفتار دیتی ہے۔
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="button-secondary">
                Book Consultation
              </Link>
              <Link href="/services" className="button-primary">
                Explore Services
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative z-10">
            <div className="featured-card rounded-[24px] p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                    Institutional Focus
                  </div>
                  <h2 className="display-title mt-3 text-3xl">
                    Consultancy with structure, taste, and accountability.
                  </h2>
                </div>
                <div className="rounded-full border border-gold/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-soft">
                  Abbottabad
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[18px] bg-white/7 p-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                    What We Do
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-cream/82">
                    <li>CSS and PMS mentorship</li>
                    <li>Admissions and scholarship guidance</li>
                    <li>Workshops, seminars, and public events</li>
                  </ul>
                </div>
                <div className="rounded-[18px] bg-gold/10 p-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                    Why It Feels Different
                  </div>
                  <p className="mt-4 text-sm leading-7 text-cream/82">
                    We combine premium presentation with direct, practical guidance so
                    families can trust the process and students can act with confidence.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-gold/15 bg-paper py-4">
        <div className="overflow-hidden">
          <div className="ticker-track px-6 text-sm font-semibold uppercase tracking-[0.16em] text-navy">
            {[...announcements, ...announcements].map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-4 whitespace-nowrap">
                <span className="text-gold">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="-mt-2 bg-cream pb-6">
        <div className="site-container">
          <div className="featured-card grid rounded-[22px] py-4 md:grid-cols-4">
            {stats.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Core Services"
              title="Precision support across preparation, planning, and public trust."
              copy="Our public-facing services are designed for students, parents, institutions, and event partners who expect clarity, premium delivery, and a world-class standard close to home."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="card-shell p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
                Featured Service
              </div>
              <h3 className="display-title mt-4 text-3xl text-navy md:text-4xl">
                CSS/PMS Preparation
              </h3>
              <p className="mt-4 max-w-2xl leading-8 text-ink/78">
                Deep mentorship for aspirants who want better writing, sharper
                thinking, and a preparation system that respects the seriousness
                of the exam.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[16px] bg-mist p-5 text-sm leading-7">
                  Diagnostic readiness assessment
                </div>
                <div className="rounded-[16px] bg-mist p-5 text-sm leading-7">
                  Essay, composition, and current affairs labs
                </div>
                <div className="rounded-[16px] bg-mist p-5 text-sm leading-7">
                  Weekly evaluation and mock review
                </div>
              </div>
              <Link href="/services/css-pms-prep" className="button-primary mt-8">
                Learn More
              </Link>
            </Reveal>

            <div className="grid gap-6">
              {featuredServices.slice(1, 3).map((service, index) => (
                <Reveal key={service.slug} delay={index * 90} className="card-shell p-8">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
                    For {service.audience.split(" ")[0]}
                  </div>
                  <h3 className="display-title mt-3 text-2xl text-navy">{service.name}</h3>
                  <p className="mt-3 leading-7 text-ink/78">{service.short}</p>
                  <Link
                    href={service.detail ? `/services/${service.slug}` : "/contact"}
                    className="button-ghost mt-6"
                  >
                    {service.detail ? "Explore" : "Contact"}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-frame bg-paper">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Flagship Program"
              title={featuredProgram.title}
              copy={`${featuredProgram.duration} • ${featuredProgram.schedule} • ${featuredProgram.format}`}
            />
          </Reveal>
          <Reveal delay={120} className="featured-card mt-12 rounded-[24px] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <div className="inline-flex rounded-full border border-gold/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-soft">
                  {featuredProgram.status}
                </div>
                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                  {featuredProgram.curriculum.map((item) => (
                    <li
                      key={item}
                      className="rounded-[16px] border border-white/12 bg-white/7 px-5 py-4 text-sm leading-7 text-cream/84"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="paper-panel rounded-[22px] border border-white/8 p-7 text-navy">
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
                  Program Promise
                </div>
                <p className="mt-4 text-base leading-8">
                  A high-rhythm program built for candidates who want momentum,
                  strong writing correction, and a disciplined academic environment.
                </p>
                <div className="muted-rule mt-6" />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/programs" className="button-primary">
                    View Programs
                  </Link>
                  <Link href="/contact" className="button-secondary">
                    Register Interest
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Testimonials"
              title="Families and aspirants trust thoughtful rigor."
              copy="The strongest branding signal is still the experience students and parents have with us after the first conversation."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 90} className="card-shell p-8">
                <p className="display-title text-2xl text-gold">“</p>
                <p className="mt-3 text-base leading-8 text-ink/84">{testimonial.quote}</p>
                <div className="mt-8">
                  <div className="font-semibold text-navy">{testimonial.name}</div>
                  <div className="mt-1 text-sm text-ink/68">{testimonial.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame bg-navy text-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Upcoming Events"
              title="Programs and public events that extend our impact beyond the classroom."
              copy="From women-centered forums to public leadership seminars, our events are designed to build confidence, dialogue, and institutional trust."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {upcomingEvents.map((event, index) => (
              <Reveal
                key={event.slug}
                delay={index * 90}
                className="rounded-[22px] border border-white/10 bg-white/6 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                  {event.date}
                </div>
                <h3 className="display-title mt-4 text-3xl">{event.title}</h3>
                <p className="mt-4 text-sm uppercase tracking-[0.15em] text-cream/68">
                  {event.location}
                </p>
                <p className="mt-5 leading-8 text-cream/82">{event.description}</p>
                <Link href="/events" className="button-secondary mt-7">
                  View Events
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationBanner
        title="Need a tailored recommendation before choosing a path?"
        copy="Book a consultation for CSS and PMS preparation, admissions guidance, writing review, or institutional collaboration."
      />
    </>
  );
}
