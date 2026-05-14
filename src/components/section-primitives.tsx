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
      <h2 className="display-title mt-4 text-3xl leading-tight text-navy md:mt-5 md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-7 text-ink/78 md:mt-5 md:text-lg md:leading-8">
          {copy}
        </p>
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
      <div className="site-container grid items-center gap-8 py-16 md:gap-10 md:py-20 lg:min-h-[46vh] lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
        <div className="relative z-10">
          <span className={`eyebrow ${dark ? "text-gold-soft" : ""}`}>{label}</span>
          <h1
            className={`display-title mt-4 max-w-4xl break-words text-3xl leading-tight md:mt-6 md:text-5xl lg:text-7xl ${
              dark ? "text-cream" : "text-navy"
            }`}
          >
            {title}
          </h1>
          <p className={`mt-4 max-w-2xl text-base leading-7 md:mt-6 md:text-lg md:leading-8 ${dark ? "text-cream/82" : "text-ink/78"}`}>
            {copy}
          </p>
          {actions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10 [&>*]:w-full sm:[&>*]:w-auto">
              {actions}
            </div>
          ) : null}
        </div>
        {aside ? <div className="relative z-10 order-last lg:order-none">{aside}</div> : null}
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
        <div className="featured-card rounded-[24px] px-5 py-8 sm:px-6 md:px-12 md:py-14">
          <span className="eyebrow text-gold-soft">Ready To Begin</span>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="display-title text-3xl leading-tight md:text-4xl lg:text-5xl">{title}</h2>
              <p className="mt-4 text-base leading-7 text-cream/82 md:text-lg md:leading-8">{copy}</p>
            </div>
            <Link href={href} className="button-secondary w-full md:w-auto">
              {label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
