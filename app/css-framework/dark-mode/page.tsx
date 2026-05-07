import {
  Moon,
  Sun,
  SunMoon,
  Code2,
  Layers,
  ToggleLeft,
  Variable,
  Monitor,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
  StackLayer,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { darkModeQuestions } from "@/content/questions/css-framework/dark-mode";

export const metadata = {
  title: "ダークモード対応 | Web開発図解",
  description:
    "Tailwindのdark:クラスとCSS変数を使ったダークモード切り替えの仕組みを図解で解説。next-themesの役割も分かる。",
};

export default function DarkModePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/css-framework" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← CSSフレームワーク に戻る
        </Link>
      </div>

      <Hero
        category="CSSフレームワーク"
        title="ダークモード対応"
        subtitle={"dark: クラスの仕組みとCSS変数——電気スイッチの仕組みを理解する"}
        body={"htmlタグに dark クラスが付くと dark: のスタイルが全部起動する。そのスイッチを管理するのが next-themes。"}
        accentColor="cyan"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "dark: プレフィックスでダークモード用スタイルを書く方法",
          "htmlタグに dark クラスが付くとどうなるかの仕組み",
          "CSS変数（--color-background など）を使ったテーマ切り替えの考え方",
        ]}
        prerequisites={[
          "Tailwindの基本クラスを知っている（common-classes を読んだ）",
          "CSS の var(--変数名) 記法を見たことがある",
          "Reactの useState と useEffect の基本を知っている",
        ]}
        outOfScope={[
          "shadcn/ui のテーマシステムとCSS変数の詳細な連携（shadcn ページで扱う）",
          "システム設定に連動する prefers-color-scheme の使い方",
          "アニメーション付きのテーマ切り替え実装",
        ]}
      />

      <OnePageSummary
        keyMessage="Tailwindの dark: プレフィックスは、htmlタグに class='dark' が付いているときだけ適用されるスタイルを定義する。このクラスの付け外しを管理するのが next-themes ライブラリ。dark: を書くだけでは自動的にダークにはならない。"
        metaphorTitle="電気のスイッチ"
        metaphorPoints={[
          {
            label: "dark: クラス",
            real: "スイッチがONになったときの状態を設定する。スイッチを押す役割ではなく、「ONならこうなる」という設定を書く場所",
            metaphor: "電灯のON時の設定",
          },
          {
            label: "htmlタグの class='dark'",
            real: "実際のスイッチのON/OFF。このクラスが付くと dark: のスタイルが全部起動する",
            metaphor: "電気スイッチ本体",
          },
          {
            label: "next-themes",
            real: "スイッチを押す手の部分。ボタンのクリックでhtmlタグのdarkクラスを切り替えてくれる",
            metaphor: "スイッチを押す手",
          },
          {
            label: "CSS変数",
            real: "--background などの変数を用意して、ダークモード時に変数の値を変える。コンポーネントは変数を見るだけでよくなる",
            metaphor: "色を集中管理する調光パネル",
          },
        ]}
        definition="ダークモードとはUIのカラーテーマを明るい（ライト）から暗い（ダーク）に切り替える機能。Tailwindではhtmlタグのdarkクラスを起点に、dark:プレフィックスのスタイルが適用される。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「dark: クラスを書くだけでダークにはならない理由」を仕組みから確認しましょう。
        </p>

        {/* ── 概念図A: dark:の仕組み ── */}
        <ConceptDiagram
          title="概念図A"
          description="dark: プレフィックスはどんなCSSに変換されるのか？"
        >
          <div className="space-y-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Tailwindの dark: クラスが生成するCSS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className="rounded-lg border p-3 font-mono text-xs leading-relaxed"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <p className="text-gray-500 mb-1">{"/* あなたが書くコード */"}</p>
                  <p className="text-green-300">{"<div"}</p>
                  <p className="ml-2 text-sky-300">className=</p>
                  <p className="ml-4">
                    <span className="text-gray-300">{"'"}</span>
                    <span className="text-cyan-300">bg-white</span>
                  </p>
                  <p className="ml-4">
                    <span className="text-cyan-300">dark:bg-gray-900</span>
                    <span className="text-gray-300">{"'"}</span>
                  </p>
                  <p className="text-green-300">{">"}</p>
                </div>
                <div
                  className="rounded-lg border p-3 font-mono text-xs leading-relaxed"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <p className="text-gray-500 mb-1">{"/* 生成されるCSS */"}</p>
                  <p className="text-blue-300">.bg-white {"{"}</p>
                  <p className="ml-3 text-gray-300">background: white;</p>
                  <p className="text-blue-300">{"}"}</p>
                  <p className="mt-2 text-blue-300">.dark .dark:bg-gray-900 {"{"}</p>
                  <p className="ml-3 text-gray-300">background: #111827;</p>
                  <p className="text-blue-300">{"}"}</p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.3)" }}
            >
              <p className="text-xs font-semibold text-cyan-300 mb-2">重要: htmlタグに dark クラスが必要</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                生成されたCSSの <code className="text-xs font-mono text-cyan-300">.dark .dark:bg-gray-900</code> は、
                親要素に <code className="text-xs font-mono text-cyan-300">.dark</code> クラスがないと適用されない。
                つまり <strong className="text-white">html要素に class={"\"dark\""} を付ける</strong> ことが大前提。
                dark: を書くだけでは自動的にダークにはならない。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            dark: は「スイッチの設定」。スイッチを押す（htmlにdarkを付ける）のは別のコードが担当。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          dark: の仕組みが分かりました。次は「htmlタグに dark クラスを付け外しする仕組み」を確認します。
        </p>

        {/* ── 概念図B: next-themes の仕組み ── */}
        <ConceptDiagram
          title="概念図B"
          description="next-themes はどうやって dark クラスを管理するのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={ToggleLeft}
              title="ユーザーがボタンを押す"
              subtitle="ダークモード切り替えボタン"
            />
            <FlowArrow label="イベント発火" direction="right" />
            <FlowCard
              Icon={Code2}
              title="setTheme('dark')"
              subtitle="next-themes のAPI"
              highlight
              accentColor="cyan"
            />
            <FlowArrow label="html要素を更新" direction="right" />
            <FlowCard
              Icon={Moon}
              title="html.dark が付く"
              subtitle="class='dark' が追加される"
            />
            <FlowArrow label="CSSが切り替わる" direction="right" />
            <FlowCard
              Icon={SunMoon}
              title="dark: スタイル適用"
              subtitle="全コンポーネントが変化"
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-2">{"// next-themes の基本的な使い方"}</p>
            <p>
              <span className="text-blue-300">import</span>
              <span className="text-gray-300">{" { useTheme } "}</span>
              <span className="text-blue-300">from</span>
              <span className="text-green-300">{" 'next-themes'"}</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> ThemeToggle</span>
              <span className="text-gray-300">{"() {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">const</span>
              <span className="text-gray-300">{" { theme, setTheme } = "}</span>
              <span className="text-yellow-300">useTheme</span>
              <span className="text-gray-300">();</span>
            </p>
            <p className="ml-4 mt-2">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" ("}</span>
            </p>
            <p className="ml-8">
              <span className="text-green-300">{"<button"}</span>
              <span className="text-sky-300">{" onClick"}</span>
              <span className="text-gray-300">{"={() => "}</span>
              <span className="text-yellow-300">setTheme</span>
              <span className="text-gray-300">(theme === </span>
              <span className="text-amber-300">{"'dark'"}</span>
              <span className="text-gray-300">{" ? "}</span>
              <span className="text-amber-300">{"'light'"}</span>
              <span className="text-gray-300">{" : "}</span>
              <span className="text-amber-300">{"'dark'"}</span>
              <span className="text-gray-300">{")}"}</span>
              <span className="text-green-300">{">"}</span>
            </p>
            <p className="ml-10 text-gray-300">
              {"テーマ切り替え"}
            </p>
            <p className="ml-8 text-green-300">{"</button>"}</p>
            <p className="ml-4 text-gray-300">);</p>
            <p className="text-gray-300">{"}"}</p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            next-themes が html.dark の付け外しを全部管理してくれる。自前でDOMを操作する必要がない。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "`dark:bg-gray-900` って書いたんですけど、全然反映されないんです……何が間違っているんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "`dark:` クラスは「htmlタグに dark というクラスが付いているとき」に発動します、マジさん。\nクラスを書くだけでは自動的にダークにはなりません。\n電気のスイッチと同じです。スイッチのON時の明るさを設定しても、スイッチを実際に押さないと点灯しません。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "えっ！ じゃあhtmlタグにdarkクラスを手動で付けるんですか？ それは大変そう……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "普通は `next-themes` というライブラリがその管理をしてくれます。\nボタンのクリックで setTheme を呼ぶだけで、next-themes が html 要素のクラスを切り替えてくれます。\n自分でDOMを操作する必要はありません。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "……ボク、dark: を書けば自動でダークになると思い込んでたんです。\n仕組みを全然分かっていませんでした。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "最初は誰でもそう感じます。\nただ、仕組みが分かると「CSS変数と組み合わせるともっと便利になる」と分かります。\nCSS変数を使うと、コンポーネント側は変数を参照するだけで、dark クラスが付いた瞬間にカラーが全部切り替わります。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "CSS変数と組み合わせると……コンポーネントの中に dark: をいちいち書かなくてよくなるということですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "正確な理解です。たとえば `bg-[var(--background)]` と書けば、変数が切り替わるだけで自動的に色が変わります。\nshadcn/ui はこの仕組みを使っていて、ダークモード対応が非常にシンプルになっています。\n「スイッチ（htmlのclass）」「設定（dark:クラス・CSS変数）」「管理（next-themes）」の3役が分離しているんです、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["dark:クラスだけ", "CSS変数 + dark:クラス"]}
          rows={[
            {
              label: "書く場所",
              cells: ["各コンポーネントのclassNameに dark: を書く", "CSS変数の切り替えだけ管理する"],
              highlightCol: 1,
            },
            {
              label: "カラーの一元管理",
              cells: ["各コンポーネントに分散", "CSS変数1か所で管理"],
              highlightCol: 1,
            },
            {
              label: "新しいコンポーネント追加時",
              cells: ["dark: クラスを忘れずに書く必要がある", "変数を参照するだけで自動でテーマに従う"],
              highlightCol: 1,
            },
            {
              label: "カラー変更時",
              cells: ["dark: クラスを全部探して書き換える", "CSS変数1か所を変えるだけ"],
              highlightCol: 1,
            },
          ]}
          note="小規模ならdark:クラスだけでも問題ない。コンポーネントが増えてきたらCSS変数との組み合わせが効いてくる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はシステム設定との連動（prefers-color-scheme）と、CSS変数の詳細な管理方法です。"
      />

      {/* ── 応用編 ────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — prefers-color-scheme とCSS変数の詳細
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          OSのダークモード設定に自動追従させる方法と、CSS変数でカラーシステムを管理する詳細パターンを確認します。
        </p>

        <TermNote
          terms={[
            {
              word: "prefers-color-scheme",
              definition:
                "OSのダークモード設定を検知するCSSメディア特性。@media (prefers-color-scheme: dark) { } の中にスタイルを書くとOSがダークモードのときに適用される。",
            },
            {
              word: "next-themes の ThemeProvider",
              definition:
                "アプリ全体をラップするコンポーネント。attribute='class' を指定するとhtmlタグに dark クラスを付けてくれる。defaultTheme='system' でOSに追従させられる。",
            },
            {
              word: "HSL形式",
              definition:
                "色を Hue（色相）/ Saturation（彩度）/ Lightness（明度）で表す形式。shadcn/uiのCSS変数はHSL形式を使っているため、変数の値を置き換えるだけでテーマ全体の色が変わる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="next-themes の ThemeProvider を使ったセットアップ"
        >
          <StackLayer
            Icon={Monitor}
            title="OS の設定"
            subtitle="ダークモード / ライトモード"
            iconColor="text-gray-400"
          />
          <StackLayer
            Icon={Code2}
            title="next-themes ThemeProvider"
            subtitle="OS設定を検知して html.dark を管理"
            iconColor="text-cyan-400"
          />
          <StackLayer
            Icon={Variable}
            title="CSS変数の切り替え"
            subtitle=":root と .dark の変数が切り替わる"
            iconColor="text-cyan-400"
          />
          <StackLayer
            Icon={Layers}
            title="全コンポーネントに反映"
            subtitle="var(--background) を参照しているコンポーネントが一斉に変化"
            iconColor="text-cyan-400"
            showArrow={false}
          />
          <div
            className="rounded-lg border mt-4 p-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-2">{"// layout.tsx — ThemeProvider でラップ"}</p>
            <p>
              <span className="text-blue-300">import</span>
              <span className="text-gray-300">{" { ThemeProvider } "}</span>
              <span className="text-blue-300">from</span>
              <span className="text-green-300">{" 'next-themes'"}</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-300">export default function</span>
              <span className="text-yellow-300"> RootLayout</span>
              <span className="text-gray-300">{"({ children }) {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" ("}</span>
            </p>
            <p className="ml-8">
              <span className="text-green-300">{"<ThemeProvider"}</span>
            </p>
            <p className="ml-10 text-sky-300">
              attribute="class"
            </p>
            <p className="ml-10 text-sky-300">
              defaultTheme="system"
              <span className="text-gray-500 ml-2">{"// OS設定に従う"}</span>
            </p>
            <p className="ml-10 text-sky-300">
              enableSystem
            </p>
            <p className="ml-8 text-green-300">
              {">"}
            </p>
            <p className="ml-10 text-gray-300">{"{ children }"}</p>
            <p className="ml-8 text-green-300">{"</ThemeProvider>"}</p>
            <p className="ml-4 text-gray-300">{")"}</p>
            <p className="text-gray-300">{"}"}</p>
          </div>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 dark: クラスの基本的な書き方">
          <p>
            dark: プレフィックスはレスポンシブの sm: md: lg: と同じ仕組みで動く。
            htmlタグに dark クラスが付いたときに限り、dark: の後ろのスタイルが適用される。
          </p>
          <CodeBlock
            title="dark-mode-example.tsx"
            language="jsx"
            code={`// テキストカラーをダークモードで切り替える
<p className="text-gray-900 dark:text-gray-100">
  本文テキスト
</p>

// 背景色をダークモードで切り替える
<div className="bg-white dark:bg-gray-900">
  カード
</div>

// ボーダーをダークモードで切り替える
<div className="border border-gray-200 dark:border-gray-700">
  枠線付きコンテナ
</div>

// アイコンの色もダークモードで切り替えられる
<Sun className="w-5 h-5 text-yellow-500 dark:hidden" />
<Moon className="w-5 h-5 text-cyan-400 hidden dark:block" />`}
          />
          <KeyPoint>
            dark: は「ダークモードのときだけ適用する追加スタイル」なので、必ずライトモードのスタイルとセットで書く。`dark:bg-gray-900` だけ書いてもライトモードの背景色が未設定のままになる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 CSS変数を使ったテーマ管理">
          <p>
            コンポーネントが増えてくると、各コンポーネントに dark: クラスを書き忘れるリスクが増える。
            CSS変数を使うと、変数の値を切り替えるだけで全コンポーネントのカラーが一斉に変わる。
          </p>
          <CodeBlock
            title="globals.css"
            language="css"
            code={`:root {
  --background: 0 0% 100%;    /* ライトモードの背景（白） */
  --foreground: 222 84% 5%;   /* ライトモードの文字色 */
  --primary: 196 100% 47%;    /* アクセントカラー */
}

.dark {
  --background: 222 84% 5%;   /* ダークモードの背景（ほぼ黒） */
  --foreground: 210 40% 98%;  /* ダークモードの文字色（ほぼ白） */
  --primary: 196 100% 47%;    /* アクセントカラーは同じ */
}`}
          />
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Sun,
                title: "ライトモード",
                subtitle: ":root で変数を定義",
                description: "htmlタグに dark クラスがないとき（デフォルト）。:root に書いた変数の値が使われる。",
                accentColor: "cyan",
              },
              {
                Icon: Moon,
                title: "ダークモード",
                subtitle: ".dark で変数を上書き",
                description: "htmlタグに dark クラスが付いたとき。.dark の変数が :root を上書きして全体のカラーが変わる。",
                accentColor: "cyan",
              },
            ]}
          />
          <CorrectionCard
            misconception="dark: クラスを書けばdark:クラスはすぐにダークモードで表示される"
            correction="dark: クラスが適用されるには、htmlタグに class='dark' が付いている必要がある。next-themes などのライブラリが管理しないと、dark:クラスは永遠に発動しない。"
            reason="Tailwindの dark: クラスはCSSセレクタ `.dark .dark:bg-gray-900` に変換される。.dark の親がないとこのセレクタは一致しないため、スタイルが適用されない。"
          />
        </DetailBlock>

        <DetailBlock heading="7.3 next-themes のセットアップ手順">
          <CodeBlock
            title="next-themes-setup.sh"
            language="bash"
            code={`# インストール
npm install next-themes`}
          />
          <CodeBlock
            title="layout.tsx"
            language="tsx"
            code={`import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"       // htmlタグの class 属性で管理
          defaultTheme="system"   // デフォルトはOSの設定に従う
          enableSystem            // システム設定への追従を有効化
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}
          />
          <CodeBlock
            title="theme-toggle.tsx"
            language="tsx"
            code={`'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg border p-2 text-gray-400 hover:text-white transition-colors"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  )
}`}
          />
          <WarningPoint>
            layout.tsx の html タグには suppressHydrationWarning を付けること。サーバー側でのレンダリング時とクライアント側でthemeが一致しない「ハイドレーションエラー」が発生するのを抑制するため。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/css-framework/shadcn",
            title: "shadcn/ui",
            description: "shadcn/uiのCSS変数システムとダークモードの連携",
            icon: "Package",
          },
          {
            href: "/css-framework/tailwind-intro",
            title: "Tailwind CSS とは",
            description: "ユーティリティファーストの基礎に戻りたいときに",
            icon: "Wand2",
          },
          {
            href: "/css-framework/common-classes",
            title: "よく使うクラス",
            description: "dark: クラスと組み合わせる基本クラスの一覧",
            icon: "LayoutGrid",
          },
        ]}
      />

      <PageDrill questions={darkModeQuestions} />
    </div>
  );
}
