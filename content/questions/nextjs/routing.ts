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
