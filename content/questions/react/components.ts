import type { DrillQuestion } from "@/components/PageDrill";

export const componentQuestions: DrillQuestion[] = [
  {
    id: "components-q1",
    question: "Reactのコンポーネントを定義する正しい書き方はどれ？",
    choices: [
      "const MyComp = new Component()",
      "function MyComp() { return <div /> }",
      "class MyComp { render() }",
      "component MyComp() { }",
    ],
    correctIndex: 1,
    explanation:
      "現在の標準は「関数コンポーネント」。functionキーワードで定義し、JSXをreturnするだけでコンポーネントになる。classで書くクラスコンポーネントはレガシーで現在は非推奨。newでインスタンス化する書き方や、componentというキーワードはReactには存在しない。",
  },
  {
    id: "components-q2",
    question: "JSXでCSSクラスを指定するとき、正しい属性名はどれ？",
    choices: [
      "class",
      "cssClass",
      "className",
      "styleClass",
    ],
    correctIndex: 2,
    explanation:
      "JSXはJavaScriptとして処理されるため、JavaScriptの予約語である`class`は使えない。代わりに`className`を使う。これはJSXの代表的な「HTMLと違う点」のひとつ。実際のDOMに変換されるとき、ReactがclassNameをclassに変換してくれる。",
  },
  {
    id: "components-q3",
    question: "1つの関数コンポーネントがreturnできるルート要素の数は？",
    choices: [
      "制限なく何個でも並べてよい",
      "2つまで",
      "1つのみ（複数要素はFragmentで包む）",
      "0個（returnは不要）",
    ],
    correctIndex: 2,
    explanation:
      "JSXは必ず1つのルート要素に包む必要がある。複数の要素を返したいときは`<React.Fragment>` または省略記法の`<>`と`</>`でまとめる。Fragmentは実際のDOMには追加されないので、余分なdivを生まない点が利点。",
  },
  {
    id: "components-q4",
    question: "関数コンポーネントがreturnで返すべきものはどれ？",
    choices: [
      "文字列のみ",
      "JSX（またはnull）",
      "JavaScriptオブジェクト",
      "HTML文字列をdocument.writeで出力",
    ],
    correctIndex: 1,
    explanation:
      "関数コンポーネントはJSX（画面に描画したい構造）またはnull（何も描画しない）を返す。nullを返すとコンポーネントは存在するが何も表示されない。文字列やオブジェクトをそのままreturnするとエラーになる。document.writeはReactの世界では使わない。",
  },
  {
    id: "components-q5",
    question: "コンポーネントを小さく分割する主な理由として最も適切なのはどれ？",
    choices: [
      "ファイルサイズを物理的に小さくしてビルドを速くするため",
      "再利用性と責務の分離を高めるため",
      "Reactのルール上、100行を超えるコンポーネントは動作しないため",
      "コンポーネント数が多いほどパフォーマンスが向上するため",
    ],
    correctIndex: 1,
    explanation:
      "「1コンポーネント1責務」が設計の基本原則。小さく分けることで、同じ部品を別の場所でも使い回せる（再利用性）し、どこを直せばいいか一目でわかる（責務の分離）。ファイルサイズやパフォーマンスへの直接的な影響ではなく、コードの「保守しやすさ」と「再利用しやすさ」のために分割する。",
  },
];
