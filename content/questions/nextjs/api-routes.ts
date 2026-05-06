import type { DrillQuestion } from "@/components/PageDrill";

export const apiRoutesQuestions: DrillQuestion[] = [
  {
    id: "nextjs-api-q1",
    question: "Next.jsでAPIエンドポイントを定義するファイルの正しい名前はどれか？",
    choices: [
      "app/api/users/api.ts",
      "app/api/users/route.ts",
      "app/api/users/handler.ts",
      "app/api/users/index.ts",
    ],
    correctIndex: 1,
    explanation:
      "Next.jsのApp RouterではAPIエンドポイントを「route.ts」（または route.js）という名前のファイルで定義する。page.tsxがURLに対してページを返すのと同じように、route.tsはURLに対してAPIレスポンスを返す。api.tsやhandler.tsというファイル名はNext.jsが自動認識しない。",
  },
  {
    id: "nextjs-api-q2",
    question: "route.tsでGETリクエストに対応する関数を定義するとき、正しいexportはどれか？",
    choices: [
      "export function handleGet() { ... }",
      "export function get() { ... }",
      "export function GET() { ... }",
      "export default function() { ... }",
    ],
    correctIndex: 2,
    explanation:
      "Next.jsのAPI Routeでは、HTTPメソッド名を大文字にした関数をexportする。GETリクエストなら「export function GET()」、POSTなら「export function POST()」と書く。小文字のget()は認識されない。export defaultはページコンポーネント用であり、Route Handlerには使わない。",
  },
  {
    id: "nextjs-api-q3",
    question: "API RouteでJSONデータをレスポンスとして返す正しい書き方はどれか？",
    choices: [
      "return JSON.stringify({ message: 'ok' })",
      "return res.json({ message: 'ok' })",
      "return Response.json({ message: 'ok' })",
      "return NextResponse.send({ message: 'ok' })",
    ],
    correctIndex: 2,
    explanation:
      "App RouterのAPI RouteではWeb標準の「Response.json()」を使ってJSONレスポンスを返す。引数にオブジェクトを渡すだけでJSON変換とContent-Typeヘッダの設定が自動で行われる。JSON.stringify()は文字列を返すだけでHTTPレスポンスにならない。res.jsonはPages RouterのAPI Routes（req/res形式）の書き方。",
  },
  {
    id: "nextjs-api-q4",
    question: "POSTリクエストで送られてきたリクエストボディ（JSON）を取得する正しいコードはどれか？",
    choices: [
      "const body = request.body",
      "const body = JSON.parse(request)",
      "const body = await request.json()",
      "const body = request.data",
    ],
    correctIndex: 2,
    explanation:
      "App RouterのRoute HandlerではRequestオブジェクトの「await request.json()」でリクエストボディをJSONとしてパースして取得する。request.bodyはExpressなどのNode.jsフレームワークの書き方であり、Web標準のRequestオブジェクトには存在しない。request.jsonは非同期処理なので必ずawaitが必要。",
  },
  {
    id: "nextjs-api-q5",
    question: "Next.jsのプロジェクト内でClient ComponentからAPI Routeを呼び出すとき、fetchに渡すURLとして正しいものはどれか？",
    choices: [
      "fetch('https://localhost:3000/api/users')",
      "fetch('/api/users')",
      "fetch('api/users')",
      "fetch('http://api/users')",
    ],
    correctIndex: 1,
    explanation:
      "Next.jsのClient ComponentからAPI Routeを叩くときは「/api/...」という相対パス（スラッシュ始まり）を使う。同じNext.jsプロジェクト内のエンドポイントなので、フルURL（localhost:3000）を書かなくてよい。スラッシュなしの「api/users」は現在ページの相対パスになるため誤り。",
  },
];

export const apiRoutesAdvancedQuestions: DrillQuestion[] = [
  {
    id: "api-routes-adv-q1",
    level: "advanced",
    question: "Route Handlers（route.ts）でCORSヘッダーを設定するとき、正しいアプローチはどれ？",
    choices: [
      "next.config.tsのheaders設定のみで対応し、route.tsには何も書かない",
      "Response オブジェクトに 'Access-Control-Allow-Origin' ヘッダーを手動で追加するか、middleware.tsで設定する",
      "Next.jsはデフォルトで全オリジンからのリクエストを許可する",
      "CORSはブラウザ側の問題なので、サーバーで設定する必要はない",
    ],
    correctIndex: 1,
    explanation: "Next.jsはデフォルトでCORSを許可しない。route.tsのResponseにヘッダーを付けるか、middleware.tsで一括設定する。外部ドメインからのフロントエンドがAPIを呼ぶ場合はCORS設定が必須。CORSはサーバーが「このオリジンからのリクエストを許可する」と宣言する仕組み。",
  },
  {
    id: "api-routes-adv-q2",
    level: "advanced",
    question: "Route Handlersを「認証が必要なAPIエンドポイント」にするとき、最初に確認すべきことはどれ？",
    choices: [
      "HTTPメソッド（GET/POST）が正しいか",
      "リクエストヘッダーのAuthorizationやCookieからセッション/トークンを取得し、有効性を検証してから処理に進むこと",
      "Content-Typeヘッダーがapplication/jsonか",
      "レスポンスにキャッシュヘッダーを付けること",
    ],
    correctIndex: 1,
    explanation: "認証保護は「誰がリクエストしているか確認する」ことが最優先。JWTトークン（Authorizationヘッダー）やセッションクッキーを検証し、無効なら401を返す。検証前にデータベース処理を実行すると認証バイパスの脆弱性になる。",
  },
  {
    id: "api-routes-adv-q3",
    level: "advanced",
    question: "Route Handlersでレート制限（Rate Limiting）が必要になる主な理由はどれ？",
    choices: [
      "サーバーのCPU使用率を下げるため",
      "同一クライアントからの短時間での大量リクエストを制限し、DDoS攻撃・スパム送信・ブルートフォース攻撃を防ぐため",
      "APIのレスポンス速度を上げるため",
      "TypeScriptの型チェックを高速化するため",
    ],
    correctIndex: 1,
    explanation: "レート制限がないと1秒間に1万回リクエストを送ってサーバーをダウンさせる攻撃（DDoS）や、ログインフォームへのブルートフォース攻撃が可能になる。Upstash Redis + Ratelimit ライブラリや Vercel の Edge Config でIPごとのリクエスト数を制限するのが一般的。",
  },
  {
    id: "api-routes-adv-q4",
    level: "advanced",
    question: "Route Handlersで受け取ったリクエストボディを検証するライブラリとして最もよく使われるのはどれ？",
    choices: [
      "axios（HTTPクライアントライブラリ）",
      "zod（スキーマバリデーションライブラリ）",
      "eslint（コードリンター）",
      "prettier（コードフォーマッター）",
    ],
    correctIndex: 1,
    explanation: "zodは `z.object({ email: z.string().email(), age: z.number().min(0) })` のようにスキーマを定義し、`schema.parse(body)` で型安全なバリデーションを行う。パースに失敗すると詳細なエラーメッセージが得られる。Route Handlersでのリクエストバリデーションのデファクトスタンダード。",
  },
];
