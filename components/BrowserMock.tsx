import { ReactNode } from "react";

interface BrowserMockProps {
  url?: string;
  children: ReactNode;
}

export function BrowserMock({ url = "example.com", children }: BrowserMockProps) {
  return (
    <div className="rounded-xl overflow-hidden border mb-4" style={{ borderColor: "#2d3048" }}>
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b"
        style={{ backgroundColor: "#1e2130", borderColor: "#2d3048" }}
      >
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(239,68,68,0.7)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(234,179,8,0.7)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.7)" }} />
        </div>
        <div
          className="flex-1 px-3 py-0.5 rounded-full text-xs text-gray-500 font-mono flex items-center gap-1.5"
          style={{ backgroundColor: "#0f1117", border: "1px solid #2d3048" }}
        >
          <span className="text-gray-600">🔒</span>
          <span>{url}</span>
        </div>
      </div>
      <div style={{ backgroundColor: "#0f1117" }}>
        {children}
      </div>
    </div>
  );
}
