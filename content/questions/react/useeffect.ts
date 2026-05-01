import type { DrillQuestion } from "@/components/PageDrill";

export const useeffectQuestions: DrillQuestion[] = [
  {
    id: "useeffect-q1",
    question: "useEffectが実行されるタイミングとして正しいのはどれ？",
    choices: [
      "コンポーネントがレンダリングされる前",
      "コンポーネントのレンダリング完了後",
      "Stateが変更された瞬間（レンダリング前）",
      "コンポーネントの外部でのみ実行される",
    ],
    correctIndex: 1,
    explanation:
      "useEffectはReactがDOMを更新した後（レンダリング完了後）に実行される。これにより、副作用がレンダリング結果に影響を与えずに安全に実行できる。レンダリング前に実行したい場合はuseLayoutEffectを使う。",
  },
  {
    id: "useeffect-q2",
    question: "useEffectの依存配列を [] （空の配列）にしたとき、Effectはいつ実行されるか？",
    choices: [
      "毎回レンダリングするたびに実行される",
      "マウント時の1回だけ実行される",
      "アンマウント時に1回だけ実行される",
      "依存する値が変わったときだけ実行される",
    ],
    correctIndex: 1,
    explanation:
      "依存配列に [] を渡すと「依存する値がない＝何が変わっても再実行しない」という意味になり、コンポーネントがマウントされた最初の1回のみ実行される。APIの初回データ取得や外部ライブラリの初期化によく使われる。",
  },
  {
    id: "useeffect-q3",
    question: "クリーンアップ関数を書く必要があるのは主にどんなときか？",
    choices: [
      "useEffect内でconsole.logを呼ぶとき",
      "useEffect内でStateを更新するとき",
      "イベントリスナー・タイマー・サブスクリプションを登録したとき",
      "useEffect内でfetchAPIを呼ぶとき",
    ],
    correctIndex: 2,
    explanation:
      "イベントリスナー・setInterval・WebSocketなどはコンポーネントが消えても自動的に止まらない。クリーンアップ関数（return () => {}）でこれらを解除しないとメモリリークが発生する。fetchについては実行中のリクエストをAbortControllerでキャンセルする場合にのみクリーンアップが必要。",
  },
  {
    id: "useeffect-q4",
    question: "useEffect内でfetchしてStateを更新するとき、依存配列なしにすると何が起きるか？",
    choices: [
      "fetchが1回だけ実行されて終わる",
      "コンパイルエラーになる",
      "無限ループになる（毎レンダリングでfetch→State更新→再レンダリング）",
      "fetchは実行されるがStateが更新されない",
    ],
    correctIndex: 2,
    explanation:
      "依存配列なしのuseEffectは毎レンダリング後に実行される。fetch完了でsetStateを呼ぶと再レンダリングが起き、再びuseEffectが走りfetchする……という無限ループになる。fetchによるState更新を行う場合は必ず適切な依存配列（通常は [] か特定のID）を指定する。",
  },
  {
    id: "useeffect-q5",
    question: "useEffectの依存配列の書き忘れを自動検出するツールはどれ？",
    choices: [
      "TypeScriptのstrictモード",
      "ESLintのreact-hooks/exhaustive-depsルール",
      "Prettierの--check オプション",
      "Next.jsの型チェッカー",
    ],
    correctIndex: 1,
    explanation:
      "react-hooks/exhaustive-depsはReact公式が提供するESLintルール。useEffect内で参照している変数が依存配列に含まれていない場合に警告を出す。手動で管理しようとすると必ず漏れが生じるため、このルールをlintに組み込んでツールに任せるのが現代のベストプラクティス。",
  },
];
