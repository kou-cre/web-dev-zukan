import Link from "next/link";
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Sparkles,
  ArrowLeftRight,
  Move,
  Box,
  AlignJustify,
  Wind,
  Frown,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { Bridge } from "@/components/Bridge";
import {
  ConceptDiagram,
  FlowCard,
  StackLayer,
} from "@/components/ConceptDiagram";
import { MajiDialogue } from "@/components/MajiDialogue";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { Timeline } from "@/components/Timeline";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CorrectionCard } from "@/components/CorrectionCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { TermNote } from "@/components/TermNote";
import { typographyQuestions, typographyAdvancedQuestions } from "@/content/questions/uiux/typography";

export const metadata = {
  title: "文字と余白のルール | UIデザイン | Web開発図解",
  description:
    "サイズの階段と8の倍数 — タイプスケール、マージン/パディング、行間1.5〜1.7まで、文字と空白のルールを図解で解説。",
};

export default function TypographyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ── 戻るリンク ──────────────────────────────────────── */}
      <div className="mb-6">
        <Link
          href="/uiux"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          ← UIデザイン に戻る
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero
        category="UIデザイン"
        title="文字と余白のルール"
        subtitle={"サイズの階段と8の倍数 — 文字と空白でUIは9割決まる"}
        accentColor="violet"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "タイプスケール（サイズの階段）の作り方",
          "8の倍数ルールで余白を揃える方法",
          "マージンとパディングの違い",
          "本文に最適な行間（1.5〜1.7）",
        ]}
        prerequisites={[
          { text: "デザインの4大原則を知っている（/uiux/principles を読んだ）", href: "/uiux/principles" },
          { text: "色と配色のルールを知っている（/uiux/color を読んだ）", href: "/uiux/color" },
        ]}
        outOfScope={[
          "和文フォント・欧文フォントの選び方の詳細",
          "可変フォント・OpenType機能の活用",
          "印刷物の文字組版（DTP）",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"余白は呼吸。詰まった文章が読めないのと同じで、詰まったUIは見えない。サイズの階段と8の倍数を覚えるだけで、文字と空白の設計は9割決まる。"}
        metaphorTitle="余白は呼吸 — 詰めるより引く方が難しい"
        metaphorPoints={[
          {
            label: "サイズを階段で",
            real: "12 / 14 / 16 / 20 / 24 / 32 のような数列で揃える",
            metaphor: "タイプスケール",
          },
          {
            label: "余白を倍数で",
            real: "4 / 8 / 16 / 24 / 32 のような数列で揃える",
            metaphor: "8の倍数",
          },
          {
            label: "行間で呼吸",
            real: "本文は1.5〜1.7倍が読みやすい",
            metaphor: "行間",
          },
        ]}
        definition={"タイポグラフィ = サイズ・行間・余白を「数列」で整える作業"}
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram ──────────── */}
      <Bridge
        from="文字と余白は数列で整えると分かった"
        to="まずサイズの階段を確認してから、余白の8の倍数を見る"
      />

      {/* ── BASIC: CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <TermNote
          terms={[
            {
              word: "タイプスケール",
              definition: "フォントサイズを一定の比率で段階的に設定したルール。例えば12・14・16・20・24・32pxのように「サイズの階段」を決めておくことで、見出しと本文のサイズ差が整然と揃う。",
            },
            {
              word: "行間（line-height）",
              definition: "テキスト1行の高さ。フォントサイズの1.5〜1.7倍（CSSで line-height: 1.6 など）にすると可読性が高くなる。",
            },
            {
              word: "8の倍数ルール",
              definition: "余白（マージン・パディング）を8の倍数（8・16・24・32px）に統一するデザインルール。一貫した余白リズムが生まれて整った印象になる。",
            },
            {
              word: "マージン / パディング",
              definition: "マージンは要素の外側の余白（他の要素との距離）、パディングは要素の内側の余白（枠線と中身の距離）。CSSのmargin・paddingプロパティで設定する。",
            },
          ]}
        />

        {/* 概念図A: サイズの階段（タイプスケール） */}
        <ConceptDiagram
          title="概念図A — サイズの階段（タイプスケール）"
          description={"フォントサイズを「階段」で管理する。中途半端な値（13・17など）は使わない"}
        >
          <StackLayer
            Icon={Sparkles}
            title="32px — ヒーロー / セクション最上位"
            subtitle="ページの主役。ランディングのキャッチコピー"
            iconColor="text-violet-400"
          />
          <StackLayer
            Icon={Heading1}
            title="24px — セクション見出し"
            subtitle="ページ内の大きな区切り"
            iconColor="text-violet-400"
          />
          <StackLayer
            Icon={Heading2}
            title="20px — 見出し（h3 相当）"
            subtitle="サブセクションの見出し"
            iconColor="text-violet-400"
          />
          <StackLayer
            Icon={Pilcrow}
            title="16px — 本文（基準）"
            subtitle="ブラウザのデフォルト。読みやすさの基準"
            iconColor="text-violet-400"
          />
          <StackLayer
            Icon={Heading3}
            title="14px — UI要素"
            subtitle="ボタン・ラベル・補助文"
            iconColor="text-violet-400"
          />
          <StackLayer
            Icon={Type}
            title="12px — 注記"
            subtitle="キャプション・著作権表示"
            iconColor="text-violet-400"
            showArrow={false}
          />
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            実際に使うのは3〜4段階に絞る。すべて使う必要はない。階段から外れた値は雑音になる。
          </p>
        </ConceptDiagram>

        {/* Bridge A → B */}
        <Bridge
          from="文字サイズは階段で管理すると分かった"
          to="次は、余白の数値も同じように数列で揃える"
        />

        {/* 概念図B: 8の倍数ルール */}
        <ConceptDiagram
          title="概念図B — 8の倍数ルール"
          description={"余白の値は4 / 8 / 16 / 24 / 32 から選ぶ。中途半端な数字は使わない"}
        >
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <FlowCard
              Icon={Box}
              title="4px"
              subtitle="超小余白：アイコンと文字の隙間"
              accentColor="violet"
            />
            <FlowCard
              Icon={Box}
              title="8px"
              subtitle="小余白：UI要素の内側"
              highlight
              accentColor="violet"
            />
            <FlowCard
              Icon={Box}
              title="16px"
              subtitle="標準：カード内のコンテンツ間"
              highlight
              accentColor="violet"
            />
            <FlowCard
              Icon={Box}
              title="24px"
              subtitle="大：セクション間"
              accentColor="violet"
            />
            <FlowCard
              Icon={Box}
              title="32px"
              subtitle="超大：ページ全体の余白"
              accentColor="violet"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            8の倍数に絞ると選択肢が少なくなり、画面に統一感が出る。Tailwindのspacingもこの考え方で設計されている。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDividerの前） ──────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "フォントサイズって好きな数字でいいんじゃないですか？ ボク、13でも17でも別に困らないと思っていまして。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "階段から外れた数字は雑音になるんです、マジさん。\n3〜4段階に絞ると、見出しと本文の関係が一瞬で伝わる。\n読み手は無意識に「なぜこのサイズなのか」を処理しようとして疲れてしまうんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあサイズを思いつきで決めると、それが読み手の脳に負担をかけている、ということですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そのとおりです。\n「12 / 14 / 16 / 20 / 24 / 32」のような階段を最初に決めて、その中からしか選ばないと決める。\n選択肢が減ると迷いが消えて、画面に統一感が出るんです、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、余白も気になっていて。詰めて情報を多く見せたほうが親切な気がしているんですが、空けたほうがいいんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "余白は呼吸です、マジさん。\n詰めるより引く方が難しい。\n情報量を増やすほど読まれる、というのは思い込みなんです。\n空けるほど主役が立つし、読み手の目が休まる場所ができる。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なんとなく分かってきました。サイズも余白も「数列」で揃える。13や17のような中途半端な値は雑音になる、ということですね。ボク、Tailwindのspacingがなぜ4の倍数なのか、いま腑に落ちました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。\n本文は line-height: 1.6、見出しは line-height: 1.3 を初期値として覚えておくと、日本語UIの大半は読みやすく仕上がる。\nタイポグラフィは「数列で整える」が本質なんです、マジさん。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["キャプション", "本文", "小見出し", "大見出し"]}
          rows={[
            {
              label: "サイズ",
              cells: ["12〜14px", "16px", "20〜24px", "28〜36px"],
              highlightCol: 1,
            },
            {
              label: "行間（line-height）",
              cells: ["1.4〜1.5", "1.6〜1.75", "1.3〜1.4", "1.2〜1.3"],
              highlightCol: 1,
            },
            {
              label: "上下の余白",
              cells: ["8〜12px", "16〜24px", "24〜32px", "32〜48px"],
              highlightCol: 1,
            },
            {
              label: "使う場面",
              cells: [
                "補足・ラベル・日付",
                "記事・説明・本文",
                "セクション見出し",
                "ページタイトル・ヒーロー",
              ],
              highlightCol: 1,
            },
          ]}
          highlightCol={1}
          note="すべての値が「8の倍数（または4の倍数）」に収まっている。これがリズムの正体。デザインツールで実測してみると、整ったUIは必ずこの規則性がある。"
        />
      </section>

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="マージンとパディングの使い分け、行間の最適値を扱います"
      />

      {/* ── ADVANCED: CONCEPT DIAGRAMS ───────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        {/* 概念図C: 余白の2つの顔（マージン / パディング） */}
        <ConceptDiagram
          title="概念図C — 余白の2つの顔（マージン / パディング）"
          description={"同じ「余白」でも、外側と内側で役割が違う"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FlowCard
              Icon={ArrowLeftRight}
              title="マージン（外側）"
              subtitle={"要素同士の関係を示す。「ここからは別物」と距離で伝える"}
              highlight
              accentColor="violet"
            />
            <FlowCard
              Icon={Move}
              title="パディング（内側）"
              subtitle={"要素の中の呼吸。文字と枠の隙間"}
              highlight
              accentColor="violet"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            マージンは「関係性」、パディングは「呼吸」。役割が違うので、増やすときも別物として考える。
          </p>
        </ConceptDiagram>

        {/* Bridge C → D */}
        <Bridge
          from="マージンとパディングの役割が分かった"
          to="次は、行間（line-height）の最適値を確認する"
        />

        {/* 概念図D: 行間と読みやすさ */}
        <ConceptDiagram
          title="概念図D — 行間と読みやすさ"
          description="行間（line-height）は文字サイズに対する倍率で指定する"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FlowCard
              Icon={Frown}
              title="1.0（密すぎ）"
              subtitle="行と行が触れる。読み始めの位置が分かりにくい"
              accentColor="violet"
            />
            <FlowCard
              Icon={AlignJustify}
              title="1.5〜1.7（最適）"
              subtitle="本文に最適。日本語は欧文より少し広めが快適"
              highlight
              accentColor="violet"
            />
            <FlowCard
              Icon={Wind}
              title="2.5（広すぎ）"
              subtitle="行同士のつながりが切れて、まとまりが消える"
              accentColor="violet"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            見出しは1.2〜1.3、本文は1.5〜1.7、というのが基本。読みやすさは行間で決まる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading={"1. タイプスケール — サイズは階段で管理する"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            タイプスケールは、フォントサイズを数列で固定する考え方。「12 / 14 / 16 / 20 / 24 / 32」の階段を決めておき、この中からしか選ばない。実際に使うのは3〜4段階に絞るのが基本。
          </p>
          <Timeline
            items={[
              {
                year: "32px",
                label: "ヒーロー / 最上位見出し",
                description: "ランディングページのキャッチコピー・ページの主役。1ページに1〜2箇所が上限。",
                accentColor: "violet",
              },
              {
                year: "24px",
                label: "セクション見出し（h2）",
                description: "ページ内の大きな区切り。前後の余白で「ここから話題が変わる」と伝える。",
                accentColor: "violet",
              },
              {
                year: "20px",
                label: "サブ見出し（h3）",
                description: "セクション内の小見出し。本文より大きく、h2より小さい中間のサイズ。",
                accentColor: "violet",
              },
              {
                year: "16px",
                label: "本文（基準）",
                description: "ブラウザのデフォルト。読みやすさの基準値。これを中心に上下に展開する。",
                accentColor: "violet",
              },
              {
                year: "14px",
                label: "UI要素 / ラベル",
                description: "ボタン・タグ・補助テキスト。本文より小さく、情報の補足に使う。",
                accentColor: "violet",
              },
              {
                year: "12px",
                label: "注記 / キャプション",
                description: "著作権表示・画像の説明文・最小限の補足。これより小さくすると読みにくい。",
                accentColor: "violet",
              },
            ]}
          />
          <KeyPoint>
            最初は「16px / 20px / 32px」の3段階だけで作る。物足りなければあとから足す。引き算的に設計するのが基本。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading={"2. 8の倍数ルール — 余白の選択肢を絞る"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            余白の値も「4 / 8 / 16 / 24 / 32」に揃える。Tailwind CSSもMaterial Designもこの考え方で作られている。絞ると選択肢が減り、迷いが消え、画面に統一感が出る。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Box,
                title: "4px",
                subtitle: "超小余白",
                description: "アイコンと文字の隙間・バッジの内側。最小単位。",
                accentColor: "violet",
              },
              {
                Icon: Box,
                title: "8px",
                subtitle: "小余白",
                description: "ボタンの内側・リスト項目間。UI要素の基本単位。",
                accentColor: "violet",
              },
              {
                Icon: Box,
                title: "16px",
                subtitle: "標準余白",
                description: "カード内コンテンツ間・フォームの要素間。もっとも使う値。",
                accentColor: "violet",
              },
              {
                Icon: Box,
                title: "24〜32px",
                subtitle: "大余白",
                description: "セクション間・カード同士の間隔・ページの外余白。",
                accentColor: "violet",
              },
            ]}
          />
          <WarningPoint>
            「ピクセル単位で微調整したい」気持ちは、階段が崩れているサインかもしれない。まず階段に乗せ直す。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading={"3. 行間と書体の使い分け"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            行間（line-height）は「文字サイズに対する倍率」で指定する。日本語は文字の密度が高いので、欧文より少し広めが読みやすい。
          </p>
          <CorrectionCard
            misconception="行間は1.0〜1.2で詰めると、プロっぽくスタイリッシュに見える"
            correction="本文は1.5〜1.7、見出しは1.2〜1.3が適切。詰めすぎると行の読み始めが分からなくなる"
            reason="日本語の文字はラテン文字より縦幅が大きい。行間が狭すぎると行同士がくっついて見え、どこで目を折り返せばいいか分からなくなる。"
          />
          <KeyPoint>
            本文 line-height: 1.6 / 見出し line-height: 1.3 を初期値として覚える。これで日本語UIの大半は読みやすく仕上がる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        groups={[
          {
            label: "前提として読むページ",
            items: [
              {
                href: "/uiux/color",
                title: "色と配色のルール",
                description: "三属性と60-30-10で配色を作る",
                icon: "Palette",
              },
            ],
          },
          {
            label: "次に読むページ",
            items: [
              {
                href: "/uiux/diagnose",
                title: "UIを読み解く・診断する",
                description: "実際のUIに4原則を当てて点検する",
                icon: "Stethoscope",
              },
            ],
          },
        ]}
      />

      {/* ── PageDrill ─────────────────────────────────────────── */}
      <PageDrill
        groups={[
          { label: "基礎編ドリル", questions: typographyQuestions },
          { label: "応用編ドリル", questions: typographyAdvancedQuestions },
        ]}
      />
    </div>
  );
}
