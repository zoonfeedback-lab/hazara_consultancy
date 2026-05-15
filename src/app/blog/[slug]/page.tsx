import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaImage from "@/components/media-image";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner } from "@/components/section-primitives";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data/public";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt || "Blog article",
  };
}

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getBlogPosts();
  const filtered = relatedPosts.filter((entry) => entry.slug !== slug).slice(0, 3);
  const bodyParagraphs = (post.body || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <article className="bg-paper py-14 md:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_0.35fr] lg:gap-14">
          <Reveal>
            <span className="eyebrow">{post.category || "General"}</span>
            <h1 className="display-title mt-4 text-3xl leading-tight text-navy md:mt-6 md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm uppercase tracking-[0.15em] text-ink/58 md:mt-6">
              <span>{formatPublishedDate(post.publishedAt)}</span>
              {post.featured ? <span>Featured</span> : null}
            </div>
            <div className="mb-8 mt-8 rounded-xl shadow-[0_18px_42px_rgba(15,36,71,0.14)]">
              <MediaImage
                src={post.featuredImageUrl}
                alt={post.title}
                aspectRatio="16/9"
              />
            </div>
            <div className="mt-8 space-y-6 text-base leading-8 text-ink/84 md:mt-10 md:space-y-8 md:text-lg md:leading-9">
              {bodyParagraphs.length > 0 ? (
                bodyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
              ) : (
                <p>No article body has been added yet.</p>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="card-shell p-6 lg:sticky lg:top-28 lg:p-7">
              <div className="text-sm uppercase tracking-[0.18em] text-gold">
                Related Articles
              </div>
              <div className="mt-5 space-y-5">
                {filtered.length > 0 ? (
                  filtered.map((entry) => (
                    <Link key={entry.id} href={`/blog/${entry.slug}`} className="block">
                      <div className="display-title text-2xl text-navy">{entry.title}</div>
                      <div className="mt-2 text-sm text-ink/62">{entry.category || "General"}</div>
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-ink/62">No related articles are available yet.</div>
                )}
              </div>
            </aside>
          </Reveal>
        </div>
      </article>

      <ConsultationBanner
        title="Need help applying this strategy to your own preparation?"
        copy="Book a consultation and we'll translate advice into a realistic study or writing plan."
      />
    </>
  );
}
