import { CountUpStat } from "@/components/count-up-stat";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner, PageHero, SectionIntro } from "@/components/section-primitives";
import { getSettings } from "@/lib/data/public";
import { aboutValues, mentors } from "@/lib/static-public-content";

export const metadata = {
  title: "About",
};

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await getSettings();
  const stats = [
    { label: "Students Mentored", value: settings?.studentsMentored ?? 0, suffix: "+" },
    { label: "Pass Rate", value: settings?.passRate ?? 0, suffix: "%" },
    { label: "Programs Launched", value: settings?.programsLaunched ?? 0, suffix: "+" },
    { label: "Faculty & Mentors", value: settings?.facultyCount ?? 0, suffix: "" },
  ];

  return (
    <>
      <PageHero
        label="About Hazara Global"
        title="Empowering students from Hazara and KPK to move toward civil service, scholarship, and professional distinction."
        copy="Hazara Global Consultancy was built to give serious students and families in Abbottabad access to the kind of polished guidance, structured mentorship, and institutional confidence usually associated with larger urban centers."
        dark
      />

      <section className="section-frame bg-cream">
        <div className="site-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionIntro
              label="Founding Story"
              title="Built in Abbottabad with a local heart and a world-class standard."
              copy="The consultancy began with a simple belief: talent across Hazara deserved stronger systems, better mentorship, and a more credible institutional environment. What started as focused academic guidance evolved into a premium consultancy serving aspirants, families, and public-interest institutions across the region."
            />
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink/78">
              Today, Hazara Global Consultancy operates as a public-facing academy
              and advisory institution. We support exam candidates, admissions
              applicants, event partners, and families who want clarity, polish,
              and trustworthy guidance close to home.
            </p>
          </Reveal>

          <Reveal delay={120} className="featured-card flex min-h-[320px] flex-col justify-between rounded-[24px] p-6 md:min-h-[420px] md:p-10">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-gold-soft">
                Abbottabad Ã¢â‚¬Â¢ Hazara Region
              </div>
              <p className="display-title mt-6 text-3xl leading-[1.08] md:text-4xl">
                Ã¢â‚¬Å“Our ambition has always been bigger than delivering information.
                We build trust, direction, and readiness.Ã¢â‚¬Â
              </p>
            </div>
            <div className="rounded-[18px] border border-white/12 bg-white/7 p-5 text-sm leading-7 text-cream/82">
              A place where consultancy feels institutional, guidance feels
              structured, and students feel taken seriously.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-frame bg-paper">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Mission & Values"
              title="The standards that shape how we teach, advise, and represent the region."
              copy="The brand should feel premium, but the substance underneath it is discipline, integrity, and care."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {aboutValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 90} className="card-shell p-5 sm:p-6 lg:p-8">
                <div className="text-sm uppercase tracking-[0.18em] text-gold">
                  Value 0{index + 1}
                </div>
                <h3 className="display-title mt-4 text-2xl text-navy md:text-3xl">{value.title}</h3>
                <p className="mt-4 leading-8 text-ink/78">{value.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Mentors"
              title="A leadership bench shaped by credibility, structure, and regional understanding."
              copy="Use these profiles as public-facing mentor cards that signal expertise without feeling like a staff directory."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {mentors.map((mentor, index) => (
              <Reveal key={mentor.name} delay={index * 90} className="card-shell p-5 sm:p-6 lg:p-8">
                <div className="text-sm uppercase tracking-[0.18em] text-gold">
                  {mentor.title}
                </div>
                <h3 className="display-title mt-4 text-2xl text-navy md:text-3xl">{mentor.name}</h3>
                <p className="mt-4 leading-8 text-ink/78">{mentor.bio}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {mentor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-mist px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-navy"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-6">
        <div className="site-container">
          <div className="featured-card grid grid-cols-2 rounded-[22px] py-4 md:grid-cols-4">
            {stats.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <ConsultationBanner
        title="Ready to begin your journey?"
        copy="Whether you need exam strategy, admissions clarity, writing guidance, or event collaboration, weÃ¢â‚¬â„¢re ready to help you move with confidence."
        href="/contact"
        label="Book Consultation"
      />
    </>
  );
}
