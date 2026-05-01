import { ReactNode } from "react";
import { Lightbulb, AlertTriangle } from "lucide-react";

interface DetailSectionProps {
  title: string;
  children: ReactNode;
}

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
        DETAIL
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

interface DetailBlockProps {
  heading: string;
  children: ReactNode;
}

export function DetailBlock({ heading, children }: DetailBlockProps) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
    >
      <h3 className="text-base font-semibold text-white mb-3">{heading}</h3>
      <div className="text-base text-gray-300 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export function KeyPoint({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-base text-amber-300">
      <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

export function WarningPoint({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-base text-red-300">
      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}
