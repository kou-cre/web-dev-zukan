import {
  Box,
  Layers,
  Code2,
  Monitor,
  Puzzle,
  GitBranch,
  FunctionSquare,
  ArrowRight,
  Home,
} from "lucide-react";

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
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { componentQuestions } from "@/content/questions/react/components";

export const metadata = {
  title: "コンポーネント | Web開発図解",
  description: "ReactのコンポーネントとJSXを図解で解説。関数コンポーネント・ツリー構造・再利用の考え方をわかりやすく。",
};

export default function ComponentsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="React"
        title="コンポーネント"
        subtitle="UIを「部品」として組み立てる考え方——Reactの設計思想の核心"
        accentColor="blue"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "コンポーネントとは何か（画面を部品に分ける考え方）",
          "JSXとは何か（JSの中にHTMLライクな記法を書く構文）",
          "関数コンポーネントの基本的な書き方",
          "なぜ画面をコンポーネントに分けるのか",
        ]}
        prerequisites={[
          "HTML/CSSの基本を知っている（タグの入れ子構造が分かる）",
          "JavaScriptの関数を書けること（function f() {} の形が分かる）",
          "なぜReactを使うのか知っている（または /javascript を読んだ）",
        ]}
        outOfScope={[
          "Virtual DOMとライフサイクルの詳細（応用編で扱う）",
          "クラスコンポーネントの書き方（レガシー。新規では書かない）",
        ]}
      />

      <OnePageSummary
        keyMessage="Reactのコンポーネントとは「画面の一部を担当する独立した部品」のこと。HTMLとJavaScriptを組み合わせたJSXで書かれ、関数として定義する。コンポーネントを組み合わせてUIを構築するのがReactの基本的な考え方。"
        metaphorTitle="家の設計図と実際の家"
        metaphorPoints={[
          { label: "コンポーネント", real: "一度書けば何度でも使い回せる設計図", metaphor: "コンポーネント" },
          { label: "JSX", real: "設計図を書くための記法（間取り図の書き方）", metaphor: "JSX" },
          { label: "レンダリング", real: "設計図をもとに実際の部屋を作ること", metaphor: "レンダリング" },
          { label: "ツリー構造", real: "部屋が廊下でつながって「家」になる入れ子の構造", metaphor: "ツリー構造" },
        ]}
        definition="コンポーネントとはUIの独立した部品。JSXで見た目を定義し、関数として作る。Reactはこの部品を組み合わせて画面を作る。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          まずは「なぜコンポーネントに分けるのか」という疑問から出発して、JSXの書き方とコンポーネントの組み合わせ方を順番に確認しましょう。
        </p>

        {/* TermNote: 基礎図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "コンポーネント",
              definition: "画面の一部を担当する「部品」のこと。1つの関数として書き、何度でも使い回せる。",
            },
            {
              word: "JSX",
              definition: "JavaScriptの中でHTMLのような記法が使える構文拡張。Reactがブラウザ用のコードに変換してくれる。",
            },
            {
              word: "宣言的UI",
              definition: "「画面をどう書き換えるか」ではなく「こういう状態ならこう見える」と宣言するだけでReactが差分を計算してくれるスタイル。",
            },
            {
              word: "関数コンポーネント",
              definition: "JSXを返す関数として書いたコンポーネント。現在のReactの標準的な書き方。",
            },
            {
              word: "再利用",
              definition: "同じコンポーネントを複数の場所で何度でも使うこと。修正が1箇所で済む。",
            },
          ]}
        />

        {/* ── 概念図A: 関数コンポーネントの基本 ── */}
        <ConceptDiagram
          title="概念図A — 関数コンポーネントの基本形"
          description="コンポーネントは「JSXを返す関数」。Propsを受け取り、画面の構造を返す。"
        >
          <div
            className="rounded-xl border p-4 mb-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              最もシンプルなコンポーネントの例
            </p>
            <div className="font-mono text-xs leading-loose">
              <p>
                <span className="text-blue-300">function</span>
                <span className="text-yellow-300"> Greeting</span>
                <span className="text-gray-300">{"() {"}</span>
                <span className="text-gray-500 ml-2">{"// 関数として定義する"}</span>
              </p>
              <p className="ml-4">
                <span className="text-blue-300">return</span>
                <span className="text-gray-300"> (</span>
              </p>
              <p className="ml-8">
                <span className="text-green-300">{"<p>"}</span>
                <span className="text-gray-300">こんにちは！</span>
                <span className="text-green-300">{"</p>"}</span>
                <span className="text-gray-500 ml-2">{"// JSXを返す"}</span>
              </p>
              <p className="ml-4">
                <span className="text-gray-300">);</span>
              </p>
              <p><span className="text-gray-300">{"}"}</span></p>
              <p className="mt-3">
                <span className="text-gray-500">{"// 呼び出し方（JSXとして使う）"}</span>
              </p>
              <p>
                <span className="text-green-300">{"<Greeting />"}</span>
                <span className="text-gray-500 ml-2">{"// → <p>こんにちは！</p> が表示される"}</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-blue-300 mb-2">1. 関数として定義</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                大文字始まりの関数名にする。これがコンポーネントの本体。
              </p>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.3)" }}
            >
              <p className="text-xs font-semibold text-blue-300 mb-2">2. JSXを返す</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                return の後にHTMLライクな構造を書く。これが「見た目の設計図」になる。
              </p>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-blue-300 mb-2">3. タグとして使う</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                {'<Greeting />'} のようにHTMLタグと同じ感覚で呼び出せる。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            関数の名前は必ず大文字始まり（Greeting）にする。小文字だとHTMLタグと区別がつかなくなる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          1つのコンポーネントの形が分かりました。次は「複数のコンポーネントをどう組み合わせるか」というツリー構造を見ていきます。
        </p>

        {/* ── 概念図B: ツリー構造 ── */}
        <ConceptDiagram
          title="概念図B — ツリー構造"
          description="コンポーネントは入れ子で組み合わさり「木構造」を形成する"
        >
          <div className="rounded-xl border-2 border-dashed border-blue-700/50 p-4">
            <p className="text-xs font-semibold text-blue-500 text-center mb-4 tracking-wide uppercase">
              Component Tree — 親から子への一方向データフロー
            </p>
            <StackLayer
              Icon={Home}
              title="App（最上位）"
              subtitle="アプリケーション全体を包む最も外側のコンポーネント"
              iconColor="text-blue-400"
            />
            <div className="flex gap-2 mx-4">
              <div className="flex-1">
                <StackLayer
                  Icon={Box}
                  title="Header（中間）"
                  subtitle="ナビゲーションを担当する"
                  iconColor="text-violet-400"
                />
              </div>
              <div className="flex-1">
                <StackLayer
                  Icon={Box}
                  title="Main（中間）"
                  subtitle="メインコンテンツを担当"
                  iconColor="text-violet-400"
                />
              </div>
              <div className="flex-1">
                <StackLayer
                  Icon={Box}
                  title="Footer（中間）"
                  subtitle="フッター情報を担当"
                  iconColor="text-violet-400"
                  showArrow={false}
                />
              </div>
            </div>
            <div className="flex gap-2 mx-8 mt-2">
              <div className="flex-1">
                <StackLayer
                  Icon={Puzzle}
                  title="Button"
                  subtitle="末端の部品"
                  iconColor="text-blue-300"
                  showArrow={false}
                />
              </div>
              <div className="flex-1">
                <StackLayer
                  Icon={Puzzle}
                  title="Card"
                  subtitle="末端の部品"
                  iconColor="text-blue-300"
                  showArrow={false}
                />
              </div>
              <div className="flex-1">
                <StackLayer
                  Icon={Puzzle}
                  title="NavItem"
                  subtitle="末端の部品"
                  iconColor="text-blue-300"
                  showArrow={false}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            データは必ず親から子への一方向に流れる。子から親へ直接変更することはできない。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          コンポーネントの組み合わせ方が分かりました。次は「1つのコンポーネントの中で何が起きているのか」を詳しく見てみます。
        </p>

        {/* ── 概念図C: 関数コンポーネントの解剖 ── */}
        <ConceptDiagram
          title="概念図C — 関数コンポーネントの解剖"
          description="1つの関数コンポーネントの中で何が起きているのか"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={ArrowRight}
              title="Props受け取り"
              subtitle="親から渡されたデータを引数で受け取る"
            />
            <FlowArrow label="" direction="right" />
            <FlowCard
              Icon={FunctionSquare}
              title="ロジック実行"
              subtitle="計算・条件分岐など（Hooksは後のページで解説）"
              highlight
              accentColor="blue"
            />
            <FlowArrow label="" direction="right" />
            <FlowCard
              Icon={Code2}
              title="JSX return"
              subtitle="画面に表示する構造を返す"
            />
            <FlowArrow label="描画" direction="right" />
            <FlowCard
              Icon={Monitor}
              title="画面に表示"
              subtitle="Reactが実際のDOMに反映"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            関数コンポーネントは「Propsを受け取り、JSXを返す純粋な関数」として設計するのが理想。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — 概念図の直後） ─────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、「コンポーネント」って何ですか？ HTMLとどう違うんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "LINEのトーク画面を想像してみてください。あの吹き出しが一つひとつコンポーネントです、マジさん。自分の吹き出しと相手の吹き出し、形は違いますが、同じ「吹き出しコンポーネント」を使い回しているだけ。HTMLだと毎回同じ構造を手で書き直しますが、コンポーネントは一度定義すれば何度でも呼び出せます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "JSXって何ですか？ HTMLに見えるけどHTMLじゃないの？ マジ？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "JSXはJavaScriptの中にHTMLのような記法で書ける構文です。料理レシピに「絵で書ける欄」が追加されたようなイメージ。見た目はHTMLそっくりですが、最終的にはJavaScriptに変換されます。だから class ではなく className を使うなど、細かい違いがあります。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "コンポーネントを「組み合わせる」って、どういうことですか？ ボクには積み木みたいなイメージしかなくて。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "積み木で大正解ですよ、マジさん。大きな積み木（App）の中に中くらいの積み木（Header）があって、さらにその中に小さな積み木（Button）が入っている。この入れ子構造でどんな複雑なUIも作れます。家で言えば、壁・床・屋根という部品が組み合わさって「家」になるのと同じです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "「部品として切り出す」ことで同じコードを何度も書かずに済むし、どこを直せばいいかも分かりやすくなる、ということですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "完璧な整理です。「再利用性」と「責務の分離」がコンポーネント設計の2大利点です。一つのコンポーネントに詰め込みすぎず、適切な粒度に分けるセンスがReactエンジニアの腕の見せ所ですよ、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={[
            "HTMLだけで書く場合",
            "コンポーネントに分ける場合",
          ]}
          rows={[
            {
              label: "同じUIを使い回す",
              cells: [
                "同じHTMLを何箇所にもコピペする必要がある",
                "コンポーネントを呼び出すだけで使い回せる",
              ],
              highlightCol: 1,
            },
            {
              label: "UIを変更したいとき",
              cells: [
                "コピペした全箇所を直す必要がある",
                "コンポーネントを1箇所直すだけで全部変わる",
              ],
              highlightCol: 1,
            },
            {
              label: "複雑さの管理",
              cells: [
                "1ファイルにHTMLが大量に積み上がる",
                "役割ごとに分割されて見通しが良い",
              ],
              highlightCol: 1,
            },
            {
              label: "チーム開発",
              cells: [
                "同じ箇所を複数人が触って衝突しやすい",
                "担当コンポーネントを分けて並行作業できる",
              ],
              highlightCol: 1,
            },
          ]}
          note="コンポーネント分割の本質は「再利用」と「責務の分離」。1つのコンポーネントが1つのことだけに責任を持つ設計が理想。Reactは宣言的UI（何を表示するかを記述するスタイル）を採用しています。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はReactの内部動作を深く知りたい方向けです。コンポーネントの基本が分かったら次のPropsページに進んでも構いません。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — Virtual DOMとレンダリングサイクル
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          ここではReactが内部でどうUIを更新しているかを解説します。「なぜReactは速いのか」という仕組みの話です。
        </p>

        {/* TermNote: 応用図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "Virtual DOM",
              definition: "Reactが内部で管理するDOMの軽量コピー。実際のDOMを触る前に、ここで差分を計算する。",
            },
            {
              word: "ReactDOM",
              definition: "ReactのVirtual DOMをブラウザの実際のDOMに反映するためのライブラリ。",
            },
            {
              word: "差分更新（diffing）",
              definition: "変更前と変更後のVirtual DOMを比較して、変わった部分だけを実DOMに適用する処理。",
            },
            {
              word: "マウント",
              definition: "コンポーネントが初めて画面に追加されること。",
            },
            {
              word: "アンマウント",
              definition: "コンポーネントが画面から取り除かれること。",
            },
          ]}
        />

        {/* ── 概念図D: JSXからDOM反映までの流れ ── */}
        <ConceptDiagram
          title="概念図D — JSXからブラウザ表示までの流れ"
          description="JSXを書いてからブラウザに表示されるまでの流れ"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Code2}
              title="JSX return"
              subtitle="コンポーネント関数が返す構造"
              highlight
              accentColor="blue"
            />
            <FlowArrow label="Reactが解析" direction="right" />
            <FlowCard
              Icon={Layers}
              title="Virtual DOM"
              subtitle="Reactが管理する軽量コピー"
            />
            <FlowArrow label="差分だけ反映" direction="right" />
            <FlowCard
              Icon={Monitor}
              title="Real DOM反映"
              subtitle="ブラウザに実際に描画される"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            Reactは直接DOMを書き換えず、Virtual DOMで差分を計算してから最小限の変更だけを反映する。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          Virtual DOMの仕組みが分かりました。次はコンポーネントのライフサイクル（生まれてから消えるまで）を確認します。
        </p>

        {/* ── 概念図E: レンダリングサイクル ── */}
        <ConceptDiagram
          title="概念図E：Reactコンポーネントのレンダリングサイクル"
          description="マウントから更新、アンマウントまでの完全な流れ"
          accentColor="blue"
        >
          {/* 3フェーズ */}
          <div className="flex flex-col gap-3 mb-5">
            {/* 初回マウント */}
            <div className="rounded-xl border border-blue-500/40 bg-blue-500/5 p-3">
              <p className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                1. 初回マウント
              </p>
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono">関数実行</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono">JSX</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono">Virtual DOM</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-300 font-mono">Real DOM</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-violet-500/20 px-2 py-0.5 text-violet-300 font-mono">useEffect（mount）</span>
              </div>
            </div>

            {/* 更新 */}
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-3">
              <p className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wide">
                2. 更新（State / Props 変化）
              </p>
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">State変化</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">再レンダリング</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">新Virtual DOM</span>
                <FlowArrow label="diff比較" direction="right" />
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">差分のみDOM更新</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-violet-500/20 px-2 py-0.5 text-violet-300 font-mono">useEffect（update）</span>
              </div>
            </div>

            {/* アンマウント */}
            <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-3">
              <p className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">
                3. アンマウント
              </p>
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="rounded bg-red-500/20 px-2 py-0.5 text-red-300 font-mono">コンポーネント削除</span>
                <FlowArrow label="" direction="right" />
                <span className="rounded bg-violet-500/20 px-2 py-0.5 text-violet-300 font-mono">useEffect cleanup実行</span>
              </div>
            </div>
          </div>

          {/* 再レンダリングの原因 + React.memo */}
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-gray-700 bg-gray-800/40 p-2">
              <p className="text-xs font-semibold text-gray-300 mb-1">再レンダリングの原因</p>
              <ul className="text-xs text-gray-400 space-y-0.5 list-disc list-inside">
                <li>state 変化</li>
                <li>props 変化</li>
                <li>親コンポーネントの再レンダリング</li>
                <li>context 変化</li>
              </ul>
            </div>
            <div className="flex-1 rounded-lg border border-blue-500/30 bg-blue-500/10 p-2">
              <p className="text-xs font-semibold text-blue-300 mb-1">React.memo() で最適化</p>
              <p className="text-xs text-gray-400">
                propsが変わっていなければ再レンダリングをスキップ。不要な再描画を防ぐ。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        {/* ── 概念図F: クラスコンポーネントとの比較 ── */}
        <ConceptDiagram
          title="概念図F：クラスコンポーネントと関数コンポーネントの比較"
          description="書き方・ライフサイクル・現在の推奨を並べて確認する"
          accentColor="blue"
        >
          {/* コード比較 */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {/* クラスコンポーネント */}
            <div className="flex-1 rounded-xl border border-gray-600 bg-gray-800/50 p-3">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                クラスコンポーネント（レガシー）
              </p>
              <pre className="text-xs text-gray-400 font-mono leading-relaxed whitespace-pre-wrap">
{`class MyComp
  extends React.Component {
  state = {};
  componentDidMount() {
    // 初回マウント時の処理
  }
  render() {
    return <div />;
  }
}`}
              </pre>
            </div>

            {/* 関数コンポーネント */}
            <div className="flex-1 rounded-xl border border-blue-500/40 bg-blue-500/5 p-3">
              <p className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                関数コンポーネント（現在の主流）
              </p>
              <pre className="text-xs text-blue-200 font-mono leading-relaxed whitespace-pre-wrap">
{`function MyComp({ props }) {
  const [state, setState]
    = useState();
  useEffect(() => {
    // 副作用の処理
    return () => { /* cleanup */ };
  }, []);
  return <div />;
}`}
              </pre>
            </div>
          </div>

          {/* ライフサイクル対応表 */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
              ライフサイクルの対応関係
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-700 bg-gray-800 px-2 py-1.5 text-left text-gray-400 font-semibold">クラス</th>
                    <th className="border border-gray-700 bg-gray-800 px-2 py-1.5 text-left text-gray-400 font-semibold">矢印</th>
                    <th className="border border-blue-500/30 bg-blue-500/10 px-2 py-1.5 text-left text-blue-300 font-semibold">関数（Hooks）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-400 font-mono">componentDidMount</td>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-600 text-center">→</td>
                    <td className="border border-blue-500/20 px-2 py-1.5 text-blue-300 font-mono">useEffect(fn, [])</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-400 font-mono">componentDidUpdate</td>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-600 text-center">→</td>
                    <td className="border border-blue-500/20 px-2 py-1.5 text-blue-300 font-mono">useEffect(fn, [dep])</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-400 font-mono">componentWillUnmount</td>
                    <td className="border border-gray-700 px-2 py-1.5 text-gray-600 text-center">→</td>
                    <td className="border border-blue-500/20 px-2 py-1.5 text-blue-300 font-mono">useEffect cleanup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            関数コンポーネントが現在のReactの主流。クラスはレガシー — 新規コードはすべて関数で書く。
          </p>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        {/* 7.1 JSXのルール（最も実用的なので先頭へ） */}
        <DetailBlock heading="7.1 JSXのルール">
          <p>
            JSXには守るべきルールが4つある。まず、<strong className="text-white">1つのルート要素</strong>に包む必要がある。複数要素を返す場合は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>&lt;&gt;&lt;/&gt;</code>{" "}
            （Fragment）で包む。
          </p>
          <p>
            次に、CSSクラスは{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>className</code>{" "}
            を使う（<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>class</code>{" "}
            はJavaScriptの予約語のため）。
          </p>
          <p>
            また、JavaScript式を埋め込むときは{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>{"{}"}</code>{" "}
            で囲む。{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>{"<p>{count}</p>"}</code>{" "}
            のように書くと変数の値が表示される。
          </p>
          <p>
            最後に、子要素を持たないタグは自己クローズタグにする。{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>&lt;img /&gt;</code>{" "}
            や{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>&lt;br /&gt;</code>{" "}
            のように末尾に{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>/</code>{" "}
            が必要。
          </p>
          <KeyPoint>
            JSXはHTMLではなくJavaScriptの構文拡張。最終的にReactの{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>createElement</code>{" "}
            呼び出しに変換される。見た目はHTMLでも、裏ではJavaScriptが動いている。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 コンポーネントの粒度">
          <p>
            「1コンポーネント1責務」が設計の基本原則。ButtonはButtonの見た目と動作だけを担当し、リストの取得やページ遷移のロジックは持たない。
          </p>
          <p>
            <strong className="text-white">分割のサイン</strong>：同じJSXを2か所以上に書いた時・1つのコンポーネントが100行を超えた時・「このコンポーネントは何をするもの？」と問われて一言で答えられない時。
          </p>
          <KeyPoint>
            分割しすぎも問題。3行のコンポーネントを100個作るより、20行のコンポーネントを5個作る方が読みやすい場合がある。「適切な粒度」に正解はなく、チームやプロジェクトの文脈で判断する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 再利用とカスタマイズ">
          <p>
            コンポーネントに変化をつけるにはPropsを使う。同じButtonコンポーネントでも、色・テキスト・サイズをPropsで渡すことで複数パターンに対応できる。
          </p>
          <p>
            例えば{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>{"<Button color=\"blue\" label=\"送信\" />"}</code>{" "}
            と{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}>{"<Button color=\"red\" label=\"削除\" />"}</code>{" "}
            は同じコンポーネントを使いながら見た目が変わる。Propsの詳細は次のページで解説する。
          </p>
        </DetailBlock>

        <DetailBlock heading="7.4 Virtual DOMとは">
          <p>
            ReactはブラウザのReal DOMを直接書き換えない。その代わり、Reactが内部で管理する<strong className="text-white">Virtual DOM</strong>（仮想DOM）という軽量なコピーを持っている。
          </p>
          <p>
            状態が変化するとReactはまずVirtual DOMを更新し、変更前と変更後のVirtual DOMを比較（diffing）する。そこで差分だけを特定し、最小限の変更をReal DOMに反映する。
          </p>
          <KeyPoint>
            毎回ページ全体を描き直すのではなく「変わった部分だけ」を更新するのがVirtual DOMの利点。これによってReactは複雑なUIでも効率よく画面を更新できる。React.memoによるメモ化最適化の詳細はhooksページで扱う。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/react/props",
            title: "Props: コンポーネントにデータを渡す",
            description: "親から子への値の渡し方と型の考え方",
            icon: "ArrowRight",
          },
          {
            href: "/react/state",
            title: "State: コンポーネントが持つ変わる値",
            description: "useStateで動的なUIを作る",
            icon: "GitBranch",
          },
          {
            href: "/javascript/dom",
            title: "DOMとの違いを理解する",
            description: "ブラウザが持つ本物のDOMとReactの関係",
            icon: "Monitor",
          },
        ]}
      />

      <PageDrill questions={componentQuestions} />
    </div>
  );
}
