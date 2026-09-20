import type { SVGProps } from "react";

/**
 * A set of brass-relief idol glyphs for the "Discover the Collection" homepage
 * section. Each is a simple, faceless, symbolic silhouette in a shared style —
 * closer to a temple-wall relief carving or a foundry maker's mark than a
 * literal figurative sculpture. Every icon shares the same two-tone brass
 * gradient and the same construction language (rounded head, a-line robe,
 * one iconic attribute) so the set reads as one family, not eight separate
 * illustrations.
 */

const SHARED_DEFS_PROPS = { viewBox: "0 0 120 168" };

function Aura({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E4C48C" />
        <stop offset="55%" stopColor="#B6905A" />
        <stop offset="100%" stopColor="#8A6437" />
      </linearGradient>
    </defs>
  );
}

/** Krishna — tribhanga stance, flute raised, peacock-feather crest */
export function KrishnaIdol(props: SVGProps<SVGSVGElement>) {
  const id = "brass-krishna";
  return (
    <svg {...SHARED_DEFS_PROPS} {...props}>
      <Aura id={id} />
      <g fill={`url(#${id})`}>
        <circle cx="62" cy="30" r="15" />
        <path d="M62 15 Q70 2 78 10 Q72 12 68 18 Z" />
        <path d="M40 60 Q34 95 44 130 Q60 150 78 128 Q86 96 78 60 Q60 50 40 60 Z" />
        <path d="M24 70 Q45 62 62 66 Q79 62 96 74 Q80 78 62 74 Q46 78 24 70 Z" />
        <path d="M46 132 Q42 148 36 158 L46 158 Q52 146 52 132 Z" />
        <path d="M78 132 Q82 148 88 158 L78 158 Q72 146 72 132 Z" />
      </g>
    </svg>
  );
}

/** Gaṇapati — elephant head, seated, one hand raised in blessing */
export function GanapatiIdol(props: SVGProps<SVGSVGElement>) {
  const id = "brass-ganapati";
  return (
    <svg {...SHARED_DEFS_PROPS} {...props}>
      <Aura id={id} />
      <g fill={`url(#${id})`}>
        <ellipse cx="60" cy="34" rx="20" ry="17" />
        <path d="M52 40 Q46 68 54 84 Q60 90 66 84 Q58 68 60 40 Z" />
        <ellipse cx="40" cy="30" rx="9" ry="12" />
        <ellipse cx="80" cy="30" rx="9" ry="12" />
        <path d="M30 92 Q26 122 36 148 Q60 164 84 148 Q94 122 90 92 Q60 80 30 92 Z" />
        <path d="M16 100 Q30 94 40 100 Q30 106 20 116 Z" />
      </g>
    </svg>
  );
}

/** Jagannātha — stylised stump form with the iconic large round eyes */
export function JagannathaIdol(props: SVGProps<SVGSVGElement>) {
  const id = "brass-jagannatha";
  return (
    <svg {...SHARED_DEFS_PROPS} {...props}>
      <Aura id={id} />
      <g fill={`url(#${id})`}>
        <path d="M36 44 Q60 24 84 44 Q88 90 78 140 Q60 152 42 140 Q32 90 36 44 Z" />
        <circle cx="50" cy="60" r="9" />
        <circle cx="70" cy="60" r="9" />
        <path d="M56 82 Q60 88 64 82 Q60 92 56 82 Z" />
        <path d="M44 20 Q60 4 76 20 Q66 16 60 22 Q54 16 44 20 Z" />
      </g>
    </svg>
  );
}

/** Sarasvatī — seated on a lotus, veena held across the lap */
export function SarasvatiIdol(props: SVGProps<SVGSVGElement>) {
  const id = "brass-sarasvati";
  return (
    <svg {...SHARED_DEFS_PROPS} {...props}>
      <Aura id={id} />
      <g fill={`url(#${id})`}>
        <circle cx="60" cy="30" r="14" />
        <path d="M60 12 Q68 4 74 10 Q68 10 64 16 Z" />
        <path d="M42 56 Q36 88 44 116 Q60 130 76 116 Q84 88 78 56 Q60 46 42 56 Z" />
        <path d="M20 108 Q46 118 60 112 Q74 118 100 108 Q76 128 60 122 Q44 128 20 108 Z" />
        <path d="M18 96 Q40 88 60 100 Q80 88 102 96 Q98 102 84 100 Q92 108 90 114 Q76 104 60 106 Q44 104 30 114 Q28 108 36 100 Q22 102 18 96 Z" />
        <path d="M40 138 Q60 150 80 138 Q60 158 40 138 Z" />
      </g>
    </svg>
  );
}

/** Lakṣmī — standing on a lotus, coins spilling from an open palm */
export function LakshmiIdol(props: SVGProps<SVGSVGElement>) {
  const id = "brass-lakshmi";
  return (
    <svg {...SHARED_DEFS_PROPS} {...props}>
      <Aura id={id} />
      <g fill={`url(#${id})`}>
        <circle cx="60" cy="28" r="14" />
        <path d="M60 10 Q68 0 76 8 Q68 8 64 14 Z" />
        <path d="M42 54 Q36 92 46 126 Q60 138 74 126 Q84 92 78 54 Q60 44 42 54 Z" />
        <path d="M18 66 Q30 60 42 68 Q30 74 22 84 Z" />
        <path d="M102 66 Q90 60 78 68 Q90 74 98 84 Z" />
        <circle cx="20" cy="88" r="4" />
        <circle cx="30" cy="96" r="3.5" />
        <circle cx="14" cy="98" r="3" />
        <path d="M34 140 Q60 152 86 140 Q60 160 34 140 Z" />
      </g>
    </svg>
  );
}

/** Viṣṇu — four-armed, holding conch, chakra, gada and lotus */
export function VishnuIdol(props: SVGProps<SVGSVGElement>) {
  const id = "brass-vishnu";
  return (
    <svg {...SHARED_DEFS_PROPS} {...props}>
      <Aura id={id} />
      <g fill={`url(#${id})`}>
        <circle cx="60" cy="28" r="14" />
        <path d="M46 12 Q60 -2 74 12 Q60 8 60 16 Q60 8 46 12 Z" />
        <path d="M44 54 Q38 92 48 128 Q60 138 72 128 Q82 92 76 54 Q60 45 44 54 Z" />
        <path d="M32 60 Q18 54 12 40 Q22 48 34 52 Z" />
        <circle cx="10" cy="36" r="6" />
        <path d="M88 60 Q102 54 108 40 Q98 48 86 52 Z" />
        <circle cx="110" cy="36" r="7" fill="none" stroke={`url(#${id})`} strokeWidth="4" />
        <path d="M30 90 Q16 96 10 110 Q22 104 34 100 Z" />
        <rect x="4" y="106" width="10" height="20" rx="3" />
        <path d="M90 90 Q104 96 110 110 Q98 104 86 100 Z" />
        <path d="M104 108 Q112 116 104 128 Q108 116 98 112 Q108 112 104 108 Z" />
        <path d="M38 138 Q60 150 82 138 Q60 158 38 138 Z" />
      </g>
    </svg>
  );
}

/** Rāma — standing archer, bow drawn, quiver at the back */
export function RamaIdol(props: SVGProps<SVGSVGElement>) {
  const id = "brass-rama";
  return (
    <svg {...SHARED_DEFS_PROPS} {...props}>
      <Aura id={id} />
      <g fill={`url(#${id})`}>
        <circle cx="58" cy="28" r="13" />
        <path d="M50 14 Q58 2 66 12 Q60 10 56 16 Z" />
        <path d="M44 52 Q40 90 48 124 Q58 134 68 124 Q76 90 72 52 Q58 44 44 52 Z" />
        <path
          d="M84 40 Q104 60 96 96 Q92 112 78 118"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path d="M84 40 L78 118" stroke={`url(#${id})`} strokeWidth="1.6" fill="none" />
        <path d="M30 62 Q46 66 58 60 Q54 74 40 76 Z" />
        <path d="M34 140 Q58 152 82 140 Q58 158 34 140 Z" />
      </g>
    </svg>
  );
}

/** Rādhā–Kṛṣṇa — two figures standing side by side, entwined */
export function RadhaKrishnaIdol(props: SVGProps<SVGSVGElement>) {
  const id = "brass-radhakrishna";
  return (
    <svg {...SHARED_DEFS_PROPS} {...props}>
      <Aura id={id} />
      <g fill={`url(#${id})`}>
        <circle cx="46" cy="30" r="12" />
        <path d="M46 32 Q28 40 34 30 Q40 26 46 32 Z" />
        <path d="M32 56 Q28 90 36 124 Q46 134 56 124 Q62 90 58 56 Q46 48 32 56 Z" />
        <circle cx="76" cy="26" r="13" />
        <path d="M76 10 Q84 -2 90 6 Q84 6 80 12 Z" />
        <path d="M62 52 Q58 90 66 126 Q76 136 86 126 Q94 90 90 52 Q76 44 62 52 Z" />
        <path d="M56 74 Q60 84 68 78" fill="none" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" />
        <path d="M30 136 Q60 150 90 136 Q60 158 30 136 Z" />
      </g>
    </svg>
  );
}
