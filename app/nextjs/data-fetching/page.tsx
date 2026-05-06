import Link from "next/link";
import { Globe, Server, Monitor, Database, Cloud, Code2 } from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { Bridge } from "@/components/Bridge";
import { TermNote } from "@/components/TermNote";
import { ConceptDiagram, FlowCard, FlowArrow } from "@/components/ConceptDiagram";
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
import { dataFetchingQuestions, dataFetchingAdvancedQuestions } from "@/content/questions/nextjs/data-fetching";

export const metadata = {
  title: "データフェッチ | Next.js | Web開発図解",
  description:
    "Next.jsのServer Componentでawaitを直接書いてデータを取得する方法を図解。useEffect+fetchとの違い、fetchのキャッシュオプション、Suspenseによるローディング制御まで解説。",
};

export default function DataFetchingPage() {
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
        title="データフェッチ"
        subtitle={"awaitをコンポーネントの中に直接書ける — Next.jsのデータ取得パターン"}
        accentColor="cyan"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Server Componentでasync/awaitを直接使ってデータを取得する方法",
          "useEffect+fetchとの違い（旧Reactパターンとの比較）",
          "JSONデータをコンポーネントに表示する最小例",
        ]}
        prerequisites={[
          "async/awaitとfetchを知っている（/javascript/async と /javascript/fetch を読んだ）",
          "Reactコンポーネントを書ける（/react/components を読んだ）",
          "App Routerの基本を知っている（/nextjs/routing を読んだ）",
          "Server ComponentとClient Componentの違いを知っている（/nextjs/server-component を読んだ）",
        ]}
        outOfScope={[
          "fetchのキャッシュオプション（cache: force-cache / no-store）（応用編で扱う）",
          "revalidate によるデータ再検証（応用編で扱う）",
          "Server Actions・streaming・Suspense（別ページで扱う）",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"Next.jsのServer Componentでは、コンポーネント関数をasyncにして直接awaitでデータを取得できる。useEffectもuseStateも不要。サーバーでデータを取ってからHTMLを作るので、ブラウザに届く時点でデータが入っている。"}
        metaphorTitle="料理を先に作ってから運ぶ vs 注文を受けてから作る"
        metaphorPoints={[
          {
            label: "useEffect+fetch（旧Reactパターン）",
            real: "空のお皿を先に持っていき、テーブルで注文を聞いてから厨房に取りに行く",
            metaphor: "CSR",
          },
          {
            label: "Server Componentでfetch",
            real: "厨房で料理を作ってからテーブルに運ぶ。お皿が届いた瞬間から食べられる",
            metaphor: "SSR",
          },
          {
            label: "async Server Component",
            real: "asyncで「厨房で作る」、awaitで「料理の完成を待つ」",
            metaphor: "async/await",
          },
        ]}
        definition={"Server Componentはサーバーでasyncコンポーネントとして動く。awaitでデータを取得してからJSXを返すので、クライアントに届く時点でデータが埋め込まれている。"}
      />

      {/* ── Bridge: OnePageSummary → TermNote ────────────────── */}
      <Bridge
        from="全体像がつかめた"
        to="図に出てくる言葉を確認してから、コードの比較図を見る"
      />

      {/* ── TermNote（基礎図の前） ────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "Server Component",
            definition: "サーバーで実行されるReactコンポーネント。Next.jsではデフォルト。asyncにしてawaitが使える",
          },
          {
            word: "CSR",
            definition: "クライアントサイドレンダリング。ブラウザ側でJSが実行されてデータを取得し画面を作る方法。useEffect+fetchがこれに当たる",
          },
          {
            word: "SSR",
            definition: "サーバーサイドレンダリング。サーバー側でデータを取得してHTMLを作り、完成品をブラウザに送る方法",
          },
          {
            word: "ローディング状態",
            definition: "useEffect+fetchのパターンではデータが届くまでの間、空の画面や「読み込み中」表示が必要になる",
          },
        ]}
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 概念図A: 旧パターン vs 新パターン比較 */}
        <ConceptDiagram
          title="概念図A — useEffect+fetch（旧）とServer Componentでfetch（新）の比較"
          description="左右のコードを見比べて、何が不要になったかを確認する"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 左: 旧パターン */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                React（ブラウザ側で取得）
              </p>
              <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
                <code>{`"use client";
import {
  useState,
  useEffect
} from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(r => r.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}`}</code>
              </pre>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-red-400">必要なもの:</p>
                <p className="text-xs text-gray-500 font-mono">"use client" — useState — useEffect — setUsers</p>
              </div>
            </div>

            {/* 右: 新パターン */}
            <div
              className="rounded-lg border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "rgba(6,182,212,0.5)" }}
            >
              <p className="text-xs font-semibold text-cyan-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                Next.js（サーバー側で取得）
              </p>
              <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
                <code>{`// "use client" なし
// useState なし
// useEffect なし

export default async function UserList() {
  const res = await fetch(
    "https://api.example.com/users"
  );
  const users = await res.json();

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}`}</code>
              </pre>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-cyan-400">シンプルになった:</p>
                <p className="text-xs text-gray-400 font-mono">asyncをつけるだけ。データが最初から入っている</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            Server ComponentではuseStateもuseEffectも不要。asyncを関数につけてawaitするだけでデータ取得が完了する
          </p>
        </ConceptDiagram>

        {/* Bridge A → B */}
        <Bridge
          from="旧パターンと新パターンの違いが分かった"
          to="なぜServer Componentでfetchが動くのか、仕組みをフローで確認する"
        />

        {/* 概念図B: Server Componentのデータ取得フロー */}
        <ConceptDiagram
          title="概念図B — Server Componentのデータ取得フロー"
          description="ブラウザがURLにアクセスしてからHTMLが届くまでの流れ"
        >
          <div className="flex flex-col items-center gap-0">
            <FlowCard
              Icon={Globe}
              title="ブラウザ"
              subtitle="URLにアクセス → リクエスト送信"
              accentColor="cyan"
            />
            <FlowArrow label="リクエスト" direction="down" />
            <FlowCard
              Icon={Server}
              title="Next.jsサーバー"
              subtitle="async関数が実行される"
              highlight
              accentColor="cyan"
            />
            <FlowArrow label={"await fetch(\"外部API\")"} direction="down" />
            <FlowCard
              Icon={Database}
              title="外部API"
              subtitle="データを返す"
              accentColor="cyan"
            />
            <FlowArrow label="JSONデータ" direction="down" />
            <FlowCard
              Icon={Monitor}
              title="Next.jsサーバー"
              subtitle="JSXをHTMLに変換（データ埋め込み済み）"
              highlight
              accentColor="cyan"
            />
            <FlowArrow label="完成したHTML" direction="down" />
            <FlowCard
              Icon={Globe}
              title="ブラウザ"
              subtitle="最初からデータ入りのHTMLが届く"
              accentColor="cyan"
            />
          </div>

          <div
            className="mt-5 rounded-lg border p-3"
            style={{ borderColor: "rgba(6,182,212,0.3)", backgroundColor: "rgba(6,182,212,0.05)" }}
          >
            <p className="text-xs text-cyan-300 leading-relaxed">
              useEffect+fetchとの違い: ブラウザに空のHTMLが届いてから取得開始するのではなく、サーバーで完成してから届く。ブラウザに届いた時点でデータはすでに埋め込まれている。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDivider前・基礎編内） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、asyncをつけるだけで自動的にサーバーで動くのか気になっていまして……本当にそれだけなんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そうです、マジさん。\nNext.jsのServer Componentはデフォルトでサーバー実行。\nasyncにするとawaitが書けるようになるだけで、追加の設定は不要です。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "ボク、ブラウザに届く時点でデータが入っているという感覚がまだ掴めなくて……useEffectのときの空の状態とは何が違うんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "useEffectのときはブラウザに空のHTMLが届いてからJSが動いてfetchを始めます、マジさん。\nServer Componentはサーバー側でfetchが完了してからHTMLを組み立てるので、ブラウザに届いた最初の瞬間からデータが入っているんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nボク、useEffect+fetchとServer Componentでどちらを使えばいいのか気になっていて……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "Server Componentでのfetchが使えるならそちらが推奨です、マジさん。\nただしuseStateで状態を持ちたい場合は 'use client' とuseEffect+fetchの組み合わせが必要になります。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "ボク、本物のAPIを使うときにURLはどこに書けばいいのか気になっていて……コードに直書きでいいんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "URLは直接コードに書いてOKです、マジさん。\nただしAPIキーなどの秘密情報は環境変数（.env）に入れて process.env.API_KEY で参照するのがルール。\nコードにそのまま書くと漏洩リスクがあります。",
          },
        ]}
      />

      {/* ── ComparisonTable ───────────────────────────────────── */}
      <ComparisonTable
        headers={["useEffect + fetch（CSR）", "async Server Component（SSR）"]}
        rows={[
          {
            label: "実行場所",
            cells: ["ブラウザ（クライアント）", "サーバー"],
            highlightCol: 1,
          },
          {
            label: "必要なHooks",
            cells: ["useState + useEffect", "不要"],
            highlightCol: 1,
          },
          {
            label: "初期表示",
            cells: [
              "空の状態で表示 → 取得後に更新",
              "データ入りのHTMLが最初から届く",
            ],
            highlightCol: 1,
          },
          {
            label: "use client",
            cells: ["必要（'use client'）", "不要（デフォルトがServer）"],
            highlightCol: 1,
          },
          {
            label: "SEO",
            cells: [
              "Googleに読まれにくい",
              "読まれやすい（HTMLにデータが入っている）",
            ],
            highlightCol: 1,
          },
        ]}
        highlightCol={1}
      />

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="fetchのキャッシュオプション・Suspense・詳細なエラーハンドリングを解説します"
      />

      {/* ── 応用編 TermNote ───────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "cache",
            definition: "fetchの第2引数options.cacheで動作を制御。force-cache=キャッシュ使用（高速）、no-store=毎回最新取得",
          },
          {
            word: "next.revalidate",
            definition: "fetchオプション。next: { revalidate: 60 }で60秒ごとにデータを再取得",
          },
          {
            word: "SWR/React Query",
            definition: "クライアントサイドのデータ取得ライブラリ。'use client' が必要な場面で使う選択肢",
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        {/* 概念図C: fetchのキャッシュオプション */}
        <ConceptDiagram
          title="概念図C — fetchのキャッシュオプション3パターン"
          description="どのパターンを使うかでパフォーマンスとデータの鮮度が変わる"
        >
          <div className="space-y-3">
            {/* パターン1: デフォルト */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs font-semibold text-gray-300 mb-2">1. デフォルト（force-cache）— ビルド時にキャッシュ</p>
              <pre className="text-xs text-gray-400 font-mono">
                <code>{`// キャッシュを最大限に活用。静的なコンテンツに最適
fetch(url)`}</code>
              </pre>
              <p className="text-xs text-gray-500 mt-2">ブログ記事・ドキュメントなど更新頻度が低いコンテンツ向け</p>
            </div>

            {/* パターン2: no-store */}
            <div
              className="rounded-lg border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "rgba(6,182,212,0.4)" }}
            >
              <p className="text-xs font-semibold text-cyan-300 mb-2">2. no-store — 毎回最新を取得</p>
              <pre className="text-xs text-cyan-200 font-mono">
                <code>{`// キャッシュなし。常に最新データが必要な場面
fetch(url, { cache: "no-store" })`}</code>
              </pre>
              <p className="text-xs text-gray-500 mt-2">在庫情報・ニュース・リアルタイムデータ向け</p>
            </div>

            {/* パターン3: revalidate */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs font-semibold text-gray-300 mb-2">3. revalidate — N秒ごとに再取得</p>
              <pre className="text-xs text-gray-400 font-mono">
                <code>{`// 60秒間はキャッシュを使い、以降は再取得
fetch(url, { next: { revalidate: 60 } })`}</code>
              </pre>
              <p className="text-xs text-gray-500 mt-2">商品ページ・SNSフィードなど「多少古くてもOK」なコンテンツ向け</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            「どれを使うか」はコンテンツの更新頻度とパフォーマンス要件のトレードオフで決める
          </p>
        </ConceptDiagram>

        {/* Bridge C → D */}
        <Bridge
          from="キャッシュ戦略の3パターンが分かった"
          to="次はデータ取得中のローディング表示をSuspenseで制御する方法を見る"
        />

        {/* 概念図D: SuspenseでローディングUI制御 */}
        <ConceptDiagram
          title="概念図D — Suspenseでローディング制御"
          description="データ取得中に表示するフォールバックUIをSuspenseで指定できる"
        >
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">Suspenseを使ったローディングUI</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
              <code>{`import { Suspense } from "react";
import { UserList } from "./UserList"; // async Server Component

export default function Page() {
  return (
    <main>
      <h1>ユーザー一覧</h1>

      {/* Suspenseでラップ。fallbackがローディング中に表示される */}
      <Suspense fallback={<p>読み込み中...</p>}>
        <UserList />
      </Suspense>
    </main>
  );
}`}</code>
            </pre>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2.5">
              <span className="text-xs text-cyan-300 leading-relaxed">
                Suspenseを使うとUserListのデータ取得が完了するまでfallbackを表示し、完了後に本コンテンツに差し替える。ページ全体をブロックしない。
              </span>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        {/* 7.1 なぜServer Componentでのfetchが推奨されるか */}
        <DetailBlock heading="7.1 なぜServer Componentでのfetchが推奨されるか">
          <p>
            Server ComponentでのfetchがuseEffect+fetchより推奨される理由は2つある。
          </p>
          <p>
            1つ目はパフォーマンス。useEffect+fetchではブラウザにJavaScriptバンドルを送ってから実行するため、ページの初期表示でデータが空になる。一方Server Componentはサーバーでデータを取得してからHTMLを返すため、ブラウザに届いた瞬間からコンテンツが表示される。Core Web Vitalsのひとつ、LCP（Largest Contentful Paint）の改善に直結する。
          </p>
          <p>
            2つ目はセキュリティ。Server Componentのコードはクライアントに送られない。そのためAPIキーやデータベース接続情報などの秘密情報をコード内で扱っても漏洩しない。useEffect+fetchの場合はコードがブラウザに届くため、秘密情報は必ずサーバー側のAPIを経由させる必要がある。
          </p>
          <KeyPoint>
            データ表示だけなら迷わずServer Componentのfetchを使う。useStateやonClickが必要になったときだけ 'use client' に切り替える。
          </KeyPoint>
        </DetailBlock>

        {/* 7.2 環境変数（.env）の使い方 */}
        <DetailBlock heading="7.2 環境変数（.env）の使い方">
          <p>
            APIキーなどの秘密情報はコードに直接書かない。プロジェクトルートの .env.local に書いて、コードからは process.env.変数名 で参照する。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">.env.local — プロジェクトルートに配置、Gitに含めない</p>
            <pre className="text-xs text-gray-300 font-mono whitespace-pre">
              <code>{`WEATHER_API_KEY=your_secret_key_here
DATABASE_URL=postgresql://...`}</code>
            </pre>
          </div>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">Server Componentからの参照</p>
            <pre className="text-xs text-gray-300 font-mono whitespace-pre overflow-x-auto">
              <code>{`export default async function WeatherPage() {
  const key = process.env.WEATHER_API_KEY; // 環境変数を参照
  const res = await fetch(
    \`https://api.weather.com/data?key=\${key}\`
  );
  const data = await res.json();
  return <p>{data.temperature}°C</p>;
}`}</code>
            </pre>
          </div>
          <WarningPoint>
            クライアントから参照できる環境変数にするには変数名を NEXT_PUBLIC_ で始める。ただし NEXT_PUBLIC_ のついた変数はブラウザから読めるので秘密情報には絶対に使わない。
          </WarningPoint>
        </DetailBlock>

        {/* 7.3 エラーハンドリング */}
        <DetailBlock heading="7.3 エラーハンドリング（try/catchでのfetch失敗処理）">
          <p>
            fetchが失敗した場合（ネットワークエラー・APIダウンなど）に備えてtry/catchを使う。HTTPエラー（404・500など）はfetch自体はresolveされるため、response.okを確認してから手動でthrowするのが定石。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
              <code>{`export default async function UserList() {
  try {
    const res = await fetch("https://api.example.com/users");

    if (!res.ok) {
      // HTTPエラー（404・500など）は手動でthrowが必要
      throw new Error(\`APIエラー: \${res.status}\`);
    }

    const users = await res.json();
    return (
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    );
  } catch (error) {
    // エラー時のフォールバックUI
    return <p>データの取得に失敗しました。後でもう一度試してください。</p>;
  }
}`}</code>
            </pre>
          </div>
          <KeyPoint>
            Next.jsにはapp/error.tsxというエラー境界の仕組みもある。コンポーネント単位でのtry/catchと組み合わせて使う。
          </KeyPoint>
        </DetailBlock>

        {/* 7.4 parallel fetchパターン */}
        <DetailBlock heading="7.4 parallel fetchパターン（Promise.allで並列取得）">
          <p>
            複数のAPIを順番にawaitすると合計時間がかかる。Promise.allを使うと並列で取得できて高速になる。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">順番に取得（遅い）vs 並列取得（速い）</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
              <code>{`// 順番に取得（合計: 1秒 + 1秒 = 2秒かかる）
const users = await fetch("/api/users").then(r => r.json());
const posts = await fetch("/api/posts").then(r => r.json());

// 並列取得（合計: max(1秒, 1秒) = 1秒で済む）
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
]);`}</code>
            </pre>
          </div>
          <KeyPoint>
            互いに依存しないAPIを複数叩く場合はPromise.allで並列化するのが基本。ページのロード時間が大幅に改善できる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        groups={[
          {
            label: "前提として読むページ",
            items: [
              {
                href: "/nextjs/server-component",
                title: "Server Components",
                description: "なぜデフォルトがServerなのか・'use client'の境界線を解説",
                icon: "Server",
              },
              {
                href: "/javascript/fetch",
                title: "fetch API（JS）",
                description: "fetchの基本（クライアント側）を確認する",
                icon: "Code2",
              },
            ],
          },
          {
            label: "次に読むページ",
            items: [
              {
                href: "/nextjs/api-routes",
                title: "API Routes",
                description: "自分でAPIエンドポイントを作る",
                icon: "Cloud",
              },
            ],
          },
        ]}
      />

      {/* ── PageDrill ─────────────────────────────────────────── */}
      <PageDrill
        groups={[
          { label: "基礎編ドリル", questions: dataFetchingQuestions },
          { label: "応用編ドリル", questions: dataFetchingAdvancedQuestions },
        ]}
      />
    </div>
  );
}
