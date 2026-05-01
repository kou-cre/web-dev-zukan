import type { DrillQuestion } from "@/components/PageDrill";

export const modulesQuestions: DrillQuestion[] = [
  {
    id: "modules-q1",
    question:
      "ESモジュールにおける export と import の役割として最も適切な説明はどれ？",
    choices: [
      "export は変数を画面に出力し、import はユーザーからの入力を受け取る",
      "export は他のファイルから使える状態にすること、import は使いたい部品を読み込むこと",
      "export はファイルを削除し、import はファイルを復元する",
      "export と import は同じ意味で、書き方の好みでどちらでも使える",
    ],
    correctIndex: 1,
    explanation:
      "家電量販店のたとえで言えば、export は「売り場に商品を陳列して、他のフロアから買いに来られる状態にする」こと。import は「必要な商品を買いに行く」こと。1ファイル1ファイルが小さな専門売り場で、export で公開した部品だけが他から使える。export していない関数や変数はそのファイルの中だけで完結する「私物」になる。",
  },
  {
    id: "modules-q2",
    question:
      "default export と named export の違いとして正しいのはどれ？",
    choices: [
      "default export は1ファイルに何個でも書けるが、named export は1つだけ",
      "default export は1ファイルに1つだけで import 時に名前を自由につけられる、named export は複数可で import 時は {} で正確な名前が必要",
      "default export は古い書き方で、named export だけが現代のJavaScriptで使える",
      "両者に違いはなく、どちらを使っても結果は同じ",
    ],
    correctIndex: 1,
    explanation:
      "default export は「その売り場の看板商品」。1ファイルに1つだけで、import 側は `import Foo from './foo'` のように好きな名前をつけられる。named export は「個別商品」で複数置ける。import 側は `import { add, PI } from './utils'` と {} で名前を指定する必要があり、`as` でリネームもできる。Reactのコンポーネントは慣習的に default export、ユーティリティ関数群は named export が多い。",
  },
  {
    id: "modules-q3",
    question:
      "Tree Shaking（ツリーシェイキング）とは何のこと？",
    choices: [
      "ファイルをアルファベット順に並べ替える機能",
      "木構造のデータを揺らして並び替えるアルゴリズム",
      "import されているのに実際には使われていないコードを、ビルド時に削除してバンドルサイズを小さくする最適化",
      "ブラウザのキャッシュを定期的に揺らして消す機能",
    ],
    correctIndex: 2,
    explanation:
      "Tree Shaking は「使っていない枝（コード）を揺り落とす」ように、未使用のコードをビルド時に削除する最適化。これが効くのは ESModules が「静的解析できる」=「どこからどこへ何が import されているかがビルド時に判明する」から。CommonJS は実行時に require が動くので、未使用判定が難しく Tree Shaking が効きにくい。named export を使い、必要なものだけ import する習慣が、結果的にバンドルサイズを小さく保つ。",
  },
  {
    id: "modules-q4",
    question:
      "CommonJS（require）と ESModules（import）の違いとして正しいのはどれ？",
    choices: [
      "CommonJS は実行時に動的読み込み・Tree Shaking 非対応、ESModules は静的解析・Tree Shaking 対応",
      "CommonJS と ESModules は完全に同じもので、書き方が違うだけ",
      "ESModules は Node.js でしか動かず、ブラウザでは使えない",
      "CommonJS は最新の規格で、ESModules は古い書き方",
    ],
    correctIndex: 0,
    explanation:
      "CommonJS（`const x = require('./x')`）は Node.js が古くから使ってきた仕組みで、`require` が実行時に呼ばれるためビルド時にどこから何を読み込むか確定できない。一方 ESModules（`import x from './x'`）は静的解析できる構文設計になっていて、ビルド時に依存関係が完全にわかる。だから Tree Shaking が効き、バンドルが軽くなる。Next.jsを含む現代のフロントエンドはほぼ ESModules 前提。",
  },
  {
    id: "modules-q5",
    question:
      "Next.js プロジェクトで `import { Button } from '@/components/Button'` と書ける理由として最も近いのはどれ？",
    choices: [
      "Next.js は @ で始まるファイルをすべて自動生成する",
      "tsconfig.json などで `@/*` を `src/*`（プロジェクトルート）にマッピングするパスエイリアスが設定されているため",
      "@ はインターネット上の特殊な記号で、自動的にどこかから取得される",
      "Next.js のバグで、@ を書くと相対パスに自動変換される",
    ],
    correctIndex: 1,
    explanation:
      "`@/` は Next.js が自動で用意するパスエイリアス。tsconfig.json の `paths` 設定で「`@/*` はプロジェクトルート（または src/）以下のファイル」とマッピングされている。これがあると `../../../components/Button` のような長い相対パスを書かずに済み、ファイルを移動してもパスが壊れにくい。バレルファイル（index.ts で複数の export をまとめ直すパターン）と組み合わせると、`@/components` のような短い import も書けるようになる。",
  },
];
