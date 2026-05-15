import Link from "next/link";
import MediaImage from "@/components/media-image";
import { EventsInquiryForm } from "@/components/events-inquiry-form";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionIntro } from "@/components/section-primitives";
import { getEvents } from "@/lib/data/public";

export const metadata = {
  title: "Events",
};

export const revalidate = 60;

function formatEventDate(date: Date | null) {
  if (!date) {
    return "Date to be announced";
  }

  return date.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getEvents(false), getEvents(true)]);

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
          {upcoming.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {upcoming.map((event, index) => (
                <Reveal
                  key={event.id}
                  delay={index * 90}
                  className="card-shell flex flex-col overflow-hidden rounded-[24px] p-0"
                >
                  <MediaImage
                    src={event.imageUrl}
                    alt={event.name}
                    aspectRatio="video"
                    className="rounded-none"
                  />
                  <div className="flex flex-grow flex-col p-5 sm:p-6 lg:p-10">
                    <div className="text-sm uppercase tracking-[0.18em] text-gold">
                      {event.type.toLowerCase().replace(/_/g, " ")}
                    </div>
                    <h2 className="display-title mt-4 text-2xl text-navy md:text-3xl">{event.name}</h2>
                    <p className="mt-3 text-sm uppercase tracking-[0.15em] text-ink/62">
                      {formatEventDate(event.date)} • {event.location || "Location to be announced"}
                    </p>
                    <p className="mt-5 flex-grow leading-8 text-ink/78">
                      {event.description || "Further event details will be shared soon."}
                    </p>
                    <Link href="/contact" className="button-primary mt-7 w-full sm:w-auto">
                      Inquire About This Event
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 card-shell p-8 text-sm leading-7 text-ink/76">
              No upcoming events are published right now.
            </div>
          )}
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
          {past.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {past.map((event, index) => (
                <Reveal
                  key={event.id}
                  delay={index * 90}
                  className="card-shell overflow-hidden rounded-[24px] p-0"
                >
                  <div className="relative">
                    <MediaImage
                      src={event.imageUrl}
                      alt={event.name}
                      aspectRatio="4/3"
                      className="rounded-none"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(15,36,71,0)_0%,rgba(15,36,71,0.85)_100%)] px-5 pb-5 pt-14 sm:px-6">
                      <div className="text-sm uppercase tracking-[0.18em] text-gold-soft">
                        {formatEventDate(event.date)}
                      </div>
                      <h2 className="display-title mt-3 text-2xl text-cream">{event.name}</h2>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 lg:p-8">
                    <p className="text-sm uppercase tracking-[0.15em] text-ink/62">
                      {event.location || "Location to be announced"}
                    </p>
                    <p className="mt-4 leading-8 text-ink/78">
                      {event.description || "More portfolio details will be shared soon."}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 card-shell p-8 text-sm leading-7 text-ink/76">
              No past events have been archived yet.
            </div>
          )}
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
          <Reveal
            delay={120}
            className="rounded-[24px] bg-white p-5 text-navy shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-6 md:p-10"
          >
            <EventsInquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
