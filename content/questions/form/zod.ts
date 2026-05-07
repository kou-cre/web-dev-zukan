import type { DrillQuestion } from "@/components/PageDrill";

export const zodQuestions: DrillQuestion[] = [
  {
    id: "zod-q1",
    question: "Zodのスキーマから TypeScript の型を自動生成するには何を使いますか？",
    choices: [
      "z.typeof(schema)",
      "z.infer<typeof schema>",
      "z.extract<typeof schema>",
      "z.type<schema>",
    ],
    correctIndex: 1,
    explanation: "z.infer<typeof schema> でZodスキーマからTypeScriptの型を自動生成できます。これにより、interfaceを別途書く必要がなくなり、スキーマとTypeScript型の二重管理が解消されます。typeof schema はZodのスキーマ型を表し、z.infer はそのスキーマが検証する値の型を取り出します。",
  },
  {
    id: "zod-q2",
    question: "「8文字以上のパスワード」をZodで正しく定義したコードはどれですか？",
    choices: [
      "z.string().length(8)",
      "z.string().min(8, '8文字以上で入力してください')",
      "z.string({ min: 8 })",
      "z.password().min(8)",
    ],
    correctIndex: 1,
    explanation: "z.string() で文字列型を定義し、.min(8, 'エラーメッセージ') で最小文字数を設定します。第1引数が最小値、第2引数がバリデーション失敗時のエラーメッセージです。z.string().length(8) は「ちょうど8文字」を意味します。z.password() というメソッドはZodに存在しません。",
  },
  {
    id: "zod-q3",
    question: "safeParseとparseの違いとして正しいのはどれですか？",
    choices: [
      "safeParse はバリデーションをスキップする",
      "parse はエラー時にthrowし、safeParse はエラーをオブジェクトで返す",
      "safeParse はTypeScriptのみで使える",
      "parse と safeParse の動作は同じだが処理速度が異なる",
    ],
    correctIndex: 1,
    explanation: "parse はバリデーション失敗時に ZodError を throw するため try/catch が必要です。safeParse は { success: true, data: ... } または { success: false, error: ... } というオブジェクトを返すため、throw せずに結果を if文で分岐できます。フォームバリデーションでは safeParse が使いやすく推奨されます。",
  },
  {
    id: "zod-q4",
    question: "パスワードと確認パスワードの一致チェックをZodで実装する方法として正しいのはどれですか？",
    choices: [
      "z.object({ password: z.string(), confirm: z.string().equals(z.ref('password')) })",
      "z.object({ password: z.string(), confirm: z.string() }).refine(d => d.password === d.confirm)",
      "z.object({ password: z.string(), confirm: z.string() }).match()",
      "z.object({ password: z.string(), confirm: z.string() }).validate()",
    ],
    correctIndex: 1,
    explanation: "複数フィールドをまたいだバリデーション（フィールド間の関係チェック）には z.refine() を使います。refine は全フィールドの値が入ったオブジェクトを引数で受け取るコールバックを渡します。path オプションでエラーを紐付けるフィールドを指定できます。z.ref() や .match() .validate() はZodのAPIとして存在しません。",
  },
  {
    id: "zod-q5",
    question: "TypeScriptの型安全とZodのバリデーションの最大の違いとして正しいのはどれですか？",
    choices: [
      "TypeScriptは実行時にも型チェックを行うが、Zodはコンパイル時のみ",
      "TypeScriptはコンパイル時のチェックのみで、Zodは実行時にデータを検証する",
      "ZodはReactでのみ使える",
      "TypeScriptの型とZodは全く同じことをしている",
    ],
    correctIndex: 1,
    explanation: "TypeScriptの型チェックはコンパイル時（コードを書いている時・ビルド時）にのみ行われます。実際にアプリが動いているとき（実行時）に外部から届くデータの型は保証されません。Zodはランタイムに実際の値を検証するため、APIレスポンスやフォーム送信など「実行時に外から来るデータ」を安全に扱えます。",
  },
];
