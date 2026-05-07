import type { DrillQuestion } from "@/components/PageDrill";

export const tailwindIntroQuestions: DrillQuestion[] = [
  {
    id: "tailwind-intro-q1",
    question: "Tailwind CSS の最大の特徴として正しいのはどれ？",
    choices: [
      "コンポーネントライブラリでUIをそのまま使える",
      "ユーティリティクラスをHTMLに直接書いてスタイルを適用する",
      "CSSファイルを一切書かずに設定ファイルだけでデザインできる",
      "JavaScriptでスタイルを動的に生成するランタイムCSS方式",
    ],
    correctIndex: 1,
    explanation:
      "Tailwind CSS は「ユーティリティファースト」のCSSフレームワークです。`text-xl`・`bg-blue-500`・`flex` のような小さなクラスをHTMLに直接指定してスタイルを組み上げます。コンポーネントをそのまま提供するのはBootstrapなど別のフレームワーク、JavaScriptランタイムは CSS-in-JS（styled-components等）の特徴です。",
  },
  {
    id: "tailwind-intro-q2",
    question: "Tailwind CSS で「テキストを白色にして太字にする」クラスの組み合わせとして正しいのはどれ？",
    choices: [
      "color-white font-bold",
      "text-white bold",
      "text-white font-bold",
      "white-text fw-bold",
    ],
    correctIndex: 2,
    explanation:
      "Tailwindのテキスト色は `text-{色名}` 、フォントウェイトは `font-{weight}` という命名規則です。`text-white` で白色、`font-bold` で太字になります。`color-white` や `bold` はTailwindのクラス名ではなく、`fw-bold` はBootstrapの記法です。",
  },
  {
    id: "tailwind-intro-q3",
    question: "Tailwind CSS がビルド時に未使用のCSSを自動で削除する仕組みを何という？",
    choices: [
      "Tree Shaking",
      "Dead Code Elimination",
      "PurgeCSS / Content Scanning",
      "CSS Minification",
    ],
    correctIndex: 2,
    explanation:
      "Tailwind v3以降はビルド時に `content` 設定で指定したファイルをスキャンし、実際に使用されているクラスのみを最終CSSに含めます（旧来はPurgeCSSと呼ばれていた仕組み）。これにより本番ビルドのCSSファイルサイズが大幅に削減されます。Tree Shakingは主にJavaScriptモジュールの最適化用語です。",
  },
  {
    id: "tailwind-intro-q4",
    question: "Tailwind CSS でボタンに「角丸・青背景・白テキスト・上下8px左右16pxのパディング」を付けるクラスとして正しいのはどれ？",
    choices: [
      "rounded bg-blue-500 text-white padding-y-8 padding-x-16",
      "rounded bg-blue-500 text-white py-2 px-4",
      "border-radius bg-blue text-white p-8-16",
      "corners-round background-blue color-white pad-8-16",
    ],
    correctIndex: 1,
    explanation:
      "Tailwindのスペーシングは4px単位（1単位 = 4px）です。`py-2`は上下8px（2×4px）、`px-4`は左右16px（4×4px）となります。`rounded` で標準的な角丸、`bg-blue-500` で青背景、`text-white` で白テキストです。`padding-y-8` などはTailwindの記法ではありません。",
  },
  {
    id: "tailwind-intro-q5",
    question: "Tailwind CSS で独自の色やフォントサイズを追加・カスタマイズするファイルはどれ？",
    choices: [
      "globals.css",
      "tailwind.config.ts（または tailwind.config.js）",
      "package.json の tailwind フィールド",
      ".tailwindrc",
    ],
    correctIndex: 1,
    explanation:
      "Tailwindのカスタマイズは `tailwind.config.ts`（または `.js`）の `theme.extend` セクションで行います。独自の色・フォントサイズ・スペーシング・ブレークポイントなどをここに追加することで、既存のデフォルト設定を保ちながら拡張できます。`globals.css` はグローバルCSSの場所ですが、Tailwindのカスタム設定には使いません。",
  },
];
