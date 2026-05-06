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
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { typographyQuestions } from "@/content/questions/uiux/typography";

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
          "デザインの4大原則を知っている（/uiux/principles を読んだ）",
          "色と配色のルールを知っている（/uiux/color を読んだ）",
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
            text: "フォントサイズって好きな数字でいいんじゃないの？ 13でも17でも、別に困らないでしょ。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "階段から外れた数字は雑音になります。3〜4段階に絞ると、見出しと本文の関係が一瞬で伝わる。読み手は無意識に「なぜこのサイズなのか」を処理しようとして疲れるんです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "余白を増やすだけで、こんなに見やすくなるの？ もったいない気がしてました。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "余白は呼吸です。詰めるより引く方が難しい。情報量を増やすほど読まれる、というのは思い込み。空けるほど主役が立ちます。",
          },
        ]}
      />

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
          <p>
            タイプスケールは、フォントサイズの種類を数列で固定する考え方。「12 / 14 / 16 / 20 / 24 / 32」のような階段を作っておき、デザイン中はこの中からしか選ばない。
          </p>
          <p>
            実際に使うのは3〜4段階に絞る。本文・見出し・注記の3階層が見えれば、情報の優先順位が読み手に伝わる。階段を増やすほど階層が曖昧になり、逆に分かりにくくなる。
          </p>
          <KeyPoint>
            最初は「16px / 20px / 32px」のような3段階だけで作ってみる。物足りなければあとから足す。引き算的に設計するのが基本。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading={"2. 8の倍数ルール — 余白の選択肢を絞る"}>
          <p>
            余白の値も「4 / 8 / 16 / 24 / 32」のような8の倍数に揃える。Tailwind CSSもMaterial Designもこの考え方で作られている。
          </p>
          <p>
            絞ると選択肢が減り、迷いが消える。13や17のような中途半端な値は「他とちょっと違う」というノイズを画面に持ち込む。読み手は無意識にそれを処理しようとして疲れる。
          </p>
          <WarningPoint>
            「ピクセル単位で微調整したい」気持ちは分かるが、それは階段が崩れているサインかもしれない。まず階段に乗せ直す。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading={"3. 行間と書体の使い分け"}>
          <p>
            行間（line-height）は「文字サイズに対する倍率」で指定する。本文は1.5〜1.7、見出しは1.2〜1.3が定番。日本語は文字の密度が高いので、欧文より少し広めの行間が読みやすい。
          </p>
          <p>
            書体は「本文用」と「見出し用」で分けることもあるが、初心者のうちは1書体で統一する方が事故が少ない。Noto Sans JP・游ゴシック・ヒラギノなどは本文・見出しの両方で使える。
          </p>
          <KeyPoint>
            本文 line-height: 1.6 / 見出し line-height: 1.3、を初期値として覚える。これで日本語UIの大半は読みやすく仕上がる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/uiux/color",
            title: "色と配色のルール",
            description: "三属性と60-30-10で配色を作る",
            icon: "Code2",
          },
          {
            href: "/uiux/diagnose",
            title: "UIを読み解く・診断する",
            description: "実際のUIに4原則を当てて点検する",
            icon: "Rocket",
          },
        ]}
      />

      {/* ── PageDrill ─────────────────────────────────────────── */}
      <PageDrill questions={typographyQuestions} />
    </div>
  );
}
