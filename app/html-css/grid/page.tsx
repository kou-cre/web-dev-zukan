import {
  Grid3X3,
  LayoutGrid,
  Rows,
  Columns,
  Expand,
  SplitSquareHorizontal,
  SplitSquareVertical,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { TermNote } from "@/components/TermNote";
import { gridQuestions } from "@/content/questions/html-css/grid";

export const metadata = {
  title: "Grid | Web開発図解",
  description:
    "CSS Gridを図解で解説。grid-template-columns・grid-area・frの単位など、2次元レイアウトの核心を理解する。",
};

export default function GridPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/html-css" className="text-xs text-gray-500 hover:text-white transition-colors">
          {"← HTML / CSS基礎に戻る"}
        </Link>
      </div>

      <Hero
        category="HTML / CSS基礎"
        title="Grid"
        subtitle={"行と列を同時に制御できる、2次元レイアウトの最終兵器"}
        body={"grid-template-columns で列を定義して、grid-area でエリアに名前を付ける。複雑なページレイアウトもスッキリ書ける。"}
        accentColor="orange"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "display:grid で2次元レイアウトを作る方法",
          "grid-template-columns で列の数と幅を定義する方法",
          "grid-area でエリアに名前を付けてレイアウトを設計する方法",
        ]}
        prerequisites={[
          "CSSはHTMLの見た目を制御するための言語",
          "Flexboxを知っていると比較しやすい（知らなくても読める）",
          ".class などのセレクタでHTMLにスタイルを当てる基本",
        ]}
        outOfScope={[
          "grid-template-rows の詳細な設定",
          "grid-column-start / grid-column-end の直接指定",
          "subgrid（子グリッドの整列）",
        ]}
      />

      <OnePageSummary
        keyMessage="CSS Gridは「マス目を定義して、要素をマス目に配置する」レイアウトシステム。Flexboxが1次元（行か列どちらか）なのに対して、Gridは行と列を同時に制御できる。ページ全体のレイアウトや複雑なカードグリッドはGridが得意。"
        metaphorTitle="建物の間取り図"
        metaphorPoints={[
          {
            label: "grid-template-columns",
            real: "「左1列は廊下、真ん中3列は部屋、右1列は収納」のような間取りの縦列の割り付け",
            metaphor: "間取り図の縦線",
          },
          {
            label: "grid-template-rows",
            real: "「1階はロビー、2階以上は居室」のような横行の割り付け",
            metaphor: "間取り図の横線",
          },
          {
            label: "grid-area",
            real: "「この部屋はリビング、このエリアはキッチン」と各スペースに名前を付ける",
            metaphor: "間取りの部屋名",
          },
          {
            label: "fr単位",
            real: "「廊下は全体の1割、部屋は残りを等分」のような割合指定",
            metaphor: "フロア面積の比率",
          },
        ]}
        definition="CSS Gridとは、行と列の2次元でレイアウトを定義するCSSのモジュール。テンプレートでマス目を決め、エリア名で要素を配置する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずGridの「マス目の作り方」を理解してから、エリアに名前を付けてページレイアウトを組む方法を確認しましょう。
        </p>

        {/* TermNote */}
        <TermNote
          terms={[
            {
              word: "Grid Container",
              definition: "display:grid を指定した親要素。この中の子要素がグリッドセルに配置される。",
            },
            {
              word: "Grid Track",
              definition: "グリッドの行（Row Track）または列（Column Track）のこと。grid-template-columns で列のトラックを定義する。",
            },
            {
              word: "fr（フラクション）",
              definition: "Gridで使える割合単位。1fr は「残りの空き領域を1等分した量」。2fr は 1fr の2倍。",
            },
            {
              word: "grid-area",
              definition: "グリッドエリアに名前を付けるプロパティ。grid-template-areas と組み合わせて視覚的なレイアウト定義ができる。",
            },
          ]}
        />

        {/* ── 概念図A: grid-template-columns ── */}
        <ConceptDiagram
          title="概念図A"
          description="grid-template-columns で列の数と幅を定義する"
        >
          <div className="space-y-4">
            {/* repeat(3, 1fr) */}
            <div
              className="rounded-lg border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-3">
                <span className="text-orange-300 font-mono">grid-template-columns: repeat(3, 1fr)</span>
                <span className="ml-2 text-gray-500">— 3列均等</span>
              </p>
              <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                {["1fr", "1fr", "1fr"].map((label, i) => (
                  <div
                    key={i}
                    className="rounded py-3 text-center text-xs font-semibold"
                    style={{ backgroundColor: "rgba(249,115,22,0.12)", color: "#fb923c" }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* 240px 1fr */}
            <div
              className="rounded-lg border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-3">
                <span className="text-orange-300 font-mono">grid-template-columns: 240px 1fr</span>
                <span className="ml-2 text-gray-500">— サイドバー + メイン</span>
              </p>
              <div className="grid gap-1.5" style={{ gridTemplateColumns: "40% 1fr" }}>
                <div
                  className="rounded py-3 text-center text-xs font-semibold"
                  style={{ backgroundColor: "rgba(249,115,22,0.08)", color: "#fb923c" }}
                >
                  240px（固定）
                </div>
                <div
                  className="rounded py-3 text-center text-xs font-semibold"
                  style={{ backgroundColor: "rgba(249,115,22,0.18)", color: "#fb923c" }}
                >
                  1fr（残り）
                </div>
              </div>
            </div>

            {/* repeat(auto-fill, minmax) */}
            <div
              className="rounded-lg border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-3">
                <span className="text-orange-300 font-mono">grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))</span>
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                最小200px・最大1frのカラムを、親の幅に収まる分だけ自動生成する。レスポンシブカードグリッドの定番パターン。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            frは「残り空き領域を等分する」割合単位。pxとの組み合わせで柔軟なレイアウトが作れる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          列の定義ができました。次はエリアに名前を付けてページ全体のレイアウトを設計する方法を確認します。
        </p>

        {/* ── 概念図B: grid-template-areas ── */}
        <ConceptDiagram
          title="概念図B"
          description="grid-template-areas でエリア名を使った視覚的なレイアウト設計"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CSSコード */}
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2">CSSの定義</p>
              <div
                className="rounded-lg border p-3 font-mono text-xs leading-relaxed"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p><span className="text-blue-300">{"."}</span><span className="text-yellow-300">layout</span><span className="text-gray-300">{" {"}</span></p>
                <p className="ml-2"><span className="text-orange-300">display</span><span className="text-gray-300">: </span><span className="text-green-300">grid</span><span className="text-gray-300">;</span></p>
                <p className="ml-2"><span className="text-orange-300">grid-template-columns</span><span className="text-gray-300">: </span><span className="text-green-300">200px 1fr</span><span className="text-gray-300">;</span></p>
                <p className="ml-2"><span className="text-orange-300">grid-template-areas</span><span className="text-gray-300">:</span></p>
                <p className="ml-4"><span className="text-green-300">{'"header header"'}</span></p>
                <p className="ml-4"><span className="text-green-300">{'"sidebar main"'}</span></p>
                <p className="ml-4"><span className="text-green-300">{'"footer footer"'}</span><span className="text-gray-300">;</span></p>
                <p><span className="text-gray-300">{"}"}</span></p>
                <p className="mt-2"><span className="text-blue-300">{"."}</span><span className="text-yellow-300">header</span><span className="text-gray-300">{" { "}</span><span className="text-orange-300">grid-area</span><span className="text-gray-300">: </span><span className="text-green-300">header</span><span className="text-gray-300">; {"}"}</span></p>
                <p><span className="text-blue-300">{"."}</span><span className="text-yellow-300">sidebar</span><span className="text-gray-300">{" { "}</span><span className="text-orange-300">grid-area</span><span className="text-gray-300">: </span><span className="text-green-300">sidebar</span><span className="text-gray-300">; {"}"}</span></p>
              </div>
            </div>

            {/* レイアウトのビジュアル */}
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2">レンダリング結果のイメージ</p>
              <div className="space-y-1.5">
                <div
                  className="rounded py-2.5 text-center text-xs font-semibold"
                  style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#fb923c" }}
                >
                  header（全幅）
                </div>
                <div className="flex gap-1.5">
                  <div
                    className="rounded py-6 text-center text-xs font-semibold flex-shrink-0"
                    style={{ width: "35%", backgroundColor: "rgba(249,115,22,0.08)", color: "#fdba74" }}
                  >
                    sidebar
                  </div>
                  <div
                    className="flex-1 rounded py-6 text-center text-xs font-semibold"
                    style={{ backgroundColor: "rgba(249,115,22,0.12)", color: "#fb923c" }}
                  >
                    main
                  </div>
                </div>
                <div
                  className="rounded py-2.5 text-center text-xs font-semibold"
                  style={{ backgroundColor: "#1a1d2a", color: "#6b7280", border: "1px solid #2d3048" }}
                >
                  footer（全幅）
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(249,115,22,0.05)", borderColor: "rgba(249,115,22,0.25)" }}
          >
            <p className="text-xs font-semibold text-orange-300 mb-2">grid-template-areas の強み</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              CSSのコードがそのまま「部屋の間取り図」のように読めます。「header header」と書けばheaderが2列分を占めることが直感的に分かる。複雑なページレイアウトも視覚的に設計できる。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ──────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、Flexboxを覚えたんですけど、GridってFlexboxと何が違うんですか？ 同じじゃないですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い質問です、マジさん。\nFlexboxは「1方向の列並べ」で、洋服を1段の棚に横一列に並べるイメージです。\nGridは「縦も横も同時に制御できる区画割り」で、マンションの間取り図のようなものです。\nFlexboxが行だけ、Gridが行と列を同時に管理します。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "マンションの間取り図……！ なんとなく分かりました。でも grid-template-columns とか fr という単位が初めて見る形で……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "frはfraction（分数・割合）の略です。\nたとえば repeat(3, 1fr) と書くと、親の幅を3等分した列が3つ作られます。\n240px 1fr と書くと、左の列は240pxで固定、右の列は残りを全部使います。\nサイドバー付きレイアウトの定番です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ grid-template-areas というのも見かけたんですが、これは何ですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "これが Grid の最大の特徴です、マジさん。\nCSSの中に間取り図を描くようなイメージで、エリアに名前を付けて配置を決められます。\n`'header header' 'sidebar main'` と書けば、1行目はheaderが全幅、2行目は左がsidebar・右がmainという構造が一目で分かります。\n和室・洋室・浴室と書いた間取り図が、そのままCSSになるんです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "便利そうですね……でもFlexboxとGridをどう使い分ければいいんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "判断基準はシンプルです。\n『行か列、どちらか一方を制御するだけで良い』→ Flexbox。\n『行と列を同時に揃えたい・ページ全体の骨格を作りたい』→ Grid。\n実際の現場では、ページ全体の枠組みをGridで作り、その中のコンポーネント（ナビバー・ボタン列）をFlexboxで作ることが多いです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど！ 大きい枠組みはGrid、細かいパーツはFlex……ボク、完全にマスターしましたね！",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["役割", "使い方の例"]}
          rows={[
            {
              label: "grid-template-columns",
              cells: ["列の数と幅を定義", "repeat(3, 1fr) / 240px 1fr"],
              highlightCol: 0,
            },
            {
              label: "grid-template-rows",
              cells: ["行の高さを定義", "auto / 60px 1fr auto"],
              highlightCol: 0,
            },
            {
              label: "grid-template-areas",
              cells: ["エリア名でレイアウトを設計", "'header header' 'sidebar main'"],
              highlightCol: 0,
            },
            {
              label: "grid-area",
              cells: ["子要素をエリアに配置", "header / sidebar / main"],
              highlightCol: 0,
            },
            {
              label: "gap",
              cells: ["行・列間のスペース", "16px / 1rem"],
              highlightCol: 0,
            },
          ]}
          note="Gridはページ全体の骨格・Flexboxはコンポーネント内部の配置、という使い分けが現代の定番。どちらも display プロパティに1値書くだけで有効になる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はgrid-column-start / grid-column-end の直接指定やサブグリッドなど、Gridをより細かく制御する内容です。"
      />

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 fr単位とrepeat()の組み合わせ">
          <p>
            fr（フラクション）単位はGridで最もよく使う値です。「残りの空き領域を割り比で分ける」という意味を持ちます。
            repeat(3, 1fr) は「1frを3列分作る」= 3等分です。repeat(auto-fill, minmax(200px, 1fr)) は「最小200px・最大1frのカラムを敷き詰める」という意味で、レスポンシブカードグリッドの定番コードになっています。
          </p>
          <CodeBlock
            title="grid-layout.css"
            language="css"
            code={`/* 基本的なPageレイアウト */
.page-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  min-height: 100vh;
  gap: 0;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* レスポンシブカードグリッド */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}`}
          />
          <KeyPoint>
            grid-template-areas の文字列はビジュアル的に間取り図になる。同じ名前を連続させると列または行をまたいで配置できる。. を使うと空のセルを作れる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 Flexbox と Grid の組み合わせ（応用編）">
          <p>
            実務では FlexboxとGridを組み合わせて使います。ページ全体の大枠をGridで作り、その中の個別のコンポーネント（ヘッダー・カード・フォーム）をFlexboxで作るパターンが最もよく見られます。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Expand,
                title: "Gridが得意なケース",
                subtitle: "ページ骨格・ダッシュボード",
                description: "header・sidebar・main・footerの全体レイアウト。行と列を同時に揃える必要がある複雑な画面。",
                accentColor: "orange",
              },
              {
                Icon: Columns,
                title: "Flexboxが得意なケース",
                subtitle: "コンポーネント内の配置",
                description: "ナビバーのロゴ+リンク+ボタンの横並び。カード内のアイコン+テキストの配置。フォームの入力+送信ボタン。",
                accentColor: "slate",
              },
            ]}
          />
          <WarningPoint>
            GridもFlexboxも、どちらが「より良い」わけではない。「行と列を同時に制御するか」という目的の違いで使い分ける。無理にどちらかに統一しようとせず、場面によって組み合わせるのが現代のCSSの使い方。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/html-css/flexbox",
            title: "Flexbox",
            description: "GridとFlexboxの使い分けを理解するために",
            icon: "LayoutGrid",
          },
          {
            href: "/html-css/responsive",
            title: "レスポンシブデザイン",
            description: "GridとメディアクエリでモバイルOKなレイアウトへ",
            icon: "Smartphone",
          },
          {
            href: "/html-css/css-variables",
            title: "CSS変数",
            description: "GridのgapやサイズをCSS変数で一元管理する",
            icon: "Variable",
          },
        ]}
      />

      <PageDrill questions={gridQuestions} />
    </div>
  );
}
