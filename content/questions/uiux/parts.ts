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

export const partsAdvancedQuestions: DrillQuestion[] = [
  {
    id: "parts-adv-q1",
    level: "advanced",
    question: "入力フォームで「エラー状態」を適切に表示するための要件として最も重要なのはどれ？",
    choices: [
      "フィールドを赤くするだけで十分（色の変化で分かる）",
      "色の変化に加えて、エラー内容を文字で説明するメッセージを表示する",
      "エラーが出たらページ全体をリロードして最初からやり直させる",
      "エラーは送信後にまとめてリストで表示すれば十分",
    ],
    correctIndex: 1,
    explanation: "色だけのエラー表示はアクセシビリティ違反（色覚多様性の方に伝わらない）。「入力が正しくありません」ではなく「メールアドレスの形式が正しくありません（@が必要です）」のように具体的に。フィールドの下にリアルタイムで出すのがベストプラクティス。",
  },
  {
    id: "parts-adv-q2",
    level: "advanced",
    question: "「Disabled（無効）状態」のUIパーツを表現するとき、避けるべきことはどれ？",
    choices: [
      "opacity（透明度）を下げて視覚的に淡くする",
      "cursor: not-allowedでカーソルを変更する",
      "disabled状態のまま、なぜ使えないのかの説明を一切提供しない",
      "色を灰色系に変更して非アクティブを示す",
    ],
    correctIndex: 2,
    explanation: "Disabled状態で「なぜ使えないか」が分からないと、ユーザーはバグと思い込んだり、諦めてしまう。ツールチップ・インラインメッセージ・近くのテキストで「〇〇を入力すると送信できます」のように条件を示す設計が親切。",
  },
  {
    id: "parts-adv-q3",
    level: "advanced",
    question: "モーダルダイアログの「閉じるボタン」の配置として、最もUXが良いのはどれ？",
    choices: [
      "モーダルの中央下部に「閉じる」ボタンだけ配置",
      "右上のXボタン + Escキーで閉じる + 背景クリックで閉じる（複数の閉じ方を提供）",
      "閉じるボタンは不要（別ページに遷移するので）",
      "閉じるには送信ボタンを押すか、ブラウザの戻るボタンを使う",
    ],
    correctIndex: 1,
    explanation: "閉じ方は「右上のX / Escキー / 背景クリック」の3つを提供するのがベストプラクティス。1つだけだとユーザーによっては気づかない。送信させないと閉じられない設計はダークパターンの一種になることもある。",
  },
  {
    id: "parts-adv-q4",
    level: "advanced",
    question: "Primaryボタンの「hover状態」を設計するとき、最も推奨されるアプローチはどれ？",
    choices: [
      "完全に別の色に変える（例：青→赤）",
      "ボタンを消す",
      "同じ色相で明度を少し暗くする（HSLのL値を下げる）",
      "テキストの色だけを変える",
    ],
    correctIndex: 2,
    explanation: "hoverは「インタラクティブである」ことを強調する微妙な変化が適切。色相を変えると別のボタンに見える。同じ色相で明度を10〜15%下げる（または上げる）のがUIのベストプラクティス。Tailwind的には `hover:bg-blue-600` → `bg-blue-500` の関係。",
  },
];
