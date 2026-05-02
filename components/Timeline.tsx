const dotColors: Record<string, { dot: string; year: string; label: string }> = {
  gray:    { dot: "#4b5563", year: "#6b7280",  label: "#9ca3af"  },
  emerald: { dot: "#34d399", year: "#34d399",  label: "#6ee7b7"  },
  blue:    { dot: "#60a5fa", year: "#60a5fa",  label: "#93c5fd"  },
  violet:  { dot: "#a78bfa", year: "#a78bfa",  label: "#c4b5fd"  },
  amber:   { dot: "#fbbf24", year: "#fbbf24",  label: "#fcd34d"  },
  rose:    { dot: "#fb7185", year: "#fb7185",  label: "#fda4af"  },
  cyan:    { dot: "#22d3ee", year: "#22d3ee",  label: "#67e8f9"  },
  orange:  { dot: "#fb923c", year: "#fb923c",  label: "#fdba74"  },
  sky:     { dot: "#38bdf8", year: "#38bdf8",  label: "#7dd3fc"  },
};

export interface TimelineItem {
  year: string;
  label: string;
  description: string;
  accentColor?: keyof typeof dotColors;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative mb-4 pl-8">
      <div
        className="absolute left-[7px] top-2 bottom-2 w-px"
        style={{ backgroundColor: "#2d3048" }}
      />
      <div className="space-y-0">
        {items.map((item, i) => {
          const c = dotColors[item.accentColor ?? "gray"];
          return (
            <div key={i} className="relative pb-6 last:pb-0">
              <div
                className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full border-2"
                style={{ backgroundColor: "#0f1117", borderColor: c.dot }}
              />
              <div className="flex items-baseline gap-2.5 mb-1">
                <span className="text-xs font-mono font-bold flex-shrink-0" style={{ color: c.year }}>
                  {item.year}
                </span>
                <span className="text-sm font-semibold" style={{ color: c.label }}>
                  {item.label}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
