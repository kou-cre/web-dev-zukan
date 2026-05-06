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
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { colorQuestions } from "@/content/questions/uiux/color";

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
          "デザインの4大原則を知っている（/uiux/principles を読んだ）",
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
            metaphor: "三属性",
          },
          {
            label: "割合を決める",
            real: "ベース60% / メイン30% / アクセント10%",
            metaphor: "60-30-10",
          },
          {
            label: "確認する",
            real: "コントラスト比4.5:1以上を数値で検証",
            metaphor: "計測",
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
            text: "配色ってセンスっぽいけど、ルールなんてあるの？ 好きな色を3つ並べちゃダメなんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "60-30-10の法則を覚えるだけで、9割の画面は破綻しません。残り1割で個性を出す、くらいの気持ちでいい。基本ルールがあるから崩しにいける。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "コントラスト比って数値で決まってるの？ マジ？ 雰囲気で決めてました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "WCAGの4.5:1を覚えるだけで、アクセシビリティの土台が踏めます。文字と背景が薄すぎて読めない、というクレームは数値で防げる。",
          },
        ]}
      />

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
          <p>
            色を「赤・青・緑」のような名前で語ると、どんな赤かが伝わらない。色相・彩度・明度の3つの数字で話せるようになると、チームでの共通言語になる。
          </p>
          <p>
            CSSなら hsl(0, 80%, 50%) のように書ける。これは「赤・鮮やか・標準的な明るさ」という意味。「もう少し落ち着かせたい」は「彩度を60%に下げる」と具体的な操作にできる。
          </p>
          <KeyPoint>
            「もうちょい暗く」「もうちょい派手に」を、彩度・明度の数字で会話できるようにする。これだけでデザインレビューが10倍速くなる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading={"2. 60-30-10で比率を固定する"}>
          <p>
            画面に色を置くときは、面積比を「60% / 30% / 10%」で固定する。たとえば白背景60%、グレーのカード30%、ブランドカラーのCTA 10%、という具合。
          </p>
          <p>
            この比率を守ると、画面の中で「どこを見ればいいか」が自然に決まる。アクセントが少ないからこそアクセントとして機能する。
          </p>
          <WarningPoint>
            アクセントカラーをヘッダー全体・背景・ボタンすべてに使うと、アクセントが消える。「少ないから目立つ」を肝に銘じる。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading={"3. コントラストを数字で確認する"}>
          <p>
            WCAGはアクセシビリティの国際基準で、本文のコントラスト比は4.5:1以上が必要とされている。これを満たさないと、視力が弱い人や明るい屋外で画面を見る人が文字を読めない。
          </p>
          <p>
            ChromeのDevToolsで要素を選ぶと「Contrast」の数値が即座に出る。デザイン段階で確認するクセをつければ、本番投入後の指摘で慌てずに済む。
          </p>
          <KeyPoint>
            コントラスト比4.5:1は「文字と背景の明るさの差」の指標。雰囲気で「薄めにしたい」と判断する前に、必ず数値を見る。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/uiux/principles",
            title: "デザインの4大原則",
            description: "近接・整列・反復・対比でUIを整える",
            icon: "Code2",
          },
          {
            href: "/uiux/typography",
            title: "文字と余白のルール",
            description: "サイズの階段と8の倍数で整えるタイポグラフィ",
            icon: "Rocket",
          },
        ]}
      />

      {/* ── PageDrill ─────────────────────────────────────────── */}
      <PageDrill questions={colorQuestions} />
    </div>
  );
}
