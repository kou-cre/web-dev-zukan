import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileCode2,
  Zap,
  BookOpen,
  ArrowRight,
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
import { whatIsTypeQuestions } from "@/content/questions/typescript/what-is-type";

export const metadata = {
  title: "型とは何か | TypeScript | Web開発図解",
  description:
    "TypeScriptの「型」がなぜ存在するのかを図解で解説。型安全の恩恵・コンパイル時エラー検出の仕組みを初心者向けに説明します。",
};

export default function WhatIsTypePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/typescript" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← TypeScript に戻る
        </Link>
      </div>

      <Hero
        category="TypeScript"
        title="型とは何か"
        subtitle={"コードを書いた瞬間にバグを発見する——型安全の仕組みと恩恵"}
        body={"JavaScriptとTypeScriptの決定的な違いを、実例を通じて腹落ちさせる。"}
        accentColor="#4f85c8"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "「型」とは何か（値の種類を宣言するラベル）",
          "型がないと何が起きるか（実行時に初めてバグに気づく問題）",
          "TypeScriptがコードを動かす前にエラーを教えてくれる仕組み",
        ]}
        prerequisites={[
          "JavaScript の変数（let / const）を知っている",
          "関数の基本的な書き方を知っている",
          "エラーが出るとプログラムが止まる、という体験がある",
        ]}
        outOfScope={[
          "ユニオン型（string | number）の詳細",
          "リテラル型（「red\" | \"green\"）",
          "never 型・unknown 型（応用編で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="TypeScriptの「型」とは、変数や関数が扱う値の「種類」を事前に宣言するルール。型があると、間違った値を渡したときに実行する前にエラーを出してくれる。JavaScriptでは実行してみないと気づけなかったバグを、書いた瞬間に検出できるのが型安全の最大の恩恵。"
        metaphorTitle="ラベルのついた仕分け棚"
        metaphorPoints={[
          {
            label: "型なし（JS）",
            real: "なんでも入るボックス。帰ってきたら変なものが混入していて困る状況が実行時に発覚する",
            metaphor: "なんでも入るボックス",
          },
          {
            label: "型あり（TS）",
            real: "「文字のみ」「数字のみ」とラベルが貼られた棚。違うものを入れようとした瞬間に棚が拒否する",
            metaphor: "ラベル付き仕分け棚",
          },
          {
            label: "型安全",
            real: "実行する前に「それは入れられません」とエラーが出るので、本番環境で初めて気づく事故が激減する",
            metaphor: "事前チェックシステム",
          },
        ]}
        definition="型とは、変数や関数が「どんな種類の値を扱うか」を事前に宣言する仕組み。間違いを実行前に発見できるのが最大の恩恵。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「型がないと何が起きるか」を体感してから、TypeScriptが何を解決するのかを図で確認しましょう。
        </p>

        {/* ── 概念図A: 型なし vs 型あり ── */}
        <ConceptDiagram
          title="概念図A"
          description="JavaScriptとTypeScriptで、バグに気づくタイミングがどう違うか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* JavaScript（型なし） */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-sm font-bold text-white">JavaScript（型なし）</p>
              </div>
              <div className="space-y-2 mb-4">
                <div
                  className="rounded border p-2 font-mono text-xs"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <span className="text-blue-300">function</span>
                  <span className="text-yellow-300"> add</span>
                  <span className="text-gray-300">{"(a, b) {"}</span>
                  <br />
                  <span className="text-gray-300 ml-4">{"return a + b;"}</span>
                  <br />
                  <span className="text-gray-300">{"}"}</span>
                  <br />
                  <br />
                  <span className="text-gray-300">add(</span>
                  <span className="text-green-300">"10"</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">5</span>
                  <span className="text-gray-300">);</span>
                  <span className="text-gray-500 ml-2">{"// → \"105\" !"}</span>
                </div>
              </div>
              <div
                className="rounded border px-3 py-2 flex items-start gap-2"
                style={{ backgroundColor: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)" }}
              >
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 leading-relaxed">
                  文字列 "10" と数値 5 を足すと文字列連結になる。実行して初めて気づくバグ。
                </p>
              </div>
            </div>

            {/* TypeScript（型あり） */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(79,133,200,0.06)",
                borderColor: "rgba(79,133,200,0.35)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-bold text-white">TypeScript（型あり）</p>
              </div>
              <div className="space-y-2 mb-4">
                <div
                  className="rounded border p-2 font-mono text-xs"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <span className="text-blue-300">function</span>
                  <span className="text-yellow-300"> add</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-orange-300">a</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-blue-400">number</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">b</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-blue-400">number</span>
                  <span className="text-gray-300">{") {"}</span>
                  <br />
                  <span className="text-gray-300 ml-4">{"return a + b;"}</span>
                  <br />
                  <span className="text-gray-300">{"}"}</span>
                  <br />
                  <br />
                  <span className="text-gray-300">add(</span>
                  <span className="text-red-400 underline decoration-wavy">"10"</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-300">5</span>
                  <span className="text-gray-300">);</span>
                </div>
              </div>
              <div
                className="rounded border px-3 py-2 flex items-start gap-2"
                style={{ backgroundColor: "rgba(79,133,200,0.08)", borderColor: "rgba(79,133,200,0.3)" }}
              >
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-300 leading-relaxed">
                  {"\"10\" は string。number が期待されている場所に渡した瞬間にエディタが赤い波線でエラーを表示。"}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            JavaScriptは実行時エラー、TypeScriptは書いた瞬間（コンパイル時）にエラーを検出する。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          「実行時エラー」と「コンパイル時エラー」の違いが分かりました。次はTypeScriptが型をどう扱うかのフローを見ていきます。
        </p>

        {/* ── 概念図B: TypeScriptのコンパイルフロー ── */}
        <ConceptDiagram
          title="概念図B"
          description="TypeScriptのコードはブラウザで直接動かない。一度JavaScriptに変換（コンパイル）される。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={FileCode2}
              title=".ts ファイル"
              subtitle="TypeScript で書いたコード"
            />
            <FlowArrow label="tsc コンパイル" direction="right" />
            <FlowCard
              Icon={Zap}
              title="型チェック"
              subtitle="エラーがあれば止まる"
              highlight
              accentColor="#4f85c8"
            />
            <FlowArrow label="問題なければ変換" direction="right" />
            <FlowCard
              Icon={FileCode2}
              title=".js ファイル"
              subtitle="ブラウザで動くJavaScript"
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(79,133,200,0.06)", borderColor: "rgba(79,133,200,0.25)" }}
          >
            <p className="text-xs font-semibold text-blue-300 mb-2">コンパイル時エラーの例</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              型が合わない場所があると、tsc がエラーを出してコンパイルを止めます。
              エラーがある状態では .js ファイルが生成されないため、型の問題を「動かす前に」必ず直さなければなりません。
              これが「実行前にバグを検出する」という仕組みの正体です。
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            TypeScriptの型情報は実行時には消える。JavaScriptには型の概念がないため。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、TypeScriptって聞くたびに「型を付けるやつ」って言われるんですけど……ボク、「型」って何なのかが全然分からないんですよね。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "型とは、変数や関数が扱う値の「種類」を事前に宣言するルールです、マジさん。\nたとえばレストランで注文するとき「Aランチ」と決めると、料理が決まりますよね。型も同じで、「この変数には文字列しか入れられない」と決めておくイメージです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え、でも「何でも入る」方が便利じゃないですか！ 制限があると逆に不便では？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "短期的にはそう見えます。でも想像してみてください。300行のコードで、「getUserName() という関数の結果に .toFixed(2) を呼んだらエラーになった」という状況を。\n.toFixed は数字専用のメソッドです。getUserName が文字列を返しているのに、どこかで数字だと思い込んでいた——これは実行して初めて気づく事故です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "あ、それ……怖いですね。本番で起きたら大惨事では？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "だからこそ型があるんです、マジさん。TypeScript なら getUserName の戻り値を `string` と宣言しておくだけで、`.toFixed()` を呼ぼうとした瞬間にエディタが赤い波線でエラーを表示してくれます。\nコードを書いた瞬間に、実行する前に気づける。これが型安全の本質です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ 実行する前に気づけるって……バグを未然に防げるということですか！？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "正確にはそうです。TypeScript は「コンパイル時エラー検出」という仕組みで、コードをJavaScriptに変換するときに型の矛盾を発見します。\n実行して初めて壊れる、という事態を大幅に減らせるのが型安全の本質ですよ。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["JavaScript（型なし）", "TypeScript（型あり）"]}
          rows={[
            {
              label: "エラー検出のタイミング",
              cells: ["実行時（ブラウザで動かしたとき）", "コンパイル時（書いた瞬間）"],
              highlightCol: 1,
            },
            {
              label: "エラーを教えてくれる場所",
              cells: ["本番環境で初めて気づく場合もある", "エディタの赤い波線"],
              highlightCol: 1,
            },
            {
              label: "学習コスト",
              cells: ["低い", "少し高い（型を書く必要がある）"],
              highlightCol: 0,
            },
            {
              label: "大規模開発での安全性",
              cells: ["低い（暗黙の前提が増える）", "高い（型が仕様書代わりになる）"],
              highlightCol: 1,
            },
          ]}
          note="TypeScriptは学習コストを払う代わりに、実行前にバグを検出できる安全性を得る。チームが大きくなるほど恩恵が増す。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はTypeScriptの仕組みをより深く理解したい方向けの内容です。実践的な型の書き方は次のページ（基本型と型推論）で学べます。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 型の種類と型アノテーション
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          TypeScriptの型は、プリミティブ型（基本の型）とオブジェクト型（複合の型）に大きく分かれます。
          まずは最も頻出する5種類を押さえましょう。
        </p>

        <TermNote
          terms={[
            {
              word: "コンパイル",
              definition: "TypeScriptのコードをブラウザが読めるJavaScriptに変換する作業。tsc コマンドで実行する。",
            },
            {
              word: "型アノテーション",
              definition: "`const x: string = \"hello\"` のように `:` の後に型名を書く記法。変数や関数の引数・戻り値に型を明記する。",
            },
            {
              word: "型推論",
              definition: "書いた値から自動的に型を判断してくれるTypeScriptの機能。`const x = 1` と書くだけで、x は number 型と推論される。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="TypeScript の主要な型の種類。まずはこの5つを覚えれば日常的なコードはほぼカバーできる。"
        >
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: BookOpen,
                title: "string",
                subtitle: "文字列型",
                description: "\"hello\"・\"マジ\"・テンプレートリテラル。文字を扱うときに使う最頻出の型。",
                accentColor: "blue",
              },
              {
                Icon: ShieldCheck,
                title: "number",
                subtitle: "数値型",
                description: "42・3.14・-1。整数も小数も number 一種類。int/float の区別はない。",
                accentColor: "blue",
              },
              {
                Icon: ArrowRight,
                title: "boolean",
                subtitle: "真偽値型",
                description: "true か false だけ。フラグ・条件分岐の結果・スイッチの状態に使う。",
                accentColor: "blue",
              },
              {
                Icon: BookOpen,
                title: "string[]",
                subtitle: "配列型",
                description: "同じ型の値が並ぶリスト。`string[]` は文字列の配列、`number[]` は数値の配列。",
                accentColor: "indigo",
              },
              {
                Icon: ShieldCheck,
                title: "{ key: type }",
                subtitle: "オブジェクト型",
                description: "複数のプロパティを持つ構造。interface や type で形状を定義する。次のページで詳しく学ぶ。",
                accentColor: "indigo",
              },
              {
                Icon: AlertTriangle,
                title: "any",
                subtitle: "型なし（緊急回避）",
                description: "型チェックを無効化する。便利だが多用すると型安全の恩恵がなくなるため最小限に。",
                accentColor: "red",
              },
            ]}
          />
          <p className="text-xs text-gray-500 text-center mt-3">
            any は「TypeScriptでJavaScriptと同じことをする」最終手段。基本は避ける。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 型安全がもたらす実践的なメリット">
          <p>
            型安全の恩恵は「バグを防ぐ」だけではありません。型があることで、エディタが{" "}
            <strong className="text-white">補完（オートコンプリート）</strong>を提供できるようになります。
          </p>
          <p>
            たとえば `user.` と入力した瞬間に、user オブジェクトが持つプロパティの一覧が表示される——これは型情報があるからできることです。
            型は「コードの仕様書」であり、それがエディタの機能と連動して開発体験を大幅に向上させます。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: CheckCircle2,
                title: "バグの早期発見",
                subtitle: "実行前にエラーを検出",
                description: "間違った型の値を渡した瞬間にエディタが警告する。本番で初めて気づく事故を大幅に減らせる。",
                accentColor: "blue",
              },
              {
                Icon: Zap,
                title: "エディタの補完",
                subtitle: "プロパティ・メソッドの候補を表示",
                description: "型情報があるからこそ、オブジェクトのプロパティやメソッドの候補をエディタが表示できる。",
                accentColor: "blue",
              },
              {
                Icon: FileCode2,
                title: "コードが仕様書になる",
                subtitle: "チーム開発での共通言語",
                description: "関数の引数に型があると「何を渡すべきか」がコードを読むだけで分かる。コメントより正確で確実。",
                accentColor: "indigo",
              },
              {
                Icon: ShieldCheck,
                title: "リファクタリングの安全性",
                subtitle: "変更の影響範囲を特定しやすい",
                description: "型を変えると影響を受けている場所が全てエラーになる。「どこを直すべきか」が一目瞭然。",
                accentColor: "indigo",
              },
            ]}
          />
          <KeyPoint>
            TypeScriptの型は「制約を加える」のではなく「ガイドを加える」ものと考える。正しい使い方を示してくれるコーチが常にそばにいる感覚。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 型アノテーションの基本的な書き方">
          <p>
            TypeScriptで型を明示するには、変数名や引数名の後に `: 型名` を書きます。
            これを <strong className="text-white">型アノテーション</strong> と呼びます。
          </p>
          <CodeBlock
            title="type-annotation.ts"
            language="typescript"
            code={`// 変数への型アノテーション
const name: string = "マジ";
const age: number = 25;
const isActive: boolean = true;

// 関数の引数と戻り値への型アノテーション
function greet(name: string): string {
  return "こんにちは、" + name + "！";
}

// 型が合わない場合はエラー（コンパイル時）
const count: number = "100"; // エラー: 'string' を 'number' に代入できない
greet(42);                   // エラー: 'number' を 'string' に代入できない`}
          />
          <KeyPoint>
            変数に初期値がある場合、TypeScriptは自動で型を判断する（型推論）。`const x = 1` で x は自動的に number 型になる。型アノテーションを書く必要は必ずしもない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 よくある誤解：TypeScriptは実行時にも型チェックをする">
          <CorrectionCard
            misconception="TypeScriptを使えば実行時のエラーもなくなる"
            correction="TypeScriptの型チェックはコンパイル時（変換時）のみ。実行時にはJavaScriptとして動くため、ネットワークから受け取ったデータなど外部から入ってくる値は型が保証されない"
            reason="TypeScriptの型情報はコンパイル後のJavaScriptには含まれない（消える）。実行時に型を保証したい場合は Zod などのバリデーションライブラリを使う。TypeScriptは「書いたコードの型の矛盾を検出する」ものであり、「実行時のあらゆるエラーを防ぐ」ものではない。"
          />
          <WarningPoint>
            APIのレスポンスやユーザー入力など、「外から入ってくるデータ」の型は実行時に検証する必要がある。TypeScriptの型だけでは不十分な場面がある点を覚えておく。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/typescript/basic-types",
            title: "基本型と型推論",
            description: "次のステップ。string / number / boolean の書き方と型推論の仕組み",
            icon: "Layers",
          },
          {
            href: "/javascript/variables",
            title: "変数とスコープ",
            description: "TypeScriptの前提。JavaScript の変数の仕組みを確認する",
            icon: "Package",
          },
          {
            href: "/typescript/interface-type",
            title: "interface と type",
            description: "オブジェクトの形状を定義する方法",
            icon: "GitMerge",
          },
        ]}
      />

      <PageDrill questions={whatIsTypeQuestions} />
    </div>
  );
}
