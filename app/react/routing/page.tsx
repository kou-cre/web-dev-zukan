import Link from "next/link";
import {
  ArrowRight,
  Database,
  Code2,
  Server,
  Globe,
  Layers,
  ArrowDown,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { TermNote } from "@/components/TermNote";
import { SectionDivider } from "@/components/SectionDivider";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { Bridge } from "@/components/Bridge";
import { routingQuestions } from "@/content/questions/react/routing";

export const metadata = {
  title: "ルーティング（react-router）| Web開発図解",
  description:
    "react-routerによるSPAのルーティングを図解で解説。BrowserRouter・Routes・Route・Linkの基本から、URLパラメータ・useNavigateまで。",
};

export default function RoutingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ← React に戻る */}
      <div className="mb-6">
        <Link href="/react" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← React に戻る
        </Link>
      </div>

      {/* ── Hero ───────────────────────────────────────────── */}
      <Hero
        category="React"
        title="ルーティング（react-router）"
        subtitle={"URLが変わると見せるコンポーネントが変わる — SPAのページ切り替えの仕組み"}
        accentColor="violet"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "ルーティングとは何か（URLに応じてコンポーネントを切り替える仕組み）",
          "BrowserRouter・Routes・Routeの役割",
          "Linkコンポーネントでページを遷移する方法",
        ]}
        prerequisites={[
          "コンポーネントを定義してimport/exportできる（/react/components を読んだ）",
          "Propsを使ってデータを渡せる（/react/props を読んだ）",
          "useStateで状態を管理できる（/react/state を読んだ）",
        ]}
        outOfScope={[
          "URLパラメータ（:id）の取得（応用編で扱う）",
          "useNavigate でプログラム的に遷移する方法（応用編で扱う）",
          "Next.jsのファイルベースルーティング（/nextjs/routing で学ぶ）",
        ]}
      />

      {/* ── OnePageSummary ──────────────────────────────────── */}
      <OnePageSummary
        keyMessage="react-routerは「URLと表示コンポーネントの対応表」を作るライブラリ。URLが変わるとページ全体を再読み込みせずに、表示するコンポーネントだけが切り替わる。これがSPA（シングルページアプリケーション）の本質。"
        metaphorTitle="テレビのチャンネル切り替え"
        metaphorPoints={[
          { label: "URL", real: "チャンネル番号", metaphor: "URL" },
          { label: "Routes", real: "チャンネル一覧表（1チャンネル=ニュース、2チャンネル=映画...）", metaphor: "Routes" },
          { label: "Route", real: "1つのチャンネルの登録（この番号ならこの番組）", metaphor: "Route" },
          { label: "Link", real: "リモコンのボタン（クリックするとURLが変わる）", metaphor: "Link" },
        ]}
        definition="react-routerはURLに応じて表示するコンポーネントを切り替えるルーティングライブラリ。SPA（シングルページアプリ）でのページ切り替えに使う。"
      />

      {/* ── Bridge: OnePageSummary → 最初の ConceptDiagram ─── */}
      <Bridge
        from="ルーティングの概念（URLとコンポーネントの対応）が分かった"
        to="実際のコードでどう書くかを確認していく"
      />

      {/* ── 基礎編 TermNote ─────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "SPA（シングルページアプリケーション）",
            definition:
              "1つのHTMLページを読み込んでおき、URLの変化に応じてJavaScriptで表示内容を切り替えるWebアプリの形式。ページ全体を再読み込みしないため動作が速い。",
          },
          {
            word: "BrowserRouter",
            definition:
              "react-routerのルート（根元）コンポーネント。アプリ全体を包んで、URLの変化を監視する。",
          },
          {
            word: "Routes",
            definition:
              "複数のRouteをまとめる親要素。現在のURLに一致するRouteだけをレンダリングする。",
          },
          {
            word: "Route",
            definition:
              "「このURLのとき、このコンポーネントを表示する」を1つ定義する。",
          },
          {
            word: "Link",
            definition:
              "react-routerのリンクコンポーネント。通常のaタグと違い、ページ全体を再読み込みせずにURLだけを変える。",
          },
        ]}
      />

      {/* ── 基礎編 ConceptDiagram A ─────────────────────────── */}
      <ConceptDiagram
        title="概念図A — BrowserRouter・Routes・Route の基本構造"
        description="3つのコンポーネントを入れ子で組み合わせてルーティングを設定する"
      >
        {/* コード例 */}
        <div
          className="rounded-lg border p-4 font-mono text-xs mb-5 overflow-x-auto"
          style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
        >
          <p className="text-gray-500">{"// main.jsx（アプリのエントリポイント）"}</p>
          <p>
            <span className="text-violet-400">import</span>
            <span className="text-gray-300">{" { BrowserRouter, Routes, Route } "}</span>
            <span className="text-violet-400">from</span>
            <span className="text-green-400">{" \"react-router-dom\""}</span>
            <span className="text-gray-300">;</span>
          </p>
          <p className="mt-2">
            <span className="text-blue-400">function</span>
            <span className="text-yellow-300"> App</span>
            <span className="text-gray-300">{"() {"}</span>
          </p>
          <p className="ml-4">
            <span className="text-violet-400">return</span>
            <span className="text-gray-300"> {"("}</span>
          </p>
          <p className="ml-8">
            <span className="text-violet-400">{"<BrowserRouter>"}</span>
            <span className="text-gray-600 ml-6">{"// URLを監視するラッパー"}</span>
          </p>
          <p className="ml-12">
            <span className="text-blue-400">{"<Routes>"}</span>
            <span className="text-gray-600 ml-6">{"// 対応表のコンテナ"}</span>
          </p>
          <p className="ml-16">
            <span className="text-green-400">{"<Route "}</span>
            <span className="text-yellow-300">path</span>
            <span className="text-gray-300">{"="}</span>
            <span className="text-orange-300">{"\"/"}</span>
            <span className="text-orange-300">{"\" "}</span>
            <span className="text-yellow-300">element</span>
            <span className="text-gray-300">{"={"}</span>
            <span className="text-green-400">{"<Home />"}</span>
            <span className="text-gray-300">{"} />"}</span>
            <span className="text-gray-600 ml-2">{"// / → Home"}</span>
          </p>
          <p className="ml-16">
            <span className="text-green-400">{"<Route "}</span>
            <span className="text-yellow-300">path</span>
            <span className="text-gray-300">{"="}</span>
            <span className="text-orange-300">{"\"/about\""}</span>
            <span className="text-gray-300">{" "}</span>
            <span className="text-yellow-300">element</span>
            <span className="text-gray-300">{"={"}</span>
            <span className="text-green-400">{"<About />"}</span>
            <span className="text-gray-300">{"} />"}</span>
            <span className="text-gray-600 ml-2">{"// /about → About"}</span>
          </p>
          <p className="ml-16">
            <span className="text-green-400">{"<Route "}</span>
            <span className="text-yellow-300">path</span>
            <span className="text-gray-300">{"="}</span>
            <span className="text-orange-300">{"\"/contact\""}</span>
            <span className="text-gray-300">{" "}</span>
            <span className="text-yellow-300">element</span>
            <span className="text-gray-300">{"={"}</span>
            <span className="text-green-400">{"<Contact />"}</span>
            <span className="text-gray-300">{"} />"}</span>
            <span className="text-gray-600 ml-2">{"// /contact → Contact"}</span>
          </p>
          <p className="ml-12">
            <span className="text-blue-400">{"</Routes>"}</span>
          </p>
          <p className="ml-8">
            <span className="text-violet-400">{"</BrowserRouter>"}</span>
          </p>
          <p className="ml-4">
            <span className="text-gray-300">{")"}</span>
            <span className="text-gray-300">;</span>
          </p>
          <p>
            <span className="text-gray-300">{"}"}</span>
          </p>
        </div>

        {/* 3列グリッド：各コンポーネントの役割 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "#7c3aed66", backgroundColor: "#7c3aed0a" }}
          >
            <p className="text-xs font-bold text-violet-400 mb-1">BrowserRouter</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              URLの変化を監視・管理する「基地局」。アプリの最外側に1つだけ置く。
            </p>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "#3b82f666", backgroundColor: "#3b82f60a" }}
          >
            <p className="text-xs font-bold text-blue-400 mb-1">Routes</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              「今のURLに一致するRouteを1つ選んで表示する」セレクター。
            </p>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "#22c55e66", backgroundColor: "#22c55e0a" }}
          >
            <p className="text-xs font-bold text-green-400 mb-1">Route</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              path（URLのパターン）とelement（表示するコンポーネント）のペアを定義する。
            </p>
          </div>
        </div>
      </ConceptDiagram>

      {/* ── Bridge: A → B ───────────────────────────────────── */}
      <Bridge
        from="ルーティングの基本構造（BrowserRouter・Routes・Route）が分かった"
        to="次はLinkでページを遷移する方法を見ていく"
      />

      {/* ── 基礎編 ConceptDiagram B ─────────────────────────── */}
      <ConceptDiagram
        title="概念図B — Linkコンポーネントで遷移する"
        description="aタグの代わりにLinkを使うとページ全体を再読み込みせずにURLが変わる"
      >
        {/* aタグ（NG）とLink（OK）の比較 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "#ef444440", backgroundColor: "#ef44440a" }}
          >
            <p className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">
              NG — 通常の a タグ
            </p>
            <div
              className="rounded border p-2 font-mono text-xs"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p>
                <span className="text-gray-600">{"{"}</span>
                <span className="text-gray-600">{"/* ページ全体が再読み込みされる */"}</span>
                <span className="text-gray-600">{"}"}</span>
              </p>
              <p>
                <span className="text-red-400">{"<a"}</span>
                <span className="text-yellow-300">{" href"}</span>
                <span className="text-gray-300">{"="}</span>
                <span className="text-orange-300">{"\"/about\""}</span>
                <span className="text-red-400">{">"}</span>
                <span className="text-gray-300">About</span>
                <span className="text-red-400">{"</a>"}</span>
              </p>
            </div>
            <p className="text-xs text-red-400 mt-2">
              Reactの状態がリセットされる。ページ全体をサーバーから取り直す。
            </p>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "#22c55e40", backgroundColor: "#22c55e0a" }}
          >
            <p className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wide">
              OK — Link コンポーネント
            </p>
            <div
              className="rounded border p-2 font-mono text-xs"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p>
                <span className="text-violet-400">import</span>
                <span className="text-gray-300">{" { Link } "}</span>
                <span className="text-violet-400">from</span>
                <span className="text-green-400">{" \"react-router-dom\""}</span>
                <span className="text-gray-300">;</span>
              </p>
              <p className="mt-1">
                <span className="text-green-400">{"<Link"}</span>
                <span className="text-yellow-300">{" to"}</span>
                <span className="text-gray-300">{"="}</span>
                <span className="text-orange-300">{"\"/about\""}</span>
                <span className="text-green-400">{">"}</span>
                <span className="text-gray-300">About</span>
                <span className="text-green-400">{"</Link>"}</span>
              </p>
            </div>
            <p className="text-xs text-green-400 mt-2">
              URLだけが変わる。Reactの状態（ログイン情報・カートの中身）は維持される。
            </p>
          </div>
        </div>

        {/* ナビバー実装例 */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            ナビバーの実装例
          </p>
          <div
            className="rounded-lg border p-3 font-mono text-xs"
            style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
          >
            <p>
              <span className="text-blue-400">function</span>
              <span className="text-yellow-300"> Navbar</span>
              <span className="text-gray-300">{"() {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-violet-400">return</span>
              <span className="text-gray-300"> {"("}</span>
            </p>
            <p className="ml-8">
              <span className="text-blue-400">{"<nav>"}</span>
            </p>
            <p className="ml-12">
              <span className="text-green-400">{"<Link"}</span>
              <span className="text-yellow-300">{" to"}</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-orange-300">{"\"/"}</span>
              <span className="text-orange-300">{"\">"}</span>
              <span className="text-gray-300">{"ホーム"}</span>
              <span className="text-green-400">{"</Link>"}</span>
            </p>
            <p className="ml-12">
              <span className="text-green-400">{"<Link"}</span>
              <span className="text-yellow-300">{" to"}</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-orange-300">{"\"/about\""}</span>
              <span className="text-gray-300">{">About"}</span>
              <span className="text-green-400">{"</Link>"}</span>
            </p>
            <p className="ml-12">
              <span className="text-green-400">{"<Link"}</span>
              <span className="text-yellow-300">{" to"}</span>
              <span className="text-gray-300">{"="}</span>
              <span className="text-orange-300">{"\"/contact\""}</span>
              <span className="text-gray-300">{">お問い合わせ"}</span>
              <span className="text-green-400">{"</Link>"}</span>
            </p>
            <p className="ml-8">
              <span className="text-blue-400">{"</nav>"}</span>
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

        {/* Linkのポイント */}
        <div
          className="rounded-lg border p-3"
          style={{ borderColor: "#7c3aed40", backgroundColor: "#7c3aed08" }}
        >
          <p className="text-xs font-semibold text-violet-300 mb-1">ポイント</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Linkは<code className="px-1 rounded font-mono text-violet-300" style={{ backgroundColor: "#0f1117" }}>to</code>を使う（hrefではない）。aタグとの最大の違いはページ再読み込みが起きないこと。
          </p>
        </div>
      </ConceptDiagram>

      {/* ── MajiDialogue（基礎編 — SectionDivider前） ──────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター……ルーティングって何がうれしいんですか？\nページごとにHTMLファイルを作ればよくないですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い疑問です、マジさん。\nHTMLファイルを分ける方法だと、ページ移動のたびにサーバーからHTMLを取り直します。\n全体が読み込み直されるので、動画の再生が止まったり、ログイン状態が消えたりします。\nSPAとreact-routerを使えば、URLだけが変わってコンポーネントが差し替わるだけ。\nアプリの状態（ログイン情報・カートの中身）が維持されます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "じゃあreact-routerはどうやってURLが変わったことを知るんですか？ マジ？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "BrowserRouterがブラウザのHistory APIを監視しているんです。\nLinkをクリックするとURLだけが変わり、BrowserRouterがそれを検知します。\nそしてRoutesが「今のURLに一致するRouteを1つ」選んでそのコンポーネントを表示します。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "つまりユーザーからは「ページが変わった」ように見えるけど、実際はコンポーネントが入れ替わっているだけなんですね。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "完璧な理解です、マジさん。\nこれがSPAの本質。\nHTMLのページ移動という概念を、コンポーネントの切り替えで再現しているんです。\nだからLINEやTwitterのような「ページ遷移が速いアプリ」が作れます。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ───────────────────────────────── */}
      <ComparisonTable
        headers={["通常のHTMLサイト（MPA）", "react-router（SPA）"]}
        rows={[
          {
            label: "ページ移動",
            cells: [
              "サーバーから新しいHTMLを取得して全体を再描画",
              "URLが変わるだけ。コンポーネントが差し替わる",
            ],
            highlightCol: 1,
          },
          {
            label: "Reactの状態",
            cells: [
              "ページ移動のたびにリセット",
              "状態（ログイン情報・フォーム入力等）を維持できる",
            ],
            highlightCol: 1,
          },
          {
            label: "初回読み込み",
            cells: [
              "軽い（必要なページだけ取得）",
              "やや重い（JSバンドル全体を最初にダウンロード）",
            ],
            highlightCol: 0,
          },
          {
            label: "SEO（検索エンジン）",
            cells: [
              "対応しやすい（HTMLが完成している）",
              "追加設定が必要（Next.jsのSSRで解決）",
            ],
            highlightCol: 0,
          },
        ]}
        note="SPAはアプリ的なUIに向いている（管理画面・ダッシュボード・チャット）。ブログ・ECのような公開サイトはNext.jsのSSRと組み合わせるのが一般的。"
      />

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はURLパラメータ・useNavigate・ネストされたルートについての内容です。基本が分かったら読んでみてください。"
      />

      {/* ── 応用編 TermNote ─────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "URLパラメータ（:id）",
            definition:
              "Route path='/:id' のように:で始まる部分。URLに含まれた変数を取り出せる。",
          },
          {
            word: "useParams",
            definition:
              "URLパラメータの値を取得するHook。const { id } = useParams() の形で使う。",
          },
          {
            word: "useNavigate",
            definition:
              "Linkコンポーネントを使わずに、JavaScript側でページ遷移を発生させるHook。フォーム送信後のリダイレクトなどに使う。",
          },
          {
            word: "ネストされたルート",
            definition:
              "Routeの中にさらにRouteを入れる書き方。共通レイアウト（ヘッダー・サイドバー付きのページ群）を作るときに使う。",
          },
          {
            word: "Outlet",
            definition:
              "ネストされたルートで「子Routeのコンポーネントを表示する場所」を指定するコンポーネント。",
          },
        ]}
      />

      {/* ── 応用編 ConceptDiagram C ─────────────────────────── */}
      <ConceptDiagram
        title="概念図C — URLパラメータとuseParams"
        description="URLに含まれた変数（IDなど）を取り出してコンポーネントで使う"
      >
        <div
          className="rounded-lg border p-4 font-mono text-xs mb-4"
          style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
        >
          <p className="text-gray-500 mb-1">{"// Routeの定義（:id が変数部分）"}</p>
          <p>
            <span className="text-green-400">{"<Route "}</span>
            <span className="text-yellow-300">path</span>
            <span className="text-gray-300">{"="}</span>
            <span className="text-orange-300">{"\"/users/:id\""}</span>
            <span className="text-gray-300">{" "}</span>
            <span className="text-yellow-300">element</span>
            <span className="text-gray-300">{"={"}</span>
            <span className="text-green-400">{"<UserProfile />"}</span>
            <span className="text-gray-300">{"} />"}</span>
          </p>

          <div className="mt-4 pt-4" style={{ borderTop: "1px solid #2d3048" }}>
            <p className="text-gray-500 mb-1">{"// UserProfile コンポーネント"}</p>
            <p>
              <span className="text-violet-400">import</span>
              <span className="text-gray-300">{" { useParams } "}</span>
              <span className="text-violet-400">from</span>
              <span className="text-green-400">{" \"react-router-dom\""}</span>
              <span className="text-gray-300">;</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-400">function</span>
              <span className="text-yellow-300"> UserProfile</span>
              <span className="text-gray-300">{"() {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-violet-400">const</span>
              <span className="text-gray-300">{" { id } = "}</span>
              <span className="text-blue-400">useParams</span>
              <span className="text-gray-300">{"();"}</span>
              <span className="text-gray-600 ml-4">{"// URLの :id を取得"}</span>
            </p>
            <p className="ml-4">
              <span className="text-violet-400">return</span>
              <span className="text-gray-300">{" <p>"}</span>
              <span className="text-gray-300">{"ユーザーID: "}</span>
              <span className="text-gray-300">{"{"}</span>
              <span className="text-yellow-300">id</span>
              <span className="text-gray-300">{"}"}</span>
              <span className="text-gray-300">{"</p>"}</span>
              <span className="text-gray-300">;</span>
            </p>
            <p>
              <span className="text-gray-300">{"}"}</span>
            </p>
          </div>

          <div className="mt-4 pt-4" style={{ borderTop: "1px solid #2d3048" }}>
            <p className="text-gray-600">{"// /users/42 → \"ユーザーID: 42\" が表示される"}</p>
            <p className="text-gray-600">{"// /users/マジ → \"ユーザーID: マジ\" が表示される"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "#7c3aed40", backgroundColor: "#7c3aed08" }}
          >
            <p className="text-xs font-bold text-violet-400 mb-1">:id の意味</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              コロン（:）で始まる部分が変数。/users/42 の「42」が :id にマッチする。
              /users/マジ の「マジ」が :id にマッチする。
            </p>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "#22c55e40", backgroundColor: "#22c55e0a" }}
          >
            <p className="text-xs font-bold text-green-400 mb-1">useParams の役割</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              URLから変数部分の値を取り出すHook。
              {"{"}id{"}"} = useParams() で変数名をそのまま取り出せる。
            </p>
          </div>
        </div>
      </ConceptDiagram>

      {/* ── Bridge: C → D ───────────────────────────────────── */}
      <Bridge
        from="URLパラメータでIDを取得する方法が分かった"
        to="次はJavaScript側からプログラム的にページを遷移させる方法"
      />

      {/* ── 応用編 ConceptDiagram D ─────────────────────────── */}
      <ConceptDiagram
        title="概念図D — useNavigateでプログラム的に遷移する"
        description="フォーム送信後などにLink以外の方法でページ遷移を発生させる"
      >
        <div
          className="rounded-lg border p-4 font-mono text-xs mb-4"
          style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
        >
          <p>
            <span className="text-violet-400">import</span>
            <span className="text-gray-300">{" { useNavigate } "}</span>
            <span className="text-violet-400">from</span>
            <span className="text-green-400">{" \"react-router-dom\""}</span>
            <span className="text-gray-300">;</span>
          </p>
          <p className="mt-3">
            <span className="text-blue-400">function</span>
            <span className="text-yellow-300"> LoginForm</span>
            <span className="text-gray-300">{"() {"}</span>
          </p>
          <p className="ml-4">
            <span className="text-violet-400">const</span>
            <span className="text-gray-300"> navigate = </span>
            <span className="text-blue-400">useNavigate</span>
            <span className="text-gray-300">{"();"}</span>
          </p>
          <p className="mt-2 ml-4">
            <span className="text-violet-400">const</span>
            <span className="text-gray-300"> handleSubmit = </span>
            <span className="text-blue-400">async</span>
            <span className="text-gray-300"> {"(e) => {"}</span>
          </p>
          <p className="ml-8">
            <span className="text-gray-300">e.</span>
            <span className="text-blue-400">preventDefault</span>
            <span className="text-gray-300">{"();"}</span>
          </p>
          <p className="ml-8">
            <span className="text-blue-400">await</span>
            <span className="text-gray-300"> </span>
            <span className="text-blue-400">login</span>
            <span className="text-gray-300">{"();"}</span>
            <span className="text-gray-600 ml-4">{"// ログイン処理"}</span>
          </p>
          <p className="ml-8">
            <span className="text-blue-400">navigate</span>
            <span className="text-gray-300">{"("}</span>
            <span className="text-orange-300">{"\"/dashboard\""}</span>
            <span className="text-gray-300">{");"}</span>
            <span className="text-gray-600 ml-4">{"// ログイン後にリダイレクト"}</span>
          </p>
          <p className="ml-4">
            <span className="text-gray-300">{"};"}</span>
          </p>
          <p className="mt-2 ml-4">
            <span className="text-violet-400">return</span>
            <span className="text-gray-300">{" <form"}</span>
            <span className="text-yellow-300"> onSubmit</span>
            <span className="text-gray-300">{"={handleSubmit}>...</form>;"}</span>
          </p>
          <p>
            <span className="text-gray-300">{"}"}</span>
          </p>
        </div>

        <div
          className="rounded-lg border p-3"
          style={{ borderColor: "#7c3aed40", backgroundColor: "#7c3aed08" }}
        >
          <p className="text-xs font-semibold text-violet-300 mb-2">よく使うパターン</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300">
                <code className="px-1 rounded font-mono text-violet-300" style={{ backgroundColor: "#0f1117" }}>navigate("/dashboard")</code>
                {" "}— 指定のパスへ遷移する
              </p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300">
                <code className="px-1 rounded font-mono text-violet-300" style={{ backgroundColor: "#0f1117" }}>navigate(-1)</code>
                {" "}— 1つ前のページに戻る（ブラウザの戻るボタンと同じ）
              </p>
            </div>
          </div>
        </div>
      </ConceptDiagram>

      {/* ── 応用編 DetailSection ────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 react-routerのインストール">
          <p>
            react-routerはReactに組み込まれていないため、別途インストールが必要。
          </p>
          <p>
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>
              npm install react-router-dom
            </code>
            {" "}でインストールする。importするときは
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>
              {" react-router-dom "}
            </code>
            から（react-routerではなく末尾に-domがつく）。
          </p>
          <KeyPoint>
            Next.jsはreact-routerを使わない。Next.jsにはファイルベースルーティングが組み込まれており、app/フォルダ配下のディレクトリ構造がそのままURLになる。react-routerはVite + Reactなどの素のReact環境で使う。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 NotFoundページ（path=「*」）">
          <p>
            存在しないURLにアクセスされたとき用の「404ページ」を設定するには、pathに
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"\"*\""}</code>
            {" "}を使う。
          </p>
          <p>
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>
              {"<Route path=\"*\" element={<NotFound />} />"}
            </code>
            {" "}を Routesの末尾に追加する。他のRouteが一致しなかったとき、最後の手段としてこのRouteが使われる。
          </p>
          <WarningPoint>
            path="*" は必ず Routesの一番下（他のRouteよりも後）に書く。上に書いてしまうと全てのURLがNotFoundにマッチしてしまう。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 ネストされたルートとOutlet">
          <p>
            管理画面のような「共通ヘッダー・サイドバーを持つページ群」はネストされたルートで実現する。
          </p>
          <p>
            親Routeのコンポーネント内で
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"<Outlet />"}</code>
            {" "}を置いた位置に、子Routeのコンポーネントが表示される。ヘッダーやサイドバーは親側で一度書くだけで、全子ページに自動で適用される。
          </p>
          <KeyPoint>
            ネストされたルートはコードの重複を大幅に減らす。共通レイアウト（ナビゲーション・フッター）を親Routeのコンポーネントに書いておけば、子Routeでは各ページのコンテンツだけに集中できる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 SPAのSEO問題とNext.jsへの接続">
          <p>
            react-routerを使った純粋なSPAには、SEO上の課題がある。検索エンジンのクローラーはJavaScriptの実行が苦手なため、JavaScriptで描画されるコンテンツをうまく認識できないことがある。
          </p>
          <p>
            ブログ・ECサイト・LP（ランディングページ）などの公開サイトでは、Next.jsのSSR（サーバーサイドレンダリング）またはSSG（静的サイト生成）を使ってHTMLを事前に生成するのが一般的。
          </p>
          <p>
            管理画面・ダッシュボード・チャットなどSEOが不要なアプリ的なUIには、react-router + 純粋なSPAが適している。
          </p>
          <KeyPoint>
            「公開が必要 = Next.js」「ログイン後の管理画面 = react-router（SPA）」という使い分けが実務のスタートライン。Next.jsはreact-routerの上位互換ではなく、別の解決策を提供するフレームワーク。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/react/context",
            title: "Context と useContext",
            description: "ルーティングと組み合わせるグローバル状態管理",
            icon: "Database",
          },
          {
            href: "/react/hooks",
            title: "カスタムHooks",
            description: "ルーティングロジックをHookに切り出す技術",
            icon: "Code2",
          },
          {
            href: "/javascript/fetch",
            title: "fetch API（JS）",
            description: "ルーティング先でデータを取得するためのAPI通信",
            icon: "Server",
          },
        ]}
      />

      {/* ── PageDrill ───────────────────────────────────────── */}
      <PageDrill questions={routingQuestions} />
    </div>
  );
}
