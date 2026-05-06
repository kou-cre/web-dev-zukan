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
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { TermNote } from "@/components/TermNote";
import { aiQualityQuestions, aiQualityAdvancedQuestions } from "@/content/questions/uiux/ai-quality";

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
          { text: "デザインの4大原則と診断の手順を理解している", href: "/uiux/diagnose" },
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
            text: "AIに全部任せちゃダメなんですか？ ボク、Figmaも使えないし、AIが綺麗な画面を出してくれるなら、それでよくないですか……と思っていまして。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "任せていいんです、マジさん。\nただし検収の目を持ってください。\nAIは新人デザイナーと同じで、手は速いけれど判断は浅い。\n10原則とWCAGがベテランの「物差し」になります。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ「いい感じのログイン画面を作って」と頼むだけだと、AIにとっても困る指示になっている、ということですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そのとおりです。\n判定基準がないので、AIは「それっぽい」を返すしかなくなる。\n「12カラム / Primary 1個 / 余白8の倍数 / コントラスト4.5:1」のように、数値で判定できる制約を渡してください、マジさん。\n曖昧さを残さないことが、AIには一番効きます。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、ダークパターンというのが少し気になっていて。退会動線を深くしたり、同意チェックを最初からONにしたり……あれって悪気なく作ってしまう側にもなるんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "なってしまうんです、マジさん。\n「KPIを上げたい」「離脱を減らしたい」という意図が、結果的にユーザーを欺く設計に繋がる。\n短期的には数字が上がっても、長期では信用を失います。\n判断に迷ったら「自分が騙された側だったらどう感じるか」で測ってください。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なんとなく分かってきました。AIの出力は「具体的に指示 → 4ステップ診断 → Before/Afterで直す」のループで仕上げる。倫理は品質の最後の砦、ということですね。ボク、心して使います。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。\nAIは①状態の可視性 ②現実とのマッチ ④一貫性 ⑧美的かつ最小限 は得意ですが、⑤エラー予防と⑥認識より想起が苦手。\nここは人が補う領域なんです、マジさん。\n10原則を頭に入れておくと、AI出力の「何かが足りない」が言語化できるようになります。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["失敗例（AIがよく出す）", "合格基準"]}
          rows={[
            {
              label: "文字の読みやすさ",
              cells: [
                "薄いグレーのテキストで読めない",
                "コントラスト比4.5:1以上を確保（WCAG AA基準）",
              ],
              highlightCol: 1,
            },
            {
              label: "フォームの親切さ",
              cells: [
                "エラー時に入力欄が赤くなるだけ",
                "エラーメッセージを文字で表示する",
              ],
              highlightCol: 1,
            },
            {
              label: "操作の一貫性",
              cells: [
                "ページによってボタンの見た目が違う",
                "デザインシステムで全ページ統一する",
              ],
              highlightCol: 1,
            },
            {
              label: "情報量",
              cells: [
                "1画面に情報が詰め込まれすぎ",
                "優先度の低い情報を折りたたむ・削除する",
              ],
              highlightCol: 1,
            },
          ]}
          highlightCol={1}
          note="AIが生成したUIは「それっぽい」が細部が甘い。4項目を毎回チェックする習慣が品質の底上げになる。"
        />
      </section>

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

        <TermNote
          terms={[
            {
              word: "ニールセン10原則",
              definition:
                "ユーザビリティ研究者のヤコブ・ニールセンが提唱したUIの古典的チェックリスト。「システム状態の可視性」「ユーザーの自由」など10の原則で構成される。AIが生成したUIの検収に使える。",
            },
            {
              word: "WCAG（ウィーキャグ）",
              definition:
                "Web Content Accessibility Guidelines。Webアクセシビリティの国際基準。コントラスト比・代替テキスト・キーボード操作などの基準が定められており、AA基準が一般的な達成目標。",
            },
            {
              word: "ダークパターン",
              definition:
                "ユーザーを意図せず誘導・欺くUI設計の総称。「解約ボタンを探しにくくする」「意図しない同意を取る」などが代表例。ユーザーの信頼を損なう。",
            },
            {
              word: "アクセシビリティ",
              definition:
                "障害の有無に関わらず、すべての人がWebサービスを利用できるようにする取り組み。視覚・聴覚・運動機能に配慮したUIデザインが求められる。",
            },
          ]}
        />

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
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            AIに「いい感じに作って」と頼むと、判定基準がないので「それっぽい」が返ってくるだけ。代わりに判定可能な制約を渡す。曖昧さを残さないことが、AIには一番効く。
          </p>
          <CorrectionCard
            misconception="「いい感じのログイン画面を作って」と頼む — AIが判断してくれるはず"
            correction="「12カラム / Primaryボタン1個 / 余白8の倍数 / コントラスト4.5:1 / 日本語UI のログイン画面を作って」と制約を数値で渡す"
            reason="判定基準がないとAIは「それっぽい」を返すしかない。数値で判定できる制約を渡すと、出力品質が安定して修正回数が減る。"
          />
          <KeyPoint>
            AIは「数値で判定できる制約」が好物。曖昧さを残さず渡す。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. ニールセン10原則でチェックする">
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            ニールセン10原則はUIユーザビリティの古典。AI出力を検収する「物差し」として機能する。特にAIが落としがちな原則を知っておくと、「何かが足りない」を言語化できる。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: ShieldAlert,
                title: "⑤ エラー予防",
                subtitle: "AIが落としがち",
                description: "エラーが起きる前に防ぐ設計。AIは「エラーが出たら表示する」はできるが「事前に防ぐ」配慮は弱い。",
                accentColor: "sky",
              },
              {
                Icon: Brain,
                title: "⑥ 認識より想起",
                subtitle: "AIが落としがち",
                description: "ユーザーが覚えなくても済むように選択肢を常時表示する。AIは「機能を並べる」のが得意だが文脈の連続性が弱い。",
                accentColor: "sky",
              },
              {
                Icon: Activity,
                title: "① 状態の可視性",
                subtitle: "AIが比較的得意",
                description: "今どこにいるか・何中かをUIが示す。ローディングインジケーター・パンくずリストなど。",
                accentColor: "sky",
              },
              {
                Icon: Minimize2,
                title: "⑧ 美的かつ最小限",
                subtitle: "AIが比較的得意",
                description: "不要な情報・装飾を削る。ただし「最小限」の判断は甘い場合があるので確認する。",
                accentColor: "sky",
              },
            ]}
          />
          <KeyPoint>
            10原則を頭に入れておくと、AI出力の「何かが足りない」が言語化できる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="3. ダークパターンを知り、加害者にならない">
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            ダークパターンとはユーザーを騙したり誘導したりする設計のこと。悪気なく作ってしまうケースも多い。短期的には数字が上がっても、長期では信用を失う。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: RotateCcw,
                title: "退会動線が異常に深い",
                subtitle: "やりがちなダークパターン",
                description: "登録は1クリック、退会は5ステップ以上。ユーザーは疲れて諦める。信頼を壊す設計。",
                accentColor: "sky",
              },
              {
                Icon: Eye,
                title: "同意チェックがデフォルトON",
                subtitle: "やりがちなダークパターン",
                description: "利用規約・マーケティング同意が最初からチェック済み。GDPR違反にもなりえる。",
                accentColor: "sky",
              },
              {
                Icon: Globe,
                title: "キーボードだけで操作できる",
                subtitle: "WCAGの基本",
                description: "マウスを使えないユーザーへの対応。Tabキーで全操作ができるか確認する。",
                accentColor: "sky",
              },
              {
                Icon: CheckCircle2,
                title: "コントラスト 4.5:1 以上",
                subtitle: "WCAGの基本",
                description: "文字と背景のコントラスト比。視力が弱い人・屋外で使う人への配慮。DevToolsで確認できる。",
                accentColor: "sky",
              },
            ]}
          />
          <WarningPoint>
            「KPIを上げる設計」と「ダークパターン」の境目は薄い。判断に迷ったら「自分が騙された側だったらどう感じるか」で測る。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks */}
      <RelatedLinks
        groups={[
          {
            label: "前提として読むページ",
            items: [
              {
                href: "/uiux/layout",
                title: "レイアウトと一貫性",
                description: "グリッド・モバイル・トークンで仕組み化する",
                icon: "LayoutGrid",
              },
              {
                href: "/uiux/diagnose",
                title: "UIを読み解く・診断する",
                description: "AI出力を検収するときの4ステップ診断手順",
                icon: "Stethoscope",
              },
            ],
          },
        ]}
      />

      {/* ── PageDrill */}
      <PageDrill
        groups={[
          { label: "基礎編ドリル", questions: aiQualityQuestions },
          { label: "応用編ドリル", questions: aiQualityAdvancedQuestions },
        ]}
      />
    </div>
  );
}
