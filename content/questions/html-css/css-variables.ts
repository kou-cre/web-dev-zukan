import type { DrillQuestion } from "@/components/PageDrill";

export const cssVariablesQuestions: DrillQuestion[] = [
  {
    id: "css-variables-q1",
    question: "CSS変数（カスタムプロパティ）を定義する正しい書き方はどれ？",
    choices: [
      "$color-primary: #3b82f6;",
      "--color-primary: #3b82f6;",
      "var(color-primary): #3b82f6;",
      "@variable color-primary: #3b82f6;",
    ],
    correctIndex: 1,
    explanation:
      "CSS変数はダッシュ2つ（--）で始まる名前で定義します。`--color-primary: #3b82f6;` が正しい書き方です。`$` はSassの変数記法で、通常のCSSでは使えません。`var()` は変数を参照するときに使う関数で、定義には使いません。",
  },
  {
    id: "css-variables-q2",
    question: "CSS変数を参照する（呼び出す）正しい書き方はどれ？",
    choices: [
      "color: $color-primary;",
      "color: --color-primary;",
      "color: var(--color-primary);",
      "color: css-var(--color-primary);",
    ],
    correctIndex: 2,
    explanation:
      "CSS変数を参照するには `var(--変数名)` という書き方を使います。`var()` 関数の中にダッシュ2つから始まる変数名を書きます。`$` 記法はSass専用、`--color-primary` のまま値として書いても機能しません。",
  },
  {
    id: "css-variables-q3",
    question: ":root セレクタにCSS変数を定義する利点として正しいのはどれ？",
    choices: [
      "アニメーションが高速になる",
      "ページのどの要素からでも変数を参照できる（グローバルスコープ）",
      "CSSファイルのサイズが小さくなる",
      "JavaScriptからのアクセスができなくなる",
    ],
    correctIndex: 1,
    explanation:
      "`:root` はHTML文書全体のルート要素（htmlタグ）に対応するセレクタです。ここに定義したCSS変数は子孫のすべての要素から参照できるため、事実上グローバル変数として機能します。特定のコンポーネント内だけで使いたい変数は、そのコンポーネントのセレクタに定義することでスコープを狭めることもできます。",
  },
  {
    id: "css-variables-q4",
    question: "CSS変数を使ったダークモードの実装で、最も適切な方法はどれ？",
    choices: [
      "ダークモード用の別CSSファイルを全部書き直す",
      ":root に色変数を定義し、[data-theme='dark'] セレクタで変数の値だけを上書きする",
      "JavaScriptで全要素のcolorプロパティを直接変更する",
      "画像を全てdark用に差し替える",
    ],
    correctIndex: 1,
    explanation:
      "CSS変数の最大の活用例がダークモードです。ライトモードの色を `:root` に変数として定義し、ダークモード時は `[data-theme='dark']` セレクタで変数の値だけを上書きします。残りのCSSは変数を参照しているだけなので、変数が変われば自動的に全体が更新されます。JavaScriptはdata-theme属性を切り替えるだけでよく、CSSの書き直しは不要です。",
  },
  {
    id: "css-variables-q5",
    question: "CSS変数 `--color-primary: #3b82f6` を20箇所で使っている状態で、色を #f97316 に変えたい場合、最小限の変更回数は？",
    choices: [
      "20回（全箇所を手動で変更）",
      "2回（定義と各ファイルの参照先を変更）",
      "1回（:root の変数定義の値を変えるだけ）",
      "ツールを使わないと変更できない",
    ],
    correctIndex: 2,
    explanation:
      "CSS変数の最大のメリットが「1箇所の変更で全体が更新される」点です。`:root` で定義した変数の値を変えるだけで、`var(--color-primary)` を使っているすべての場所が自動的に更新されます。変数なしで直書きしていると20箇所を検索・置換する必要がありますが、変数があれば1行の変更で済みます。",
  },
];
