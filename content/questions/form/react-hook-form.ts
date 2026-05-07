import type { DrillQuestion } from "@/components/PageDrill";

export const reactHookFormQuestions: DrillQuestion[] = [
  {
    id: "react-hook-form-q1",
    question: "React Hook Formが制御コンポーネントより再レンダリングを減らせる理由として正しいのはどれですか？",
    choices: [
      "ReactではなくVue.jsを内部で使っているから",
      "入力中はDOMが値を保持し、Stateを更新しないから",
      "inputをメモ化しているから",
      "バリデーションを完全になくしているから",
    ],
    correctIndex: 1,
    explanation: "React Hook Formは非制御コンポーネント方式を採用しており、入力中はDOMが値を保持します。Stateを更新しないため、文字を入力するたびに再レンダリングが走りません。再レンダリングが発生するのは主に送信時とエラー表示時のみです。制御コンポーネントでは入力のたびにStateが更新され、n文字入力すればn回レンダリングされます。",
  },
  {
    id: "react-hook-form-q2",
    question: "React Hook FormのregisterをJSXで使う正しい書き方はどれですか？",
    choices: [
      "<input register='email' />",
      "<input {...register('email')} />",
      "<input ref={register('email')} />",
      "<input onChange={register('email')} />",
    ],
    correctIndex: 1,
    explanation: "register('email') はオブジェクト（ref・name・onChange・onBlurなどを含む）を返します。これをスプレッド構文（{...}）でinputに展開することで、必要な属性がすべて一括でセットされます。個別の属性（type='email'など）は別途渡す必要があります。",
  },
  {
    id: "react-hook-form-q3",
    question: "handleSubmitを使う正しいコードはどれですか？",
    choices: [
      "<form onSubmit={handleSubmit}>",
      "<form onSubmit={handleSubmit(onValid)}>",
      "<button onClick={handleSubmit(onValid)}>",
      "<form action={handleSubmit}>",
    ],
    correctIndex: 1,
    explanation: "handleSubmitは関数を引数に取り「バリデーション後にその関数を呼ぶ」ラッパー関数を返します。formのonSubmitに handleSubmit(onValid) として渡します。handleSubmit は自動的にe.preventDefault()も行うため、手動で呼ぶ必要はありません。",
  },
  {
    id: "react-hook-form-q4",
    question: "フィールドを離れたタイミングでバリデーションを実行したい場合、useFormに渡すオプションとして正しいのはどれですか？",
    choices: [
      "{ validate: 'blur' }",
      "{ mode: 'onBlur' }",
      "{ trigger: 'onBlur' }",
      "{ when: 'blur' }",
    ],
    correctIndex: 1,
    explanation: "useFormのmodeオプションでバリデーションのタイミングを制御できます。mode: 'onBlur' でフォーカス離脱時、mode: 'onChange' で入力のたびに、mode: 'onSubmit'（デフォルト）で送信時にバリデーションが実行されます。UX的には onBlur が推奨されることが多いです。",
  },
  {
    id: "react-hook-form-q5",
    question: "React Hook FormでZodによるバリデーションを統合するには何を使いますか？",
    choices: [
      "useForm({ schema: signupSchema })",
      "useForm({ resolver: zodResolver(signupSchema) })",
      "useForm({ validate: zodResolver(signupSchema) })",
      "useZodForm(signupSchema)",
    ],
    correctIndex: 1,
    explanation: "@hookform/resolversパッケージのzodResolverをuseFormのresolverオプションに渡すことで、ZodスキーマをReact Hook Formのバリデーションとして統合できます。これにより、registerのoptionsでバリデーションを書く必要がなくなり、スキーマ1つで型とバリデーションを一元管理できます。",
  },
];
