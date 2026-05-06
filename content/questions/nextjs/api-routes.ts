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
