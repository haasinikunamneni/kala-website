interface PattaBorderProps {
  className?: string;
  color?: string;
}

/**
 * A continuous vine-and-dot border motif referencing the painted borders
 * traditional to Pattachitra scrolls. Used as the site's signature device:
 * framing the hero, painting cards, and section dividers.
 */
export function PattaBorder({ className = "", color = "#B6905A" }: PattaBorderProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line x1="0" y1="4" x2="400" y2="4" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="0" y1="20" x2="400" y2="20" stroke={color} strokeWidth="1" opacity="0.6" />
      {Array.from({ length: 33 }).map((_, i) => (
        <circle key={i} cx={6 + i * 12} cy="12" r="1.6" fill={color} opacity="0.7" />
      ))}
    </svg>
  );
}

/** Small corner flourish, placed at the four corners of framed elements. */
export function PattaCorner({ className = "", color = "#B6905A" }: PattaBorderProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M2 2 Q2 20 20 20 Q2 20 2 38"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.8"
      />
      <circle cx="2" cy="2" r="2" fill={color} />
    </svg>
  );
}
