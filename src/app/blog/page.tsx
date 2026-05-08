import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner, PageHero, SectionIntro } from "@/components/section-primitives";
import { blogPosts } from "@/lib/site-data";

export const metadata = {
  title: "Blog and Resources",
};

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        label="Blog & Resources"
        title="A strategy center for CSS/PMS preparation, writing, and admissions clarity."
        copy="The articles are placeholder content, but the editorial layout and content model are built to feel complete and credible from day one."
      />

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Featured Article"
              title={featured.title}
              copy={featured.excerpt}
            />
          </Reveal>
          <Reveal delay={120} className="featured-card mt-12 rounded-[24px] p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-gold-soft">
              <span>{featured.category}</span>
              <span>{featured.date}</span>
              <span>{featured.readingTime}</span>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/82">
              {featured.body[0]}
            </p>
            <Link href={`/blog/${featured.slug}`} className="button-secondary mt-8">
              Read More
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={index * 70} className="card-shell p-8">
                <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.15em] text-gold">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="display-title mt-4 text-3xl text-navy">{post.title}</h2>
                <p className="mt-4 leading-8 text-ink/78">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="button-primary mt-8">
                  Read More
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationBanner
        title="Want guidance tailored to your exact preparation challenge?"
        copy="A consultation can turn reading into action by clarifying the next most important move."
      />
    </>
  );
}
