interface HeroProps {
  category: string;
  title: string;
  subtitle: string;
  body?: string;
  accentColor?: string;
}

export function Hero({ category, title, subtitle, body, accentColor = "emerald" }: HeroProps) {
  const accentMap: Record<string, { border: string; text: string; badge: string }> = {
    emerald: {
      border: "border-emerald-500",
      text: "text-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    blue: {
      border: "border-blue-500",
      text: "text-blue-400",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    violet: {
      border: "border-violet-500",
      text: "text-violet-400",
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    },
  };

  const colors = accentMap[accentColor] ?? accentMap.emerald;

  return (
    <section className={`border-l-4 ${colors.border} pl-6 py-8 mb-10`}>
      <span
        className={`inline-block text-xs font-medium px-2 py-0.5 rounded border mb-3 ${colors.badge}`}
      >
        {category}
      </span>
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className={`text-lg font-medium mb-2 ${colors.text}`}>{subtitle}</p>
      {body && <p className="text-sm text-gray-400">{body}</p>}
    </section>
  );
}
