import { ChevronDown } from "lucide-react";

interface ComparisonTableProps {
  headers: string[];
  rows: {
    label: string;
    cells: string[];
    highlightCol?: number;
  }[];
  highlightCol?: number;
  note?: string;
}

export function ComparisonTable({ headers, rows, highlightCol, note }: ComparisonTableProps) {
  return (
    <section className="mb-10">
      {/* デスクトップ: md以上でテーブル表示 */}
      <div className="hidden md:block overflow-x-auto rounded-xl border" style={{ borderColor: "#2d3048" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#1a1d2a", borderBottom: "1px solid #2d3048" }}>
              <th className="text-left px-4 py-3 text-gray-400 font-medium w-28">観点</th>
              {headers.map((h, i) => (
                <th key={i} className="text-left px-4 py-3 text-gray-300 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  backgroundColor: ri % 2 === 0 ? "#0f1117" : "#1a1d2a",
                  borderBottom: "1px solid #2d3048",
                }}
              >
                <td className="px-4 py-3 text-xs font-semibold text-gray-400 align-top">{row.label}</td>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-3 text-xs align-top leading-relaxed ${
                      row.highlightCol === ci ? "text-emerald-300 font-medium" : "text-gray-300"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* モバイル: md未満でアコーディオン表示 */}
      <div className="md:hidden flex flex-col gap-3">
        {headers.map((header, colIndex) => (
          <details
            key={colIndex}
            open={highlightCol === colIndex}
            className="rounded-xl border group"
            style={{ borderColor: "#2d3048", backgroundColor: "#1a1d2a" }}
          >
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none select-none">
              <span
                className={`text-sm font-semibold ${
                  highlightCol === colIndex ? "text-emerald-300" : "text-gray-200"
                }`}
              >
                {header}
              </span>
              <ChevronDown
                size={16}
                className="text-gray-400 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <dl
              className="px-4 pb-4 pt-1 flex flex-col gap-3"
              style={{ borderTop: "1px solid #2d3048" }}
            >
              {rows.map((row, ri) => (
                <div key={ri}>
                  <dt className="text-xs text-gray-400 mb-0.5">{row.label}</dt>
                  <dd
                    className={`text-xs leading-relaxed ${
                      row.highlightCol === colIndex
                        ? "text-emerald-300 font-medium"
                        : "text-gray-300"
                    }`}
                  >
                    {row.cells[colIndex] ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>

      {note && (
        <p className="text-xs text-gray-500 mt-3 px-1">{note}</p>
      )}
    </section>
  );
}
