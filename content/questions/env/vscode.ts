import type { DrillQuestion } from "@/components/PageDrill";

export const vscodeQuestions: DrillQuestion[] = [
  {
    id: "vscode-q1",
    question: "VSCodeがメモ帳より開発に適している最大の理由はどれ？",
    choices: [
      "有料のソフトウェアなので品質が高い",
      "コードのミスをリアルタイムで検出・補完し、Git操作やターミナルまで統合できる",
      "日本語の入力ができる",
      "ファイルを自動的にクラウドに保存してくれる",
    ],
    correctIndex: 1,
    explanation:
      "VSCodeはコードを書きながらリアルタイムでエラーを検出（ESLint）、自動補完（IntelliSense）、保存時の自動整形（Prettier）、Gitパネル、内蔵ターミナルなどが統合されています。メモ帳はテキストを書くだけで、これらの機能はありません。VSCodeは無料なので『有料だから品質が高い』は誤りです。",
  },
  {
    id: "vscode-q2",
    question: "Prettier 拡張機能の役割として正しいのはどれ？",
    choices: [
      "コードのバグ（論理的な誤り）を検出して修正する",
      "保存時にコードのインデント・引用符・括弧の位置などを自動的に整形する",
      "コードの実行速度を最適化する",
      "コードをブラウザでプレビュー表示する",
    ],
    correctIndex: 1,
    explanation:
      "Prettierはコードフォーマッター（整形ツール）です。保存時に自動でインデントのズレ・括弧の位置・引用符の統一などを整形します。バグの検出はESLintの役割で、Prettierはあくまで見た目の整形に特化しています。この2つは役割が異なり、組み合わせて使うのが一般的です。",
  },
  {
    id: "vscode-q3",
    question: "ESLintとPrettierの違いとして正しい説明はどれ？",
    choices: [
      "ESLintはMicrosoft製、PrettierはFacebook製で、機能は全く同じ",
      "ESLintはコードの問題（潜在的なバグ・ルール違反）を検出し、Prettierはコードの見た目（フォーマット）を整形する",
      "ESLintはJavaScript専用、PrettierはTypeScript専用",
      "どちらもコードを整形するが、ESLintの方が高機能",
    ],
    correctIndex: 1,
    explanation:
      "ESLintはコードの問題を検出するリンター（lint = 糸くずを取る）で、未使用の変数・存在しない関数の呼び出し・ルール違反などを指摘します。Prettierはフォーマッターで、コードの見た目（インデント・引用符・行末のカンマなど）を整えます。2つは役割が異なるため、両方入れて使うのが標準的なセットアップです。",
  },
  {
    id: "vscode-q4",
    question: "settings.json に 'editor.formatOnSave': true を追加すると何が起きるか？",
    choices: [
      "ファイルを開くたびに自動的に整形される",
      "ファイルを保存するたびにデフォルトフォーマッター（Prettierなど）が自動的に実行される",
      "settings.json を保存したときだけ整形が実行される",
      "コードを書くたびにリアルタイムで整形される",
    ],
    correctIndex: 1,
    explanation:
      "formatOnSave は『保存時（Ctrl+S）に自動でフォーマット』の設定です。これをtrueにすると、ファイルを保存するたびにPrettierなどのフォーマッターが自動で実行されます。手動で整形コマンドを実行する必要がなくなるため、コードを常にきれいな状態に保てます。",
  },
  {
    id: "vscode-q5",
    question: "VSCodeの拡張機能を大量に入れすぎると起きる問題として正しいのはどれ？",
    choices: [
      "拡張機能の数に上限があり、一定数を超えるとインストールできなくなる",
      "起動時間が遅くなりメモリ消費が増える。使っていない拡張機能は無効化や削除を検討すべき",
      "拡張機能同士が必ず競合してエラーが発生する",
      "Marketplaceのアカウントがペナルティを受ける",
    ],
    correctIndex: 1,
    explanation:
      "VSCodeは拡張機能を有効にするたびに起動時のメモリ消費と起動時間が増加します。入れすぎると起動が数秒〜十数秒遅くなることもあります。使っていない拡張機能は無効化（Disable）するだけでも改善できます。最初は5〜10本程度から始め、必要になってから追加するのが合理的です。",
  },
];
