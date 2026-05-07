import type { DrillQuestion } from "@/components/PageDrill";

export const contextQuestions: DrillQuestion[] = [
  {
    id: "context-q1",
    question:
      "Context API が解決する問題として正しいのはどれ？",
    choices: [
      "コンポーネントが再レンダリングされすぎて画面がカクつく問題",
      "APIから取得したデータが古くなる（stale）問題",
      "親から孫・ひ孫へと何階層もPropsを受け渡す「バケツリレー問題」",
      "useEffectの依存配列を正しく書けないと発生する無限ループ問題",
    ],
    correctIndex: 2,
    explanation:
      "Context API は「Props のバケツリレー問題」を解決するために設計されている。中間のコンポーネントがデータを使わないのに受け渡すだけのために Props を持つ状況を、Contextを使うと「Provider（提供元）とuseContext（取得先）の直接接続」で解決できる。APIデータのstale問題はTanStack Query、パフォーマンス問題はReact.memo等、無限ループ問題は依存配列の正確な記述で対処する。",
  },
  {
    id: "context-q2",
    question:
      "Context API を使う3つのステップとして正しい順序はどれ？",
    choices: [
      "useContext → createContext → Provider",
      "createContext → useContext → Provider",
      "createContext → Provider でラップ → useContext で取り出す",
      "Provider → createContext → useContext",
    ],
    correctIndex: 2,
    explanation:
      "Context APIの使い方は「createContext → Provider → useContext」の3ステップ。(1) createContextでContextオブジェクトを作る、(2) <Context.Provider value={値}>でコンポーネントツリーを包む、(3) 子孫コンポーネントでuseContext(Context)を呼んで値を取り出す。useContext単体はただのフックであり、createContextで作ったContextオブジェクトがないと使えない。",
  },
  {
    id: "context-q3",
    question:
      "Context の value が変わったときの再レンダリングについて正しいのはどれ？",
    choices: [
      "Providerの直下の子コンポーネントだけが再レンダリングされる",
      "useContext を呼んでいる全コンポーネントが再レンダリングされる（ツリーの深さに関係なく）",
      "再レンダリングは発生しない。値を取り出すタイミングで最新値が参照される",
      "Contextの値が変わっても、React.memo を使っていないコンポーネントは再レンダリングされない",
    ],
    correctIndex: 1,
    explanation:
      "Context の value が変わると、そのContextを useContext で購読している全てのコンポーネントが再レンダリングされる。これはコンポーネントツリーのどの深さにあっても同様。そのため、頻繁に変わる値（フォームの入力・アニメーション状態）をContextに入れると、その値とは無関係のコンポーネントも含めて大規模な再レンダリングが起きてパフォーマンスが落ちる。",
  },
  {
    id: "context-q4",
    question:
      "Context が特に向いているユースケースとして最も適切なのはどれ？",
    choices: [
      "ショッピングカートの中身（ユーザーが頻繁に追加・削除する）",
      "入力中のフォームの値（キーを押すたびに変わる）",
      "アプリ全体のテーマ（ダーク/ライト）や言語設定（めったに変わらない）",
      "APIから取得した商品一覧（ページロードのたびに取得する）",
    ],
    correctIndex: 2,
    explanation:
      "Contextは「変化が少なく、多くのコンポーネントで必要な値」に最適。テーマ（ダーク/ライト）・言語設定・ログインユーザー情報などは変化頻度が低く、アプリ全体で参照するため、Contextとの相性が良い。ショッピングカートは変化頻度が高くZustandが適切。入力中のフォームはuseStateがシンプル。APIデータはTanStack Queryが担当する。",
  },
  {
    id: "context-q5",
    question:
      "Contextの再レンダリング問題を軽減する対策として正しいのはどれ？",
    choices: [
      "Context の value を毎回 JSON.stringify して文字列として渡す",
      "変化頻度の違う値を役割ごとに別々のContextに分割する",
      "useContext の代わりに prop drilling（バケツリレー）に戻す",
      "Provider の value に useRef を渡すと再レンダリングが起きなくなる",
    ],
    correctIndex: 1,
    explanation:
      "「変化頻度で Context を分割する」のが最も実践的な対策。例えば ThemeContext（ほぼ変わらない）と UserContext（ログイン時に変わる）を1つの AppContext にまとめると、どちらか一方が変わっただけで全 Consumer が再レンダリングされる。分割すれば ThemeContext が変わったときは ThemeContext を購読しているコンポーネントだけが再レンダリングされる。JSON.stringifyやuseRefは機能しない誤った対策。",
  },
];
