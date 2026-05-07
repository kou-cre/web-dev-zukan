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
    sky: {
      border: "border-sky-500",
      text: "text-sky-400",
      badge: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    },
    rose: {
      border: "border-rose-500",
      text: "text-rose-400",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    },
    yellow: {
      border: "border-yellow-500",
      text: "text-yellow-400",
      badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    },
    amber: {
      border: "border-amber-500",
      text: "text-amber-400",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    lime: {
      border: "border-lime-500",
      text: "text-lime-400",
      badge: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    },
    cyan: {
      border: "border-cyan-500",
      text: "text-cyan-400",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    },
    orange: {
      border: "border-orange-500",
      text: "text-orange-400",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    },
    red: {
      border: "border-red-500",
      text: "text-red-400",
      badge: "bg-red-500/10 text-red-400 border-red-500/30",
    },
    green: {
      border: "border-green-500",
      text: "text-green-400",
      badge: "bg-green-500/10 text-green-400 border-green-500/30",
    },
    pink: {
      border: "border-pink-500",
      text: "text-pink-400",
      badge: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    },
    fuchsia: {
      border: "border-fuchsia-500",
      text: "text-fuchsia-400",
      badge: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
    },
    slate: {
      border: "border-slate-500",
      text: "text-slate-300",
      badge: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    },
    stone: {
      border: "border-stone-500",
      text: "text-stone-400",
      badge: "bg-stone-500/10 text-stone-400 border-stone-500/30",
    },
    indigo: {
      border: "border-indigo-500",
      text: "text-indigo-400",
      badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    },
    teal: {
      border: "border-teal-500",
      text: "text-teal-400",
      badge: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    },
    purple: {
      border: "border-purple-500",
      text: "text-purple-400",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
    "#4f85c8": {
      border: "border-blue-400",
      text: "text-blue-300",
      badge: "bg-blue-400/10 text-blue-300 border-blue-400/30",
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
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
      <p className={`text-lg font-medium mb-2 ${colors.text}`}>{subtitle}</p>
      {body && <p className="text-sm text-gray-400">{body}</p>}
    </section>
  );
}
