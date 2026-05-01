import { Lightbulb, Quote } from "lucide-react";

interface MetaphorPoint {
  label: string;
  real: string;
  metaphor: string;
}

interface OnePageSummaryProps {
  keyMessage: string;
  metaphorTitle: string;
  metaphorPoints: MetaphorPoint[];
  definition: string;
}

export function OnePageSummary({ keyMessage, metaphorTitle, metaphorPoints, definition }: OnePageSummaryProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
        ONE PAGE SUMMARY
      </h2>

      {/* Key message */}
      <div
        className="rounded-xl border p-5 mb-4"
        style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
      >
        <p className="text-base text-gray-300 leading-relaxed">{keyMessage}</p>
      </div>

      {/* Metaphor */}
      <div
        className="rounded-xl border p-5 mb-4"
        style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Quote className="w-4 h-4 text-amber-400" />
          <p className="text-xs font-semibold text-amber-400">{metaphorTitle}</p>
        </div>
        <div className="space-y-0 divide-y" style={{ borderColor: "#2d3048" }}>
          {metaphorPoints.map((point, i) => (
            <div key={i} className="py-2">
              {/* mobile: stacked */}
              <div className="flex items-start gap-2 sm:hidden">
                <span className="text-gray-600 font-mono font-bold w-4 flex-shrink-0 pt-0.5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-300 block leading-relaxed">{point.real}</span>
                  <span className="text-amber-300 font-medium">＝ {point.metaphor}</span>
                </div>
              </div>
              {/* desktop: 4-column grid */}
              <div className="hidden sm:grid sm:grid-cols-[1.5rem_1fr_auto_1fr] sm:items-center sm:gap-2">
                <span className="text-center text-gray-600 font-mono font-bold">{i + 1}</span>
                <span className="text-gray-300">{point.real}</span>
                <span className="text-gray-600">=</span>
                <span className="text-amber-300 font-medium">{point.metaphor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* One-line definition */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-emerald-400" />
          <p className="text-xs font-semibold text-emerald-400">一言定義</p>
        </div>
        <p className="text-base font-medium text-white leading-relaxed">{definition}</p>
      </div>
    </section>
  );
}
