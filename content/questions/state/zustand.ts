import type { DrillQuestion } from "@/components/PageDrill";

export const zustandQuestions: DrillQuestion[] = [
  {
    id: "zustand-q1",
    question:
      "Zustand でストアを使うとき、Context API と比べて不要なステップはどれ？",
    choices: [
      "ストアをファイルに定義すること",
      "コンポーネント内で useStore を呼ぶこと",
      "Provider でコンポーネントツリーをラップすること",
      "npm install でライブラリをインストールすること",
    ],
    correctIndex: 2,
    explanation:
      "Zustandの大きな特徴の一つが「Provider が不要」なこと。Context APIでは <ThemeContext.Provider value={theme}> のようにコンポーネントを包む必要があるが、Zustandはcreateでストアを定義したあと、useStore hookを import して呼ぶだけで使える。Provider ラップがないため、アプリの大規模な構造変更なしにどこからでも状態を参照できる。",
  },
  {
    id: "zustand-q2",
    question:
      "Zustand の create 関数で定義するものとして正しいのはどれ？",
    choices: [
      "コンポーネントのJSXテンプレートと状態の初期値",
      "状態（state）とそれを更新するアクション関数を一つのオブジェクトで定義する",
      "Reducer関数とaction typeを別々に定義し、dispatch で接続する",
      "初期値だけを定義し、アクションはコンポーネント側に書く",
    ],
    correctIndex: 1,
    explanation:
      "Zustandのcreate関数では、状態の初期値とその状態を更新するアクション関数を一つのオブジェクトにまとめて定義する。例えば `create((set) => ({ count: 0, increment: () => set((s) => ({ count: s.count + 1 })) }))` のように、countという状態とincrementというアクションを一緒に定義する。useReducerのようにreducerとaction typeを分離する必要がなく、よりシンプルに書ける。",
  },
  {
    id: "zustand-q3",
    question:
      "Zustand で re-render を最小化するための正しい方法はどれ？",
    choices: [
      "useStore() でストア全体を取り出し、コンポーネント内で必要な値だけ分割代入する",
      "useStore((state) => state.count) のように selector を渡して必要な値だけ購読する",
      "Zustand ではどうやっても不要な re-render を避けられない",
      "ストアを複数ファイルに分割することで re-render が自動的に最小化される",
    ],
    correctIndex: 1,
    explanation:
      "Zustand では useStore にセレクタ関数を渡すことで、取り出した値が変わったときだけ再レンダリングを起こせる。`const count = useStore((state) => state.count)` と書けば、count が変わったときだけ再レンダリングされる。ストア全体を取り出す `useStore()` だと、ストアのどの値が変わっても再レンダリングが起きてしまう。アクション関数は参照が変わらないため、関数だけを取り出す場合は再レンダリングの原因にならない。",
  },
  {
    id: "zustand-q4",
    question:
      "Zustand が Context API より向いているユースケースはどれ？",
    choices: [
      "ダークモード/ライトモードのテーマ切り替え（ユーザーが数回クリックするだけ）",
      "ログイン中のユーザー情報（ログイン時に変わりセッション中は固定）",
      "ショッピングカートの中身（ユーザーが頻繁に追加・削除・数量変更する）",
      "言語設定（アプリ起動時に一度設定するだけ）",
    ],
    correctIndex: 2,
    explanation:
      "Zustandはショッピングカートのように「変化が頻繁でグローバルに共有する値」に向いている。カートは追加・削除・数量変更が頻繁に起き、ヘッダー（カートアイコン）・商品一覧・カート画面など多くの場所から参照・更新される。これをContextで管理すると高頻度の変化が全Consumerの再レンダリングを引き起こす。テーマ・ログインユーザー・言語設定はいずれも変化頻度が低いためContextで十分。",
  },
  {
    id: "zustand-q5",
    question:
      "Zustand のストア内でオブジェクトや配列の状態を更新するときの正しいパターンはどれ？",
    choices: [
      "state.items.push(newItem) のように直接変更してから set を呼ばずに完了する",
      "set((state) => ({ items: [...state.items, newItem] })) のように新しい配列を作って返す",
      "state.items = [...state.items, newItem] と直接代入してから set({}) で同期する",
      "Zustandは配列をサポートしていないため、オブジェクトに変換してから管理する",
    ],
    correctIndex: 1,
    explanation:
      "Zustandでもオブジェクト・配列の更新はイミュータブル（不変性）を保つ必要がある。`state.items.push(newItem)` のような破壊的変更は、参照が同じのままなので Zustand がステートの変化を検知できず、再レンダリングが起きない場合がある。`set((state) => ({ items: [...state.items, newItem] }))` のようにスプレッド構文で新しい配列を作って返すのが正しいパターン。Reactのイミュータビリティ原則はZustandでも共通。",
  },
];
