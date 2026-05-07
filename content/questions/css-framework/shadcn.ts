import type { DrillQuestion } from "@/components/PageDrill";

export const shadcnQuestions: DrillQuestion[] = [
  {
    id: "shadcn-q1",
    question: "shadcn/ui の最大の特徴として正しいのはどれ？",
    choices: [
      "npmパッケージとしてインストールして使うコンポーネントライブラリ",
      "コンポーネントのコードを自分のプロジェクトにコピーして使う方式",
      "CSSのみで動作しJavaScriptが不要なUIフレームワーク",
      "Reactに依存せずあらゆるフレームワークで使えるライブラリ",
    ],
    correctIndex: 1,
    explanation:
      "shadcn/ui は `npx shadcn add button` のようなCLIコマンドで、コンポーネントのソースコードを自分のプロジェクトに直接コピーします。npmパッケージとして依存関係に追加されるわけではないので、コードを自由にカスタマイズできます。Bootstrap やMaterial UIのように「ライブラリに依存し続ける」方式とは根本的に異なります。",
  },
  {
    id: "shadcn-q2",
    question: "shadcn/ui の内部で使われているアクセシビリティ対応のプリミティブライブラリはどれ？",
    choices: [
      "Headless UI",
      "Reach UI",
      "Radix UI",
      "Ark UI",
    ],
    correctIndex: 2,
    explanation:
      "shadcn/ui は Radix UI のプリミティブコンポーネント（キーボード操作・フォーカス管理・WAI-ARIA対応済み）を基盤にして、Tailwind CSS でスタイリングを加えたものです。Radix UIが提供するアクセシビリティの堅牢さと、Tailwindの柔軟なスタイリングを組み合わせているのがshadcn/uiの強みです。",
  },
  {
    id: "shadcn-q3",
    question: "shadcn/ui の `cn()` 関数の役割として正しいのはどれ？",
    choices: [
      "コンポーネントの名前（component name）を取得するユーティリティ",
      "クラス名をマージして競合を解決するユーティリティ関数",
      "CSS変数の値を読み取る関数",
      "コンポーネントをキャッシュしてパフォーマンスを向上させる",
    ],
    correctIndex: 1,
    explanation:
      "`cn()` は `clsx` と `tailwind-merge` を組み合わせた関数です。複数のクラス文字列を結合しつつ、Tailwindクラスの競合（例：`p-4` と `p-2` が両方あるとき）を自動で解決します。コンポーネントのデフォルトクラスと外部から渡されるクラスをきれいにマージするために使います。",
  },
  {
    id: "shadcn-q4",
    question: "shadcn/ui でテーマカラーをカスタマイズする際に使う仕組みはどれ？",
    choices: [
      "tailwind.config.ts の colors フィールドに直接HEXコードを書く",
      "CSS変数（--background, --foreground, --primary など）を globals.css で定義する",
      "各コンポーネントファイルの defaultProps で色を上書きする",
      "theme.json ファイルを作成して色を定義する",
    ],
    correctIndex: 1,
    explanation:
      "shadcn/ui はCSS変数（カスタムプロパティ）でテーマを管理します。`globals.css` に `--background: oklch(...)` などを定義し、Tailwindの設定でその変数を参照することで、ライト/ダークモードの切り替えも1箇所のCSS変数の値を変えるだけで対応できます。HEXコードを直接散りばめる方式より保守性が高い設計です。",
  },
  {
    id: "shadcn-q5",
    question: "既存のプロジェクトに shadcn/ui をセットアップするコマンドとして正しいのはどれ？",
    choices: [
      "npm install shadcn-ui",
      "npx shadcn-ui@latest init",
      "npx shadcn@latest init",
      "npm install @shadcn/ui --save",
    ],
    correctIndex: 2,
    explanation:
      "現在の推奨セットアップコマンドは `npx shadcn@latest init` です（パッケージ名は `shadcn`、ハイフンなし）。以前は `shadcn-ui` という名前でしたが現在は `shadcn` に変更されています。このコマンドを実行すると `components.json` の設定が行われ、必要な依存関係が追加されます。`npm install shadcn-ui` では古いバージョンまたは非公式パッケージが入る場合があります。",
  },
];
