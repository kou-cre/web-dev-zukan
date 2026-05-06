import Link from "next/link";
import {
  Eye,
  CheckCircle2,
  Palette,
  Wrench,
  Ruler,
  Sparkles,
  Type,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { Bridge } from "@/components/Bridge";
import { TermNote } from "@/components/TermNote";
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
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { diagnoseQuestions, diagnoseAdvancedQuestions } from "@/content/questions/uiux/diagnose";

export default function UiuxDiagnosePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ── 戻るリンク */}
      <div className="mb-6">
        <Link
          href="/uiux"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          ← UIデザイン に戻る
        </Link>
      </div>

      {/* ── Hero */}
      <Hero
        category="UIデザイン"
        title="UIを読み解く・診断する"
        subtitle={"「なぜ良いか」「何が悪いか」を言葉にする力"}
        accentColor="violet"
      />

      {/* ── Prerequisites */}
      <Prerequisites
        learn={[
          "UIを4原則・色・余白の観点で診断する手順",
          "AIが作りがちな「スロップUI」の典型症状の見抜き方",
          "修正のコスパを考えて、どこから手を入れるか決める力",
        ]}
        prerequisites={[
          { text: "デザインの4大原則（近接・整列・反復・対比）を知っている", href: "/uiux/principles" },
          { text: "色と余白の基本ルールを理解している", href: "/uiux/color" },
        ]}
        outOfScope={[
          "Before/Afterで実際に画面を直すリファクタリング演習",
          "複数候補からコスパで優先順位を決める実践",
        ]}
      />

      {/* ── OnePageSummary */}
      <OnePageSummary
        keyMessage={
          "「なんか変」で止めず、4原則の言葉に翻訳して、効く順に直す。"
        }
        metaphorTitle="比喩 — UI診断は健康診断"
        metaphorPoints={[
          {
            label: "症状を感じる",
            real: "「なんとなく不調」では病院は動けない",
            metaphor: "なんかダサい",
          },
          {
            label: "数値で測る",
            real: "血圧・体温・脈拍の数字に分解する",
            metaphor: "整列・余白・対比",
          },
          {
            label: "処方する",
            real: "数値に異常があれば原因を特定して処方する",
            metaphor: "原則違反を直す",
          },
        ]}
        definition={
          "診断 = 4原則・色・余白の観点で「どこが効いていて、どこが壊れているか」を切り分ける作業"
        }
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram */}
      <Bridge
        from="UI診断は健康診断と同じで、感覚を数字に分解する作業"
        to="まず診断の手順を4ステップで見ていく"
      />

      {/* ── BASIC: CONCEPT DIAGRAMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <TermNote
          terms={[
            {
              word: "UIの診断",
              definition: "デザインの良し悪しを「なぜ良いか／なぜ悪いか」を言語化して評価するプロセス。4原則・色・余白の観点から問題を特定し、修正優先度をつける。",
            },
            {
              word: "コスパマップ",
              definition: "改善施策を「効果の大きさ」と「修正の手軽さ」の2軸で分類した図。効果大かつ修正簡単な項目（左上）から手をつけるのが基本戦略。",
            },
            {
              word: "AIスロップ（AI Slop）",
              definition: "AIが量産する「見た目は整っているが意図のないUI」のこと。配色・レイアウトはそれなりに見えるが、情報の優先度・余白リズム・操作の文脈が欠けているデザイン。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図A — 4ステップ診断フロー"
          description="上から順に観点を切り替えて、ひとつずつ確認していく。"
        >
          <div className="flex flex-col items-center gap-1">
            <FlowCard
              Icon={Eye}
              title="1. 目を細める"
              subtitle="装飾を消して骨格を見る"
              highlight
              accentColor="violet"
            />
            <FlowArrow label="骨格が整っているか？" direction="down" />
            <FlowCard
              Icon={CheckCircle2}
              title="2. 4原則チェック"
              subtitle="揃い・近接・反復・対比"
              highlight
              accentColor="violet"
            />
            <FlowArrow label="原則の言葉に翻訳" direction="down" />
            <FlowCard
              Icon={Palette}
              title="3. 色と余白チェック"
              subtitle="コントラスト・8の倍数"
              highlight
              accentColor="violet"
            />
            <FlowArrow label="数値で確認" direction="down" />
            <FlowCard
              Icon={Wrench}
              title="4. 優先順位をつけて直す"
              subtitle="コスパの高い順"
              highlight
              accentColor="violet"
            />
          </div>
        </ConceptDiagram>

        <Bridge
          from="診断の手順は4ステップ"
          to="次はAIが作るUIに頻出する「スロップ症状」を見ていく"
        />

        <ConceptDiagram
          title="概念図B — AIスロップの典型症状"
          description="AIが作るUIに繰り返し現れる4つのサイン。診断の出発点になる。"
        >
          <div className="grid grid-cols-2 gap-3">
            <FlowCard
              Icon={Ruler}
              title="余白が一定すぎる"
              subtitle="階層が消えて全部同じ重みに見える"
              accentColor="violet"
            />
            <FlowCard
              Icon={Sparkles}
              title="色が鮮やかすぎる"
              subtitle="全部主張して優先度が消える"
              accentColor="violet"
            />
            <FlowCard
              Icon={Type}
              title="フォント・サイズがバラバラ"
              subtitle="リズムが崩れて雑に見える"
              accentColor="violet"
            />
            <FlowCard
              Icon={HelpCircle}
              title="何が大事か分からない"
              subtitle="なんとなく綺麗だが意図が読めない"
              accentColor="violet"
            />
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDividerの前・必須） */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "これダメなUIらしいんですけど、ボク、どこがダメなのか分からないんです。なんとなく雑な感じはするんですけど……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "まず目を細めてみてください、マジさん。\n装飾やテキストの細部がボケて、整列・余白・コントラストの「骨格」だけが残ります。\nそうすると「どこが崩れているか」が見えてくるんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nやってみます……あ、左端がバラバラなのが分かります。整列が崩れていると、こんなに気持ち悪く見えるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そうなんです。\n色やフォントから入ると、整列が崩れていることに気づきにくい。\n「全体の骨格 → 部分のディテール」の順で見ると、修正すべき箇所が浮かび上がるんです、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、問題が10個も見つかってしまって。全部直そうとすると大変なのですが、どこから手を入れるのが正解ですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "直すのにも順番があるんです、マジさん。\n整列 → 余白 → 色 → 文字 の順で、コスパが高い順に手を入れる。\n左上の「低コスト・高効果」から始めるのが鉄則。\n「いっそ作り直そう」は最後の手段です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なんとなく分かってきました。診断は健康診断と同じで、症状を数値に分解して、効く順に処方する、ということですね。ボク、これなら冷静に直せそうです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。\nAIが作るUIには「余白が一定すぎる」「色が全部主張する」というスロップが頻出します。\n物差しを持っていれば、そのスロップに気づけるようになる。\n診断の言葉を持つことが、AI時代のデザインリテラシーなんです、マジさん。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["改善が必要なUI", "良いUI"]}
          rows={[
            {
              label: "情報の優先順位",
              cells: [
                "全部同じ大きさ・色で何が重要か不明",
                "重要な情報が大きく・コントラストが高い",
              ],
              highlightCol: 1,
            },
            {
              label: "ボタン",
              cells: [
                "背景と同化して押せることに気づかない",
                "Primaryが明確で目に飛び込んでくる",
              ],
              highlightCol: 1,
            },
            {
              label: "余白",
              cells: [
                "関係ない要素が近くに置かれて散漫",
                "近接の原則に従い関連情報がまとまっている",
              ],
              highlightCol: 1,
            },
            {
              label: "フォント",
              cells: [
                "全部同じサイズで単調・読み疲れる",
                "サイズの階段があり視線が自然に流れる",
              ],
              highlightCol: 1,
            },
          ]}
          highlightCol={1}
          note="「なんか変」を感じたら、上の4項目を順番に点検する。多くの場合、どれか1つが崩れている。"
        />
      </section>

      {/* ── SectionDivider */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="Before/Afterで実例を診断し、コスパの軸で優先順位を決める実践に進む"
      />

      {/* ── ADVANCED: CONCEPT DIAGRAMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図C — Before/After 改善ルート"
          description="同じ画面でも、修正の順序を間違えると効果が出ない。整列 → 余白 → 色 → 文字 の順で直す。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-lg border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#3b3f5c" }}
            >
              <p className="text-xs font-semibold text-red-400 mb-3">
                修正前（Before）
              </p>
              <div className="space-y-2">
                <FlowCard
                  Icon={HelpCircle}
                  title="整列が崩れている"
                  subtitle="左端がバラバラ"
                  accentColor="red"
                />
                <FlowCard
                  Icon={Ruler}
                  title="余白が一定"
                  subtitle="階層がない"
                  accentColor="red"
                />
                <FlowCard
                  Icon={Palette}
                  title="色が全部主張"
                  subtitle="優先度が読めない"
                  accentColor="red"
                />
              </div>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(139,92,246,0.06)",
                borderColor: "rgba(139,92,246,0.4)",
              }}
            >
              <p className="text-xs font-semibold text-violet-400 mb-3">
                修正後（After）
              </p>
              <div className="space-y-2">
                <FlowCard
                  Icon={CheckCircle2}
                  title="① 整列を直す"
                  subtitle="左端を揃える"
                  highlight
                  accentColor="violet"
                />
                <FlowCard
                  Icon={CheckCircle2}
                  title="② 余白を変える"
                  subtitle="グループ間を広げる"
                  highlight
                  accentColor="violet"
                />
                <FlowCard
                  Icon={CheckCircle2}
                  title="③ 色を絞る"
                  subtitle="主役を1色に"
                  highlight
                  accentColor="violet"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
            修正は「①整列 → ②余白 → ③色」の順序で進める。骨格が崩れたまま色をいじっても効果は出ない。
          </p>
        </ConceptDiagram>

        <Bridge
          from="修正には正しい順序がある"
          to="次はどこから手を入れるかを決めるコスパマップ"
        />

        <ConceptDiagram
          title="概念図D — 修正のコスパマップ"
          description="縦軸=効果（小→大）、横軸=コスト（小→大）。左上から手を入れるのが鉄則。"
        >
          <div
            className="grid grid-cols-2 gap-3 p-4 rounded-lg"
            style={{
              backgroundColor: "#0f1117",
              border: "1px dashed #3b3f5c",
            }}
          >
            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> 低コスト・高効果
              </p>
              <FlowCard
                Icon={CheckCircle2}
                title="整列を直す"
                subtitle="まずここから"
                highlight
                accentColor="violet"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> 高コスト・高効果
              </p>
              <FlowCard
                Icon={Palette}
                title="色システムを整える"
                subtitle="余裕があれば"
                accentColor="violet"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" /> 低コスト・低効果
              </p>
              <FlowCard
                Icon={Pencil}
                title="装飾を追加する"
                subtitle="後回しでよい"
                muted
                accentColor="violet"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" /> 高コスト・低効果
              </p>
              <FlowCard
                Icon={Trash2}
                title="全部作り直す"
                subtitle="最後の手段"
                muted
                accentColor="violet"
              />
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. 目を細めて骨格を見る">
          <p>
            UIを診断するときの最初のコツは「目を細めて見る」。装飾やテキストの細部がボケて、整列・余白・コントラストといった骨格だけが残る。整ったUIはぼかしても整って見えるし、崩れているUIはぼかすと崩れがそのまま現れる。
          </p>
          <p>
            色やフォントから入ると、整列が崩れていることに気づきにくい。骨格 → 4原則 → 色と余白 の順で観点を切り替えると、修正すべき箇所が浮かび上がる。
          </p>
          <KeyPoint>
            診断は観察の順序が命。「全体の骨格 → 部分のディテール」の順で見る。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. AIスロップを見抜く4つのサイン">
          <p>
            AIが生成するUIには「スロップ」と呼ばれる典型症状がある。代表的なのは ①余白が一定すぎる ②色が全部主張する ③フォント・サイズがバラバラ ④何が大事か読めない の4つ。
          </p>
          <p>
            特に①の「余白が一定」は厄介で、見出しと本文の余白が同じだと階層が消える。AIは綺麗に並べるのは得意だが、意図的な強弱を入れるのが苦手。スロップに気づけるかは、AI時代のデザインリテラシー。
          </p>
          <WarningPoint>
            「なんとなく綺麗」は要注意のサイン。意図が読めないUIは、AIスロップの可能性が高い。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="3. 優先順位をつけて直す">
          <p>
            診断で問題が10個見つかっても、全部直すのはコストが大きい。コスパマップ（コスト × 効果）で考えて、左上の「低コスト・高効果」から手を入れる。整列の修正がここに該当することが多い。
          </p>
          <p>
            右下の「高コスト・低効果」（=全部作り直す）は最後の手段。新人ほど「いっそ作り直そう」となりがちだが、ベテランほど「整列だけ直して80点にする」ような効くポイントを選ぶ。
          </p>
          <KeyPoint>
            修正の順序は「整列 → 余白 → 色 → 文字」。コスパの高い順に手を入れる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks */}
      <RelatedLinks
        groups={[
          {
            label: "前提として読むページ",
            items: [
              {
                href: "/uiux/principles",
                title: "デザインの4大原則",
                description: "近接・整列・反復・対比 — 診断のときの物差しになる",
                icon: "MousePointerClick",
              },
              {
                href: "/uiux/color",
                title: "色と配色のルール",
                description: "コントラスト比と60-30-10 — 色の診断基準",
                icon: "Palette",
              },
              {
                href: "/uiux/typography",
                title: "文字と余白のルール",
                description: "8の倍数と行間 — 余白の診断基準",
                icon: "Type",
              },
            ],
          },
          {
            label: "次に読むページ",
            items: [
              {
                href: "/uiux/parts",
                title: "UIパーツの設計",
                description: "ボタン・入力・カードの状態設計を学ぶ",
                icon: "LayoutGrid",
              },
            ],
          },
        ]}
      />

      {/* ── PageDrill */}
      <PageDrill
        groups={[
          { label: "基礎編ドリル", questions: diagnoseQuestions },
          { label: "応用編ドリル", questions: diagnoseAdvancedQuestions },
        ]}
      />
    </div>
  );
}
