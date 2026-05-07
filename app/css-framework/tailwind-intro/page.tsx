import {
  Wand2,
  Layers,
  Zap,
  FileCode2,
  Boxes,
  Pencil,
  Code2,
  CheckCircle,
  AlertTriangle,
  Puzzle,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
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
import { tailwindIntroQuestions } from "@/content/questions/css-framework/tailwind-intro";

export const metadata = {
  title: "Tailwind CSS とは | Web開発図解",
  description:
    "Tailwind CSSのユーティリティクラスの考え方・従来CSSとの違い・なぜTailwindが選ばれるのかを図解で解説。",
};

export default function TailwindIntroPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/css-framework" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← CSSフレームワーク に戻る
        </Link>
      </div>

      <Hero
        category="CSSフレームワーク"
        title="Tailwind CSS とは"
        subtitle={"「クラスを並べるだけ」——ユーティリティファーストの設計思想"}
        body={"CSSファイルを書かずに、HTMLのclassNameだけでスタイルが完成する仕組みを掴む。"}
        accentColor="cyan"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "ユーティリティクラスとは何か（小さなクラスを組み合わせる方法）",
          "従来のCSS（BEM / CSS Modules）との根本的な違い",
          "なぜTailwindが現代フロントエンドで選ばれるのか",
        ]}
        prerequisites={[
          "CSSとは「HTMLの見た目を指定するもの」という基礎知識",
          "class=\"...\" でHTMLにスタイルを当てる経験がある",
          "font-size や color など基本的なCSSプロパティを知っている",
        ]}
        outOfScope={[
          "tailwind.config.js でのカスタムテーマ定義（応用編で扱う）",
          "プラグインの作成と導入",
          "PurgeCSS / ビルド最適化の詳細な仕組み",
        ]}
      />

      <OnePageSummary
        keyMessage="Tailwind CSSは小さなユーティリティクラスを組み合わせてスタイルをあてるフレームワーク。CSSファイルを別途書かず、HTMLのclassNameに text-lg や bg-cyan-500 などを並べるだけでスタイルが完成する。"
        metaphorTitle="積み木と彫刻"
        metaphorPoints={[
          {
            label: "ユーティリティクラス",
            real: "text-lg・bg-white・p-4 など、1つのプロパティだけを担当する小さなクラス。積み木のパーツ。",
            metaphor: "積み木のパーツ",
          },
          {
            label: "従来CSS（BEM）",
            real: "CSSファイルに .card{ background: white; padding: 16px; } と書く方法。岩から形を削り出す彫刻。",
            metaphor: "岩を削る彫刻",
          },
          {
            label: "className 属性",
            real: "積み木を並べる設計図。どのパーツをどの順に並べるかを指定する場所。",
            metaphor: "積み木の設計図",
          },
          {
            label: "Tailwindのビルド",
            real: "使ったクラスだけを検出してCSSを生成。使わない積み木は出荷しない。",
            metaphor: "使うパーツだけ出荷",
          },
        ]}
        definition="Tailwind CSSとはユーティリティファーストのCSSフレームワーク。個別のCSSプロパティに対応した小さなクラスを組み合わせることで、CSSファイルを別途書かずにスタイルを実現する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「従来のCSSとTailwindで何が変わるのか」を同じボタンを作る例で比較してみましょう。
        </p>

        {/* ── 概念図A: 従来CSS vs Tailwind ── */}
        <ConceptDiagram
          title="概念図A"
          description="同じ「青いボタン」を作るとき、従来CSSとTailwindで何が変わるか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 従来CSS */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileCode2 className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-semibold text-gray-300">従来CSS（BEM）</p>
              </div>
              <div
                className="rounded-lg border p-3 font-mono text-xs leading-relaxed mb-3"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p className="text-gray-500 mb-1">{"/* button.css */"}</p>
                <p className="text-blue-300">.btn-primary {"{"}</p>
                <p className="ml-3 text-gray-300">background: #3b82f6;</p>
                <p className="ml-3 text-gray-300">color: white;</p>
                <p className="ml-3 text-gray-300">padding: 8px 16px;</p>
                <p className="ml-3 text-gray-300">border-radius: 6px;</p>
                <p className="ml-3 text-gray-300">font-weight: 600;</p>
                <p className="text-blue-300">{"}"}</p>
                <p className="mt-2 text-gray-500">{"/* HTML */"}</p>
                <p className="text-green-300">{"<button class=\"btn-primary\">"}</p>
                <p className="ml-3 text-gray-300">送信</p>
                <p className="text-green-300">{"</button>"}</p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span>CSSファイルとHTMLファイルを行き来する</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span>クラス名を自分で考えて命名する必要がある</span>
                </div>
              </div>
            </div>

            {/* Tailwind */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(6,182,212,0.05)",
                borderColor: "rgba(6,182,212,0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="w-4 h-4 text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-300">Tailwind CSS</p>
              </div>
              <div
                className="rounded-lg border p-3 font-mono text-xs leading-relaxed mb-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-gray-500 mb-1">{"// JSX（CSSファイル不要）"}</p>
                <p className="text-green-300">{"<button"}</p>
                <p className="ml-3">
                  <span className="text-sky-300">className</span>
                  <span className="text-gray-300">{"=\""}</span>
                </p>
                <p className="ml-5 text-cyan-300">bg-blue-500 text-white</p>
                <p className="ml-5 text-cyan-300">px-4 py-2 rounded</p>
                <p className="ml-5 text-cyan-300">font-semibold</p>
                <p className="ml-3 text-gray-300">{"\">"}</p>
                <p className="ml-3 text-gray-300">送信</p>
                <p className="text-green-300">{"</button>"}</p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>CSSファイルを書かずに完結する</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>クラス名を考えなくていい（決まっている）</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            どちらも同じ青いボタンができる。違いは「スタイルをどこに書くか」と「名前を考えるかどうか」。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          コードの違いが分かりました。次は「積み木のパーツ」であるユーティリティクラスをどう組み合わせるかを見てみましょう。
        </p>

        {/* ── 概念図B: クラスの組み合わせ ── */}
        <ConceptDiagram
          title="概念図B"
          description="1つ1つのクラスが1つのCSSプロパティを担当する。並べるほど見た目が完成する。"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
                クラスを1つずつ追加していく
              </p>
              <div className="space-y-3">
                {[
                  { cls: "text-white", effect: "文字色: 白", preview: "送信" },
                  { cls: "bg-cyan-500", effect: "背景色: シアン", preview: "送信" },
                  { cls: "px-4 py-2", effect: "左右padding16px / 上下8px", preview: "送信" },
                  { cls: "rounded-lg", effect: "角丸: 8px", preview: "送信" },
                  { cls: "font-semibold", effect: "フォント太さ: 600", preview: "送信" },
                  { cls: "hover:bg-cyan-600", effect: "ホバー時: 濃いシアンに変化", preview: "送信" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="rounded border px-2 py-1 font-mono text-xs text-cyan-300 flex-shrink-0 w-44"
                      style={{ backgroundColor: "#1a1d2a", borderColor: "rgba(6,182,212,0.3)" }}
                    >
                      {item.cls}
                    </div>
                    <span className="text-gray-600 flex-shrink-0">→</span>
                    <span className="text-xs text-gray-400 flex-1">{item.effect}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-lg border p-4 flex items-center justify-center"
              style={{ backgroundColor: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.3)" }}
            >
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-3">全部並べると...</p>
                <button
                  className="bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                  style={{ backgroundColor: "#22d3ee", color: "#0f1117" }}
                >
                  送信
                </button>
                <p className="text-xs text-cyan-400 mt-2 font-mono">
                  {"bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold"}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            「積み木を並べる」イメージ。クラスを追加するほど見た目が完成していく。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、CSSファイルを書かなくていいって言われたんですけど……それってちゃんとスタイルが当たるんですか？ なんか不安で。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "積み木と彫刻を想像してください、マジさん。\n従来のCSSは「岩から形を削り出す彫刻」。一枚のCSSファイルという岩塊から、.card { } .button { } と削り出していく方法です。\nTailwindは「積み木を並べる」方法。text-white・bg-cyan-500・px-4 という小さなパーツを組み合わせるだけでスタイルが完成します。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "あ、積み木の方が後で組み替えるのが楽そうですね！ 彫刻だと削ったら戻せないですし……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "まさに。クラスを変えるだけでデザインが変わるので、CSSファイルを探し回る必要がありません。\nHTMLとスタイルが同じ場所にあるので、コンポーネントを読めばそのまま見た目が分かります。",
          },
          {
            speaker: "maji",
            emotion: "rebel",
            text: "でも、className がずらずら長くなって読みにくくなりませんか？ ボク、長い className を見ただけでうんざりします……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "それは最初に誰でも感じる違和感です。\nただ、Reactではコンポーネントに切り出すので、長いclassNameは1か所にまとまります。\nCSSファイルを行き来して探す手間と、className が少し長いのとでは、後者の方がずっとマシです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか！ じゃあ、CSSファイルは完全にゼロになるんですか？ globals.cssとかも？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "globals.cssは1ファイルだけ残ります。そこでTailwindを初期化する設定を書きます。\n個別コンポーネント用のCSSファイルはほぼ不要になります。\n「全部1か所に書く」から「必要なスタイルを必要な場所（className）に書く」への転換なんです、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["従来CSS（BEM）", "Tailwind CSS"]}
          rows={[
            {
              label: "スタイルの書き場所",
              cells: ["CSSファイル（別ファイル）", "HTMLのclassName属性"],
              highlightCol: 1,
            },
            {
              label: "クラス名を考える必要",
              cells: ["あり（.card__titleなど）", "なし（クラス名は決まっている）"],
              highlightCol: 1,
            },
            {
              label: "スタイルの探し方",
              cells: ["CSSファイルを開いて探す", "class属性を見るだけ"],
              highlightCol: 1,
            },
            {
              label: "ビルドサイズ",
              cells: ["使わないCSSも含まれがち", "使ったクラスだけ生成される"],
              highlightCol: 1,
            },
          ]}
          note="どちらが「正解」ではなく、用途と好みで選ぶ。ただし現代のReact / Next.jsプロジェクトではTailwindが標準に近い。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はTailwindのビルドプロセス・JITモード・カスタム設定など、より深い内容です。まずクラスを書いて使えるようになってから読んでください。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — ビルドの仕組みとカスタマイズ
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Tailwindはどうやって「使ったクラスだけのCSS」を生成しているのかと、自分でテーマをカスタマイズする方法を確認します。
        </p>

        <TermNote
          terms={[
            {
              word: "JIT（Just-in-Time）",
              definition:
                "クラスを書いた瞬間にCSSを生成するビルドモード。現在のTailwind v3以降ではデフォルト。開発中も本番と同じCSSが生成される。",
            },
            {
              word: "content 設定",
              definition:
                "tailwind.config.js の content 配列。Tailwindがクラスを検出するファイルのパターンを指定する。ここに書いたファイルだけがスキャンされる。",
            },
            {
              word: "tailwind.config.js",
              definition:
                "テーマカラー・余白・フォントなど、Tailwindのデザインシステムをカスタマイズする設定ファイル。extend キーで既存テーマを拡張できる。",
            },
            {
              word: "任意値クラス（角括弧記法）",
              definition:
                "p-[13px] や text-[#1a2b3c] のように、角括弧の中に任意の値を書けるTailwind v3の機能。テーマにない値を使いたいときのエスケープハッチ。",
            },
          ]}
        />

        {/* ── 概念図C: ビルドプロセス ── */}
        <ConceptDiagram
          title="概念図C"
          description="Tailwindはどうやって「使ったクラスだけのCSS」を作るのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Code2}
              title="JSXを書く"
              subtitle="className=\"bg-cyan-500 p-4\""
            />
            <FlowArrow label="ビルド時にスキャン" direction="right" />
            <FlowCard
              Icon={Layers}
              title="クラスを検出"
              subtitle="content設定のファイルを読む"
              highlight
              accentColor="cyan"
            />
            <FlowArrow label="使ったクラスだけ" direction="right" />
            <FlowCard
              Icon={Zap}
              title="CSS生成"
              subtitle="bg-cyan-500 と p-4 のCSSだけ出力"
            />
            <FlowArrow label="デプロイ" direction="right" />
            <FlowCard
              Icon={Boxes}
              title="軽量なCSS"
              subtitle="未使用クラスのCSS0バイト"
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-3">tailwind.config.js の content 設定</p>
            <div className="font-mono text-xs leading-relaxed">
              <p className="text-blue-300">module.exports = {"{"}</p>
              <p className="ml-4">
                <span className="text-sky-300">content</span>
                <span className="text-gray-300">: [</span>
              </p>
              <p className="ml-8">
                <span className="text-green-300">{'"./app/**/*.{js,ts,jsx,tsx}"'}</span>
                <span className="text-gray-500">,</span>
                <span className="text-gray-500 ml-2">{"// ← このファイルをスキャン"}</span>
              </p>
              <p className="ml-8">
                <span className="text-green-300">{'"./components/**/*.{js,ts,jsx,tsx}"'}</span>
              </p>
              <p className="ml-4 text-gray-300">],</p>
              <p className="ml-4">
                <span className="text-sky-300">theme</span>
                <span className="text-gray-300">: {"{"}</span>
              </p>
              <p className="ml-8">
                <span className="text-sky-300">extend</span>
                <span className="text-gray-300">: {"{"} {"}"}</span>
                <span className="text-gray-500 ml-2">{"// ← ここでカスタムカラーや余白を追加"}</span>
              </p>
              <p className="ml-4 text-gray-300">{"}"}</p>
              <p className="text-blue-300">{"}"}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            content に指定したファイルをスキャンし、使ったクラスのみCSSを生成する。未使用は0バイト。
          </p>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 ユーティリティクラスとは">
          <p>
            ユーティリティクラスとは、1つのCSSプロパティだけを担当する小さなクラスのこと。
            たとえば <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>text-lg</code> は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>font-size: 1.125rem</code>{" "}
            だけを指定する。これを複数並べることでスタイルを組み立てる。
          </p>
          <p>
            従来のCSSでは <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>.card {"{"} padding: 16px; background: white; ... {"}"}</code>{" "}
            のように複数プロパティを1クラスにまとめる「コンポーネントクラス」が主流だった。
            Tailwindはこれを180度転換し、「1クラス = 1プロパティ」の方針をとる。
          </p>
          <CodeBlock
            title="utility-classes.tsx"
            language="jsx"
            code={`// 従来CSS: .card { background: white; padding: 16px; border-radius: 8px; }
// HTML: <div class="card">

// Tailwind: クラスを並べるだけ
<div className="bg-white p-4 rounded-lg shadow-md">
  <p className="text-gray-800 text-sm font-semibold">カードタイトル</p>
  <p className="text-gray-500 text-xs mt-1">説明文</p>
</div>`}
          />
          <KeyPoint>
            「クラスを見れば見た目が分かる」がTailwindの強み。CSSファイルを開かなくてもJSXを読むだけでスタイルの全体像が把握できる。コードレビューのときにもCSSファイルを行き来する必要がなくなる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 なぜ現代のフロントエンドで選ばれるか">
          <p>
            Tailwindが急速に普及した背景には、Reactコンポーネント設計との相性の良さがある。
            コンポーネントに切り出せばclassNameが長くなっても1か所に収まり、
            「HTMLとスタイルが同じファイルにある」というコロケーション（近接配置）の恩恵を受けられる。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: Puzzle,
                title: "コンポーネント設計との相性",
                subtitle: "HTMLとスタイルを一か所に",
                description: "Reactの1コンポーネント = 1ファイルという設計と、Tailwindのclassなのに一体感がある。スタイルを探すためにファイルをまたがなくていい。",
                accentColor: "cyan",
              },
              {
                Icon: Zap,
                title: "設計のスピード",
                subtitle: "クラス名を考えなくていい",
                description: "BEMのように .card__title--active などの命名規則を考える必要がない。Tailwindのクラス名は決まっているので、迷う時間が消える。",
                accentColor: "cyan",
              },
              {
                Icon: Boxes,
                title: "ビルドサイズの最適化",
                subtitle: "使ったCSSだけ出荷",
                description: "JITモードで使ったクラスのCSSだけを生成する。未使用スタイルが増えていく従来CSSの問題を根本から解決。",
                accentColor: "cyan",
              },
            ]}
          />
          <KeyPoint>
            Tailwindが全プロジェクトに最適なわけではない。長期的に保守する大規模CSSや、デザインシステムを別で持つチームではCSS Modulesの方が向く場合もある。ツールの特性を理解した上で選ぶことが大切。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 よくある誤解">
          <CorrectionCard
            misconception="Tailwindはクラス名が長くなるので、コードが汚くなる"
            correction="Reactコンポーネントに切り出せば、classNameが長くなるのは1か所だけ。コンポーネントの外からは&lt;Button&gt;と書くだけで使えるので、利用側はシンプルになる。"
            reason="長いclassNameが問題になるのは「コンポーネント化せずにHTMLをベタ書きする場合」。Reactのコンポーネント設計と組み合わせると、逆にスタイルの管理が楽になる。"
          />
          <WarningPoint>
            Tailwindのクラスは「ユーティリティ」なので、同じ見た目のパーツを作るたびに同じクラスの羅列を書くことになる。コピペが増えたと感じたら、それはコンポーネントに切り出すサインだと思ってよい。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/css-framework/common-classes",
            title: "よく使うクラス",
            description: "次のステップ。flex・grid・spacing の頻出クラスを実践で覚える",
            icon: "LayoutGrid",
          },
          {
            href: "/css-framework/responsive",
            title: "レスポンシブ対応",
            description: "sm:・md:・lg: プレフィックスでモバイルファーストに設計する",
            icon: "Smartphone",
          },
          {
            href: "/html-css/responsive",
            title: "CSSのレスポンシブ基礎",
            description: "Tailwind以前のメディアクエリの仕組みを確認したいときに",
            icon: "Code2",
          },
        ]}
      />

      <PageDrill questions={tailwindIntroQuestions} />
    </div>
  );
}
