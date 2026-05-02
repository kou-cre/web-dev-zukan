const statColors: Record<string, string> = {
  emerald: "#34d399",
  blue:    "#60a5fa",
  violet:  "#a78bfa",
  amber:   "#fbbf24",
  rose:    "#fb7185",
  cyan:    "#22d3ee",
  orange:  "#fb923c",
  sky:     "#38bdf8",
  lime:    "#a3e635",
  red:     "#f87171",
  yellow:  "#facc15",
};

export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
  accentColor?: keyof typeof statColors;
}

interface StatCardsProps {
  items: StatItem[];
  cols?: 2 | 3 | 4;
}

export function StatCards({ items, cols = 3 }: StatCardsProps) {
  const colClass: Record<number, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };
  return (
    <div className={`grid ${colClass[cols]} gap-4 mb-4`}>
      {items.map((item, i) => {
        const color = statColors[item.accentColor ?? "blue"] ?? statColors.blue;
        return (
          <div
            key={i}
            className="rounded-xl border p-5 text-center"
            style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
          >
            <p className="text-3xl font-black mb-1.5 leading-none" style={{ color }}>
              {item.value}
            </p>
            <p className="text-sm text-gray-300 font-medium">{item.label}</p>
            {item.sublabel && (
              <p className="text-xs text-gray-500 mt-0.5">{item.sublabel}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
