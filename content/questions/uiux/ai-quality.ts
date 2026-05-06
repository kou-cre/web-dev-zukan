import type { DrillQuestion } from "@/components/PageDrill";

export const aiQualityQuestions: DrillQuestion[] = [
  {
    id: "ai-quality-q1",
    question: "AIに良いUIを作らせるコツは？",
    choices: [
      "雰囲気で頼む",
      "制約を具体的に渡す",
      "何度もリテイクする",
      "プロンプトなしで任せる",
    ],
    correctIndex: 1,
    explanation:
      "「いい感じに」では曖昧すぎる。「12カラム / Primary1個 / 余白8の倍数 / コントラスト4.5:1」のように、判定可能な制約を渡すとAIの出力品質が安定する。",
  },
  {
    id: "ai-quality-q2",
    question: "AI出力の検収で使う物差しは？",
    choices: [
      "流行のデザイントレンド",
      "10原則・WCAG・4原則",
      "個人の好み",
      "競合のUI",
    ],
    correctIndex: 1,
    explanation:
      "ニールセン10原則・WCAG・4大原則の3つは「検収のための物差し」になる。トレンドや好みは時期で変わるが、原則は変わらない。AIの新人デザイナーをベテランの目で検収する。",
  },
  {
    id: "ai-quality-q3",
    question: "AIが特に落としがちなニールセン原則は？",
    choices: [
      "色使い",
      "エラー予防・認識より想起",
      "フォントサイズ",
      "画像の配置",
    ],
    correctIndex: 1,
    explanation:
      "AIは「とりあえず動く画面」を作るのは得意だが、「事前にエラーを防ぐ」「ユーザーが覚えなくて済むように選択肢を見せる」といった配慮は落としがち。ここは人が補う。",
  },
  {
    id: "ai-quality-q4",
    question: "ダークパターンの典型例は？",
    choices: [
      "退会動線が異常に深い",
      "大きなボタン",
      "派手な色",
      "余白が多め",
    ],
    correctIndex: 0,
    explanation:
      "退会動線をわざと深くする、同意チェックを最初からONにするなど、ユーザーを騙す設計をダークパターンと呼ぶ。短期的に得をしても長期で信用を失う。倫理は最後の品質。",
  },
  {
    id: "ai-quality-q5",
    question: "WCAGの本文コントラストの最低基準は？",
    choices: ["2.0:1", "3.0:1", "4.5:1", "7.0:1"],
    correctIndex: 2,
    explanation:
      "WCAG 2.1 AA で、本文（小さい文字）は4.5:1以上が必須。大きな文字は3.0:1まで緩和されるが、まず4.5:1を基準にしておけば事故は起きにくい。",
  },
];
