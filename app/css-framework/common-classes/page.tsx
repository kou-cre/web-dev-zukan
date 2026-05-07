import {
  LayoutGrid,
  AlignCenter,
  ArrowLeftRight,
  Type,
  Palette,
  Move,
  Grid2X2,
  Maximize2,
  Minus,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  StackLayer,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { commonClassesQuestions } from "@/content/questions/css-framework/common-classes";

export const metadata = {
  title: "よく使うクラス | Web開発図解",
  description:
    "Tailwind CSSのflex・grid・spacing・color・typographyなど頻出クラスを図解で整理。命名規則のパターンを覚えれば推測できる。",
};

export default function CommonClassesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/css-framework" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← CSSフレームワーク に戻る
        </Link>
      </div>

      <Hero
        category="CSSフレームワーク"
        title="よく使うクラス"
        subtitle={"命名規則を覚えれば、未知のクラスも推測できる"}
        body={"flex・grid・padding/margin・color・typography の頻出クラスを5カテゴリで整理する。"}
        accentColor="cyan"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "flex / grid 系レイアウトクラスの使い方",
          "padding / margin などスペーシングクラスの命名規則（1単位=4px）",
          "色・フォントサイズの典型クラスと読み方",
        ]}
        prerequisites={[
          "Tailwind CSS とは何かを知っている（tailwind-intro を読んだ）",
          "flexboxの基本概念（縦・横方向に並べる仕組み）を知っている",
          "CSSのpaddingとmarginの違いを知っている",
        ]}
        outOfScope={[
          "任意値クラス（p-[13px] など角括弧記法）（応用編で扱う）",
          "tailwind.config.js でのスケール拡張",
          "グラデーション・アニメーション系クラス",
        ]}
      />

      <OnePageSummary
        keyMessage="Tailwindのクラスは命名規則が統一されているので、一度パターンを覚えれば未知のクラスも推測できる。p-4=padding16px・text-lg=大きめフォント・bg-cyan-500=シアン色背景というように、短いキーワードの組み合わせで直感的に書ける。"
        metaphorTitle="電車の路線図"
        metaphorPoints={[
          {
            label: "数値スケール",
            real: "p-1(4px), p-2(8px), p-4(16px)... 4の倍数のルールさえ覚えれば自由に推測できる",
            metaphor: "駅間の距離ルール",
          },
          {
            label: "方向サフィックス",
            real: "p=全方向, px=左右, py=上下, pt=上, pb=下。方向を添えるだけ",
            metaphor: "上り・下り・各停の種別",
          },
          {
            label: "カラースケール",
            real: "cyan-100（薄い）〜 cyan-900（濃い）。500がベースカラー",
            metaphor: "路線の色の濃淡",
          },
          {
            label: "sm: md: lg:",
            real: "画面幅で分岐するプレフィックス。次のページで詳しく扱う",
            metaphor: "急行・特急のルール",
          },
        ]}
        definition="Tailwindのクラスは「カテゴリ」+「値」の命名ルールで構成されている。ルールを覚えると、調べなくてもクラス名を推測して書けるようになる。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは最も使う「スペーシングのルール」から理解しましょう。数字の意味が分かれば他のカテゴリにも応用できます。
        </p>

        {/* ── 概念図A: スペーシングスケール ── */}
        <ConceptDiagram
          title="概念図A"
          description="スペーシングクラスの数値は「4pxの倍数」。方向を添えれば細かく指定できる。"
        >
          <div className="space-y-4">
            {/* 数値スケール */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                スペーシングスケール（1単位 = 4px）
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { val: "0", px: "0px" },
                  { val: "1", px: "4px" },
                  { val: "2", px: "8px" },
                  { val: "3", px: "12px" },
                  { val: "4", px: "16px" },
                  { val: "5", px: "20px" },
                  { val: "6", px: "24px" },
                  { val: "8", px: "32px" },
                  { val: "10", px: "40px" },
                  { val: "12", px: "48px" },
                  { val: "16", px: "64px" },
                  { val: "20", px: "80px" },
                ].map(({ val, px }) => (
                  <div
                    key={val}
                    className="rounded border text-center py-1.5"
                    style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                  >
                    <p className="text-xs font-mono text-cyan-300">{val}</p>
                    <p className="text-xs text-gray-500">{px}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 方向サフィックス */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                方向サフィックス（padding / margin 共通）
              </p>
              <div className="space-y-2">
                {[
                  { cls: "p-4", desc: "全方向に padding 16px" },
                  { cls: "px-4", desc: "左右（x軸）に padding 16px" },
                  { cls: "py-4", desc: "上下（y軸）に padding 16px" },
                  { cls: "pt-4", desc: "上（top）に padding 16px" },
                  { cls: "pb-4", desc: "下（bottom）に padding 16px" },
                  { cls: "mx-auto", desc: "左右 margin を auto（中央寄せ）" },
                ].map(({ cls, desc }) => (
                  <div key={cls} className="flex items-center gap-3">
                    <code
                      className="rounded px-2 py-0.5 font-mono text-xs text-cyan-300 flex-shrink-0 w-24"
                      style={{ backgroundColor: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)" }}
                    >
                      {cls}
                    </code>
                    <span className="text-xs text-gray-400">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            m（margin）/ p（padding）/ gap は同じ数値スケールを使う。方向を組み合わせて細かく指定できる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          スペーシングのルールが分かりました。次は最も使うレイアウトクラス——flexとgridを確認します。
        </p>

        {/* ── 概念図B: flex / grid クラス ── */}
        <ConceptDiagram
          title="概念図B"
          description="flex と grid を使いこなすクラスの組み合わせを覚える。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* flex */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlignCenter className="w-4 h-4 text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-300">Flexbox</p>
              </div>
              <div className="space-y-2">
                {[
                  { cls: "flex", desc: "flex コンテナにする" },
                  { cls: "flex-col", desc: "縦方向に並べる（デフォルトは横）" },
                  { cls: "items-center", desc: "縦方向（交差軸）を中央に" },
                  { cls: "items-start", desc: "縦方向を上に揃える" },
                  { cls: "justify-center", desc: "横方向（主軸）を中央に" },
                  { cls: "justify-between", desc: "横方向に均等配置（両端揃え）" },
                  { cls: "gap-4", desc: "子要素の間に 16px の隙間" },
                  { cls: "flex-1", desc: "余ったスペースを全部取る" },
                  { cls: "flex-shrink-0", desc: "縮まないようにする" },
                ].map(({ cls, desc }) => (
                  <div key={cls} className="flex items-start gap-2">
                    <code className="rounded px-1.5 py-0.5 font-mono text-xs text-cyan-300 flex-shrink-0" style={{ backgroundColor: "rgba(6,182,212,0.1)" }}>
                      {cls}
                    </code>
                    <span className="text-xs text-gray-400 leading-relaxed">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* grid */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Grid2X2 className="w-4 h-4 text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-300">Grid</p>
              </div>
              <div className="space-y-2">
                {[
                  { cls: "grid", desc: "grid コンテナにする" },
                  { cls: "grid-cols-2", desc: "2列グリッド" },
                  { cls: "grid-cols-3", desc: "3列グリッド" },
                  { cls: "grid-cols-1 sm:grid-cols-2", desc: "モバイル1列・sm以上で2列" },
                  { cls: "gap-4", desc: "行と列に 16px の隙間" },
                  { cls: "col-span-2", desc: "2列分を占有する" },
                  { cls: "place-items-center", desc: "縦横ともに中央揃え" },
                ].map(({ cls, desc }) => (
                  <div key={cls} className="flex items-start gap-2">
                    <code className="rounded px-1.5 py-0.5 font-mono text-xs text-cyan-300 flex-shrink-0" style={{ backgroundColor: "rgba(6,182,212,0.1)" }}>
                      {cls}
                    </code>
                    <span className="text-xs text-gray-400 leading-relaxed">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.3)" }}
          >
            <p className="text-xs font-semibold text-cyan-300 mb-2">よく使う組み合わせパターン</p>
            <div className="font-mono text-xs space-y-1.5 text-gray-300">
              <p>
                <span className="text-gray-500">{"// 水平中央・縦中央に配置"}</span>
              </p>
              <p>
                <span className="text-green-300">{"<div"}</span>
                <span className="text-sky-300">{" className"}</span>
                <span className="text-gray-300">{"=\""}</span>
                <span className="text-cyan-300">{"flex items-center justify-center"}</span>
                <span className="text-gray-300">{"\">"}</span>
              </p>
              <p className="mt-2">
                <span className="text-gray-500">{"// 左にアイコン・右にテキスト（間に隙間）"}</span>
              </p>
              <p>
                <span className="text-green-300">{"<div"}</span>
                <span className="text-sky-300">{" className"}</span>
                <span className="text-gray-300">{"=\""}</span>
                <span className="text-cyan-300">{"flex items-center gap-3"}</span>
                <span className="text-gray-300">{"\">"}</span>
              </p>
              <p className="mt-2">
                <span className="text-gray-500">{"// カードグリッド（レスポンシブ）"}</span>
              </p>
              <p>
                <span className="text-green-300">{"<div"}</span>
                <span className="text-sky-300">{" className"}</span>
                <span className="text-gray-300">{"=\""}</span>
                <span className="text-cyan-300">{"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}</span>
                <span className="text-gray-300">{"\">"}</span>
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
            text: "マスター、`p-4` って何px 入るんですか？ 4が4pxじゃないのは分かるんですが、計算方法がよく分からなくて。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Tailwindは「4の倍数」システムです、マジさん。\n1単位が4pxなので、`p-4`は4×4=16pxです。\n`p-2`は8px、`p-8`は32px。一度ルールを覚えれば、見ただけで計算できます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "あ、4倍するだけ！ じゃあ `gap-6` は24pxですね。\nこのルールは padding と margin と gap、全部に使えますか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "全部同じスケールです。`p-4`も`m-4`も`gap-4`も16pxです。\nそして方向を指定するサフィックスもあります。`px-4`なら左右だけに16px、`pt-4`なら上だけに16px。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "`justify-between` とか `items-center` は何を意味するんですか……flexの話かなとは思うんですが、名前からは全然分からなくて。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "flexコンテナに適用するクラスです。\n`items-center` は縦方向（交差軸）の中央揃え。`justify-between` は横方向（主軸）に均等配置、つまり両端に寄せて余白を均等に分ける設定です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか！ CSSで書くと `display: flex; align-items: center; justify-content: space-between;` って書くやつが……3単語で終わるんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "それがTailwindの生産性の核心です。\n命名規則を覚えると「これは多分 items-start で行けるな」と推測しながら書けるようになります。\nVSCodeの補完と合わせれば、調べる時間がどんどん減っていきますよ、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["CSSプロパティ", "Tailwindクラス", "意味"]}
          rows={[
            {
              label: "padding: 16px",
              cells: ["padding: 16px", "p-4", "全方向に16px"],
              highlightCol: 1,
            },
            {
              label: "padding-top: 8px",
              cells: ["padding-top: 8px", "pt-2", "上だけ8px"],
              highlightCol: 1,
            },
            {
              label: "margin: auto（中央）",
              cells: ["margin: 0 auto", "mx-auto", "左右marginをauto"],
              highlightCol: 1,
            },
            {
              label: "display: flex",
              cells: ["display: flex", "flex", "flexコンテナにする"],
              highlightCol: 1,
            },
            {
              label: "justify-content: center",
              cells: ["justify-content: center", "justify-center", "主軸方向を中央に"],
              highlightCol: 1,
            },
            {
              label: "font-size: 14px",
              cells: ["font-size: 0.875rem", "text-sm", "小さめフォント（14px）"],
              highlightCol: 1,
            },
            {
              label: "font-weight: 700",
              cells: ["font-weight: 700", "font-bold", "太字"],
              highlightCol: 1,
            },
          ]}
          note="Tailwindのクラスは「カテゴリ + 値」の規則で命名されている。CSSプロパティを知っていると対応するTailwindクラスの推測が立てやすくなる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はタイポグラフィ系クラス・カラースケール・任意値クラスの詳細です。基本のflex・spacing・colorが使えるようになってから読んでください。"
      />

      {/* ── 応用編 ────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — タイポグラフィとカラーの詳細
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          フォント・テキスト関連クラスとカラースケールの詳細を確認します。
        </p>

        <TermNote
          terms={[
            {
              word: "rem（レム）",
              definition:
                "相対単位。ルート要素（html）のフォントサイズを1remとする単位。ブラウザのデフォルトでは16pxが1remになることが多い。Tailwindはremを使って設計されている。",
            },
            {
              word: "カラースケール（100〜900）",
              definition:
                "Tailwindのカラーは100（最も薄い）〜900（最も濃い）のスケール。500がベースカラーで、600以上が暗めの色、400以下が明るめの色になる。",
            },
            {
              word: "任意値クラス",
              definition:
                "p-[13px] や text-[#1a2b3c] のように、角括弧の中に任意の値を書けるTailwindの機能。テーマにない値を使いたいときのエスケープハッチ。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="タイポグラフィとカラーのクラス一覧"
        >
          <div className="space-y-4">
            {/* タイポグラフィ */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                テキスト / タイポグラフィ
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { cls: "text-xs", desc: "12px（極小）" },
                  { cls: "text-sm", desc: "14px（小）" },
                  { cls: "text-base", desc: "16px（基本）" },
                  { cls: "text-lg", desc: "18px（大）" },
                  { cls: "text-xl", desc: "20px（特大）" },
                  { cls: "text-2xl", desc: "24px" },
                  { cls: "font-normal", desc: "フォント太さ 400" },
                  { cls: "font-semibold", desc: "フォント太さ 600" },
                  { cls: "font-bold", desc: "フォント太さ 700" },
                  { cls: "leading-relaxed", desc: "行間 1.625（読みやすい）" },
                  { cls: "tracking-wide", desc: "文字間隔を広める" },
                  { cls: "uppercase", desc: "全て大文字に変換" },
                ].map(({ cls, desc }) => (
                  <div key={cls} className="flex items-center gap-2">
                    <code className="rounded px-1.5 py-0.5 font-mono text-xs text-cyan-300 flex-shrink-0" style={{ backgroundColor: "rgba(6,182,212,0.1)" }}>
                      {cls}
                    </code>
                    <span className="text-xs text-gray-400">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* カラー */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                カラースケール（cyan を例に）
              </p>
              <div className="space-y-2">
                {[
                  { val: "100", hex: "#cffafe", label: "薄い（ホバー背景など）" },
                  { val: "300", hex: "#67e8f9", label: "明るめ" },
                  { val: "400", hex: "#22d3ee", label: "やや明るめ" },
                  { val: "500", hex: "#06b6d4", label: "ベースカラー" },
                  { val: "600", hex: "#0891b2", label: "やや暗め（hover時）" },
                  { val: "800", hex: "#155e75", label: "暗め（テキストなど）" },
                  { val: "900", hex: "#164e63", label: "最も暗い" },
                ].map(({ val, hex, label }) => (
                  <div key={val} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded flex-shrink-0 border border-white/10"
                      style={{ backgroundColor: hex }}
                    />
                    <code className="font-mono text-xs text-cyan-300 w-20 flex-shrink-0">{`cyan-${val}`}</code>
                    <span className="text-xs text-gray-400">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                text-cyan-500 / bg-cyan-500 / border-cyan-500 など接頭辞を変えると用途が変わる。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 スペーシングの実践パターン">
          <p>
            スペーシングで一番よく使うパターンは「コンポーネント内部のpadding（p-4〜p-6）」と「要素間のgap（gap-2〜gap-4）」。
            外側のmarginは親コンポーネントが管理するのが設計的に清潔で、<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>mb-*</code>{" "}
            のような外側のmarginは使い所を絞る。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: Move,
                title: "内側のスペース",
                subtitle: "p-4 / p-5 / p-6",
                description: "コンテナ内部のpadding。カード・ボタン・モーダルに使う。カードは p-4〜p-6 が標準。",
                accentColor: "cyan",
              },
              {
                Icon: Minus,
                title: "要素間のスペース",
                subtitle: "gap-2 / gap-3 / gap-4",
                description: "flex / grid の子要素間の隙間。アイコン+テキストは gap-2、カード列は gap-4 が標準。",
                accentColor: "cyan",
              },
              {
                Icon: Maximize2,
                title: "外側のマージン",
                subtitle: "mb-4 / mb-6 / mb-10",
                description: "セクション間の間隔。兄弟要素の間は mb-4〜mb-6、セクションの下端は mb-10 が標準。",
                accentColor: "cyan",
              },
            ]}
          />
          <KeyPoint>
            padding は「自分の内側」、margin は「自分の外側（隣との距離）」。gap は flex / grid コンテナが子要素の間に入れる隙間で、子要素にmarginを書く必要がなくなる。この3つを使い分けるとスペーシングが整理される。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 よく使うレイアウトパターン集">
          <p>
            Tailwindのflexとgridは組み合わせパターンを覚えることが重要。いくつかのテンプレートを頭に入れておくと、ゼロから考えなくても素早く書ける。
          </p>
          <CodeBlock
            title="layout-patterns.tsx"
            language="jsx"
            code={`// ① ヘッダー：左にロゴ、右にナビ
<header className="flex items-center justify-between px-6 py-4">
  <div>ロゴ</div>
  <nav className="flex items-center gap-4">...</nav>
</header>

// ② カードグリッド（レスポンシブ）
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// ③ アイコン + テキスト（横並び）
<div className="flex items-center gap-2">
  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
  <span className="text-sm text-gray-300">完了</span>
</div>

// ④ 縦積みのフォーム
<div className="flex flex-col gap-3">
  <input className="rounded border px-3 py-2 text-sm" />
  <button className="bg-cyan-500 text-white px-4 py-2 rounded">送信</button>
</div>`}
          />
          <KeyPoint>
            レイアウトのテンプレートを「コピペして使う引き出し」として持っておくと生産性が上がる。まずテンプレートを貼り付け、必要に応じてクラスを調整するのが現場でのTailwindの使い方。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 サイズ・カラー以外の重要クラス">
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: LayoutGrid,
                title: "ボーダーとシャドウ",
                subtitle: "border / rounded / shadow",
                description: "border（枠線）・rounded-lg（角丸8px）・shadow-md（影）は組み合わせてカードを作る基本3点セット。",
                accentColor: "cyan",
              },
              {
                Icon: Type,
                title: "テキスト操作",
                subtitle: "truncate / whitespace-nowrap",
                description: "truncate（はみ出たテキストを...で省略）・whitespace-nowrap（折り返し禁止）は長いテキストの扱いに必須。",
                accentColor: "cyan",
              },
              {
                Icon: Palette,
                title: "透明度",
                subtitle: "bg-cyan-500/20 / text-white/70",
                description: "Tailwind v4ではスラッシュ記法で透明度を指定。bg-cyan-500/20 は背景色を20%の透明度で表示。",
                accentColor: "cyan",
              },
              {
                Icon: ArrowLeftRight,
                title: "ホバー・フォーカス",
                subtitle: "hover: / focus:",
                description: "hover:bg-cyan-600 はマウスオーバー時のみ適用。focus:ring は入力フィールドのフォーカス枠に使う。",
                accentColor: "cyan",
              },
            ]}
          />
          <KeyPoint>
            Tailwind v4では `bg-opacity-*` は使えない。透明度は `bg-cyan-500/20` のようなスラッシュ記法で指定すること。これはこのサイト（web-dev-zukan）でも使っているパターン。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/css-framework/responsive",
            title: "レスポンシブ対応",
            description: "次のステップ。sm:・md:・lg: でレイアウトを切り替える",
            icon: "Smartphone",
          },
          {
            href: "/css-framework/tailwind-intro",
            title: "Tailwind CSS とは",
            description: "ユーティリティファーストの基礎に戻りたいときに",
            icon: "Wand2",
          },
          {
            href: "/html-css/flexbox",
            title: "Flexbox（CSS基礎）",
            description: "flexboxの仕組み自体を理解したいときに",
            icon: "Layout",
          },
        ]}
      />

      <PageDrill questions={commonClassesQuestions} />
    </div>
  );
}
