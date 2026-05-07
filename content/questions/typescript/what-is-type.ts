import type { DrillQuestion } from "@/components/PageDrill";

export const whatIsTypeQuestions: DrillQuestion[] = [
  {
    id: "what-is-type-q1",
    question:
      "TypeScriptにおける「型安全」の主な恩恵として最も正しい説明はどれ？",
    choices: [
      "コードの実行速度が JavaScript より速くなる",
      "コードを書いた瞬間（コンパイル時）に型の間違いを検出できる",
      "型を書くことでコードの行数が減る",
      "ブラウザが直接 TypeScript を実行できるようになる",
    ],
    correctIndex: 1,
    explanation:
      "型安全の最大の恩恵は「コンパイル時エラー検出」。JavaScript では実行して初めてバグに気づくのに対し、TypeScript はコードを書いた瞬間にエディタが赤い波線でエラーを表示する。実行速度・コード量には影響しない。ブラウザは TypeScript を直接実行できず、必ず JavaScript に変換（コンパイル）する必要がある。",
  },
  {
    id: "what-is-type-q2",
    question:
      "TypeScript のコードがブラウザで動くまでの正しい流れはどれ？",
    choices: [
      ".ts ファイル → ブラウザが直接実行",
      ".ts ファイル → tsc でコンパイル → .js ファイル → ブラウザが実行",
      ".js ファイル → tsc で型チェック → .ts ファイル → ブラウザが実行",
      ".ts ファイル → Babel でトランスパイル → TypeScript に変換 → ブラウザが実行",
    ],
    correctIndex: 1,
    explanation:
      "TypeScript は JavaScript のスーパーセット。ブラウザは TypeScript を直接解釈できないため、tsc（TypeScript Compiler）で JavaScript に変換する必要がある。この変換過程で型チェックが行われ、エラーがあれば変換が止まる。型情報はこの変換で取り除かれ、最終的な .js ファイルには型の記述は残らない。",
  },
  {
    id: "what-is-type-q3",
    question:
      "次のコードで TypeScript がエラーを出す箇所はどれ？\n\n`function add(a: number, b: number): number { return a + b; }\nadd(\"10\", 5);`",
    choices: [
      "return a + b の部分（number + number はできない）",
      "add(\"10\", 5) の部分（string を number の引数に渡している）",
      "function add の定義部分（引数が多すぎる）",
      "エラーは出ない（JavaScript と同じ結果になる）",
    ],
    correctIndex: 1,
    explanation:
      "add 関数の第1引数 a は `number` 型と宣言されているが、呼び出し時に文字列 \"10\" を渡している。TypeScript はこれを型の不一致としてエラーにする。JavaScript では \"10\" + 5 = \"105\"（文字列連結）という意図しない結果になっていたが、TypeScript はこの問題をコードを書いた瞬間に検出してくれる。",
  },
  {
    id: "what-is-type-q4",
    question:
      "TypeScript の型アノテーション（`: string` のような型の書き方）について正しい説明はどれ？",
    choices: [
      "すべての変数に必ず書かないといけない",
      "型アノテーションを書くと実行時にも型が検証される",
      "変数に初期値がある場合は型推論が働くため、書かなくてよい場合がある",
      "型アノテーションを省略すると常に any 型になる",
    ],
    correctIndex: 2,
    explanation:
      "TypeScript には型推論という機能があり、`const x = 1` のように初期値がある場合は x が number 型だと自動で判断する。すべてに書く必要はなく、関数の引数・初期値がない変数・複雑な型が必要な場合などに書くのが実践的な使い方。なお、型アノテーションはコンパイル時のチェックにのみ使われ、実行時には消える（型情報はJavaScriptに含まれない）。",
  },
  {
    id: "what-is-type-q5",
    question:
      "TypeScript の「型安全」について誤った説明はどれ？",
    choices: [
      "コードを書いた時点でエラーを検出できる",
      "エディタが自動補完（オートコンプリート）を提供しやすくなる",
      "APIのレスポンスなど外部から受け取るデータも実行時に型が保証される",
      "関数の引数に何の型を渡すべきかがコードを読むだけで分かる",
    ],
    correctIndex: 2,
    explanation:
      "TypeScript の型チェックはコンパイル時のみ。API のレスポンスや fetch で取得したデータは実行時に動的に来るため、TypeScript の型定義だけでは内容は保証されない。たとえば `const user: User = await fetchUser()` と書いてもサーバーが全く違うデータを返す可能性がある。外部データの型を実行時に検証したい場合は Zod などのバリデーションライブラリを使う必要がある。",
  },
];
