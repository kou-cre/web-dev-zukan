import type { DrillQuestion } from "@/components/PageDrill";

export const colorQuestions: DrillQuestion[] = [
  {
    id: "color-q1",
    question: "色の三属性に含まれないのは？",
    choices: ["色相（Hue）", "彩度（Saturation）", "明度（Lightness）", "温度（Temperature）"],
    correctIndex: 3,
    explanation:
      "色の三属性は色相・彩度・明度（HSL）。「暖色・寒色」という温度感は色相から派生した概念で、独立した属性ではない。",
  },
  {
    id: "color-q2",
    question: "60-30-10の法則の「10」は何の比率？",
    choices: ["ベースカラー", "メインカラー", "アクセントカラー", "文字色"],
    correctIndex: 2,
    explanation:
      "60%がベース（背景・大きな面）、30%がメイン（主要なコンポーネント）、10%がアクセント（CTAボタン・重要情報）。アクセントは少ないからこそ目立つ。",
  },
  {
    id: "color-q3",
    question: "WCAGで本文（通常サイズ文字）に求められるコントラスト比の最低基準は？",
    choices: ["2.0:1", "3.0:1", "4.5:1", "7.0:1"],
    correctIndex: 2,
    explanation:
      "WCAG AAレベルでは本文4.5:1以上、大きな文字（18pt以上または14pt太字以上）は3:1以上が必要。7:1はAAAレベル（より厳格）の基準。4.5:1を覚えておけばまず破綻しない。",
  },
  {
    id: "color-q4",
    question: "「危険・エラー」を伝える色として一般的に使われるのは？",
    choices: ["青", "緑", "赤", "黄"],
    correctIndex: 2,
    explanation:
      "赤=エラー/危険、緑=成功、黄=警告、青=情報、というのが世界共通の慣習。これに反する配色（成功を赤にするなど）は誤読を招くので避ける。",
  },
  {
    id: "color-q5",
    question: "配色を破綻させやすい行為はどれ？",
    choices: [
      "グレーを多用してまとめる",
      "鮮やかな色（彩度の高い色）を3色以上同時に使う",
      "色相を1〜2色に固定する",
      "60-30-10のルールを守る",
    ],
    correctIndex: 1,
    explanation:
      "鮮やかな色を3色以上並べると視線が分散して情報の優先順位が消える。アクセントは1色に絞り、ベース・メインは彩度を抑えるのが基本。",
  },
];
