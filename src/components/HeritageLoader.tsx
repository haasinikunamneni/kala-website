import { useEffect, useState } from "react";

/**
 * HeritageLoader — a full-screen, timed loading experience for Kala.
 *
 * Standalone component. It does not touch the homepage or any routing —
 * a parent decides when to mount it and when to set `visible={false}` to
 * fade it out once the site is ready underneath.
 *
 * Usage:
 *   const [ready, setReady] = useState(false);
 *   ...
 *   <HeritageLoader visible={!ready} onExited={() => setUnmounted(true)} />
 *
 * Everything animates on one shared 2.5s CSS loop (see the injected
 * <style> block) so every stroke, leaf and petal stays in lockstep across
 * repeats — nothing here is driven by JS timers or requestAnimationFrame,
 * which keeps it at a steady 60fps and free of drift.
 */

interface HeritageLoaderProps {
  /** Whether the loader should be shown. Set to false to fade it out. */
  visible: boolean;
  /** Caption under the logo. */
  label?: string;
  /** Called once the fade-out transition has finished (only fires after visible=false). */
  onExited?: () => void;
}

const OLIVE = "#556B4D";
const FOREST = "#3F5235";
const TERRACOTTA = "#B46A42";
const GOLD = "#C59A52";
const CHARCOAL = "#2C2A27";
const IVORY = "#F6EEE4";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function HeritageLoader({ visible, label = "Preparing your gallery…", onExited }: HeritageLoaderProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 px-6 transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ backgroundColor: IVORY }}
      role="status"
      aria-live="polite"
      aria-label={label}
      onTransitionEnd={(e) => {
        if (e.propertyName === "opacity" && !visible) onExited?.();
      }}
    >
      {/* Logo — static, never animates */}
      <span
        className="font-display text-4xl tracking-widest2 md:text-5xl"
        style={{ color: CHARCOAL }}
      >
        kālā
      </span>

      {/* Caption — soft fade-in only */}
      <span
        className="heritage-caption font-body text-[11px] uppercase tracking-widest2"
        style={{ color: `${CHARCOAL}99` }}
      >
        {label}
      </span>

      {/* The vine — the hero of the experience */}
      <div className="heritage-vine-shadow relative h-[38vh] min-h-[220px] w-[140px]">
        <svg
          viewBox="0 0 200 400"
          className={`heritage-vine h-full w-full ${reduced ? "heritage-vine--static" : ""}`}
          aria-hidden="true"
        >
          {/* Base curled tendril the stem grows out of */}
          <path
            className="v-base-curl"
            d="M100,392 Q84,388 82,374 Q80,360 94,357 Q106,355 106,366 Q106,374 97,373"
            fill="none"
            stroke={FOREST}
            strokeWidth="2.2"
            strokeLinecap="round"
            pathLength={1}
          />

          {/* Main stem, drawn upward */}
          <path
            className="v-stem"
            d="M100,392 C93,350 112,322 96,290 C82,262 106,236 92,206 C80,180 104,152 90,124 C80,104 100,80 94,52 C90,36 98,26 96,16"
            fill="none"
            stroke={OLIVE}
            strokeWidth="2.6"
            strokeLinecap="round"
            pathLength={1}
          />

          {/* Leaves, unfurling one after another along the stem */}
          <g className="v-leaf v-leaf-1" style={{ transformOrigin: "94px 296px" }}>
            <path
              d="M94,296 C104,286 122,286 128,298 C122,310 104,310 94,296 Z"
              fill={FOREST}
            />
          </g>
          <g className="v-leaf v-leaf-2" style={{ transformOrigin: "90px 230px" }}>
            <path
              d="M90,230 C80,220 62,220 56,232 C62,244 80,244 90,230 Z"
              fill={OLIVE}
            />
          </g>
          <g className="v-leaf v-leaf-3" style={{ transformOrigin: "88px 168px" }}>
            <path
              d="M88,168 C98,158 116,158 122,170 C116,182 98,182 88,168 Z"
              fill={FOREST}
            />
          </g>
          <g className="v-leaf v-leaf-4" style={{ transformOrigin: "92px 96px" }}>
            <path
              d="M92,96 C82,86 64,86 58,98 C64,110 82,110 92,96 Z"
              fill={OLIVE}
            />
          </g>

          {/* Small decorative curling tendrils */}
          <path
            className="v-tendril v-tendril-1"
            d="M96,206 Q112,200 112,186 Q112,174 100,176 Q92,178 94,186"
            fill="none"
            stroke={FOREST}
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1}
          />
          <path
            className="v-tendril v-tendril-2"
            d="M92,124 Q76,118 76,104 Q76,92 88,94 Q96,96 94,104"
            fill="none"
            stroke={OLIVE}
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1}
          />

          {/* Flower, blooming at the tip */}
          <g className="v-flower" style={{ transformOrigin: "96px 16px" }}>
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse
                key={deg}
                cx="96"
                cy="1"
                rx="6.5"
                ry="11"
                fill={TERRACOTTA}
                transform={`rotate(${deg} 96 16)`}
              />
            ))}
            <circle cx="96" cy="16" r="4" fill={GOLD} />
          </g>

          {/* Pollen dots, appearing just after bloom */}
          <circle className="v-pollen v-pollen-1" cx="112" cy="8" r="1.6" fill={GOLD} />
          <circle className="v-pollen v-pollen-2" cx="80" cy="10" r="1.4" fill={GOLD} />
          <circle className="v-pollen v-pollen-3" cx="100" cy="-4" r="1.3" fill={GOLD} />
        </svg>
      </div>

      <span
        className="font-body text-[10px] uppercase tracking-widest2"
        style={{ color: `${CHARCOAL}66` }}
      >
        Rooted in Art&nbsp;&nbsp;·&nbsp;&nbsp;Always Growing
      </span>

      <style>{`
        .heritage-caption {
          animation: heritage-caption-fade 2.5s ease-in-out infinite;
        }
        @keyframes heritage-caption-fade {
          0%   { opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { opacity: 1; }
        }

        .heritage-vine-shadow::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 4%;
          width: 60%;
          height: 10px;
          background: radial-gradient(ellipse at center, rgba(44,42,39,0.10) 0%, rgba(44,42,39,0) 72%);
          transform: translateX(-50%);
          pointer-events: none;
        }

        /* Shared reset window (92%–100%): everything fades out briefly so the
           next loop's dash-offset / scale reset is invisible, then fades
           back in at 0% — this is what makes the loop feel seamless
           instead of "snapping" back to the start. */
        .heritage-vine .v-base-curl,
        .heritage-vine .v-stem,
        .heritage-vine .v-tendril,
        .heritage-vine .v-leaf,
        .heritage-vine .v-flower,
        .heritage-vine .v-pollen {
          animation-duration: 2.5s;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
        }

        .v-base-curl {
          stroke-dasharray: 1;
          animation-name: v-draw, v-reset-fade;
          animation-delay: 0s, 0s;
        }
        .v-stem {
          stroke-dasharray: 1;
          animation-name: v-draw-stem, v-reset-fade;
          animation-delay: 0.1s, 0s;
        }
        @keyframes v-draw {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          2%   { opacity: 1; }
          10%  { stroke-dashoffset: 0; }
          90%  { stroke-dashoffset: 0; opacity: 1; }
          96%  { opacity: 0; }
          100% { stroke-dashoffset: 1; opacity: 0; }
        }
        @keyframes v-draw-stem {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          4%   { opacity: 1; }
          46%  { stroke-dashoffset: 0; }
          88%  { stroke-dashoffset: 0; opacity: 1; }
          96%  { opacity: 0; }
          100% { stroke-dashoffset: 1; opacity: 0; }
        }
        @keyframes v-reset-fade {
          0%, 88%  { opacity: 1; }
          96%, 100% { opacity: 1; }
        }

        .v-tendril { stroke-dasharray: 1; opacity: 0; }
        .v-tendril-1 { animation-name: v-tendril-draw; animation-delay: 0.9s; }
        .v-tendril-2 { animation-name: v-tendril-draw; animation-delay: 1.05s; }
        @keyframes v-tendril-draw {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          52%  { stroke-dashoffset: 1; opacity: 0; }
          58%  { opacity: 1; }
          66%  { stroke-dashoffset: 0; }
          88%  { stroke-dashoffset: 0; opacity: 1; }
          94%  { opacity: 0; }
          100% { stroke-dashoffset: 1; opacity: 0; }
        }

        .v-leaf { opacity: 0; transform: scale(0) rotate(-14deg); }
        .v-leaf-1 { animation-name: v-leaf-unfurl; animation-delay: 0.42s; }
        .v-leaf-2 { animation-name: v-leaf-unfurl; animation-delay: 0.58s; }
        .v-leaf-3 { animation-name: v-leaf-unfurl; animation-delay: 0.74s; }
        .v-leaf-4 { animation-name: v-leaf-unfurl; animation-delay: 0.9s; }
        @keyframes v-leaf-unfurl {
          0%   { opacity: 0; transform: scale(0) rotate(-14deg); }
          40%  { opacity: 0; transform: scale(0) rotate(-14deg); }
          58%  { opacity: 1; transform: scale(1.08) rotate(4deg); }
          68%  { transform: scale(1) rotate(0deg); }
          86%  { opacity: 1; transform: scale(1) rotate(0deg); }
          92%  { opacity: 0; }
          100% { opacity: 0; transform: scale(0) rotate(-14deg); }
        }

        .v-flower { opacity: 0; transform: scale(0); }
        .v-flower {
          animation-name: v-bloom;
          animation-delay: 0s;
        }
        @keyframes v-bloom {
          0%   { opacity: 0; transform: scale(0); }
          58%  { opacity: 0; transform: scale(0); }
          70%  { opacity: 1; transform: scale(1.12); }
          78%  { transform: scale(1); }
          88%  { opacity: 1; transform: scale(1); }
          94%  { opacity: 0; transform: scale(0.85); }
          100% { opacity: 0; transform: scale(0); }
        }

        .v-pollen { opacity: 0; }
        .v-pollen-1 { animation: v-pollen-fade 2.5s cubic-bezier(0.33,1,0.68,1) infinite; animation-delay: 0.02s; }
        .v-pollen-2 { animation: v-pollen-fade 2.5s cubic-bezier(0.33,1,0.68,1) infinite; animation-delay: 0.08s; }
        .v-pollen-3 { animation: v-pollen-fade 2.5s cubic-bezier(0.33,1,0.68,1) infinite; animation-delay: 0.14s; }
        @keyframes v-pollen-fade {
          0%   { opacity: 0; }
          66%  { opacity: 0; }
          74%  { opacity: 1; }
          86%  { opacity: 1; }
          94%  { opacity: 0; }
          100% { opacity: 0; }
        }

        /* Idle sway — a whole-vine group sway once growth has finished,
           layered on top of everything above via the parent svg. */
        .heritage-vine {
          animation: v-sway 2.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          transform-origin: 100px 392px;
        }
        @keyframes v-sway {
          0%, 78%   { transform: rotate(0deg); }
          84%       { transform: rotate(1.2deg); }
          90%       { transform: rotate(-1deg); }
          96%, 100% { transform: rotate(0deg); }
        }

        /* Reduced motion: skip straight to a fully bloomed, static vine. */
        .heritage-vine--static,
        .heritage-vine--static * {
          animation: none !important;
        }
        .heritage-vine--static .v-base-curl,
        .heritage-vine--static .v-stem,
        .heritage-vine--static .v-tendril {
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
        }
        .heritage-vine--static .v-leaf,
        .heritage-vine--static .v-flower {
          opacity: 1 !important;
          transform: scale(1) rotate(0deg) !important;
        }
        .heritage-vine--static .v-pollen {
          opacity: 1 !important;
        }
        .heritage-caption {
          animation-play-state: running;
        }
        @media (prefers-reduced-motion: reduce) {
          .heritage-caption { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
