import { Fragment } from "react";
import { ArrowDown, ArrowRight, Lightbulb, Quote } from "lucide-react";

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

      {/* Key message — 全体像を一言で */}
      <div
        className="rounded-xl border p-5 mb-4"
        style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
      >
        <p className="text-sm text-gray-300 leading-relaxed">{keyMessage}</p>
      </div>

      {/* Metaphor — ストーリーフロー */}
      <div
        className="rounded-xl border p-5 mb-4"
        style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Quote className="w-4 h-4 text-amber-400" />
          <p className="text-xs font-semibold text-amber-400">{metaphorTitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          {metaphorPoints.map((point, i) => (
            <Fragment key={i}>
              <div
                className="flex-1 rounded-lg border p-3 flex flex-col gap-2 min-w-0"
                style={{ backgroundColor: "#0f1117", borderColor: "#3b3f5c" }}
              >
                <span className="text-[10px] font-mono font-bold text-gray-500">{i + 1}</span>
                <p className="text-sm sm:text-xs text-gray-300 leading-relaxed flex-1">{point.real}</p>
                <span
                  className="self-start text-[11px] font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: "rgba(245,158,11,0.12)",
                    borderColor: "rgba(245,158,11,0.35)",
                    color: "#fcd34d",
                  }}
                >
                  {point.metaphor}
                </span>
              </div>
              {i < metaphorPoints.length - 1 && (
                <div className="flex items-center justify-center py-2 sm:py-0 sm:px-1.5 flex-shrink-0">
                  <ArrowDown className="w-3.5 h-3.5 text-gray-400 sm:hidden" />
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* One-line definition — 全体像の結晶 */}
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
