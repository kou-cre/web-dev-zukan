import type { DrillQuestion } from "@/components/PageDrill";

export const controlledQuestions: DrillQuestion[] = [
  {
    id: "controlled-q1",
    question: "制御コンポーネントにおいて、フォームの入力値の「唯一の情報源（Single Source of Truth）」はどこですか？",
    choices: [
      "HTMLのDOMノード",
      "ReactのState",
      "localStorageに保存された値",
      "ブラウザのフォームキャッシュ",
    ],
    correctIndex: 1,
    explanation: "制御コンポーネントでは、inputのvalueにStateを渡し、onChangeでsetterを呼ぶことで、ReactのStateがフォームの唯一の情報源になります。DOMの値もStateと常に同期した状態になります。非制御コンポーネントではDOM（useRefで参照）が値を保持しますが、制御コンポーネントではStateが主役です。",
  },
  {
    id: "controlled-q2",
    question: "以下のコードで、inputに文字を入力してもテキストが表示されない理由として正しいのはどれですか？\n\nconst [name, setName] = useState('');\n<input value={name} />",
    choices: [
      "useState の初期値が空文字なのでエラーになる",
      "onChange ハンドラを渡していないため、入力してもStateが更新されず表示が変わらない",
      "value prop は inputに使えない",
      "const ではなく let を使う必要がある",
    ],
    correctIndex: 1,
    explanation: "value prop を渡すことでReactがそのinputを「管理する」と判断します。しかし onChange でsetterを呼ばないとStateが変わらず、再レンダリングが起きても常に空文字が表示され続けます。制御コンポーネントでは value と onChange は必ずセットで使う必要があります。",
  },
  {
    id: "controlled-q3",
    question: "チェックボックスを制御コンポーネントとして実装するとき、正しい書き方はどれですか？",
    choices: [
      "<input type=\"checkbox\" value={agreed} onChange={e => setAgreed(e.target.value)} />",
      "<input type=\"checkbox\" checked={agreed} onChange={e => setAgreed(e.target.checked)} />",
      "<input type=\"checkbox\" value={agreed} onChange={e => setAgreed(e.target.checked)} />",
      "<input type=\"checkbox\" checked={agreed} onChange={e => setAgreed(e.target.value)} />",
    ],
    correctIndex: 1,
    explanation: "チェックボックスはテキスト系のinputと異なり、value ではなく checked prop を使い、onChangeでは e.target.value ではなく e.target.checked を取り出します。e.target.checked はboolean（true/false）で、チェックの入り切りを表します。",
  },
  {
    id: "controlled-q4",
    question: "非制御コンポーネントを使うべき典型的なケースはどれですか？",
    choices: [
      "ログインフォームのメールアドレス入力",
      "検索フォームのキーワード入力",
      "ファイルアップロードのinput要素",
      "ユーザー名の登録フォーム",
    ],
    correctIndex: 2,
    explanation: "ファイルアップロード（type=\"file\"）のinputは、選択されたファイルをReactのStateに入れることができないため、useRefで参照する非制御コンポーネントが必須です。ログイン・検索・ユーザー名登録などテキスト系の入力は、制御コンポーネントで実装するのが一般的です。",
  },
  {
    id: "controlled-q5",
    question: "onChange ハンドラで e をそのまま setter に渡した場合（setName(e)）、Stateにはどんな値が入りますか？",
    choices: [
      "入力されたテキスト文字列",
      "undefined",
      "SyntheticEvent オブジェクト全体",
      "null",
    ],
    correctIndex: 2,
    explanation: "onChange に渡されるのは React の SyntheticEvent オブジェクトです。e をそのまま setter に渡すと、Stateにイベントオブジェクト全体が入ってしまいます。正しくは e.target.value（テキスト系）または e.target.checked（チェックボックス）を取り出して渡す必要があります。",
  },
];
