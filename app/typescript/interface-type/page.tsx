import {
  GitMerge,
  Layers,
  Puzzle,
  CheckCircle2,
  ArrowRight,
  Box,
  Combine,
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
import { interfaceTypeQuestions } from "@/content/questions/typescript/interface-type";

export const metadata = {
  title: "interface と type | TypeScript | Web開発図解",
  description:
    "TypeScriptのinterfaceとtypeの違いと使い分けを図解で解説。オブジェクト形状の定義・extends・ユニオン型まで初心者向けに説明。",
};

export default function InterfaceTypePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/typescript" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← TypeScript に戻る
        </Link>
      </div>

      <Hero
        category="TypeScript"
        title="interface と type"
        subtitle={"オブジェクトの「設計図」を作る——形状定義と使い分けの基準"}
        body={"Reactのpropsからデータ構造まで、オブジェクトの形を型で宣言する方法を身につける。"}
        accentColor="#4f85c8"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "interface でオブジェクトの形状を定義する書き方",
          "type alias でオブジェクト・ユニオン型を定義する書き方",
          "extends による拡張と、interface / type の使い分けの目安",
        ]}
        prerequisites={[
          "TypeScriptの基本型を知っている（/typescript/basic-types を読んだ）",
          "JavaScriptのオブジェクト（{} で作るもの）を知っている",
          "関数の型付けの基礎を知っている",
        ]}
        outOfScope={[
          "Intersection type（交差型 &）の詳細",
          "Mapped types（型のマッピング）",
          "Conditional types（条件型）",
        ]}
      />

      <OnePageSummary
        keyMessage="interface と type は、どちらも「オブジェクトの形状（どんなプロパティを持つか）」を定義するもの。主な使い分けは「interface は extends で拡張できる」「type はユニオン型など柔軟な記述もできる」こと。Reactのpropsなど、オブジェクト形状の定義には interface が主流。"
        metaphorTitle="設計図と仕様書"
        metaphorPoints={[
          {
            label: "interface",
            real: "建物の設計図。後から増築（extends）できる。他の設計図を土台にできる。改築可能な柔軟な構造",
            metaphor: "拡張できる設計図",
          },
          {
            label: "type",
            real: "仕様書。設計図と同じことも、さらに柔軟な記述（ユニオン型など）もできる。何でも定義できる万能ツール",
            metaphor: "何でも書ける仕様書",
          },
          {
            label: "オブジェクト形状",
            real: "このオブジェクトには name（文字列）と age（数値）がある、という「どんなプロパティを持つか」の宣言",
            metaphor: "荷物の中身リスト",
          },
        ]}
        definition="interfaceはオブジェクトの形状を宣言する構文。typeは型に名前をつけるエイリアス。どちらでもオブジェクト形状を定義できるが、用途で使い分ける。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「interface の基本的な書き方」を覚えてから、「type との違い」と「extends による拡張」を確認します。
        </p>

        {/* ── 概念図A: interface の基本構文 ── */}
        <ConceptDiagram
          title="概念図A"
          description="interface はオブジェクトの「形状」を宣言する。どんなプロパティを、どんな型で持つかを定義する。"
        >
          <div className="space-y-4">
            {/* 基本構文 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">基本の書き方</p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">interface</span>
                  <span className="text-yellow-300"> User</span>
                  <span className="text-gray-300"> {"{"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-orange-300">name</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-blue-400">string</span>
                  <span className="text-gray-300">;</span>
                  <span className="text-gray-500 ml-3">{"// 必須プロパティ"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-orange-300">age</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-blue-400">number</span>
                  <span className="text-gray-300">;</span>
                  <span className="text-gray-500 ml-3">{"// 必須プロパティ"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-orange-300">email</span>
                  <span className="text-gray-300">?: </span>
                  <span className="text-blue-400">string</span>
                  <span className="text-gray-300">;</span>
                  <span className="text-gray-500 ml-3">{"// 省略可能プロパティ（? を付ける）"}</span>
                </p>
                <p><span className="text-gray-300">{"}"}</span></p>
              </div>
            </div>

            {/* 使い方 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(79,133,200,0.06)", borderColor: "rgba(79,133,200,0.3)" }}
            >
              <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-3">定義した interface を使う</p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-gray-500">{"// User 型の変数を作る"}</span>
                </p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> maji: </span>
                  <span className="text-yellow-300">User</span>
                  <span className="text-gray-300"> = {"{"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-orange-300">name</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-green-300">"マジ"</span>
                  <span className="text-gray-300">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-orange-300">age</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-orange-300">25</span>
                  <span className="text-gray-300">,</span>
                </p>
                <p>
                  <span className="text-gray-300">{"}"}</span>
                  <span className="text-gray-300">;</span>
                  <span className="text-gray-500 ml-2">{"// email は省略してもOK（? が付いているので）"}</span>
                </p>
                <br />
                <p>
                  <span className="text-gray-500">{"// 型に合わない値はエラー"}</span>
                </p>
                <p>
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> bad: </span>
                  <span className="text-yellow-300">User</span>
                  <span className="text-gray-300"> = {"{"} </span>
                  <span className="text-orange-300">name</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-orange-300">42</span>
                  <span className="text-gray-300"> {"}"}</span>
                  <span className="text-red-400 ml-2">{"// エラー！ name は string"}</span>
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            interface は「このオブジェクトにはこのプロパティが必ずある」という約束を型として表現する。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          interface の基本が分かりました。次は「interface を土台にして、新しい型を作る」extends の仕組みを見ます。
        </p>

        {/* ── 概念図B: extends による拡張 ── */}
        <ConceptDiagram
          title="概念図B"
          description="extends を使うと、既存の interface を引き継いでプロパティを追加した新しい型を作れる。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={Box}
              title="User"
              subtitle="name・age・email?"
            />
            <FlowArrow label="extends" direction="right" />
            <FlowCard
              Icon={Layers}
              title="Admin extends User"
              subtitle="name・age・email?（継承）+ role"
              highlight
              accentColor="#4f85c8"
            />
          </div>
          <div
            className="rounded-xl border mt-4 p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">コードで確認</p>
            <div
              className="rounded border p-3 font-mono text-xs leading-loose"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p>
                <span className="text-blue-300">interface</span>
                <span className="text-yellow-300"> Admin</span>
                <span className="text-blue-300"> extends</span>
                <span className="text-yellow-300"> User</span>
                <span className="text-gray-300"> {"{"}</span>
              </p>
              <p className="ml-4">
                <span className="text-orange-300">role</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-300">"admin"</span>
                <span className="text-gray-300"> | </span>
                <span className="text-green-300">"superadmin"</span>
                <span className="text-gray-300">;</span>
                <span className="text-gray-500 ml-2">{"// 追加するプロパティ"}</span>
              </p>
              <p><span className="text-gray-300">{"}"}</span></p>
              <br />
              <p>
                <span className="text-gray-500">{"// Admin は User の全プロパティ + role を持つ"}</span>
              </p>
              <p>
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> admin: </span>
                <span className="text-yellow-300">Admin</span>
                <span className="text-gray-300"> = {"{"}</span>
              </p>
              <p className="ml-4">
                <span className="text-orange-300">name</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-300">"マスター"</span>
                <span className="text-gray-300">,</span>
              </p>
              <p className="ml-4">
                <span className="text-orange-300">age</span>
                <span className="text-gray-300">: </span>
                <span className="text-orange-300">40</span>
                <span className="text-gray-300">,</span>
              </p>
              <p className="ml-4">
                <span className="text-orange-300">role</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-300">"admin"</span>
                <span className="text-gray-300">,</span>
              </p>
              <p><span className="text-gray-300">{"}"}</span><span className="text-gray-300">;</span></p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            extends は「User の機能を全部持った上で、追加機能もある」という継承の仕組み。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "マスター、interface と type って、どっちを使えばいいんですか？ 調べると両方出てきて混乱してしまって……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い質問ですね、マジさん。結論から言うと「オブジェクトの形状を定義するなら interface が主流、それ以外の複雑な型定義には type を使う」という使い分けが実務では多いです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え、じゃあ interface だけ覚えればいいですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "interface だけで多くのケースは対応できますが、type にしかできないことがあります。たとえば「string か number のどちらかを受け入れる型」——ユニオン型と呼びますが——これは type でしか定義できません。\n`type ID = string | number` のような書き方です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ じゃあ type の方が強くないですか！ type だけでよくないですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "それも一理あります。ただ interface には「extends で拡張できる」という利点があります。React のコンポーネントで props の型を定義するとき、基底の props を継承して新しい型を作れる——これが実務でよく使われるパターンです。",
          },
          {
            speaker: "maji",
            emotion: "down",
            text: "うーん……ボク、まだどっちを使うか決断できない気がします。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "最初は「オブジェクトの形状は interface、それ以外は type」とシンプルに覚えれば大丈夫です。チームや既存コードのスタイルに合わせるのが一番賢い選択です。どちらを選んでも実力はほとんど変わりませんよ、マジさん。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["interface", "type"]}
          rows={[
            {
              label: "オブジェクト形状の定義",
              cells: ["できる", "できる"],
              highlightCol: 0,
            },
            {
              label: "プリミティブ型に別名をつける",
              cells: ["できない", "できる（type ID = string）"],
              highlightCol: 1,
            },
            {
              label: "ユニオン型（A | B）",
              cells: ["できない", "できる"],
              highlightCol: 1,
            },
            {
              label: "extends による拡張",
              cells: ["できる（キーワードが使える）", "できる（& を使う）"],
              highlightCol: 0,
            },
            {
              label: "Reactのprops定義",
              cells: ["主流（推奨）", "どちらでもOK"],
              highlightCol: 0,
            },
          ]}
          note="オブジェクト形状は interface が主流。ユニオン型・プリミティブ型の別名は type を使う。どちらを使うかより「チームで統一する」ことが大切。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はユニオン型・省略可能プロパティ・型の合成について詳しく説明します。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — ユニオン型と型の合成
        </h2>

        <TermNote
          terms={[
            {
              word: "ユニオン型",
              definition: "`string | number` のように `|` で区切って「どちらかの型」を表す。HTTPステータスコードや ID のように複数の型を受け入れる場面で使う。",
            },
            {
              word: "省略可能プロパティ",
              definition: "プロパティ名の後に `?` を付けると、そのプロパティがなくてもエラーにならない。`email?: string` は「email があれば string 型、なくてもOK」という意味。",
            },
            {
              word: "交差型（&）",
              definition: "`TypeA & TypeB` のように `&` で合成すると、両方のプロパティを持った型になる。type で複数の型を組み合わせるときに使う。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="type が得意な記述パターン。interface ではできない型の書き方。"
        >
          <div className="space-y-4">
            {/* ユニオン型 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-blue-300 mb-3">ユニオン型——「AかBか」を表す</p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-gray-500">{"// type だけで書ける（interface では不可）"}</span>
                </p>
                <p>
                  <span className="text-blue-300">type</span>
                  <span className="text-yellow-300"> ID</span>
                  <span className="text-gray-300"> = </span>
                  <span className="text-blue-400">string</span>
                  <span className="text-gray-300"> | </span>
                  <span className="text-blue-400">number</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p>
                  <span className="text-blue-300">type</span>
                  <span className="text-yellow-300"> Status</span>
                  <span className="text-gray-300"> = </span>
                  <span className="text-green-300">"active"</span>
                  <span className="text-gray-300"> | </span>
                  <span className="text-green-300">"inactive"</span>
                  <span className="text-gray-300"> | </span>
                  <span className="text-green-300">"pending"</span>
                  <span className="text-gray-300">;</span>
                </p>
              </div>
            </div>

            {/* 交差型 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(79,133,200,0.06)", borderColor: "rgba(79,133,200,0.3)" }}
            >
              <p className="text-xs font-semibold text-blue-300 mb-3">交差型（&）——「AかつB」を表す</p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">type</span>
                  <span className="text-yellow-300"> Timestamped</span>
                  <span className="text-gray-300"> = {"{"}</span>
                  <span className="text-orange-300"> createdAt</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-blue-400">Date</span>
                  <span className="text-gray-300"> {"}"}</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p>
                  <span className="text-blue-300">type</span>
                  <span className="text-yellow-300"> UserWithTimestamp</span>
                  <span className="text-gray-300"> = </span>
                  <span className="text-yellow-300">User</span>
                  <span className="text-gray-300"> & </span>
                  <span className="text-yellow-300">Timestamped</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p className="mt-2">
                  <span className="text-gray-500">{"// User の全プロパティ + createdAt を持つ型"}</span>
                </p>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 React の props に interface を使う実例">
          <p>
            ReactのコンポーネントのProps型定義は、interface を使うのが最も多いパターンです。
            コンポーネントが何を受け取るかが一目で分かり、型安全なpropsの受け渡しが実現します。
          </p>
          <CodeBlock
            title="Button.tsx"
            language="typescript"
            code={`interface ButtonProps {
  label: string;          // 必須: ボタンのテキスト
  onClick: () => void;    // 必須: クリック時の処理
  disabled?: boolean;     // 省略可能: 非活性状態
  variant?: "primary" | "secondary"; // 省略可能: スタイル種類
}

function Button({ label, onClick, disabled, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
}

// 正しい使い方
<Button label="送信" onClick={() => console.log("クリック！")} />

// 型が合わない場合はエラー
<Button label={42} />  // エラー: label は string が期待されている`}
          />
          <KeyPoint>
            Props 型を interface で定義すると、コンポーネントを使う側が「何を渡すべきか」をコードを読むだけで把握できる。ドキュメントよりも正確で、常に最新の状態が保たれる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 よくある誤解：interface と type はどちらかが優れている">
          <CorrectionCard
            misconception="interface と type のどちらかが「正解」で、もう一方は間違い"
            correction="どちらも同じことを表現できる場面が多く、「どちらが優れているか」という問題ではない。チームのコーディング規約や既存コードのスタイルに合わせるのが正解"
            reason="長年にわたるコミュニティの議論の結果、「オブジェクト形状は interface、それ以外は type」という使い分けが広く普及している。ただし type だけに統一しているプロジェクトも多く、どちらでも機能的な差はほとんどない。"
          />
        </DetailBlock>

        <DetailBlock heading="6.3 interface と type の使い分けガイド">
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: GitMerge,
                title: "interface を使う場面",
                subtitle: "オブジェクト形状・React props",
                description: "extends で継承したい場合・クラスに implements したい場合・ライブラリの型定義を拡張したい場合（Declaration Merging）。",
                accentColor: "blue",
              },
              {
                Icon: Combine,
                title: "type を使う場面",
                subtitle: "ユニオン型・プリミティブ型の別名",
                description: "string | number のようなユニオン型・リテラル型（\"active\" | \"inactive\"）・関数型・プリミティブ型に別名をつける場合。",
                accentColor: "indigo",
              },
            ]}
          />
          <WarningPoint>
            同じプロジェクトで interface と type を混在させすぎると読みにくくなる。チームで「どちらを基本にするか」を決めておくと迷いがなくなる。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/typescript/basic-types",
            title: "基本型と型推論",
            description: "前のページ。string / number / boolean の型付け基礎",
            icon: "Layers",
          },
          {
            href: "/typescript/react-types",
            title: "React での型付け",
            description: "次のステップ。props・useState・event の実践的な型付け",
            icon: "Code2",
          },
          {
            href: "/typescript/generics",
            title: "ジェネリクス入門",
            description: "<T> を使って再利用可能な型を作る",
            icon: "Puzzle",
          },
        ]}
      />

      <PageDrill questions={interfaceTypeQuestions} />
    </div>
  );
}
