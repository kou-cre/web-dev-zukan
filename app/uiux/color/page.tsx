import Link from "next/link";
import {
  Palette,
  Droplet,
  Sun,
  LayoutDashboard,
  PaintBucket,
  Star,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  ShieldCheck,
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
import { CodeBlock } from "@/components/CodeBlock";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CorrectionCard } from "@/components/CorrectionCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { TermNote } from "@/components/TermNote";
import { colorQuestions, colorAdvancedQuestions } from "@/content/questions/uiux/color";

export const metadata = {
  title: "色と配色のルール | UIデザイン | Web開発図解",
  description:
    "色は感覚じゃなく数字 — 三属性（HSL）と60-30-10の法則、WCAGコントラスト比4.5:1、色が伝える意味まで図解で解説。",
};

export default function ColorPage() {
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
        title="色と配色のルール"
        subtitle={"色は感覚じゃなく数字 — 三属性と60-30-10の法則"}
        accentColor="fuchsia"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "色の三属性（色相・彩度・明度）の役割と違い",
          "60-30-10の法則で配色を組み立てる手順",
          "WCAGコントラスト比4.5:1の意味と確認方法",
          "色が伝える意味（赤=危険・緑=成功など）の慣習",
        ]}
        prerequisites={[
          { text: "デザインの4大原則を知っている（/uiux/principles を読んだ）", href: "/uiux/principles" },
          "Webサイトを「見やすい / 見にくい」と感じた経験がある",
        ]}
        outOfScope={[
          "ブランドカラーの設計プロセス",
          "ダークモード対応の詳細",
          "印刷物のCMYKやPantoneの扱い",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"配色はカクテル。割合（60-30-10）と材料（三属性）を覚えれば感覚に頼らず作れる。バーテンダーがレシピを見て同じ味を再現できるのと同じ。"}
        metaphorTitle="配色はカクテル — 材料と割合で味が決まる"
        metaphorPoints={[
          {
            label: "材料を選ぶ",
            real: "色相・彩度・明度の3属性で色を指定する",
            metaphor: "酒の種類・度数・薄め具合",
          },
          {
            label: "割合を決める",
            real: "ベース60% / メイン30% / アクセント10%",
            metaphor: "カクテルのレシピ比率",
          },
          {
            label: "確認する",
            real: "コントラスト比4.5:1以上を数値で検証",
            metaphor: "テイスティング",
          },
        ]}
        definition={"配色 = 色相・彩度・明度を ベース60% / メイン30% / アクセント10% の比率で配る作業"}
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram ──────────── */}
      <Bridge
        from="配色は割合と材料で決まると分かった"
        to="まず材料（三属性）を確認してから、割合（60-30-10）を見る"
      />

      {/* ── BASIC: CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <TermNote
          terms={[
            {
              word: "HSL",
              definition: "色を「色相(Hue)・彩度(Saturation)・明度(Lightness)」の3つの数値で表す方法。hsl(0, 80%, 50%) のように書く。数値で色を操作できるため、デザインツールやCSSで広く使われる。",
            },
            {
              word: "色相（Hue）",
              definition: "色の種類（赤・緑・青など）を0〜360の角度で表した値。0が赤、120が緑、240が青。",
            },
            {
              word: "彩度（Saturation）",
              definition: "色の鮮やかさを0〜100%で表した値。0%はグレー、100%は最も鮮やか。",
            },
            {
              word: "明度（Lightness）",
              definition: "色の明るさを0〜100%で表した値。0%は黒、100%は白、50%が最も純粋な色。",
            },
            {
              word: "60-30-10の法則",
              definition: "配色の黄金比。背景色60%・メインカラー30%・アクセントカラー10%の比率でUIを構成すると整った印象になる。",
            },
          ]}
        />

        {/* 概念図A: 色の三属性(HSL) */}
        <ConceptDiagram
          title="概念図A — 色の三属性（HSL）"
          description={"あらゆる色は「色相・彩度・明度」の3つの数字で表せる。CSSのhsl()と同じ"}
        >
          <StackLayer
            Icon={Palette}
            title="色相 / Hue"
            subtitle={"赤・青・緑など色の「種類」。0〜360で指定（色相環の角度）"}
            iconColor="text-fuchsia-400"
          />
          <StackLayer
            Icon={Droplet}
            title="彩度 / Saturation"
            subtitle={"鮮やかさ。0% = グレー、100% = 最も鮮やか"}
            iconColor="text-fuchsia-400"
          />
          <StackLayer
            Icon={Sun}
            title="明度 / Lightness"
            subtitle={"明るさ。0% = 黒、50% = 純粋な色、100% = 白"}
            iconColor="text-fuchsia-400"
            showArrow={false}
          />
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            「赤を少し落ち着かせたい」を「彩度を下げる」と言葉にできれば、感覚に頼らず操作できる。
          </p>
        </ConceptDiagram>

        {/* Bridge A → B */}
        <Bridge
          from="色は3つの数字で表せると分かった"
          to="次は、それをどんな比率で画面に配るかを見る"
        />

        {/* 概念図B: 60-30-10の法則 */}
        <ConceptDiagram
          title="概念図B — 60-30-10の法則"
          description={"画面の色を3つの役割に分け、面積比60% / 30% / 10% で配る"}
        >
          <StackLayer
            Icon={LayoutDashboard}
            title="60% — ベースカラー"
            subtitle={"背景・大きな面。落ち着いた色（白・グレー・ダーク）が定番"}
            iconColor="text-fuchsia-400"
          />
          <StackLayer
            Icon={PaintBucket}
            title="30% — メインカラー"
            subtitle={"主要なコンポーネント・カード・ヘッダー。ブランドカラーが入る位置"}
            iconColor="text-fuchsia-400"
          />
          <StackLayer
            Icon={Star}
            title="10% — アクセントカラー"
            subtitle={"CTAボタン・重要な数字・通知バッジ。少ないからこそ目立つ"}
            iconColor="text-fuchsia-400"
            showArrow={false}
          />
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            アクセントを多用するとアクセントが消える。「少ないから目立つ」が原則。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDividerの前） ──────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "配色ってセンスっぽいですけど、ルールなんてあるんですか？ ボク、好きな色を3つ並べちゃダメなのかな……と思っていまして。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "60-30-10の法則を覚えるだけで、9割の画面は破綻しません、マジさん。\n残り1割で個性を出す、くらいの気持ちでいい。\n基本ルールがあるからこそ、安心して崩しにいけるんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあアクセントカラーを画面のあちこちに使ったらダメ、ということですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そのとおりです。\nアクセントを多用するとアクセントが消える。\n「少ないから目立つ」が原則なので、CTAボタンや重要な数字など「ここを見てほしい」場所だけに10%で配る。\nヘッダーも背景もボタンも全部アクセント色だと、結局どこを見ればいいか分からなくなるんです、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、コントラスト比というのが少し気になっていて。あれって本当に数値で決まっているんですか？ 雰囲気で「薄めにしたい」って決めちゃってました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "WCAGという国際基準があるんです、マジさん。\n本文は4.5:1以上、大きな文字は3:1以上が目安。\nChromeのDevToolsで要素を選ぶと「Contrast」の数値が即座に出ます。\n「文字と背景が薄すぎて読めない」というクレームは、数値で事前に防げるんです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なんとなく分かってきました。色は感覚じゃなくて、三属性と60-30-10と4.5:1という数字で扱う、ということですね。ボク、これなら再現できそうです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。\n「もうちょい暗く」「もうちょい派手に」を、彩度・明度の数字で会話できるようになるとデザインレビューが10倍速くなる。\n配色はカクテル、材料と割合と検証で味が決まるんです、マジさん。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["RGB", "HSL"]}
          rows={[
            {
              label: "表現軸",
              cells: [
                "赤・緑・青の混合量（各0〜255）",
                "色相・彩度・明度（H: 0〜360 / S, L: 0〜100%）",
              ],
              highlightCol: 1,
            },
            {
              label: "人間の感覚との対応",
              cells: [
                "対応しにくい（rgb(128,0,128)が何色か直感で分からない）",
                "色相=色の種類、彩度=鮮やかさ、明度=明るさ（直感的）",
              ],
              highlightCol: 1,
            },
            {
              label: "微調整のしやすさ",
              cells: [
                "しにくい（3値すべて変える必要がある）",
                "しやすい（明度だけ動かす・彩度だけ落とす）",
              ],
              highlightCol: 1,
            },
            {
              label: "主な用途",
              cells: [
                "最終出力値・コード記述（HexはRGBのショートハンド）",
                "デザイン決定・色の調整フェーズ",
              ],
              highlightCol: 1,
            },
          ]}
          highlightCol={1}
          note="CSSではどちらの記法も使える。デザインを考えるときはHSLで、エンジニアとの連携時はHex（RGB）に変換するのが実務のパターン。"
        />
      </section>

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="コントラスト比の基準と、色が伝える意味の慣習を扱います"
      />

      {/* ── ADVANCED: CONCEPT DIAGRAMS ───────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        <TermNote
          terms={[
            {
              word: "WCAG",
              definition: "Web Content Accessibility Guidelines の略。Webアクセシビリティの国際基準。コントラスト比4.5:1以上（AA基準）など、色の使い方のルールが定められている。",
            },
            {
              word: "コントラスト比",
              definition: "テキストと背景色の明るさの差を数値化したもの。4.5:1以上でWCAG AA基準を満たし、多くの人が読みやすい状態になる。",
            },
            {
              word: "DevTools",
              definition: "ブラウザに内蔵された開発者向けツール（F12で開く）。要素の色・コントラスト比・レイアウトなどをリアルタイムで確認・検査できる。",
            },
          ]}
        />

        {/* 概念図C: コントラスト比とWCAG */}
        <ConceptDiagram
          title="概念図C — コントラスト比とWCAG"
          description="文字色と背景色の差を数値で確認する。雰囲気ではなく数字で判定する"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FlowCard
              Icon={ShieldCheck}
              title="本文（通常文字）"
              subtitle="4.5:1 以上が必要（WCAG AA）"
              highlight
              accentColor="fuchsia"
            />
            <FlowCard
              Icon={ShieldAlert}
              title="大きな文字"
              subtitle={"3:1 以上が必要（18pt以上 or 14pt太字以上）"}
              highlight
              accentColor="fuchsia"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <FlowCard
              Icon={XCircle}
              title="NG例"
              subtitle="薄いグレー文字 × 白背景 = 2.5:1（読みにくい）"
              accentColor="fuchsia"
            />
            <FlowCard
              Icon={CheckCircle2}
              title="OK例"
              subtitle="濃いグレー文字 × 白背景 = 7.0:1（読みやすい）"
              accentColor="fuchsia"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            ブラウザのDevToolsで「Contrast Ratio」を見ると即時に確認できる。雰囲気ではなく数値で判定する習慣をつける。
          </p>
        </ConceptDiagram>

        {/* Bridge C → D */}
        <Bridge
          from="コントラスト比は数字で判定すると分かった"
          to="次は、色そのものが持つ「意味」の慣習を覚える"
        />

        {/* 概念図D: 色が伝える意味 */}
        <ConceptDiagram
          title="概念図D — 色が伝える意味（慣習）"
          description={"世界共通の慣習。これに反する配色は「誤読」を招く"}
        >
          <div className="grid grid-cols-2 gap-3">
            <FlowCard
              Icon={AlertTriangle}
              title="赤 = エラー / 危険"
              subtitle="削除・失敗・警告通知"
              highlight
              accentColor="fuchsia"
            />
            <FlowCard
              Icon={CheckCircle2}
              title="緑 = 成功"
              subtitle="完了・保存・正常状態"
              accentColor="fuchsia"
            />
            <FlowCard
              Icon={ShieldAlert}
              title="黄 = 警告"
              subtitle="注意喚起・確認が必要"
              accentColor="fuchsia"
            />
            <FlowCard
              Icon={Info}
              title="青 = 情報"
              subtitle="リンク・案内・通知"
              accentColor="fuchsia"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            この4色の慣習に背くと「成功なのに赤」のような誤読が起きる。ブランドカラーが赤でも「成功表示」には別の色を使う。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading={"1. 色の三属性で話す"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            色を「赤・青・緑」のような名前で語ると、どんな赤かが伝わらない。色相・彩度・明度の3つの数字で話せるようになると、チームでの共通言語になる。
          </p>
          <CodeBlock
            title="color.css"
            language="css"
            code={`/* NG: 名前で語ると「どんな赤?」が伝わらない */
color: red;

/* OK: HSLなら3軸で会話できる */
color: hsl(0, 80%, 50%);   /* 赤・鮮やか・標準の明るさ */
color: hsl(0, 40%, 50%);   /* 赤・落ち着いた・標準の明るさ（彩度を下げた） */
color: hsl(0, 80%, 35%);   /* 赤・鮮やか・暗め（明度を下げた） */`}
          />
          <KeyPoint>
            「もうちょい暗く」「もうちょい派手に」を、彩度・明度の数字で会話できるようにする。これだけでデザインレビューが10倍速くなる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading={"2. 60-30-10で比率を固定する"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            画面に色を置くときは、面積比を「60% / 30% / 10%」で固定する。この比率を守ると「どこを見ればいいか」が自然に決まる。アクセントが少ないからこそアクセントとして機能する。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: LayoutDashboard,
                title: "60% — ベース",
                subtitle: "背景・大きな面",
                description: "白・薄いグレー・ダークなど落ち着いた色。画面の大半を占める基盤。",
                accentColor: "fuchsia",
              },
              {
                Icon: PaintBucket,
                title: "30% — メイン",
                subtitle: "カード・ヘッダー",
                description: "ブランドカラーが入る位置。コンポーネントや主要ブロックの色。",
                accentColor: "fuchsia",
              },
              {
                Icon: Star,
                title: "10% — アクセント",
                subtitle: "CTAボタン・強調",
                description: "少ないからこそ目立つ。ここが多すぎるとアクセントが消える。",
                accentColor: "fuchsia",
              },
            ]}
          />
          <WarningPoint>
            アクセントカラーをヘッダー全体・背景・ボタンすべてに使うと、アクセントが消える。「少ないから目立つ」を肝に銘じる。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading={"3. コントラストを数字で確認する"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            WCAGはアクセシビリティの国際基準で、本文のコントラスト比は4.5:1以上が必要。これを満たさないと、視力が弱い人や屋外で画面を見る人が文字を読めない。ChromeのDevToolsで即確認できる。
          </p>
          <CorrectionCard
            misconception="「なんとなく薄め」「おしゃれっぽく薄くしたい」という感覚でテキスト色を決める"
            correction="DevToolsの「Contrast Ratio」で4.5:1以上を確認してから色を確定する"
            reason="視覚的に「いい感じ」でも、コントラスト比が2〜3:1程度の配色は多い。数値で判定するクセをつければ指摘ゼロになる。"
          />
          <KeyPoint>
            コントラスト比4.5:1は「文字と背景の明るさの差」の指標。雰囲気で「薄めにしたい」と判断する前に、必ず数値を見る。
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
                href: "/uiux/principles",
                title: "デザインの4大原則",
                description: "近接・整列・反復・対比でUIを整える",
                icon: "MousePointerClick",
              },
            ],
          },
          {
            label: "次に読むページ",
            items: [
              {
                href: "/uiux/typography",
                title: "文字と余白のルール",
                description: "サイズの階段と8の倍数で整えるタイポグラフィ",
                icon: "Type",
              },
            ],
          },
        ]}
      />

      {/* ── PageDrill ─────────────────────────────────────────── */}
      <PageDrill
        groups={[
          { label: "基礎編ドリル", questions: colorQuestions },
          { label: "応用編ドリル", questions: colorAdvancedQuestions },
        ]}
      />
    </div>
  );
}
