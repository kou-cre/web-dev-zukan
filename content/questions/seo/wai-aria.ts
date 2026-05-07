import type { DrillQuestion } from "@/components/PageDrill";

export const waiAriaQuestions: DrillQuestion[] = [
  {
    id: "wai-aria-q1",
    question: "aria-label 属性の主な使い方として正しいのはどれですか？",
    choices: [
      "要素をスクリーンリーダーから完全に隠すための属性",
      "テキストのないアイコンボタンなどの要素に、スクリーンリーダーが読み上げる名前を付けるための属性",
      "要素にCSSスタイルのラベルを追加するための属性",
      "フォームの入力フィールドに補足説明を関連付けるための属性",
    ],
    correctIndex: 1,
    explanation:
      "aria-label はスクリーンリーダーが読み上げる要素の名前を指定します。特にアイコンのみで構成されたボタン（テキストがない）などに使い、aria-label='閉じる' と書くと「閉じる、ボタン」と読み上げられます。補足説明の関連付けは aria-describedby の役割です。",
  },
  {
    id: "wai-aria-q2",
    question: "div タグでボタンを作成した場合に必要なアクセシビリティ対応として適切なものはどれですか？",
    choices: [
      "style='cursor: pointer' を追加するだけで十分",
      "role='button'・tabindex='0'・onKeyDown（Enter/Spaceキー対応）の3点セットが必要",
      "aria-label を付けるだけで button タグと同等のアクセシビリティになる",
      "div に onClick を付ければ自動的にキーボード操作も対応される",
    ],
    correctIndex: 1,
    explanation:
      "div でボタンの見た目を作る場合、3点が必要です。role='button' でスクリーンリーダーに「これはボタン」と伝える、tabindex='0' でTab キーでフォーカスできるようにする、onKeyDown で Enter/Space キーを処理する。ただしこの対応は手間がかかるため、本来は button タグを使う方が推奨されます。",
  },
  {
    id: "wai-aria-q3",
    question: "aria-describedby と aria-label の違いとして正しいのはどれですか？",
    choices: [
      "aria-describedby は主要な名前、aria-label は補足説明として使う",
      "aria-label は要素の名前（何であるか）、aria-describedby は補足説明（どんな状態か・詳細）を関連付ける",
      "どちらも同じ役割で、好みで使い分けてよい",
      "aria-describedby はリンク専用、aria-label はボタン専用の属性",
    ],
    correctIndex: 1,
    explanation:
      "aria-label は要素そのものの名前を提供します（例: ボタンの「閉じる」）。aria-describedby は別の要素の ID を参照して補足説明を関連付けます（例: フォームフィールドとエラーメッセージを紐付けて「このフィールドには『メールアドレス形式が正しくありません』という説明がある」と伝える）。",
  },
  {
    id: "wai-aria-q4",
    question: "セマンティック HTML（button タグなど）がある場合、ARIA 属性は必要ですか？",
    choices: [
      "必要。すべての要素に ARIA 属性を追加するのがベストプラクティス",
      "通常は不要。セマンティック HTML が持つ意味で十分。ARIA は補完として必要な場合だけ使う",
      "必要。ARIA がないとスクリーンリーダーは HTML タグの意味を認識できない",
      "不要。ARIA は古い技術で、現代のスクリーンリーダーは不要としている",
    ],
    correctIndex: 1,
    explanation:
      "セマンティック HTML を正しく使えば、多くの場合 ARIA は不要です。button タグには自動的に「ボタン」の role が付きます。nav タグは「ナビゲーション」として認識されます。ARIA の原則は「No ARIA is better than Bad ARIA」。不適切な ARIA を追加するより、正しいセマンティック HTML の方がアクセシビリティが高くなります。",
  },
  {
    id: "wai-aria-q5",
    question: "装飾的なアイコン（意味のない飾り画像）をスクリーンリーダーから隠すには何を使いますか？",
    choices: [
      "display: none のスタイルを適用する",
      "visibility: hidden のスタイルを適用する",
      "aria-hidden='true' 属性を付ける",
      "role='presentation' のみで十分",
    ],
    correctIndex: 2,
    explanation:
      "装飾的な要素（テキストの横の飾りアイコンなど）は aria-hidden='true' を付けることでスクリーンリーダーから隠せます。display: none や visibility: hidden は視覚的にも隠れてしまいます。role='presentation' は要素の意味を打ち消しますが、内容のテキストは読まれます。意味のない装飾 SVG は aria-hidden='true' で隠すのが最適です。",
  },
];
