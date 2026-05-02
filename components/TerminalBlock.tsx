interface TerminalLine {
  type: "command" | "output" | "error" | "success" | "comment";
  text: string;
}

interface TerminalBlockProps {
  title?: string;
  lines: TerminalLine[];
}

export function TerminalBlock({ title = "Terminal", lines }: TerminalBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden border mb-4" style={{ borderColor: "#2d3048" }}>
      <div className="flex items-center gap-3 px-4 py-2.5" style={{ backgroundColor: "#1e2130" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(239,68,68,0.8)" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(234,179,8,0.8)" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.8)" }} />
        </div>
        <span className="text-xs text-gray-400 font-mono">{title}</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed" style={{ backgroundColor: "#0d1117" }}>
        {lines.map((line, i) => {
          if (line.type === "command") {
            return (
              <div key={i} className="flex items-start gap-2 mb-1">
                <span style={{ color: "#34d399" }}>$</span>
                <span className="text-gray-200">{line.text}</span>
              </div>
            );
          }
          if (line.type === "output") {
            return <p key={i} className="text-gray-400 mb-1 pl-4">{line.text}</p>;
          }
          if (line.type === "error") {
            return <p key={i} className="mb-1 pl-4" style={{ color: "#f87171" }}>{line.text}</p>;
          }
          if (line.type === "success") {
            return <p key={i} className="mb-1 pl-4" style={{ color: "#34d399" }}>{line.text}</p>;
          }
          if (line.type === "comment") {
            return <p key={i} className="mb-1 pl-4" style={{ color: "#4b5563" }}>{line.text}</p>;
          }
          return null;
        })}
      </div>
    </div>
  );
}
