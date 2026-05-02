"use client";

import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: string;
  children?: ReactNode;
  demoLabel?: string;
}

export function CodeBlock({ title, code, language = "tsx", children, demoLabel = "実際の見た目 →" }: CodeBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden border mb-4" style={{ borderColor: "#2d3048" }}>
      {title && (
        <div className="flex items-center gap-3 px-4 py-2.5" style={{ backgroundColor: "#1e2130" }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(239,68,68,0.8)" }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(234,179,8,0.8)" }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.8)" }} />
          </div>
          <span className="text-xs text-gray-400 font-mono">{title}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "#0d1117",
          fontSize: "13px",
          lineHeight: "1.7",
          padding: "20px",
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
      {children && (
        <div className="border-t px-5 py-4" style={{ borderColor: "#2d3048", backgroundColor: "#1a1d2a" }}>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">{demoLabel}</span>
            <div className="flex items-center gap-3 flex-wrap">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
