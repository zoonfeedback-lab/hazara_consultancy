import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { ConsultationBanner } from "@/components/section-primitives";
import { blogPosts, getPost } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.related
    .map((relatedSlug) => blogPosts.find((entry) => entry.slug === relatedSlug))
    .filter(Boolean);

  return (
    <>
      <article className="bg-paper py-24">
        <div className="site-container grid gap-14 lg:grid-cols-[0.95fr_0.35fr]">
          <Reveal>
            <span className="eyebrow">{post.category}</span>
            <h1 className="display-title mt-6 text-5xl leading-[1.05] text-navy md:text-6xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-4 text-sm uppercase tracking-[0.15em] text-ink/58">
              <span>{post.author}</span>
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
            </div>
            <div className="mt-10 space-y-8 text-lg leading-9 text-ink/84">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="card-shell sticky top-28 p-7">
              <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
                Related Articles
              </div>
              <div className="mt-5 space-y-5">
                {relatedPosts.map((entry) =>
                  entry ? (
                    <Link key={entry.slug} href={`/blog/${entry.slug}`} className="block">
                      <div className="display-title text-2xl text-navy">{entry.title}</div>
                      <div className="mt-2 text-sm text-ink/62">{entry.category}</div>
                    </Link>
                  ) : null,
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
