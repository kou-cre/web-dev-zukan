const colorMap: Record<string, {
  border: string; bg: string; label: string;
  itemBg: string; itemBorder: string; itemText: string;
}> = {
  blue:    { border: "rgba(59,130,246,0.45)",  bg: "rgba(59,130,246,0.06)",  label: "#93c5fd", itemBg: "rgba(59,130,246,0.14)",  itemBorder: "rgba(59,130,246,0.35)",  itemText: "#bfdbfe" },
  violet:  { border: "rgba(139,92,246,0.45)",  bg: "rgba(139,92,246,0.06)",  label: "#c4b5fd", itemBg: "rgba(139,92,246,0.14)",  itemBorder: "rgba(139,92,246,0.35)",  itemText: "#ddd6fe" },
  emerald: { border: "rgba(16,185,129,0.45)",  bg: "rgba(16,185,129,0.06)",  label: "#6ee7b7", itemBg: "rgba(16,185,129,0.14)",  itemBorder: "rgba(16,185,129,0.35)",  itemText: "#a7f3d0" },
  amber:   { border: "rgba(245,158,11,0.5)",   bg: "rgba(245,158,11,0.06)",  label: "#fcd34d", itemBg: "rgba(245,158,11,0.14)",  itemBorder: "rgba(245,158,11,0.40)",  itemText: "#fde68a" },
  rose:    { border: "rgba(244,63,94,0.45)",   bg: "rgba(244,63,94,0.06)",   label: "#fda4af", itemBg: "rgba(244,63,94,0.14)",   itemBorder: "rgba(244,63,94,0.35)",   itemText: "#fecdd3" },
  sky:     { border: "rgba(14,165,233,0.45)",  bg: "rgba(14,165,233,0.06)",  label: "#7dd3fc", itemBg: "rgba(14,165,233,0.14)",  itemBorder: "rgba(14,165,233,0.35)",  itemText: "#bae6fd" },
  cyan:    { border: "rgba(6,182,212,0.45)",   bg: "rgba(6,182,212,0.06)",   label: "#67e8f9", itemBg: "rgba(6,182,212,0.14)",   itemBorder: "rgba(6,182,212,0.35)",   itemText: "#a5f3fc" },
  orange:  { border: "rgba(249,115,22,0.45)",  bg: "rgba(249,115,22,0.06)",  label: "#fdba74", itemBg: "rgba(249,115,22,0.14)",  itemBorder: "rgba(249,115,22,0.35)",  itemText: "#fed7aa" },
  gray:    { border: "rgba(107,114,128,0.35)", bg: "rgba(107,114,128,0.05)", label: "#9ca3af", itemBg: "rgba(107,114,128,0.12)", itemBorder: "rgba(107,114,128,0.30)", itemText: "#d1d5db" },
};

export interface NestedLeaf {
  text: string;
  sub?: string;
}

export interface NestedGroup {
  label: string;
  sublabel?: string;
  items: NestedLeaf[];
  accentColor?: keyof typeof colorMap;
}

export interface NestedDiagramProps {
  label: string;
  sublabel?: string;
  groups: NestedGroup[];
  caption?: string;
  accentColor?: keyof typeof colorMap;
}

export function NestedDiagram({
  label,
  sublabel,
  groups,
  caption,
  accentColor = "blue",
}: NestedDiagramProps) {
  const outer = colorMap[accentColor] ?? colorMap.blue;

  return (
    <div className="mb-4">
      <div
        className="rounded-xl p-4"
        style={{ border: `1px solid ${outer.border}`, backgroundColor: outer.bg }}
      >
        <p className="text-xs font-bold mb-3" style={{ color: outer.label }}>
          {label}
          {sublabel && (
            <span className="font-normal text-gray-500 ml-1">（{sublabel}）</span>
          )}
        </p>

        <div className="space-y-2">
          {groups.map((group, i) => {
            const inner = colorMap[group.accentColor ?? "gray"];
            return (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{ border: `1px solid ${inner.border}`, backgroundColor: inner.bg }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: inner.label }}>
                  {group.label}
                  {group.sublabel && (
                    <span className="font-normal text-gray-500 ml-1">（{group.sublabel}）</span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <div
                      key={j}
                      className="rounded-md px-2.5 py-1.5 text-center"
                      style={{ backgroundColor: inner.itemBg, border: `1px solid ${inner.itemBorder}` }}
                    >
                      <p className="text-xs font-medium" style={{ color: inner.itemText }}>
                        {item.text}
                      </p>
                      {item.sub && (
                        <p className="text-[10px] text-gray-500 mt-0.5">{item.sub}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {caption && (
        <p className="text-xs text-gray-500 text-center mt-2">{caption}</p>
      )}
    </div>
  );
}
