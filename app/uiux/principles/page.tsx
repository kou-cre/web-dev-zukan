import Link from "next/link";
import {
  Group,
  AlignVerticalJustifyCenter,
  Repeat,
  Contrast,
  XCircle,
  CheckCircle2,
  MousePointerClick,
  ListChecks,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { Bridge } from "@/components/Bridge";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
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
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { TermNote } from "@/components/TermNote";
import { principlesQuestions, principlesAdvancedQuestions } from "@/content/questions/uiux/principles";

export const metadata = {
  title: "デザインの4大原則 | UIデザイン | Web開発図解",
  description:
    "近接・整列・反復・対比の4原則を比喩・対話・図解で解説。Before/After、原則の重なり、点検順までカバー。",
};

export default function PrinciplesPage() {
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
        title="デザインの4大原則"
        subtitle={"揃える・近づける・繰り返す・対比する — これだけでUIは整う"}
        accentColor="rose"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "デザインの4大原則（近接・整列・反復・対比）の役割",
          "原則を使う前と使った後で何が変わるか",
          "UIを点検するときの原則チェック順",
        ]}
        prerequisites={[
          { text: "「UIを見る目」の3層モデルを知っている（/uiux/seeing を読んだ）", href: "/uiux/seeing" },
          "良いUI / 悪いUIを直感的に区別したことがある",
        ]}
        outOfScope={[
          "色相・彩度・明度などの配色ルール（/uiux/color で扱う）",
          "フォントサイズや余白の数値設計（/uiux/typography で扱う）",
          "ブランドガイドラインやデザインシステムの構築",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"4大原則は料理の「切る・煮る・焼く・味付け」と同じ。これさえ押さえれば食卓は整う。崩したくなるのはこれを守ったあと。"}
        metaphorTitle="4原則は料理の基本動作 — まず守り、それから崩す"
        metaphorPoints={[
          {
            label: "まず守る",
            real: "近接・整列・反復・対比で骨格を整える",
            metaphor: "基本",
          },
          {
            label: "全体を見る",
            real: "4原則のどれかが効いているかを点検する",
            metaphor: "確認",
          },
          {
            label: "崩す",
            real: "意図して原則を破ることで個性を出す",
            metaphor: "応用",
          },
        ]}
        definition={"整っているUI = 4原則のどれかが効いているUI"}
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram ──────────── */}
      <Bridge
        from="4原則は基本動作だと分かった"
        to="まず4原則を一枚絵で俯瞰してから、Before/Afterで効果を見る"
      />

      {/* ── BASIC: CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <TermNote
          terms={[
            {
              word: "近接（Proximity）",
              definition: "関係のある要素を近くに、ない要素は離して配置する原則。距離で「このグループはひとまとまり」と伝える。",
            },
            {
              word: "整列（Alignment）",
              definition: "要素の端や中央を見えない縦横のラインに揃える原則。揃ったラインが少ないほど画面がスッキリして見える。",
            },
            {
              word: "反復（Repetition）",
              definition: "同じ役割の要素には同じ見た目を繰り返し使う原則。ボタンや見出しのスタイルを統一することで一貫性が生まれる。",
            },
            {
              word: "対比（Contrast）",
              definition: "主役と脇役の差（サイズ・色・太さ）を思い切ってつける原則。差が大きいほど情報の優先度が明確に伝わる。",
            },
          ]}
        />

        {/* 概念図A: 4原則の俯瞰マップ */}
        <ConceptDiagram
          title="概念図A — 4原則の俯瞰マップ"
          description="4つを一枚で覚える。それぞれが「何のための原則か」を一言で押さえる"
        >
          <div className="grid grid-cols-2 gap-3">
            <FlowCard
              Icon={Group}
              title="近接 / Proximity"
              subtitle="関係あるものは近く、無いものは離す"
              highlight
              accentColor="rose"
            />
            <FlowCard
              Icon={AlignVerticalJustifyCenter}
              title="整列 / Alignment"
              subtitle="見えない縦横のラインに揃える"
              highlight
              accentColor="rose"
            />
            <FlowCard
              Icon={Repeat}
              title="反復 / Repetition"
              subtitle="同じ要素は同じ見た目で繰り返す"
              highlight
              accentColor="rose"
            />
            <FlowCard
              Icon={Contrast}
              title="対比 / Contrast"
              subtitle="強弱は思い切ってつける"
              highlight
              accentColor="rose"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            4つを覚えるだけでUIの観察力が一段上がる。「この画面は対比が効いてる」と言えるようになる。
          </p>
        </ConceptDiagram>

        {/* Bridge A → B */}
        <Bridge
          from="4原則の役割が見えた"
          to="次は、4原則を適用する前と後でどれだけ変わるかを見る"
        />

        {/* 概念図B: Before / After */}
        <ConceptDiagram
          title="概念図B — Before / After（4原則の適用効果）"
          description={"同じ情報量でも、4原則を適用するだけで「読みやすさ」が劇的に変わる"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FlowCard
              Icon={XCircle}
              title="Before"
              subtitle={"バラバラ・揃ってない・強弱なし。読み手の脳に余計な仕事をさせる"}
              accentColor="rose"
            />
            <FlowCard
              Icon={CheckCircle2}
              title="After"
              subtitle={"揃って・まとまって・主役がはっきり。情報構造が一瞬で伝わる"}
              highlight
              accentColor="rose"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            足したのは色でもフォントでもない。4原則を当てただけ。これが「整える」という作業の正体。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDividerの前） ──────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "原則とか言われても、結局センスなのではないですか？ ボク、4つ守って整ったとしても、それって普通のUIにしかならないと思っていまして。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "4原則は文法と同じです、マジさん。\n守るだけで意味が通る。\n崩すのは守ったあとでいい。\n文法を知らずに崩しても、それはただの誤字脱字になってしまうんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ整列してないだけで、ボクが「なんか雑」と感じていたUIは、本当に整列の問題だったということですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そうです。\n揃ってないUIは「読み手の脳に余計な仕事をさせる」んです。\nそれだけで疲れる。\n整列は「読み手への思いやり」だと思ってください、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、4つの順番が気になっていて。点検するときって、整列・近接・対比・反復のどれから見ればいいんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "整列から見るのが正解です、マジさん。\nまず骨格である整列を整えてから、近接でグループを作る。\n次に対比で主役と脇役の差をつけて、最後に反復で同じ役割を同じ見た目に揃える。\nこの順だと「整列が崩れたまま対比だけ盛る」という事故が起きません。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なんとなく分かってきました。4原則は単独ではなく、重なって効く。だから順番を守って点検する、ということですね。ボク、今度から整列から見てみます。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。\nCTAボタンひとつをとっても、対比・整列・近接の3つが同時に効いている。\n「なぜ目立つか」を分解できれば、自分のUIでも再現できます。\n4原則は単語帳のようなもので、覚えるほど解像度が上がるんです、マジさん。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["近接", "整列", "反復", "対比"]}
          rows={[
            {
              label: "目的",
              cells: [
                "関連するものをグループ化する",
                "要素を見えない線で揃える",
                "同じ役割は同じ見た目に統一する",
                "重要なものを目立たせる",
              ],
            },
            {
              label: "読み手への効果",
              cells: [
                "「これは一緒に考えていいんだ」と伝わる",
                "視線が自然に流れる",
                "迷いなく読み進められる",
                "視線の優先順位が決まる",
              ],
            },
            {
              label: "よくある失敗",
              cells: [
                "関係ないものが近くに配置されている",
                "中央揃えの乱用",
                "ページごとに異なるボタンスタイル",
                "全部同じ大きさ・色で単調",
              ],
            },
          ]}
          note="4原則は独立して働くわけではない。ほとんどのUIは複数の原則を同時に適用している。"
        />
      </section>

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="原則の重なり・点検順など、実戦で効く視点を紹介します"
      />

      {/* ── ADVANCED: CONCEPT DIAGRAMS ───────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        {/* 概念図C: 原則は重なって効く */}
        <ConceptDiagram
          title="概念図C — 原則は重なって効く"
          description={"良いUIは「ひとつの原則」で出来ているのではなく、複数の原則が同時に効いている"}
        >
          <div className="flex flex-col items-center gap-0">
            <FlowCard
              Icon={MousePointerClick}
              title="例: CTAボタン"
              subtitle="「申し込む」など主役のボタン"
              highlight
              accentColor="rose"
            />
            <FlowArrow label="そこに効いている原則は3つ" direction="down" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              <FlowCard
                Icon={Contrast}
                title="対比"
                subtitle="周りより明らかに目立つ色"
                accentColor="rose"
              />
              <FlowCard
                Icon={AlignVerticalJustifyCenter}
                title="整列"
                subtitle="見出し・本文の中央軸に揃う"
                accentColor="rose"
              />
              <FlowCard
                Icon={Group}
                title="近接"
                subtitle="関連する文言の近くに置かれる"
                accentColor="rose"
              />
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            ひとつのUI部品に複数の原則が重なる。「なぜ目立つか」を分解できれば再現できる。
          </p>
        </ConceptDiagram>

        {/* Bridge C → D */}
        <Bridge
          from="原則は重なって効くと分かった"
          to="次は、UIを点検するときに4原則をどの順で見るかを覚える"
        />

        {/* 概念図D: 原則の優先順位（点検順） */}
        <ConceptDiagram
          title="概念図D — 原則の点検順"
          description="自分のUIを見直すときの順番。上から順に確認すると効率が良い"
        >
          <div className="flex flex-col items-center gap-0">
            <FlowCard
              Icon={AlignVerticalJustifyCenter}
              title="1. 整列"
              subtitle="まず骨格。見えない縦横のラインに揃っているか"
              highlight
              accentColor="rose"
            />
            <FlowArrow label="次に" direction="down" />
            <FlowCard
              Icon={Group}
              title="2. 近接"
              subtitle="関係あるものが近く、ないものが離れているか"
              highlight
              accentColor="rose"
            />
            <FlowArrow label="次に" direction="down" />
            <FlowCard
              Icon={Contrast}
              title="3. 対比"
              subtitle="主役と脇役の差が思い切ってついているか"
              highlight
              accentColor="rose"
            />
            <FlowArrow label="最後に" direction="down" />
            <FlowCard
              Icon={Repeat}
              title="4. 反復"
              subtitle="同じ役割の要素が同じ見た目になっているか"
              highlight
              accentColor="rose"
            />
          </div>
          <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
            この順で点検すると「整列が崩れたまま対比だけ盛る」という事故が起きない。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading={"1. 近接 — まとめるだけで変わる"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            近接は、関係のある要素同士を物理的に近くに置き、関係のない要素は離して配置する原則。距離だけで「これはひとつのまとまり」と読み手に伝える。
          </p>
          <CorrectionCard
            misconception="ラベルと入力欄の間隔も、フォームの各項目間の間隔も、すべて均等に揃えればきれいに見える"
            correction="ラベルと入力欄の間隔は項目間の間隔より明らかに狭く取る。距離の差で関係性を伝える"
            reason="間隔が均等だと「どこからどこまでがひとつの項目か」が分からず、脳の負荷が上がる。近接が機能するのは「差」があるとき。"
          />
          <KeyPoint>
            ラベルと入力欄の間隔は、項目間の間隔より明らかに狭く取る。距離の差で関係性を伝えるのが近接の本質。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading={"2. 整列 — 見えないラインを探せ"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            整列は、要素の左端・右端・中央のいずれかが同じ縦軸に揃っている状態のこと。揃えるラインが画面の中で減るほど整って見える。
          </p>
          <CorrectionCard
            misconception="中央揃えはバランスが良く見えるので、テキストや要素を中央揃えで配置する"
            correction="基本は左揃えで統一する。揃えるラインを1本に絞ると、視線が自然に流れる"
            reason="中央揃え・左揃え・右揃えが混ざると、読み手の目は揃ったラインを無意識に探して迷子になる。中央揃えはヒーロー等のごく限られた場所に留める。"
          />
          <WarningPoint>
            「なんとなく真ん中に配置」を繰り返すとラインが増えてバラバラに見える。左揃えにしてラインを1本にするだけで整う。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading={"3. 対比 — 差をつけるなら大胆に"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            対比はサイズ・色・太さ・形などで主役と脇役の差をつける原則。差が大きいほど階層がはっきり伝わる。よくある場面を覚えておくと使いやすい。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Contrast,
                title: "見出し vs 本文",
                subtitle: "サイズで対比",
                description: "見出しは本文の2倍以上のサイズにする。「少しだけ大きい」はノイズになる。",
                accentColor: "rose",
              },
              {
                Icon: MousePointerClick,
                title: "CTAボタン vs 他のボタン",
                subtitle: "色で対比",
                description: "主役のボタンだけ目立つ色にする。他を地味にするほどCTAが目立つ。",
                accentColor: "rose",
              },
              {
                Icon: AlignVerticalJustifyCenter,
                title: "重要テキスト vs 補助テキスト",
                subtitle: "太さ・明度で対比",
                description: "重要な情報は太字・明るい色、補助情報はグレー。差を思い切ってつける。",
                accentColor: "rose",
              },
              {
                Icon: Group,
                title: "アクティブ状態 vs 非アクティブ",
                subtitle: "背景色で対比",
                description: "選択中のタブ・メニューは背景色で明確に区別する。中途半端な差はノイズ。",
                accentColor: "rose",
              },
            ]}
          />
          <KeyPoint>
            主役の見出しは本文の2倍以上のサイズにする・色を完全に変える・太字を使う、など「迷ったら大胆に」が対比の基本姿勢。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading={"4. 反復 — 同じ役割は同じ見た目に"}>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            反復は、同じ役割を持つ要素に同じスタイルを繰り返し使う原則。例外を作るたびに読み手の脳に「これは別の意味があるのか？」という疑問が生まれ、負荷が上がる。
          </p>
          <Timeline
            items={[
              {
                year: "最初",
                label: "ボタンのスタイルを統一する",
                description: "Primary / Secondary / Ghost の見た目を決め、全ページで同じにする。ページごとに違うボタンを作らない。",
                accentColor: "rose",
              },
              {
                year: "次に",
                label: "見出しのルールを決める",
                description: "h2は常に24px・太字、h3は常に20px・中太など、フォントの使い方を固定する。",
                accentColor: "rose",
              },
              {
                year: "さらに",
                label: "カード・フォームを統一する",
                description: "カードの角丸・シャドウ・内側余白を全箇所で同一に。フォームの入力欄の高さも揃える。",
                accentColor: "rose",
              },
              {
                year: "結果",
                label: "デザインシステムが生まれる",
                description: "反復を徹底すると「コンポーネント」として切り出せる。変更が1箇所で全画面に反映される仕組みになる。",
                accentColor: "rose",
              },
            ]}
          />
          <KeyPoint>
            反復はデザインシステムの土台になる原則。繰り返し使う要素をコンポーネントとして切り出す習慣が、自然と反復を担保する仕組みになる。
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
                href: "/uiux/seeing",
                title: "UIを見る目を養う",
                description: "「なんかいい」を3層で言語化する",
                icon: "Eye",
              },
            ],
          },
          {
            label: "次に読むページ",
            items: [
              {
                href: "/uiux/color",
                title: "色と配色のルール",
                description: "三属性と60-30-10で配色を作る",
                icon: "Palette",
              },
            ],
          },
        ]}
      />

      {/* ── PageDrill ─────────────────────────────────────────── */}
      <PageDrill
        groups={[
          { label: "基礎編ドリル", questions: principlesQuestions },
          { label: "応用編ドリル", questions: principlesAdvancedQuestions },
        ]}
      />
    </div>
  );
}
