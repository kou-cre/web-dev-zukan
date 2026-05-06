import type { DrillQuestion } from "@/components/PageDrill";

export const partsQuestions: DrillQuestion[] = [
  {
    id: "parts-q1",
    question: "1画面に置くPrimaryボタンの理想数は？",
    choices: ["1つ", "2〜3つ", "4〜5つ", "制限なし"],
    correctIndex: 0,
    explanation:
      "Primaryは「この画面で一番やってほしいこと」を示すボタン。1画面に複数あると、ユーザーが迷う。補助アクションはSecondaryやGhostに格下げして、Primaryは原則1つに絞る。",
  },
  {
    id: "parts-q2",
    question: "ボタンの状態のうち最も忘れがちなのは？",
    choices: ["Default", "Hover", "Focus", "Disabled"],
    correctIndex: 2,
    explanation:
      "Focusはキーボード操作時のフォーカスリングで、忘れるとアクセシビリティが破綻する。outlineを消すだけで終わらせず、フォーカス時に視覚的にわかる状態を必ず用意する。",
  },
  {
    id: "parts-q3",
    question: "placeholderだけに情報を載せるのが良くない理由は？",
    choices: [
      "入力中に消えるから",
      "文字が短すぎるから",
      "古い仕様だから",
      "色が薄すぎるから",
    ],
    correctIndex: 0,
    explanation:
      "placeholderは入力を始めると消える。「何を入れる欄か」をplaceholderだけに頼ると、入力中に文脈を失う。ラベルは常に表示し、placeholderは例示にとどめる。",
  },
  {
    id: "parts-q4",
    question: "エラーメッセージの理想的なタイミングは？",
    choices: [
      "入力中に事前ガード",
      "フォーム送信後にのみ表示",
      "アラートで全画面通知",
      "表示しない",
    ],
    correctIndex: 0,
    explanation:
      "事後通知（送信後）より事前ガード（入力中）の方がユーザーは10倍楽。文字数や形式は入力中にチェックして、その場で「あと2文字」「メール形式が違う」と教える方が親切。",
  },
  {
    id: "parts-q5",
    question: "Destructive（破壊的）ボタンの色として一般的なのは？",
    choices: ["青", "緑", "赤", "グレー"],
    correctIndex: 2,
    explanation:
      "削除・退会・キャンセルなど取り消せない操作は赤を使うのが慣例。赤は「危険・止まれ」のメンタルモデルがあり、ユーザーが踏みとどまるきっかけになる。",
  },
];
