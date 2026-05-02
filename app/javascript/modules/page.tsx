import {
  FileCode,
  Package,
  PackageOpen,
  Star,
  Tag,
  Boxes,
  Hammer,
  Rocket,
  FolderOpen,
  ArrowRight,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
  StackLayer,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { CodeBlock } from "@/components/CodeBlock";
import { modulesQuestions } from "@/content/questions/javascript/modules";

export const metadata = {
  title: "ESモジュール | Web開発図解",
  description:
    "ESモジュールはJavaScriptのコードをファイル分割し、import/exportで機能を共有する仕組み。default export と named export、Tree Shaking、CommonJS との違いまで図解で解説。",
};

export default function ModulesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="ESモジュール"
        subtitle={
          "コードを「部品」に分割して管理する仕組み——import/exportの正体"
        }
        body={
          "1ファイルに全部書くのではなく、役割ごとにファイルを分けて、必要な部品だけを取り寄せて使う。"
        }
        accentColor="orange"
      />

      <OnePageSummary
        keyMessage="ESモジュールはJavaScriptのコードをファイル単位に分割し、必要な部品だけを import / export で共有する仕組み。1ファイルに全部書くのではなく、役割ごとにファイルを分けることでコードが管理しやすくなる。"
        metaphorTitle="家電量販店の専門売り場"
        metaphorPoints={[
          {
            label: "export",
            real: "売り場に商品を陳列する（他のファイルから使える状態にする）",
            metaphor: "export",
          },
          {
            label: "import",
            real: "必要な商品だけを買いに行く（使いたい機能だけ読み込む）",
            metaphor: "import",
          },
          {
            label: "default export",
            real: "その売り場の看板商品（1ファイル1つだけ・名前は買い手が自由につけられる）",
            metaphor: "default export",
          },
          {
            label: "named export",
            real: "個別商品（複数陳列でき、買い手は正確な名前で指名する）",
            metaphor: "named export",
          },
        ]}
        definition="ESモジュールとは、JavaScriptのコードをファイル分割し、import/export で機能を共有する仕組み。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A"
          description="export 側のファイルと import 側のファイルは、どう対応しているのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={FileCode}
              title="utils.js"
              subtitle={"export function add\nexport const PI"}
            />
            <FlowArrow
              label="公開"
              sublabel="export"
              direction="right"
            />
            <FlowCard
              Icon={PackageOpen}
              title="モジュール境界"
              subtitle="他ファイルから取り寄せ可"
              highlight
              accentColor="orange"
            />
            <FlowArrow
              label="取り寄せ"
              sublabel="import { add, PI }"
              direction="right"
            />
            <FlowCard
              Icon={FileCode}
              title="app.js"
              subtitle={"add(1, 2)\nconsole.log(PI)"}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            export していない関数・変数は、そのファイルの中だけで完結する「私物」。外からは存在しないのと同じ扱いになる。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B"
          description="export には2種類ある。default export と named export の違い。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-orange-400" />
                <p className="text-xs font-bold text-orange-300">
                  default export
                </p>
              </div>
              <ul className="text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <li>・1ファイルに1つだけ</li>
                <li>・売り場の「看板商品」</li>
                <li>・import 時に名前を自由につけられる</li>
                <li>
                  ・<code className="text-xs px-1 py-0.5 rounded font-mono" style={{ backgroundColor: "#1a1d2a", color: "#fbbf24" }}>{`import Foo from './foo'`}</code>
                </li>
                <li className="text-gray-500 mt-2">
                  Reactコンポーネントは default export で書く慣習が多い
                </li>
              </ul>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-orange-400" />
                <p className="text-xs font-bold text-orange-300">
                  named export
                </p>
              </div>
              <ul className="text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <li>・1ファイルに複数置ける</li>
                <li>・「個別商品」として陳列</li>
                <li>
                  ・import 時は <code className="text-xs px-1 py-0.5 rounded font-mono" style={{ backgroundColor: "#1a1d2a", color: "#fbbf24" }}>{`{}`}</code> で正確な名前が必要
                </li>
                <li>
                  ・<code className="text-xs px-1 py-0.5 rounded font-mono" style={{ backgroundColor: "#1a1d2a", color: "#fbbf24" }}>{`import { add, PI } from './utils'`}</code>
                </li>
                <li>
                  ・<code className="text-xs px-1 py-0.5 rounded font-mono" style={{ backgroundColor: "#1a1d2a", color: "#fbbf24" }}>as</code> でリネーム可
                </li>
                <li className="text-gray-500 mt-2">
                  ユーティリティ関数群は named export が多い
                </li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            プロジェクトの慣習に合わせて使い分ける。混在しているプロジェクトも珍しくない。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C"
          description="開発中はファイル分割、本番配信時は1〜数ファイルに統合。間に挟まる「モジュールバンドラー」の役割。"
        >
          <div
            className="rounded-xl border-2 border-dashed border-orange-700/50 p-4"
          >
            <p className="text-xs font-semibold text-orange-500 text-center mb-4 tracking-wide uppercase">
              開発時 → 本番への流れ
            </p>
            <StackLayer
              Icon={Boxes}
              title="開発時：複数ファイルに分割"
              subtitle="utils.js / Button.tsx / api.ts ……役割ごとに別ファイル（人間が管理しやすい）"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Hammer}
              title="ビルド：Webpack / Vite / Turbopack が bundle"
              subtitle="import / export の依存関係を解析し、未使用コードを削除（Tree Shaking）して連結"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Rocket}
              title="本番：1〜数ファイルに統合された JS"
              subtitle="ブラウザは少ないリクエストで全部受け取れる（配信しやすい）"
              iconColor="text-orange-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            Next.js の場合、Turbopack や Webpack がこの bundle を自動でやってくれる。開発者は「ファイルを分割して書く」ことに集中できる。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図D：モジュールの依存グラフと循環依存の問題"
          description="バンドラーはファイル間の import/export をたどって依存グラフを構築する。循環があると問題が起きる。"
          accentColor="orange"
        >
          {/* 通常の依存グラフ */}
          <p className="text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wide">
            正常な依存グラフ
          </p>
          <div className="flex flex-col items-center gap-1 mb-5">
            {/* app.js */}
            <div
              className="rounded-lg border px-4 py-2 text-xs font-mono text-orange-300 font-semibold"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#f97316" }}
            >
              app.js
            </div>
            {/* 矢印 → 3 children */}
            <div className="flex items-start gap-6 mt-1">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-4 bg-gray-600" />
                <div
                  className="rounded-lg border px-3 py-1.5 text-xs font-mono text-gray-300"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  utils.js
                </div>
                <div className="w-px h-4 bg-gray-600" />
                <div
                  className="rounded-lg border px-3 py-1.5 text-xs font-mono text-gray-400"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  helpers.js
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 mt-5">
                <div
                  className="rounded-lg border px-3 py-1.5 text-xs font-mono text-gray-300"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  api.js
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 mt-5">
                <div
                  className="rounded-lg border px-3 py-1.5 text-xs font-mono text-gray-300"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  components/Button.js
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              app.js → utils.js, api.js, Button.js（各ファイルは一方向に依存）
            </p>
          </div>

          {/* 循環依存 */}
          <div
            className="rounded-xl border p-4 mb-4"
            style={{ backgroundColor: "#1a1020", borderColor: "#7c2d2d" }}
          >
            <p className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">
              循環依存（NG）
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div
                className="rounded-lg border px-3 py-1.5 text-xs font-mono text-red-300"
                style={{ backgroundColor: "#0f1117", borderColor: "#7c2d2d" }}
              >
                A.js
              </div>
              <span className="text-xs text-red-400">→ import</span>
              <div
                className="rounded-lg border px-3 py-1.5 text-xs font-mono text-red-300"
                style={{ backgroundColor: "#0f1117", borderColor: "#7c2d2d" }}
              >
                B.js
              </div>
              <span className="text-xs text-red-400">→ import</span>
              <div
                className="rounded-lg border px-3 py-1.5 text-xs font-mono text-red-300"
                style={{ backgroundColor: "#0f1117", borderColor: "#7c2d2d" }}
              >
                A.js
              </div>
              <span className="text-xs text-red-500 font-bold">循環！</span>
            </div>
            <p className="text-xs text-red-400 mt-2 text-center">
              A を解決するには B が必要・B を解決するには A が必要 → undefined / TDZ エラーの原因
            </p>
          </div>

          {/* Tree-shaking */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-orange-400 mb-2 uppercase tracking-wide">
              Tree-shaking：未使用 export を刈り取る
            </p>
            <div className="flex items-center gap-2 flex-wrap justify-center text-xs text-gray-300">
              <span className="px-2 py-1 rounded" style={{ backgroundColor: "#1a1d2a" }}>
                utils.js: export {"{add, subtract, multiply}"}
              </span>
              <span className="text-gray-500">→</span>
              <span className="px-2 py-1 rounded text-orange-300" style={{ backgroundColor: "#1a1d2a" }}>
                import {"{ add }"} のみ使用
              </span>
              <span className="text-gray-500">→</span>
              <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-300 border border-orange-500/30">
                bundle: add のみ含む
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              subtract・multiply はバンドルから除外 → ファイルサイズ削減
            </p>
          </div>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図E：バンドラー（webpack/Rollup/Vite）が何をしているか"
          description="複数ファイルに分かれた ESM/CJS ソースを、ブラウザが受け取れる少数のファイルに変換する処理パイプライン。"
          accentColor="orange"
        >
          {/* パイプライン */}
          <div className="space-y-2 mb-5">
            {[
              {
                step: "1. 入力",
                detail: "複数の ESM / CJS ファイル（.ts / .tsx / .js）",
                color: "text-blue-300",
                border: "#1e3a5f",
                bg: "#0d1e36",
              },
              {
                step: "2. 解析",
                detail: "import / require の依存関係を解決し、依存グラフを構築",
                color: "text-violet-300",
                border: "#3b2570",
                bg: "#1a0d36",
              },
              {
                step: "3. 変換",
                detail: "TypeScript / JSX → JS に変換（Babel / SWC / esbuild）",
                color: "text-amber-300",
                border: "#78490a",
                bg: "#2a1a06",
              },
              {
                step: "4. 最適化",
                detail: "Tree-shaking（未使用コード削除）・コード分割（dynamic import）",
                color: "text-orange-300",
                border: "#7c3e0a",
                bg: "#2a1608",
              },
              {
                step: "5. 出力",
                detail: "bundle.js・chunk-xxx.js・source map ファイル群",
                color: "text-emerald-300",
                border: "#14532d",
                bg: "#052e16",
              },
            ].map((item, i, arr) => (
              <div key={i}>
                <div
                  className="rounded-lg border px-4 py-2.5 flex items-center gap-3"
                  style={{ backgroundColor: item.bg, borderColor: item.border }}
                >
                  <span className={`text-xs font-bold shrink-0 ${item.color}`}>
                    {item.step}
                  </span>
                  <span className="text-xs text-gray-300">{item.detail}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex justify-center my-0.5">
                    <span className="text-gray-600 text-sm">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* コード分割 & source map */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-orange-400 mb-2">
                コード分割（Code Splitting）
              </p>
              <div className="space-y-1.5 text-xs text-gray-300">
                <p>{"import('./HeavyComponent')"} を書くと</p>
                <p className="text-gray-400">→ 別チャンク（chunk-xxx.js）に分離</p>
                <p className="text-gray-400">→ 初回ロードのJSを小さく保てる</p>
              </div>
            </div>
            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-orange-400 mb-2">
                ソースマップ（Source Map）
              </p>
              <div className="space-y-1.5 text-xs text-gray-300">
                <p>bundle.js.map ファイルが生成される</p>
                <p className="text-gray-400">→ DevTools でエラー行がオリジナルの</p>
                <p className="text-gray-400">　 TypeScript コードに対応して表示</p>
              </div>
            </div>
          </div>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図F：動的import()による遅延ロード（Lazy Loading）"
          description="全コードを最初に読み込まず、必要になったときだけ読み込む——初期JSを小さくしてページの表示を速くする手法。"
          accentColor="orange"
        >
          {/* 静的 vs 動的 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#1a1020", borderColor: "#7c2d2d" }}
            >
              <p className="text-xs font-bold text-red-400 mb-2">静的 import（従来）</p>
              <code
                className="block text-xs font-mono text-gray-300 mb-2 p-2 rounded"
                style={{ backgroundColor: "#0f1117" }}
              >
                {`import HeavyLib from './heavy'`}
              </code>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>・ビルド時に全て bundle に含まれる</li>
                <li>・初期 JS が大きくなる</li>
                <li>・画面表示が遅くなりがち</li>
              </ul>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0d1f14", borderColor: "#14532d" }}
            >
              <p className="text-xs font-bold text-emerald-400 mb-2">動的 import()（推奨）</p>
              <code
                className="block text-xs font-mono text-gray-300 mb-2 p-2 rounded"
                style={{ backgroundColor: "#0f1117" }}
              >
                {`import('./heavy').then(m => m.run())`}
              </code>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>・必要なときだけ読み込む</li>
                <li>・別チャンクに分離される</li>
                <li>・初期 JS を小さく保てる</li>
              </ul>
            </div>
          </div>

          {/* React.lazy + Suspense */}
          <div
            className="rounded-xl border p-4 mb-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-orange-400 mb-2">
              React.lazy() + Suspense パターン
            </p>
            <code
              className="block text-xs font-mono text-gray-300 p-3 rounded leading-relaxed"
              style={{ backgroundColor: "#1a1d2a" }}
            >
              {`const Modal = React.lazy(() => import('./Modal'))

<Suspense fallback={<div>Loading...</div>}>
  <Modal />
</Suspense>`}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Modal は表示が必要になったときに初めてネットワークから取得される
            </p>
          </div>

          {/* ユースケース & ネットワーク比較 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-orange-400 mb-2">主なユースケース</p>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>・ルートレベルの分割（ページ単位）</li>
                <li>・重いモーダル / グラフ描画ライブラリ</li>
                <li>・Admin 機能など条件付き機能</li>
                <li>・ユーザーがスクロールして初めて見える要素</li>
              </ul>
            </div>
            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-orange-400 mb-2">
                ネットワーク：分割前後
              </p>
              <div className="space-y-2 text-xs text-gray-400">
                <div>
                  <p className="text-red-400 mb-0.5">分割前</p>
                  <div className="h-3 rounded bg-red-900/60 w-full" />
                  <p className="mt-0.5">bundle.js — 500KB（全ページ分）</p>
                </div>
                <div>
                  <p className="text-emerald-400 mb-0.5">分割後</p>
                  <div className="h-3 rounded bg-orange-900/60 w-2/5" />
                  <p className="mt-0.5">main.js — 200KB（初期）+ 遅延読み込み</p>
                </div>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["CommonJS (require)", "ESModules (import)"]}
          rows={[
            {
              label: "構文",
              cells: [
                "const x = require('./x')",
                "import x from './x'",
              ],
              highlightCol: 1,
            },
            {
              label: "実行タイミング",
              cells: [
                "実行時に動的読み込み",
                "静的解析（ビルド時に依存関係が判明）",
              ],
              highlightCol: 1,
            },
            {
              label: "Tree Shaking",
              cells: [
                "非対応（未使用コードが残る）",
                "対応（未使用コードを削除可）",
              ],
              highlightCol: 1,
            },
            {
              label: "使用環境",
              cells: [
                "Node.js（旧来のコードベース）",
                "モダンブラウザ・Next.js・現代のフロントエンド",
              ],
              highlightCol: 1,
            },
            {
              label: "現在の推奨",
              cells: [
                "Node.js の古いコードで遭遇する程度",
                "基本これを使う",
              ],
              highlightCol: 1,
            },
          ]}
          note="Node.js も現在は ESModules（.mjs / package.json の type: module）に対応している。新規プロジェクトでは ESModules で書き始めるのが安全。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text:
              "マスター、`import` って React のコードでよく書くんですけど、あれって実際には何をしているんですか？ ボク、なんとなく真似して書いているだけで……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text:
              "正直でよろしいですよ、マジさん。家電量販店を想像してください。各フロアに専門の売り場があって、テレビ売り場・冷蔵庫売り場・照明売り場に分かれていますよね。それぞれの売り場が JavaScript ファイル1個に相当します。`export` は「この商品を売り場に陳列する」こと、`import` は「他のフロアから必要な商品を買いに行く」こと。これだけです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text:
              "マジ？\nじゃあ default export と named export って、両方あるんですか？ どっちを使えばいいんですか！？ ボクもうそれだけで頭が爆発しそうです！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text:
              "落ち着いてください。default export は「その売り場の看板商品」、named export は「個別商品」だと思っていただければ十分です。React コンポーネントは default export、`add` や `formatDate` のようなユーティリティ関数は named export で書く慣習が多いですね。プロジェクトのコードを少し読めば、その現場の流儀がすぐに掴めますよ。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text:
              "あと「Tree Shaking」って言葉も聞いたんですけど！ 木を揺らすんですか！？ ボクの import が地震で揺れてしまうんですか！？ 大変なことになっているのでは！？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text:
              "落ち着いて、マジさん。Tree Shaking は「使っていない枝（コード）を揺り落とす」最適化のことです。たとえば `utils.js` から `add` だけを import したとき、ビルドツールが「あ、`subtract` は誰も使っていないな」と気付いて本番のJSから削除してくれる。バンドルサイズが小さくなり、ユーザーのページ読み込みが速くなる。これができるのは ESModules が静的解析できる構文だからこそで、CommonJS の require では難しいんです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text:
              "なるほど……。export で公開して、import で取り寄せて、使っていないものはビルド時に削られる。だからファイル分割しても本番のサイズは膨らまないんですね。腑に落ちました！",
          },
          {
            speaker: "master",
            emotion: "explain",
            text:
              "ご名答です、マジさん。Next.js では全ファイルが ESモジュール前提で動いていて、`@/components/Button` のようなパスエイリアスもこの仕組みの上に成り立っています。「ファイルは小さく分けて、必要な部品だけを取り寄せる」——これだけ覚えていれば、import / export で迷うことはほぼなくなりますよ。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 CommonJS と ESModules の歴史（なぜ2種類あるか）">
          <p>
            JavaScript はもともとブラウザの中だけで動く言語だったため、長らく公式の「モジュール機能」を持っていなかった。Node.js が 2009 年に登場したとき、サーバーサイドでファイル分割が必要になり、独自に{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              require
            </code>{" "}
            ／{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              module.exports
            </code>{" "}
            を導入した。これが CommonJS。
          </p>
          <p>
            その後、ECMAScript（JavaScript の言語仕様）の方でも公式モジュール機能を策定する動きが起き、2015年（ES2015 / ES6）で{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              import
            </code>{" "}
            ／{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              export
            </code>{" "}
            が言語仕様に組み込まれた。これが ESModules。
          </p>
          <Timeline items={[
            {
              year: "〜2009",
              label: "モジュールなし時代",
              description: "JavaScriptはブラウザ専用。全コードを1ファイルか <script> タグで読み込むだけで、ファイル分割の公式手段がなかった。",
              accentColor: "sky",
            },
            {
              year: "2009",
              label: "CommonJS 登場",
              description: "Node.js がサーバーサイド向けに require / module.exports を導入。「ファイルを分けて require で読み込む」が Node.js の標準になった。",
              accentColor: "amber",
            },
            {
              year: "2015",
              label: "ESModules（ES6）標準化",
              description: "ECMAScript 2015 で import / export が言語仕様に組み込まれた。ブラウザとNode.js の両方で動く「公式モジュール」が誕生。",
              accentColor: "orange",
            },
            {
              year: "現在",
              label: "ESModules が主流",
              description: "モダンブラウザ・Vite・Webpack・Next.js はすべて ESModules ベース。CommonJS は古いNode.jsコードで見かける程度になった。",
              accentColor: "emerald",
            },
          ]} />
          <CodeBlock
            title="CommonJS（古）vs ESModules（現在）"
            language="javascript"
            code={`// CommonJS（Node.js 旧来の書き方）
const path = require('path');
module.exports = { greet };

// ESModules（現在の標準）
import path from 'path';
export function greet(name) { return \`Hello, \${name}\`; }
export default greet;`}
          />
          <KeyPoint>
            Node.js 由来の CommonJS と、ブラウザを含む言語仕様としての ESModules ——歴史的経緯で2種類が並走している。新規コードは ESModules、古いNode.jsコードを読むときに CommonJS を見かける、という認識で困らない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 循環参照の問題と回避方法">
          <p>
            A.js が B.js を import し、同時に B.js が A.js を import するような状態を「循環参照」と呼ぶ。ESモジュールは静的解析できる仕組みなので CommonJS よりはマシに動くが、それでも「片方の値がまだ初期化されていないタイミングで参照される」と{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              undefined
            </code>{" "}
            になったり、TDZ エラーが出たりする。
          </p>
          <CorrectionCard
            misconception="循環参照になっていても、お互いに import し合っているだけだから問題ないはず"
            correction="初期化順序が不定になり、import したはずの値が undefined になることがある"
            reason="ESモジュールはビルド時に依存グラフを解析するが、循環があると「A を解決する前に B が必要、B を解決する前に A が必要」という状態が生まれる。実行タイミングによっては未初期化の値が渡ってしまう。"
          />
          <CodeBlock
            title="循環参照の例と回避パターン"
            language="typescript"
            code={`// NG: A.ts と B.ts が互いを参照
// A.ts
import { funcB } from './B';
export function funcA() { return funcB(); }

// B.ts
import { funcA } from './A';  // ← 循環！
export function funcB() { return funcA(); }

// OK: 共通部分を shared.ts に切り出す
// shared.ts
export const BASE_URL = 'https://example.com';

// A.ts
import { BASE_URL } from './shared';
export function funcA() { return BASE_URL + '/a'; }

// B.ts
import { BASE_URL } from './shared';
export function funcB() { return BASE_URL + '/b'; }`}
          />
          <p>
            回避策は「共通の依存を別ファイル（types.ts / shared.ts など）に切り出す」のが基本。AとBの両方が必要としているものを第3のファイルに置けば、AとBの間に直接の参照が生まれず、循環が解消される。
          </p>
          <KeyPoint>
            循環参照に気付くポイントは「import したはずの値が undefined」「クラスのインスタンス化で謎のエラー」。まず依存関係の図を描いてループを見つけ、共通部分を別ファイルに逃がす。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 バレルファイル（index.ts）パターン">
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              components/index.ts
            </code>{" "}
            のようなファイルを作り、その中で複数モジュールの export をまとめ直すパターンを「バレルファイル」と呼ぶ。
          </p>
          <CodeBlock
            title="バレルファイルの構造（components/index.ts）"
            language="typescript"
            code={`// components/index.ts — バレルファイル（再エクスポート）
export { Button } from './Button';
export { Card } from './Card';
export { Modal } from './Modal';
export { Input } from './Input';

// ---- 利用側 ----
// バレルなし → 個別にパスを書く
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

// バレルあり → 1行にまとめられる
import { Button, Card } from '@/components';`}
          />
          <UseCaseGrid cols={2} items={[
            {
              Icon: Package,
              title: "バレルファイルあり",
              subtitle: "import { Button, Card } from '@/components'",
              description: "1行でまとめて読み込める。import パスが短くなり、ファイル移動時も index.ts だけ直せばよい。",
              accentColor: "orange",
            },
            {
              Icon: FileCode,
              title: "バレルファイルなし",
              subtitle: "import { Button } from '@/components/Button'",
              description: "パスが長くなるが、Tree Shaking が確実に効く。大規模プロジェクトではこちらを選ぶチームも多い。",
              accentColor: "sky",
            },
          ]} />
          <KeyPoint>
            バレルファイルは便利だが、巨大化させすぎるとビルド時の解析コストが上がり、Tree Shaking が効きにくくなる場合もある。「カテゴリ単位でまとめる」程度に留めるのが無難。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 Next.js でのモジュール利用（@/components/ エイリアス）">
          <p>
            Next.js プロジェクトでよく見かける{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              {`import { Button } from '@/components/Button'`}
            </code>{" "}
            の{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              @/
            </code>{" "}
            は、tsconfig.json（または jsconfig.json）の{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              paths
            </code>{" "}
            設定で「プロジェクトルート（または src/）」にマッピングされたパスエイリアス。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: ArrowRight,
              title: "相対パス（エイリアスなし）",
              subtitle: "import { Button } from '../../../components/Button'",
              description: "ファイルの深さに応じて ../ が連続する。ファイルを移動すると全パスが壊れる。",
              accentColor: "red",
            },
            {
              Icon: FolderOpen,
              title: "@/ エイリアス（Next.js 標準）",
              subtitle: "import { Button } from '@/components/Button'",
              description: "@/ がプロジェクトルートを指す。ファイルを移動しても import パスは変わらない。",
              accentColor: "orange",
            },
          ]} />
          <CodeBlock
            title="tsconfig.json — @/ エイリアスの設定"
            language="json"
            code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}

// create-next-app でプロジェクトを作ると自動生成される。
// 手動追加の必要はほぼない。`}
          />
          <p>
            これがあると{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fb923c" }}
            >
              ../../../components/Button
            </code>{" "}
            のような相対パスの連打を書かずに済み、ファイルを別ディレクトリに移動してもパスが壊れにくくなる。Next.js では create-next-app の段階で標準で設定されている。
          </p>
          <KeyPoint>
            Next.js では「全ファイルが ESModules 前提」「`@/` でプロジェクトルートを指す」「default export のコンポーネントを named import / default import で取り寄せる」が当たり前。ここを押さえておけば、import 周りで詰まることはほぼなくなる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/variables",
            title: "変数とスコープ",
            description: "var / let / const とブロックスコープの基本",
            icon: "Code2",
          },
          {
            href: "/javascript/async",
            title: "非同期処理",
            description: "Promise / async / await でデータを待つ仕組み",
            icon: "Rocket",
          },
          {
            href: "/javascript/error",
            title: "エラーハンドリング",
            description: "try / catch とエラーの伝播を整理する",
            icon: "Code2",
          },
        ]}
      />

      <PageDrill questions={modulesQuestions} />
    </div>
  );
}
