import type { DrillQuestion } from "@/components/PageDrill";

export const gridQuestions: DrillQuestion[] = [
  {
    id: "grid-q1",
    question: "CSS Gridを有効にするプロパティはどれ？",
    choices: [
      "display: grid",
      "grid: enable",
      "display: flex-grid",
      "layout: grid",
    ],
    correctIndex: 0,
    explanation:
      "CSS Gridを有効にするには親要素に `display: grid` を指定します。これでGrid Containerになり、子要素がグリッドセルに配置されます。Flexboxが `display: flex` で有効になるのと同様に、displayプロパティの値を変えるだけです。",
  },
  {
    id: "grid-q2",
    question: "`grid-template-columns: repeat(3, 1fr)` の説明として正しいのはどれ？",
    choices: [
      "幅300pxの列を3つ作る",
      "全体を3等分した幅の列を3つ作る",
      "3行のグリッドを作る",
      "子要素を3列に繰り返し表示する",
    ],
    correctIndex: 1,
    explanation:
      "`1fr` は「残りの空き領域を1等分した量」を意味するGridの割合単位です。`repeat(3, 1fr)` は「1frを3列分作る」ということで、親の幅を均等に3分割した列が3つ作られます。pxなどの固定単位ではないため、画面幅に応じて自動的に伸縮します。",
  },
  {
    id: "grid-q3",
    question: "grid-template-areas を使った際に、ヘッダーが2列分の幅を占めるように設定するコードはどれ？",
    choices: [
      `grid-template-areas: "header" "header"`,
      `grid-template-areas: "header header"`,
      `grid-area: header; grid-column: 1 / 3`,
      `grid-template-columns: header header`,
    ],
    correctIndex: 1,
    explanation:
      "`grid-template-areas` では、同じ名前を横に並べると「その要素が列をまたぐ」ことを表します。`\"header header\"` と書くと、2列のグリッドでheaderエリアが両列を占めます。各行の定義は引用符で囲まれた文字列で、スペースで区切って各セルのエリア名を記述します。",
  },
  {
    id: "grid-q4",
    question: "`grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` の動作として正しいのはどれ？",
    choices: [
      "常に200pxの固定幅カラムを自動生成する",
      "最小200px・最大1frのカラムを、親の幅に収まる数だけ自動生成する",
      "200個のカラムを1frずつ生成する",
      "フォントサイズに応じてカラム数が変わる",
    ],
    correctIndex: 1,
    explanation:
      "`auto-fill` はグリッドトラックを自動的に作り続けます。`minmax(200px, 1fr)` は「最小200px・最大1fr」のカラムを指定します。つまり「200px以上確保できる間は列を追加し続け、余った空き領域は均等に分配する」動作になります。画面幅に応じてカラム数が自動で増減するレスポンシブカードグリッドの定番パターンです。",
  },
  {
    id: "grid-q5",
    question: "CSS GridとFlexboxの使い分けとして正しいのはどれ？",
    choices: [
      "Gridはアニメーション用、Flexboxは静的レイアウト用",
      "ページの大枠（ヘッダー・サイドバー・メイン）はGrid、コンポーネント内部はFlexboxが多い",
      "GridはPC専用、FlexboxはスマホのみFlex",
      "どちらも同じで、好きな方を使えばよい",
    ],
    correctIndex: 1,
    explanation:
      "実務では「ページ全体の骨格はGrid、コンポーネント内部の小さい配置はFlex」という組み合わせが多く使われます。Gridは行と列を同時に制御できるため、複雑なページレイアウトに向いています。Flexboxは1方向の配置が得意で、ナビバーのロゴ+リンクやボタンの横並びなどのコンポーネントレベルで強みを発揮します。",
  },
];
