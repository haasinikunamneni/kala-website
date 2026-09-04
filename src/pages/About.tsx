import { SectionHeading } from "../components/SectionHeading";
import { PlaceholderArtwork } from "../components/PlaceholderArtwork";

export function About() {
  return (
    <div className="px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About kalā"
          title="Bridging Heritage With Contemporary Interiors"
          description="kalā is not an ecommerce store. It is a curated digital gallery that bridges India's timeless artistic heritage with modern luxury interiors."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <PlaceholderArtwork
              title="Our Studio"
              artForm="Heritage Curation"
              palette={["#4A3427", "#B6905A", "#EFE8DD"]}
              seed={200}
              className="h-full w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40">
              <span className="rounded-full border border-ivory/60 px-5 py-2 font-body text-xs uppercase tracking-widest2 text-ivory">
                Coming Soon
              </span>
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <p className="font-display text-2xl text-charcoal">Our Mission</p>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-charcoal/70">
                To bring India's living artistic heritage into contemporary homes by curating
                authentic handcrafted artworks sourced directly from artisan communities and
                trusted suppliers.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-charcoal">Our Vision</p>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-charcoal/70">
                To become India's most trusted destination for authentic handcrafted heritage
                art — preserving the stories, skills, and traditions of its artisans while
                bringing their work to a new generation of discerning collectors through
                thoughtful curation and refined presentation.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-charcoal">How We Curate</p>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-charcoal/70">
                We curate each work at its source, working directly with artisan workshops to
                select pieces that reflect exceptional craftsmanship, authenticity, and the
                spirit of their tradition. Every painting is thoughtfully prepared and
                professionally framed, ready to be preserved and lived with for generations.
                Nothing at Kala is mass-produced or reproduced. Each work is handmade,
                inherently unique, and exists as a one-of-one.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-charcoal/10 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {["Authenticity", "Craftsmanship", "Transparency", "Heritage", "Luxury", "Minimalism", "Storytelling", "Respect for Artisans"].map(
            (v) => (
              <p key={v} className="font-display text-xl text-charcoal/80">
                {v}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
