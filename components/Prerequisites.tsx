import { CheckCircle2, BookOpen, ArrowRight } from "lucide-react";

interface PrerequisitesProps {
  learn: string[];
  prerequisites: string[];
  outOfScope: string[];
}

export function Prerequisites({ learn, prerequisites, outOfScope }: PrerequisitesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: "#1a1d2a", borderColor: "rgba(34,197,94,0.4)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
          <p className="text-xs font-semibold text-green-300">このページで分かること</p>
        </div>
        <ul className="space-y-2">
          {learn.map((item, i) => (
            <li key={i} className="text-xs text-gray-300 leading-relaxed flex gap-2">
              <span className="text-green-500 flex-shrink-0 mt-0.5">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: "#1a1d2a", borderColor: "rgba(59,130,246,0.4)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <p className="text-xs font-semibold text-blue-300">前提として知っておくこと</p>
        </div>
        <ul className="space-y-2">
          {prerequisites.map((item, i) => (
            <li key={i} className="text-xs text-gray-300 leading-relaxed flex gap-2">
              <span className="text-blue-500 flex-shrink-0 mt-0.5">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: "#1a1d2a", borderColor: "rgba(107,114,128,0.4)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <p className="text-xs font-semibold text-gray-400">
            応用編で扱うこと（1周目は飛ばしてOK）
          </p>
        </div>
        <ul className="space-y-2">
          {outOfScope.map((item, i) => (
            <li key={i} className="text-xs text-gray-500 leading-relaxed flex gap-2">
              <span className="flex-shrink-0 mt-0.5">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
