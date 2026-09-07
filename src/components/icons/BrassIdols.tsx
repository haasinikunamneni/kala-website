import type { SVGProps } from "react";

/**
 * Brass idol icon set for the "Discover the Collection" homepage section.
 *
 * Design language shared across all eight icons, deliberately kept uniform:
 * - No facial detail — heads are simplified ovals, the way weathered stone or
 *   cast-brass temple reliefs read from a distance rather than close-up.
 * - Single warm brass gradient fill + a thin darker brass stroke for edge
 *   definition (reads like relief carving, not a flat icon).
 * - Same viewBox (0 0 120 160) and roughly the same visual weight/height so
 *   the set feels like one family of objects, not eight unrelated icons.
 * - Attributes (flute, veena, discus, bow, trunk, etc.) are the only thing
 *   that differs between figures — that's what makes each recognizable.
 */

const BRASS_STOPS = (
  <>
    <stop offset="0%" stopColor="#E8CB93" />
    <stop offset="55%" stopColor="#BB9569" />
    <stop offset="100%" stopColor="#8A6432" />
  </>
);

function IdolShell({
  id,
  children,
  ...props
}: SVGProps<SVGSVGElement> & { id: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id={id} x1="20" y1="10" x2="100" y2="150" gradientUnits="userSpaceOnUse">
          {BRASS_STOPS}
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`} stroke="#6E4E28" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {children}
      </g>
    </svg>
  );
}

export function KrishnaIdol(props: SVGProps<SVGSVGElement>) {
  return (
    <IdolShell id="brass-krishna" {...props}>
      {/* peacock feather */}
      <path d="M62 14 C66 8 70 6 71 11 C72 15 67 17 62 14 Z" />
      <circle cx="70.5" cy="10.5" r="1.6" fill="#6E4E28" stroke="none" />
      {/* head */}
      <ellipse cx="58" cy="30" rx="11" ry="12.5" />
      {/* crown band */}
      <path d="M47 24 Q58 17 69 24" strokeWidth="2" fill="none" />
      {/* tribhanga body, hip-shifted */}
      <path d="M50 41 C40 55 46 70 40 88 C36 104 46 118 58 122 C70 118 78 104 74 88 C70 72 78 55 66 41 C60 46 56 46 50 41 Z" />
      {/* raised arm to flute */}
      <path d="M50 46 C40 44 32 40 26 34" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M22 31 L34 40" strokeWidth="3" fill="none" />
      {/* resting arm */}
      <path d="M68 50 C76 58 78 68 74 78" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* base */}
      <ellipse cx="58" cy="132" rx="16" ry="5.5" opacity="0.9" />
    </IdolShell>
  );
}

export function GanapatiIdol(props: SVGProps<SVGSVGElement>) {
  return (
    <IdolShell id="brass-ganapati" {...props}>
      {/* ears */}
      <circle cx="40" cy="34" r="12" />
      <circle cx="80" cy="34" r="12" />
      {/* head */}
      <ellipse cx="60" cy="36" rx="18" ry="16" />
      {/* trunk */}
      <path d="M55 46 C50 58 62 62 56 72 C52 79 58 84 64 80" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* tusk */}
      <path d="M68 46 L74 50" strokeWidth="2.5" fill="none" />
      {/* seated wide body */}
      <path d="M38 58 C30 78 32 100 42 116 C50 126 70 126 78 116 C88 100 90 78 82 58 C74 66 46 66 38 58 Z" />
      {/* base */}
      <ellipse cx="60" cy="128" rx="24" ry="6" opacity="0.9" />
    </IdolShell>
  );
}

export function JagannathaIdol(props: SVGProps<SVGSVGElement>) {
  return (
    <IdolShell id="brass-jagannatha" {...props}>
      {/* halo arch */}
      <path d="M34 40 Q60 14 86 40" strokeWidth="2.5" fill="none" />
      {/* iconic stump form */}
      <path d="M36 46 C34 70 34 96 40 116 C44 128 76 128 80 116 C86 96 86 70 84 46 C84 38 36 38 36 46 Z" />
      {/* big round eyes */}
      <circle cx="50" cy="58" r="8.5" fill="#F7E7D9" stroke="#6E4E28" />
      <circle cx="70" cy="58" r="8.5" fill="#F7E7D9" stroke="#6E4E28" />
      <circle cx="50" cy="58" r="3.2" fill="#6E4E28" stroke="none" />
      <circle cx="70" cy="58" r="3.2" fill="#6E4E28" stroke="none" />
      {/* stub arms */}
      <ellipse cx="30" cy="78" rx="7" ry="14" />
      <ellipse cx="90" cy="78" rx="7" ry="14" />
      {/* base */}
      <ellipse cx="60" cy="132" rx="18" ry="5.5" opacity="0.9" />
    </IdolShell>
  );
}

export function SarasvatiIdol(props: SVGProps<SVGSVGElement>) {
  return (
    <IdolShell id="brass-sarasvati" {...props}>
      {/* head */}
      <ellipse cx="58" cy="28" rx="10.5" ry="12" />
      {/* seated body */}
      <path d="M46 38 C38 52 40 70 38 86 C36 100 46 112 58 112 C70 112 80 100 78 86 C76 70 78 52 70 38 C64 43 52 43 46 38 Z" />
      {/* veena neck */}
      <path d="M30 46 L84 78" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* veena resonator */}
      <ellipse cx="86" cy="82" rx="9" ry="14" transform="rotate(28 86 82)" />
      <ellipse cx="27" cy="43" rx="5.5" ry="8" transform="rotate(28 27 43)" />
      {/* lotus base petals */}
      <path d="M38 112 Q58 122 78 112 Q58 128 38 112 Z" opacity="0.9" />
    </IdolShell>
  );
}

export function LakshmiIdol(props: SVGProps<SVGSVGElement>) {
  return (
    <IdolShell id="brass-lakshmi" {...props}>
      {/* head */}
      <ellipse cx="60" cy="28" rx="10.5" ry="12" />
      {/* seated body */}
      <path d="M48 38 C40 52 42 70 40 86 C38 100 48 112 60 112 C72 112 82 100 80 86 C78 70 80 52 72 38 C66 43 54 43 48 38 Z" />
      {/* upper hands with lotus buds */}
      <path d="M46 44 C38 40 32 34 30 26" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M74 44 C82 40 88 34 90 26" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="28" cy="21" r="5.5" />
      <circle cx="92" cy="21" r="5.5" />
      {/* lotus seat */}
      <path d="M36 108 Q60 122 84 108 Q60 132 36 108 Z" opacity="0.9" />
    </IdolShell>
  );
}

export function VishnuIdol(props: SVGProps<SVGSVGElement>) {
  return (
    <IdolShell id="brass-vishnu" {...props}>
      {/* tall crown */}
      <path d="M52 16 L58 2 L64 16 Z" />
      {/* head */}
      <ellipse cx="58" cy="27" rx="10.5" ry="12" />
      {/* standing body, four-armed silhouette */}
      <path d="M48 39 C42 54 46 70 42 88 C39 104 48 118 58 121 C68 118 77 104 74 88 C70 70 74 54 68 39 C62 44 54 44 48 39 Z" />
      {/* four attribute arms as small stubs with symbols */}
      <path d="M46 46 C38 44 32 40 27 34" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M70 46 C78 44 84 40 89 34" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M44 58 C35 60 28 64 22 70" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M72 58 C81 60 88 64 94 70" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* discus */}
      <circle cx="21" cy="27" r="6" fill="none" strokeWidth="2.5" />
      {/* conch */}
      <path d="M92 26 C97 28 98 34 93 37 C89 39 85 35 87 30 Z" />
      {/* mace */}
      <path d="M17 74 L17 90" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="17" cy="72" r="4.5" />
      {/* lotus */}
      <circle cx="98" cy="73" r="5.5" />
      {/* base */}
      <ellipse cx="58" cy="131" rx="16" ry="5.5" opacity="0.9" />
    </IdolShell>
  );
}

export function RamaIdol(props: SVGProps<SVGSVGElement>) {
  return (
    <IdolShell id="brass-rama" {...props}>
      {/* crown */}
      <path d="M50 18 L58 6 L66 18 Z" />
      {/* head */}
      <ellipse cx="58" cy="29" rx="10.5" ry="12" />
      {/* standing body */}
      <path d="M49 41 C43 55 47 71 43 88 C40 103 49 117 58 120 C67 117 76 103 73 88 C69 71 73 55 67 41 C61 46 55 46 49 41 Z" />
      {/* bow arm */}
      <path d="M44 48 C34 50 26 56 20 66" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* bow arc */}
      <path d="M14 40 Q2 66 14 92" strokeWidth="3" fill="none" />
      {/* string */}
      <path d="M14 40 L14 92" strokeWidth="1.4" fill="none" />
      {/* drawing arm + arrow */}
      <path d="M70 50 C80 54 88 60 92 68" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M52 66 L92 68" strokeWidth="1.6" fill="none" />
      {/* base */}
      <ellipse cx="58" cy="130" rx="16" ry="5.5" opacity="0.9" />
    </IdolShell>
  );
}

export function RadhaKrishnaIdol(props: SVGProps<SVGSVGElement>) {
  return (
    <IdolShell id="brass-radhakrishna" {...props}>
      {/* Radha — shorter, hand raised gracefully */}
      <ellipse cx="34" cy="34" rx="9" ry="10.5" />
      <path d="M24 44 C18 56 21 70 18 84 C16 96 24 108 34 110 C44 108 50 96 48 84 C46 72 50 58 44 44 C39 48 29 48 24 44 Z" />
      <path d="M44 50 C50 46 55 42 57 36" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      {/* Krishna — taller, flute raised, slightly behind/right */}
      <path d="M74 14 C78 9 82 8 82 12 C82 16 78 17 74 14 Z" />
      <ellipse cx="76" cy="30" rx="10.5" ry="12" />
      <path d="M65 41 C58 54 62 70 57 88 C54 102 63 116 76 119 C88 116 96 102 92 88 C88 70 92 54 85 41 C79 46 71 46 65 41 Z" />
      <path d="M64 46 C54 44 47 40 41 34" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M37 31 L48 40" strokeWidth="2.6" fill="none" />
      {/* shared base */}
      <ellipse cx="55" cy="122" rx="26" ry="6" opacity="0.9" />
    </IdolShell>
  );
}
