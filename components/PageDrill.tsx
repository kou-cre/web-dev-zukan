"use client";

import { useState } from "react";

export interface DrillQuestion {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

interface PageDrillProps {
  questions: DrillQuestion[];
}

export function PageDrill({ questions }: PageDrillProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];
  const isAnswered = selectedIndex !== null;

  function handleSelect(i: number) {
    if (isAnswered) return;
    setSelectedIndex(i);
    setResults((prev) => [...prev, i === current.correctIndex]);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
    } else {
      setFinished(true);
    }
  }

  function handleReset() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setResults([]);
    setFinished(false);
  }

  if (finished) {
    const score = results.filter(Boolean).length;
    return (
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">DRILL</h2>
        <div className="rounded-xl border p-6 text-center" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
          <div className="text-4xl mb-3">
            {score === questions.length ? "🎉" : score >= questions.length / 2 ? "👍" : "💪"}
          </div>
          <p className="text-xl font-bold text-white mb-1">
            {score} / {questions.length} 正解
          </p>
          <p className="text-sm text-gray-400 mb-5">
            {score === questions.length
              ? "完璧！このページの内容はバッチリ。"
              : score >= questions.length / 2
              ? "いい調子。もう一度読み返すとより定着します。"
              : "もう一度ページを読んでから再挑戦してみましょう。"}
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: "#10b981", color: "#0f1117" }}
          >
            もう一度
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">DRILL</h2>
      <div className="rounded-xl border p-5" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500">
            Q{currentIndex + 1} / {questions.length}
          </span>
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    i < results.length
                      ? results[i]
                        ? "#10b981"
                        : "#ef4444"
                      : i === currentIndex
                      ? "#6b7280"
                      : "#374151",
                }}
              />
            ))}
          </div>
        </div>

        <p className="text-sm font-medium text-white mb-4 leading-relaxed">{current.question}</p>

        <div className="space-y-2 mb-4">
          {current.choices.map((choice, i) => {
            const label = ["A", "B", "C", "D"][i];
            let borderColor = "#2d3048";
            let bgColor = "#0f1117";
            let textColor = "#e5e7eb";

            if (isAnswered) {
              if (i === current.correctIndex) {
                borderColor = "#10b981";
                bgColor = "#052e16";
                textColor = "#34d399";
              } else if (i === selectedIndex) {
                borderColor = "#ef4444";
                bgColor = "#1c0a0a";
                textColor = "#fca5a5";
              } else {
                textColor = "#6b7280";
              }
            } else if (selectedIndex === i) {
              borderColor = "#6b7280";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className="w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors flex items-start gap-2"
                style={{ borderColor, backgroundColor: bgColor, color: textColor }}
              >
                <span className="font-mono font-bold text-xs w-4 flex-shrink-0 mt-0.5">{label}</span>
                <span className="leading-relaxed">{choice}</span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            className="rounded-lg p-4 mb-4 border"
            style={{
              backgroundColor: selectedIndex === current.correctIndex ? "#052e16" : "#1c0a0a",
              borderColor: selectedIndex === current.correctIndex ? "#10b981" : "#ef4444",
            }}
          >
            <p className="text-xs font-semibold mb-1"
              style={{ color: selectedIndex === current.correctIndex ? "#10b981" : "#ef4444" }}>
              {selectedIndex === current.correctIndex ? "✓ 正解！" : "✗ 不正解"}
            </p>
            <p className="text-xs font-semibold text-amber-400 mb-1">🧙 マスターのワンポイント</p>
            <p className="text-xs text-gray-300 leading-relaxed">{current.explanation}</p>
          </div>
        )}

        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: "#10b981", color: "#0f1117" }}
          >
            {currentIndex < questions.length - 1 ? "次の問題へ →" : "結果を見る"}
          </button>
        )}
      </div>
    </section>
  );
}
