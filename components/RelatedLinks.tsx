import Link from "next/link";
import { Cloud, Triangle, Database, Server, Flame, Smartphone, Rocket, Code2, LayoutGrid, Stethoscope, Eye, Palette, Type, MousePointerClick, Sparkles, Tag, FileSearch, Accessibility, Gauge, Search, Shield, LucideProps } from "lucide-react";
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
  LayoutGrid,
  Stethoscope,
  Eye,
  Palette,
  Type,
  MousePointerClick,
  Sparkles,
  Tag,
  FileSearch,
  Accessibility,
  Gauge,
  Search,
  Shield,
};

interface RelatedLinkItem {
  href: string;
  title: string;
  description: string;
  icon: string;
}

interface RelatedLinksGroup {
  label: string;
  items: RelatedLinkItem[];
}

interface RelatedLinksProps {
  items?: RelatedLinkItem[];
  groups?: RelatedLinksGroup[];
}

function LinkCard({ item }: { item: RelatedLinkItem }) {
  const Icon = iconMap[item.icon] ?? Server;
  return (
    <Link
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
}

export function RelatedLinks({ items, groups }: RelatedLinksProps) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
        RELATED PAGES
      </h2>
      {groups ? (
        <div className="space-y-6">
          {groups.map((group, gi) => (
            <div key={gi}>
              <p className="text-xs text-gray-500 mb-2">{group.label}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {group.items.map((item, i) => (
                  <LinkCard key={i} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(items ?? []).map((item, i) => (
            <LinkCard key={i} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
