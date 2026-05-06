import type { DrillQuestion } from "@/components/PageDrill";

export const principlesQuestions: DrillQuestion[] = [
  {
    id: "principles-q1",
    question: "デザインの4大原則に含まれないのは？",
    choices: ["近接（Proximity）", "整列（Alignment）", "反復（Repetition）", "再帰（Recursion）"],
    correctIndex: 3,
    explanation:
      "4大原則は「近接・整列・反復・対比（Contrast）」。再帰はプログラミング用語で、デザインの原則ではない。",
  },
  {
    id: "principles-q2",
    question: "「関係あるものは近く、関係ないものは離す」原則はどれ？",
    choices: ["近接", "整列", "対比", "反復"],
    correctIndex: 0,
    explanation:
      "近接（Proximity）は要素同士の距離で関係性を伝える原則。ラベルと入力欄、見出しと本文など「ひとつのまとまり」を視覚的に作るのに使う。",
  },
  {
    id: "principles-q3",
    question: "整列で意識すべき「線」はどれ？",
    choices: [
      "実線（罫線）",
      "見えない縦横のライン",
      "斜線（斜めのガイド）",
      "グリッドの実線のみ",
    ],
    correctIndex: 1,
    explanation:
      "整列の本質は「見えない縦横のライン」に揃えること。要素の左端・右端・中央のいずれかが揃っていると、読み手は無意識にまとまりを感じる。罫線を引く必要はない。",
  },
  {
    id: "principles-q4",
    question: "対比（Contrast）で大事な姿勢は？",
    choices: [
      "思い切って大胆に差をつける",
      "中庸を保ってバランスを取る",
      "色だけで差をつける",
      "フォントの種類を増やして変化をつける",
    ],
    correctIndex: 0,
    explanation:
      "対比は「中途半端だと事故」になる。少しだけ大きい・少しだけ濃いはノイズに見える。やるなら2倍・3倍と思い切って差をつける。フォントを増やすのは原則違反。",
  },
  {
    id: "principles-q5",
    question: "4原則のうち、UIを点検するときに最初に確認すべきは？",
    choices: ["整列", "反復", "対比", "近接"],
    correctIndex: 0,
    explanation:
      "整列が崩れていると「なんとなく雑」に見える。最初に整列で骨格を整え、次に近接でグループを作り、対比で強弱、反復でリズムを出すのが基本の順序。",
  },
];
