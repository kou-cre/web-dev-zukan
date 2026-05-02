import { X, Check, Info } from "lucide-react";

interface CorrectionCardProps {
  misconception: string;
  correction: string;
  reason?: string;
}

export function CorrectionCard({ misconception, correction, reason }: CorrectionCardProps) {
  return (
    <div className="rounded-xl border overflow-hidden mb-4" style={{ borderColor: "#2d3048" }}>
      <div
        className="px-5 py-4 border-b"
        style={{
          backgroundColor: "rgba(239,68,68,0.07)",
          borderColor: "rgba(239,68,68,0.25)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">よくある誤解</span>
        </div>
        <p className="text-base text-red-200 leading-relaxed">{misconception}</p>
      </div>
      <div
        className="px-5 py-4"
        style={{ backgroundColor: "rgba(16,185,129,0.05)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">正確には</span>
        </div>
        <p className="text-base text-emerald-100 leading-relaxed">{correction}</p>
        {reason && (
          <div
            className="flex items-start gap-2 mt-3 pt-3 border-t"
            style={{ borderColor: "rgba(16,185,129,0.15)" }}
          >
            <Info className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-400 leading-relaxed">{reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}
