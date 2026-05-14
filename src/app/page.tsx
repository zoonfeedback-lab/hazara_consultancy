import Link from "next/link";
import { CountUpStat } from "@/components/count-up-stat";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner, SectionIntro } from "@/components/section-primitives";
import {
  getAnnouncements,
  getEvents,
  getFeaturedProgram,
  getServices,
  getSettings,
  getTestimonials,
} from "@/lib/data/public";

export const revalidate = 60;

function formatProgramType(type: string) {
  return type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatEventDate(date: Date | null) {
  if (!date) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function HomePage() {
  const [announcements, settings, testimonials, featuredProgram, services, events] = await Promise.all([
    getAnnouncements(),
    getSettings(),
    getTestimonials(true),
    getFeaturedProgram(),
    getServices(),
    getEvents(false),
  ]);

  const featuredServices = services.slice(0, 6);
  const secondaryServices = featuredServices.slice(1, 3);
  const homepageTestimonials = testimonials.slice(0, 3);
  const upcomingEvents = events.slice(0, 2);
  const stats = [
    { label: "Students Mentored", suffix: "+", value: settings?.studentsMentored ?? 0 },
    { label: "Pass Rate", suffix: "%", value: settings?.passRate ?? 0 },
    { label: "Programs Launched", suffix: "+", value: settings?.programsLaunched ?? 0 },
    { label: "Faculty & Mentors", suffix: "", value: settings?.facultyCount ?? 0 },
  ];

  return (
    <>
      <section className="gradient-panel relative overflow-hidden pt-16 text-cream md:pt-20 lg:pt-24">
        <div className="hero-orb" />
        <div className="hero-orb-alt" />
        <div className="site-container grid items-center gap-8 py-12 md:gap-10 md:py-16 lg:min-h-[72vh] lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative z-10">
            <span className="eyebrow text-gold-soft">Hazara Global Consultancy</span>
            <h1 className="display-title mt-4 max-w-4xl text-[clamp(2.75rem,10vw,4.75rem)] leading-[1.02] md:mt-6">
              A premium consultancy institution for ambition, strategy, and public trust.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-cream/82 md:mt-6 md:text-lg md:leading-8">
              We help students, families, and institutions across Abbottabad, Hazara,
              and Khyber Pakhtunkhwa move with more clarity through CSS and PMS
              preparation, admissions guidance, writing support, and purposeful programs.
            </p>
            <p className="urdu-accent mt-5 text-gold-soft">
              کامیابیاں محنت سے بنتی ہیں، مگر رہنمائی اسے رفتار دیتی ہے۔
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
              <Link href="/contact" className="button-secondary w-full sm:w-auto">
                Book Consultation
              </Link>
              <Link href="/services" className="button-primary w-full sm:w-auto">
                Explore Services
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative z-10">
            <div className="featured-card rounded-[24px] p-6 md:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.18em] text-gold-soft">
                    Institutional Focus
                  </div>
                  <h2 className="display-title mt-3 text-2xl md:text-3xl">
                    Consultancy with structure, taste, and accountability.
                  </h2>
                </div>
                <div className="inline-flex rounded-full border border-gold/35 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-soft">
                  Abbottabad
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[18px] bg-white/7 p-5">
                  <div className="text-sm uppercase tracking-[0.18em] text-gold-soft">
                    What We Do
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-cream/82">
                    <li>CSS and PMS mentorship</li>
                    <li>Admissions and scholarship guidance</li>
                    <li>Workshops, seminars, and public events</li>
                  </ul>
                </div>
                <div className="rounded-[18px] bg-gold/10 p-5">
                  <div className="text-sm uppercase tracking-[0.18em] text-gold-soft">
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
          <div className="ticker-track px-4 text-sm font-semibold uppercase tracking-[0.14em] text-navy md:px-6 md:tracking-[0.16em]">
            {announcements.length > 0 ? (
              [...announcements, ...announcements].map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center gap-4 whitespace-nowrap">
                  <span className="text-gold">&bull;</span>
                  {item.link ? (
                    <Link href={item.link}>{item.text}</Link>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="w-full text-center normal-case tracking-normal text-ink/70">
                No live announcements at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="-mt-2 bg-cream pb-6">
        <div className="site-container">
          <div className="featured-card grid grid-cols-2 rounded-[22px] py-4 md:grid-cols-4">
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

          {featuredServices.length > 0 ? (
            <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr]">
              <Reveal className="card-shell p-5 sm:p-6 lg:p-10">
                <div className="text-sm uppercase tracking-[0.18em] text-gold">
                  Featured Service
                </div>
                <h3 className="display-title mt-4 text-2xl text-navy md:text-3xl lg:text-4xl">
                  {featuredServices[0].name}
                </h3>
                <p className="mt-4 max-w-2xl leading-8 text-ink/78">
                  {featuredServices[0].description || featuredServices[0].tagline || "More details coming soon."}
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {featuredServices[0].benefits.slice(0, 3).map((item) => (
                    <div key={item} className="rounded-[16px] bg-mist p-5 text-sm leading-7">
                      {item}
                    </div>
                  ))}
                </div>
                <Link href={`/services/${featuredServices[0].slug}`} className="button-primary mt-8 w-full sm:w-auto">
                  Learn More
                </Link>
              </Reveal>

              <div className="grid gap-6">
                {secondaryServices.map((service, index) => (
                  <Reveal key={service.slug} delay={index * 90} className="card-shell p-5 sm:p-6 lg:p-8">
                    <div className="text-sm uppercase tracking-[0.18em] text-gold">
                      For {(service.whoItsFor || service.name).split(" ")[0]}
                    </div>
                    <h3 className="display-title mt-3 text-2xl text-navy md:text-[2rem]">{service.name}</h3>
                    <p className="mt-3 leading-7 text-ink/78">
                      {service.tagline || service.description || "Details coming soon."}
                    </p>
                    <Link href={`/services/${service.slug}`} className="button-ghost mt-6 w-full sm:w-auto">
                      Explore
                    </Link>
                  </Reveal>
                ))}
                {secondaryServices.length === 0 ? (
                  <Reveal className="card-shell p-8">
                    <p className="text-sm leading-7 text-ink/76">
                      Services will appear here once they are published in the CMS.
                    </p>
                  </Reveal>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="mt-12 card-shell p-8 text-sm leading-7 text-ink/76">
              Services will appear here once they are published in the CMS.
            </div>
          )}
        </div>
      </section>

      {featuredProgram ? (
        <section className="section-frame bg-paper">
          <div className="site-container">
            <Reveal>
              <SectionIntro
                label="Flagship Program"
                title={featuredProgram.name}
                copy={`${featuredProgram.duration || "Schedule to be announced"} • ${featuredProgram.schedule || formatProgramType(featuredProgram.type)} • ${formatProgramType(featuredProgram.type)}`}
              />
            </Reveal>
            <Reveal delay={120} className="featured-card mt-12 rounded-[24px] p-6 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <div className="inline-flex rounded-full border border-gold/30 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-soft">
                    {featuredProgram.status.toLowerCase()}
                  </div>
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
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
                  <div className="text-sm uppercase tracking-[0.18em] text-gold">
                    Program Promise
                  </div>
                  <p className="mt-4 text-base leading-8">
                    {featuredProgram.description || "A high-rhythm program built for candidates who want momentum, strong writing correction, and a disciplined academic environment."}
                  </p>
                  <div className="muted-rule mt-6" />
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href="/programs" className="button-primary w-full sm:w-auto">
                      View Programs
                    </Link>
                    <Link href="/contact" className="button-secondary w-full sm:w-auto">
                      Register Interest
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Testimonials"
              title="Families and aspirants trust thoughtful rigor."
              copy="The strongest branding signal is still the experience students and parents have with us after the first conversation."
            />
          </Reveal>
          {homepageTestimonials.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {homepageTestimonials.map((testimonial, index) => (
                <Reveal key={testimonial.id} delay={index * 90} className="card-shell p-5 sm:p-6 lg:p-8">
                  <p className="display-title text-2xl text-gold">&ldquo;</p>
                  <p className="mt-3 text-base leading-7 text-ink/84 md:leading-8">{testimonial.quote}</p>
                  <div className="mt-8">
                    <div className="font-semibold text-navy">{testimonial.studentName}</div>
                    <div className="mt-1 text-sm text-ink/68">{testimonial.program || "Hazara Global Consultancy"}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 card-shell p-8 text-sm leading-7 text-ink/76">
              Testimonials will appear here once they are marked as featured in the CMS.
            </div>
          )}
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
          {upcomingEvents.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {upcomingEvents.map((event, index) => (
                <Reveal
                  key={event.id}
                  delay={index * 90}
                  className="rounded-[22px] border border-white/10 bg-white/6 p-5 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                >
                  <div className="text-sm uppercase tracking-[0.18em] text-gold-soft">
                    {formatEventDate(event.date)}
                  </div>
                  <h3 className="display-title mt-4 text-2xl md:text-3xl">{event.name}</h3>
                  <p className="mt-4 text-sm uppercase tracking-[0.15em] text-cream/68">
                    {event.location || "Location to be announced"}
                  </p>
                  <p className="mt-5 leading-8 text-cream/82">{event.description || "Details coming soon."}</p>
                  <Link href="/events" className="button-secondary mt-7 w-full sm:w-auto">
                    View Events
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[22px] border border-white/10 bg-white/6 p-8 text-sm leading-7 text-cream/78">
              No upcoming events are published right now.
            </div>
          )}
        </div>
      </section>

      <ConsultationBanner
        title="Need a tailored recommendation before choosing a path?"
        copy="Book a consultation for CSS and PMS preparation, admissions guidance, writing review, or institutional collaboration."
      />
    </>
  );
}
