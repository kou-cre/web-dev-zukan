interface Term {
  word: string;
  definition: string;
}

interface TermNoteProps {
  terms: Term[];
}

export function TermNote({ terms }: TermNoteProps) {
  return (
    <div
      className="rounded-lg border p-4 mb-5"
      style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
    >
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        この図に出てくる言葉
      </p>
      <dl className="space-y-3">
        {terms.map(({ word, definition }) => (
          <div key={word} className="flex gap-3">
            <dt className="text-sm font-semibold text-yellow-300 font-mono whitespace-nowrap flex-shrink-0 w-32">
              {word}
            </dt>
            <dd className="text-sm text-gray-400 leading-relaxed">{definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
