import {
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  MoveHorizontal,
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
import { SectionDivider } from "@/components/SectionDivider";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { TermNote } from "@/components/TermNote";
import { CorrectionCard } from "@/components/CorrectionCard";
import { responsiveQuestions } from "@/content/questions/html-css/responsive";

export const metadata = {
  title: "レスポンシブデザイン | Web開発図解",
  description:
    "メディアクエリとモバイルファーストの考え方を図解で解説。スマホ・タブレット・PCで崩れないWebページを作るための基礎。",
};

export default function ResponsivePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/html-css" className="text-xs text-gray-500 hover:text-white transition-colors">
          {"← HTML / CSS基礎に戻る"}
        </Link>
      </div>

      <Hero
        category="HTML / CSS基礎"
        title="レスポンシブデザイン"
        subtitle={"スマホ・タブレット・PC、どの画面サイズでも崩れないWebページを作る"}
        body={"メディアクエリと「モバイルファースト」の考え方を押さえれば、あとは数値を調整するだけ。"}
        accentColor="orange"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "メディアクエリの書き方と意味",
          "モバイルファーストの設計思想と理由",
          "よく使うブレークポイントの目安",
        ]}
        prerequisites={[
          "CSSはHTMLの見た目を制御するための言語",
          "FlexboxまたはGridを使ったレイアウトの基本",
          "ブラウザの画面幅（px）という概念",
        ]}
        outOfScope={[
          "Container Queries（親要素のサイズに応じたスタイル変更）",
          "フルードタイポグラフィ（clampを使ったフォントサイズ制御）",
          "レスポンシブ画像（srcset・sizes属性）",
        ]}
      />

      <OnePageSummary
        keyMessage="レスポンシブデザインとは「画面サイズに応じてレイアウトを変える」設計のこと。核心はメディアクエリ（@media）という条件付きCSSと、モバイルを先に設計するモバイルファーストの考え方。スマホの小さい画面を基準に書き、大きい画面向けの変更を上書きしていく。"
        metaphorTitle="折り畳み式の家具"
        metaphorPoints={[
          {
            label: "モバイルファースト",
            real: "まず「折り畳んだ状態（スマホ）」を設計する。展開したとき（PC）の追加スタイルを上書きする",
            metaphor: "折り畳み状態が基本",
          },
          {
            label: "メディアクエリ",
            real: "「画面幅が768px以上になったら」という条件でCSSを切り替える装置",
            metaphor: "展開の引き金",
          },
          {
            label: "ブレークポイント",
            real: "レイアウトが切り替わる画面幅の値（768px / 1024px など）",
            metaphor: "折り畳みの関節",
          },
        ]}
        definition="レスポンシブデザインとは、1つのHTMLでさまざまな画面サイズに対応するWebデザインのアプローチ。メディアクエリを使ってブレークポイントごとにCSSを上書きする。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「モバイルファースト」と「デスクトップファースト」の違いを理解してから、実際のメディアクエリの書き方を確認します。
        </p>

        {/* TermNote */}
        <TermNote
          terms={[
            {
              word: "メディアクエリ",
              definition: "@media (min-width: 768px) { ... } という書き方で、特定の条件（画面幅など）が満たされたときだけ適用するCSSを書ける仕組み。",
            },
            {
              word: "ブレークポイント",
              definition: "レイアウトを切り替える画面幅の境界値。モバイル・タブレット・PCの境目になることが多い（例：768px・1024px）。",
            },
            {
              word: "min-width / max-width",
              definition: "min-width: 768px は「768px以上の画面」、max-width: 767px は「767px以下の画面」という条件。",
            },
            {
              word: "viewport",
              definition: "ブラウザが表示できる画面の幅。スマホでは実際の物理ピクセルより小さく設定されることがある。<meta name='viewport'> で設定する。",
            },
          ]}
        />

        {/* ── 概念図A: モバイルファーストの方向 ── */}
        <ConceptDiagram
          title="概念図A"
          description="モバイルファーストとデスクトップファースト — 設計方向が逆になる"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* モバイルファースト */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(249,115,22,0.05)", borderColor: "rgba(249,115,22,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-orange-300">モバイルファースト（推奨）</p>
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Smartphone className="w-6 h-6 text-orange-300" />
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <Tablet className="w-7 h-7 text-orange-200" />
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <Monitor className="w-9 h-9 text-gray-300" />
              </div>
              <div
                className="rounded border p-2.5 font-mono text-xs leading-relaxed"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-gray-500">{"/* スマホ（デフォルト） */"}</p>
                <p><span className="text-orange-300">.card</span><span className="text-gray-300">{" { "}</span><span className="text-blue-300">width</span><span className="text-gray-300">: </span><span className="text-green-300">100%</span><span className="text-gray-300">; {"}"}</span></p>
                <p className="mt-1 text-gray-500">{"/* PC以上に上書き */"}</p>
                <p><span className="text-purple-300">@media</span><span className="text-gray-300">{" (min-width: 768px) {"}</span></p>
                <p className="ml-2"><span className="text-orange-300">.card</span><span className="text-gray-300">{" { "}</span><span className="text-blue-300">width</span><span className="text-gray-300">: </span><span className="text-green-300">50%</span><span className="text-gray-300">; {"}"}</span></p>
                <p><span className="text-gray-300">{"}"}</span></p>
              </div>
            </div>

            {/* デスクトップファースト */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-gray-400">デスクトップファースト（旧来）</p>
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Monitor className="w-9 h-9 text-gray-400" />
                <ArrowRight className="w-4 h-4 text-gray-600" />
                <Tablet className="w-7 h-7 text-gray-500" />
                <ArrowRight className="w-4 h-4 text-gray-600" />
                <Smartphone className="w-6 h-6 text-gray-600" />
              </div>
              <div
                className="rounded border p-2.5 font-mono text-xs leading-relaxed"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p className="text-gray-600">{"/* PC（デフォルト） */"}</p>
                <p><span className="text-gray-400">.card</span><span className="text-gray-500">{" { "}</span><span className="text-gray-500">width</span><span className="text-gray-600">: </span><span className="text-gray-500">50%</span><span className="text-gray-500">; {"}"}</span></p>
                <p className="mt-1 text-gray-600">{"/* スマホに縮小 */"}</p>
                <p><span className="text-gray-500">@media</span><span className="text-gray-500">{" (max-width: 767px) {"}</span></p>
                <p className="ml-2"><span className="text-gray-400">.card</span><span className="text-gray-500">{" { "}</span><span className="text-gray-500">width</span><span className="text-gray-600">: </span><span className="text-gray-500">100%</span><span className="text-gray-500">; {"}"}</span></p>
                <p><span className="text-gray-500">{"}"}</span></p>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(249,115,22,0.05)", borderColor: "rgba(249,115,22,0.25)" }}
          >
            <p className="text-xs font-semibold text-orange-300 mb-2">なぜモバイルファーストが推奨なのか</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              世界のWeb閲覧の約60%はスマホから。min-widthの積み上げ方式は、デフォルトが最小構成のため「余計なCSSを後から打ち消す」処理が減り、パフォーマンスとコードの見通しが良くなります。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          設計の方向が分かりました。次は実際のブレークポイントの目安と、よく使うメディアクエリのパターンを確認します。
        </p>

        {/* ── 概念図B: ブレークポイントのフロー ── */}
        <ConceptDiagram
          title="概念図B"
          description="典型的な3段階のブレークポイント設計"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Smartphone}
              title="スマホ"
              subtitle="〜767px"
              accentColor="orange"
            />
            <FlowArrow label="min-width: 768px" direction="right" />
            <FlowCard
              Icon={Tablet}
              title="タブレット"
              subtitle="768px〜1023px"
              highlight
              accentColor="orange"
            />
            <FlowArrow label="min-width: 1024px" direction="right" />
            <FlowCard
              Icon={Monitor}
              title="PC"
              subtitle="1024px〜"
              accentColor="orange"
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"/* モバイルファースト・3段階ブレークポイント */"}</p>
            <p>
              <span className="text-gray-500">{"/* スマホ（デフォルト）*/"}</span>
            </p>
            <p><span className="text-orange-300">.container</span><span className="text-gray-300">{" { "}</span><span className="text-blue-300">padding</span><span className="text-gray-300">: </span><span className="text-green-300">0 16px</span><span className="text-gray-300">; {"}"}</span></p>
            <p className="mt-2">
              <span className="text-purple-300">@media</span><span className="text-gray-300">{" (min-width: 768px) { "}</span>
              <span className="text-gray-500">{"/* タブレット以上 */"}</span>
            </p>
            <p className="ml-2"><span className="text-orange-300">.container</span><span className="text-gray-300">{" { "}</span><span className="text-blue-300">padding</span><span className="text-gray-300">: </span><span className="text-green-300">0 32px</span><span className="text-gray-300">; {"}"}</span></p>
            <p><span className="text-gray-300">{"}"}</span></p>
            <p className="mt-2">
              <span className="text-purple-300">@media</span><span className="text-gray-300">{" (min-width: 1024px) { "}</span>
              <span className="text-gray-500">{"/* PC以上 */"}</span>
            </p>
            <p className="ml-2"><span className="text-orange-300">.container</span><span className="text-gray-300">{" { "}</span><span className="text-blue-300">max-width</span><span className="text-gray-300">: </span><span className="text-green-300">1200px</span><span className="text-gray-300">; {"}"}</span></p>
            <p><span className="text-gray-300">{"}"}</span></p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Tailwind CSS では sm: (640px) / md: (768px) / lg: (1024px) / xl: (1280px) が対応する。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ──────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、スマホで崩れないページを作るには何をすればいいんですか？ PCで見ると綺麗なのに、スマホで確認したらぐちゃぐちゃで……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "まず最初に確認することがあります、マジさん。\nHTMLのheadに `<meta name='viewport' content='width=device-width, initial-scale=1'>` は入っていますか？\nこれがないとスマホブラウザはPC用として画面を縮小表示してしまい、どんなに頑張っても崩れたまま見えます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "えっ、そんな1行で解決することがあるんですか！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "その次がメディアクエリです。\n@media (min-width: 768px) という書き方で、『画面幅が768px以上のときだけ』適用されるCSSを書けます。\nスマホのデフォルトスタイルを先に書いて、PCの変更を後から上書きする。これがモバイルファーストの基本です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ なぜスマホを先に書く必要があるんですか？ PCから作った方が画面が大きくて作りやすいのでは……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "それはよくある疑問です。\nデスクトップファーストで作ると、スマホ向けに上書きするCSSが増えていきます。\nモバイルファーストは最小構成のスマホから始めて、大きい画面で必要な追加だけを書く。\n上書きが少なくなるので、コードがシンプルで読みやすく、ブラウザのパフォーマンスも上がるんです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。スマホを基準にして、大きくなるにつれて機能を追加する考え方ですね。\nつまり折り畳み状態がデフォルトで、展開したら机が広くなる感じ……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その例えは見事です、マジさん。\n実践のコツを1つ言うと、Tailwind CSSを使う場合は sm: md: lg: xl: というプレフィックスがそのままブレークポイントになります。\n`class='w-full md:w-1/2 lg:w-1/3'` と書くだけで、スマホ全幅・タブレット半幅・PC3分の1幅のレスポンシブレイアウトが完成します。",
          },
          {
            speaker: "maji",
            emotion: "tearful",
            text: "あぁ……ボクが何時間もかかって作ったレスポンシブ対応が、Tailwindでは1行で……。\nこれは感動なのか、悔しいのか……",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["アプローチ", "デフォルト対象", "上書き方向"]}
          rows={[
            {
              label: "モバイルファースト（推奨）",
              cells: ["スマホ（最小）", "min-width で大きい画面に追加"],
              highlightCol: 0,
            },
            {
              label: "デスクトップファースト（旧来）",
              cells: ["PC（最大）", "max-width でスマホに縮小"],
              highlightCol: 1,
            },
          ]}
          note="Tailwind CSS は min-width ベースなのでデフォルトがモバイルファースト。フレームワークを使う場合はその思想に従うのが最もスムーズ。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はContainer Queries・流体タイポグラフィ・レスポンシブ画像など、より高度なレスポンシブ技法です。"
      />

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 viewportメタタグ — 必須の1行">
          <p>
            スマホブラウザは何も設定がないとPC用サイトとして縮小表示します。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fb923c" }}>
              {`<meta name="viewport" content="width=device-width, initial-scale=1">`}
            </code>
            をheadに入れることで「デバイスの幅を基準にする」と指定できます。Next.js・Viteなどのフレームワークはデフォルトで含まれていることが多い。
          </p>
          <CodeBlock
            title="index.html（head内）"
            language="html"
            code={`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <!-- ↓ この1行が必須 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>レスポンシブサイト</title>
  <link rel="stylesheet" href="style.css">
</head>`}
          />
          <KeyPoint>
            viewportメタタグを忘れると「CSSを完璧に書いてもスマホで崩れる」という状態になる。これが見落とされるとデバッグに何時間もかかることがある。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 よく使うブレークポイントのパターン">
          <p>
            ブレークポイントの値はデバイスに依存しすぎず、コンテンツが崩れない自然な幅で設定するのが理想です。ただし多くのプロジェクトでは以下の値が慣習として使われています。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: Smartphone,
                title: "スマホ",
                subtitle: "〜767px",
                description: "デフォルト（モバイルファーストの基準）。1カラムレイアウトが基本。",
                accentColor: "orange",
              },
              {
                Icon: Tablet,
                title: "タブレット",
                subtitle: "768px〜1023px",
                description: "min-width: 768px。2カラムや横並びナビに切り替えるケースが多い。",
                accentColor: "slate",
              },
              {
                Icon: Monitor,
                title: "PC",
                subtitle: "1024px〜",
                description: "min-width: 1024px。3カラム・サイドバー付きレイアウトに切り替える。",
                accentColor: "slate",
              },
            ]}
          />
          <CorrectionCard
            misconception="ブレークポイントは特定のデバイスのサイズに合わせて設定しなければならない"
            correction="ブレークポイントはデバイスではなくコンテンツが崩れる幅に設定する"
            reason="iPhoneのサイズは毎年変わり、全デバイスに対応することは不可能。コンテンツを縮めていって『崩れ始めた幅』を見て設定するのが正しいアプローチ。"
          />
          <WarningPoint>
            ブレークポイントを増やしすぎるとCSSが複雑になる。「3段階（モバイル・タブレット・PC）で9割のケースに対応できる」と覚えておけば過剰な細分化を防げる。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/html-css/flexbox",
            title: "Flexbox",
            description: "レスポンシブレイアウトの実装に欠かせない基礎",
            icon: "LayoutGrid",
          },
          {
            href: "/html-css/grid",
            title: "Grid",
            description: "複雑なレスポンシブページレイアウトはGridで",
            icon: "Grid3X3",
          },
          {
            href: "/html-css/css-variables",
            title: "CSS変数",
            description: "ブレークポイントごとの値をCSS変数で一元管理",
            icon: "Variable",
          },
        ]}
      />

      <PageDrill questions={responsiveQuestions} />
    </div>
  );
}
