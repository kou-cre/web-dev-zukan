import { ReactNode, ElementType } from "react";
import { ArrowRight, ArrowDown, ArrowLeft, LucideProps } from "lucide-react";

const accentMap: Record<string, { border: string; bg: string; titleColor: string; iconColor: string }> = {
  emerald: { border: "rgba(16,185,129,0.6)",  bg: "rgba(16,185,129,0.06)",  titleColor: "#6ee7b7", iconColor: "#34d399" },
  blue:    { border: "rgba(59,130,246,0.6)",  bg: "rgba(59,130,246,0.06)",  titleColor: "#93c5fd", iconColor: "#60a5fa" },
  violet:  { border: "rgba(139,92,246,0.6)",  bg: "rgba(139,92,246,0.06)",  titleColor: "#c4b5fd", iconColor: "#a78bfa" },
  sky:     { border: "rgba(14,165,233,0.6)",  bg: "rgba(14,165,233,0.06)",  titleColor: "#7dd3fc", iconColor: "#38bdf8" },
  rose:    { border: "rgba(244,63,94,0.6)",   bg: "rgba(244,63,94,0.06)",   titleColor: "#fda4af", iconColor: "#fb7185" },
  yellow:  { border: "rgba(234,179,8,0.7)",   bg: "rgba(234,179,8,0.10)",   titleColor: "#fde047", iconColor: "#facc15" },
  amber:   { border: "rgba(245,158,11,0.7)",  bg: "rgba(245,158,11,0.10)",  titleColor: "#fcd34d", iconColor: "#fbbf24" },
  lime:    { border: "rgba(132,204,22,0.7)",  bg: "rgba(132,204,22,0.10)",  titleColor: "#bef264", iconColor: "#a3e635" },
  cyan:    { border: "rgba(6,182,212,0.6)",   bg: "rgba(6,182,212,0.06)",   titleColor: "#67e8f9", iconColor: "#22d3ee" },
  orange:  { border: "rgba(249,115,22,0.6)",  bg: "rgba(249,115,22,0.06)",  titleColor: "#fdba74", iconColor: "#fb923c" },
  red:     { border: "rgba(239,68,68,0.6)",   bg: "rgba(239,68,68,0.06)",   titleColor: "#fca5a5", iconColor: "#f87171" },
};

interface ConceptDiagramProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ConceptDiagram({ title, description, children }: ConceptDiagramProps) {
  return (
    <div
      className="rounded-xl border p-5 mb-6"
      style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
    >
      {description && <p className="text-sm text-gray-400 mb-5">{description}</p>}
      {children}
    </div>
  );
}

// ── Flow diagram components ──────────────────────────────────────

interface FlowCardProps {
  Icon: ElementType<LucideProps>;
  title: string;
  subtitle: string;
  highlight?: boolean;
  muted?: boolean;
  accentColor?: string;
}

export function FlowCard({ Icon, title, subtitle, highlight, muted, accentColor = "emerald" }: FlowCardProps) {
  const accent = accentMap[accentColor] ?? accentMap.emerald;
  return (
    <div
      className={`rounded-xl border px-4 py-3 flex flex-col items-center text-center min-w-[120px] max-w-[160px] transition-all ${muted && !highlight ? "opacity-60" : ""}`}
      style={
        highlight
          ? { borderColor: accent.border, backgroundColor: accent.bg }
          : { backgroundColor: "#0f1117", borderColor: "#2d3048" }
      }
    >
      <Icon
        className="w-6 h-6 mb-2"
        style={highlight ? { color: accent.iconColor } : { color: "#9ca3af" }}
      />
      <p
        className="text-xs font-bold mb-0.5"
        style={highlight ? { color: accent.titleColor } : { color: "#ffffff" }}
      >
        {title}
      </p>
      <p className="text-xs text-gray-400 leading-tight">{subtitle}</p>
    </div>
  );
}

interface FlowArrowProps {
  label: string;
  sublabel?: string;
  direction?: "right" | "left" | "down";
}

export function FlowArrow({ label, sublabel, direction = "right" }: FlowArrowProps) {
  const isVertical = direction === "down";

  return (
    <div className="flex flex-col items-center gap-0.5 px-1 py-1">
      <span className="text-xs text-gray-400 text-center leading-tight whitespace-nowrap">{label}</span>
      {sublabel && (
        <span className="text-xs font-mono text-gray-400 text-center">{sublabel}</span>
      )}
      {isVertical ? (
        <ArrowDown className="w-4 h-4 text-gray-400" />
      ) : (
        <>
          <ArrowDown className="w-4 h-4 text-gray-400 sm:hidden" />
          {direction === "right" ? (
            <ArrowRight className="w-4 h-4 text-gray-400 hidden sm:block" />
          ) : (
            <ArrowLeft className="w-4 h-4 text-gray-400 hidden sm:block" />
          )}
        </>
      )}
    </div>
  );
}

// ── Layered stack (for server internals) ────────────────────────

interface StackLayerProps {
  Icon: ElementType<LucideProps>;
  title: string;
  subtitle: string;
  iconColor?: string;
  showArrow?: boolean;
}

export function StackLayer({ Icon, title, subtitle, iconColor = "text-emerald-400", showArrow = true }: StackLayerProps) {
  return (
    <div className="flex flex-col">
      <div
        className="flex items-start gap-3 rounded-lg border px-4 py-3"
        style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
        <div>
          <p className="text-xs font-semibold text-white">{title}</p>
          <p className="text-xs text-gray-400 leading-tight mt-0.5">{subtitle}</p>
        </div>
      </div>
      {showArrow && (
        <div className="flex justify-center py-1">
          <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
        </div>
      )}
    </div>
  );
}

// ── Contrast bar (for abstraction levels) ───────────────────────

interface ContrastBarProps {
  rows: {
    label: string;
    sublabel?: string;
    Icon: ElementType<LucideProps>;
    yourPct: number;
    cloudPct: number;
    highlight?: boolean;
  }[];
}

export function ContrastBar({ rows }: ContrastBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-400 mb-1 px-1">
        <span>あなたが管理</span>
        <span>クラウドが管理</span>
      </div>
      {rows.map((row, i) => (
        <div key={i} className={`rounded-lg border p-3 ${row.highlight ? "border-emerald-500/40 bg-emerald-500/5" : ""}`}
          style={!row.highlight ? { borderColor: "#2d3048" } : {}}>
          <div className="flex items-center gap-2 mb-2">
            <row.Icon className={`w-4 h-4 flex-shrink-0 ${row.highlight ? "text-emerald-400" : "text-gray-400"}`} />
            <span className={`text-xs font-semibold ${row.highlight ? "text-emerald-300" : "text-gray-300"}`}>
              {row.label}
            </span>
            {row.sublabel && (
              <span className="text-xs text-gray-500">{row.sublabel}</span>
            )}
            {row.highlight && (
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                推奨
              </span>
            )}
          </div>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            <div
              className="rounded-l-full transition-all"
              style={{
                width: `${row.yourPct}%`,
                backgroundColor: row.highlight ? "rgba(16,185,129,0.3)" : "rgba(156,163,175,0.25)",
              }}
            />
            <div
              className="rounded-r-full transition-all"
              style={{
                width: `${row.cloudPct}%`,
                backgroundColor: "rgba(75,85,99,0.2)",
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1 px-0.5">
            <span>{row.yourPct}%</span>
            <span>{row.cloudPct}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
