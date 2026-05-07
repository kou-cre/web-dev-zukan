import type { DrillQuestion } from "@/components/PageDrill";

export const flexboxQuestions: DrillQuestion[] = [
  {
    id: "flexbox-q1",
    question: "Flexboxを有効にするために親要素に指定するCSSプロパティはどれ？",
    choices: [
      "flex: 1",
      "display: flex",
      "flex-direction: row",
      "justify-content: flex-start",
    ],
    correctIndex: 1,
    explanation:
      "Flexboxを有効にするには親要素に `display: flex` を指定します。これを書いた瞬間に親要素がFlex Containerになり、直接の子要素がFlex Itemとして横並びになります。`flex: 1` は子要素に指定するもの、`flex-direction: row` はFlexbox有効後の向き指定なので、まず `display: flex` が必要です。",
  },
  {
    id: "flexbox-q2",
    question: "justify-content プロパティが制御するのはどれ？",
    choices: [
      "子要素の縦方向（交差軸）の配置",
      "子要素の横方向（主軸）の配置",
      "子要素の間隔（gap）の設定",
      "子要素の折り返し方法",
    ],
    correctIndex: 1,
    explanation:
      "justify-content は主軸（デフォルトでは横方向）のアイテム配置を制御します。`flex-start`（左端）、`center`（中央）、`flex-end`（右端）、`space-between`（両端+均等）などが使えます。縦方向は `align-items` が担当します。覚え方：justify（均等割り付け）は横書き文章の横方向配置と同じ概念。",
  },
  {
    id: "flexbox-q3",
    question: "要素を縦横ともに中央揃えにするCSSの組み合わせとして正しいのはどれ？",
    choices: [
      "display: flex; justify-content: center;",
      "display: flex; align-items: center;",
      "display: flex; justify-content: center; align-items: center;",
      "display: flex; flex-direction: center; align: center;",
    ],
    correctIndex: 2,
    explanation:
      "完全中央揃えには `display: flex` + `justify-content: center`（横中央）+ `align-items: center`（縦中央）の3つが必要です。横だけ中央にしても縦は揃わず、縦だけ中央にしても横は揃いません。ただし縦中央に効かせるには親要素に高さの設定が必要です（`height: 100vh` など）。",
  },
  {
    id: "flexbox-q4",
    question: "Flex Itemsが一行に収まりきれなくなったとき、次の行に折り返す設定はどれ？",
    choices: [
      "flex-wrap: nowrap",
      "flex-wrap: wrap",
      "overflow: wrap",
      "flex-direction: column",
    ],
    correctIndex: 1,
    explanation:
      "子要素を折り返すには `flex-wrap: wrap` を指定します。デフォルトは `nowrap` で折り返さず、幅を縮めて1行に収めようとします。`flex-wrap: wrap` にすると、親の幅を超えた子要素が自動で次の行に移ります。カードグリッドのレイアウトによく使われるパターンです。",
  },
  {
    id: "flexbox-q5",
    question: "FlexboxとCSS Gridの使い分けとして正しいのはどれ？",
    choices: [
      "Flexboxはアニメーション用、Gridは静的レイアウト用",
      "Flexboxは1次元（行か列）の配置、Gridは2次元（行と列を同時）の配置に向いている",
      "FlexboxはPC向け、GridはスマホにのみFlex",
      "Flexboxは古い書き方で、Gridが現代の標準",
    ],
    correctIndex: 1,
    explanation:
      "Flexboxは「横一列」または「縦一列」という1次元のレイアウトに強く、ナビバー・ボタン列・カードの横並びなどに向いています。GridはページのHeaderとSidebarとMainを同時に制御するような2次元レイアウトが得意です。どちらが優れているわけではなく、場面によって使い分けるのが現代のCSS。",
  },
];
