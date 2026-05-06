import type { DrillQuestion } from "@/components/PageDrill";

export const diagnoseQuestions: DrillQuestion[] = [
  {
    id: "diagnose-q1",
    question: "UI診断の最初のステップは？",
    choices: [
      "色を確認する",
      "目を細めて骨格を見る",
      "フォントを数える",
      "コードを読む",
    ],
    correctIndex: 1,
    explanation:
      "まず目を細めて装飾を消し、骨格（整列・余白の取り方）が成立しているかを見る。ここがズレていると、色やフォントをいじっても良くならない。",
  },
  {
    id: "diagnose-q2",
    question: "AIスロップの典型症状は？",
    choices: [
      "余白が一定すぎる",
      "余白が全くない",
      "文字が極端に大きい",
      "色が一切ない",
    ],
    correctIndex: 0,
    explanation:
      "AIが作るUIは「余白がきれいに一定」になりがち。結果、見出しと本文の階層が消えて「全部同じ重み」に見える。階層を作るには余白の差を意図的に付ける必要がある。",
  },
  {
    id: "diagnose-q3",
    question: "修正のコスパが最も高いのは？",
    choices: [
      "整列を直す",
      "全部の色を変える",
      "フォントファミリーを変える",
      "画像を入れ替える",
    ],
    correctIndex: 0,
    explanation:
      "整列の修正は変更コストが低く、見た目の改善幅が大きい。色やフォントは影響範囲が広く、整列が崩れている画面ではどれだけ整えてもノイズに見える。",
  },
  {
    id: "diagnose-q4",
    question: "「なんか変」で止めずにやるべきことは？",
    choices: [
      "諦める",
      "原則の言葉に翻訳する",
      "すぐ全部作り直す",
      "AIにそのまま投げる",
    ],
    correctIndex: 1,
    explanation:
      "「なんか変」は感覚。ここで止めず「整列が崩れている」「対比が弱い」のように4原則の言葉に翻訳すると、修正の手が動く。診断とは感覚を言葉にする作業のこと。",
  },
  {
    id: "diagnose-q5",
    question: "UI診断で最後に行うステップは？",
    choices: [
      "骨格を見る",
      "4原則チェック",
      "優先順位をつけて直す",
      "色と余白チェック",
    ],
    correctIndex: 2,
    explanation:
      "骨格 → 4原則 → 色と余白、と観点を切り替えて問題を洗い出した後、最後に「コスパの高い順」に優先順位をつけて直す。全部直そうとせず、効く順に手を入れる。",
  },
];
