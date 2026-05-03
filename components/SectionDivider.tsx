interface SectionDividerProps {
  message?: string;
  note?: string;
}

export function SectionDivider({
  message = "ここから応用編 — 1周目は飛ばしてOK",
  note,
}: SectionDividerProps) {
  return (
    <div className="my-12">
      <div className="flex items-center gap-4">
        <div
          className="flex-1 border-t border-dashed"
          style={{ borderColor: "rgba(245,158,11,0.3)" }}
        />
        <div
          className="rounded-full border px-4 py-2 text-xs whitespace-nowrap"
          style={{
            borderColor: "rgba(245,158,11,0.4)",
            backgroundColor: "rgba(245,158,11,0.05)",
            color: "#fcd34d",
          }}
        >
          {message}
        </div>
        <div
          className="flex-1 border-t border-dashed"
          style={{ borderColor: "rgba(245,158,11,0.3)" }}
        />
      </div>
      {note && (
        <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">{note}</p>
      )}
    </div>
  );
}
