import {
  DatabaseZap,
  Clock,
  RefreshCw,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Zap,
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
import { tanstackQueryQuestions } from "@/content/questions/state/tanstack-query";

export const metadata = {
  title: "TanStack Query | Web開発図解",
  description:
    "TanStack Queryを図解で解説。サーバーデータのキャッシュ・同期・ローディング管理をuseQueryの基本パターンで習得する。",
};

export default function TanstackQueryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/state" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 状態管理に戻る
        </Link>
      </div>

      <Hero
        category="状態管理"
        title="TanStack Query"
        subtitle={"サーバーデータの「取得・キャッシュ・同期」を自動で管理するライブラリ"}
        body={"useQuery ひとつで loading・error・data・refetch を全て解決できる。"}
        accentColor="teal"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "TanStack Query が解決する問題（キャッシュ・loading・error）",
          "useQuery の基本的な書き方と返す値",
          "queryKey と queryFn の役割",
        ]}
        prerequisites={[
          "fetch や async/await を使ったデータ取得の経験がある",
          "クライアント状態とサーバー状態の区別を理解している（前ページ）",
          "useEffect の基本的な使い方を知っている",
        ]}
        outOfScope={[
          "useMutation（データの更新・作成・削除）の詳細",
          "キャッシュの無効化（queryClient.invalidateQueries）",
          "サーバーサイドレンダリングとのプリフェッチ",
        ]}
      />

      <OnePageSummary
        keyMessage="TanStack Queryはサーバーデータ（APIから取得するデータ）の管理専門ライブラリ。useQueryひとつで「データ取得中かどうか（isLoading）」「エラーが起きたか（isError）」「取得したデータ（data）」「データが古ければ自動で再取得（stale-while-revalidate）」まで全て処理してくれる。fetchとuseStateを組み合わせて自前で書いていた100行が、数行で済む。"
        metaphorTitle="図書館の司書サービス"
        metaphorPoints={[
          {
            label: "自前の fetch + useEffect",
            real: "図書館に行くたびに「本はありますか？」「今借りられていますか？」「最新版ですか？」と毎回聞いて回る。",
            metaphor: "毎回自分で調べる",
          },
          {
            label: "TanStack Query",
            real: "司書さんに「この本をください」と言えば、手配・在庫確認・新版チェック・取り置きまで全部やってくれる。",
            metaphor: "司書さんに任せる",
          },
          {
            label: "キャッシュ",
            real: "一度取り出した本を専用棚に置いておき、次に頼まれたときは棚から渡す（新しければ）。",
            metaphor: "司書さんの取り置き棚",
          },
        ]}
        definition="TanStack Query はサーバーデータのキャッシュ・同期・更新を自動で管理するライブラリ。useQuery でデータ取得、useMutation で更新操作を行う。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          まず useQuery が裏で何をしているかを流れで確認し、次にキャッシュの仕組みを掴みます。
        </p>

        {/* ── 概念図A: useQuery の仕組み ── */}
        <ConceptDiagram
          title="概念図A"
          description="useQuery を呼ぶと TanStack Query が何をしてくれるのか"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={DatabaseZap}
              title="useQuery 呼び出し"
              subtitle="queryKey + queryFn"
              accentColor="teal"
            />
            <FlowArrow label="キャッシュ確認" direction="right" />
            <FlowCard
              Icon={Clock}
              title="キャッシュあり？"
              subtitle="stale かどうか判定"
              accentColor="teal"
            />
            <FlowArrow label="stale なら再取得" direction="right" />
            <FlowCard
              Icon={Wifi}
              title="バックグラウンド fetch"
              subtitle="最新データを取得"
              highlight
              accentColor="teal"
            />
            <FlowArrow label="更新完了" direction="right" />
            <FlowCard
              Icon={RefreshCw}
              title="自動 re-render"
              subtitle="新しいデータで画面更新"
              accentColor="teal"
            />
          </div>

          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// TanStack Query の基本的な使い方"}</p>
            <p>
              <span className="text-blue-300">import</span>
              <span className="text-gray-300">{" { useQuery } "}</span>
              <span className="text-blue-300">from</span>
              <span className="text-green-300">{" '@tanstack/react-query'"}</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-300">const</span>
              <span className="text-gray-300">{" { data, isLoading, isError, error } = "}</span>
              <span className="text-yellow-300">useQuery</span>
              <span className="text-gray-300">{"({"}</span>
            </p>
            <p className="ml-4">
              <span className="text-sky-300">queryKey</span>
              <span className="text-gray-300">{": "}</span>
              <span className="text-gray-300">{"["}</span>
              <span className="text-green-300">{"'users'"}</span>
              <span className="text-gray-300">{"],  "}</span>
              <span className="text-gray-500">{"// キャッシュの識別キー"}</span>
            </p>
            <p className="ml-4">
              <span className="text-sky-300">queryFn</span>
              <span className="text-gray-300">{": () => "}</span>
              <span className="text-yellow-300">fetch</span>
              <span className="text-gray-300">(</span>
              <span className="text-green-300">{"'/api/users'"}</span>
              <span className="text-gray-300">).</span>
              <span className="text-yellow-300">then</span>
              <span className="text-gray-300">{"(r => r.json()),"}</span>
            </p>
            <p>
              <span className="text-gray-300">{"});"}</span>
            </p>
            <p className="mt-2 text-gray-500">{"// loading 中"}</p>
            <p>
              <span className="text-blue-300">if</span>
              <span className="text-gray-300">{" (isLoading) "}</span>
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" <Loading />;"}</span>
            </p>
            <p className="text-gray-500">{"// エラー時"}</p>
            <p>
              <span className="text-blue-300">if</span>
              <span className="text-gray-300">{" (isError) "}</span>
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" <Error message={error.message} />;"}</span>
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            isLoading・isError・data の3つを見るだけで状態の管理が完結する。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          useQuery の使い方が分かりました。次は「キャッシュのキーである queryKey がなぜ重要なのか」を確認します。
        </p>

        {/* ── 概念図B: queryKey の役割 ── */}
        <ConceptDiagram
          title="概念図B"
          description="queryKey はキャッシュを識別する「棚のラベル」——同じキーなら同じキャッシュを共有する"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                queryKey の役割
              </p>
              <div className="space-y-3">
                {[
                  {
                    key: "['users']",
                    desc: "全ユーザー一覧。どのコンポーネントから呼んでも同じキャッシュを使う",
                    color: "#2dd4bf",
                  },
                  {
                    key: "['users', 1]",
                    desc: "ID=1 のユーザー詳細。一覧とは別のキャッシュエントリ",
                    color: "#5eead4",
                  },
                  {
                    key: "['posts', { page: 2 }]",
                    desc: "投稿一覧の2ページ目。ページごとに別キャッシュ",
                    color: "#2dd4bf",
                  },
                ].map(({ key, desc, color }, i) => (
                  <div
                    key={i}
                    className="rounded-lg px-3 py-2.5 flex items-start gap-3"
                    style={{ backgroundColor: "#1a1d2a" }}
                  >
                    <span
                      className="font-mono text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{ color }}
                    >
                      {key}
                    </span>
                    <span className="text-xs text-gray-400 leading-relaxed">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(20,184,166,0.05)", borderColor: "rgba(20,184,166,0.3)" }}
            >
              <p className="text-xs font-semibold text-teal-300 mb-2">同じキーなら重複 fetch しない</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                コンポーネントAとBが両方{" "}
                <span className="font-mono text-teal-300">{"useQuery({ queryKey: ['users'] })"}</span>{" "}
                を呼んでも、同じキャッシュを参照するため fetch は1回しか走らない。
                自前で書いたときの「重複リクエスト問題」が自動で解決される。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "TanStack Queryって、useEffectとfetchを組み合わせるのと何が違うんですか？ 同じじゃないですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "図書館の司書さんで考えてみましょう、マジさん。\nuseEffect + fetch は「毎回自分で図書館に行って、本を探して、最新版かどうか調べて、借りてくる」作業です。\nTanStack Query は「司書さんに頼めば全部やってくれる」サービスです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "そんなに楽になるんですか……。でも裏で何をしてくれているんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "3つの自動化が特に大きい。\n一つ目はキャッシュです。一度取得したデータは棚に置いておき、次回は棚から渡す。\n二つ目はデータが古くなったら自動で再取得。ウィンドウにフォーカスが戻ったとき、ネットワーク再接続時にも自動で動きます。\n三つ目は重複排除。同じデータを複数のコンポーネントが欲しがっても、fetchは1回しか走りません。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ ウィンドウのフォーカスで自動再取得まで？ それ自前で書こうと思ったら大変そう……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "実際、useEffect + useState で自前実装すると、isLoading・isError・error・data の4つの useState、useEffect でのfetch処理、エラーハンドリング、クリーンアップ……と100行近くになります。\nそれをuseQueryの数行に置き換えられる。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "じゃあ今まで自前で書いてたのは全部無駄だったということですか……ボク、泣きそうです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "無駄ではありません。自前で書いた経験があるから「TanStack Queryが何を解決しているか」が分かるんです。\n魔法のライブラリを何も理解せずに使うより、仕組みを知った上で使うほうが遥かに強いですよ、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "tearful",
            text: "マスター……それはちょっと胸にきますね。ボク、これまでの苦労が報われた気がします。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["自前（useEffect + useState）", "TanStack Query（useQuery）"]}
          rows={[
            {
              label: "loading 状態の管理",
              cells: ["useState で自前管理", "isLoading を自動提供"],
              highlightCol: 1,
            },
            {
              label: "エラー処理",
              cells: ["try/catch + useState で自前管理", "isError・error を自動提供"],
              highlightCol: 1,
            },
            {
              label: "重複 fetch の防止",
              cells: ["自前で工夫が必要", "同じ queryKey なら自動で1回のみ"],
              highlightCol: 1,
            },
            {
              label: "データのキャッシュ",
              cells: ["なし（毎回 fetch）", "自動キャッシュ + stale-while-revalidate"],
              highlightCol: 1,
            },
            {
              label: "自動再取得",
              cells: ["実装が複雑", "フォーカス時・ネットワーク復帰時に自動"],
              highlightCol: 1,
            },
            {
              label: "コード量",
              cells: ["多い（100行近くなる場合も）", "少ない（useQuery 数行）"],
              highlightCol: 1,
            },
          ]}
          note="サーバーデータの管理では TanStack Query が圧倒的に有利。useEffect + fetch の組み合わせはクライアント状態の管理には引き続き使える。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は stale-while-revalidate の詳細・useMutation・QueryClient のセットアップです。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — stale-while-revalidate と useMutation
        </h2>

        <TermNote
          terms={[
            {
              word: "stale-while-revalidate",
              definition: "キャッシュが「古い（stale）」かもしれないが、まず古いデータを表示しつつバックグラウンドで最新データを取得する戦略。ユーザーが待たずに済む。",
            },
            {
              word: "staleTime",
              definition: "データが「新鮮」とみなされる期間（ミリ秒）。この期間内はリフェッチしない。デフォルトは0（常にstale扱い）。",
            },
            {
              word: "gcTime（旧 cacheTime）",
              definition: "データがメモリから削除されるまでの時間。Queryがアクティブでなくなってからの猶予期間。デフォルトは5分。",
            },
            {
              word: "useMutation",
              definition: "データの作成・更新・削除など「書き込み操作」を行うHook。成功後に queryClient.invalidateQueries で関連キャッシュを無効化するパターンが多い。",
            },
            {
              word: "QueryClient",
              definition: "TanStack Queryの中枢。キャッシュ管理・設定・手動でのキャッシュ操作などを行う。QueryClientProvider でアプリ全体に提供する。",
            },
          ]}
        />

        <ConceptDiagram
          title="応用図A"
          description="stale-while-revalidate の仕組み——古いデータを見せながら最新を取りに行く"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                stale-while-revalidate の流れ
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { step: "1", label: "キャッシュあり（stale）", desc: "古いデータをすぐに表示する（ユーザーが待たない）", color: "#2dd4bf" },
                  { step: "2", label: "バックグラウンド fetch", desc: "最新データをサーバーから取得する（画面はそのまま）", color: "#5eead4" },
                  { step: "3", label: "新データ受信", desc: "新しいデータに切り替える（ユーザーが気づかないレベル）", color: "#2dd4bf" },
                ].map(({ step, label, desc, color }) => (
                  <div
                    key={step}
                    className="rounded-lg px-4 py-3 flex items-start gap-3"
                    style={{ backgroundColor: "#1a1d2a" }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
                    >
                      {step}
                    </span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color }}>{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(20,184,166,0.05)", borderColor: "rgba(20,184,166,0.3)" }}
            >
              <p className="text-xs font-semibold text-teal-300 mb-2">staleTime の設定例</p>
              <div
                className="rounded-lg p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117" }}
              >
                <p>
                  <span className="text-yellow-300">useQuery</span>
                  <span className="text-gray-300">{"({"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-sky-300">queryKey</span>
                  <span className="text-gray-300">{": ["}</span>
                  <span className="text-green-300">{"'products'"}</span>
                  <span className="text-gray-300">{"],"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-sky-300">queryFn</span>
                  <span className="text-gray-300">{": fetchProducts,"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-sky-300">staleTime</span>
                  <span className="text-gray-300">{": "}</span>
                  <span className="text-orange-300">1000 * 60 * 5</span>
                  <span className="text-gray-500">{",  // 5分間は新鮮扱い"}</span>
                </p>
                <p>
                  <span className="text-gray-300">{"});"}</span>
                </p>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="TanStack Query のセットアップ">
          <p>
            TanStack Query を使うには QueryClientProvider でアプリを包む初期設定が必要。一度設定すれば全ページで useQuery が使える。
          </p>
          <CodeBlock
            title="app/layout.tsx（セットアップ例）"
            language="typescript"
            code={`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,  // デフォルト1分間は新鮮扱い
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}`}
          />
          <KeyPoint>
            QueryClientProvider は Context API と同じように最上位のコンポーネントで1度だけ設定する。設定後は全コンポーネントで useQuery・useMutation が使える。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="useQuery が返す主要な値">
          <p>
            useQuery が返すオブジェクトには多くのプロパティがある。よく使うものを確認しておこう。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: CheckCircle2,
                title: "data",
                subtitle: "取得したデータ",
                description: "fetchが成功したときのレスポンス。isLoading中はundefined。",
                accentColor: "teal",
              },
              {
                Icon: Clock,
                title: "isLoading",
                subtitle: "初回取得中かどうか",
                description: "キャッシュがなく、初めてデータを取得している最中にtrue。",
                accentColor: "teal",
              },
              {
                Icon: AlertTriangle,
                title: "isError / error",
                subtitle: "エラーの有無と内容",
                description: "fetch が失敗したとき isError が true。error にエラーオブジェクト。",
                accentColor: "teal",
              },
              {
                Icon: RefreshCw,
                title: "refetch",
                subtitle: "手動で再取得",
                description: "refetch() を呼ぶと手動で最新データを取得できる。",
                accentColor: "teal",
              },
              {
                Icon: Zap,
                title: "isFetching",
                subtitle: "バックグラウンド fetch中",
                description: "isLoading は初回だけ。isFetching はバックグラウンド再取得中もtrue。",
                accentColor: "teal",
              },
              {
                Icon: Layers,
                title: "status",
                subtitle: "'pending'|'error'|'success'",
                description: "データの状態を文字列で確認できる。isLoading / isError / isSuccess に相当。",
                accentColor: "teal",
              },
            ]}
          />
          <CorrectionCard
            misconception="TanStack Query はサーバーデータだけでなく、クライアント状態（モーダルの開閉等）も管理できる万能ツール"
            correction="TanStack Query はサーバーデータ（APIから取得する値）専用。クライアント状態には useState / Zustand を使う"
            reason="TanStack Queryのキャッシュ・再取得・stale管理はサーバーデータのために設計されている。モーダル開閉をTanStack Queryで管理すると設計が複雑になるだけ。ツールは目的に合わせて選ぶ。"
          />
          <WarningPoint>
            queryFn は必ず Promise を返す関数を渡す。fetchした後 .json() で変換するのを忘れると data が Response オブジェクトのままになる。また、fetch はHTTPエラー（404・500）でも例外を投げないため、response.ok を確認してエラーを throw する処理が必要。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="useMutation — データの書き込み操作">
          <p>
            データの取得には useQuery、データの作成・更新・削除には useMutation を使う。
            成功後に関連するキャッシュを無効化（invalidate）することで、最新データが自動的に再取得される。
          </p>
          <CodeBlock
            title="use-mutation-example.tsx"
            language="typescript"
            code={`import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: string) =>
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ title: newTodo }),
      }).then(res => res.json()),

    onSuccess: () => {
      // 投稿後にtodosのキャッシュを無効化 → 自動で再取得が走る
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate('新しいTodo')}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? '送信中...' : '追加'}
    </button>
  );
}`}
          />
          <KeyPoint>
            useMutation の onSuccess で invalidateQueries を呼ぶパターンが基本形。これにより「書き込み成功 → キャッシュ無効化 → 自動で最新データを再取得 → UIが最新状態に更新」という流れが自動で完結する。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/state/client-vs-server",
            title: "クライアント状態とサーバー状態",
            description: "TanStack Queryが担う「サーバー状態」の概念を確認する",
            icon: "SplitSquareHorizontal",
          },
          {
            href: "/state/zustand",
            title: "Zustand",
            description: "TanStack Queryと組み合わせるクライアント状態管理",
            icon: "Package",
          },
          {
            href: "/javascript/fetch",
            title: "fetch API",
            description: "TanStack Queryの queryFn で使う fetch の基礎",
            icon: "Wifi",
          },
        ]}
      />

      <PageDrill questions={tanstackQueryQuestions} />
    </div>
  );
}
