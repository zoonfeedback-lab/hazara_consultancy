import { CountUpStat } from "@/components/count-up-stat";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner, PageHero, SectionIntro } from "@/components/section-primitives";
import { aboutValues, mentors, stats } from "@/lib/site-data";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
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

          <Reveal delay={120} className="featured-card flex min-h-[420px] flex-col justify-between rounded-[24px] p-8 md:p-10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                Abbottabad • Hazara Region
              </div>
              <p className="display-title mt-6 text-4xl leading-[1.08]">
                “Our ambition has always been bigger than delivering information.
                We build trust, direction, and readiness.”
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
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 90} className="card-shell p-8">
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
                  Value 0{index + 1}
                </div>
                <h3 className="display-title mt-4 text-3xl text-navy">{value.title}</h3>
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
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mentors.map((mentor, index) => (
              <Reveal key={mentor.name} delay={index * 90} className="card-shell p-8">
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
                  {mentor.title}
                </div>
                <h3 className="display-title mt-4 text-3xl text-navy">{mentor.name}</h3>
                <p className="mt-4 leading-8 text-ink/78">{mentor.bio}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {mentor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-mist px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy"
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
          <div className="featured-card grid rounded-[22px] py-4 md:grid-cols-4">
            {stats.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <ConsultationBanner
        title="Ready to begin your journey?"
        copy="Whether you need exam strategy, admissions clarity, writing guidance, or event collaboration, we’re ready to help you move with confidence."
        href="/contact"
        label="Book Consultation"
      />
    </>
  );
}
