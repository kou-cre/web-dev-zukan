import Link from "next/link";
import {
  Square,
  Ghost,
  AlertTriangle,
  Circle,
  Hand,
  Pointer,
  KeyRound,
  Ban,
  Tag,
  Info,
  AlertCircle,
  Image as ImageIcon,
  Type,
  Layers,
  ArrowRight,
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
import { partsQuestions } from "@/content/questions/uiux/parts";

export default function UiuxPartsPage() {
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
        title="UIパーツの設計"
        subtitle={"ボタン・入力・カード — 触れるパーツの作法と状態設計"}
        accentColor="indigo"
      />

      {/* ── Prerequisites */}
      <Prerequisites
        learn={[
          "ボタンの4階層（Primary・Secondary・Ghost・Destructive）の使い分け",
          "ボタンの5つの状態（Default・Hover・Active・Focus・Disabled）の作り方",
          "フォームのエラー設計を「事前ガード」として組む考え方",
        ]}
        prerequisites={[
          "デザインの4大原則を理解している",
          "色とコントラストの基本を理解している",
        ]}
        outOfScope={[
          "コンポーネントライブラリ（shadcn/uiやMUIなど）の具体的な実装",
          "アニメーションのイージング曲線設計",
        ]}
      />

      {/* ── OnePageSummary */}
      <OnePageSummary
        keyMessage={
          "「初期・ホバー・押下・フォーカス・無効」の状態を漏れなく作るのがプロの仕事。"
        }
        metaphorTitle="比喩 — ボタンは扉"
        metaphorPoints={[
          {
            label: "閉まっている",
            real: "閉まっている扉は「これは扉だな」と分かる",
            metaphor: "Default状態",
          },
          {
            label: "近づく",
            real: "近づくと開きそうな雰囲気を出す",
            metaphor: "Hover状態",
          },
          {
            label: "壊れている",
            real: "壊れている扉は触っても動かないと分かる",
            metaphor: "Disabled状態",
          },
        ]}
        definition={
          "パーツ設計 = 「初期・ホバー・押下・フォーカス・無効」の状態を漏れなく作る作業"
        }
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram */}
      <Bridge
        from="ボタンは扉。状態が伝わる扉が良い扉"
        to="まずボタンの4階層を整理する"
      />

      {/* ── BASIC: CONCEPT DIAGRAMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A — ボタンの4階層"
          description="役割の優先度に応じて見た目を変える。1画面にPrimaryは1つが原則。"
        >
          <div className="space-y-2">
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{
                backgroundColor: "rgba(99,102,241,0.1)",
                borderColor: "rgba(99,102,241,0.5)",
              }}
            >
              <Square className="w-5 h-5 text-indigo-400" />
              <div className="flex-1">
                <p className="text-sm font-bold text-indigo-300">Primary</p>
                <p className="text-xs text-gray-400">
                  主役・1画面に1つ — この画面で一番やってほしいこと
                </p>
              </div>
            </div>
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#3b3f5c" }}
            >
              <Square className="w-5 h-5 text-gray-300" />
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Secondary</p>
                <p className="text-xs text-gray-400">
                  副・補助アクション — 「キャンセル」「戻る」など
                </p>
              </div>
            </div>
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{
                backgroundColor: "transparent",
                borderColor: "#2d3048",
                borderStyle: "dashed",
              }}
            >
              <Ghost className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-300">Ghost / Text</p>
                <p className="text-xs text-gray-400">
                  弱い・第三の選択肢 — リンク的な扱い
                </p>
              </div>
            </div>
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{
                backgroundColor: "rgba(239,68,68,0.08)",
                borderColor: "rgba(239,68,68,0.5)",
              }}
            >
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div className="flex-1">
                <p className="text-sm font-bold text-red-300">Destructive</p>
                <p className="text-xs text-gray-400">
                  破壊的・赤色 — 削除・退会・取り消せない操作
                </p>
              </div>
            </div>
          </div>
        </ConceptDiagram>

        <Bridge
          from="ボタンは4階層で役割を分ける"
          to="次はそれぞれが持つべき5つの状態"
        />

        <ConceptDiagram
          title="概念図B — ボタンの5つの状態"
          description="この5状態を漏れなく作るのが「プロの仕事」と「動くだけのボタン」の境目。"
        >
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <FlowCard
              Icon={Circle}
              title="Default"
              subtitle="通常時"
              accentColor="indigo"
            />
            <FlowCard
              Icon={Hand}
              title="Hover"
              subtitle="マウスオン"
              accentColor="indigo"
            />
            <FlowCard
              Icon={Pointer}
              title="Active"
              subtitle="押下中"
              accentColor="indigo"
            />
            <FlowCard
              Icon={KeyRound}
              title="Focus"
              subtitle="忘れがち"
              highlight
              accentColor="indigo"
            />
            <FlowCard
              Icon={Ban}
              title="Disabled"
              subtitle="無効"
              accentColor="indigo"
            />
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
            特に Focus はキーボード操作のために必須。outline を消しただけで終わりにしない。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDividerの前・必須） */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "ボタンって作って終わりじゃないの？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "状態が本体。Hover無しのボタンは「押せるか分からない扉」と同じ。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "フォーム作ったけどエラーがズレた位置に出てきてる…",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "エラーは「事後通知」より「事前ガード」。入力中に分かる方が10倍親切。",
          },
        ]}
      />

      {/* ── SectionDivider */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="入力フォームのエラー設計とカードの構造設計に進む"
      />

      {/* ── ADVANCED: CONCEPT DIAGRAMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図C — 入力フォームのエラー設計"
          description="ラベル・補助テキスト・エラーは別の役割。混ぜずに設計する。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FlowCard
              Icon={Tag}
              title="ラベル"
              subtitle="常に見えている。何を入れる欄か"
              highlight
              accentColor="indigo"
            />
            <FlowCard
              Icon={Info}
              title="補助テキスト"
              subtitle="入力前のヒント。形式や例を示す"
              accentColor="indigo"
            />
            <FlowCard
              Icon={AlertCircle}
              title="エラーメッセージ"
              subtitle="入力中に表示。事前ガード"
              accentColor="indigo"
            />
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
            placeholder に情報を載せるのは禁じ手。入力中に消えると、ユーザーは文脈を失う。
          </p>
        </ConceptDiagram>

        <Bridge
          from="フォームは事前ガードで設計する"
          to="次はカードの優先度設計"
        />

        <ConceptDiagram
          title="概念図D — カードの構造（情報の優先度）"
          description="カードは上から下に「目で追う順」に並べる。情報の優先度に逆らわない。"
        >
          <div className="flex flex-col items-center gap-1">
            <FlowCard
              Icon={ImageIcon}
              title="① 画像"
              subtitle="一目で何のカードか伝える"
              highlight
              accentColor="indigo"
            />
            <FlowArrow label="目を引く" direction="down" />
            <FlowCard
              Icon={Type}
              title="② タイトル"
              subtitle="何の話かを最も強く"
              highlight
              accentColor="indigo"
            />
            <FlowArrow label="本文に進む" direction="down" />
            <FlowCard
              Icon={Layers}
              title="③ メタ情報"
              subtitle="日付・著者・タグ"
              accentColor="indigo"
            />
            <FlowArrow label="行動を促す" direction="down" />
            <FlowCard
              Icon={ArrowRight}
              title="④ アクション"
              subtitle="続きを読む / 詳細"
              highlight
              accentColor="indigo"
            />
          </div>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. ボタンの4階層と1画面1Primary原則">
          <p>
            ボタンには役割の階層がある。Primary（主役）・Secondary（副）・Ghost/Text（弱）・Destructive（破壊的）の4種類。これを使い分けることで、ユーザーは画面の中で何が一番重要かを瞬時に判断できる。
          </p>
          <p>
            原則は「1画面にPrimaryは1つ」。複数あるとユーザーが迷う。補助アクションはSecondaryやGhostに格下げして、本当にやってほしい操作だけをPrimaryにする。
          </p>
          <KeyPoint>
            Primaryは1画面に1つ。複数のPrimaryは「主役不在のドラマ」と同じで、ユーザーは迷子になる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. 5つの状態を漏れなく作る">
          <p>
            ボタンには Default・Hover・Active・Focus・Disabled の5つの状態がある。Defaultしか作らないと「動くけれど押せるか分からない」UIになる。
          </p>
          <p>
            特に忘れがちなのが Focus（キーボードフォーカス）。マウス操作だけでテストすると気づかない。タブキーで操作したときに、いまどこに焦点があるか視覚的に分かる必要がある。CSSで{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a5b4fc" }}
            >
              outline: none
            </code>
            だけで終わらせると、アクセシビリティが破綻する。
          </p>
          <WarningPoint>
            outline を消したら、必ず別のフォーカス表現（box-shadow など）を入れる。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="3. フォームは事前ガードで設計する">
          <p>
            エラー設計には「事後通知」と「事前ガード」がある。送信ボタンを押した後にまとめてエラーを出すのが事後通知、入力中にその場で教えるのが事前ガード。事前ガードの方が10倍親切。
          </p>
          <p>
            また、placeholder
            だけに「メールアドレスを入力」のような情報を載せるのは禁じ手。入力を始めると消えるため、ユーザーは何を入れる欄か忘れる。ラベルは常に表示し、placeholder は具体例（
            <code
              className="px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a5b4fc" }}
            >
              example@mail.com
            </code>
            ）にとどめる。
          </p>
          <KeyPoint>
            ラベル・補助テキスト・エラーは別の役割。役割を混ぜずに設計する。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks */}
      <RelatedLinks
        items={[
          {
            href: "/uiux/diagnose",
            title: "UIを読み解く・診断する",
            description: "「なぜ良いか」「何が悪いか」を言葉にする力を養う",
            icon: "Code2",
          },
          {
            href: "/uiux/layout",
            title: "レイアウトと一貫性",
            description: "グリッド・モバイル・トークンで画面全体を仕組みで揃える",
            icon: "Rocket",
          },
        ]}
      />

      {/* ── PageDrill */}
      <PageDrill questions={partsQuestions} />
    </div>
  );
}
