import Link from "next/link";
import { Server, Cloud, Code2 } from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { Bridge } from "@/components/Bridge";
import { TermNote } from "@/components/TermNote";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { MajiDialogue } from "@/components/MajiDialogue";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { apiRoutesQuestions } from "@/content/questions/nextjs/api-routes";

export const metadata = {
  title: "API Routes | Web開発図解",
  description:
    "Next.jsのAPI Routesをゼロから解説。app/api/route.tsでエンドポイントを作る方法・GETハンドラ・POSTでボディを受け取る方法・クライアントからfetchで叩くパターンを図解で学ぶ。",
};

export default function ApiRoutesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── 戻るリンク ──────────────────────────────────────── */}
      <div className="mb-6">
        <Link
          href="/nextjs"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          ← Next.js に戻る
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero
        category="Next.js"
        title="API Routes"
        subtitle={"自分でAPIエンドポイントを作る — app/api/route.tsで始めるバックエンド"}
        accentColor="emerald"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "app/api/.../route.tsでAPIエンドポイントを作る方法",
          "GETハンドラでデータを返す最小例",
          "クライアントコンポーネントからfetch('/api/...')で叩く方法",
        ]}
        prerequisites={[
          "fetch APIを知っている（/javascript/fetch を読んだ）",
          "HTTPメソッド（GET/POST）の基本を知っている（/javascript/fetch を読んだ）",
          "App Routerの基本を知っている（/nextjs/routing を読んだ）",
        ]}
        outOfScope={[
          "POSTでリクエストボディを受け取る詳細（応用編で扱う）",
          "Server Actionsとの使い分け（応用編で扱う）",
          "認証ミドルウェア・JWT（上級トピック）",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"Next.jsのAPI Routesは「自分でAPIを作れる機能」。app/api/[エンドポイント名]/route.tsというファイルに関数を書くと、そのURLがAPIになる。フロントエンドとバックエンドを1つのプロジェクトで管理できる。"}
        metaphorTitle="自販機を自分で作る"
        metaphorPoints={[
          {
            label: "外部API",
            real: "既製品の自販機（他の会社が作ったもの）",
            metaphor: "外部API",
          },
          {
            label: "API Routes",
            real: "自分で作った自販機（中のボタン配置も決められる）",
            metaphor: "API Routes",
          },
          {
            label: "route.ts",
            real: "自販機の配線図（GETボタンが押されたら何を出すか）",
            metaphor: "route.ts",
          },
          {
            label: "Response.json()",
            real: "「はいどうぞ」と商品を出す動作",
            metaphor: "Response.json()",
          },
        ]}
        definition={"API RoutesはNext.jsプロジェクト内にAPIエンドポイントを作る機能。app/api/*/route.tsにGET・POST関数をexportするだけで動く。"}
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram A ────────── */}
      <Bridge
        from="自分でAPIを作れる機能だと分かった"
        to="ファイルをどこに置けばURLになるか、実際の構造を確認する"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* TermNote: 基礎図の前 */}
        <TermNote
          terms={[
            {
              word: "API Route",
              definition: "app/api/*/route.tsに定義するサーバー側の関数。HTTPリクエストを受け取りレスポンスを返す",
            },
            {
              word: "route.ts",
              definition: "API Routeを定義するファイル。GET・POST等のHTTPメソッド名の関数をexportする",
            },
            {
              word: "Response.json()",
              definition: "JSONデータをHTTPレスポンスとして返すメソッド。返したいオブジェクトを渡す",
            },
            {
              word: "Request",
              definition: "HTTPリクエストを表すオブジェクト。URLパラメータやリクエストボディを取得できる",
            },
            {
              word: "エンドポイント",
              definition: "/api/usersや/api/posts/42のように、どのURLでAPIを提供するかを指す",
            },
          ]}
        />

        {/* 概念図A: API Routeの仕組みとファイル構造 */}
        <ConceptDiagram
          title="概念図A — API Routeの仕組みとファイル構造"
          description="ファイルを置く場所がそのままURLになる。page.tsxと同じ発想でAPIが作れる"
        >
          {/* ファイルツリーとURLの対応 */}
          <div className="rounded-lg border p-4 mb-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3 font-mono">ファイルツリーとURLの対応</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ファイルツリー */}
              <div>
                <p className="text-xs text-gray-500 mb-2">ファイル構造</p>
                <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`app/api/
├── users/
│   └── route.ts
├── posts/
│   └── route.ts
└── users/
    └── [id]/
        └── route.ts`}
                </pre>
              </div>
              {/* URL対応 */}
              <div>
                <p className="text-xs text-gray-500 mb-2">対応するURL</p>
                <div className="space-y-2">
                  <div className="rounded border px-3 py-2" style={{ borderColor: "rgba(16,185,129,0.4)", backgroundColor: "rgba(16,185,129,0.05)" }}>
                    <p className="text-xs font-mono text-emerald-300">GET /api/users</p>
                  </div>
                  <div className="rounded border px-3 py-2" style={{ borderColor: "rgba(16,185,129,0.4)", backgroundColor: "rgba(16,185,129,0.05)" }}>
                    <p className="text-xs font-mono text-emerald-300">GET/POST /api/posts</p>
                  </div>
                  <div className="rounded border px-3 py-2" style={{ borderColor: "rgba(16,185,129,0.4)", backgroundColor: "rgba(16,185,129,0.05)" }}>
                    <p className="text-xs font-mono text-emerald-300">GET /api/users/42 （動的）</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 最小コード例 */}
          <div className="rounded-lg border p-4 mb-3" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">最小コード例 — app/api/hello/route.ts</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`// app/api/hello/route.ts
export function GET() {
  return Response.json({ message: "こんにちは！" });
}

// このAPIを呼ぶと → { "message": "こんにちは！" } が返る
// アクセスURL: /api/hello`}
            </pre>
          </div>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            page.tsxがURLに対してページを返すのと同じように、route.tsはURLに対してJSONデータを返す
          </p>
        </ConceptDiagram>

        {/* Bridge: A → B */}
        <Bridge
          from="API Routeの基本構造（ファイルを置く=エンドポイントになる）が分かった"
          to="クライアントからこのAPIを叩く方法を確認する"
        />

        {/* 概念図B: Client ComponentからAPI Routeを叩く */}
        <ConceptDiagram
          title="概念図B — Client ComponentからAPI Routeを叩く"
          description="フロントエンドとAPI Routeが同じプロジェクト内にある。fetchで/api/...を叩くだけでつながる"
        >
          {/* API Route側とClient側を並べる */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* API Route側 */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs text-emerald-400 font-semibold mb-2">API Route側（サーバー）</p>
              <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`// app/api/greet/route.ts
export function GET() {
  const data = {
    greeting: "こんにちは！",
  };
  return Response.json(data);
}`}
              </pre>
            </div>
            {/* Client Component側 */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs text-sky-400 font-semibold mb-2">Client Component側（ブラウザ）</p>
              <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`"use client";
import { useState, useEffect }
  from "react";

export default function Page() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/greet")
      .then(r => r.json())
      .then(d => setMsg(d.greeting));
  }, []);

  return <p>{msg}</p>;
}`}
              </pre>
            </div>
          </div>

          {/* フロー説明 */}
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">処理の流れ</p>
            <ol className="space-y-2">
              {[
                "ページが読み込まれるとuseEffectが実行される",
                "fetch(\"/api/greet\")でリクエスト送信（同じNext.jsプロジェクト内）",
                "route.tsのGET関数が実行される（サーバー側）",
                "{ greeting: \"こんにちは！\" }がJSONで返る",
                "setMsgで状態更新 → 画面に表示される",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-emerald-400 font-mono flex-shrink-0 w-4">{i + 1}.</span>
                  <span className="text-xs text-gray-300 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — SectionDivider前） ──────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "question",
            text: "API Routeって外部のAPIと何が違うんですか？ マジ？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "外部APIは他の会社が作ったもの。API Routeは自分で作るAPIです。\nデータベースへのアクセスや認証処理を安全にサーバー側で行えるのが強みです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "route.tsにGETとPOSTの両方を書けるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "はい。同じファイルにGET・POST・PUT・DELETEを共存させられます。\nそれぞれの関数をexportするだけで自動的に振り分けられます。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "なぜAPIを経由するんですか？ Server Componentで直接データ取得すればいいじゃないですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "Server Componentから直接取るのが最もシンプルです。\nAPI Routeが必要なのは: Clientから動的にデータが欲しい場合・他のアプリからも叩かれる場合・フォーム送信（POST）の受け口が必要な場合などですね。",
          },
        ]}
      />

      {/* ── ComparisonTable ───────────────────────────────────── */}
      <ComparisonTable
        headers={["外部API（3rd party）", "Next.js API Route（自作）"]}
        rows={[
          {
            label: "誰が作るか",
            cells: ["他の会社・サービス", "自分（プロジェクト内）"],
            highlightCol: 1,
          },
          {
            label: "URLの形",
            cells: ["https://api.example.com/...", "/api/... （同じドメイン）"],
            highlightCol: 1,
          },
          {
            label: "DBアクセス",
            cells: ["APIが担当（不可視）", "route.ts内でDirect接続可能"],
            highlightCol: 1,
          },
          {
            label: "認証情報の扱い",
            cells: ["APIキーを送る", "サーバー側に隠せる（.envで管理）"],
            highlightCol: 1,
          },
          {
            label: "柔軟性",
            cells: ["APIの仕様に従う", "自由に設計できる"],
            highlightCol: 1,
          },
        ]}
        highlightCol={1}
      />

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="POSTハンドラ・動的ルート・エラーレスポンス・環境変数など、実践で必要になる内容です"
      />

      {/* ── 応用編 TermNote ──────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "リクエストボディ",
            definition: "POSTリクエストで送るデータ。await request.json()で取得する",
          },
          {
            word: "URLパラメータ",
            definition: "/api/users/[id]のように[id]で定義し、params.idで取得する動的セグメント",
          },
          {
            word: "CORS",
            definition: "クロスオリジンリソース共有。別ドメインからAPIを叩く場合に必要な設定",
          },
          {
            word: "ミドルウェア",
            definition: "すべてのリクエストの手前で実行される処理。認証チェックなどに使う",
          },
          {
            word: "環境変数",
            definition: "外部からAPIキーが見えないようにprocess.env.VARIABLE_NAMEで参照する設定値",
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        {/* 概念図C: POSTハンドラでデータを受け取る */}
        <ConceptDiagram
          title="概念図C — POSTハンドラでデータを受け取る"
          description="GETとPOSTを同じファイルに書ける。POSTではawait request.json()でボディを取得する"
        >
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">app/api/messages/route.ts</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`// GETハンドラ（リスト取得）
export function GET() {
  const messages = [
    { id: 1, text: "こんにちは" },
    { id: 2, text: "やあ" },
  ];
  return Response.json(messages);
}

// POSTハンドラ（新規作成）
export async function POST(request: Request) {
  const body = await request.json(); // リクエストボディを取得
  console.log("受け取ったデータ:", body);

  // 実際はDBに保存する処理を書く
  return Response.json(
    { success: true, received: body },
    { status: 201 } // 201 Created
  );
}`}
            </pre>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border px-4 py-3" style={{ borderColor: "rgba(16,185,129,0.3)", backgroundColor: "rgba(16,185,129,0.05)" }}>
              <p className="text-xs font-semibold text-emerald-300 mb-1">GET /api/messages</p>
              <p className="text-xs text-gray-400">メッセージ一覧を配列で返す</p>
            </div>
            <div className="rounded-lg border px-4 py-3" style={{ borderColor: "rgba(16,185,129,0.3)", backgroundColor: "rgba(16,185,129,0.05)" }}>
              <p className="text-xs font-semibold text-emerald-300 mb-1">POST /api/messages</p>
              <p className="text-xs text-gray-400">ボディを受け取り201で返す</p>
            </div>
          </div>
        </ConceptDiagram>

        {/* 概念図D: 動的APIルート */}
        <ConceptDiagram
          title="概念図D — 動的APIルート（/api/users/[id]）"
          description="[id]をフォルダ名に使うと、URLの中の値を取り出せる。ユーザー詳細・記事詳細など個別リソースの取得に使う"
        >
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">app/api/users/[id]/route.ts</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`export function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // 実際はDBからidで検索する
  const user = { id, name: "マジ", age: 20 };
  return Response.json(user);
}

// /api/users/42 にアクセスすると
// → { id: "42", name: "マジ", age: 20 }`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
            page.tsxの動的ルート（app/users/[id]/page.tsx）と同じ命名ルール。フォルダ名の[]内がparamsのキーになる
          </p>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ────────────────────────────────────── */}
      <DetailSection title="詳細解説">

        {/* 7.1 Server ActionsとAPI Routeの使い分け */}
        <DetailBlock heading="7.1 Server ActionsとAPI Routeの使い分け">
          <p>
            Next.js 13以降、フォームの送信などには<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#6ee7b7" }}>Server Actions</code>という別の仕組みがある。どちらを使うべきかは用途で決まる。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-emerald-300 mb-1">Server Actionsが向いているケース</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>フォーム送信（シンプルなCRUD）</li>
                  <li>同じNext.jsアプリからしか叩かれない処理</li>
                  <li>コードをシンプルに保ちたいとき</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-300 mb-1">API Routeが向いているケース</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>外部アプリ・モバイルアプリからも叩かれる</li>
                  <li>webhookの受け口（GETでアクセスされる）</li>
                  <li>明示的なREST APIを設計したいとき</li>
                </ul>
              </div>
            </div>
          </div>
          <KeyPoint>
            「このNext.jsアプリだけが使う」ならServer Actions、「外からも叩かれる」ならAPI Route、という判断が基本。迷ったらServer Actionsから始めて、必要になったらAPI Routeに移行する。
          </KeyPoint>
        </DetailBlock>

        {/* 7.2 エラーレスポンスの返し方 */}
        <DetailBlock heading="7.2 エラーレスポンスの返し方">
          <p>
            APIは成功だけでなく、バリデーションエラーや存在しないリソースへのアクセスにも適切なステータスコードで応答する必要がある。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`export function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = findUser(params.id);

  // 404: リソースが存在しない
  if (!user) {
    return Response.json(
      { error: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  return Response.json(user); // 200 OK（デフォルト）
}

// POST でバリデーションエラーを返す例
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name) {
    return Response.json(
      { error: "nameは必須です" },
      { status: 400 } // 400 Bad Request
    );
  }

  // ... 処理
}`}
            </pre>
          </div>
          <KeyPoint>
            よく使うステータスコード: 200（成功）・201（作成成功）・400（リクエストが不正）・404（見つからない）・500（サーバーエラー）。クライアント側でエラーを適切にハンドリングできるよう、常にステータスコードを意識して返す。
          </KeyPoint>
        </DetailBlock>

        {/* 7.3 環境変数の使い方 */}
        <DetailBlock heading="7.3 環境変数の使い方（.envとprocess.env）">
          <p>
            API RouteはサーバーサイドのコードなのでAPIキー・DBパスワードなどの秘密情報を安全に扱える。.envファイルに書いた値は<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#6ee7b7" }}>process.env.変数名</code>でアクセスできる。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-2">.env.local（Gitにコミットしない）</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre mb-4">
{`DATABASE_URL=postgresql://user:pass@localhost/mydb
EXTERNAL_API_KEY=sk-xxxxxx`}
            </pre>
            <p className="text-xs text-gray-500 mb-2">app/api/data/route.ts</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`export async function GET() {
  // サーバーサイドなので安全にAPIキーを使える
  const apiKey = process.env.EXTERNAL_API_KEY;

  const res = await fetch("https://api.example.com/data", {
    headers: { Authorization: \`Bearer \${apiKey}\` },
  });
  const data = await res.json();
  return Response.json(data);
}`}
            </pre>
          </div>
          <WarningPoint>
            NEXT_PUBLIC_ プレフィックスがない環境変数はサーバーサイドのみで利用できる。クライアント側（ブラウザ）のコードにAPIキーを渡さないためにAPI Routeを経由する設計が有効。
          </WarningPoint>
        </DetailBlock>

        {/* 7.4 CORS設定 */}
        <DetailBlock heading="7.4 CORS設定（他ドメインからのアクセスを許可する場合）">
          <p>
            通常、Next.jsのAPI Routeは同じドメインからのアクセスしか許可されない。モバイルアプリや別オリジンのフロントエンドからAPIを叩くには、CORSヘッダーを設定する必要がある。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
{`export function GET() {
  const data = { message: "こんにちは" };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // すべてのオリジンからのアクセスを許可（開発時のみ推奨）
      "Access-Control-Allow-Origin": "*",
      // 本番では特定ドメインだけ許可する
      // "Access-Control-Allow-Origin": "https://myapp.com",
    },
  });
}`}
            </pre>
          </div>
          <KeyPoint>
            同じNext.jsプロジェクトのClient ComponentからAPI Routeを叩く場合はCORS設定は不要。CORSが必要になるのは「別のドメインからこのAPIを叩くとき」だけ。本番環境では「*」（全許可）は使わず、特定ドメインだけ指定する。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/nextjs/data-fetching",
            title: "データフェッチ",
            description: "Server Componentから外部APIを叩くパターン",
            icon: "Server",
          },
          {
            href: "/nextjs/server-component",
            title: "Server Components",
            description: "API RouteとServer Componentの使い分け",
            icon: "Cloud",
          },
          {
            href: "/javascript/fetch",
            title: "fetch API（JS）",
            description: "fetchの基本（クライアント側）",
            icon: "Code2",
          },
        ]}
      />

      {/* ── PageDrill ────────────────────────────────────────── */}
      <PageDrill questions={apiRoutesQuestions} />
    </div>
  );
}
