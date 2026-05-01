"use client";

import { useState, useEffect } from "react";
import { Trophy, ThumbsUp, Dumbbell, GraduationCap, Check, X } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];

  function handleSelect(i: number) {
    if (submitted) return;
    setSelectedIndex(i);
  }

  function handleSubmit() {
    if (selectedIndex === null) return;
    setResults((prev) => [...prev, selectedIndex === current.correctIndex]);
    setSubmitted(true);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setSubmitted(false);
    } else {
      setFinished(true);
    }
  }

  function handleReset() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setSubmitted(false);
    setResults([]);
    setFinished(false);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (submitted) return;
      const key = e.key.toUpperCase();
      const labelMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
      if (key in labelMap) {
        const index = labelMap[key];
        if (index < current.choices.length) {
          setSelectedIndex(index);
        }
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [submitted, current, selectedIndex]);

  if (finished) {
    const score = results.filter(Boolean).length;
    return (
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">DRILL</h2>
        <div className="rounded-xl border p-6 text-center" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
          <div className="flex justify-center mb-3">
            {score === questions.length
              ? <Trophy className="w-10 h-10 text-yellow-400" />
              : score >= questions.length / 2
              ? <ThumbsUp className="w-10 h-10 text-blue-400" />
              : <Dumbbell className="w-10 h-10 text-orange-400" />}
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

        <p className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-300" style={{ backgroundColor: "#1e2130", border: "1px solid #4b5280" }}>A</kbd>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-300" style={{ backgroundColor: "#1e2130", border: "1px solid #4b5280" }}>B</kbd>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-300" style={{ backgroundColor: "#1e2130", border: "1px solid #4b5280" }}>C</kbd>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-300" style={{ backgroundColor: "#1e2130", border: "1px solid #4b5280" }}>D</kbd>
          <span>で選択 /</span>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-300" style={{ backgroundColor: "#1e2130", border: "1px solid #4b5280" }}>Enter</kbd>
          <span>で回答</span>
        </p>

        <div className="space-y-2 mb-4">
          {current.choices.map((choice, i) => {
            const label = ["A", "B", "C", "D"][i];
            let borderColor = "#2d3048";
            let bgColor = "#0f1117";
            let textColor = "#e5e7eb";

            if (submitted) {
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
              borderColor = "#e5e7eb";
              bgColor = "#1e2130";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={submitted}
                className="w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors flex items-start gap-2"
                style={{ borderColor, backgroundColor: bgColor, color: textColor }}
              >
                <span className="font-mono font-bold text-xs w-4 flex-shrink-0 mt-0.5">{label}</span>
                <span className="leading-relaxed">{choice}</span>
              </button>
            );
          })}
        </div>

        {!submitted && (
          <>
            <button
              onClick={handleSubmit}
              disabled={selectedIndex === null}
              className="w-full py-2 rounded-lg text-sm font-medium transition-colors mb-1"
              style={{
                backgroundColor: selectedIndex !== null ? "#10b981" : "#1a1d2a",
                color: selectedIndex !== null ? "#0f1117" : "#9ca3af",
                border: "1px solid",
                borderColor: selectedIndex !== null ? "#10b981" : "#2d3048",
                cursor: selectedIndex !== null ? "pointer" : "not-allowed",
              }}
            >
              回答する
            </button>
            {selectedIndex === null && (
              <p className="text-xs text-gray-500 text-center mt-1.5">選択肢を選んでから回答してください</p>
            )}
          </>
        )}

        {submitted && (
          <div
            className="rounded-lg p-4 mb-4 border"
            style={{
              backgroundColor: selectedIndex === current.correctIndex ? "#052e16" : "#1c0a0a",
              borderColor: selectedIndex === current.correctIndex ? "#10b981" : "#ef4444",
            }}
          >
            <p className="text-xs font-semibold mb-1"
              style={{ color: selectedIndex === current.correctIndex ? "#10b981" : "#ef4444" }}>
              {selectedIndex === current.correctIndex ? (
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> 正解！
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5" /> 不正解
                </span>
              )}
            </p>
            <p className="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              マスターのワンポイント
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">{current.explanation}</p>
          </div>
        )}

        {submitted && (
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
