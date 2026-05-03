import Image from "next/image";

export type MajiEmotion = "standard" | "doubt" | "question" | "surprised" | "worried";
export type MasterEmotion = "standard" | "explain" | "thinking";

export interface DialogueTurn {
  speaker: "maji" | "master";
  text: string;
  emotion?: MajiEmotion | MasterEmotion;
}

interface MajiDialogueProps {
  turns: DialogueTurn[];
}

function getImageSrc(speaker: "maji" | "master", emotion?: MajiEmotion | MasterEmotion): string {
  if (speaker === "maji") {
    const e = (emotion as MajiEmotion) ?? "standard";
    return `/characters/maji-${e}.png`;
  } else {
    const e = (emotion as MasterEmotion) ?? "standard";
    return `/characters/master-${e}.png`;
  }
}

function renderText(text: string) {
  return text.split("\n").map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split("`").map((part, pi) =>
        pi % 2 === 0 ? (
          <span key={pi}>{part}</span>
        ) : (
          <code
            key={pi}
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{ backgroundColor: "#0f1117", color: "#34d399" }}
          >
            {part}
          </code>
        )
      )}
    </span>
  ));
}

export function MajiDialogue({ turns }: MajiDialogueProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
        DIALOGUE
      </h2>
      <div className="space-y-5">
        {turns.map((turn, i) => {
          const isMaji = turn.speaker === "maji";
          const imgSrc = getImageSrc(turn.speaker, turn.emotion);
          const name = isMaji ? "マジくん" : "マスター";

          return (
            <div
              key={i}
              className={`flex items-end gap-3 ${isMaji ? "" : "flex-row-reverse"}`}
            >
              {/* Character image */}
              <div className="flex-shrink-0 flex flex-col items-center gap-1">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: isMaji ? "#1e3a5f" : "#1a2e1e" }}
                >
                  <Image
                    src={imgSrc}
                    alt={name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: isMaji ? "#60a5fa" : "#34d399" }}
                >
                  {name}
                </span>
              </div>

              {/* Bubble */}
              <div className="flex-1 max-w-[82%]">
                <div
                  className="rounded-2xl px-4 py-3 text-sm text-gray-200 leading-relaxed"
                  style={{
                    backgroundColor: isMaji ? "#1a1d2a" : "#1a2e20",
                    border: `1px solid ${isMaji ? "#2d3048" : "#1e4a30"}`,
                    borderBottomLeftRadius: isMaji ? "4px" : undefined,
                    borderBottomRightRadius: isMaji ? undefined : "4px",
                  }}
                >
                  {renderText(turn.text)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
