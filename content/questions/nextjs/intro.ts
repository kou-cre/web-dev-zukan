import type { DrillQuestion } from "@/components/PageDrill";

export const introQuestions: DrillQuestion[] = [
  {
    id: "nextjs-intro-q1",
    question: "Next.jsとReactの関係を最も正しく説明しているのはどれ？",
    choices: [
      "Next.jsはReactを置き換える別のライブラリで、Reactの知識は使えない",
      "Next.jsはReactの上に載るフレームワークで、Reactのコンポーネントをそのまま使える",
      "Next.jsはReactの古いバージョンで、新しいプロジェクトでは使わない",
      "ReactはNext.jsの一部で、単独では動かない",
    ],
    correctIndex: 1,
    explanation:
      "Next.jsはReactのフレームワーク。ReactはUIを作るための「ライブラリ」、Next.jsはそれを包んで「ルーティング・サーバー処理・APIエンドポイント」など最初から仕組みを揃えた「フレームワーク」。Reactで学んだコンポーネント・Props・useStateなどはそのままNext.jsで使える。",
  },
  {
    id: "nextjs-intro-q2",
    question: "Next.jsの「ファイルベースルーティング」を最も正しく説明しているのはどれ？",
    choices: [
      "ルーティング設定をJSONファイルに書いて読み込ませる仕組み",
      "URLごとにreact-routerでRouteコンポーネントを並べる仕組み",
      "appフォルダ配下にファイルを置くだけで、フォルダ構造がそのままURLになる仕組み",
      "URLは全部1ファイルで管理し、useStateで切り替える仕組み",
    ],
    correctIndex: 2,
    explanation:
      "Next.js（App Router）では`app/about/page.tsx`を作れば自動で`/about`というURLが生成される。ルーティング設定ファイルを書く必要も、Routeコンポーネントを並べる必要もない。「フォルダを切る＝URLを作る」と覚えると分かりやすい。",
  },
  {
    id: "nextjs-intro-q3",
    question: "Server Componentで「できること」として正しいのはどれ？",
    choices: [
      "useStateで値を持って、ボタンクリックで画面を更新する",
      "サーバー側でDBや外部APIに直接アクセスして、結果をHTMLに埋め込む",
      "ブラウザのlocalStorageに値を保存する",
      "onClickイベントでフォーム送信処理を実行する",
    ],
    correctIndex: 1,
    explanation:
      "Server Componentはサーバー側で実行されるReactコンポーネント。DBや外部APIに直接アクセスでき、APIキーなどの秘密情報をブラウザに渡さずに済む。一方でuseStateやonClickなどブラウザ固有の機能は使えない。それらはClient Component（'use client'付き）の役割。",
  },
  {
    id: "nextjs-intro-q4",
    question: "Next.jsの「Route Handlers」とは何か？",
    choices: [
      "ページの遷移時に実行される関数",
      "ルーティングのエラーをキャッチするコンポーネント",
      "`app/api/xxx/route.ts`を置くだけでAPIエンドポイントを作れる仕組み",
      "URLごとにCSSを切り替える仕組み",
    ],
    correctIndex: 2,
    explanation:
      "Route HandlersはNext.jsのAPIエンドポイントを作る仕組み。`app/api/users/route.ts`を作って`GET`/`POST`関数をexportすれば、そのまま`/api/users`というAPIになる。サーバーを別で立てなくても、フロントとAPIを同じプロジェクトで管理できるのがNext.jsの強み。",
  },
  {
    id: "nextjs-intro-q5",
    question: "`'use client'`をファイルの先頭に書く必要があるのはどんなとき？",
    choices: [
      "DBに直接アクセスしたいとき",
      "useStateやuseEffect、onClickなどブラウザ側の機能を使うとき",
      "ページの`metadata`をexportしたいとき",
      "外部APIをfetchするとき",
    ],
    correctIndex: 1,
    explanation:
      "Next.jsはデフォルトでServer Component。useStateやuseEffect、onClickなど「ブラウザ側でしか動かない機能」を使うときだけ、ファイル先頭に`'use client'`と書いてClient Componentにする。DBアクセスや外部APIのfetchはむしろServer Componentが得意な領域なので不要。",
  },
];

export const introAdvancedQuestions: DrillQuestion[] = [
  {
    id: "intro-adv-q1",
    level: "advanced",
    question: "Next.js の `next.config.ts` の主な役割はどれ？",
    choices: [
      "コンポーネントのプロップス型を定義する",
      "ビルド設定・リダイレクト・環境変数の公開設定・画像ドメインの許可などを行う設定ファイル",
      "ページごとのメタタグを設定する",
      "TailwindCSSのカラーパレットを定義する",
    ],
    correctIndex: 1,
    explanation: "next.config.tsはNext.jsプロジェクト全体のビルド・実行設定を管理する。よく使う設定: images.domains（外部画像の許可）、redirects（リダイレクト設定）、env（環境変数の公開）。メタタグはlayout.tsxのmetadata、Tailwindはtailwind.config.tsが担当する。",
  },
  {
    id: "intro-adv-q2",
    level: "advanced",
    question: "Next.jsのhybrid rendering（ハイブリッドレンダリング）とは何か？",
    choices: [
      "ReactとVueを組み合わせて使うこと",
      "同一プロジェクト内でページごとにSSR・SSG・ISR・CSRを使い分けられること",
      "サーバーとクライアントを別々のリポジトリで管理すること",
      "モバイルとデスクトップで異なるHTMLを返すこと",
    ],
    correctIndex: 1,
    explanation: "Next.jsはページ（またはコンポーネント）ごとにレンダリング戦略を選べる。トップページはSSG、ダッシュボードはSSR、コメントはCSRという混在が1プロジェクトで可能。これがNext.jsの核心的な強みで、「最適な戦略を場所ごとに選択できる」こと。",
  },
  {
    id: "intro-adv-q3",
    level: "advanced",
    question: "Next.jsで環境変数を「ブラウザ（クライアント）でも使えるようにする」ための命名規則はどれ？",
    choices: [
      "CLIENT_API_KEY=xxxxx",
      "PUBLIC_API_KEY=xxxxx",
      "NEXT_PUBLIC_API_KEY=xxxxx",
      "BROWSER_API_KEY=xxxxx",
    ],
    correctIndex: 2,
    explanation: "Next.jsでは `NEXT_PUBLIC_` プレフィックスが付いた環境変数だけがブラウザに公開される。それ以外はサーバー側でのみ参照可能（クライアントから見えない）。APIキーをブラウザに公開することはセキュリティリスクになるため、公開していい値のみ NEXT_PUBLIC_ をつける。",
  },
  {
    id: "intro-adv-q4",
    level: "advanced",
    question: "Next.jsの `<Image>` コンポーネントを使うメリットとして正しいものはどれ？",
    choices: [
      "画像をBase64に自動変換してHTMLに埋め込む",
      "自動的に最適なサイズ・フォーマット（WebP等）に変換し、遅延読み込み（lazy load）も適用する",
      "画像を暗号化してセキュリティを強化する",
      "SVGアニメーションを自動生成する",
    ],
    correctIndex: 1,
    explanation: "Next.jsの<Image>はimgタグの最適化版。ブラウザ対応のWebP変換・表示サイズに応じたリサイズ・lazy loadingが自動適用される。これらは手動で実装すると複雑だが、<Image>を使うだけで対応完了。Lighthouseのパフォーマンススコア向上にも直結する。",
  },
];
