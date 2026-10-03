import { Link } from "react-router-dom";
import { SectionHeading } from "../SectionHeading";
import patraImg from "../../assets/idols/patra.png";
import krishnaImg from "../../assets/idols/krishna.png";
import ganeshaImg from "../../assets/idols/ganesha.png";
import buddhaImg from "../../assets/idols/buddha.png";
import durgaImg from "../../assets/idols/durga.png";
import saraswatiImg from "../../assets/idols/saraswati.png";
import garudaImg from "../../assets/idols/garuda.png";
import ramaImg from "../../assets/idols/rama.png";
import vishnuImg from "../../assets/idols/vishnu.png";
import lakshmiImg from "../../assets/idols/lakshmi.png";
import jagannathImg from "../../assets/idols/jagannath.png";

interface IdolEntry {
  img: string;
  label: string;
  href: string;
}

const IDOLS: IdolEntry[] = [
  { img: patraImg,     label: "Patra",      href: "/collections?theme=Patra" },
  { img: krishnaImg,   label: "Kṛṣṇa",      href: "/collections?theme=Krishna" },
  { img: ganeshaImg,   label: "Gaṇeśa",     href: "/collections?theme=Ganesha" },
  { img: buddhaImg,    label: "Buddha",     href: "/collections?theme=Buddha" },
  { img: durgaImg,     label: "Durgā",      href: "/collections?theme=Durga" },
  { img: saraswatiImg, label: "Sarasvatī",  href: "/collections?theme=Saraswati" },
  { img: garudaImg,    label: "Garuḍa",     href: "/collections?theme=Garuda" },
  { img: ramaImg,      label: "Rāma",       href: "/collections?theme=Rama" },
  { img: vishnuImg,    label: "Viṣṇu",      href: "/collections?theme=Vishnu" },
  { img: lakshmiImg,   label: "Lakṣmī",     href: "/collections?theme=Lakshmi" },
  { img: jagannathImg, label: "Jagannātha", href: "/collections?theme=Jagannath" },
];

export function DiscoverCollection() {
  return (
    <section className="bg-ivory px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sacred Forms"
          title="Discover the Collection"
          description="Sacred forms that lead into their painted worlds."
          align="center"
        />

        <div className="mx-auto mt-10 flex w-full max-w-4xl flex-wrap place-content-center items-center gap-x-8 gap-y-10 md:gap-x-10 md:gap-y-14">
          {IDOLS.map(({ img, label, href }) => (
            <Link
              key={label}
              to={href}
              aria-label={`${label} collection`}
              className="idol-link group flex w-20 flex-col items-center focus-ring md:w-24"
            >
              <span className="flex h-24 items-end justify-center md:h-28">
                <img
                  src={img}
                  alt={label}
                  draggable={false}
                  className="idol-figure h-full w-auto select-none"
                />
              </span>
              <span className="mt-4 text-center font-body text-xs uppercase tracking-widest2 text-charcoal/70 transition-colors duration-300 group-hover:text-gold">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
