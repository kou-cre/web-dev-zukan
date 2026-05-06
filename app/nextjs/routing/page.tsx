import Link from "next/link";
import {
  FileText,
  Layers,
  Code2,
  Server,
  Cloud,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { TermNote } from "@/components/TermNote";
import {
  ConceptDiagram,
} from "@/components/ConceptDiagram";
import { Bridge } from "@/components/Bridge";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { routingQuestions } from "@/content/questions/nextjs/routing";

export const metadata = {
  title: "App Router とファイルベースルーティング | Web開発図解",
  description:
    "Next.jsのApp Routerを図解で解説。ファイルを置くだけでURLが決まる仕組み・page.tsxとlayout.tsxの役割・動的セグメント[id]の使い方をゼロから学ぶ。",
};

export default function NextjsRoutingPage() {
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
        title="App Router とファイルベースルーティング"
        subtitle={"ファイルを app/ に置くだけでURLが決まる — Next.jsのルーティング設計"}
        accentColor="sky"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "ファイルベースルーティングとは何か（ファイルを置く=URLになる）",
          "app/page.tsxの最小構成",
          "layout.tsx で共通レイアウトを作る方法",
        ]}
        prerequisites={[
          "Reactコンポーネントが書ける（/react/components を読んだ）",
          "react-routerのルーティング概念を知っている（/react/routing を読んだ）",
        ]}
        outOfScope={[
          "loading.tsx・error.tsx・not-found.tsxなどのファイル規約（応用編で扱う）",
          "Route Groups（(group)フォルダ）（応用編で扱う）",
          "Pages Router（レガシー。新規開発はApp Routerを使う）",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"Next.jsのApp Routerは「ファイルを置く場所がURLになる」システム。app/page.tsxが「/」、app/about/page.tsxが「/about」になる。react-routerのように対応表を書く必要がなく、フォルダ構造がそのままURLになる。"}
        metaphorTitle="書類ファイルのキャビネット"
        metaphorPoints={[
          {
            label: "app/ フォルダ",
            real: "URLの引き出しが入ったキャビネット",
            metaphor: "app/ フォルダ",
          },
          {
            label: "page.tsx",
            real: "その引き出しに入っているページの書類",
            metaphor: "page.tsx",
          },
          {
            label: "layout.tsx",
            real: "全ての引き出しに共通で挟む「表紙シート」",
            metaphor: "layout.tsx",
          },
          {
            label: "フォルダ名=URL",
            real: "「about」という引き出しは「/about」というURL",
            metaphor: "フォルダ名=URL",
          },
        ]}
        definition={"App Routerはフォルダ構造でURLを決めるルーティングシステム。app/[フォルダ名]/page.tsxが各ページのコンポーネントになる。"}
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram A ────────── */}
      <Bridge
        from="ファイルを置く場所がURLになるという仕組みが分かった"
        to="実際のフォルダ構造とURLの対応関係を図で確認する"
      />

      {/* ── TermNote（基礎図の前） ───────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "App Router",
            definition:
              "Next.js 13以降の標準ルーティング。appフォルダ内のpage.tsxがURLに対応する",
          },
          {
            word: "ファイルベースルーティング",
            definition:
              "URLをコードで書かず、ファイルの置き場所でURLを決める仕組み",
          },
          {
            word: "page.tsx",
            definition:
              "そのURLで表示されるページコンポーネントを定義するファイル。このファイルだけがURLに対応する",
          },
          {
            word: "layout.tsx",
            definition:
              "複数のページに共通するレイアウト（ヘッダー・ナビなど）を定義するファイル",
          },
          {
            word: "Server Component",
            definition:
              "サーバーで実行されるコンポーネント。Next.jsではデフォルトがServer Component",
          },
        ]}
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 概念図A: フォルダ構造 = URLの対応関係 */}
        <ConceptDiagram
          title="概念図A — フォルダ構造 = URLの対応関係"
          description="appフォルダ内のディレクトリ構造がそのままURLになる"
        >
          {/* フォルダツリーとURLの対応 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* 左: フォルダ構造 */}
            <div
              className="rounded-lg border p-4 font-mono text-xs"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide not-italic font-sans">
                フォルダ構造
              </p>
              <div className="space-y-1.5 leading-relaxed">
                <p className="text-sky-300">app/</p>
                <p className="ml-3">
                  <span className="text-gray-500">├── </span>
                  <span className="text-sky-400">page.tsx</span>
                  <span className="text-gray-600 ml-1 text-xs">← ホーム</span>
                </p>
                <p className="ml-3">
                  <span className="text-gray-500">├── </span>
                  <span className="text-amber-300">about/</span>
                </p>
                <p className="ml-6">
                  <span className="text-gray-500">│&nbsp;&nbsp; └── </span>
                  <span className="text-sky-400">page.tsx</span>
                </p>
                <p className="ml-3">
                  <span className="text-gray-500">├── </span>
                  <span className="text-amber-300">blog/</span>
                </p>
                <p className="ml-6">
                  <span className="text-gray-500">│&nbsp;&nbsp; ├── </span>
                  <span className="text-sky-400">page.tsx</span>
                  <span className="text-gray-600 ml-1 text-xs">← 一覧</span>
                </p>
                <p className="ml-6">
                  <span className="text-gray-500">│&nbsp;&nbsp; └── </span>
                  <span className="text-green-300">[id]/</span>
                </p>
                <p className="ml-9">
                  <span className="text-gray-500">&nbsp;&nbsp;&nbsp;&nbsp; └── </span>
                  <span className="text-sky-400">page.tsx</span>
                  <span className="text-gray-600 ml-1 text-xs">← 個別</span>
                </p>
                <p className="ml-3">
                  <span className="text-gray-500">└── </span>
                  <span className="text-violet-300">layout.tsx</span>
                  <span className="text-gray-600 ml-1 text-xs">← 全共通</span>
                </p>
              </div>
            </div>

            {/* 右: URLの対応 */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                対応するURL
              </p>
              <div
                className="rounded-lg border p-3 flex items-center justify-between"
                style={{ borderColor: "#0ea5e940", backgroundColor: "#0ea5e908" }}
              >
                <code className="text-xs font-mono text-sky-400">app/page.tsx</code>
                <span className="text-gray-500 text-xs">→</span>
                <code className="text-xs font-mono text-white">/</code>
              </div>
              <div
                className="rounded-lg border p-3 flex items-center justify-between"
                style={{ borderColor: "#f59e0b40", backgroundColor: "#f59e0b08" }}
              >
                <code className="text-xs font-mono text-amber-300">app/about/page.tsx</code>
                <span className="text-gray-500 text-xs">→</span>
                <code className="text-xs font-mono text-white">/about</code>
              </div>
              <div
                className="rounded-lg border p-3 flex items-center justify-between"
                style={{ borderColor: "#f59e0b40", backgroundColor: "#f59e0b08" }}
              >
                <code className="text-xs font-mono text-amber-300">app/blog/page.tsx</code>
                <span className="text-gray-500 text-xs">→</span>
                <code className="text-xs font-mono text-white">/blog</code>
              </div>
              <div
                className="rounded-lg border p-3 flex items-center justify-between"
                style={{ borderColor: "#22c55e40", backgroundColor: "#22c55e08" }}
              >
                <code className="text-xs font-mono text-green-300">app/blog/[id]/page.tsx</code>
                <span className="text-gray-500 text-xs">→</span>
                <code className="text-xs font-mono text-white">/blog/42</code>
              </div>
              <div
                className="rounded-lg border p-3"
                style={{ borderColor: "#a855f740", backgroundColor: "#a855f708" }}
              >
                <code className="text-xs font-mono text-violet-300">app/layout.tsx</code>
                <span className="text-xs text-gray-400 ml-2">全ページ共通</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-2 leading-relaxed">
            react-routerのように対応表を手書きする必要はない。ファイルを置くだけでURLが自動で決まる
          </p>
        </ConceptDiagram>

        {/* Bridge: A → B */}
        <Bridge
          from="フォルダ構造がURLになる仕組みが分かった"
          to="実際のpage.tsxとlayout.tsxの最小コードを確認する"
        />

        {/* 概念図B: page.tsx と layout.tsx の最小例 */}
        <ConceptDiagram
          title="概念図B — page.tsx と layout.tsx の最小例"
          description="page.tsxはそのURLのコンテンツ、layout.tsxは全ページ共通の外枠"
        >
          {/* page.tsx */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <p className="text-xs font-semibold text-sky-300">page.tsx — URLに対応するページコンポーネント</p>
            </div>
            <div
              className="rounded-lg border p-4 font-mono text-xs"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p className="text-gray-500 mb-2">{"// app/page.tsx（ホームページ）"}</p>
              <p>
                <span className="text-violet-400">export default</span>
                <span className="text-blue-400">{" function"}</span>
                <span className="text-yellow-300"> HomePage</span>
                <span className="text-gray-300">{"() {"}</span>
              </p>
              <p className="ml-4">
                <span className="text-violet-400">return</span>
                <span className="text-gray-300"> {"("}</span>
              </p>
              <p className="ml-8">
                <span className="text-sky-400">{"<main>"}</span>
              </p>
              <p className="ml-12">
                <span className="text-sky-400">{"<h1>"}</span>
                <span className="text-gray-300">{"ホームページ"}</span>
                <span className="text-sky-400">{"</h1>"}</span>
              </p>
              <p className="ml-12">
                <span className="text-sky-400">{"<p>"}</span>
                <span className="text-gray-300">{"ここが / のコンテンツ"}</span>
                <span className="text-sky-400">{"</p>"}</span>
              </p>
              <p className="ml-8">
                <span className="text-sky-400">{"</main>"}</span>
              </p>
              <p className="ml-4">
                <span className="text-gray-300">{")"}</span>
                <span className="text-gray-300">;</span>
              </p>
              <p>
                <span className="text-gray-300">{"}"}</span>
              </p>
            </div>
          </div>

          {/* layout.tsx */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-violet-400" />
              <p className="text-xs font-semibold text-violet-300">layout.tsx — 全ページ共通のレイアウト</p>
            </div>
            <div
              className="rounded-lg border p-4 font-mono text-xs"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p className="text-gray-500 mb-2">{"// app/layout.tsx（全ページ共通レイアウト）"}</p>
              <p>
                <span className="text-violet-400">export default</span>
                <span className="text-blue-400">{" function"}</span>
                <span className="text-yellow-300"> RootLayout</span>
                <span className="text-gray-300">{"({"}</span>
              </p>
              <p className="ml-4">
                <span className="text-gray-300">{"children,"}</span>
              </p>
              <p>
                <span className="text-gray-300">{"}: {"}</span>
              </p>
              <p className="ml-4">
                <span className="text-gray-300">{"children: "}</span>
                <span className="text-blue-400">React.ReactNode</span>
                <span className="text-gray-300">;</span>
              </p>
              <p>
                <span className="text-gray-300">{"}) {"}</span>
              </p>
              <p className="ml-4">
                <span className="text-violet-400">return</span>
                <span className="text-gray-300"> {"("}</span>
              </p>
              <p className="ml-8">
                <span className="text-sky-400">{"<html"}</span>
                <span className="text-yellow-300">{" lang"}</span>
                <span className="text-gray-300">{"="}</span>
                <span className="text-orange-300">{'"ja"'}</span>
                <span className="text-sky-400">{">"}</span>
              </p>
              <p className="ml-12">
                <span className="text-sky-400">{"<body>"}</span>
              </p>
              <p className="ml-16">
                <span className="text-sky-400">{"<header>"}</span>
                <span className="text-gray-300">共通ヘッダー</span>
                <span className="text-sky-400">{"</header>"}</span>
              </p>
              <p className="ml-16">
                <span className="text-gray-300">{"{"}</span>
                <span className="text-yellow-300">children</span>
                <span className="text-gray-300">{"}"}</span>
                <span className="text-gray-600 ml-4">{"/* 各ページがここに入る */"}</span>
              </p>
              <p className="ml-16">
                <span className="text-sky-400">{"<footer>"}</span>
                <span className="text-gray-300">共通フッター</span>
                <span className="text-sky-400">{"</footer>"}</span>
              </p>
              <p className="ml-12">
                <span className="text-sky-400">{"</body>"}</span>
              </p>
              <p className="ml-8">
                <span className="text-sky-400">{"</html>"}</span>
              </p>
              <p className="ml-4">
                <span className="text-gray-300">{")"}</span>
                <span className="text-gray-300">;</span>
              </p>
              <p>
                <span className="text-gray-300">{"}"}</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            page.tsx は URLに対応するコンポーネント。layout.tsx は入れ子になって子のchildrenを包む。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — SectionDivider前） ──────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "question",
            text: "react-routerと何が違うんですか？ マジ？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "react-routerはルートの対応表をコードで書く必要がありました。\nApp Routerはファイルを置くだけで自動でURL対応します。\n対応表を書くという手間が完全になくなります。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "layout.tsxって何枚も置けるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "はい、フォルダごとに置けます。\nネストして、ヘッダーやサイドバーが入れ子になる形で階層的に適用されます。\n例えばapp/dashboard/layout.tsxを置けば、dashboard以下のページだけに追加のレイアウトを適用できます。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "Server Componentって何ですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Next.jsではデフォルトでコンポーネントがサーバーで動きます。\nuseStateを使いたいときだけファイルの先頭に「use client」を書けばクライアント（ブラウザ）で動くようになります。\n基本は「データ取得=Server、ボタン操作=Client」と分けて考えるとシンプルです。",
          },
        ]}
      />

      {/* ── ComparisonTable ──────────────────────────────────── */}
      <ComparisonTable
        headers={["react-router（SPA）", "App Router（Next.js）"]}
        rows={[
          {
            label: "URLの定義方法",
            cells: [
              "対応表をコードで書く",
              "ファイルを置く場所で自動決定",
            ],
            highlightCol: 1,
          },
          {
            label: "ページ追加",
            cells: [
              "Route要素を追記",
              "フォルダとpage.tsxを追加",
            ],
            highlightCol: 1,
          },
          {
            label: "レイアウト共有",
            cells: [
              "手動でコンポーネントを囲む",
              "layout.tsxを置くだけで自動適用",
            ],
            highlightCol: 1,
          },
          {
            label: "動的URL",
            cells: [
              "path='/:id'",
              "フォルダ名を[id]にする",
            ],
            highlightCol: 1,
          },
        ]}
        note="App Routerはファイル配置がそのままサイト構造になるため、プロジェクトのディレクトリを見るだけでURLが把握できる。"
      />

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はRouteファイル規約・動的セグメント・metadataなど発展的な内容です。基本が分かったら読んでみてください。"
      />

      {/* ── 応用編 TermNote ─────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "loading.tsx",
            definition:
              "URLに対応するページの読み込み中に表示されるコンポーネント",
          },
          {
            word: "error.tsx",
            definition:
              "エラーが発生したときに表示されるコンポーネント",
          },
          {
            word: "Route Group",
            definition:
              "(group)フォルダ。URLには影響せず、ファイル整理のためだけに使う",
          },
          {
            word: "動的セグメント",
            definition:
              "[id]のように[]で囲んだフォルダ名。URLパラメータとして値を受け取る",
          },
        ]}
      />

      {/* ── 応用編 ConceptDiagram C: Routeファイル規約 ──────── */}
      <section className="mb-10">
        <ConceptDiagram
          title="概念図C — Routeファイル規約"
          description="フォルダに置くだけで特定の機能が自動で有効になる特別なファイル名"
        >
          <div className="space-y-3">
            {[
              {
                file: "page.tsx",
                role: "そのURLのページコンポーネント。URLにアクセスしたときに表示される",
                color: "sky",
                borderColor: "#0ea5e940",
                bgColor: "#0ea5e908",
                textColor: "text-sky-400",
              },
              {
                file: "layout.tsx",
                role: "複数ページ共通のレイアウト。childrenを包む形で入れ子に適用される",
                color: "violet",
                borderColor: "#a855f740",
                bgColor: "#a855f708",
                textColor: "text-violet-400",
              },
              {
                file: "loading.tsx",
                role: "ページのデータ取得中にSuspenseで表示されるローディングUI",
                color: "amber",
                borderColor: "#f59e0b40",
                bgColor: "#f59e0b08",
                textColor: "text-amber-400",
              },
              {
                file: "error.tsx",
                role: "コンポーネントツリーでエラーが発生したときに表示されるエラーUI。必ず「use client」が必要",
                color: "red",
                borderColor: "#ef444440",
                bgColor: "#ef44440a",
                textColor: "text-red-400",
              },
              {
                file: "not-found.tsx",
                role: "notFound()が呼ばれたとき、またはURLが一致しないときに表示される404ページ",
                color: "gray",
                borderColor: "#6b728040",
                bgColor: "#6b728008",
                textColor: "text-gray-400",
              },
              {
                file: "template.tsx",
                role: "layout.tsxに似ているがナビゲーションのたびに新しいインスタンスが生成される。アニメーションに使う",
                color: "green",
                borderColor: "#22c55e40",
                bgColor: "#22c55e08",
                textColor: "text-green-400",
              },
            ].map((item) => (
              <div
                key={item.file}
                className="rounded-lg border p-3 flex items-start gap-3"
                style={{ borderColor: item.borderColor, backgroundColor: item.bgColor }}
              >
                <code className={`text-xs font-mono font-semibold ${item.textColor} flex-shrink-0 w-28`}>
                  {item.file}
                </code>
                <p className="text-xs text-gray-400 leading-relaxed">{item.role}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            これらのファイルはNext.jsが予約している特別なファイル名。page.tsx以外は必要なときだけ置けばよい
          </p>
        </ConceptDiagram>

        {/* ── 応用編 ConceptDiagram D: 動的セグメントとuseParams ── */}
        <ConceptDiagram
          title="概念図D — 動的セグメントとuseParams"
          description="[id]フォルダで可変なURLを受け取り、useParams()で値を取り出す"
        >
          <div
            className="rounded-lg border p-4 font-mono text-xs mb-4"
            style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
          >
            <p className="text-gray-500 mb-2">{"// app/blog/[id]/page.tsx"}</p>
            <p className="text-gray-600 mb-3">{"// /blog/42 でも /blog/hello でも対応できる"}</p>
            <p>
              <span className="text-violet-400">{'"use client"'}</span>
              <span className="text-gray-600 ml-3">{"// useParamsはClient Component"}</span>
            </p>
            <p className="mt-2">
              <span className="text-violet-400">import</span>
              <span className="text-gray-300">{" { useParams } "}</span>
              <span className="text-violet-400">from</span>
              <span className="text-green-400">{' "next/navigation"'}</span>
              <span className="text-gray-300">;</span>
            </p>
            <p className="mt-3">
              <span className="text-violet-400">export default</span>
              <span className="text-blue-400">{" function"}</span>
              <span className="text-yellow-300"> BlogPost</span>
              <span className="text-gray-300">{"() {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-violet-400">const</span>
              <span className="text-gray-300">{" { id } = "}</span>
              <span className="text-blue-400">useParams</span>
              <span className="text-gray-300">{"();"}</span>
              <span className="text-gray-600 ml-4">{"// URLの [id] を取得"}</span>
            </p>
            <p className="ml-4">
              <span className="text-violet-400">return</span>
              <span className="text-gray-300">{" <h1>"}</span>
              <span className="text-gray-300">{"ブログ記事 "}</span>
              <span className="text-gray-300">{"{"}</span>
              <span className="text-yellow-300">id</span>
              <span className="text-gray-300">{"}"}</span>
              <span className="text-gray-300">{"</h1>"}</span>
              <span className="text-gray-300">;</span>
            </p>
            <p>
              <span className="text-gray-300">{"}"}</span>
            </p>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #2d3048" }}>
              <p className="text-gray-600">{"// /blog/42 → <h1>ブログ記事 42</h1>"}</p>
              <p className="text-gray-600">{"// /blog/intro → <h1>ブログ記事 intro</h1>"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: "#0ea5e940", backgroundColor: "#0ea5e908" }}
            >
              <p className="text-xs font-bold text-sky-400 mb-1">[id] フォルダの意味</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                []で囲んだフォルダ名が動的セグメント。/blog/42の「42」や/blog/introの「intro」がidに入る。
              </p>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: "#22c55e40", backgroundColor: "#22c55e08" }}
            >
              <p className="text-xs font-bold text-green-400 mb-1">useParams の役割</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                URLから動的セグメントの値を取り出すHook。next/navigationからimportする（react-router-domではない）。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 応用編 DetailSection ─────────────────────────────── */}
      <DetailSection title="詳細解説">
        {/* 7.1 App RouterとPages Routerの違い */}
        <DetailBlock heading="7.1 App RouterとPages Routerの違い（App Routerを使うべき理由）">
          <p>
            Next.jsには2つのルーティング方式がある。新規プロジェクトでは必ずApp Routerを使う。Pages Routerはレガシー（古い方式）として残っている。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">App RouterとPages Routerの主な違い</p>
            <div className="space-y-2">
              <div className="flex gap-3 text-xs">
                <span className="text-sky-400 font-mono w-32 flex-shrink-0">フォルダ</span>
                <span className="text-gray-400">App Router: app/ / Pages Router: pages/</span>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="text-sky-400 font-mono w-32 flex-shrink-0">デフォルト実行</span>
                <span className="text-gray-400">App Router: サーバー / Pages Router: クライアント</span>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="text-sky-400 font-mono w-32 flex-shrink-0">データ取得</span>
                <span className="text-gray-400">App Router: async/await直接 / Pages Router: getServerSideProps</span>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="text-sky-400 font-mono w-32 flex-shrink-0">レイアウト</span>
                <span className="text-gray-400">App Router: layout.tsx / Pages Router: _app.tsx</span>
              </div>
            </div>
          </div>
          <KeyPoint>
            2023年以降の新規プロジェクトでApp Routerが標準。既存プロジェクトのPages Routerコードを読む機会もあるが、新しく書くときはApp Routerを使う。
          </KeyPoint>
        </DetailBlock>

        {/* 7.2 layout.tsxの入れ子とcomponent tree */}
        <DetailBlock heading="7.2 layout.tsxの入れ子とcomponent tree">
          <p>
            layout.tsxはフォルダごとに複数置ける。内側のlayout.tsxが外側のlayout.tsxのchildrenとして入る入れ子構造になる。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">ネストしたlayout.tsxの例</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`app/
├── layout.tsx        ← RootLayout（html・body・共通ナビ）
└── dashboard/
    ├── layout.tsx    ← DashboardLayout（サイドバー）
    └── page.tsx      ← DashboardPage（メインコンテンツ）

// /dashboard にアクセスすると:
// RootLayout > DashboardLayout > DashboardPage
// の順に入れ子になって表示される`}</code>
            </pre>
          </div>
          <KeyPoint>
            app/layout.tsxはルートレイアウトとして必須。html・body要素を含む唯一のレイアウト。それ以外のlayout.tsxは任意で追加できる。
          </KeyPoint>
        </DetailBlock>

        {/* 7.3 metadata（SEO対応）のexport方法 */}
        <DetailBlock heading="7.3 metadata（SEO対応）のexport方法">
          <p>
            App Routerではpage.tsxやlayout.tsxからmetadataオブジェクトをexportするだけでHTMLのtitleやdescriptionが設定できる。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">metadataのexport方法</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// app/about/page.tsx
export const metadata = {
  title: "私たちについて | サービス名",
  description: "サービスの説明文。検索結果に表示される。",
  openGraph: {
    title: "私たちについて",
    description: "OGPの説明文",
  },
};

export default function AboutPage() {
  return <main>コンテンツ</main>;
}`}</code>
            </pre>
          </div>
          <KeyPoint>
            metadataをexportするとNext.jsがHead要素を自動で構築する。Pages RouterのようにHead要素を手動で書く必要がない。Server Componentのファイルだけでexportできる。
          </KeyPoint>
        </DetailBlock>

        {/* 7.4 動的セグメントとgenerateStaticParams */}
        <DetailBlock heading="7.4 動的セグメントとgenerateStaticParams">
          <p>
            [id]のような動的URLを事前にHTMLとして生成（SSG）したい場合は、generateStaticParamsという関数をexportする。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">generateStaticParamsの例</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// app/blog/[id]/page.tsx

// ビルド時に生成するURLの一覧を返す関数
export async function generateStaticParams() {
  const posts = await fetch("/api/posts").then(r => r.json());
  return posts.map((post: { id: number }) => ({
    id: String(post.id),
  }));
}

// /blog/1, /blog/2, /blog/3... のHTMLが事前生成される
export default function BlogPost({ params }: { params: { id: string } }) {
  return <h1>ブログ記事 {params.id}</h1>;
}`}</code>
            </pre>
          </div>
          <WarningPoint>
            generateStaticParamsを定義しない場合、動的URLはリクエストのたびにサーバーで生成（SSR）される。アクセス数が多いページはgenerateStaticParamsで事前生成してキャッシュするとパフォーマンスが向上する。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/nextjs/data-fetching",
            title: "データフェッチ",
            description: "App Routerでのデータ取得パターン",
            icon: "Cloud",
          },
          {
            href: "/nextjs/server-component",
            title: "Server Components",
            description: "なぜApp RouterのデフォルトがServerなのか",
            icon: "Server",
          },
          {
            href: "/react/routing",
            title: "react-router（React）",
            description: "SPAのルーティングとの比較",
            icon: "Code2",
          },
        ]}
      />

      {/* ── PageDrill ───────────────────────────────────────── */}
      <PageDrill questions={routingQuestions} />
    </div>
  );
}
