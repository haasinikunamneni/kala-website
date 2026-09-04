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
        <p className="font-body text-xs uppercase tracking-widest2 text-terracotta">{eyebrow}</p>
      )}
      <h2 className={`mt-3 font-display text-4xl leading-tight text-charcoal md:text-5xl`}>{title}</h2>
      <div className={`mt-4 h-px w-16 bg-gold ${isCenter ? "mx-auto" : ""}`} />
      {description && (
        <p className={`mt-5 max-w-xl font-body text-[15px] leading-relaxed text-charcoal/70 ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
