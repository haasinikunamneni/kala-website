import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hand, ShieldCheck, Sparkles, Frame as FrameIcon } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { PaintingCard } from "../components/PaintingCard";
import { PlaceholderArtwork } from "../components/PlaceholderArtwork";
import { PattaBorder } from "../components/ornaments/PattaBorder";
import { DiscoverCollection } from "../components/discover/DiscoverCollection";
import { paintings as localPaintings, suppliers as localSuppliers } from "../data/placeholderData";
import { useSiteSettings } from "../context/SiteSettingsContext";
import nisaNikunjaVilasaImg from "../assets/artworks/nisa-nikunja-vilasa.png";
import artisanAtWorkImg from "../assets/suppliers/artisan-workshop-4.png";
import artisanWorkshop1Img from "../assets/suppliers/artisan-workshop-1.png";
import artisanWorkshop2Img from "../assets/suppliers/artisan-workshop-2.png";
import artisanWorkshop5Img from "../assets/suppliers/artisan-workshop-5.png";
import inYourHome1Img from "../assets/lifestyle/in-your-home-1.jpg";
import inYourHome2Img from "../assets/lifestyle/in-your-home-2.jpg";

const whyKala = [
  { icon: Hand, title: "Handcrafted", text: "Every piece is painted entirely by hand, with no two works ever identical." },
  { icon: ShieldCheck, title: "Authentic", text: "Sourced directly from artisan communities, never mass-reproduced." },
  { icon: Sparkles, title: "Curated", text: "Each painting is selected for craftsmanship, not catalogued in bulk." },
  { icon: FrameIcon, title: "Framed", text: "Professionally framed and prepared for contemporary interiors." },
];

export function Home() {
  const featured = localPaintings.filter((p) => p.featured && !p.sold).slice(0, 6);
  const { settings } = useSiteSettings();
  const igHandle = settings.instagram_handle.replace(/^@/, "");

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-ivory px-6 pt-24 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs uppercase tracking-widest2 text-terracotta">A Curated Heritage Gallery</p>
            <h1 className="mt-5 font-display text-fluid-h1 text-charcoal">
              Timeless Indian Artistry, Curated for Contemporary Homes.
            </h1>
            <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-charcoal/70">
              Hand-painted heritage art, sourced directly from artisan communities and
              professionally framed for the modern home.
            </p>
            <div className="mt-9 flex items-center gap-6">
              <Link
                to="/collections"
                className="inline-flex items-center rounded-sm bg-charcoal px-7 py-3.5 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors duration-300 hover:bg-terracotta focus-ring"
              >
                Explore Collection
              </Link>
              <Link to="/about" className="font-body text-[13px] uppercase tracking-widest2 text-charcoal/70 hover:text-gold">
                Our Story
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-charcoal/5 shadow-2xl">
              <Link to="/artwork/nisa-nikunja-vilasa" className="block h-full w-full focus-ring">
                <img
                  src={nisaNikunjaVilasaImg}
                  alt="Nisā Nikunja Vilāsa"
                  className="h-full w-full object-contain transition-transform duration-700 ease-gallery hover:scale-[1.03]"
                />
              </Link>
            </div>
            <PattaBorder className="absolute -bottom-3 left-1/2 h-6 w-[88%] -translate-x-1/2" color="#BB9569" />
          </motion.div>
        </div>
      </section>

      {/* Featured Collection — Odisha Pattachitra */}
      {/* Why Kala */}
      <section className="bg-beige px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why kalā" title="Every Piece Tells The Truth" align="center" />
          <div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {whyKala.map((w) => (
              <div key={w.title} className="text-center">
                <w.icon className="mx-auto h-7 w-7 text-gold" strokeWidth={1.25} />
                <h3 className="mt-5 font-display text-xl text-charcoal">{w.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/65">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DiscoverCollection />

      {/* In Your Home — lifestyle / in-situ shots */}
      <section className="bg-ivory px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-6 md:grid-cols-2">
            <SectionHeading eyebrow="See It Living" title="In Your Home" />
            <p className="max-w-md font-body text-[15px] leading-relaxed text-charcoal/65 md:text-right">
              Framed, hung, and photographed in real interiors — so you can see the true
              scale, texture, and craftsmanship of each piece before it arrives at your door.
            </p>
          </div>
          {/*
            TODO: Replace the remaining PlaceholderArtwork tiles below with real in-situ /
            lifestyle photography (paintings framed and hung on a wall, styled in a living
            room, hallway, etc). Drop the images into src/assets/lifestyle/ and swap each
            <PlaceholderArtwork .../> for an <img src={...} className="h-full w-full object-cover" />.
          */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-sm">
              <img
                src={inYourHome1Img}
                alt="Kṛṣṇa Pattachitra framed and displayed in a home corner"
                className="w-full transition-transform duration-700 ease-gallery hover:scale-[1.03]"
              />
            </div>
            <div className="overflow-hidden rounded-sm">
              <img
                src={inYourHome2Img}
                alt="Natya Ganapati Pattachitra framed and displayed beside a TV console"
                className="w-full transition-transform duration-700 ease-gallery hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Artisan */}
      <section className="bg-beige px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="mx-auto max-w-md columns-2 gap-2 md:max-w-none [column-fill:_balance]">
                <img
                  src={artisanAtWorkImg}
                  alt="Artisan presenting a hand-painted Pattachitra"
                  className="mb-2 w-full rounded-sm bg-charcoal/5"
                />
                <img
                  src={artisanWorkshop1Img}
                  alt="Artisan at work in an Odisha village workshop"
                  className="mb-2 w-full rounded-sm bg-charcoal/5"
                />
                <img
                  src={artisanWorkshop2Img}
                  alt="Detail of a hand-painted Pattachitra scroll"
                  className="mb-2 w-full rounded-sm bg-charcoal/5"
                />
                <img
                  src={artisanWorkshop5Img}
                  alt="Finished Pattachitra scroll ready for framing"
                  className="mb-2 w-full rounded-sm bg-charcoal/5"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <SectionHeading eyebrow="From Their Hands To Yours" title="Meet The Artisan" />
              <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-charcoal/70">
                {localSuppliers[0]?.history}
              </p>
              <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-charcoal/70">
                {localSuppliers[0]?.artisanStory}
              </p>
              <Link
                to="/suppliers"
                className="mt-8 inline-flex items-center font-body text-[13px] uppercase tracking-widest2 text-terracotta hover:text-gold"
              >
                Meet Our Suppliers →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Paintings */}
      <section className="bg-ivory px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="The Current Collection" title="Featured Artworks" />
            <Link to="/collections" className="font-body text-xs uppercase tracking-widest2 text-terracotta hover:text-gold">
              View All →
            </Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <PaintingCard painting={p} index={i} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram preview */}
      <section className="bg-beige px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={settings.instagram_handle} title="From The Gallery Floor" align="center" />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={i}
                href={`https://instagram.com/${igHandle}`}
                target="_blank"
                rel="noreferrer"
                className="aspect-square overflow-hidden rounded-sm"
              >
                <PlaceholderArtwork
                  title=""
                  artForm=""
                  palette={["#B95D3F", "#BB9569", "#EFE8DD"]}
                  seed={i + 40}
                  className="h-full w-full"
                />
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={`https://instagram.com/${igHandle}`}
              target="_blank"
              rel="noreferrer"
              className="font-body text-xs uppercase tracking-widest2 text-charcoal/60 hover:text-gold"
            >
              Follow {settings.instagram_handle} →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
