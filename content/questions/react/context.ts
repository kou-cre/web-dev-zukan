import type { DrillQuestion } from "@/components/PageDrill";

export const contextQuestions: DrillQuestion[] = [
  {
    id: "context-q1",
    question: "Contextを作るときに使うReactの関数はどれ？",
    choices: [
      "useContext()",
      "createContext()",
      "makeContext()",
      "useState()",
    ],
    correctIndex: 1,
    explanation:
      "createContext()でContextオブジェクトを生成する。useContext()はContextの値を読み取るHookであり、Contextを作る関数ではない。makeContext()やuseState()はContextの作成とは無関係。",
  },
  {
    id: "context-q2",
    question: "Contextの値を提供するコンポーネントの名前は何か？",
    choices: [
      "Consumer",
      "Wrapper",
      "Provider",
      "Supplier",
    ],
    correctIndex: 2,
    explanation:
      "createContext()で作成したContextオブジェクトには.Providerプロパティがある。このProviderコンポーネントでツリーを包み、value propに渡した値が配下のコンポーネント全体から参照できるようになる。",
  },
  {
    id: "context-q3",
    question: "Contextの値を読み取るためのHookはどれ？",
    choices: [
      "useContext()",
      "useSelector()",
      "useState()",
      "useReducer()",
    ],
    correctIndex: 0,
    explanation:
      "useContext(MyContext)でProviderが提供する値を読み取る。useSelector()はReduxのHookであり、useStateとuseReducerはコンポーネント内のローカル状態管理に使う。",
  },
  {
    id: "context-q4",
    question: "Contextの値が変更されたとき、何が起きるか？",
    choices: [
      "Providerコンポーネントだけが再レンダリングされる",
      "ページ全体がリロードされる",
      "useContextを使っているコンポーネント全体が再レンダリングされる",
      "何も起きない",
    ],
    correctIndex: 2,
    explanation:
      "Contextの値が変わると、そのContextに対してuseContextを呼んでいるすべてのコンポーネントが再レンダリングされる。これがContextをパフォーマンス的に慎重に使うべき理由。更新頻度の高い値をContextで管理すると大量の再レンダリングを引き起こす可能性がある。",
  },
  {
    id: "context-q5",
    question: "Contextが特に向いているデータはどれか？",
    choices: [
      "1秒ごとに更新されるタイマーの値",
      "フォームの各入力フィールドの現在値",
      "テーマ（ダーク/ライト切替）やログインユーザー情報など更新頻度が低い値",
      "子コンポーネント1つだけに渡したいデータ",
    ],
    correctIndex: 2,
    explanation:
      "Contextはツリー全体への共有に向いているが、値が変わるたびに使用コンポーネント全体が再レンダリングされるため、更新頻度の低い値（テーマ・認証情報・言語設定など）に使うのがベストプラクティス。頻繁に変わる値にはZustandなどの外部State管理が適している。子コンポーネント1つだけへの受け渡しはPropsで十分。",
  },
];
