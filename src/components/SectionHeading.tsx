interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="font-body text-fluid-eyebrow uppercase tracking-widest2 text-terracotta">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-fluid-h2 leading-tight text-charcoal">{title}</h2>
      <div className={`mt-4 h-px w-16 bg-gold ${isCenter ? "mx-auto" : ""}`} />
      {description && (
        <p className={`mt-5 max-w-xl font-body text-fluid-body text-charcoal/70 ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
