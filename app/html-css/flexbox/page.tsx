import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeftRight,
  ArrowUpDown,
  Minus,
  LayoutGrid,
  Rows,
  Columns,
  WrapText,
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
import { flexboxQuestions } from "@/content/questions/html-css/flexbox";

export const metadata = {
  title: "Flexbox | Web開発図解",
  description:
    "CSSのFlexboxを図解で解説。横並び・中央揃え・折り返し、justify-content と align-items の違いを完全に理解する。",
};

export default function FlexboxPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/html-css" className="text-xs text-gray-500 hover:text-white transition-colors">
          {"← HTML / CSS基礎に戻る"}
        </Link>
      </div>

      <Hero
        category="HTML / CSS基礎"
        title="Flexbox"
        subtitle={"1行のCSSで子要素を横並びにできる、現代のレイアウトの基本"}
        body={"display:flex の仕組みと、justify-content・align-items の2つを理解して実務の8割に対応する。"}
        accentColor="orange"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "display:flex で子要素が横並びになる仕組み",
          "justify-content と align-items の役割の違い",
          "flex-wrap で折り返しを制御する方法",
        ]}
        prerequisites={[
          "CSSはHTMLの見た目を制御するための言語",
          "ブロック要素はデフォルトで縦に積み重なる",
          ".class などのセレクタでHTMLにスタイルを当てる基本",
        ]}
        outOfScope={[
          "flex-grow / flex-shrink / flex-basis（子要素のサイズ詳細制御）",
          "order プロパティ（DOM順と表示順を変える）",
          "ネストしたFlexboxの複雑なパターン",
        ]}
      />

      <OnePageSummary
        keyMessage="Flexboxは「子要素を一列に並べるレイアウトシステム」。親要素に display:flex を1行書くだけで横並びになる。justify-content（主軸=横の配置）とalign-items（交差軸=縦の配置）の2つを覚えれば、実務の8割のレイアウトは作れる。"
        metaphorTitle="体育の整列号令"
        metaphorPoints={[
          {
            label: "display:flex",
            real: "「整列！」の号令。これを書いた瞬間に親要素が指揮官になり、子要素が横に並ぶモードに切り替わる",
            metaphor: "整列号令",
          },
          {
            label: "justify-content",
            real: "横方向の配置指示。「中央に集まれ」「等間隔に」「右端に」のような号令",
            metaphor: "横の並び方指示",
          },
          {
            label: "align-items",
            real: "縦方向の配置指示。「上端を揃えて」「中心で揃えて」のような号令",
            metaphor: "縦の揃え方指示",
          },
          {
            label: "flex-wrap",
            real: "「列が満杯になったら次の列に移れ」という指示。nowrap で1列固定",
            metaphor: "折り返し指示",
          },
        ]}
        definition="Flexboxとは、1次元（横または縦の1方向）の要素配置を効率的に制御するCSSのレイアウトモデル。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずFlexboxの「主軸と交差軸」という核心概念を確認してから、よく使うプロパティの値を見ていきましょう。
        </p>

        {/* TermNote */}
        <TermNote
          terms={[
            {
              word: "Flex Container",
              definition: "display:flex を指定した親要素のこと。この中の子要素が整列対象になる。",
            },
            {
              word: "Flex Item",
              definition: "Flex Container の直接の子要素のこと。flexの整列ルールが適用される。",
            },
            {
              word: "主軸（Main Axis）",
              definition: "flex-direction で決まる方向。row（横）がデフォルト。justify-content がこの軸の配置を制御。",
            },
            {
              word: "交差軸（Cross Axis）",
              definition: "主軸と垂直の方向。主軸が横なら縦。align-items がこの軸の配置を制御。",
            },
          ]}
        />

        {/* ── 概念図A: 主軸と交差軸 ── */}
        <ConceptDiagram
          title="概念図A"
          description="Flexboxの核心：主軸と交差軸の2方向でレイアウトを制御する"
        >
          <div
            className="rounded-xl border-2 border-dashed border-orange-700/40 p-5"
          >
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4 text-center">
              Flex Container（親要素）
            </p>

            {/* 主軸の矢印 */}
            <div className="flex items-center gap-2 mb-2">
              <ArrowLeftRight className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <p className="text-xs text-orange-300 font-semibold">主軸（Main Axis）— justify-content が制御</p>
            </div>

            {/* Flex Itemsの並び */}
            <div className="flex gap-2 mb-4">
              {["Item 1", "Item 2", "Item 3"].map((item) => (
                <div
                  key={item}
                  className="flex-1 rounded border px-2 py-3 text-center"
                  style={{ backgroundColor: "rgba(249,115,22,0.08)", borderColor: "rgba(249,115,22,0.3)" }}
                >
                  <p className="text-xs text-orange-300 font-semibold">{item}</p>
                </div>
              ))}
            </div>

            {/* 交差軸の矢印 */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <p className="text-xs text-gray-400 font-semibold">交差軸（Cross Axis）— align-items が制御</p>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">なぜ2つのプロパティに分かれているのか</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Flexboxには「横の配置」と「縦の配置」という2つの独立した軸があります。横（主軸）の配置を制御するのがjustify-content、縦（交差軸）の配置を制御するのがalign-items。この2軸の概念を覚えれば、プロパティ名の混乱がなくなります。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          2軸の概念が分かりました。次は justify-content の主要な値を実際の見た目で確認します。
        </p>

        {/* ── 概念図B: justify-content の値 ── */}
        <ConceptDiagram
          title="概念図B"
          description="justify-content の値によってアイテムの配置がどう変わるか"
        >
          <div className="space-y-3">
            {[
              { value: "flex-start", desc: "左端から並べる（デフォルト）", icon: AlignLeft, align: "start" },
              { value: "center", desc: "中央に集める", icon: AlignCenter, align: "center" },
              { value: "flex-end", desc: "右端に寄せる", icon: AlignRight, align: "end" },
              { value: "space-between", desc: "両端と両端、中間は均等間隔", icon: ArrowLeftRight, align: "between" },
            ].map(({ value, desc, icon: Icon, align }) => (
              <div
                key={value}
                className="rounded-lg border p-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-3.5 h-3.5 text-orange-400" />
                  <p className="text-xs font-semibold text-orange-300 font-mono">{value}</p>
                  <p className="text-xs text-gray-500 ml-1">— {desc}</p>
                </div>
                <div
                  className="rounded border p-2 flex gap-1.5"
                  style={{
                    borderColor: "#2d3048",
                    backgroundColor: "#1a1d2a",
                    justifyContent:
                      align === "start" ? "flex-start" :
                      align === "center" ? "center" :
                      align === "end" ? "flex-end" :
                      "space-between",
                  }}
                >
                  {["A", "B", "C"].map((label) => (
                    <div
                      key={label}
                      className="rounded px-3 py-1.5 text-xs font-bold"
                      style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#fb923c" }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            space-between は両端を使い切って等分する。デザインで最もよく使われる値。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ──────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、CSSで横並びにしたいんですけど、floatを使えばいいんですか？ ボク、毎回うまくいかなくて……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "floatは船に積む荷物を横に流すイメージで、意図しない場所に流れてしまうことがあります。\n現代はFlexboxを使います。\n親要素に display:flex を1行書くだけで、子要素が横並びになりますよ、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "たった1行で横並びになるんですか！ ボク今まで float と clear を組み合わせて大変な思いを……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そうです。ただ、横方向の配置は justify-content、縦方向は align-items という2つのプロパティで制御します。\nここが混乱しやすいポイントです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ なぜ2つに分かれているんですか？ 1つにまとめてくれればいいのに……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Flexboxには『主軸』と『交差軸』という2方向があるからです、マジさん。\n机を並べる場合のたとえで言うと、justify-contentは『机を左端から並べるか、中央に集めるか』の指示。\nalign-itemsは『机の高さをテーブルトップで揃えるか、椅子の座面で揃えるか』の指示です。\n方向が違うので、別々のプロパティになっています。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "justify と align のどちらが横でどちらが縦か、毎回忘れてしまいそうです……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "覚え方があります。\njustifyという言葉はWord・テキストエディタの『両端揃え』機能と同じ語源で、横書き文章の横方向配置を指します。\nFlexboxのデフォルト主軸は横なので、justify = 横方向と覚えておけば混乱しません。\nalignは縦方向の整列です。この2つだけ押さえれば大丈夫です。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["役割（デフォルト向き）", "よく使う値"]}
          rows={[
            {
              label: "justify-content",
              cells: ["主軸（横）方向の配置", "flex-start / center / flex-end / space-between"],
              highlightCol: 0,
            },
            {
              label: "align-items",
              cells: ["交差軸（縦）方向の配置", "flex-start / center / flex-end / stretch"],
              highlightCol: 0,
            },
            {
              label: "flex-direction",
              cells: ["主軸の向き", "row（横・デフォルト）/ column（縦）"],
              highlightCol: 0,
            },
            {
              label: "flex-wrap",
              cells: ["折り返し制御", "nowrap（折り返さない）/ wrap（折り返す）"],
              highlightCol: 0,
            },
            {
              label: "gap",
              cells: ["子要素の間隔", "8px / 1rem / 16px など"],
              highlightCol: 0,
            },
          ]}
          note="中央揃えの定番コード：display:flex + justify-content:center + align-items:center の3行セット。この組み合わせを丸暗記しておくと便利。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はflex-grow / flex-shrink / flex-basis など、子要素のサイズを細かく制御する発展的な内容です。"
      />

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 よく使う3パターンを丸暗記する">
          <p>
            Flexboxには多くのプロパティがありますが、実務でよく使うパターンは3つに絞れます。この3つをコードとして覚えておけば、多くのUIを作れます。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: AlignCenter,
                title: "完全中央揃え",
                subtitle: "モーダル・ヒーローなど",
                description: "justify-content: center + align-items: center の組み合わせ。高さを設定した親に使う。",
                accentColor: "orange",
              },
              {
                Icon: Minus,
                title: "両端配置",
                subtitle: "ヘッダー・ナビなど",
                description: "justify-content: space-between。左端と右端に要素を置く定番パターン。",
                accentColor: "orange",
              },
              {
                Icon: WrapText,
                title: "折り返しカード",
                subtitle: "カードレイアウトなど",
                description: "flex-wrap: wrap + gap。カードが横に並び切らなくなったら自動で次の行に折り返す。",
                accentColor: "orange",
              },
            ]}
          />
          <CodeBlock
            title="flex-patterns.css"
            language="css"
            code={`.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-between-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}`}
          />
          <KeyPoint>
            flex-direction: column を使うと主軸が縦になる。justify-content が縦方向に、align-items が横方向に変わる点に注意。垂直スタックのレイアウトに使う。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 flex-grow / flex-shrink / flex-basis（応用編）">
          <p>
            flex-grow は「空き領域をどれだけ埋めるか」の比率です。
            flex-grow: 1 を指定した要素は空き領域を均等に分け合って伸びます。
            flex-grow: 2 は flex-grow: 1 の2倍の領域を取ります。
          </p>
          <p>
            flex-shrink は「親が小さくなったときにどれだけ縮むか」の比率です。
            flex-shrink: 0 にすると縮まない（溢れる）。
            flex-basis は「伸縮前の基準サイズ」で、width と似た働きをします。
          </p>
          <CodeBlock
            title="flex-sizing.css"
            language="css"
            code={`.sidebar {
  flex: 0 0 240px;  /* grow: 0, shrink: 0, basis: 240px → 固定幅 */
}

.main-content {
  flex: 1 1 auto;   /* grow: 1, shrink: 1, basis: auto → 残りを埋める */
}

/* 短縮記法: flex: grow shrink basis */
/* flex: 1 は flex: 1 1 0% と同義 */`}
          />
          <WarningPoint>
            flex: 1 と flex: 1 1 auto は意味が微妙に違う。flex: 1 は flex-basis が 0 なので全要素が均等に伸びる。flex: 1 1 auto はコンテンツ幅を基準に伸縮する。多くの場合 flex: 1 が意図通りに動く。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 Flexbox vs Grid の使い分け（応用編）">
          <p>
            FlexboxとGridの使い分けの基準は「次元数」です。Flexboxは{" "}
            <strong className="text-white">1次元（行か列どちらか一方）</strong>のレイアウトに強い。
            GridはCSS Gridの章で詳しく扱いますが、<strong className="text-white">2次元（行と列を同時に）</strong>のレイアウトに使います。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Rows,
                title: "Flexbox を使う場面",
                subtitle: "1次元の配置",
                description: "ナビゲーションバー・ボタングループ・カードの横並び・入力フィールドと送信ボタンの横並びなど。",
                accentColor: "orange",
              },
              {
                Icon: Columns,
                title: "Grid を使う場面",
                subtitle: "2次元の配置",
                description: "ページ全体のレイアウト（ヘッダー・サイドバー・メイン）・ダッシュボード・複数列のフォームなど。",
                accentColor: "slate",
              },
            ]}
          />
          <KeyPoint>
            どちらを使うか迷ったら「行方向だけ制御したいならFlex、行と列を同時に制御したいならGrid」が判断基準。どちらも使えば使うほど自然に判断できるようになる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/html-css/grid",
            title: "Grid",
            description: "Flexboxの次は2次元レイアウトのGridへ",
            icon: "Grid3X3",
          },
          {
            href: "/html-css/responsive",
            title: "レスポンシブデザイン",
            description: "FlexboxとメディアクエリでモバイルOKなレイアウトを作る",
            icon: "Smartphone",
          },
          {
            href: "/html-css/semantic",
            title: "セマンティックHTML",
            description: "レイアウトをする前に構造（タグ）を正しく組む",
            icon: "FileCode2",
          },
        ]}
      />

      <PageDrill questions={flexboxQuestions} />
    </div>
  );
}
