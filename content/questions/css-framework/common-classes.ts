import type { DrillQuestion } from "@/components/PageDrill";

export const commonClassesQuestions: DrillQuestion[] = [
  {
    id: "common-classes-q1",
    question: "Tailwind CSS で「上下左右すべてに16pxのマージン」を設定するクラスはどれ？",
    choices: [
      "m-4",
      "margin-4",
      "m-16",
      "mt-4 mb-4 ml-4 mr-4",
    ],
    correctIndex: 0,
    explanation:
      "Tailwindのスペーシングは1単位 = 4pxです。`m-4` は全方向に4×4px = 16pxのマージンを適用します。`m-16` は64px（16×4px）になります。`mt-4 mb-4 ml-4 mr-4` と書くことも可能ですが、`m-4` 一つで同じ効果が得られます。`margin-4` はTailwindのクラス名ではありません。",
  },
  {
    id: "common-classes-q2",
    question: "Tailwind CSS で要素を横並びにするクラスの組み合わせとして正しいのはどれ？",
    choices: [
      "horizontal flex-row",
      "flex flex-row",
      "display-flex direction-row",
      "layout-flex",
    ],
    correctIndex: 1,
    explanation:
      "横並びにするには `flex`（Flexboxを有効化）と `flex-row`（主軸を横方向に設定）を組み合わせます。ただし `flex-row` はデフォルト値なので `flex` だけでも横並びになります。縦方向にしたい場合は `flex flex-col` を使います。`display-flex` はTailwindの記法ではなくCSSプロパティ名です。",
  },
  {
    id: "common-classes-q3",
    question: "Tailwind CSS で `p-4 pt-0` と書いた場合、上のパディングはどうなる？",
    choices: [
      "16px（p-4が優先される）",
      "0px（pt-0が優先される）",
      "8px（平均値が使われる）",
      "エラーになる",
    ],
    correctIndex: 1,
    explanation:
      "Tailwindでは後に記述したクラスの方が優先されるわけではなく、CSSの詳細度と記述順で決まります。`pt-0`（padding-top: 0）は `p-4`（padding: 16px）より詳細度が同じかつ後ろに書かれることが多いため、実際には `pt-0` が上パディングを0にします。具体的な方向指定（`pt-` `mt-` 等）は全方向指定（`p-` `m-`）を上書きします。",
  },
  {
    id: "common-classes-q4",
    question: "Tailwind CSS で「テキストサイズを大きく（20px相当）にする」クラスはどれ？",
    choices: [
      "text-20",
      "font-size-lg",
      "text-xl",
      "text-big",
    ],
    correctIndex: 2,
    explanation:
      "Tailwindのテキストサイズは `text-xs`（12px）・`text-sm`（14px）・`text-base`（16px）・`text-lg`（18px）・`text-xl`（20px）・`text-2xl`（24px）… と命名されています。数値を直接書く `text-20` はTailwindの標準クラスではありません（v4では任意値 `text-[20px]` で使えます）。",
  },
  {
    id: "common-classes-q5",
    question: "Tailwind CSS でグリッドレイアウトを使って「3カラム均等幅」にするクラスの組み合わせはどれ？",
    choices: [
      "flex flex-3",
      "grid grid-cols-3",
      "display-grid columns-3",
      "layout-grid col-3",
    ],
    correctIndex: 1,
    explanation:
      "グリッドレイアウトには `grid`（CSS Gridを有効化）と `grid-cols-{数}` で列数を指定します。`grid grid-cols-3` で3列均等幅のグリッドになります。Flexboxと違い、GridはHTMLの構造をほぼ変えずに2次元レイアウトを実現できます。`flex flex-3` はTailwindに存在しないクラスです。",
  },
];
