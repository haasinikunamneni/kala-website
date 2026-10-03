import { Link } from "react-router-dom";
import heroGeneratedBg from "../assets/hero-generated-bg.png";

/**
 * Homepage hero.
 *
 * The hero scene is a single generated visual background: the framed paintings,
 * architecture, plants and sunlight belong to the image itself. All website
 * controls and copy are live HTML layered above it, so navigation and CTAs
 * remain fully interactive and accessible.
 */
export function Hero() {
  return (
    <section className="kala-hero relative min-h-svh overflow-hidden">
      {/* Generated editorial scene — visual background only. */}
      <div className="kala-hero-bg" aria-hidden="true">
        <img
          src={heroGeneratedBg}
          alt=""
          className="kala-hero-img"
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Very subtle readability treatment; no glass/blur panel. */}
      <div
        className="pointer-events-none absolute inset-0 z-1"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,248,235,0.04), rgba(255,248,235,0.015) 50%, rgba(255,248,235,0.04))",
        }}
      />

      {/* Live central content. Navbar is rendered separately by the app above this hero. */}
      <div className="kala-hero-content">
        <div className="kala-hero-copy">
          <p className="kala-hero-eyebrow">HANDPAINTED HERITAGE</p>

          <h1 className="kala-hero-title">
            Timeless
            <br />
            Art for
            <br />
            Modern Homes
          </h1>

          <div className="kala-hero-ornament" aria-hidden="true">
            <span />
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
              <path d="M14 2C16 4.2 17 6.7 17 9.1C17 14 14 18 14 18C14 18 11 14 11 9.1C11 6.7 12 4.2 14 2Z" stroke="currentColor" strokeWidth="1.15" />
              <path d="M14 18C10.7 16.2 8 13.4 7 9.7C6.2 6.7 6.8 4.4 6.8 4.4C9.8 5.2 12 6.7 13.5 8.6" stroke="currentColor" strokeWidth="1.15" />
              <path d="M14 18C17.3 16.2 20 13.4 21 9.7C21.8 6.7 21.2 4.4 21.2 4.4C18.2 5.2 16 6.7 14.5 8.6" stroke="currentColor" strokeWidth="1.15" />
            </svg>
            <span />
          </div>

          <p className="kala-hero-description">
            Original Pattachitra paintings and limited{" "}
            <br />
            edition prints, bringing India’s living heritage{" "}
            <br />
            into contemporary spaces.
          </p>

          <div className="kala-hero-actions">
            <Link to="/collections" className="kala-primary-cta">
              EXPLORE OUR COLLECTION <span aria-hidden="true" className="kala-cta-arrow">→</span>
            </Link>
            <Link to="/about" className="kala-story-cta">
              OUR STORY
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
