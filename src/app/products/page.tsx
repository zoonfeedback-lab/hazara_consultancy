import { Reveal } from "@/components/reveal";
import { ConsultationBanner, PageHero, SectionIntro } from "@/components/section-primitives";
import { products } from "@/lib/site-data";

export const metadata = {
  title: "Digital Products",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Digital Products"
        title="Recorded lectures, notes, past papers, and premium PDF resources."
        copy="The store is intentionally complete in feel, even though purchases are still in a coming-soon state for this phase."
      />

      <section className="section-frame bg-cream">
        <div className="site-container">
          <Reveal>
            <SectionIntro
              label="Resource Store"
              title="Built for students who want immediate access to structured materials."
              copy="Every item is mock data for now, but the browsing experience is polished and ready for future commerce flows."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 70} className="card-shell p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-gold-soft px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-navy">
                    {product.category}
                  </span>
                  <span className="text-sm font-semibold text-navy">{product.price}</span>
                </div>
                <h2 className="display-title mt-5 text-3xl text-navy">{product.title}</h2>
                <p className="mt-4 leading-8 text-ink/78">{product.description}</p>
                <div className="mt-6 rounded-[16px] bg-mist px-4 py-3 text-sm text-ink/76">
                  Format: {product.format}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-full bg-line px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/55"
                  >
                    Coming Soon
                  </button>
                  <button type="button" className="button-ghost">
                    Preview
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationBanner
        title="Need help choosing the right resource stack?"
        copy="We can recommend the best notes, lecture bundles, and writing resources based on your attempt stage."
        label="Ask for Guidance"
      />
    </>
  );
}
