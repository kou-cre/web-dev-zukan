import type { DrillQuestion } from "@/components/PageDrill";

export const propsQuestions: DrillQuestion[] = [
  {
    id: "props-q1",
    question: "Propsの主な特徴として正しいのはどれ？",
    choices: [
      "子コンポーネントがいつでも自由に書き換えられる",
      "子コンポーネントから変更できない読み取り専用のデータ",
      "コンポーネントの内部状態を管理するためのもの",
      "サーバーからのみ渡すことができるデータ",
    ],
    correctIndex: 1,
    explanation:
      "Propsは親から子へ渡される読み取り専用のデータ。子コンポーネントはPropsを受け取るだけで変更できない。このルールがReactの一方向データフローを保証し、データの変更箇所を追いやすくしている。コンポーネント内部の状態を管理するのはStateの役割。",
  },
  {
    id: "props-q2",
    question: "親コンポーネントから子コンポーネントへ関数をPropsとして渡す主な目的はどれ？",
    choices: [
      "子コンポーネントのレンダリングを高速化するため",
      "子から親へイベントを通知するコールバックとして使うため",
      "子コンポーネントのスタイルを動的に変更するため",
      "TypeScriptの型エラーを回避するため",
    ],
    correctIndex: 1,
    explanation:
      "Propsは親から子への一方向フローだが、関数を渡すことで「子が何かを起こしたら親に知らせる」コールバックを実現できる。例えばボタンクリック時のハンドラ関数を親から渡し、子がそれを呼ぶことで、データの更新は親が行いつつ子からトリガーできる。",
  },
  {
    id: "props-q3",
    question: "TypeScriptでオプショナルPropsを表す正しい記法はどれ？",
    choices: [
      "name: string | optional",
      "name?: string のように?をつける",
      "optional name: string",
      "name: string = undefined",
    ],
    correctIndex: 1,
    explanation:
      "TypeScriptでオプショナル（省略可能）なプロパティを表すには`?`をつける。例: `name?: string`。この場合、nameはstringまたはundefinedになる。渡し忘れてもエラーにならない。`= undefined`はデフォルト値の記法であり、意味は近いがinterfaceのプロパティ定義では`?`が正しい。",
  },
  {
    id: "props-q4",
    question: "childrenとは何か、最も正確に説明しているのはどれ？",
    choices: [
      "コンポーネントの子孫コンポーネントをすべてまとめた配列",
      "コンポーネントのタグで囲んだ要素が自動的に渡される特殊なProp",
      "子コンポーネントの中で定義されたState",
      "Reactが内部的に管理するDOM要素の参照",
    ],
    correctIndex: 1,
    explanation:
      "childrenは特殊なPropsで、`<Card>ここの内容</Card>`のようにコンポーネントのタグで囲まれた要素が自動的にchildren Propsとして渡される。Cardコンポーネント内で`{children}`と書くことで囲んだ内容をそこに表示できる。レイアウトコンポーネントやラッパーコンポーネントを作るときに多用する。",
  },
  {
    id: "props-q5",
    question: "Props drillingとはどのような問題か？",
    choices: [
      "Propsに型定義を忘れてTypeScriptエラーが出る問題",
      "Props名にタイポがあって値が渡らない問題",
      "深い階層にPropsを渡し続けることで生じるコード管理の複雑化",
      "子コンポーネントがPropsを上書きしてしまう問題",
    ],
    correctIndex: 2,
    explanation:
      "Props drillingは「孫・ひ孫コンポーネントにデータを届けるために、間にある親・子コンポーネントも経由してPropsを渡し続けなければならない」問題。中間コンポーネントは実際にそのデータを使わないのに受け取って渡すだけになり、コードの変更が困難になる。解決策はContext APIやグローバル状態管理ライブラリ（Zustandなど）。",
  },
];
