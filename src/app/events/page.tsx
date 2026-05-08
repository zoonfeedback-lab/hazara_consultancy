import { Reveal } from "@/components/reveal";
import { PageHero, SectionIntro } from "@/components/section-primitives";
import { events } from "@/lib/site-data";

export const metadata = {
  title: "Events",
};

export default function EventsPage() {
  const upcoming = events.filter((event) => !event.isPast);
  const past = events.filter((event) => event.isPast);

  return (
    <>
      <PageHero
        label="Events Portfolio"
        title="Impact beyond coursework through public programs and institutional collaboration."
        copy="We host seminars, workshops, women-centered forums, interfaith conferences, and partnership-led programs that elevate the educational culture of the region."
        dark
      />

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Upcoming Events"
              title="Planned with purpose, delivered with premium care."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {upcoming.map((event, index) => (
              <Reveal key={event.slug} delay={index * 90} className="card-shell p-8 md:p-10">
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold">{event.type}</div>
                <h2 className="display-title mt-4 text-3xl text-navy">{event.title}</h2>
                <p className="mt-3 text-sm uppercase tracking-[0.15em] text-ink/62">
                  {event.date} • {event.location}
                </p>
                <p className="mt-5 leading-8 text-ink/78">{event.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame bg-paper">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Past Events"
              title="A record of thoughtful civic and academic programming."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {past.map((event, index) => (
              <Reveal key={event.slug} delay={index * 90} className="card-shell overflow-hidden">
                <div className="gradient-panel p-8 text-cream">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                    {event.date}
                  </div>
                  <h2 className="display-title mt-4 text-3xl">{event.title}</h2>
                  <p className="mt-3 text-sm uppercase tracking-[0.15em] text-cream/70">
                    {event.location}
                  </p>
                </div>
                <div className="p-8">
                  <p className="leading-8 text-ink/78">{event.description}</p>
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {event.gallery?.map((item) => (
                      <div
                        key={item}
                        className="gradient-panel flex min-h-32 items-end rounded-[16px] p-4 text-sm font-medium text-cream shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame bg-navy text-cream">
        <div className="site-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionIntro
              label="Host With Us"
              title="Planning a seminar, workshop, or collaboration?"
              copy="Organizations can use this inquiry form to start a conversation about host support, speakers, concept design, and execution."
            />
          </Reveal>
          <Reveal delay={120} className="rounded-[24px] bg-white p-8 text-navy shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-10">
            <form className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium md:col-span-1">
                Organization
                <input className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="Institution or organization name" />
              </label>
              <label className="text-sm font-medium md:col-span-1">
                Contact Person
                <input className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="Full name" />
              </label>
              <label className="text-sm font-medium md:col-span-1">
                Email
                <input className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="name@example.com" type="email" />
              </label>
              <label className="text-sm font-medium md:col-span-1">
                Event Type
                <select className="mt-2 w-full rounded-[14px] border border-line px-4 py-3 outline-none">
                  <option>Seminar</option>
                  <option>Workshop</option>
                  <option>Women-Centered Program</option>
                  <option>Institutional Partnership</option>
                </select>
              </label>
              <label className="text-sm font-medium md:col-span-2">
                Vision
                <textarea className="mt-2 min-h-36 w-full rounded-[14px] border border-line px-4 py-3 outline-none" placeholder="Tell us what you want to host and who it is for." />
              </label>
              <div className="md:col-span-2">
                <button type="button" className="button-primary">
                  Send Inquiry
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
