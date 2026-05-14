import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionIntro } from "@/components/section-primitives";
import { getPrograms } from "@/lib/data/public";

export const metadata = {
  title: "Programs and Bootcamps",
};

export const revalidate = 60;

function formatEnum(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHero
        label="Programs & Bootcamps"
        title="Focused learning experiences for serious candidates and institutional partners."
        copy="Our programs are built for momentum, clarity, and strong academic rhythm. Everything here is presented as a premium consultancy offer, not a platform product."
        dark
      />

      <section className="section-frame bg-paper">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Current Catalog"
              title="Available pathways for intensive preparation."
              copy="Schedules, durations, and curriculum highlights are arranged to feel clear, editorial, and decision-friendly."
            />
          </Reveal>
          {programs.length > 0 ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {programs.map((program, index) => (
                <Reveal
                  key={program.id}
                  delay={index * 90}
                  className={`${program.featured ? "featured-card" : "card-shell"} rounded-[22px] p-5 sm:p-6 lg:p-10`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] ${
                        program.featured
                          ? "border border-gold/35 text-gold-soft"
                          : "bg-mist text-navy"
                      }`}
                    >
                      {formatEnum(program.status)}
                    </span>
                    <span
                      className={`text-sm uppercase tracking-[0.16em] ${
                        program.featured ? "text-cream/70" : "text-ink/62"
                      }`}
                    >
                      {program.duration || "Flexible duration"}
                    </span>
                  </div>
                  <h2
                    className={`display-title mt-5 text-2xl ${
                      program.featured ? "text-cream" : "text-navy"
                    } md:text-3xl`}
                  >
                    {program.name}
                  </h2>
                  <p
                    className={`mt-3 text-sm uppercase tracking-[0.14em] ${
                      program.featured ? "text-cream/68" : "text-ink/62"
                    }`}
                  >
                    {program.schedule || "Schedule to be announced"} â€¢ {formatEnum(program.type)}
                  </p>
                  <ul
                    className={`mt-7 space-y-3 text-sm leading-7 ${
                      program.featured ? "text-cream/84" : "text-ink/78"
                    }`}
                  >
                    {program.curriculum.length > 0 ? (
                      program.curriculum.map((item) => <li key={item}>â€¢ {item}</li>)
                    ) : (
                      <li>â€¢ Curriculum details will be published soon.</li>
                    )}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/contact"
                      className={`${program.featured ? "button-secondary" : "button-primary"} w-full sm:w-auto`}
                    >
                      Register Interest
                    </Link>
                    <Link
                      href="/contact"
                      className={`${program.featured ? "button-ghost border-white/15 text-cream" : "button-ghost"} w-full sm:w-auto`}
                    >
                      Learn More
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 card-shell p-8 text-sm leading-7 text-ink/76">
              No programs are published yet. Please check back soon.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
