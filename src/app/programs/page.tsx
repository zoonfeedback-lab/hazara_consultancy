import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionIntro } from "@/components/section-primitives";
import { programs } from "@/lib/site-data";

export const metadata = {
  title: "Programs and Bootcamps",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        label="Programs & Bootcamps"
        title="A focused catalog of high-impact learning experiences."
        copy="These programs are built for momentum: compact, premium, and practical. The data is mock for now, but the interface is ready for a future enrollment backend."
        dark
      />

      <section className="section-frame bg-paper">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Current Catalog"
              title="Available pathways for intensive preparation."
              copy="Schedules, durations, and curriculum highlights are presented the way a serious candidate needs to scan them."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {programs.map((program, index) => (
              <Reveal
                key={program.slug}
                delay={index * 90}
                className={`${program.highlight ? "featured-card" : "card-shell"} rounded-[22px] p-8 md:p-10`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                      program.highlight
                        ? "border border-gold/35 text-gold-soft"
                        : "bg-mist text-navy"
                    }`}
                  >
                    {program.status}
                  </span>
                  <span
                    className={`text-[11px] uppercase tracking-[0.16em] ${
                      program.highlight ? "text-cream/70" : "text-ink/62"
                    }`}
                  >
                    {program.duration}
                  </span>
                </div>
                <h2
                  className={`display-title mt-5 text-3xl ${
                    program.highlight ? "text-cream" : "text-navy"
                  }`}
                >
                  {program.title}
                </h2>
                <p className={`mt-3 text-sm uppercase tracking-[0.14em] ${program.highlight ? "text-cream/68" : "text-ink/62"}`}>
                  {program.schedule} • {program.format}
                </p>
                <ul className={`mt-7 space-y-3 text-sm leading-7 ${program.highlight ? "text-cream/84" : "text-ink/78"}`}>
                  {program.curriculum.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className={program.highlight ? "button-secondary" : "button-primary"}>
                    Register Interest
                  </Link>
                  <Link href="/contact" className={program.highlight ? "button-ghost border-white/15 text-cream" : "button-ghost"}>
                    Learn More
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
