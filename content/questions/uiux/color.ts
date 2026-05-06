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

export const colorAdvancedQuestions: DrillQuestion[] = [
  {
    id: "color-adv-q1",
    level: "advanced",
    question: "WCAGのAAレベルを満たすために、通常サイズのテキスト（18px未満）に必要なコントラスト比はどれ？",
    choices: [
      "2:1以上",
      "3:1以上",
      "4.5:1以上",
      "7:1以上（AAA）",
    ],
    correctIndex: 2,
    explanation: "WCAG AAレベルの要件: 通常テキスト（18px/14pxbold未満）は4.5:1以上、大きいテキスト（18px以上/14pxbold以上）は3:1以上。AAA（最高基準）は7:1以上。開発者ツールやアクセシビリティチェッカーで確認できる。",
  },
  {
    id: "color-adv-q2",
    level: "advanced",
    question: "ブランドカラー（Primary色）を決めるとき、HSLで色相（H）を固定して明度（L）を変えることで作るのは何？",
    choices: [
      "色覚異常対応のカラーパレット",
      "インタラクション状態（hover/active/disabled）用のカラーバリエーション",
      "補色（反対色）のパレット",
      "WCAG準拠のグレースケール変換",
    ],
    correctIndex: 1,
    explanation: "例えばH=220（青）を固定して、L=30%(Dark) / 50%(Base) / 70%(Light) / 90%(Tint) を作るとhover時に暗くする・disabled時に薄くするなどの状態変化が一貫したトーンで表現できる。同じ色相で明度だけ変えるのがカラーシステム設計の基本。",
  },
  {
    id: "color-adv-q3",
    level: "advanced",
    question: "「60-30-10の法則」で「10」に当たる色の役割として最も適切なのはどれ？",
    choices: [
      "背景色。最も広い面積を占める落ち着いた色",
      "テキストや補助要素の色。ベースカラーとのコントラストを担う",
      "アクセント。CTAボタン・バッジ・ハイライトなど視線を引き付ける要素に使う",
      "ボーダーやセパレーターなどの区切り線に使う色",
    ],
    correctIndex: 2,
    explanation: "60（背景） / 30（テキスト・補助） / 10（アクセント）。アクセント色（10%）はCTAボタン・通知バッジ・ハイライトなど「注目させたい」場所に限定して使う。多用すると「どこを見ればいいか」が分からなくなる。",
  },
  {
    id: "color-adv-q4",
    level: "advanced",
    question: "HSLでS（彩度）を0%にすると、どのような色になる？",
    choices: [
      "純粋な白（#ffffff）になる",
      "色相Hに関わらず、グレースケール（無彩色）になる",
      "純粋な黒（#000000）になる",
      "補色（反対の色相）になる",
    ],
    correctIndex: 1,
    explanation: "彩度(S)=0%にすると色の「鮮やかさ」がゼロになり、白〜グレー〜黒の無彩色になる。明度(L)によって白(L=100%)〜グレー(L=50%)〜黒(L=0%)の範囲で変わる。これを使うとブランドカラーと統一感のあるグレーパレットを作れる。",
  },
];
