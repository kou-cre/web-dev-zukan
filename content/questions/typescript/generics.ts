import type { DrillQuestion } from "@/components/PageDrill";

export const genericsQuestions: DrillQuestion[] = [
  {
    id: "generics-q1",
    question:
      "ジェネリクスの <T> が表しているものとして最も正しい説明はどれ？",
    choices: [
      "HTML のタグを表す特殊な記法",
      "関数に渡せる引数の最大数",
      "型のプレースホルダー。呼び出し時に具体的な型に置き換えられる",
      "エラーを無視するための記法",
    ],
    correctIndex: 2,
    explanation:
      "<T> は「型の変数（プレースホルダー）」。関数やクラスを定義するときに「T という名前で型を受け取ります」と宣言しておき、呼び出し時に具体的な型（string・number など）を指定するか推論させる。T は Type の略が一般的だが、任意の名前にできる（K, V, U なども使われる）。HTMLタグや引数の数とは無関係。",
  },
  {
    id: "generics-q2",
    question:
      "次の関数で `identity(\"hello\")` を呼び出したとき、TypeScript が推論する戻り値の型はどれ？\n\n`function identity<T>(value: T): T { return value; }`",
    choices: ["any", "T", "string", "void"],
    correctIndex: 2,
    explanation:
      "`identity<T>(value: T): T` という定義で `identity(\"hello\")` と呼ぶと、\"hello\" が string リテラルなので T = string と推論される。関数の戻り値も T = string になるため、result の型は string になる。型推論があるため `identity<string>(\"hello\")` と明示しなくても同じ結果になる。",
  },
  {
    id: "generics-q3",
    question:
      "React の useState でジェネリクスを明示する必要がある場面として最も正しいのはどれ？",
    choices: [
      "すべての useState で必ず明示しなければならない",
      "初期値が null や空配列など、型が推論できない場合",
      "useState を関数型コンポーネントの中で使う場合のみ",
      "クラスコンポーネントで使う場合のみ",
    ],
    correctIndex: 1,
    explanation:
      "`useState(0)` なら number と推論されるため明示不要。`useState(\"\")` なら string と推論される。しかし `useState(null)` だと「null 型しか入れられない」と推論されてしまい、後から User 型を setUser で入れようとするとエラーになる。このような場合に `useState<User | null>(null)` と明示する。空配列 `useState([])` も同様に型が不明なため `useState<string[]>([])` と明示が必要。",
  },
  {
    id: "generics-q4",
    question:
      "ジェネリクスと any の最大の違いとして最も正しいのはどれ？",
    choices: [
      "ジェネリクスは任意の型を受け入れられないが、any は何でも受け入れられる",
      "any を使うと実行速度が下がるが、ジェネリクスは変わらない",
      "ジェネリクスは型安全を保ちながら柔軟性を実現するが、any は型チェックを無効化する",
      "ジェネリクスはクラスにしか使えないが、any は関数でも使える",
    ],
    correctIndex: 2,
    explanation:
      "any を使うと TypeScript の型チェックが完全に無効化される。一方ジェネリクスは「T に決まった型以外は入れられない」という約束を守りながら、呼び出し元が型を決める柔軟性がある。`identity<string>(\"hello\")` の戻り値は string なのでエディタの補完が効くが、any の戻り値は any なので補完が効かない。ジェネリクスは実行速度と無関係。",
  },
  {
    id: "generics-q5",
    question:
      "次のコードで型エラーが起きる呼び出しはどれ？\n\n`function getLength<T extends { length: number }>(value: T): number { return value.length; }`",
    choices: [
      "getLength(\"hello\")",
      "getLength([1, 2, 3])",
      "getLength(42)",
      "getLength(\"typescript\")",
    ],
    correctIndex: 2,
    explanation:
      "`T extends { length: number }` は「T は length プロパティ（number 型）を持つ型に限定する」という制約。文字列（\"hello\"）と配列（[1, 2, 3]）は両方 length プロパティを持つため OK。しかし数値 42 は length プロパティを持たないため、この制約を満たさずエラーになる。制約付きジェネリクスは「何でも受け取れるが最低限の条件を保証する」という仕組み。",
  },
];
