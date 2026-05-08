import Link from "next/link";

type IntroProps = {
  label: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionIntro({
  label,
  title,
  copy,
  align = "left",
}: IntroProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="eyebrow">{label}</span>
      <h2 className="display-title mt-5 text-4xl text-navy md:text-5xl">{title}</h2>
      {copy ? (
        <p className="mt-5 text-base leading-8 text-ink/78 md:text-lg">{copy}</p>
      ) : null}
    </div>
  );
}

type HeroProps = {
  label: string;
  title: string;
  copy: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  dark?: boolean;
};

export function PageHero({
  label,
  title,
  copy,
  actions,
  aside,
  dark = false,
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${dark ? "gradient-panel text-cream" : "bg-paper"}`}
    >
      <div className="hero-orb" />
      <div className="hero-orb-alt" />
      <div className="site-container grid min-h-[46vh] items-center gap-10 py-28 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative z-10">
          <span className={`eyebrow ${dark ? "text-gold-soft" : ""}`}>{label}</span>
          <h1
            className={`display-title mt-6 max-w-4xl text-5xl leading-[1.05] md:text-7xl ${
              dark ? "text-cream" : "text-navy"
            }`}
          >
            {title}
          </h1>
          <p className={`mt-6 max-w-2xl text-lg leading-8 ${dark ? "text-cream/82" : "text-ink/78"}`}>
            {copy}
          </p>
          {actions ? <div className="mt-10 flex flex-wrap gap-4">{actions}</div> : null}
        </div>
        {aside ? <div className="relative z-10">{aside}</div> : null}
      </div>
    </section>
  );
}

type CtaProps = {
  title: string;
  copy: string;
  href?: string;
  label?: string;
};

export function ConsultationBanner({
  title,
  copy,
  href = "/contact",
  label = "Book Consultation",
}: CtaProps) {
  return (
    <section className="section-frame bg-navy text-cream">
      <div className="site-container">
        <div className="featured-card rounded-[24px] px-8 py-10 md:px-12 md:py-14">
          <span className="eyebrow text-gold-soft">Ready To Begin</span>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="display-title text-4xl md:text-5xl">{title}</h2>
              <p className="mt-4 text-lg leading-8 text-cream/82">{copy}</p>
            </div>
            <Link href={href} className="button-secondary">
              {label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
