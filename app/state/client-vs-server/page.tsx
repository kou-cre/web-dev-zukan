import {
  SplitSquareHorizontal,
  Server,
  Monitor,
  RefreshCw,
  AlertTriangle,
  Clock,
  Database,
  Wifi,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CorrectionCard } from "@/components/CorrectionCard";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { clientVsServerQuestions } from "@/content/questions/state/client-vs-server";

export const metadata = {
  title: "クライアント状態とサーバー状態 | Web開発図解",
  description:
    "UIの状態とサーバーデータの違いを図解で解説。なぜ分けて管理するのか・useState だけでは何が足りないかを理解する。",
};

export default function ClientVsServerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/state" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 状態管理に戻る
        </Link>
      </div>

      <Hero
        category="状態管理"
        title="クライアント状態とサーバー状態"
        subtitle={"「UIが持つ値」と「サーバーから借りてきたデータ」は根本的に違う"}
        body={"2種類の状態を正しく区別することが、複雑にならないアプリ設計の第一歩。"}
        accentColor="teal"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "クライアント状態とサーバー状態の違い",
          "なぜ2つを分けて管理すべきなのか",
          "それぞれに適したツールの種類",
        ]}
        prerequisites={[
          "useState の基本（値が変わると再レンダリングされる）",
          "fetch や API という言葉を見たことがある",
          "状態 = コンポーネントが持つ変わる値、というイメージ",
        ]}
        outOfScope={[
          "TanStack Query の詳細な使い方（別ページで扱う）",
          "Zustand によるグローバルなクライアント状態管理（別ページ）",
          "Context API の詳細（別ページ）",
        ]}
      />

      <OnePageSummary
        keyMessage="Reactアプリには2種類の状態がある。ボタンの開閉・タブの選択など「UI自身の一時的な値」がクライアント状態。APIから取得した商品リストやユーザー情報など「サーバーが持つデータのコピー」がサーバー状態。この2つは性質が根本的に違うため、同じ useState で管理しようとすると複雑になる。"
        metaphorTitle="カフェのホール係と厨房の違い"
        metaphorPoints={[
          {
            label: "クライアント状態",
            real: "ホール係の頭の中の情報（3番テーブル会計待ち・4番テーブル注文済み）。自分が管理して自分が更新する。",
            metaphor: "ホール係の頭の中",
          },
          {
            label: "サーバー状態",
            real: "厨房のホワイトボードの在庫（本日のランチ・残り数）。サーバーが更新するため、ホール係のメモは古くなる可能性がある。",
            metaphor: "厨房のホワイトボード",
          },
          {
            label: "同期の問題",
            real: "ホール係が勝手に手帳に書き写しても、厨房が更新したら古い情報になる。これがサーバー状態管理の難しさ。",
            metaphor: "手帳の古い在庫メモ",
          },
        ]}
        definition="クライアント状態はUI自身が持つ一時的な情報。サーバー状態はリモートのデータを「今このタイミングで取得したコピー」。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          まず2種類の状態の特徴の違いを掴み、次にサーバー状態がなぜ複雑になるのかを順番に確認します。
        </p>

        {/* ── 概念図A: 2種類の状態の特徴 ── */}
        <ConceptDiagram
          title="概念図A"
          description="クライアント状態とサーバー状態——何が違うのか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* クライアント状態 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-teal-400" />
                <p className="text-sm font-bold text-white">クライアント状態</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>
                    情報の出所：<span className="text-teal-300">UI自身</span>
                    <span className="text-gray-600">（ユーザーの操作で変わる）</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>
                    古くなるか：<span className="text-teal-300">ならない</span>
                    <span className="text-gray-600">（自分が更新者）</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>
                    キャッシュ：<span className="text-teal-300">不要</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>
                    管理ツール：<span className="text-teal-300">useState / Zustand</span>
                  </span>
                </li>
              </ul>
              <div
                className="mt-3 rounded-lg px-3 py-2 text-xs text-gray-500 space-y-1"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <p>典型例:</p>
                <p className="text-gray-400">・モーダルの開閉（isOpen）</p>
                <p className="text-gray-400">・選択中のタブ</p>
                <p className="text-gray-400">・フォームの入力途中の値</p>
              </div>
            </div>

            {/* サーバー状態 */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(20,184,166,0.05)",
                borderColor: "rgba(20,184,166,0.35)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-5 h-5 text-teal-300" />
                <p className="text-sm font-bold text-white">サーバー状態</p>
              </div>
              <ul className="text-xs text-gray-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    情報の出所：<span className="text-amber-300">リモートAPI・DB</span>
                    <span className="text-gray-500">（他人が更新する）</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    古くなるか：<span className="text-amber-300">なる可能性がある</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    キャッシュ：<span className="text-amber-300">必要</span>
                    <span className="text-gray-500">（毎回fetchは遅い）</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    管理ツール：<span className="text-teal-300">TanStack Query / SWR</span>
                  </span>
                </li>
              </ul>
              <div
                className="mt-3 rounded-lg px-3 py-2 text-xs text-gray-400 space-y-1"
                style={{ backgroundColor: "#0f1117" }}
              >
                <p className="text-gray-500">典型例:</p>
                <p>・商品一覧・投稿リスト</p>
                <p>・ログイン中のユーザー情報</p>
                <p>・在庫数・価格</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「誰が更新するか」が本質的な違い。自分 = クライアント状態。他人（サーバー）= サーバー状態。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          特徴の違いが分かりました。次は「サーバー状態の管理は何が大変なのか」をデータ取得の流れで確認します。
        </p>

        {/* ── 概念図B: サーバー状態の複雑さ ── */}
        <ConceptDiagram
          title="概念図B"
          description="サーバー状態を自前で管理しようとすると、これだけの関心事が必要になる"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Wifi}
              title="fetch 開始"
              subtitle="APIにリクエスト"
              accentColor="teal"
            />
            <FlowArrow label="通信中" direction="right" />
            <FlowCard
              Icon={Clock}
              title="loading 表示"
              subtitle="isLoading: true"
              highlight
              accentColor="teal"
            />
            <FlowArrow label="受信" direction="right" />
            <FlowCard
              Icon={Database}
              title="データ保持"
              subtitle="useState に格納"
              accentColor="teal"
            />
            <FlowArrow label="古くなる？" direction="right" />
            <FlowCard
              Icon={RefreshCw}
              title="再取得"
              subtitle="いつ re-fetch？"
              accentColor="teal"
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-3">useStateだけで管理すると自分で書く必要があるもの</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { label: "isLoading", desc: "読み込み中かどうかのフラグ" },
                { label: "isError", desc: "エラーが起きたかどうかのフラグ" },
                { label: "error", desc: "エラーの内容を保持する変数" },
                { label: "data", desc: "取得したデータを保持する変数" },
                { label: "refetch", desc: "手動で再取得する関数" },
                { label: "stale 管理", desc: "データが古いかどうかの判断" },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="rounded-lg px-3 py-2 flex items-center gap-2"
                  style={{ backgroundColor: "#1a1d2a" }}
                >
                  <span className="text-teal-300 font-mono font-semibold flex-shrink-0">{label}</span>
                  <span className="text-gray-500">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            これを全部自前で書くのが「サーバー状態をuseStateだけで管理する」ということ。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、「状態管理」って言葉をよく聞くんですが、ボクまだ全部useStateで管理していて……それじゃダメなんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "カフェを想像してください、マジさん。ホール係が「3番テーブルは会計待ち」「4番テーブルは注文済み」と頭の中で管理するのがクライアント状態。\nこれはホール係自身が更新する情報です。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え、確かに。それはホール係の頭の中にある情報ですね。古くなることはない……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "でも「本日のランチメニューの在庫」は厨房のホワイトボードに書いてある。これがサーバー状態です。\nホール係が勝手に手帳に書き写しても、厨房が更新したら古くなりますよね。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあuseStateにAPIのデータを入れてたら……古くなる可能性があるってことですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "そうです。しかも同じデータを複数のコンポーネントがバラバラにfetchしていると、サーバーへのリクエストが重複します。\n取得タイミングのズレで画面の表示が食い違うこともある。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、それをやっていた気がします……。どうすればいいんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "だからこそ、クライアント状態はuseStateやZustandで、サーバー状態はTanStack QueryやSWRのような専用ツールで管理するのが現代の答えなんです。\nツールを目的ごとに選ぶ、それだけで驚くほど設計がシンプルになりますよ。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["クライアント状態", "サーバー状態"]}
          rows={[
            {
              label: "情報の出所",
              cells: ["UI自身・ユーザー操作", "リモートAPI・DB"],
              highlightCol: 0,
            },
            {
              label: "古くなるか",
              cells: ["ならない（自分が更新）", "なる可能性がある"],
              highlightCol: 0,
            },
            {
              label: "キャッシュが必要か",
              cells: ["不要", "必要（毎回fetchは遅い）"],
              highlightCol: 1,
            },
            {
              label: "適したツール",
              cells: ["useState / Zustand", "TanStack Query / SWR"],
              highlightCol: 1,
            },
            {
              label: "典型例",
              cells: ["モーダル開閉・タブ選択", "商品リスト・ユーザー情報"],
            },
          ]}
          note="「誰が更新するか」で見分ける。自分（UI）が更新するならクライアント状態。サーバーが更新する可能性があるならサーバー状態。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は「useStateだけで管理しようとした場合の問題」と「各ツールの使い所」の詳細です。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — アンチパターンとツール選択
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          useStateだけでサーバー状態を管理しようとすると、どんな問題が起きるか具体的に見ていきます。
        </p>

        <TermNote
          terms={[
            {
              word: "キャッシュ",
              definition: "一度取得したデータをメモリに保持しておき、次回は再取得せずに使う仕組み。TanStack Queryはキャッシュを自動管理する。",
            },
            {
              word: "stale（古い）",
              definition: "キャッシュされたデータが実際のサーバーデータと乖離している状態。TanStack Queryはstale-while-revalidate戦略でこれを扱う。",
            },
            {
              word: "re-fetch",
              definition: "最新データをサーバーから取り直すこと。ウィンドウにフォーカスが戻ったときやネットワーク再接続時に自動的に行うのが一般的。",
            },
            {
              word: "loading state",
              definition: "データ取得中であることを示す状態（isLoading など）。ユーザーに「準備中」と伝えるために必要。",
            },
          ]}
        />

        <ConceptDiagram
          title="応用図A"
          description="useStateだけでサーバー状態を管理したときのよくある問題"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                問題1: 重複リクエスト
              </p>
              <div
                className="rounded-lg p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <p className="text-gray-500">{"// コンポーネントA"}</p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300">{" [users, setUsers] = "}</span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">([]);</span>
                </p>
                <p className="text-gray-500">{"// コンポーネントBでも同じfetchが走る"}</p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300">{" [users, setUsers] = "}</span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">([]);</span>
                </p>
                <p className="text-red-400 mt-1">{"// → サーバーへのリクエストが2回走る"}</p>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                問題2: loading / error を自前で管理しなければならない
              </p>
              <div
                className="rounded-lg p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300">{" [data, setData] = "}</span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-blue-300">null</span>
                  <span className="text-gray-300">);</span>
                </p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300">{" [isLoading, setIsLoading] = "}</span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-blue-300">false</span>
                  <span className="text-gray-300">);</span>
                </p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300">{" [error, setError] = "}</span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-blue-300">null</span>
                  <span className="text-gray-300">);</span>
                </p>
                <p className="text-gray-500 mt-1">{"// このパターンを全コンポーネントで繰り返す"}</p>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(20,184,166,0.05)", borderColor: "rgba(20,184,166,0.3)" }}
          >
            <p className="text-xs font-semibold text-teal-300 mb-2">TanStack Queryで解決すると</p>
            <div
              className="rounded-lg p-3 font-mono text-xs leading-loose"
              style={{ backgroundColor: "#0f1117" }}
            >
              <p>
                <span className="text-blue-300">const</span>
                <span className="text-gray-300">{" { data, isLoading, error } = "}</span>
                <span className="text-yellow-300">useQuery</span>
                <span className="text-gray-300">{"({"}</span>
              </p>
              <p className="ml-4">
                <span className="text-sky-300">queryKey</span>
                <span className="text-gray-300">{": "}</span>
                <span className="text-gray-300">{"["}</span>
                <span className="text-green-300">{"'users'"}</span>
                <span className="text-gray-300">{"],"}</span>
              </p>
              <p className="ml-4">
                <span className="text-sky-300">queryFn</span>
                <span className="text-gray-300">{": () => "}</span>
                <span className="text-yellow-300">fetchUsers</span>
                <span className="text-gray-300">(),</span>
              </p>
              <p>
                <span className="text-gray-300">{"});"}</span>
              </p>
              <p className="text-teal-400 mt-1">{"// キャッシュ・loading・error・refetch を自動管理"}</p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="クライアント状態の代表例">
          <p>
            クライアント状態とは、UIの一時的な表示状態のこと。ページをリロードすれば消えてよい情報、
            ユーザー操作にだけ反応すれば十分な情報がここに当たる。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: SplitSquareHorizontal,
                title: "モーダルの開閉",
                subtitle: "isOpen: boolean",
                description: "ボタンを押したら開き、閉じるボタンで閉じる。サーバーとは無関係。",
                accentColor: "teal",
              },
              {
                Icon: RefreshCw,
                title: "選択中のタブ",
                subtitle: "activeTab: string",
                description: "ユーザーがクリックしたタブを追跡する。UIのローカルな状態。",
                accentColor: "teal",
              },
              {
                Icon: XCircle,
                title: "フォーム入力途中",
                subtitle: "inputValue: string",
                description: "送信前の一時的な入力値。送信後はサーバー状態になる。",
                accentColor: "teal",
              },
              {
                Icon: CheckCircle2,
                title: "アコーディオンの展開",
                subtitle: "isExpanded: boolean",
                description: "ページ内の折り畳みUI。ページをまたがない一時状態の典型。",
                accentColor: "teal",
              },
            ]}
          />
          <KeyPoint>
            クライアント状態は useState または Zustand（グローバルに共有したい場合）で管理する。サーバーと通信する必要はない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="サーバー状態が難しい5つの関心事">
          <p>
            サーバー状態を自前で管理しようとすると、最低でも以下の5つの問題を自分で解決しなければならない。
          </p>
          <CodeBlock
            title="server-state-diy.ts"
            language="typescript"
            code={`// サーバー状態を useState だけで管理すると…
const [data, setData] = useState<User[] | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
  setIsLoading(true);
  fetch('/api/users')
    .then(res => res.json())
    .then(data => {
      setData(data);
      setIsLoading(false);
    })
    .catch(err => {
      setError(err);
      setIsLoading(false);
    });
}, []);

// さらに考えなければいけないこと:
// - 画面を離れて戻ってきたとき再取得するか？
// - データが古くなったら自動で更新するか？
// - 同じデータを複数コンポーネントが使うとき重複fetchしないか？`}
          />
          <WarningPoint>
            useEffect + useState の組み合わせでサーバー状態を管理するパターンは「動くが最適ではない」アンチパターンとして認識されている。TanStack Query や SWR がこの問題を解決するために生まれた。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="どちらのツールを使うか">
          <p>
            判断の基準はシンプル。値を変えるのが「自分（UI）か」「サーバーか」だけ。
          </p>
          <CorrectionCard
            misconception="APIから取得したデータもuseStateに入れておけば十分"
            correction="サーバーデータはTanStack QueryやSWRのような専用ツールで管理するのが現代の標準"
            reason="専用ツールはキャッシュ・loading/error状態・再取得・重複リクエスト防止を自動で処理する。useStateで書こうとすると、同じコードを毎回書き直す「ボイラープレート」問題が起きる。"
          />
          <KeyPoint>
            「ユーザーが操作したら変わる」→ クライアント状態（useState / Zustand）。「サーバーがデータを更新するかもしれない」→ サーバー状態（TanStack Query / SWR）。この2問だけで8割の判断はできる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/state/tanstack-query",
            title: "TanStack Query",
            description: "サーバー状態の管理をTanStack Queryで実装する",
            icon: "DatabaseZap",
          },
          {
            href: "/state/zustand",
            title: "Zustand",
            description: "クライアント状態をグローバルに管理するZustand",
            icon: "Package",
          },
          {
            href: "/state/context",
            title: "Context API",
            description: "Reactが標準提供するグローバル状態共有の仕組み",
            icon: "Share2",
          },
        ]}
      />

      <PageDrill questions={clientVsServerQuestions} />
    </div>
  );
}
