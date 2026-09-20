import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CategoryCard({ to, icon: Icon, title, description }: CategoryCardProps) {
  return (
    <Link
      to={to}
      className="group flex flex-col justify-between rounded-sm border border-charcoal/10 bg-ivory p-8 transition-all duration-500 hover:border-gold/60 hover:shadow-lg focus-ring"
    >
      <div>
        <Icon className="h-7 w-7 text-gold" strokeWidth={1.25} />
        <h3 className="mt-6 font-display text-2xl text-charcoal">{title}</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/65">{description}</p>
      </div>
      <span className="mt-8 inline-flex items-center font-body text-xs uppercase tracking-widest2 text-terracotta transition-transform duration-300 group-hover:translate-x-1">
        Explore →
      </span>
    </Link>
  );
}
