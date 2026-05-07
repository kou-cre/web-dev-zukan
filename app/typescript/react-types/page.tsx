import {
  Code2,
  MousePointerClick,
  Variable,
  Component,
  AlertTriangle,
  CheckCircle2,
  Layers,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram } from "@/components/ConceptDiagram";
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
import { reactTypesQuestions } from "@/content/questions/typescript/react-types";

export const metadata = {
  title: "React での型付け | TypeScript | Web開発図解",
  description:
    "ReactコンポーネントのTypeScript型付けを図解で解説。Props・useState・イベントハンドラー・FC型の実践的な書き方を初心者向けに説明。",
};

export default function ReactTypesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/typescript" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← TypeScript に戻る
        </Link>
      </div>

      <Hero
        category="TypeScript"
        title="React での型付け"
        subtitle={"props・useState・イベント——Reactコンポーネントを型で守る"}
        body={"「どこに何の型を書くか」が分かれば、Reactの型付けは怖くない。"}
        accentColor="#4f85c8"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Props に interface を使って型を付ける方法",
          "useState の型付けの書き方",
          "クリック・入力イベントハンドラーの型",
        ]}
        prerequisites={[
          "TypeScriptの基本型と interface を知っている（/typescript/interface-type を読んだ）",
          "Reactのコンポーネントと Props の基本を知っている",
          "useState の使い方を知っている",
        ]}
        outOfScope={[
          "useRef・useCallback・useMemo の型付け",
          "React.FC vs function component の議論（応用編で扱う）",
          "forwardRef・Polymorphic コンポーネントなどの高度なパターン",
        ]}
      />

      <OnePageSummary
        keyMessage="ReactにTypeScriptを加えると、コンポーネントのProps・stateの値・イベントの型が全て明確になる。Propsはinterfaceで定義してコンポーネントの「入力仕様書」にする。useStateは初期値から型推論されることが多いが、複雑な場合はジェネリクスで明示する。イベントハンドラーには React.MouseEvent や React.ChangeEvent を使う。"
        metaphorTitle="電気工事の回路図"
        metaphorPoints={[
          {
            label: "Props型",
            real: "コンポーネントへの「入力端子の仕様書」。どの端子に何ボルトを入れるか（string / number / boolean）が決まっていて、間違った電圧を入れると接続前にエラーになる",
            metaphor: "入力端子の仕様書",
          },
          {
            label: "useState の型",
            real: "コンポーネント内の「電荷の種類」。この変数には数値しか入れられない、という制約でメモリを守る",
            metaphor: "電荷の種類制限",
          },
          {
            label: "イベント型",
            real: "ボタンを押したとき（クリック）、文字を入力したとき（change）など、イベントの種類ごとに違う回路図が用意されている",
            metaphor: "操作別の回路図",
          },
        ]}
        definition="Reactの型付けとは、コンポーネントへの入力（Props）・内部状態（state）・外部からの操作（イベント）に型を付けて、間違った使い方をコンパイル時に検出する仕組み。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず最頻出パターン「Props の型付け」から始め、次に useState とイベント型を確認します。
        </p>

        {/* ── 概念図A: Props の型付け ── */}
        <ConceptDiagram
          title="概念図A"
          description="Props は interface で定義する。コンポーネントへの「入力仕様書」になる。"
        >
          <div
            className="rounded-xl border p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500">{"// ① Props の型を interface で定義する"}</p>
            <p>
              <span className="text-blue-300">interface</span>
              <span className="text-yellow-300"> CardProps</span>
              <span className="text-gray-300"> {"{"}</span>
            </p>
            <p className="ml-4">
              <span className="text-orange-300">title</span>
              <span className="text-gray-300">: </span>
              <span className="text-blue-400">string</span>
              <span className="text-gray-300">;</span>
            </p>
            <p className="ml-4">
              <span className="text-orange-300">count</span>
              <span className="text-gray-300">: </span>
              <span className="text-blue-400">number</span>
              <span className="text-gray-300">;</span>
            </p>
            <p className="ml-4">
              <span className="text-orange-300">isActive</span>
              <span className="text-gray-300">?: </span>
              <span className="text-blue-400">boolean</span>
              <span className="text-gray-300">;</span>
              <span className="text-gray-500 ml-2">{"// 省略可能"}</span>
            </p>
            <p><span className="text-gray-300">{"}"}</span></p>
            <br />
            <p className="text-gray-500">{"// ② コンポーネントの引数に型を使う"}</p>
            <p>
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> Card</span>
              <span className="text-gray-300">{"({ title, count, isActive }: "}</span>
              <span className="text-yellow-300">CardProps</span>
              <span className="text-gray-300">{") {"}</span>
            </p>
            <p className="ml-4"><span className="text-blue-300">return</span><span className="text-gray-300"> {"<div>{title} - {count}</div>"}</span></p>
            <p><span className="text-gray-300">{"}"}</span></p>
            <br />
            <p className="text-gray-500">{"// ③ 使うとき — 型が合わなければエラー"}</p>
            <p>
              <span className="text-gray-300">{"<"}</span>
              <span className="text-yellow-300">Card</span>
              <span className="text-orange-300"> title</span>
              <span className="text-gray-300">="記事タイトル" </span>
              <span className="text-orange-300">count</span>
              <span className="text-gray-300">={"{42}"} /{">"}</span>
              <span className="text-gray-500 ml-2">{"// OK"}</span>
            </p>
            <p>
              <span className="text-gray-300">{"<"}</span>
              <span className="text-yellow-300">Card</span>
              <span className="text-orange-300"> title</span>
              <span className="text-gray-300">={"{100}"} </span>
              <span className="text-orange-300">count</span>
              <span className="text-gray-300">="テキスト" /{">"}</span>
              <span className="text-red-400 ml-2">{"// エラー"}</span>
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Props の型定義は「このコンポーネントへの入力ルールブック」。型に合わない値を渡した瞬間にエラーになる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          Props の型付けが分かりました。次は「コンポーネント内の状態（state）に型を付ける」方法を確認します。
        </p>

        {/* ── 概念図B: useState の型付け ── */}
        <ConceptDiagram
          title="概念図B"
          description="useState はジェネリクスで型を指定できる。初期値があれば推論されることが多い。"
        >
          <div className="space-y-4">
            {/* 型推論が効く場合 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(79,133,200,0.06)", borderColor: "rgba(79,133,200,0.3)" }}
            >
              <p className="text-sm font-semibold text-blue-300 mb-3">型推論が自動で効く場合（初期値がある）</p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> [count, setCount] = </span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-orange-300">0</span>
                  <span className="text-gray-300">);</span>
                  <span className="text-gray-500 ml-2">{"// → number と推論"}</span>
                </p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> [name, setName] = </span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-green-300">""</span>
                  <span className="text-gray-300">);</span>
                  <span className="text-gray-500 ml-2">{"// → string と推論"}</span>
                </p>
              </div>
            </div>

            {/* 明示が必要な場合 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-sm font-semibold text-amber-300 mb-3">型を明示した方がよい場合（null や複雑な型）</p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-gray-500">{"// null を初期値にする場合 → 型を明示"}</span>
                </p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> [user, setUser] = </span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">{"<"}</span>
                  <span className="text-yellow-300">User</span>
                  <span className="text-gray-300"> | </span>
                  <span className="text-blue-400">null</span>
                  <span className="text-gray-300">{">"}</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-blue-400">null</span>
                  <span className="text-gray-300">);</span>
                </p>
                <br />
                <p>
                  <span className="text-gray-500">{"// 配列 state（初期値が [] だと型が不明）"}</span>
                </p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> [items, setItems] = </span>
                  <span className="text-yellow-300">useState</span>
                  <span className="text-gray-300">{"<"}</span>
                  <span className="text-blue-400">string</span>
                  <span className="text-gray-300">[]{">"}</span>
                  <span className="text-gray-300">([]);</span>
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            初期値が 0 / "" / true など単純な値なら推論に任せてOK。null・空配列・オブジェクトは型を明示する。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          useState の型付けが分かりました。次は「イベントハンドラーの型」を確認します。
        </p>

        {/* ── 概念図C: イベント型 ── */}
        <ConceptDiagram
          title="概念図C"
          description="クリック・入力など、イベントの種類ごとに専用の型がある。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* クリック */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MousePointerClick className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-white">クリックイベント</p>
              </div>
              <div
                className="rounded border p-2 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> handleClick = </span>
                </p>
                <p className="ml-2">
                  <span className="text-gray-300">(e: </span>
                  <span className="text-yellow-300">React.MouseEvent</span>
                  <span className="text-gray-300">{"<"}</span>
                  <span className="text-yellow-300">HTMLButtonElement</span>
                  <span className="text-gray-300">{">"}</span>
                  <span className="text-gray-300">) ={">"}</span>
                  <span className="text-gray-300"> {"{"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-yellow-300">console</span>
                  <span className="text-gray-300">.log(e.currentTarget);</span>
                </p>
                <p><span className="text-gray-300">{"}"}</span></p>
              </div>
            </div>

            {/* change（input） */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Variable className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-white">入力イベント（input）</p>
              </div>
              <div
                className="rounded border p-2 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> handleChange = </span>
                </p>
                <p className="ml-2">
                  <span className="text-gray-300">(e: </span>
                  <span className="text-yellow-300">React.ChangeEvent</span>
                  <span className="text-gray-300">{"<"}</span>
                  <span className="text-yellow-300">HTMLInputElement</span>
                  <span className="text-gray-300">{">"}</span>
                  <span className="text-gray-300">) ={">"}</span>
                  <span className="text-gray-300"> {"{"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-yellow-300">setValue</span>
                  <span className="text-gray-300">(e.target.value);</span>
                </p>
                <p><span className="text-gray-300">{"}"}</span></p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            イベント型を正しく付けると、e.target.value などのプロパティへのアクセスに補完が効く。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "マスター、React に TypeScript を組み合わせると、コンポーネントが急に複雑になって……。どこに何の型を書けばいいのか全然分からなくなるんですが。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "落ち着いて整理しましょう、マジさん。Reactの型付けは大きく3箇所だけ覚えれば大丈夫です。Props・useState・イベントハンドラーの3つです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "3箇所だけ……それなら覚えられそうです。まず Props はどうするんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "Props は interface で形状を定義して、コンポーネントの引数の型として使います。`function Button({ label, onClick }: ButtonProps)` のような形ですね。\nこれでボタンを使う側が「label に何の型を渡すか」をエディタが教えてくれるようになります。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "それ、めちゃくちゃ便利ですね！ エラーになる前に気づけるし、補完も効く……。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "useState は初期値から型推論されることが多いので、シンプルな場合はそのままで大丈夫です。ただ、初期値が null だったり空配列だったりする場合は `useState<User | null>(null)` のようにジェネリクスで明示します。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ ジェネリクス……ってあの `<T>` とかいうやつですか？ 急に怖くなりました！",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "怖くないですよ、マジさん。`useState<string>(\"\")` は「このstateには string しか入れません」という宣言です。\nレストランで注文するとき「Aランチで」と決めるのと同じで、型を限定して注文しているイメージです。使い方はシンプルです。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["型付け箇所", "書き方", "推論の可否"]}
          rows={[
            {
              label: "Props",
              cells: ["interface で定義 → 引数の型として使う", "推論不可。必ず定義する"],
              highlightCol: 0,
            },
            {
              label: "useState（初期値あり）",
              cells: ["useState(0) → number と推論", "推論可。書かなくてよい"],
              highlightCol: 1,
            },
            {
              label: "useState（null・空配列）",
              cells: ["useState<T | null>(null) と明示", "推論不可。ジェネリクスで明示"],
              highlightCol: 0,
            },
            {
              label: "クリックイベント",
              cells: ["React.MouseEvent<HTMLButtonElement>", "推論不可。型名を記憶する"],
              highlightCol: 0,
            },
            {
              label: "入力イベント",
              cells: ["React.ChangeEvent<HTMLInputElement>", "推論不可。型名を記憶する"],
              highlightCol: 0,
            },
          ]}
          note="Props は必ず定義。useState は初期値があれば推論。イベント型は専用の型名を覚える。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は children の型・React.FC・フォームイベントなど、より実践的なパターンについて解説します。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — children と React.FC
        </h2>

        <TermNote
          terms={[
            {
              word: "React.ReactNode",
              definition: "JSXとして渡せる全ての型（string / number / JSX要素 / null / undefined など）。children の型としてよく使われる。",
            },
            {
              word: "React.FC",
              definition: "FunctionComponent の短縮形。`const Comp: React.FC<Props> = (props) => {...}` のように書く。現在は推奨度が下がっており、通常の関数定義が主流。",
            },
            {
              word: "フォームイベント",
              definition: "`React.FormEvent<HTMLFormElement>` で form の onSubmit イベントを型付けする。e.preventDefault() が型安全に呼べる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図D"
          description="children を受け取るコンポーネントの型付けパターン。"
        >
          <div
            className="rounded-xl border p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p>
              <span className="text-blue-300">import</span>
              <span className="text-gray-300"> React </span>
              <span className="text-blue-300">from</span>
              <span className="text-green-300"> "react"</span>
              <span className="text-gray-300">;</span>
            </p>
            <br />
            <p>
              <span className="text-blue-300">interface</span>
              <span className="text-yellow-300"> CardProps</span>
              <span className="text-gray-300"> {"{"}</span>
            </p>
            <p className="ml-4">
              <span className="text-orange-300">children</span>
              <span className="text-gray-300">: </span>
              <span className="text-yellow-300">React.ReactNode</span>
              <span className="text-gray-300">;</span>
              <span className="text-gray-500 ml-2">{"// JSX・文字列・数値など何でもOK"}</span>
            </p>
            <p className="ml-4">
              <span className="text-orange-300">title</span>
              <span className="text-gray-300">: </span>
              <span className="text-blue-400">string</span>
              <span className="text-gray-300">;</span>
            </p>
            <p><span className="text-gray-300">{"}"}</span></p>
            <br />
            <p>
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> Card</span>
              <span className="text-gray-300">{"({ title, children }: "}</span>
              <span className="text-yellow-300">CardProps</span>
              <span className="text-gray-300">{") {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300"> {"(<div><h2>{title}</h2>{children}</div>)"}</span>
            </p>
            <p><span className="text-gray-300">{"}"}</span></p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            children は React.ReactNode を使うのが最も柔軟。JSX も文字列も数値も受け入れられる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 Props・useState・イベントの完全なコード例">
          <p>
            実際のReactコンポーネントで、3つの型付けパターンを全部使った例を確認しましょう。
          </p>
          <CodeBlock
            title="Counter.tsx"
            language="typescript"
            code={`import React, { useState } from "react";

// ① Props の型定義
interface CounterProps {
  initialValue?: number;  // 省略可能：初期値
  label: string;          // 必須：ラベルテキスト
}

// ② コンポーネントの定義（Props を引数に型付け）
function Counter({ initialValue = 0, label }: CounterProps) {
  // ③ useState（初期値 0 → number と推論される）
  const [count, setCount] = useState(initialValue);

  // ④ クリックイベントの型
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCount((prev) => prev + 1);
  };

  // ⑤ 入力イベントの型（テキストで直接値を設定する例）
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) setCount(value);
  };

  return (
    <div>
      <p>{label}: {count}</p>
      <button onClick={handleIncrement}>+1</button>
      <input type="number" onChange={handleInput} />
    </div>
  );
}

export default Counter;`}
          />
          <KeyPoint>
            「Props は interface・useState は推論・イベントは React.○○Event」の3パターンを覚えるだけで、日常的な React + TypeScript のコードはほぼ書ける。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 よくある誤解：React.FC を使わないといけない">
          <CorrectionCard
            misconception="React コンポーネントは React.FC を使って書かないといけない"
            correction="React.FC は現在では推奨度が下がっている。通常の function 宣言か アロー関数で Props の型を引数に書くのが主流"
            reason="React.FC には「children が暗黙的に含まれる」などの問題があり、React 18 以降では不要になった。`function Comp(props: Props) {...}` または `const Comp = (props: Props) => {...}` が現在のベストプラクティス。"
          />
        </DetailBlock>

        <DetailBlock heading="6.3 よく使うイベント型の早見表">
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: MousePointerClick,
                title: "React.MouseEvent",
                subtitle: "onClick",
                description: "ボタン・div などのクリックイベント。`<HTMLButtonElement>` などを型パラメータに指定する。",
                accentColor: "blue",
              },
              {
                Icon: Variable,
                title: "React.ChangeEvent",
                subtitle: "onChange（input）",
                description: "input・select・textarea の値変化。`<HTMLInputElement>` を指定すると e.target.value が string 型になる。",
                accentColor: "blue",
              },
              {
                Icon: Component,
                title: "React.FormEvent",
                subtitle: "onSubmit",
                description: "form の送信イベント。`<HTMLFormElement>` を指定。e.preventDefault() が型安全に呼べる。",
                accentColor: "indigo",
              },
              {
                Icon: Layers,
                title: "React.KeyboardEvent",
                subtitle: "onKeyDown / onKeyUp",
                description: "キーボード操作イベント。e.key や e.code でどのキーが押されたか取得できる。",
                accentColor: "indigo",
              },
            ]}
          />
          <WarningPoint>
            イベント型のジェネリクス（&lt;HTMLButtonElement&gt; など）を間違えると、e.target や e.currentTarget のプロパティにアクセスできなくなる。型エラーが出たら型パラメータを確認する。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/typescript/interface-type",
            title: "interface と type",
            description: "前のページ。Props 型定義で使う interface の基礎",
            icon: "GitMerge",
          },
          {
            href: "/typescript/generics",
            title: "ジェネリクス入門",
            description: "次のステップ。useState<T> で使われる <T> の仕組み",
            icon: "Puzzle",
          },
          {
            href: "/react/state",
            title: "State と useState",
            description: "TypeScript なしの useState の使い方を確認する",
            icon: "RefreshCw",
          },
        ]}
      />

      <PageDrill questions={reactTypesQuestions} />
    </div>
  );
}
