import { PattaCorner } from "./ornaments/PattaBorder";

interface PlaceholderArtworkProps {
  title: string;
  artForm: string;
  palette: [string, string, string];
  className?: string;
  seed?: number;
}

/** Deterministic pseudo-random generator so each painting gets a stable motif. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function PlaceholderArtwork({ title, palette, className = "", seed = 1 }: PlaceholderArtworkProps) {
  const rand = mulberry32(seed * 7919);
  const [base, mid, accent] = palette;
  const rings = Array.from({ length: 5 }).map((_, i) => ({
    r: 18 + i * 16 + rand() * 4,
    dash: rand() > 0.5,
  }));
  const petals = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <div className={`relative overflow-hidden bg-beige ${className}`}>
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="500" fill={base} opacity="0.12" />
        <rect x="14" y="14" width="372" height="472" fill="none" stroke={mid} strokeWidth="1" opacity="0.5" />
        <g transform="translate(200,210)">
          {rings.map((ring, i) => (
            <circle
              key={i}
              r={ring.r}
              fill="none"
              stroke={i % 2 === 0 ? mid : accent}
              strokeWidth={i === rings.length - 1 ? 1.5 : 1}
              strokeDasharray={ring.dash ? "2 4" : undefined}
              opacity={0.55 - i * 0.06}
            />
          ))}
          {petals.map((i) => {
            const angle = (i / petals.length) * Math.PI * 2;
            const x = Math.cos(angle) * 70;
            const y = Math.sin(angle) * 70;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="10"
                ry="22"
                fill={accent}
                opacity="0.35"
                transform={`rotate(${(angle * 180) / Math.PI + 90}, ${x}, ${y})`}
              />
            );
          })}
          <circle r="14" fill={mid} opacity="0.65" />
        </g>
        <text
          x="200"
          y="430"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="20"
          fill={base}
          opacity="0.75"
        >
          {title}
        </text>
      </svg>
      <PattaCorner color={mid} className="absolute left-1 top-1 h-6 w-6 rotate-0" />
      <PattaCorner color={mid} className="absolute right-1 top-1 h-6 w-6 -scale-x-100" />
      <PattaCorner color={mid} className="absolute bottom-1 left-1 h-6 w-6 -scale-y-100" />
      <PattaCorner color={mid} className="absolute bottom-1 right-1 h-6 w-6 -scale-x-100 -scale-y-100" />
    </div>
  );
}
