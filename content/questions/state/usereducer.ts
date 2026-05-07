import type { DrillQuestion } from "@/components/PageDrill";

export const usereducerQuestions: DrillQuestion[] = [
  {
    id: "usereducer-q1",
    question:
      "useReducer の基本的な使い方として正しいのはどれ？",
    choices: [
      "const [state, setState] = useReducer(initialState)",
      "const [state, dispatch] = useReducer(reducer, initialState)",
      "const { state, dispatch } = useReducer(reducer)",
      "const [state, reducer] = useReducer(dispatch, initialState)",
    ],
    correctIndex: 1,
    explanation:
      "useReducer は `const [state, dispatch] = useReducer(reducer, initialState)` の形で使う。第1引数に reducer 関数（状態と action を受け取り新しい状態を返す）、第2引数に初期値を渡す。返り値の1番目が現在の state、2番目が dispatch 関数。useStateと同様に配列の分割代入を使う点は共通。",
  },
  {
    id: "usereducer-q2",
    question:
      "reducer 関数の性質として正しいのはどれ？",
    choices: [
      "reducer 内で fetch などの非同期処理を行い、完了後に state を返せる",
      "reducer は (state, action) を受け取り、新しい state を返す純粋関数でなければならない",
      "reducer は複数の引数を取ることができ、コンポーネントの props も参照できる",
      "reducer 内で setState を呼んで直接 state を変更するのが正しい使い方",
    ],
    correctIndex: 1,
    explanation:
      "reducer は「純粋関数」でなければならない。純粋関数とは「同じ引数なら必ず同じ結果を返し、外部の状態を変更しない関数」のこと。APIコール・console.log・外部変数の変更などの「副作用」を reducer 内で行ってはいけない。副作用は useEffect やイベントハンドラの中で行う。pure関数にすることで reducer 単体のユニットテストも可能になる。",
  },
  {
    id: "usereducer-q3",
    question:
      "useReducer が useState より向いているシチュエーションはどれ？",
    choices: [
      "カウンタのように1つのシンプルな数値を増減させるだけの場合",
      "真偽値のトグル（isOpen を true/false に切り替えるだけ）の場合",
      "複数のフォームフィールドが存在し、「送信」ボタンで全フィールドを一括リセットする場合",
      "APIから取得したデータをキャッシュしながら管理する場合",
    ],
    correctIndex: 2,
    explanation:
      "複数のフォームフィールドがあり「送信後に全部リセット」する場合、useStateだと setName('')・setEmail('')・setIsSubmitting(false) と複数のsetterを個別に呼ぶ必要がある。useReducerなら dispatch({ type: 'RESET' }) の1行で全フィールドを確実に初期値に戻せる。一つのactionで複数のstateを協調させて変更できるのがuseReducerの強み。カウンタや真偽値のようなシンプルな値はuseStateで十分。APIデータの管理はTanStack Query等が担当。",
  },
  {
    id: "usereducer-q4",
    question:
      "次のコードで dispatch を呼んだ後に何が起きるか正しいのはどれ？\n\n`dispatch({ type: 'INCREMENT', payload: 5 })`",
    choices: [
      "dispatch はオブジェクトを受け取れないため、このコードはエラーになる",
      "reducer 関数が (現在のstate, { type: 'INCREMENT', payload: 5 }) を引数に呼ばれ、新しい state が計算される",
      "dispatch に渡したオブジェクトがそのまま state として設定される",
      "reducer は呼ばれず、state は変化しない。次回レンダリング時に反映される",
    ],
    correctIndex: 1,
    explanation:
      "dispatch にオブジェクト（action）を渡すと、reducer 関数が「現在の state」と「そのaction オブジェクト」を引数に自動で呼ばれる。reducer 内で action.type による分岐（switch文）を行い、action.payload の値を使って新しいstateを計算して return する。これが useState の setter 関数を呼ぶのと同等の役割を果たす。",
  },
  {
    id: "usereducer-q5",
    question:
      "useState から useReducer に移行を検討するべきサインとして最も適切なのはどれ？",
    choices: [
      "コンポーネントのstate数が2つ以上になったとき",
      "アプリ全体でグローバルに状態を共有する必要が出てきたとき",
      "1つの操作で複数のsetterを同時に呼ぶコードが増え、更新ロジックが散らばってきたとき",
      "TypeScript を導入したのでより型安全な状態管理が必要になったとき",
    ],
    correctIndex: 2,
    explanation:
      "「1つの操作（例：送信ボタン押下）でsetA・setB・setC を複数同時に呼んでいる」「どのsetterがどの操作で呼ばれるか追いにくくなってきた」というときが useReducer 移行のサイン。useReducer に移行すると、全ての更新ロジックがreducer の switch 文に集約され見通しがよくなる。state数が2つになっただけでは移行不要（独立したstateならuseState複数で十分）。グローバル共有はContext/Zustandの役割。TypeScriptはどちらでも型付けできる。",
  },
];
