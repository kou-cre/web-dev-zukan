import {
  Smartphone,
  Tablet,
  Monitor,
  ArrowRight,
  LayoutGrid,
  Layers,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
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
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { responsiveQuestions } from "@/content/questions/css-framework/responsive";

export const metadata = {
  title: "レスポンシブ対応 | Web開発図解",
  description:
    "Tailwindのレスポンシブはプレフィックス（sm:・md:・lg:）でモバイルファーストに設計する。プレフィックスなし=モバイルの仕組みを図解で解説。",
};

export default function ResponsivePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/css-framework" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← CSSフレームワーク に戻る
        </Link>
      </div>

      <Hero
        category="CSSフレームワーク"
        title="レスポンシブ対応"
        subtitle={"モバイルから積み上げる——sm:・md:・lg: の仕組みと考え方"}
        body={"プレフィックスなし=最小画面（モバイル）を起点に、画面が広くなるほどスタイルを追加していく設計思想。"}
        accentColor="cyan"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "sm: / md: / lg: プレフィックスの意味と適用される画面幅",
          "モバイルファーストとは何か（プレフィックスなし = モバイル）",
          "画面幅に応じてレイアウトを切り替える具体的な書き方",
        ]}
        prerequisites={[
          "よく使うクラス（common-classes）を読んでいること",
          "レスポンシブデザインの概念（画面幅で見た目を変える仕組み）を知っている",
          "grid や flex の基本クラスを知っている",
        ]}
        outOfScope={[
          "カスタムブレークポイントの追加（tailwind.config.js の screens 設定）",
          "container クラスの使い方と max-width の制御",
          "xl: / 2xl: の大画面対応（2560px〜）",
        ]}
      />

      <OnePageSummary
        keyMessage="Tailwindのレスポンシブはプレフィックスなし（最小画面=モバイル）から始まり、sm: / md: / lg: を付けたクラスが画面が広くなるにつれて追加適用される。小さい画面から順にスタイルを積み上げる「モバイルファースト」が基本思想。"
        metaphorTitle="服のレイヤリング"
        metaphorPoints={[
          {
            label: "プレフィックスなし",
            real: "どんな画面でも常に適用されるベースのスタイル。普段着（モバイル）の設計から始める",
            metaphor: "Tシャツ（普段着）",
          },
          {
            label: "sm:（640px〜）",
            real: "640px以上の画面になったとき追加で適用されるスタイル",
            metaphor: "ジャケットを追加",
          },
          {
            label: "md:（768px〜）",
            real: "768px以上の画面になったとき追加で適用されるスタイル",
            metaphor: "コートを追加",
          },
          {
            label: "lg:（1024px〜）",
            real: "1024px以上の画面になったとき追加で適用されるスタイル",
            metaphor: "マフラーも追加",
          },
        ]}
        definition="TailwindのレスポンシブはCSSのメディアクエリを@min-widthで実装する。プレフィックスなしがモバイル向けベースで、画面が広がるにつれてスタイルを上書きしていく設計。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「プレフィックスが適用される画面幅の範囲」を視覚的に確認しましょう。
        </p>

        {/* ── 概念図A: ブレークポイントの範囲 ── */}
        <ConceptDiagram
          title="概念図A"
          description="各プレフィックスはどの画面幅から適用されるか？"
        >
          <div className="space-y-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
                ブレークポイント一覧
              </p>
              <div className="space-y-3">
                {[
                  {
                    prefix: "（なし）",
                    range: "0px〜",
                    icon: Smartphone,
                    label: "モバイル",
                    note: "すべての画面で適用（ベース）",
                    color: "#22d3ee",
                  },
                  {
                    prefix: "sm:",
                    range: "640px〜",
                    icon: Tablet,
                    label: "スマホ横・小型タブレット",
                    note: "640px以上になったとき追加適用",
                    color: "#22d3ee",
                  },
                  {
                    prefix: "md:",
                    range: "768px〜",
                    icon: Tablet,
                    label: "タブレット",
                    note: "768px以上になったとき追加適用",
                    color: "#22d3ee",
                  },
                  {
                    prefix: "lg:",
                    range: "1024px〜",
                    icon: Monitor,
                    label: "ノートPC",
                    note: "1024px以上になったとき追加適用",
                    color: "#22d3ee",
                  },
                  {
                    prefix: "xl:",
                    range: "1280px〜",
                    icon: Monitor,
                    label: "デスクトップ",
                    note: "1280px以上になったとき追加適用（応用編）",
                    color: "#6b7280",
                  },
                ].map(({ prefix, range, icon: Icon, label, note, color }) => (
                  <div key={prefix} className="flex items-center gap-3">
                    <code
                      className="rounded px-2 py-1 font-mono text-xs flex-shrink-0 w-20 text-center"
                      style={{
                        backgroundColor: color === "#22d3ee" ? "rgba(6,182,212,0.1)" : "rgba(107,114,128,0.1)",
                        color,
                        border: `1px solid ${color === "#22d3ee" ? "rgba(6,182,212,0.3)" : "rgba(107,114,128,0.3)"}`,
                      }}
                    >
                      {prefix}
                    </code>
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-gray-300">{range}</span>
                      <span className="text-xs text-gray-500 ml-2">{label}</span>
                    </div>
                    <span className="text-xs text-gray-500 hidden sm:block">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 重要ポイント */}
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.3)" }}
            >
              <p className="text-xs font-semibold text-cyan-300 mb-2">重要：sm: は「small screen 用」ではない</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                sm: は「small（小さい）画面専用」ではなく「640px 以上の画面で追加適用」という意味。
                最も小さい画面（モバイル）は <strong className="text-white">プレフィックスなし</strong> のクラスが担当する。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          ブレークポイントが分かりました。次は「モバイルファースト」の考え方をコードで確認しましょう。
        </p>

        {/* ── 概念図B: モバイルファーストの積み上げ ── */}
        <ConceptDiagram
          title="概念図B"
          description="小さい画面から大きい画面へ、クラスを「積み上げ」ていく考え方"
        >
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
              <FlowCard
                Icon={Smartphone}
                title="モバイル"
                subtitle="grid-cols-1（1列）"
              />
              <FlowArrow label="640px以上" sublabel="sm: が追加適用" direction="right" />
              <FlowCard
                Icon={Tablet}
                title="タブレット"
                subtitle="sm:grid-cols-2（2列）"
                highlight
                accentColor="cyan"
              />
              <FlowArrow label="1024px以上" sublabel="lg: が追加適用" direction="right" />
              <FlowCard
                Icon={Monitor}
                title="PC"
                subtitle="lg:grid-cols-3（3列）"
              />
            </div>

            <div
              className="rounded-lg border p-4 font-mono text-xs leading-relaxed"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-gray-500 mb-2">{"// 1列→2列→3列のレスポンシブグリッド"}</p>
              <p>
                <span className="text-green-300">{"<div"}</span>
                <span className="text-sky-300">{" className"}</span>
                <span className="text-gray-300">{"=\""}</span>
              </p>
              <p className="ml-4">
                <span className="text-cyan-300">grid grid-cols-1</span>
                <span className="text-gray-500 ml-2">{"← モバイル（プレフィックスなし）"}</span>
              </p>
              <p className="ml-4">
                <span className="text-cyan-300">sm:grid-cols-2</span>
                <span className="text-gray-500 ml-2">{"← 640px以上で2列"}</span>
              </p>
              <p className="ml-4">
                <span className="text-cyan-300">lg:grid-cols-3</span>
                <span className="text-gray-500 ml-2">{"← 1024px以上で3列"}</span>
              </p>
              <p className="ml-4">
                <span className="text-cyan-300">gap-4</span>
              </p>
              <p>
                <span className="text-gray-300">{"\""}</span>
                <span className="text-green-300">{">"}</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {["モバイル（1列）", "sm（2列）", "lg（3列）"].map((label, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-2 text-center"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs text-gray-400 mb-2">{label}</p>
                  <div className={`grid gap-1 ${i === 0 ? "grid-cols-1" : i === 1 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {Array.from({ length: i === 0 ? 2 : i === 1 ? 4 : 3 }).map((_, j) => (
                      <div
                        key={j}
                        className="rounded h-4"
                        style={{ backgroundColor: "rgba(6,182,212,0.3)" }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            プレフィックスは「上書き」ではなく「追加」。小さい画面のスタイルは残したまま、大きい画面で変化を乗せる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "`sm:grid-cols-2` って書くと、スマホ（small）のときは2列になるんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "逆です、マジさん。`sm:` は「small以上——つまり640px以上で適用」という意味です。\nプレフィックスがないクラスが「最も小さい画面（モバイル）」に適用されます。\n服のレイヤリングと同じです。Tシャツ（モバイル）の上に、寒くなったらジャケット（sm）、コート（md）を重ねる。",
          },
          {
            speaker: "maji",
            emotion: "rebel",
            text: "それは直感と逆ですよ！ `sm:` って書いたら「スモール（小さい）画面用」に見えるじゃないですか！\nボク、ずっとそう思ってました……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "その違和感は最初は誰でも感じます。\n正確には「sm はSmall以上（at least small）の画面で追加適用する」という意味です。\nモバイルファーストとは「最小（モバイル）を基準にして、画面が広がるほどスタイルを追加する」設計思想です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "じゃあ、スマホで1列・タブレットで2列・PCで3列にしたい場合、どう書けばいいんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` と書きます。\nプレフィックスなし（モバイル）で1列を設定して、sm以上で2列を追加、lg以上で3列を追加する。\n積み上げる、という感覚です。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "あ、全部並べるだけ！ それぞれのサイズでスタイルが上書きされていくということですね。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "「上書き」より「追加」という感覚が正確です。\n小さい画面のスタイルは消えず、大きい画面では新しいスタイルが乗っかる形です。\n一番シンプルな状態をモバイルで設計して、余裕が出た画面幅で変化を積む——これがモバイルファーストの実体です、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["従来のメディアクエリ", "Tailwindのレスポンシブ"]}
          rows={[
            {
              label: "書く場所",
              cells: ["CSSファイルの @media 内", "classNameのプレフィックス"],
              highlightCol: 1,
            },
            {
              label: "モバイルファースト",
              cells: ["明示的に min-width を書く", "プレフィックスなし=モバイル（自動的に）"],
              highlightCol: 1,
            },
            {
              label: "ブレークポイントの管理",
              cells: ["自分で数値を管理（640px, 768px...）", "sm・md・lg の名前で統一（変更は設定ファイルで）"],
              highlightCol: 1,
            },
            {
              label: "コードの場所",
              cells: ["CSSファイルとHTMLを行き来", "HTMLのclassNameに全部書ける"],
              highlightCol: 1,
            },
          ]}
          note="どちらも最終的に生成されるCSSは同じ。Tailwindは「書く場所」と「命名の統一」で開発体験を改善している。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はcontainerクラス・カスタムブレークポイント・hidden/block を使った表示切り替えなど、より深い内容です。"
      />

      {/* ── 応用編 ────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — コンテナとhidden/block
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          レスポンシブで頻出するもう2つのパターンを確認します。
        </p>

        <TermNote
          terms={[
            {
              word: "container",
              definition:
                "max-widthを各ブレークポイントに合わせて自動制限するTailwindのユーティリティ。mx-auto と組み合わせて中央寄せのレイアウト幅を管理する。",
            },
            {
              word: "hidden / block",
              definition:
                "hidden は display: none で非表示。block は display: block で表示。sm:hidden（640px以上で非表示）のようにプレフィックスと組み合わせて要素の表示切り替えに使う。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="hidden と block を組み合わせた表示切り替えパターン"
        >
          <div className="space-y-3">
            <StackLayer
              Icon={Smartphone}
              title="モバイルだけに表示"
              subtitle="className=\"block sm:hidden\" — モバイルで表示、sm以上で非表示"
              iconColor="text-cyan-400"
            />
            <StackLayer
              Icon={Monitor}
              title="PC以上だけに表示"
              subtitle="className=\"hidden lg:block\" — モバイル・タブレットは非表示、lg以上で表示"
              iconColor="text-cyan-400"
            />
            <StackLayer
              Icon={Tablet}
              title="タブレット以上だけに表示"
              subtitle="className=\"hidden sm:block\" — モバイルは非表示、sm以上で表示"
              iconColor="text-cyan-400"
              showArrow={false}
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-2">{"// モバイルのみ表示するハンバーガーメニュー"}</p>
            <p>
              <span className="text-green-300">{"<button"}</span>
              <span className="text-sky-300">{" className"}</span>
              <span className="text-gray-300">{"=\""}</span>
              <span className="text-cyan-300">{"block sm:hidden"}</span>
              <span className="text-gray-300">{"\">"}</span>
            </p>
            <p className="ml-3 text-gray-400">メニュー</p>
            <p className="text-green-300">{"</button>"}</p>
            <p className="mt-2 text-gray-500">{"// PCのみ表示するナビゲーション"}</p>
            <p>
              <span className="text-green-300">{"<nav"}</span>
              <span className="text-sky-300">{" className"}</span>
              <span className="text-gray-300">{"=\""}</span>
              <span className="text-cyan-300">{"hidden sm:flex items-center gap-4"}</span>
              <span className="text-gray-300">{"\">"}</span>
            </p>
            <p className="ml-3 text-gray-400">ナビリンク</p>
            <p className="text-green-300">{"</nav>"}</p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            hidden + block + プレフィックスの組み合わせで、「どの画面幅でどの要素を見せるか」を細かく制御できる。
          </p>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 モバイルファーストで設計する理由">
          <p>
            モバイルファーストとは「モバイル（最小画面）のデザインを先に決め、画面が広くなるにつれてスタイルを追加する」設計思想。
            逆にデスクトップから設計して縮小していく方法を「デスクトップファースト」と呼ぶ。
          </p>
          <p>
            TailwindはモバイルファーストをCSSの仕組みで実現している。
            プレフィックスなしのクラスは <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>@media (min-width: ...)</code>{" "}
            なしのCSSに相当し、すべての画面幅で適用される。
            sm: / md: / lg: は <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>@media (min-width: 640px)</code>{" "}
            のような下限付きメディアクエリに変換される。
          </p>
          <KeyPoint>
            「モバイル版を先に完成させてからPC版を作る」という順序で設計すると、プレフィックスの使い方が自然に身に付く。まずプレフィックスなしでモバイルのレイアウトを完成させ、次に sm: md: lg: を加えて画面幅ごとの変化を定義する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 よくあるレスポンシブパターン集">
          <CodeBlock
            title="responsive-patterns.tsx"
            language="jsx"
            code={`// ① カードグリッド（1列→2列→3列）
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// ② ナビゲーション（モバイルでは縦、PCでは横）
<nav className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">

// ③ サイドバーレイアウト（モバイルで縦積み、PCで横並び）
<div className="flex flex-col lg:flex-row gap-6">
  <aside className="w-full lg:w-64 flex-shrink-0">...</aside>
  <main className="flex-1">...</main>
</div>

// ④ テキストサイズをレスポンシブに
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">

// ⑤ パディングをレスポンシブに
<section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">`}
          />
          <CorrectionCard
            misconception="sm: はスマートフォン（小さい画面）用のスタイルを書く場所"
            correction="sm: は「640px以上の画面で追加適用されるスタイル」を書く場所。スマートフォン専用ではなく、640px以上すべての画面で有効になる。"
            reason="Tailwindのプレフィックスはmin-widthベース（下限指定）なので、sm:のスタイルはスマホ横向き・タブレット・PC全てで有効になる。「small以上」と読むのが正確。"
          />
          <WarningPoint>
            デスクトップファーストで設計すると、Tailwindのプレフィックスが逆の意味に感じられて混乱しやすい。Tailwindを使うときは常に「プレフィックスなし = モバイル（最小）」から始めると覚えておくこと。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 hidden と block の表示制御">
          <p>
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>hidden</code>は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>display: none</code>、
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>block</code>は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>display: block</code>を設定するクラス。
            プレフィックスと組み合わせることで、「どの画面幅でどの要素を表示するか」を細かく制御できる。
          </p>
          <p>
            典型例として、モバイルではハンバーガーメニューを表示してナビゲーションを非表示にし、
            sm以上（タブレット・PC）ではハンバーガーを隠してナビゲーションを表示する、というパターンがある。
          </p>
          <KeyPoint>
            hidden と block の組み合わせは「モバイル専用コンテンツ」と「PC専用コンテンツ」を実現する最も単純な方法。ただし非表示にしてもDOMには残るため、スクリーンリーダーへの配慮が必要な場合は aria-hidden も合わせて使う。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/css-framework/shadcn",
            title: "shadcn/ui",
            description: "次のステップ。Tailwindベースのコンポーネントライブラリ",
            icon: "Package",
          },
          {
            href: "/css-framework/common-classes",
            title: "よく使うクラス",
            description: "flex・grid・spacing のクラス一覧に戻りたいときに",
            icon: "LayoutGrid",
          },
          {
            href: "/html-css/responsive",
            title: "CSSのレスポンシブ基礎",
            description: "メディアクエリの仕組み自体を確認したいときに",
            icon: "Code2",
          },
        ]}
      />

      <PageDrill questions={responsiveQuestions} />
    </div>
  );
}
