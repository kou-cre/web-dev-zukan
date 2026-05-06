import Link from "next/link";
import {
  XCircle,
  CheckCircle2,
  Sparkles,
  Eye,
  Wrench,
  RotateCcw,
  Activity,
  Globe,
  MousePointer,
  Repeat,
  ShieldAlert,
  Brain,
  Settings2,
  Minimize2,
  LifeBuoy,
  BookOpen,
  Skull,
  Accessibility,
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
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { aiQualityQuestions } from "@/content/questions/uiux/ai-quality";

export default function UiuxAiQualityPage() {
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
        title="AIと仕上げる・品質と倫理"
        subtitle={
          "AIの出力を診断・修正するループ — 10原則・WCAG・ダークパターン"
        }
        accentColor="sky"
      />

      {/* ── Prerequisites */}
      <Prerequisites
        learn={[
          "AIに具体的に指示するためのプロンプトの書き方",
          "ニールセン10原則とWCAGをチェック項目として使う方法",
          "ダークパターンの典型例と、加害者にならないための視点",
        ]}
        prerequisites={[
          "デザインの4大原則と診断の手順を理解している",
          "色のコントラストの基本（4.5:1）を知っている",
        ]}
        outOfScope={[
          "WCAG 2.2 / 3.0 の詳細な達成基準",
          "プロンプトエンジニアリングのテクニック詳細",
        ]}
      />

      {/* ── OnePageSummary */}
      <OnePageSummary
        keyMessage={
          "AIの出力を「具体的な指示 → 診断 → 修正」のループで仕上げる。"
        }
        metaphorTitle="比喩 — AIは新人デザイナー"
        metaphorPoints={[
          {
            label: "新人の手",
            real: "手は速いが、判断は浅い",
            metaphor: "AIの出力",
          },
          {
            label: "ベテランの目",
            real: "ベテランの「物差し」で検収する",
            metaphor: "10原則・WCAG",
          },
          {
            label: "教える",
            real: "Before/Afterを見せて修正させる",
            metaphor: "あなたの仕事",
          },
        ]}
        definition={
          "AI協業 = 「具体的に指示 → 出力を診断 → Before/Afterで直す」ループを回すこと"
        }
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram */}
      <Bridge
        from="AIの新人デザイナーをベテランの目で検収する"
        to="まずプロンプトの書き方の良い例/悪い例を見る"
      />

      {/* ── BASIC: CONCEPT DIAGRAMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A — AIプロンプトの良い例/悪い例"
          description="制約を具体的に渡すかどうかで、出力の質が変わる。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(239,68,68,0.06)",
                borderColor: "rgba(239,68,68,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <p className="text-sm font-bold text-red-300">悪い例</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                「いい感じのログイン画面を作って」
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                判定基準がないので、AIは「それっぽい」を返すしかない
              </p>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(14,165,233,0.06)",
                borderColor: "rgba(14,165,233,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-sky-400" />
                <p className="text-sm font-bold text-sky-300">良い例</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                「12カラム / Primary 1個 / 余白8の倍数 / コントラスト4.5:1 を守ってログイン画面を」
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                数値で判定できる制約を渡すと、出力が安定する
              </p>
            </div>
          </div>
        </ConceptDiagram>

        <Bridge
          from="プロンプトには判定可能な制約を入れる"
          to="次はAI出力を仕上げる修正ループ"
        />

        <ConceptDiagram
          title="概念図B — 修正ループ"
          description="一発で完璧は無理。診断 → 指示 → 再生成のループで仕上げる。"
        >
          <div className="flex flex-col items-center gap-1">
            <FlowCard
              Icon={Sparkles}
              title="① AI出力"
              subtitle="まず叩き台をもらう"
              highlight
              accentColor="sky"
            />
            <FlowArrow label="物差しで測る" direction="down" />
            <FlowCard
              Icon={Eye}
              title="② 4ステップ診断"
              subtitle="骨格 → 4原則 → 色余白 → 優先度"
              highlight
              accentColor="sky"
            />
            <FlowArrow label="原則の言葉に翻訳" direction="down" />
            <FlowCard
              Icon={Wrench}
              title="③ 修正指示"
              subtitle="Before/Afterで具体的に"
              highlight
              accentColor="sky"
            />
            <FlowArrow label="再生成" direction="down" />
            <FlowCard
              Icon={RotateCcw}
              title="④ 再診断"
              subtitle="効いたか確認・必要なら戻す"
              highlight
              accentColor="sky"
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
            text: "AIに全部任せちゃいけないの？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "任せていい。ただし検収の目を持つこと。10原則とWCAGが物差しになる。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ダークパターンって、悪気なく作っちゃう側にもなるんだ…",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "ユーザーを騙す設計は短期的に得をしても長期で信用を失う。倫理は最後の品質。",
          },
        ]}
      />

      {/* ── SectionDivider */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="ニールセン10原則ダイジェストとダークパターン/WCAGの実践に進む"
      />

      {/* ── ADVANCED: CONCEPT DIAGRAMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図C — ニールセン10原則ダイジェスト"
          description="UIユーザビリティの古典。AIが特に落としがちな⑤⑥に注意。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <FlowCard
              Icon={Activity}
              title="① 状態の可視性"
              subtitle="今どこか・何中かを示す"
              accentColor="sky"
            />
            <FlowCard
              Icon={Globe}
              title="② 現実とのマッチ"
              subtitle="ユーザーの言葉で書く"
              accentColor="sky"
            />
            <FlowCard
              Icon={MousePointer}
              title="③ ユーザーコントロール"
              subtitle="戻る・取り消しを用意"
              accentColor="sky"
            />
            <FlowCard
              Icon={Repeat}
              title="④ 一貫性"
              subtitle="同じものは同じに見せる"
              accentColor="sky"
            />
            <FlowCard
              Icon={ShieldAlert}
              title="⑤ エラー予防"
              subtitle="AIが落としがち"
              highlight
              accentColor="sky"
            />
            <FlowCard
              Icon={Brain}
              title="⑥ 認識より想起"
              subtitle="AIが落としがち"
              highlight
              accentColor="sky"
            />
            <FlowCard
              Icon={Settings2}
              title="⑦ 柔軟性と効率性"
              subtitle="初心者と熟練の両立"
              accentColor="sky"
            />
            <FlowCard
              Icon={Minimize2}
              title="⑧ 美的かつ最小限"
              subtitle="ノイズを削る"
              accentColor="sky"
            />
            <FlowCard
              Icon={LifeBuoy}
              title="⑨ エラーからの回復"
              subtitle="原因と次の手を示す"
              accentColor="sky"
            />
            <FlowCard
              Icon={BookOpen}
              title="⑩ ヘルプとドキュメント"
              subtitle="必要なときに引ける"
              accentColor="sky"
            />
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
            AIは①②④⑧は得意だが、⑤エラー予防と⑥認識より想起が苦手。ここは人が補う。
          </p>
        </ConceptDiagram>

        <Bridge
          from="10原則は検収のチェックリスト"
          to="次はダークパターンとWCAGの基本"
        />

        <ConceptDiagram
          title="概念図D — ダークパターンとアクセシビリティ"
          description="ユーザーを騙す設計を避けるのは、品質の最後の砦。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(239,68,68,0.06)",
                borderColor: "rgba(239,68,68,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Skull className="w-5 h-5 text-red-400" />
                <p className="text-sm font-bold text-red-300">
                  ダークパターン例
                </p>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <span className="text-red-400">▸</span> 退会動線が異常に深い
                </li>
                <li>
                  <span className="text-red-400">▸</span> 同意チェックがあらかじめON
                </li>
                <li>
                  <span className="text-red-400">▸</span> 否定的な選択肢を小さく薄く表示
                </li>
                <li>
                  <span className="text-red-400">▸</span> カウントダウンで焦らせる
                </li>
              </ul>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(14,165,233,0.06)",
                borderColor: "rgba(14,165,233,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Accessibility className="w-5 h-5 text-sky-400" />
                <p className="text-sm font-bold text-sky-300">WCAG基本</p>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <span className="text-sky-400">▸</span> コントラスト 4.5:1 以上
                </li>
                <li>
                  <span className="text-sky-400">▸</span> フォーカスが見える
                </li>
                <li>
                  <span className="text-sky-400">▸</span> キーボードだけで操作可能
                </li>
                <li>
                  <span className="text-sky-400">▸</span> 画像に代替テキスト
                </li>
              </ul>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. AIに正確に指示する方法">
          <p>
            AIに「いい感じに作って」と頼むと、判定基準がないので「それっぽい」が返ってくるだけ。代わりに「12カラム / Primary 1個 / 余白8の倍数 / コントラスト4.5:1」のように、判定可能な制約を渡す。
          </p>
          <p>
            プロンプトに含めるべき要素は、①レイアウト（カラム数）②階層（Primary数）③余白（単位）④色（コントラスト基準）⑤対象ユーザー の5つ。これだけ揃えると、出力品質が安定する。
          </p>
          <KeyPoint>
            AIは「数値で判定できる制約」が好物。曖昧さを残さず渡す。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. ニールセン10原則でチェックする">
          <p>
            ニールセン10原則は、UIユーザビリティの古典。1994年に発表されてから今でも使われている。AI時代に再び価値が上がっているのは、AIの出力を検収する「物差し」として機能するから。
          </p>
          <p>
            特にAIが落としがちなのは ⑤エラー予防 と ⑥認識より想起。AIは「とりあえず動く画面」は作れるが、「事前にエラーを防ぐ」「ユーザーが覚えなくて済むように選択肢を提示する」といった配慮は弱い。ここは人が補う。
          </p>
          <KeyPoint>
            10原則を頭に入れておくと、AI出力の「何かが足りない」が言語化できる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="3. ダークパターンを知り、加害者にならない">
          <p>
            ダークパターンとは、ユーザーを騙したり誘導したりする設計のこと。退会動線をわざと深くする、同意チェックを最初からONにする、カウントダウンで焦らせるなどが典型例。
          </p>
          <p>
            悪気なく作ってしまうケースも多い。「KPIを上げたい」「離脱を減らしたい」という意図が、結果的にユーザーを欺く設計に繋がる。短期的には数字が上がっても、長期では信用を失う。倫理は品質の最後の砦。
          </p>
          <p>
            並行して大事なのが WCAG（Web Content Accessibility Guidelines）。コントラスト 4.5:1 以上、フォーカスが見える、キーボードだけで操作できる、画像に代替テキスト — この4つを押さえるだけで、見える人にも見えにくい人にも届くUIになる。
          </p>
          <WarningPoint>
            「KPIを上げる設計」と「ダークパターン」の境目は薄い。判断に迷ったら「自分が騙された側だったらどう感じるか」で測る。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks */}
      <RelatedLinks
        items={[
          {
            href: "/uiux/layout",
            title: "レイアウトと一貫性",
            description: "グリッド・モバイル・トークンで仕組み化する",
            icon: "Code2",
          },
          {
            href: "/uiux/diagnose",
            title: "UIを読み解く・診断する",
            description: "AI出力を検収するときの診断手順",
            icon: "Rocket",
          },
        ]}
      />

      {/* ── PageDrill */}
      <PageDrill questions={aiQualityQuestions} />
    </div>
  );
}
