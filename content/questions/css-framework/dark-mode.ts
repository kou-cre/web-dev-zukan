import type { DrillQuestion } from "@/components/PageDrill";

export const darkModeQuestions: DrillQuestion[] = [
  {
    id: "dark-mode-q1",
    question: "Tailwind CSS で `dark:bg-gray-900` と書いたとき、このクラスが適用される条件はどれ？",
    choices: [
      "ユーザーのOSがダークモードに設定されているとき（自動）",
      "html タグに `class=\"dark\"` が付いているとき",
      "tailwind.config.ts に darkMode を設定していなくても常に動作する",
      "JavaScript で `document.body.classList.add('dark')` を実行したとき",
    ],
    correctIndex: 1,
    explanation:
      "Tailwindのデフォルトダークモード戦略は `class` モードです。`html` タグ（またはルート要素）に `class=\"dark\"` が付いているとき、`dark:` プレフィックスが付いたクラスが適用されます。OSの設定を自動検知するには `media` モード（tailwind.config.ts で `darkMode: 'media'` と設定）を使いますが、next-themeのようなライブラリはclassモードで制御するのが一般的です。",
  },
  {
    id: "dark-mode-q2",
    question: "Next.js + Tailwind CSS でダークモード切り替えを実装する際によく使われるライブラリはどれ？",
    choices: [
      "react-dark-mode",
      "next-themes",
      "tailwind-dark",
      "use-color-scheme",
    ],
    correctIndex: 1,
    explanation:
      "`next-themes` はNext.jsアプリでのテーマ切り替えをシンプルに実現するライブラリです。ThemeProviderコンポーネントでアプリ全体をラップし、`useTheme` フックで現在のテーマ取得・切り替えができます。html要素へのclassの付け外しを自動で管理してくれるため、Tailwindのclassモードのダークモードとベストマッチしています。",
  },
  {
    id: "dark-mode-q3",
    question: "next-themes を使うとき、`ThemeProvider` を配置すべき場所はどこ？",
    choices: [
      "各ページの先頭（app/page.tsx の最上位）",
      "app/layout.tsx の body タグ内（アプリ全体をラップ）",
      "ダークモード切り替えボタンのコンポーネント内のみ",
      "next.config.ts の plugins 設定",
    ],
    correctIndex: 1,
    explanation:
      "`ThemeProvider` はアプリ全体のテーマ状態を管理するため、`app/layout.tsx` の `<body>` 直下に配置してすべてのページをラップします。これによりどのページでも `useTheme` フックが使えるようになります。ただし `ThemeProvider` は Client Component なので、`'use client'` ディレクティブが必要な点に注意が必要です。",
  },
  {
    id: "dark-mode-q4",
    question: "Tailwind CSS で「ライトモード時は白背景・ダークモード時は濃いグレー背景」にするクラスはどれ？",
    choices: [
      "bg-white dark:bg-gray-900",
      "bg-white|dark:bg-gray-900",
      "light:bg-white dark:bg-gray-900",
      "bg-[light:white dark:gray-900]",
    ],
    correctIndex: 0,
    explanation:
      "ライトモードのスタイルはプレフィックスなしで書き、ダークモードのスタイルは `dark:` プレフィックスを付けます。`bg-white dark:bg-gray-900` はスペースで区切った通常の複数クラスの書き方です。`|` や `light:` プレフィックスはTailwindに存在しません。ダークモードクラスは常に「ダークモード時の上書き」として機能します。",
  },
  {
    id: "dark-mode-q5",
    question: "shadcn/ui を使ったプロジェクトでダークモードの色を一括管理するベストプラクティスはどれ？",
    choices: [
      "各コンポーネントに dark:bg-* dark:text-* を個別に書く",
      "globals.css の .dark クラス内でCSS変数（--background等）の値を上書きする",
      "JavaScript で全要素のstyleを動的に変更するスクリプトを書く",
      "ライト用とダーク用の2セットのコンポーネントを作る",
    ],
    correctIndex: 1,
    explanation:
      "shadcn/uiはCSS変数でテーマを管理しています。`globals.css` に `:root { --background: oklch(...) }` でライトモードの値を定義し、`.dark { --background: oklch(...) }` でダークモードの値を上書きします。こうすることで `dark:` プレフィックスを各コンポーネントに散らばらせることなく、CSS変数1箇所を変えるだけでテーマ全体が切り替わります。",
  },
];
