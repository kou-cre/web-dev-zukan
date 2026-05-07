import {
  Puzzle,
  Repeat,
  Box,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Variable,
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
import { genericsQuestions } from "@/content/questions/typescript/generics";

export const metadata = {
  title: "ジェネリクス入門 | TypeScript | Web開発図解",
  description:
    "TypeScriptのジェネリクス（<T>）の仕組みを図解で解説。再利用可能な型の書き方を段階的に理解する初心者向けガイド。",
};

export default function GenericsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/typescript" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← TypeScript に戻る
        </Link>
      </div>

      <Hero
        category="TypeScript"
        title="ジェネリクス入門"
        subtitle={"<T> の正体——「型をあとで決める」再利用可能な型の書き方"}
        body={"useState の <T>、配列メソッドの型——ジェネリクスは実は身近にある。"}
        accentColor="#4f85c8"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "<T> の仕組み（型を引数として受け取るという発想）",
          "ジェネリクスを使った再利用可能な関数・型の書き方",
          "React の useState や配列メソッドでジェネリクスが使われている場所",
        ]}
        prerequisites={[
          "TypeScriptの基本型（string / number / boolean）を知っている",
          "interface と type の基本的な書き方を知っている",
          "関数の型アノテーションを知っている",
        ]}
        outOfScope={[
          "Conditional types（条件型）: `T extends U ? X : Y`",
          "Mapped types: `{ [K in keyof T]: ... }`",
          "Infer キーワードを使った型推論の操作",
        ]}
      />

      <OnePageSummary
        keyMessage="ジェネリクスとは「型をあとから決められる関数・型」を作る仕組み。<T> は型のプレースホルダーで、呼び出し時に string や number など具体的な型をはめ込める。useState<string> や Array<T> など、実は日常的に使っている。"
        metaphorTitle="サイズフリーの万能型枠"
        metaphorPoints={[
          {
            label: "<T>",
            real: "「中に何を入れるか未定の金型」。後から「string を入れる」「number を入れる」と決められる。金型の形は同じなので、内側の素材だけ変えて何度でも使い回せる",
            metaphor: "素材を後で決める金型",
          },
          {
            label: "呼び出し時に型を確定",
            real: "identity<string>(\"hello\") と呼ぶと T が string に確定する。identity<number>(42) と呼ぶと T が number に確定する。同じ関数だが型だけ変わる",
            metaphor: "注文時に素材を指定",
          },
          {
            label: "型安全を保ったまま再利用",
            real: "any を使えば何でも入るが型安全が崩れる。ジェネリクスは「T に決まったものだけ」という約束を守りながら柔軟に使い回せる",
            metaphor: "品質を保ちながら汎用化",
          },
        ]}
        definition="ジェネリクスとは、型をパラメータとして受け取る関数・クラス・型を作る仕組み。<T> は型の変数（プレースホルダー）。呼び出し時に具体的な型に置き換えられる。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「ジェネリクスがないとどういう問題が起きるか」から始めて、{"<T>"} の仕組みを段階的に理解しましょう。
        </p>

        {/* ── 概念図A: ジェネリクスがない問題 ── */}
        <ConceptDiagram
          title="概念図A"
          description="型なし（any）と型有り（ジェネリクス）の違い。どちらも「何でも受け取れる関数」だが安全性が違う。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* any を使った場合 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-sm font-bold text-white">any を使った場合（危険）</p>
              </div>
              <div
                className="rounded border p-2 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">function</span>
                  <span className="text-yellow-300"> identity</span>
                  <span className="text-gray-300">(value: </span>
                  <span className="text-red-400">any</span>
                  <span className="text-gray-300">) {"{"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-blue-300">return</span>
                  <span className="text-gray-300"> value;</span>
                </p>
                <p><span className="text-gray-300">{"}"}</span></p>
                <br />
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> result = </span>
                  <span className="text-yellow-300">identity</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-green-300">"hello"</span>
                  <span className="text-gray-300">);</span>
                </p>
                <p>
                  <span className="text-gray-500">{"// result の型は any → 型安全なし"}</span>
                </p>
              </div>
              <p className="text-xs text-red-300 mt-2 leading-relaxed">
                戻り値が any になるので、間違ったメソッドを呼んでもエラーにならない
              </p>
            </div>

            {/* ジェネリクスを使った場合 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(79,133,200,0.06)", borderColor: "rgba(79,133,200,0.35)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-bold text-white">ジェネリクスを使った場合（安全）</p>
              </div>
              <div
                className="rounded border p-2 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">function</span>
                  <span className="text-yellow-300"> identity</span>
                  <span className="text-gray-300">{"<"}</span>
                  <span className="text-blue-400">T</span>
                  <span className="text-gray-300">{">"}</span>
                  <span className="text-gray-300">(value: </span>
                  <span className="text-blue-400">T</span>
                  <span className="text-gray-300">): </span>
                  <span className="text-blue-400">T</span>
                  <span className="text-gray-300"> {"{"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-blue-300">return</span>
                  <span className="text-gray-300"> value;</span>
                </p>
                <p><span className="text-gray-300">{"}"}</span></p>
                <br />
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> result = </span>
                  <span className="text-yellow-300">identity</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-green-300">"hello"</span>
                  <span className="text-gray-300">);</span>
                </p>
                <p>
                  <span className="text-gray-500">{"// result の型は string → 型安全！"}</span>
                </p>
              </div>
              <p className="text-xs text-blue-300 mt-2 leading-relaxed">
                呼び出し時に string が渡されると T = string に確定。戻り値も string になる
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            ジェネリクスは「any の柔軟さ」と「型安全」を両立させる仕組み。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          {"<T> の基本が分かりました。次は「型が呼び出し時に確定していく」フローを視覚化します。"}
        </p>

        {/* ── 概念図B: T が確定するフロー ── */}
        <ConceptDiagram
          title="概念図B"
          description={"<T> は呼び出し時に具体的な型に置き換わる。同じ関数でも渡す型によって型が変わる。"}
        >
          <div className="space-y-4">
            {/* string の場合 */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div
                className="rounded-lg border px-4 py-3 text-xs font-mono flex-shrink-0"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-yellow-300">identity</span>
                <span className="text-gray-300">{"<"}</span>
                <span className="text-blue-400">string</span>
                <span className="text-gray-300">{">"}</span>
                <span className="text-gray-300">(</span>
                <span className="text-green-300">"hello"</span>
                <span className="text-gray-300">)</span>
              </div>
              <FlowArrow label="T = string" direction="right" />
              <div
                className="rounded-lg border px-4 py-3 text-xs font-mono flex-shrink-0"
                style={{ backgroundColor: "rgba(79,133,200,0.08)", borderColor: "rgba(79,133,200,0.3)" }}
              >
                <span className="text-gray-300">戻り値: </span>
                <span className="text-blue-400">string</span>
              </div>
            </div>

            {/* number の場合 */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div
                className="rounded-lg border px-4 py-3 text-xs font-mono flex-shrink-0"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-yellow-300">identity</span>
                <span className="text-gray-300">{"<"}</span>
                <span className="text-blue-400">number</span>
                <span className="text-gray-300">{">"}</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-300">42</span>
                <span className="text-gray-300">)</span>
              </div>
              <FlowArrow label="T = number" direction="right" />
              <div
                className="rounded-lg border px-4 py-3 text-xs font-mono flex-shrink-0"
                style={{ backgroundColor: "rgba(79,133,200,0.08)", borderColor: "rgba(79,133,200,0.3)" }}
              >
                <span className="text-gray-300">戻り値: </span>
                <span className="text-blue-400">number</span>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(79,133,200,0.06)", borderColor: "rgba(79,133,200,0.25)" }}
          >
            <p className="text-xs font-semibold text-blue-300 mb-2">ポイント</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              T は「型の変数」です。呼び出し時に渡した値の型が T に代入されて、関数全体の型が確定します。
              手書きで {"<string>"} と指定することも、渡した値から推論させることもできます。
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            {"「型を決定するのを呼び出しタイミングまで遅らせる」というのがジェネリクスの本質。"}
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、コードを読んでいると `<T>` とか `<string>` とか、なんか山カッコが突然出てきて……ボク、あれを見るたびに飛ばして読んでたんですよ。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "それはもったいないですよ、マジさん。<T> はジェネリクスといって「型のプレースホルダー」です。\nたとえばランチセットの「Aランチ（肉・魚・野菜のどれかを選ぶ）」みたいなものです。メニューは同じでも、注文時に「肉で」と指定することで具体的な内容が決まりますよね。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "なるほど！ 注文するときに中身を決める……。では useState に書く <string> とか <number> がその「注文」ということですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "正確です。`useState<string>(\"\")` は「このstateには string を入れます」という注文です。\n useState 自体は <T> という型の変数を持っていて、あなたが <string> と指定したことで T = string に確定します。",
          },
          {
            speaker: "maji",
            emotion: "rebel",
            text: "でも毎回書くの面倒じゃないですか！ `useState(\"\")` って書いたら TypeScript が string だって分かってくれないんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "実は `useState(\"\")` と書いても TypeScript は推論で string と判断してくれます。\n明示する必要があるのは `useState(null)` のような初期値から型が特定できない場合です。null は string でも number でも User でも、何の null か分からないので `useState<User | null>(null)` と教えてあげる必要があります。",
          },
          {
            speaker: "maji",
            emotion: "down",
            text: "あ、そういうことだったんですね……。ボク、null を初期値にするとき毎回 any にしてました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "よくあるパターンですよ、マジさん。ただ any は型安全がゼロになってしまいます。\nジェネリクスを使えば「null か User のどちらかしか入らない」という約束を守りながら柔軟に扱えます。useState だけでなく、自分で関数を作るときも <T> を使うと「型を保ったまま汎用化」できるので、ぜひ試してみてください。",
          },
          {
            speaker: "maji",
            emotion: "confident",
            text: "分かりました！ <T> は「あとで型を決める注文システム」！ useState<User | null>(null) もこれからは迷わず書けます！ ボクもうジェネリクスマスターです！",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["any を使った場合", "ジェネリクスを使った場合"]}
          rows={[
            {
              label: "型安全",
              cells: ["なし（何でも許可）", "あり（T の型だけ許可）"],
              highlightCol: 1,
            },
            {
              label: "エディタ補完",
              cells: ["なし（型が不明）", "あり（T の型に基づいて補完）"],
              highlightCol: 1,
            },
            {
              label: "再利用性",
              cells: ["高い（何でも入る）", "高い（型だけ変えて使い回せる）"],
              highlightCol: 1,
            },
            {
              label: "戻り値の型",
              cells: ["any（推論なし）", "T（呼び出し時の型が維持される）"],
              highlightCol: 1,
            },
          ]}
          note="ジェネリクスは「anyの柔軟さ」と「型安全」を両立させる。any が必要に感じたらジェネリクスで書けないか検討する。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はジェネリクスに制約（extends）を付けるパターンや、複数の型パラメータについて解説します。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 制約付きジェネリクスと複数の型パラメータ
        </h2>

        <TermNote
          terms={[
            {
              word: "extends（制約）",
              definition: "`<T extends string>` のように書くと「T は string に限定する」という制約になる。「何でも受け取れるが、特定の条件を満たすものだけ」という絞り込み。",
            },
            {
              word: "複数の型パラメータ",
              definition: "`<T, U>` のように複数の型パラメータを持てる。`function pair<T, U>(a: T, b: U): [T, U]` のように、異なる型を複数扱う場合に使う。",
            },
            {
              word: "keyof",
              definition: "オブジェクト型のキー名を型として取得する。`keyof User` は `\"name\" | \"age\" | \"email\"` になる。ジェネリクスと組み合わせてよく使われる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description={"ジェネリクスに extends で制約を付ける。「何でも受け取るが、〇〇は持っているもの限定」というパターン。"}
        >
          <div
            className="rounded-xl border p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500">{"// T extends { length: number } → length を持つ型だけ受け付ける"}</p>
            <p>
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> getLength</span>
              <span className="text-gray-300">{"<T extends { length: number }"}</span>
              <span className="text-gray-300">{">"}</span>
              <span className="text-gray-300">(value: </span>
              <span className="text-blue-400">T</span>
              <span className="text-gray-300">): </span>
              <span className="text-blue-400">number</span>
              <span className="text-gray-300"> {"{"}</span>
            </p>
            <p className="ml-4">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300"> value.length;</span>
            </p>
            <p><span className="text-gray-300">{"}"}</span></p>
            <br />
            <p className="text-gray-300">
              <span className="text-yellow-300">getLength</span>
              <span className="text-gray-300">(</span>
              <span className="text-green-300">"hello"</span>
              <span className="text-gray-300">);</span>
              <span className="text-gray-500 ml-2">{"// OK → 5"}</span>
            </p>
            <p className="text-gray-300">
              <span className="text-yellow-300">getLength</span>
              <span className="text-gray-300">([</span>
              <span className="text-orange-300">1</span>
              <span className="text-gray-300">, </span>
              <span className="text-orange-300">2</span>
              <span className="text-gray-300">, </span>
              <span className="text-orange-300">3</span>
              <span className="text-gray-300">]);</span>
              <span className="text-gray-500 ml-2">{"// OK → 3"}</span>
            </p>
            <p className="text-gray-300">
              <span className="text-yellow-300">getLength</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">42</span>
              <span className="text-gray-300">);</span>
              <span className="text-red-400 ml-2">{"// エラー！ number には length がない"}</span>
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            制約（extends）を使うと「柔軟だが最低限の条件を保証する」関数が作れる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 日常的に使われているジェネリクスの例">
          <p>
            実は TypeScript や React のコードの中で、ジェネリクスは至る所に使われています。
            気づかずに使っていたものを整理しましょう。
          </p>
          <CodeBlock
            title="generics-examples.ts"
            language="typescript"
            code={`// ── useState の型パラメータ ──
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// ── 配列メソッドも実はジェネリクス ──
const numbers = [1, 2, 3];
// map の型: Array<T>.map<U>(callbackfn: (value: T) => U): U[]
const doubled = numbers.map((n) => n * 2); // U = number に推論される

// ── Promise もジェネリクス ──
async function fetchUser(): Promise<User> {
  const res = await fetch("/api/user");
  return res.json(); // 戻り値は User 型として扱われる
}

// ── 自分でジェネリクス関数を書く ──
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const name = first(["マジ", "マスター"]); // → string | undefined
const num = first([1, 2, 3]);              // → number | undefined`}
          />
          <KeyPoint>
            ジェネリクスを「難しい機能」と思わず、「any より安全な柔軟性」と理解すると使いどころが見えてくる。まずは useState と Promise でジェネリクスに慣れると自然に使えるようになる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 よくある誤解：ジェネリクスは上級者向けの機能">
          <CorrectionCard
            misconception="ジェネリクスは上級者が使う難しい機能で、初心者は知らなくていい"
            correction="useState や fetch の戻り値など、Reactを書いているだけでジェネリクスは自然に使っている。<T> の仕組みを知ることで、なぜ型エラーが出るかが分かるようになる"
            reason="useState<User | null>(null) のエラーが分からなかったり、Promise<User> の型が正しく付かなかったりする原因の多くはジェネリクスの理解不足。「知らなくていい」のではなく「知ると突然多くのエラーが解決する」機能。"
          />
        </DetailBlock>

        <DetailBlock heading="6.3 ジェネリクスを使う場面">
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Repeat,
                title: "再利用可能な関数",
                subtitle: "型だけ変えて何度も使う",
                description: "「最初の要素を返す」「配列を変換する」など、ロジックは同じでも型が変わる関数。any の代わりに使う。",
                accentColor: "blue",
              },
              {
                Icon: Box,
                title: "React の Hooks",
                subtitle: "useState<T>・useRef<T>",
                description: "null や空配列を初期値にするとき・型が推論できないとき。特に useState<T | null>(null) パターンは必須。",
                accentColor: "blue",
              },
              {
                Icon: Variable,
                title: "API 応答の型",
                subtitle: "Promise<T>・fetch の戻り値",
                description: "非同期処理の戻り値に型を付ける。`async function getUser(): Promise<User>` で型安全な非同期処理が書ける。",
                accentColor: "indigo",
              },
              {
                Icon: Layers,
                title: "汎用データ構造",
                subtitle: "ラッパー型・レスポンス型",
                description: "`interface ApiResponse<T> { data: T; error: string | null }` のように、データの「外枠」だけ決めておく型パターン。",
                accentColor: "indigo",
              },
            ]}
          />
          <WarningPoint>
            ジェネリクスを多用しすぎると読みにくくなる。T が3つ以上ネストするような型は、より分かりやすい設計に見直した方がよいサイン。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/typescript/react-types",
            title: "React での型付け",
            description: "前のページ。useState<T> を使った Props・state の型付け実践",
            icon: "Code2",
          },
          {
            href: "/typescript/interface-type",
            title: "interface と type",
            description: "ジェネリクスと組み合わせて使うオブジェクト形状の定義",
            icon: "GitMerge",
          },
          {
            href: "/typescript/what-is-type",
            title: "型とは何か",
            description: "TypeScriptの基礎に戻って型安全の恩恵を確認する",
            icon: "ShieldCheck",
          },
        ]}
      />

      <PageDrill questions={genericsQuestions} />
    </div>
  );
}
