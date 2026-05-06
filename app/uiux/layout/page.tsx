import Link from "next/link";
import {
  Columns,
  Move,
  Square,
  Smartphone,
  Monitor,
  Palette,
  Ruler,
  Package,
  LayoutGrid,
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
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { TermNote } from "@/components/TermNote";
import { layoutQuestions, layoutAdvancedQuestions } from "@/content/questions/uiux/layout";

export default function UiuxLayoutPage() {
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
        title="レイアウトと一貫性"
        subtitle={
          "グリッド・モバイル・デザイントークン — 画面全体を仕組みで揃える"
        }
        accentColor="blue"
      />

      {/* ── Prerequisites */}
      <Prerequisites
        learn={[
          "12カラムグリッドの構造（content / gap / margin）",
          "モバイルファーストで設計する具体的な順序",
          "デザイントークンで色・余白を中央管理する考え方",
        ]}
        prerequisites={[
          { text: "デザインの4大原則を理解している", href: "/uiux/principles" },
          "余白の8の倍数ルールを知っている",
        ]}
        outOfScope={[
          "Tailwind や CSS変数による具体的なトークン実装",
          "レスポンシブデザインの細かなブレイクポイント設計",
        ]}
      />

      {/* ── OnePageSummary */}
      <OnePageSummary
        keyMessage={
          "色・サイズ・余白に名前をつけて、画面全体で同じものを再利用する。"
        }
        metaphorTitle="比喩 — レイアウトは家の間取り"
        metaphorPoints={[
          {
            label: "柱を立てる",
            real: "柱（=グリッド）が家の骨格を決める",
            metaphor: "12カラム",
          },
          {
            label: "コンセントを通す",
            real: "コンセント（=トークン）の位置が決まれば家具が置ける",
            metaphor: "色と余白の名前",
          },
          {
            label: "暮らしが回る",
            real: "間取りが決まれば暮らしが回る",
            metaphor: "再利用で一貫性",
          },
        ]}
        definition={
          "一貫性 = 色・サイズ・余白に名前をつけて、画面全体で同じものを再利用すること"
        }
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram */}
      <Bridge
        from="一貫性は仕組みで作る"
        to="まず12カラムグリッドの構造を見る"
      />

      {/* ── BASIC: CONCEPT DIAGRAMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <TermNote
          terms={[
            {
              word: "12カラムグリッド",
              definition:
                "画面幅を12等分した格子状のガイドライン。要素をこの格子に揃えることで整列が自動的に担保される。12は2・3・4・6で割り切れるため柔軟なレイアウトが作りやすい。",
            },
            {
              word: "ガター（Gutter）",
              definition:
                "グリッドのカラムとカラムの間の余白。一般的に16〜24px程度に設定し、コンテンツ同士の間隔を一定に保つ。",
            },
            {
              word: "モバイルファースト",
              definition:
                "スマートフォン（320〜375px幅）のレイアウトを先に設計し、画面が広くなるにつれてレイアウトを拡張していく設計方針。",
            },
            {
              word: "ブレークポイント",
              definition:
                "画面幅が変わったときにレイアウトを切り替える境界値。sm（640px）・md（768px）・lg（1024px）などが一般的。Tailwindではsm:・md:・lg:プレフィックスで指定する。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図A — 12カラムグリッドの3要素"
          description="content（カラム本体）/ gap（カラム間）/ margin（外側）を分けて考える。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <FlowCard
              Icon={Columns}
              title="content"
              subtitle="カラム本体（中身が入る幅）"
              highlight
              accentColor="blue"
            />
            <FlowCard
              Icon={Move}
              title="gap"
              subtitle="カラム間の余白（ガター）"
              accentColor="blue"
            />
            <FlowCard
              Icon={Square}
              title="margin"
              subtitle="画面端との余白"
              accentColor="blue"
            />
          </div>

          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: "#0f1117", border: "1px dashed #3b3f5c" }}
          >
            <p className="text-xs text-gray-400 mb-3 text-center">
              12カラムは2・3・4・6で割り切れる
            </p>
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 rounded"
                  style={{
                    backgroundColor: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(59,130,246,0.3)",
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-center">
              <span className="text-xs text-blue-300 font-mono">12÷1=1</span>
              <span className="text-xs text-blue-300 font-mono">12÷2=6</span>
              <span className="text-xs text-blue-300 font-mono">12÷3=4</span>
              <span className="text-xs text-blue-300 font-mono">12÷4=3</span>
            </div>
          </div>
        </ConceptDiagram>

        <Bridge
          from="12カラムを使えば分割が自然に決まる"
          to="次はモバイル/デスクトップで何が変わるか"
        />

        <ConceptDiagram
          title="概念図B — モバイル/デスクトップで変わるもの"
          description="同じ画面でも、デバイスが変われば優先度も変わる。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(59,130,246,0.06)",
                borderColor: "rgba(59,130,246,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-blue-400" />
                <p className="text-sm font-bold text-blue-300">モバイル</p>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <span className="text-blue-400">▸</span> ナビ ＝ 下（指が届く）
                </li>
                <li>
                  <span className="text-blue-400">▸</span> カラム ＝ 4
                </li>
                <li>
                  <span className="text-blue-400">▸</span> フォント ＝ 小さめ
                </li>
              </ul>
            </div>
            <div
              className="rounded-lg border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#3b3f5c" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-gray-300" />
                <p className="text-sm font-bold text-white">デスクトップ</p>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <span className="text-gray-400">▸</span> ナビ ＝ 上
                </li>
                <li>
                  <span className="text-gray-400">▸</span> カラム ＝ 12
                </li>
                <li>
                  <span className="text-gray-400">▸</span> フォント ＝ 標準
                </li>
              </ul>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDividerの前・必須） */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "レイアウトってFigmaで適当に並べるだけじゃダメなんですか？ ボク、12カラムって言われても、なぜ12なのかピンと来ていなくて。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "12は2・3・4・6で割り切れるからなんです、マジさん。\n1/2、1/3、1/4、1/6 のレイアウトが自然に作れる。\n8カラムや16カラムでは出せない柔軟性があるんです。\n12カラムを意識すると、モバイルに移したときの分割も自動で決まります。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ最初からPC版で作り込むより、モバイル版から設計したほうがいいんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そのとおりです。\nモバイルから設計するのは「制約から始める」アプローチ。\n狭い幅の中で本当に必要な情報を選び抜く必要があるので、結果的に情報の優先度が研ぎ澄まされるんです。\nPC版から作るとモバイルで詰みます、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、デザイントークンというのが少し気になっていて。色を `primary-500` という名前で書くだけで、本当にブランド変更がボタン1個で終わるんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "終わるんです、マジさん。\n#3b82f6 のように直書きしていると、微妙に違う青が画面に散らばって、ブランド変更のときに数十箇所を直す羽目になる。\n名前で中央管理しておけば、定義1箇所の変更で全画面に反映される。\nこれが「デザインがコードになる」感覚です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なんとなく分かってきました。トークン → コンポーネント → 画面、と層を重ねて再利用する。一貫性は気合いではなく仕組みで守る、ということですね。ボク、これで保守が楽になりそうです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。\nトークン化は実装速度より「変更耐性」のメリットが大きい。\nレイアウトは家の間取りと同じで、柱（グリッド）とコンセント（トークン）が決まれば暮らし（=UI）が回るんです、マジさん。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["モバイル", "タブレット", "デスクトップ"]}
          rows={[
            {
              label: "ブレークポイント",
              cells: ["〜 639px", "640px 〜 1023px", "1024px 〜"],
              highlightCol: 2,
            },
            {
              label: "グリッド列数",
              cells: ["4カラム", "8カラム", "12カラム"],
              highlightCol: 2,
            },
            {
              label: "ガター（列間の隙間）",
              cells: ["16px", "24px", "32px"],
              highlightCol: 2,
            },
            {
              label: "コンテンツ余白",
              cells: ["16px", "24px", "32px〜"],
              highlightCol: 2,
            },
            {
              label: "コンテンツ最大幅",
              cells: ["100%", "100%", "1280px前後"],
              highlightCol: 2,
            },
          ]}
          highlightCol={2}
          note="Tailwind CSSのデフォルトブレークポイントはsm:640px / md:768px / lg:1024px / xl:1280px。このサイトでもこれを使っている。"
        />
      </section>

      {/* ── SectionDivider */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="デザイントークンの考え方とコンポーネント化への流れに進む"
      />

      {/* ── ADVANCED: CONCEPT DIAGRAMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        <TermNote
          terms={[
            {
              word: "デザイントークン",
              definition:
                "色・フォントサイズ・余白などに名前をつけて管理する仕組み。primary-500・space-4のような変数名で定義し、コード全体で一貫して使うことで「1か所変えれば全体が変わる」を実現する。",
            },
            {
              word: "CSS変数 / Tailwind config",
              definition:
                "デザイントークンを実装する手段。CSS変数は--color-primary: #3b82f6のように定義し、Tailwind configではtheme.extend.colorsなどで独自トークンを追加できる。",
            },
            {
              word: "コンポーネント化",
              definition:
                "繰り返し使うUI要素（ボタン・カード・ナビなど）を1つの部品として切り出す設計。変更が1か所で済み、デザインの一貫性が保ちやすくなる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C — デザイントークンの考え方"
          description="色やサイズに名前をつけて中央管理する。値の直書きをやめる。"
        >
          <div className="space-y-3">
            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(59,130,246,0.06)",
                borderColor: "rgba(59,130,246,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-bold text-blue-300">色トークン</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                <code
                  className="px-1.5 py-0.5 rounded font-mono"
                  style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}
                >
                  primary-500
                </code>{" "}
                /{" "}
                <code
                  className="px-1.5 py-0.5 rounded font-mono"
                  style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}
                >
                  gray-100
                </code>{" "}
                のように名前で呼ぶ
              </p>
            </div>

            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(59,130,246,0.06)",
                borderColor: "rgba(59,130,246,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-bold text-blue-300">間隔トークン</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                <code
                  className="px-1.5 py-0.5 rounded font-mono"
                  style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}
                >
                  space-1
                </code>{" "}
                /{" "}
                <code
                  className="px-1.5 py-0.5 rounded font-mono"
                  style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}
                >
                  space-2
                </code>{" "}
                /{" "}
                <code
                  className="px-1.5 py-0.5 rounded font-mono"
                  style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}
                >
                  space-4
                </code>{" "}
                のように数列で管理
              </p>
            </div>

            <div
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "rgba(245,158,11,0.05)",
                borderColor: "rgba(245,158,11,0.3)",
              }}
            >
              <p className="text-xs text-amber-300 leading-relaxed">
                <code
                  className="px-1.5 py-0.5 rounded font-mono"
                  style={{ backgroundColor: "#0f1117", color: "#fcd34d" }}
                >
                  #3b82f6
                </code>{" "}
                ではなく{" "}
                <code
                  className="px-1.5 py-0.5 rounded font-mono"
                  style={{ backgroundColor: "#0f1117", color: "#fcd34d" }}
                >
                  primary-500
                </code>{" "}
                で書くと、ブランド変更が定義1箇所で全画面に反映される。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        <Bridge
          from="トークンで色とサイズを名前で管理"
          to="次はトークンを使ったコンポーネント化と再利用の流れ"
        />

        <ConceptDiagram
          title="概念図D — コンポーネント化と再利用"
          description="トークン → コンポーネント → 画面、と層を重ねて一貫性を仕組みにする。"
        >
          <div className="flex flex-col items-center gap-1">
            <FlowCard
              Icon={Palette}
              title="① デザイントークン"
              subtitle="色・余白に名前をつける"
              highlight
              accentColor="blue"
            />
            <FlowArrow label="トークンを部品に組み込む" direction="down" />
            <FlowCard
              Icon={Package}
              title="② コンポーネント"
              subtitle="ボタン・カード・入力欄"
              highlight
              accentColor="blue"
            />
            <FlowArrow label="部品を組み合わせる" direction="down" />
            <FlowCard
              Icon={LayoutGrid}
              title="③ 画面全体"
              subtitle="同じ部品を再利用して構築"
              highlight
              accentColor="blue"
            />
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
            この階層を作っておくと、トークン1つの変更が全画面に効く。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. 12カラムグリッドで間取りする">
          <p>
            Webデザインの事実上の標準は12カラム。なぜ12かというと、2・3・4・6で割り切れて、1/2、1/3、1/4、1/6 のレイアウトが自然に作れるから。8カラムや16カラムでは出せない柔軟性がある。
          </p>
          <p>
            グリッドは content（カラム本体）/ gap（ガター）/ margin（外余白）の3要素でできている。Figma のレイアウトグリッド機能でも、Tailwind の{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}
            >
              grid-cols-12
            </code>{" "}
            でも、考え方は同じ。
          </p>
          <KeyPoint>
            12カラムを意識して設計すると、モバイルへの分割（1/2、1/3）が自動で決まる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. モバイルファーストで設計する理由">
          <p>
            モバイルから設計するのは「制約から始める」アプローチ。狭い幅の中で「本当に必要な情報」を選び抜く必要があるため、結果的に情報の優先度が研ぎ澄まされる。
          </p>
          <p>
            また、PC版を後から広げるのは比較的簡単。逆にPC版で作り込んだ画面をモバイルに縮めるのは、削るべき情報の判断が後回しになりがちで、難しい。
          </p>
          <WarningPoint>
            PC版から作るとモバイルで詰む。狭い幅の中で何を残すかを最初に決める。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="3. デザイントークンで一貫性を仕組み化する">
          <p>
            「画面ごとにカラーコードを直書き」は事故の元。微妙に違う青が画面に散らばり、ブランド変更のときに数十箇所を直す羽目になる。
          </p>
          <p>
            色やサイズに{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}
            >
              primary-500
            </code>{" "}
            のような名前をつけて中央管理しておけば、定義1箇所の変更で全画面に反映される。これが「デザインがコードになる」感覚。一貫性は気合いではなく仕組みで守る。
          </p>
          <KeyPoint>
            トークン化は実装速度より「変更耐性」のメリットが大きい。
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
                href: "/uiux/parts",
                title: "UIパーツの設計",
                description: "ボタン・入力・カードの状態設計を学ぶ",
                icon: "LayoutGrid",
              },
              {
                href: "/uiux/color",
                title: "色と配色のルール",
                description: "三属性と60-30-10 — 一貫性に必要な色の基礎",
                icon: "Palette",
              },
            ],
          },
          {
            label: "次に読むページ",
            items: [
              {
                href: "/uiux/ai-quality",
                title: "AIと仕上げる・品質と倫理",
                description: "10原則・WCAG・ダークパターンで検収する",
                icon: "Sparkles",
              },
            ],
          },
        ]}
      />

      {/* ── PageDrill */}
      <PageDrill
        groups={[
          { label: "基礎編ドリル", questions: layoutQuestions },
          { label: "応用編ドリル", questions: layoutAdvancedQuestions },
        ]}
      />
    </div>
  );
}
