import Link from "next/link";
import { Cloud, Triangle, Database, Server, Flame, Smartphone, Rocket, Code2, LucideProps } from "lucide-react";
import { ElementType } from "react";

const iconMap: Record<string, ElementType<LucideProps>> = {
  Cloud,
  Triangle,
  Database,
  Server,
  Flame,
  Smartphone,
  Rocket,
  Code2,
};

interface RelatedLinkItem {
  href: string;
  title: string;
  description: string;
  icon: string;
}

interface RelatedLinksProps {
  items: RelatedLinkItem[];
}

export function RelatedLinks({ items }: RelatedLinksProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
        RELATED PAGES
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Server;
          return (
            <Link
              key={i}
              href={item.href}
              className="group rounded-xl border p-4 transition-colors hover:border-emerald-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors mb-3" />
              <p className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 leading-tight">{item.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
