import { ElementType, ReactNode } from "react";
import { LucideProps } from "lucide-react";

const accentMap: Record<string, { bg: string; border: string; icon: string; label: string }> = {
  emerald: { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  icon: "#34d399", label: "#6ee7b7" },
  blue:    { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.25)",  icon: "#60a5fa", label: "#93c5fd" },
  violet:  { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.25)",  icon: "#a78bfa", label: "#c4b5fd" },
  amber:   { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  icon: "#fbbf24", label: "#fcd34d" },
  rose:    { bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.25)",   icon: "#fb7185", label: "#fda4af" },
  cyan:    { bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.25)",   icon: "#22d3ee", label: "#67e8f9" },
  orange:  { bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.25)",  icon: "#fb923c", label: "#fdba74" },
  sky:     { bg: "rgba(14,165,233,0.08)",  border: "rgba(14,165,233,0.25)",  icon: "#38bdf8", label: "#7dd3fc" },
  lime:    { bg: "rgba(132,204,22,0.08)",  border: "rgba(132,204,22,0.25)",  icon: "#a3e635", label: "#bef264" },
  red:     { bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.25)",   icon: "#f87171", label: "#fca5a5" },
  yellow:  { bg: "rgba(234,179,8,0.08)",   border: "rgba(234,179,8,0.25)",   icon: "#facc15", label: "#fde047" },
};

export interface UseCaseItem {
  Icon: ElementType<LucideProps>;
  title: string;
  subtitle?: string;
  description: string;
  accentColor?: keyof typeof accentMap;
  visual?: ReactNode;
}

interface UseCaseGridProps {
  items: UseCaseItem[];
  cols?: 2 | 3;
}

export function UseCaseGrid({ items, cols = 2 }: UseCaseGridProps) {
  const gridClass = cols === 3
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2";
  return (
    <div className={`grid ${gridClass} gap-4 mb-4`}>
      {items.map((item, i) => {
        const accent = accentMap[item.accentColor ?? "blue"];
        return (
          <div
            key={i}
            className="rounded-xl border p-4 flex flex-col gap-3"
            style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
          >
            {item.visual && (
              <div
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: "#0f1117", border: "1px solid #2d3048" }}
              >
                {item.visual}
              </div>
            )}
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: accent.bg, border: `1px solid ${accent.border}` }}
              >
                <item.Icon className="w-[18px] h-[18px]" style={{ color: accent.icon }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-0.5">{item.title}</p>
                {item.subtitle && (
                  <p className="text-xs mb-1" style={{ color: accent.label }}>{item.subtitle}</p>
                )}
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
