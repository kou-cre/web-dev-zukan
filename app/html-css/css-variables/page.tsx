import {
  Variable,
  Palette,
  RefreshCw,
  Layers,
  Code2,
  Lock,
  Wrench,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { cssVariablesQuestions } from "@/content/questions/html-css/css-variables";

export const metadata = {
  title: "CSS変数 | Web開発図解",
  description:
    "CSS変数（カスタムプロパティ）を図解で解説。--color-primary のような再利用可能な変数の定義と活用、ダークモード切り替えの仕組みまで理解する。",
};

export default function CssVariablesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/html-css" className="text-xs text-gray-500 hover:text-white transition-colors">
          {"← HTML / CSS基礎に戻る"}
        </Link>
      </div>

      <Hero
        category="HTML / CSS基礎"
        title="CSS変数"
        subtitle={"色・サイズ・余白を1箇所で管理して、変更を楽にする"}
        body={"--color-primary: #3b82f6 のように定義して var(--color-primary) で呼び出す。プロジェクト全体の色を一括変更できる。"}
        accentColor="orange"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "CSS変数（カスタムプロパティ）の定義と呼び出し方",
          "変数を :root に置いてサイト全体で使う方法",
          "変数を切り替えてダークモードを実現する仕組み",
        ]}
        prerequisites={[
          "CSSはHTMLの見た目を制御するための言語",
          "セレクタ（.class・#id・:root）の概念",
          "色の指定（#hex・rgb）の基本",
        ]}
        outOfScope={[
          "@property によるアニメーション可能なカスタムプロパティ",
          "CSS変数とJavaScriptの連携（setProperty）",
          "CSS変数の継承とスコープの詳細な挙動",
        ]}
      />

      <OnePageSummary
        keyMessage="CSS変数とは、色やサイズなどの値に名前を付けて再利用できる仕組み。--color-primary: #3b82f6 と定義して var(--color-primary) で何度でも呼び出せる。色を1箇所変えるだけでサイト全体が更新される。ダークモードの実装にも使われる。"
        metaphorTitle="デザイントークンの引き出し"
        metaphorPoints={[
          {
            label: "--color-primary",
            real: "「メインカラー」という名前の引き出し。引き出しを開ける（var()）と中の色が出てくる",
            metaphor: "ブランドカラーの引き出し",
          },
          {
            label: ":root への定義",
            real: "全部屋からアクセスできる廊下に引き出し棚を置くこと。どこからでも変数を参照できる",
            metaphor: "廊下の引き出し棚",
          },
          {
            label: "変数の変更",
            real: "引き出しの中身を入れ替えると、その引き出しを開けているすべての場所の色が変わる",
            metaphor: "一括カラー変更",
          },
        ]}
        definition="CSS変数（カスタムプロパティ）とは、CSS内で定義して再利用できる変数。--で始まる名前で定義し、var()で呼び出す。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「定義と呼び出し」という基本の仕組みを確認してから、実際にどこで役立つかを見ていきます。
        </p>

        {/* ── 概念図A: 定義と呼び出しの流れ ── */}
        <ConceptDiagram
          title="概念図A"
          description="CSS変数の定義と呼び出しの仕組み"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Variable}
              title="変数を定義"
              subtitle=":root { --color-primary: #3b82f6 }"
              accentColor="orange"
            />
            <FlowArrow label="定義した変数を" sublabel="呼び出す" direction="right" />
            <FlowCard
              Icon={Code2}
              title="var() で参照"
              subtitle="color: var(--color-primary)"
              highlight
              accentColor="orange"
            />
            <FlowArrow label="適用" direction="right" />
            <FlowCard
              Icon={Palette}
              title="スタイル適用"
              subtitle="color: #3b82f6 として扱われる"
              accentColor="orange"
            />
          </div>

          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"/* Step 1: :root に変数を定義 */"}</p>
            <p><span className="text-orange-300">:root</span><span className="text-gray-300">{" {"}</span></p>
            <p className="ml-4"><span className="text-blue-300">--color-primary</span><span className="text-gray-300">: </span><span className="text-green-300">#3b82f6</span><span className="text-gray-300">;</span></p>
            <p className="ml-4"><span className="text-blue-300">--color-secondary</span><span className="text-gray-300">: </span><span className="text-green-300">#6b7280</span><span className="text-gray-300">;</span></p>
            <p className="ml-4"><span className="text-blue-300">--spacing-md</span><span className="text-gray-300">: </span><span className="text-green-300">16px</span><span className="text-gray-300">;</span></p>
            <p><span className="text-gray-300">{"}"}</span></p>
            <p className="mt-3 text-gray-500">{"/* Step 2: var() で呼び出す */"}</p>
            <p><span className="text-orange-300">.button</span><span className="text-gray-300">{" {"}</span></p>
            <p className="ml-4"><span className="text-blue-300">background-color</span><span className="text-gray-300">: </span><span className="text-purple-300">var</span><span className="text-gray-300">(</span><span className="text-blue-300">--color-primary</span><span className="text-gray-300">);</span></p>
            <p className="ml-4"><span className="text-blue-300">padding</span><span className="text-gray-300">: </span><span className="text-purple-300">var</span><span className="text-gray-300">(</span><span className="text-blue-300">--spacing-md</span><span className="text-gray-300">);</span></p>
            <p><span className="text-gray-300">{"}"}</span></p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            --color-primary を変更すると、var(--color-primary) を使っているすべての場所が一括で更新される。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          基本の使い方が分かりました。次はCSS変数が「変数なしの場合」と比べてどれほど便利かを確認します。
        </p>

        {/* ── 概念図B: 変数なし vs 変数あり ── */}
        <ConceptDiagram
          title="概念図B"
          description="色を変更するとき — 変数なしと変数ありの作業量の差"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 変数なし */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-sm font-semibold text-gray-400 mb-3">変数なし（直書き）</p>
              <div className="font-mono text-xs space-y-0.5 leading-loose text-gray-400">
                <p><span className="text-gray-500">.header {"{"}</span></p>
                <p className="ml-2">background: <span className="text-red-300">#3b82f6</span>;</p>
                <p><span className="text-gray-500">{"}"}</span></p>
                <p><span className="text-gray-500">.button {"{"}</span></p>
                <p className="ml-2">color: <span className="text-red-300">#3b82f6</span>;</p>
                <p><span className="text-gray-500">{"}"}</span></p>
                <p><span className="text-gray-500">.link {"{"}</span></p>
                <p className="ml-2">border-color: <span className="text-red-300">#3b82f6</span>;</p>
                <p><span className="text-gray-500">{"}"}</span></p>
                <p><span className="text-gray-500">.badge {"{"}</span></p>
                <p className="ml-2">background: <span className="text-red-300">#3b82f6</span>;</p>
                <p><span className="text-gray-500">{"}"}</span></p>
              </div>
              <p className="text-xs text-red-300/70 mt-3 leading-relaxed">
                色変更時に全箇所を手動で検索・置換する必要がある
              </p>
            </div>

            {/* 変数あり */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(249,115,22,0.05)", borderColor: "rgba(249,115,22,0.3)" }}
            >
              <p className="text-sm font-semibold text-orange-300 mb-3">変数あり（一元管理）</p>
              <div className="font-mono text-xs space-y-0.5 leading-loose text-gray-300">
                <p><span className="text-orange-300">:root {"{"}</span></p>
                <p className="ml-2"><span className="text-blue-300">--color-primary</span>: <span className="text-green-300">#3b82f6</span>;</p>
                <p><span className="text-orange-300">{"}"}</span></p>
                <p className="mt-1"><span className="text-gray-500">.header {"{"}</span></p>
                <p className="ml-2">background: <span className="text-purple-300">var</span>(<span className="text-blue-300">--color-primary</span>);</p>
                <p><span className="text-gray-500">{"}"}</span></p>
                <p><span className="text-gray-500">.button {"{"}</span></p>
                <p className="ml-2">color: <span className="text-purple-300">var</span>(<span className="text-blue-300">--color-primary</span>);</p>
                <p><span className="text-gray-500">{"}"}</span></p>
              </div>
              <p className="text-xs text-orange-300/70 mt-3 leading-relaxed">
                :root の1行を変更するだけで全箇所が更新される
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ──────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、CSSの色ってどこにでも直接 #3b82f6 って書いていいんですよね？ ボクはずっとそうしてきたんですが……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "動くのは確かです。\nでも想像してみてください、マジさん。\nクライアントから『ブランドカラーを今日から青ではなくオレンジに変えてほしい』と言われたとき、#3b82f6 を全ファイルから検索して置換する作業を…。\nCSS変数を使っていれば、:root の1行を変えるだけで済みます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え、1行だけで全部変わるんですか！ ボク今まで何十箇所も手動で……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "--color-primary: #3b82f6 と定義して、使う側は var(--color-primary) と書くだけです。\n変数はダッシュ2つから始まる名前を付ける約束で、どんな名前でも構いません。\n:root というセレクタに置くと、ページのどこからでも参照できます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ ダークモードってCSS変数でできると聞いたんですが……本当ですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "ちょうどCSS変数の強みが発揮される場面です。\nライトモードでは --bg-color: white / --text-color: black と定義しておき、ダークモード時に :root[data-theme='dark'] { --bg-color: #0f1117 } のように上書きするだけです。\nJavaScriptでdata-theme属性を切り替えれば、変数が更新されてページ全体が瞬時に変わります。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "うわあ、便利すぎる。でも変数の名前がたくさんになってくると管理が大変になりませんか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "おっしゃる通りで、命名規則が重要です。\n一般的には --color-primary / --color-text / --spacing-sm / --font-size-base のように『カテゴリ-役割-修飾子』の形で命名するとスッキリします。\nTailwind CSSもこの仕組みの上に成り立っていて、v4からは内部的にCSS変数を大量に使うようになりました。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "つまり、CSS変数はデザインの『設定ファイル』みたいなものですね！ ボク、これを使えばプロのデザイナーみたいになれますね！",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["メリット", "デメリット"]}
          rows={[
            {
              label: "直書き（#hex直接）",
              cells: ["すぐ書ける・分かりやすい", "変更時に全箇所を手動で修正"],
              highlightCol: 1,
            },
            {
              label: "CSS変数（--var）",
              cells: ["1箇所の変更で全体に反映・ダークモード対応が楽", "定義と参照の2ステップが必要"],
              highlightCol: 0,
            },
          ]}
          note="プロジェクトの規模が大きくなるほど CSS変数のメリットが際立つ。チーム開発では命名規則を統一することが重要。Tailwind CSS v4 では内部的に CSS変数が多用されている。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はダークモード実装・CSS変数のスコープ・JavaScriptとの連携など、より実践的な内容です。"
      />

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 命名規則のベストプラクティス">
          <p>
            CSS変数の名前は自由ですが、プロジェクトで統一した命名規則を持つことが重要です。
            よく使われるパターンは{" "}
            <strong className="text-white">カテゴリ-役割-修飾子</strong>の形式です。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Palette,
                title: "色の変数",
                subtitle: "--color-カテゴリ",
                description: "--color-primary / --color-secondary / --color-text / --color-bg / --color-border のような命名が一般的。",
                accentColor: "orange",
              },
              {
                Icon: Layers,
                title: "余白・サイズの変数",
                subtitle: "--spacing-サイズ / --font-size-種類",
                description: "--spacing-xs / --spacing-sm / --spacing-md / --font-size-base / --border-radius-md など。",
                accentColor: "orange",
              },
            ]}
          />
          <CodeBlock
            title="design-tokens.css"
            language="css"
            code={`:root {
  /* Colors */
  --color-primary:   #3b82f6;
  --color-secondary: #6b7280;
  --color-text:      #f3f4f6;
  --color-bg:        #0f1117;
  --color-border:    #2d3048;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;

  /* Typography */
  --font-size-sm:   14px;
  --font-size-base: 16px;
  --font-size-lg:   20px;
  --font-size-xl:   24px;
}`}
          />
          <KeyPoint>
            設計の最初にCSS変数の一覧（デザイントークン）を定義しておくと、後からテーマ変更やブランドカラー更新が1箇所の変更で済む。チームで開発する際は命名規則をREADMEに明記することで、変数の乱立を防げる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 CSS変数でダークモードを実装する（応用編）">
          <p>
            CSS変数の最も実用的な応用例がダークモードです。
            ライトモードの色を:rootに定義し、ダークモード時は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fb923c" }}>
              {"[data-theme='dark']"}
            </code>
            セレクタで上書きします。
          </p>
          <CodeBlock
            title="dark-mode.css"
            language="css"
            code={`:root {
  --color-bg:   #ffffff;
  --color-text: #111827;
  --color-card: #f9fafb;
}

[data-theme="dark"] {
  --color-bg:   #0f1117;
  --color-text: #f3f4f6;
  --color-card: #1a1d2a;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}`}
          />
          <p>
            JavaScriptでの切り替えは1行です:
          </p>
          <CodeBlock
            title="toggle-dark-mode.js"
            language="javascript"
            code={`// ダークモード切り替え
function toggleDarkMode() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
}

// または prefers-color-scheme メディアクエリで自動切り替え
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f1117;
    --color-text: #f3f4f6;
  }
}`}
          />
          <CorrectionCard
            misconception="ダークモード対応には全CSSを2セット書く必要がある"
            correction="CSS変数を使えば色の定義だけを切り替えるだけで、残りのCSSはそのまま使い回せる"
            reason="CSS変数は継承されるため、:root の変数を変えると var() を参照している全要素が連動して更新される。この仕組みがダークモードの実装コストを大幅に下げる。"
          />
          <WarningPoint>
            CSS変数はInternet Explorer（IE）ではサポートされていない。2026年現在、IEのサポートは実質不要になっているが、極めて古いブラウザをターゲットにする場合は代替手段が必要。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/html-css/responsive",
            title: "レスポンシブデザイン",
            description: "CSS変数とメディアクエリを組み合わせて使う",
            icon: "Smartphone",
          },
          {
            href: "/html-css/flexbox",
            title: "Flexbox",
            description: "gapやpaddingにCSS変数を活用する",
            icon: "LayoutGrid",
          },
          {
            href: "/html-css/semantic",
            title: "セマンティックHTML",
            description: "構造（HTML）とデザイン（CSS変数）を組み合わせる",
            icon: "FileCode2",
          },
        ]}
      />

      <PageDrill questions={cssVariablesQuestions} />
    </div>
  );
}
