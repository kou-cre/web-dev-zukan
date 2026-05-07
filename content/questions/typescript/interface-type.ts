import type { DrillQuestion } from "@/components/PageDrill";

export const interfaceTypeQuestions: DrillQuestion[] = [
  {
    id: "interface-type-q1",
    question:
      "次の interface の定義で、email プロパティがなくてもエラーにならないのはなぜ？\n\n`interface User { name: string; age: number; email?: string; }`",
    choices: [
      "email は string 型なので省略可能だから",
      "email の後に `?` が付いているため省略可能プロパティとして定義されているから",
      "interface は全てのプロパティが省略可能だから",
      "email は最後のプロパティだから自動的に省略可能になるから",
    ],
    correctIndex: 1,
    explanation:
      "TypeScript では、プロパティ名の後に `?` を付けると「省略可能プロパティ」になる。`email?: string` と書くと、email がなくてもエラーにならず、ある場合は string 型でなければならないという意味になる。`?` がないプロパティは必須で、省略するとエラーになる。型が string かどうか・最後かどうかは関係ない。",
  },
  {
    id: "interface-type-q2",
    question:
      "interface と type の違いについて正しい説明はどれ？",
    choices: [
      "interface はオブジェクト型のみ定義でき、type はオブジェクト型を定義できない",
      "type はユニオン型（string | number）を定義できるが、interface はできない",
      "interface は実行時にも型チェックが行われるが、type はコンパイル時のみ",
      "interface は再利用できないが、type は再利用できる",
    ],
    correctIndex: 1,
    explanation:
      "interface と type はどちらもオブジェクト形状を定義できるが、type には interface にできない書き方がある。代表的なのがユニオン型で、`type ID = string | number` のように複数の型のどちらかを受け入れる型は type でしか書けない。interface はオブジェクト形状に特化しており、プリミティブ型への別名付けやユニオン型の定義はできない。",
  },
  {
    id: "interface-type-q3",
    question:
      "次のコードで Admin 型が持つプロパティをすべて正しく挙げているのはどれ？\n\n`interface User { name: string; age: number; }\ninterface Admin extends User { role: string; }`",
    choices: [
      "role だけ",
      "name・age だけ",
      "name・age・role の3つ",
      "extends を使うと User の定義は上書きされるので role だけ",
    ],
    correctIndex: 2,
    explanation:
      "interface の extends は継承。Admin extends User と書くと、Admin は User の全プロパティ（name: string, age: number）を引き継ぎ、さらに独自のプロパティ（role: string）を追加する。つまり Admin 型の変数は name・age・role の3つ全て持つ必要がある。extends は上書きではなく「受け継いで拡張する」という意味。",
  },
  {
    id: "interface-type-q4",
    question:
      "React コンポーネントの Props を定義するとき、一般的に推奨されている方法はどれ？",
    choices: [
      "Props を定義せず、any 型を使う",
      "interface を使ってオブジェクト形状を定義する",
      "type を使うと Props が定義できないので使ってはいけない",
      "Props の型は自動で推論されるため、定義する必要はない",
    ],
    correctIndex: 1,
    explanation:
      "React の Props 型定義には interface を使うのが広く普及しているパターン。`interface ButtonProps { label: string; onClick: () => void; }` のように書いてコンポーネントの引数の型として使う。なお type でも同じことはできるが、interface の方が extends による拡張がしやすいため主流。Props は自動推論されないため必ず定義が必要。",
  },
  {
    id: "interface-type-q5",
    question:
      "次のうち、interface では書けず type でしか定義できない型はどれ？",
    choices: [
      "{ name: string; age: number }",
      "{ id: number; email?: string }",
      "string | number | boolean",
      "{ role: string } extends User",
    ],
    correctIndex: 2,
    explanation:
      "`string | number | boolean` はユニオン型で、`type ID = string | number | boolean` のように type でしか書けない。interface はオブジェクト形状の定義に特化しており、プリミティブ型の組み合わせや別名付けには使えない。オブジェクト形状の定義（選択肢1・2）は interface でも type でもどちらでも書ける。選択肢4は構文が間違っている。",
  },
];
