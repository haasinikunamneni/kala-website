import { SectionHeading } from "../components/SectionHeading";
import { PlaceholderArtwork } from "../components/PlaceholderArtwork";
import { BadgeCheck, Hammer, Eye, Landmark, Gem, Circle, BookOpen, HeartHandshake } from "lucide-react";

const VALUES = [
  { icon: BadgeCheck, title: "Authenticity", text: "Every piece verified as genuine, hand-painted heritage art." },
  { icon: Hammer, title: "Craftsmanship", text: "Decades of skill in every brushstroke and finish." },
  { icon: Eye, title: "Transparency", text: "Clear sourcing, honest pricing, no hidden mark-ups." },
  { icon: Landmark, title: "Heritage", text: "Preserving traditions passed down through generations." },
  { icon: Gem, title: "Luxury", text: "Museum-quality pieces, professionally framed for the home." },
  { icon: Circle, title: "Minimalism", text: "Curated for spaces that let the art speak for itself." },
  { icon: BookOpen, title: "Storytelling", text: "Every painting carries a legend worth knowing." },
  { icon: HeartHandshake, title: "Respect for Artisans", text: "Fair partnerships with the hands behind every work." },
];

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
              palette={["#4A3427", "#BB9569", "#EFE8DD"]}
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

      </div>

      <div className="mt-24 w-screen -translate-x-1/2 bg-charcoal py-20 px-6 [margin-left:50%] md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center font-display text-4xl text-ivory">Our Values</p>
          <div className="mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-ivory/15">
            {VALUES.map((v) => (
              <div key={v.title} className="px-6 text-center">
                <v.icon className="mx-auto h-7 w-7 text-gold" strokeWidth={1.25} />
                <p className="mt-4 font-display text-xl text-ivory">{v.title}</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-ivory/60">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
