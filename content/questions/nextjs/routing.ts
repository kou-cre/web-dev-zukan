import type { DrillQuestion } from "@/components/PageDrill";

export const routingQuestions: DrillQuestion[] = [
  {
    id: "nextjs-routing-q1",
    question: "Next.jsのApp Routerで「/about」というURLを作るには、どこにどのファイルを置けばよいか？",
    choices: [
      "app/about.tsx",
      "app/about/page.tsx",
      "pages/about.tsx",
      "app/routes/about.tsx",
    ],
    correctIndex: 1,
    explanation:
      "App Routerではフォルダ名がURLになり、そのフォルダ内の「page.tsx」がそのURLのページコンポーネントになる。「app/about/page.tsx」を作ると「/about」にアクセスできる。「app/about.tsx」はURLに対応しない。「pages/about.tsx」はPages Router（レガシー）の書き方。",
  },
  {
    id: "nextjs-routing-q2",
    question: "「app/page.tsx」が対応するURLはどれか？",
    choices: [
      "/page",
      "/app",
      "/",
      "/index",
    ],
    correctIndex: 2,
    explanation:
      "appフォルダ直下のpage.tsxはルートURL「/」に対応する。App Routerではpage.tsxというファイル名がそのURLのページであることを示す特別なファイル。「/page」や「/app」にはならない。",
  },
  {
    id: "nextjs-routing-q3",
    question: "layout.tsxを置いたフォルダの役割として正しいものはどれか？",
    choices: [
      "そのフォルダ内の全ページにURLが生成される",
      "そのフォルダ内の全ページに共通のレイアウト（ヘッダーなど）を適用する",
      "そのフォルダをCSSスタイルの有効範囲にする",
      "そのフォルダのpage.tsxをServer Componentに変換する",
    ],
    correctIndex: 1,
    explanation:
      "layout.tsxは複数のページに共通するレイアウトを定義するファイル。layout.tsxのchildrenプロップに各ページのコンテンツが挿入される形で入れ子になる。ヘッダー・ナビゲーション・フッターなど全ページで共通のUIを一度書くだけで全サブページに自動適用できる。",
  },
  {
    id: "nextjs-routing-q4",
    question: "「app/blog/[id]/page.tsx」に対して「/blog/42」にアクセスしたとき、URLパラメータを取得する正しいコードはどれか？",
    choices: [
      "const id = useParams('id')",
      "const { id } = useParams()",
      "const id = useRouter().query.id",
      "const { params } = useSearchParams()",
    ],
    correctIndex: 1,
    explanation:
      "Next.jsのApp Routerでは「useParams()」フックを使ってURLパラメータを取得する。[id]フォルダ名の[]内の名前がキーになるため「const { id } = useParams()」で取得できる。useRouter().query.idはPages Routerの書き方。useSearchParams()はURLの?以降のクエリパラメータを取得するものでURLパラメータではない。",
  },
  {
    id: "nextjs-routing-q5",
    question: "App RouterとPages Routerの違いとして正しいものはどれか？",
    choices: [
      "Pages RouterはTypeScriptに対応していない",
      "App Routerはapp/フォルダ、Pages RouterはReact Routerを使う",
      "App RouterはServer Componentをデフォルトでサポートする。Pages RouterはデフォルトでClient Component",
      "App Routerはファイル名がURLになる。Pages RouterはフォルダがURLになる",
    ],
    correctIndex: 2,
    explanation:
      "App Router（Next.js 13以降）の最大の違いはServer Componentがデフォルトであること。Pages Routerのページは全てブラウザで実行されるClient Component相当だったが、App RouterではデフォルトでサーバーでReactが動く。Pages RouterもTypeScriptに対応している。両方ともフォルダ構造がURLになるファイルベースルーティングを採用しており、Pages Routerにreact-routerは不要。",
  },
];

export const routingAdvancedQuestions: DrillQuestion[] = [
  {
    id: "routing-adv-q1",
    level: "advanced",
    question: "App RouterのRoute Groupsを使う目的はどれ？",
    choices: [
      "URLパスにグループ名を追加して分かりやすくする",
      "URLパスには影響させずに、フォルダ構造だけでファイルをグループ化する（レイアウト分離等に使う）",
      "複数のページを1つのTSXファイルにまとめる",
      "APIルートを通常ページルートと分離する",
    ],
    correctIndex: 1,
    explanation: "Route Groups は `(groupName)` のように括弧でフォルダを作る。URLには影響しない（例: `(dashboard)/settings/page.tsx` → `/settings`）。用途: 認証が必要なページ群に専用の layout.tsx を適用する、マーケティングページと管理画面で異なるヘッダーを使うなど。",
  },
  {
    id: "routing-adv-q2",
    level: "advanced",
    question: "App Routerで「ネストしたレイアウト」を実装するとき、正しい説明はどれ？",
    choices: [
      "layout.tsxは全ページで同一のものを1つだけ使う",
      "各ディレクトリにlayout.tsxを配置すると、親のlayoutを保持したまま子のlayoutが追加される",
      "layout.tsxとpage.tsxは同じファイルに書く必要がある",
      "layout.tsxはSSGページにしか適用できない",
    ],
    correctIndex: 1,
    explanation: "App Routerではフォルダ階層ごとにlayout.tsxを置けて、入れ子になる。例: app/layout.tsx（全ページのヘッダー）→ app/dashboard/layout.tsx（ダッシュボードのサイドバー）→ app/dashboard/settings/page.tsx（設定ページ）。親のlayoutは保持されたまま子が追加される。",
  },
  {
    id: "routing-adv-q3",
    level: "advanced",
    question: "App Routerの `error.tsx` ファイルの役割はどれ？",
    choices: [
      "TypeScriptの型エラーをコンパイル時にキャッチする",
      "そのルートセグメント（とその子）でエラーが発生したときに表示するフォールバックUIを定義する",
      "ビルドエラーのログを記録するファイル",
      "404ページを表示するためのファイル（not-found.tsxと同じ）",
    ],
    correctIndex: 1,
    explanation: "error.tsxはReactのError Boundaryを自動で実装する。ランタイムエラー（データ取得失敗・予期しない例外）が発生したとき、ページ全体がクラッシュする代わりに `error.tsx` のUIが表示される。'use client' が必要。not-found.tsxは404専用の別ファイル。",
  },
  {
    id: "routing-adv-q4",
    level: "advanced",
    question: "Parallel Routesを使う主なユースケースはどれ？",
    choices: [
      "同じURL上で複数の独立したページを同時に表示する（例: ダッシュボードの複数ウィジェット）",
      "CSSのgridを使って2カラムレイアウトを作る",
      "2つのAPIを同時にfetchする",
      "TypeScriptの型を並列で検証する",
    ],
    correctIndex: 0,
    explanation: "Parallel Routesは `@folderName` 構文で定義し、同じページに複数の独立したルートセグメントを表示できる。例: ダッシュボードに `@analytics` と `@revenue` を並べて表示。それぞれ独立してストリーミング・エラーハンドリングできる。Instagramのモーダルギャラリーなどにも応用される。",
  },
];
