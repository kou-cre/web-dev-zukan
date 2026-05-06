import Link from "next/link";
import {
  Code2,
  Layers,
  Globe,
  Server,
  Database,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  StackLayer,
} from "@/components/ConceptDiagram";
import { Bridge } from "@/components/Bridge";
import { MajiDialogue } from "@/components/MajiDialogue";
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";

export const metadata = {
  title: "Next.jsをはじめる前のチェックリスト | Web開発図解",
  description:
    "Next.jsを始める前に必要なReact・JSの基礎9項目を確認するページ。コンポーネント・useState・useEffect・async/await・サーバーとクライアントの違いなど、Next.jsで使う知識を整理。",
};

// ── チェックリスト9項目 ──────────────────────────────────────────────

type CheckItem = {
  num: string;
  title: string;
  example: string;
  note: string;
  href?: string;
};

const checkItems: CheckItem[] = [
  {
    num: "01",
    title: "コンポーネントを定義してimport/exportできる",
    example: "export default function Page() { return <div /> }",
    note: "Next.jsの各ページはReactコンポーネント。コンポーネントの基本が分からないとページを作れない。",
    href: "/react/components",
  },
  {
    num: "02",
    title: "Propsを渡せる",
    example: "<Button label=\"送信\" onClick={handleClick} />",
    note: "コンポーネント間のデータ受け渡しの基本。Next.jsでもReactのProps構文をそのまま使う。",
    href: "/react/props",
  },
  {
    num: "03",
    title: "useStateで値を持って画面を更新できる",
    example: "const [count, setCount] = useState(0)",
    note: "インタラクティブなUIに必須。ただしNext.jsでは「use client」が必要な場合がある。",
    href: "/react/state",
  },
  {
    num: "04",
    title: "useEffectでfetchを呼ぶパターンが書ける",
    example: "useEffect(() => { fetch('/api/data').then(...) }, [])",
    note: "Reactのクライアント側データ取得パターン。Next.jsにはServer Componentという代替手段もある。",
    href: "/react/useeffect",
  },
  {
    num: "05",
    title: "mapで配列をレンダリングできる",
    example: "items.map(item => <li key={item.id}>{item.name}</li>)",
    note: "リスト表示はNext.jsでも頻出。keyプロパティを忘れずに。",
  },
  {
    num: "06",
    title: "async/awaitでfetchが書ける",
    example: "const data = await fetch('/api/data').then(r => r.json())",
    note: "Next.jsのServer Componentではasync関数がそのままコンポーネントになる。async/awaitが必須。",
    href: "/javascript/async",
  },
  {
    num: "07",
    title: "JSONを扱える",
    example: "JSON.parse(str) / JSON.stringify(obj)",
    note: "APIレスポンスはJSON形式が多い。fetchで取得したデータを変換するときに使う。",
    href: "/javascript/fetch",
  },
  {
    num: "08",
    title: "サーバーとクライアントの違いを理解している",
    example: "ブラウザ（クライアント）とWebサーバーが別々に存在する",
    note: "Next.jsの最大の特徴「サーバーでReactを動かす」を理解するための土台。これが曖昧だとServer Componentsの概念が入らない。",
    href: "/kiso/server",
  },
  {
    num: "09",
    title: "HTTPメソッド（GET/POST）の基本を知っている",
    example: "GET=データを取得する / POST=データを送る",
    note: "Next.jsのAPI Routesを使うときに必要。どのメソッドをいつ使うかを理解しておく。",
    href: "/javascript/fetch",
  },
];

export default function NextjsIntroPage() {
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
        title="Next.jsをはじめる前のチェックリスト"
        subtitle={"ReactとJSの基礎が整っているか確認してから進もう。この9項目が揃えば準備完了。"}
        body={"このページはNext.js学習の出発点。チェックできない項目があれば各ページで確認してから戻ってこよう。"}
        accentColor="sky"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Next.jsをはじめるために必要なReact・JSの基礎9項目",
          "各項目をどのページで確認できるか",
          "Next.jsとReactの関係（ReactはNext.jsの部品）",
        ]}
        prerequisites={[
          "Reactカテゴリを一通り読んだ（特にコンポーネント・useState・useEffect）",
          "JavaScriptの基礎（const/let・関数・async/await・fetch）を知っている",
        ]}
        outOfScope={[
          "Next.jsのコードの書き方（次ページ「App Router」で学ぶ）",
          "TypeScript（Next.jsで使えるが、このサイトでは任意）",
          "Vercelへのデプロイ手順（環境構築は範囲外）",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"Next.jsはReactのフレームワーク。Reactで作ったコンポーネントを「サーバーでも動かせる」「URLを自動管理できる」ようにしたもの。ReactなしにNext.jsはなく、React理解がそのまま土台になる。"}
        metaphorTitle="電動自転車と普通の自転車"
        metaphorPoints={[
          {
            label: "React",
            real: "普通の自転車。自分でペダルを漕ぐ（ルーティング・データ取得も自分で設計）",
            metaphor: "React",
          },
          {
            label: "Next.js",
            real: "電動アシスト付き自転車。ペダル（React）はそのままで、坂（サーバー処理・ルーティング）をアシストしてくれる",
            metaphor: "Next.js",
          },
          {
            label: "チェックリスト",
            real: "「まず自転車に乗れるか」の確認",
            metaphor: "チェックリスト",
          },
          {
            label: "Next.jsを始める",
            real: "自転車に乗れたら電動アシスト付きに乗り換えられる",
            metaphor: "Next.jsを始める",
          },
        ]}
        definition={"Next.jsはReactの上に載るフレームワーク。ルーティング・データ取得・サーバー処理を標準装備している。Reactの知識がそのまま使える。"}
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram A ────────── */}
      <Bridge
        from="Next.jsとReactの関係が分かった"
        to="どのReact知識が必要か、9項目のリストで確認していく"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 概念図A: Next.jsとReactとJSの位置づけ */}
        <ConceptDiagram
          title="概念図A — Next.jsとReactとJSの位置づけ"
          description="3つの技術がどんな関係で積み重なっているかをStackLayerで示す"
        >
          <StackLayer
            Icon={Globe}
            title="JavaScript"
            subtitle="プログラミング言語の土台。ブラウザで動く唯一の言語。ReactもNext.jsもJSの上で動いている"
            iconColor="text-yellow-400"
          />
          <StackLayer
            Icon={Layers}
            title="React"
            subtitle="UI構築ライブラリ。コンポーネント・Props・Stateが使える。JSをUIに特化させた道具セット"
            iconColor="text-blue-400"
          />
          <StackLayer
            Icon={Code2}
            title="Next.js"
            subtitle="フレームワーク。ルーティング・SSR・APIエンドポイントが標準装備。Reactのコンポーネントをそのまま使う"
            iconColor="text-sky-400"
            showArrow={false}
          />
          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            Next.jsはReactのコンポーネントをそのまま使う。Reactで学んだ全ての知識がNext.jsで活きる
          </p>
        </ConceptDiagram>

        {/* Bridge: A → B */}
        <Bridge
          from="Next.jsがReactの上に載るフレームワークだと分かった"
          to="具体的にどのReact・JS知識が必要か、チェックリストで確認する"
        />

        {/* 概念図B: Next.js前の9項目チェック */}
        <ConceptDiagram
          title="概念図B — Next.js前の9項目チェック"
          description="これが分かればNext.jsを始められる。分からない項目はリンク先で確認しよう"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checkItems.map((item) => (
              <div
                key={item.num}
                className="rounded-xl border p-4 transition-colors hover:border-sky-500/40"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-base font-bold text-sky-400 flex-shrink-0 font-mono leading-none mt-0.5">
                    {item.num}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white mb-1.5 leading-snug">
                      {item.title}
                    </p>
                    <code className="font-mono text-xs text-sky-200 leading-relaxed block mb-2 whitespace-pre-wrap break-all">
                      {item.example}
                    </code>
                    <p className="text-xs text-gray-400 leading-relaxed mb-1.5">
                      {item.note}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-xs text-sky-500 hover:text-sky-300 transition-colors"
                      >
                        → このページで確認する
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-500">
                        参照先：React基礎知識
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            全9項目が「なんとなく分かる」レベルになれば、Next.jsを始める準備は整っている
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — SectionDivider前） ──────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "マスター……Reactを全部完璧に知らないとダメですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "1〜5番が分かれば始められます。\nNext.jsの最初の数ページを読むうちに残りも自然に分かるようになりますよ。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "8番のサーバーとクライアントの違いって、なぜNext.jsで必要なんですか？ マジ？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "Next.jsの最大の特徴『サーバーでコードを動かせる』を理解するための土台だからです。\nこれを知らないとServer Componentsの話が全く分からなくなります。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "つまり、ブラウザだけじゃなくサーバーでもReactが動く、ということですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "まさにそれがNext.jsの本質です。\nReactは元々ブラウザ専用でしたが、Next.jsがサーバー側にも連れ出しました。\nだからサーバー/クライアントの概念が重要になるんです。",
          },
        ]}
      />

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は各Reactトピックの詳細解説です。不安な項目があれば確認してください。"
      />

      {/* ── 応用編 DetailSection ─────────────────────────────── */}
      <DetailSection title="詳細解説">
        {/* 7.1 最低限必要な5項目 */}
        <DetailBlock heading="7.1 最低限必要な5項目（コンポーネント・Props・useState・useEffect・map）">
          <p>
            Next.jsを始める前に必ず押さえる5つ。これがないとページコンポーネントを書けない。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">最低限これだけ読めればOK</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// コンポーネント定義（01番）
export default function Page() {
  return <main>コンテンツ</main>;
}

// Propsを渡す（02番）
function Button({ label }: { label: string }) {
  return <button>{label}</button>;
}

// useState（03番）
const [count, setCount] = useState(0);

// useEffect + fetch（04番）
useEffect(() => {
  fetch("/api/data").then(r => r.json()).then(setData);
}, []);

// map（05番）
items.map(item => <li key={item.id}>{item.name}</li>)`}</code>
            </pre>
          </div>
          <KeyPoint>
            Next.jsはこの5つのReact知識の上に「ファイルベースルーティング」と「サーバーでの実行」を加えたもの。5つが書けたら次のページ「App Router」へ進もう。
          </KeyPoint>
        </DetailBlock>

        {/* 7.2 データ取得の基礎 */}
        <DetailBlock heading="7.2 データ取得の基礎（async/await + fetch + JSON）">
          <p>
            Next.jsのServer Componentでは、コンポーネント関数自体を
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>
              async
            </code>
            にしてデータを取得できる。これはReactの従来のuseEffectパターンより簡潔に書ける。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">Next.js Server Componentでのデータ取得（最頻出パターン）</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// app/page.tsx（Server Component — デフォルト）
export default async function Page() {
  // サーバーで実行される。useEffectは不要
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  return (
    <ul>
      {posts.map((post: { id: number; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}</code>
            </pre>
          </div>
          <KeyPoint>
            Server Componentのasync/awaitパターンはuseEffectより直感的。ただしuseStateなどのhooksは使えない点に注意。インタラクティブな部分は「use client」で分離する。
          </KeyPoint>
        </DetailBlock>

        {/* 7.3 サーバーとクライアントの概念 */}
        <DetailBlock heading="7.3 サーバーとクライアントの概念（なぜNext.jsで重要か）">
          <p>
            通常のReact（SPA）はブラウザ（クライアント）だけで動く。Next.jsはサーバーとクライアントの両方でReactを動かせる。この違いがNext.jsの最大の特徴。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">Server ComponentとClient Componentの違い</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// Server Component（デフォルト）
// サーバーで実行。DBやAPIに直接アクセスできる
// useStateやuseEffectは使えない
export default async function ProductList() {
  const products = await db.query("SELECT * FROM products");
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// Client Component（先頭に"use client"が必要）
// ブラウザで実行。useState・useEffect・イベントハンドラが使える
"use client";
export function AddToCartButton({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>
    {added ? "カート追加済み" : "カートに追加"}
  </button>;
}`}</code>
            </pre>
          </div>
          <WarningPoint>
            「全部Server Componentにすればいい」は間違い。useStateやonClickなどブラウザ固有の機能はClient Componentが必要。「データ取得=Server」「インタラクション=Client」と役割を分けるのが基本。
          </WarningPoint>
        </DetailBlock>

        {/* 7.4 HTTP基礎 */}
        <DetailBlock heading="7.4 HTTP基礎（GETとPOST）">
          <p>
            Next.jsのRoute Handlers（API Routes）を使うとき、HTTPメソッドの使い分けが重要になる。GETはデータの取得、POSTはデータの送信・作成に使う。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">Next.jsでのRoute Handler（app/api/users/route.ts）</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`import { NextResponse } from "next/server";

// GET /api/users — ユーザー一覧を返す
export async function GET() {
  const users = await db.findAll();
  return NextResponse.json(users);
}

// POST /api/users — 新しいユーザーを作る
export async function POST(request: Request) {
  const body = await request.json();
  const newUser = await db.create(body);
  return NextResponse.json(newUser, { status: 201 });
}`}</code>
            </pre>
          </div>
          <KeyPoint>
            Next.jsのRoute HandlersはファイルがそのままAPIになる。app/api/users/route.tsを作るだけで「/api/users」というエンドポイントが自動で使えるようになる。GETとPOSTを同一ファイルに並べて書ける。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/nextjs/routing",
            title: "App Router — ファイルベースルーティング",
            description: "チェックリストが整ったら次はここへ",
            icon: "Code2",
          },
          {
            href: "/react/components",
            title: "コンポーネント（React）",
            description: "Reactの基本単位を確認する",
            icon: "Server",
          },
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "サーバーとクライアントの違いを確認する",
            icon: "Database",
          },
        ]}
      />
    </div>
  );
}
