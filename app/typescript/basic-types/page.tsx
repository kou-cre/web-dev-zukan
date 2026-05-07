import {
  Type,
  Hash,
  ToggleLeft,
  List,
  AlertTriangle,
  CheckCircle2,
  Pencil,
  Wand2,
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
import { basicTypesQuestions } from "@/content/questions/typescript/basic-types";

export const metadata = {
  title: "基本型と型推論 | TypeScript | Web開発図解",
  description:
    "TypeScriptのstring・number・boolean・配列の基本型と型推論の仕組みを図解で解説。どこに型を書くべきかの判断基準も分かる。",
};

export default function BasicTypesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/typescript" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← TypeScript に戻る
        </Link>
      </div>

      <Hero
        category="TypeScript"
        title="基本型と型推論"
        subtitle={"string・number・boolean——TypeScriptの語彙を身につける"}
        body={"どこに型を書き、どこは推論に任せるか。その判断基準まで1ページで掴む。"}
        accentColor="#4f85c8"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "string / number / boolean / 配列の基本型の書き方",
          "型推論が自動で型を判断してくれる仕組み",
          "どこに型アノテーションを書くべきかの判断基準",
        ]}
        prerequisites={[
          "TypeScriptの「型安全」の概念（/typescript/what-is-type を読んだ）",
          "JavaScript の変数（let / const）を知っている",
          "配列（[] で作るリスト）の基本を知っている",
        ]}
        outOfScope={[
          "ユニオン型（string | number のように複数型を組み合わせる）",
          "タプル型（固定長配列）",
          "null / undefined の厳密な扱い（strictNullChecks）",
        ]}
      />

      <OnePageSummary
        keyMessage="TypeScriptの基本型は string・number・boolean の3種類と配列。これらを変数や関数の引数・戻り値に付けることで型安全が実現する。ただしTypeScriptには「型推論」という機能があり、初期値がある変数は自動で型を判断してくれるため、すべての場所に型を書く必要はない。"
        metaphorTitle="自動仕分けシステム付き倉庫"
        metaphorPoints={[
          {
            label: "string",
            real: "「文字のみ」と書かれたラベル付き棚。数字や真偽値を入れようとすると棚が拒否する",
            metaphor: "文字専用棚",
          },
          {
            label: "number",
            real: "「数値のみ」の棚。42 も 3.14 も -1 も入る。文字列は入れられない",
            metaphor: "数値専用棚",
          },
          {
            label: "型推論",
            real: "荷物を置いた瞬間に自動でラベルを貼ってくれる係員。`const x = 1` と書くだけで「number専用棚」のラベルが自動で付く",
            metaphor: "自動ラベル係員",
          },
        ]}
        definition="基本型とは変数が持てる値の種類の最小単位。型推論はTypeScriptが初期値から型を自動判断する仕組み。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず4種類の基本型カードで「型の見た目」を覚えてから、「どこに書くか」の判断基準を確認しましょう。
        </p>

        {/* ── 概念図A: 基本型カードグリッド ── */}
        <ConceptDiagram
          title="概念図A"
          description="TypeScriptの最頻出基本型。まずこの4種類を覚える。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* string */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold text-white font-mono">string</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  文字列
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                テキストを扱う型。シングルクォート・ダブルクォート・バッククォートで囲んだ値。
              </p>
              <div
                className="rounded border p-2 font-mono text-xs"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> name: </span>
                <span className="text-blue-400">string</span>
                <span className="text-gray-300"> = </span>
                <span className="text-green-300">"マジ"</span>
                <span className="text-gray-300">;</span>
              </div>
            </div>

            {/* number */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold text-white font-mono">number</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  数値
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                整数も小数も負の数も全部 number。JavaScript に int / float の区別はない。
              </p>
              <div
                className="rounded border p-2 font-mono text-xs"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> age: </span>
                <span className="text-blue-400">number</span>
                <span className="text-gray-300"> = </span>
                <span className="text-orange-300">25</span>
                <span className="text-gray-300">;</span>
              </div>
            </div>

            {/* boolean */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ToggleLeft className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold text-white font-mono">boolean</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  真偽値
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                true か false のみ。フラグやスイッチの状態、条件分岐の結果に使う。
              </p>
              <div
                className="rounded border p-2 font-mono text-xs"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> isActive: </span>
                <span className="text-blue-400">boolean</span>
                <span className="text-gray-300"> = </span>
                <span className="text-purple-300">true</span>
                <span className="text-gray-300">;</span>
              </div>
            </div>

            {/* 配列 */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(79,133,200,0.06)",
                borderColor: "rgba(79,133,200,0.35)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <List className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold text-white font-mono">string[]</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  配列
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                同じ型の値が並ぶリスト。`型名[]` の形で書く。`number[]` や `boolean[]` も同様。
              </p>
              <div
                className="rounded border p-2 font-mono text-xs"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> tags: </span>
                <span className="text-blue-400">string</span>
                <span className="text-gray-300">[] = [</span>
                <span className="text-green-300">"ts"</span>
                <span className="text-gray-300">, </span>
                <span className="text-green-300">"react"</span>
                <span className="text-gray-300">];</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            これら4種類だけで日常的なコードの大半の型付けができる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          基本型の書き方が分かりました。次は「どこに書くか・書かなくていいか」の判断ポイントを確認します。
        </p>

        {/* ── 概念図B: 型推論の仕組み ── */}
        <ConceptDiagram
          title="概念図B"
          description="型推論とは？ TypeScriptが初期値から型を自動で判断してくれる仕組み。"
        >
          <div className="space-y-4">
            {/* 型推論が効く例 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(79,133,200,0.06)", borderColor: "rgba(79,133,200,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-blue-300">型推論が自動で判断してくれる場面</p>
              </div>
              <div className="space-y-2">
                <div
                  className="rounded border p-3 font-mono text-xs leading-loose"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p>
                    <span className="text-blue-300">const</span>
                    <span className="text-gray-300"> name = </span>
                    <span className="text-green-300">"マジ"</span>
                    <span className="text-gray-300">;</span>
                    <span className="text-gray-500 ml-3">{"// → string と推論される。書かなくていい"}</span>
                  </p>
                  <p>
                    <span className="text-blue-300">const</span>
                    <span className="text-gray-300"> count = </span>
                    <span className="text-orange-300">42</span>
                    <span className="text-gray-300">;</span>
                    <span className="text-gray-500 ml-3">{"// → number と推論される。書かなくていい"}</span>
                  </p>
                  <p>
                    <span className="text-blue-300">const</span>
                    <span className="text-gray-300"> items = [</span>
                    <span className="text-green-300">"a"</span>
                    <span className="text-gray-300">, </span>
                    <span className="text-green-300">"b"</span>
                    <span className="text-gray-300">];</span>
                    <span className="text-gray-500 ml-3">{"// → string[] と推論される"}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 書くべき場面 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Pencil className="w-4 h-4 text-amber-400" />
                <p className="text-sm font-semibold text-amber-300">型アノテーションを書くべき3つの場面</p>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 h-fit mt-0.5"
                    style={{ backgroundColor: "rgba(79,133,200,0.15)", color: "#4f85c8" }}
                  >
                    1
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">関数の引数</p>
                    <div
                      className="rounded border p-2 font-mono text-xs"
                      style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                    >
                      <span className="text-blue-300">function</span>
                      <span className="text-yellow-300"> greet</span>
                      <span className="text-gray-300">(name: </span>
                      <span className="text-blue-400">string</span>
                      <span className="text-gray-300">) {"{"} ... {"}"}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">呼び出し元が何を渡すか不明なので、推論できない</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 h-fit mt-0.5"
                    style={{ backgroundColor: "rgba(79,133,200,0.15)", color: "#4f85c8" }}
                  >
                    2
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">関数の戻り値（推奨）</p>
                    <div
                      className="rounded border p-2 font-mono text-xs"
                      style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                    >
                      <span className="text-blue-300">function</span>
                      <span className="text-yellow-300"> getAge</span>
                      <span className="text-gray-300">(): </span>
                      <span className="text-blue-400">number</span>
                      <span className="text-gray-300"> {"{"} ... {"}"}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">省略できるが、明示することで意図が伝わる</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 h-fit mt-0.5"
                    style={{ backgroundColor: "rgba(79,133,200,0.15)", color: "#4f85c8" }}
                  >
                    3
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">初期値なし変数（後から代入）</p>
                    <div
                      className="rounded border p-2 font-mono text-xs"
                      style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                    >
                      <span className="text-blue-300">let</span>
                      <span className="text-gray-300"> result: </span>
                      <span className="text-blue-400">string</span>
                      <span className="text-gray-300">;</span>
                      <span className="text-gray-500 ml-2">{"// 後でセットする"}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">初期値がないので推論できない。明示が必須</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            「宣言と同時に初期値あり」なら推論に任せてOK。「引数・戻り値・初期値なし」は明示する。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、TypeScriptって全部の変数に `: string` とか `: number` とか書かないといけないんですよね？ それって正直めんどくさくないですか……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "それはよくある誤解ですね、マジさん。TypeScriptには「型推論」という機能があって、初期値がある変数は自動で型を判断してくれます。\n`const x = 1` と書くだけで、TypeScript は x が number 型だと覚えてくれるんです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え、書かなくていいんですか！？ じゃあいつ書くんですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "大きく3パターンです。関数の引数・関数の戻り値（推奨）・後から値を代入する予定の変数——この3つには明示的に書いた方が安全です。\n逆に「宣言と同時に初期値を入れる変数」は推論に任せて構いません。",
          },
          {
            speaker: "maji",
            emotion: "rebel",
            text: "でも全部に書く方が分かりやすくないですか！ 統一した方がルールが単純では？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "全部書くことは技術的にはできますが、かえって読みにくくなります。\nたとえば `const name: string = \"マジ\"` は、\"マジ\" を見れば文字列だと分かります。`:string` を書くのは情報の重複で、コードの密度が上がって本当に重要な型アノテーションが目立たなくなります。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "なるほど……じゃあ関数の引数には絶対に書かないといけないんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そうです。引数は呼び出し元がどんな値を渡すか分からないので、TypeScript が推論できません。\n`function greet(name)` と書いただけだと、name が string なのか number なのか分からない——だから `function greet(name: string)` と明示するんです。これで「この関数には文字列を渡してください」という意図がコードに刻まれます。",
          },
          {
            speaker: "maji",
            emotion: "confident",
            text: "わかりました！ 「変数は推論に任せる・関数の引数と戻り値には書く・初期値なし変数には書く」が基本ルールですね！ これでボク、TypeScript書けます！",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["推論に任せてOK", "明示した方がよい"]}
          rows={[
            {
              label: "変数宣言 + 初期値あり",
              cells: ["const x = 1（推論: number）", "不要（重複になる）"],
              highlightCol: 0,
            },
            {
              label: "関数の引数",
              cells: ["推論不可（書かないとエラー）", "必ず書く"],
              highlightCol: 1,
            },
            {
              label: "関数の戻り値",
              cells: ["省略できる", "明示を推奨（意図が伝わる）"],
              highlightCol: 1,
            },
            {
              label: "初期値なし変数",
              cells: ["推論不可（any になる）", "必ず書く"],
              highlightCol: 1,
            },
          ]}
          note="「初期値があれば推論に任せる」が基本方針。引数と初期値なし変数は推論できないため必須。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はより複雑な型パターンについての解説です。基礎の3種類を使いこなせるようになってから読むのがおすすめです。"
      />

      {/* ── 応用編 ────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 特殊な型と型アサーション
        </h2>

        <TermNote
          terms={[
            {
              word: "any",
              definition: "型チェックを無効化するエスケープハッチ。「この変数は何でも入る」と宣言する。TypeScript の恩恵が失われるので最小限に留める。",
            },
            {
              word: "void",
              definition: "関数が何も返さないことを表す型。`function show(): void {...}` のように書く。",
            },
            {
              word: "undefined / null",
              definition: "「値がない」を表す2つの型。strictNullChecks を有効にすると明示的な処理が求められる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="基本3種類に加えて知っておくべき特殊な型パターン。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* any */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-bold text-white font-mono">any</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                  要注意
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                何でも許可する型。型チェックを無効化するので、JavaScript と同じ状態になる。移行期や緊急時以外は避ける。
              </p>
            </div>

            {/* void */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-white font-mono">void</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-gray-500/15 text-gray-400 border border-gray-500/30">
                  戻り値なし
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                関数が明示的に何も返さないとき。`return` がない、または `return;` のみの関数に使う。
              </p>
            </div>

            {/* ユニオン型プレビュー */}
            <div
              className="rounded-xl border p-4 sm:col-span-2"
              style={{ backgroundColor: "rgba(79,133,200,0.06)", borderColor: "rgba(79,133,200,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-bold text-white font-mono">string | null</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  ユニオン型（次のページで詳しく）
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                「string または null のどちらか」を表す型。`|` で複数の型を組み合わせる。次のページ（interface と type）で詳しく学ぶ。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 基本型の完全なコード例">
          <p>
            実際のコードでどう使うかを一気に確認しましょう。変数・関数・配列の型付けを一通り見ておくことで、
            新しいコードを書くときの参照になります。
          </p>
          <CodeBlock
            title="basic-types.ts"
            language="typescript"
            code={`// ── 基本型の宣言 ──
const firstName: string = "マジ";
const age: number = 25;
const isLoggedIn: boolean = true;

// ── 型推論を使う（型を省略） ──
const lastName = "くん";     // → string と推論
const score = 100;           // → number と推論
const active = false;        // → boolean と推論

// ── 配列型 ──
const names: string[] = ["マジ", "マスター", "弟子"];
const scores: number[] = [98, 72, 85];

// ── 関数の型付け ──
function greet(name: string): string {
  return "こんにちは、" + name + "！";
}

function add(a: number, b: number): number {
  return a + b;
}

// 返り値なし（void）
function logMessage(msg: string): void {
  console.log(msg);
}

// ── 初期値なし変数 ──
let result: string;  // 後でセットする
result = "完了";     // OK
result = 42;         // エラー: number を string に代入できない`}
          />
          <KeyPoint>
            コードを書くとき「この変数は何の型か？」を毎回意識する習慣をつけると、型アノテーションを書く場所が自然と分かるようになる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 よくある誤解：数値の文字列は number 型">
          <CorrectionCard
            misconception="'42' は数字が書いてあるから number 型になる"
            correction="'42' はクォートで囲まれているため string 型。型を変換したい場合は Number('42') や parseInt('42') を使う"
            reason="TypeScriptの型はコードの書き方で決まる。クォートで囲めば文字列。数値リテラル（42 のようにクォートなし）が number 型。見た目ではなく構文で判断する。"
          />
        </DetailBlock>

        <DetailBlock heading="6.3 any を使うべきでない理由">
          <p>
            any を使うと、TypeScript のメリットがすべて失われます。
            「型を書くのが面倒だから any にしよう」は、TypeScript を使わない選択と実質同じです。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: CheckCircle2,
                title: "unknown（代替案）",
                subtitle: "型を確認してから使う",
                description: "外部から受け取った値など「型が不明」な場合は any より unknown を使う。使う前に型チェックが必要なため安全。",
                accentColor: "blue",
              },
              {
                Icon: AlertTriangle,
                title: "any を使っていいケース",
                subtitle: "JSからTSへの移行期間",
                description: "既存のJavaScriptコードを少しずつTypeScript化する移行期間中、一時的な回避策として使うのは許容される。",
                accentColor: "amber",
              },
            ]}
          />
          <WarningPoint>
            any を使うと「エラーが出ない」から良さそうに見えるが、型チェックが効いていないだけ。実行時のバグを防ぐ能力がゼロになる。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/typescript/what-is-type",
            title: "型とは何か",
            description: "前のページ。型安全の基本概念を確認する",
            icon: "ShieldCheck",
          },
          {
            href: "/typescript/interface-type",
            title: "interface と type",
            description: "次のステップ。オブジェクトの形状を定義する",
            icon: "GitMerge",
          },
          {
            href: "/typescript/react-types",
            title: "React での型付け",
            description: "実践編。React のコンポーネントに型を適用する",
            icon: "Code2",
          },
        ]}
      />

      <PageDrill questions={basicTypesQuestions} />
    </div>
  );
}
