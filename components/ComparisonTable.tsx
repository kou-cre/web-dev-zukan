interface ComparisonTableProps {
  headers: string[];
  rows: {
    label: string;
    cells: string[];
    highlightCol?: number;
  }[];
  note?: string;
}

export function ComparisonTable({ headers, rows, note }: ComparisonTableProps) {
  return (
    <section className="mb-10">
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#2d3048" }}>
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
      {note && (
        <p className="text-xs text-gray-500 mt-3 px-1">{note}</p>
      )}
    </section>
  );
}
