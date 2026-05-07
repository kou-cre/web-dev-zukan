import type { DrillQuestion } from "@/components/PageDrill";

export const reactTypesQuestions: DrillQuestion[] = [
  {
    id: "react-types-q1",
    question:
      "React コンポーネントで Props を型付けする正しいパターンはどれ？",
    choices: [
      "function Button(props: any) { ... }",
      "interface ButtonProps { label: string; onClick: () => void; }\nfunction Button({ label, onClick }: ButtonProps) { ... }",
      "function Button(label: string, onClick: () => void) { ... }",
      "type button = { label: string }; const Button: button = () => { ... }",
    ],
    correctIndex: 1,
    explanation:
      "React コンポーネントの Props は interface で形状を定義し、引数の分割代入部分に型として渡すのが正しいパターン。`{ label, onClick }: ButtonProps` のように書く。any を使うと型安全が失われる。複数の引数を並べる書き方（選択肢3）は React コンポーネントの書き方として誤り（Props は1つのオブジェクトとして受け取る）。",
  },
  {
    id: "react-types-q2",
    question:
      "次の useState の書き方のうち、null を初期値にするときの正しいパターンはどれ？",
    choices: [
      "const [user, setUser] = useState(null);",
      "const [user, setUser] = useState<User | null>(null);",
      "const [user, setUser]: [User, any] = useState(null);",
      "const [user, setUser] = useState<any>(null);",
    ],
    correctIndex: 1,
    explanation:
      "`useState(null)` だけだと TypeScript は null しか入れられない型として推論する。後から User 型のオブジェクトを setUser で入れようとするとエラーになる。`useState<User | null>(null)` とジェネリクスで型を明示することで「null か User のどちらかを入れられる」と宣言できる。any を使うと型安全が失われる。",
  },
  {
    id: "react-types-q3",
    question:
      "button 要素のクリックイベントハンドラーに使う正しい型はどれ？",
    choices: [
      "React.Event<HTMLButtonElement>",
      "React.ClickEvent<HTMLButtonElement>",
      "React.MouseEvent<HTMLButtonElement>",
      "Event.Click<HTMLButtonElement>",
    ],
    correctIndex: 2,
    explanation:
      "クリックイベントは `React.MouseEvent<HTMLButtonElement>` を使う。<> の中は対象のHTML要素の型（HTMLButtonElement・HTMLDivElement など）を指定する。これにより e.currentTarget や e.target が正しく型付けされ、エディタの補完が効くようになる。React.Event や React.ClickEvent という型は存在しない。",
  },
  {
    id: "react-types-q4",
    question:
      "input 要素の onChange に使うイベント型はどれ？",
    choices: [
      "React.MouseEvent<HTMLInputElement>",
      "React.InputEvent<HTMLInputElement>",
      "React.ChangeEvent<HTMLInputElement>",
      "React.KeyboardEvent<HTMLInputElement>",
    ],
    correctIndex: 2,
    explanation:
      "テキスト入力の変化イベントは `React.ChangeEvent<HTMLInputElement>` を使う。この型を使うと e.target.value が string 型として扱われ、入力値を型安全に取得できる。MouseEvent はクリック用、KeyboardEvent はキーボード操作用。InputEvent という React の型名は存在しない。",
  },
  {
    id: "react-types-q5",
    question:
      "children を受け取るコンポーネントで、children の型として最も適切なのはどれ？",
    choices: [
      "children: string",
      "children: JSX.Element",
      "children: React.ReactNode",
      "children: React.Children",
    ],
    correctIndex: 2,
    explanation:
      "`React.ReactNode` は JSX 要素・string・number・null・undefined・配列など、子要素として渡せるすべての型を含む最も広い型。`JSX.Element` は <div> などの JSX のみを指し、文字列や数値・null を渡すとエラーになる。children: string は文字列しか受け取れない。`React.Children` はクラスで型ではない。",
  },
];
