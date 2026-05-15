import Link from "next/link";
import MediaImage from "@/components/media-image";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner, PageHero, SectionIntro } from "@/components/section-primitives";
import { getBlogPosts, getFeaturedBlogPost } from "@/lib/data/public";

export const metadata = {
  title: "Blog and Resources",
};

export const revalidate = 60;

function formatPublishedDate(date: Date | null) {
  if (!date) {
    return "Publication date pending";
  }

  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function BlogIndexPage() {
  const [featuredPost, allPosts] = await Promise.all([
    getFeaturedBlogPost(),
    getBlogPosts(),
  ]);

  const resolvedFeatured = featuredPost ?? allPosts[0] ?? null;
  const rest = allPosts.filter((post) => post.slug !== resolvedFeatured?.slug);

  return (
    <>
      <PageHero
        label="Blog & Resources"
        title="A strategy center for CSS/PMS preparation, writing, and admissions clarity."
        copy="The articles are placeholder content, but the editorial layout and content model are built to feel complete and credible from day one."
      />

      <section className="section-frame bg-cream">
        <div className="site-container">
          {resolvedFeatured ? (
            <>
              <Reveal>
                <SectionIntro
                  label="Featured Article"
                  title={resolvedFeatured.title}
                  copy={resolvedFeatured.excerpt || "No excerpt available yet."}
                />
              </Reveal>
              <Reveal
                delay={120}
                className="featured-card mt-12 grid overflow-hidden rounded-[24px] md:grid-cols-[1.22fr_1fr]"
              >
                <MediaImage
                  src={resolvedFeatured.featuredImageUrl}
                  alt={resolvedFeatured.title}
                  aspectRatio="16/9"
                  className="h-full rounded-none md:min-h-full"
                />
                <div className="flex flex-col p-5 sm:p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.15em] text-gold-soft">
                    <span>{resolvedFeatured.category || "General"}</span>
                    <span>{formatPublishedDate(resolvedFeatured.publishedAt)}</span>
                    {resolvedFeatured.featured ? <span>Featured</span> : null}
                  </div>
                  <p className="mt-6 max-w-3xl flex-grow text-base leading-7 text-cream/82 md:text-lg md:leading-8">
                    {resolvedFeatured.excerpt || "No excerpt available yet."}
                  </p>
                  <Link href={`/blog/${resolvedFeatured.slug}`} className="button-secondary mt-8 w-full sm:w-auto">
                    Read More
                  </Link>
                </div>
              </Reveal>
            </>
          ) : (
            <div className="card-shell p-8 text-sm leading-7 text-ink/76">
              No published blog posts are available yet.
            </div>
          )}

          {rest.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post, index) => (
                <Reveal
                  key={post.id}
                  delay={index * 70}
                  className="card-shell flex flex-col overflow-hidden rounded-[24px] p-0"
                >
                  <MediaImage
                    src={post.featuredImageUrl}
                    alt={post.title}
                    aspectRatio="4/3"
                    className="rounded-none"
                  />
                  <div className="flex flex-grow flex-col p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.15em] text-gold">
                      <span>{post.category || "General"}</span>
                      <span>{formatPublishedDate(post.publishedAt)}</span>
                    </div>
                    <h2 className="display-title mt-4 text-2xl text-navy md:text-3xl">{post.title}</h2>
                    <p className="mt-4 flex-grow leading-8 text-ink/78">
                      {post.excerpt || "No excerpt available yet."}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="button-primary mt-8 w-full sm:w-auto">
                      Read More
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : resolvedFeatured ? null : null}
        </div>
      </section>

      <ConsultationBanner
        title="Want guidance tailored to your exact preparation challenge?"
        copy="A consultation can turn reading into action by clarifying the next most important move."
      />
    </>
  );
}
