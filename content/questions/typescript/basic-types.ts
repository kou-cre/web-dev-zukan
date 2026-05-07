import type { DrillQuestion } from "@/components/PageDrill";

export const basicTypesQuestions: DrillQuestion[] = [
  {
    id: "basic-types-q1",
    question:
      "TypeScript で `const message = \"こんにちは\"` と書いたとき、message の型は何と推論されるか？",
    choices: ["any", "object", "string", "text"],
    correctIndex: 2,
    explanation:
      "ダブルクォートで囲まれたリテラルは string 型。TypeScript の型推論は初期値を見て自動で型を判断する。`const message = \"こんにちは\"` と書くだけで message が string 型であることを TypeScript が認識する。`:string` と明示する必要はない。",
  },
  {
    id: "basic-types-q2",
    question:
      "関数の引数に型アノテーションを書かないといけない理由として最も正しいのはどれ？",
    choices: [
      "TypeScript のルールとして必須だから",
      "呼び出し元がどんな型を渡すか分からないため、TypeScript が型を推論できないから",
      "引数に型を書かないとコードが実行できないから",
      "型推論は const 変数にしか効かないから",
    ],
    correctIndex: 1,
    explanation:
      "変数は初期値から型を推論できるが、関数の引数は呼び出し元が何を渡すか分からないため TypeScript には推論の材料がない。だから引数には明示的に型を書く必要がある。型を書かないと引数が暗黙的に any 型になり、型チェックが機能しなくなる（strictモードではエラーになる）。",
  },
  {
    id: "basic-types-q3",
    question:
      "次のうち、TypeScript で型エラーになるコードはどれ？",
    choices: [
      "const count: number = 0;",
      "const names: string[] = [\"マジ\", \"マスター\"];",
      "const age: string = 25;",
      "const isActive: boolean = true;",
    ],
    correctIndex: 2,
    explanation:
      "25 は number リテラルだが、変数 age の型は string と宣言されている。number を string の変数に代入しようとしているため型エラーになる。TypeScript は型の不一致をコンパイル時に検出する。他の選択肢はすべて型が一致しているため正しいコード。",
  },
  {
    id: "basic-types-q4",
    question:
      "TypeScript で「文字列の配列」を表す型の正しい書き方はどれ？",
    choices: ["Array.string", "string()", "string[]", "strings"],
    correctIndex: 2,
    explanation:
      "文字列の配列は `string[]` と書く。これは `Array<string>` と同等の意味。同様に数値の配列は `number[]`、真偽値の配列は `boolean[]` と書く。`string()` は関数呼び出しの形で型には使えない。`strings` は TypeScript に存在しない型名。",
  },
  {
    id: "basic-types-q5",
    question:
      "`let result: string;` と書いた後、`result = 42;` と代入しようとしたときどうなるか？",
    choices: [
      "42 が自動的に文字列に変換されて代入される",
      "result の型が number に変わる",
      "型エラーが出る（string に number は代入できない）",
      "エラーなく実行され、result に 42 が入る",
    ],
    correctIndex: 2,
    explanation:
      "変数 result は string 型として宣言されているため、number を代入しようとすると型エラーになる。TypeScript は型の一致を厳密に確認し、暗黙的な型変換は行わない。JavaScript なら `let result; result = 42;` は問題なく動くが、TypeScript では宣言時に型を決めた以上その型しか入れられない。",
  },
];
