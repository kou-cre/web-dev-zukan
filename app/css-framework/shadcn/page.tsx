import {
  Package,
  Terminal,
  FolderOpen,
  Code2,
  Layers,
  RefreshCw,
  Puzzle,
  Pencil,
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
import { shadcnQuestions } from "@/content/questions/css-framework/shadcn";

export const metadata = {
  title: "shadcn/ui | Web開発図解",
  description:
    "shadcn/uiはTailwindベースのコンポーネントライブラリ。npx shadcn addでソースコードがプロジェクトにコピーされる独自の設計思想を図解で解説。",
};

export default function ShadcnPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/css-framework" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← CSSフレームワーク に戻る
        </Link>
      </div>

      <Hero
        category="CSSフレームワーク"
        title="shadcn/ui"
        subtitle={"ライブラリをインストールせず、コードを「所有する」コンポーネント"}
        body={"npx shadcn add でソースコードがプロジェクトに入る。改変自由・バンドルゼロという独自の設計思想。"}
        accentColor="cyan"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "shadcn/uiとは何か（Tailwindベースのコンポーネントライブラリ）",
          "npx shadcn add button で何が起きるか（ソースコードがコピーされる）",
          "なぜnpm installではなくコードをコピーする設計なのか",
        ]}
        prerequisites={[
          "Tailwind CSSの基本クラスを知っている（tailwind-intro を読んだ）",
          "Reactコンポーネントを使ったことがある",
          "npm / npx コマンドを使ったことがある",
        ]}
        outOfScope={[
          "CSS変数を使ったテーマの全面カスタマイズ（応用編で扱う）",
          "form系コンポーネント（Input / Select / Checkbox）の詳細",
          "RadixUIの概念（shadcn/uiの土台となるヘッドレスUIライブラリ）",
        ]}
      />

      <OnePageSummary
        keyMessage="shadcn/uiはコンポーネントのコードをそのままプロジェクトにコピーするライブラリ。npx shadcn@latest add button でButtonコンポーネントのソースコードが components/ui/ に生成される。node_modulesには入らないので、好きなように改変できる。"
        metaphorTitle="レシピカードを手元に書き写す"
        metaphorPoints={[
          {
            label: "通常のUIライブラリ",
            real: "npm installで node_modules に入る。内部は触れず、提供されたAPIとスタイルの範囲内で使う",
            metaphor: "レストランのメニューから注文",
          },
          {
            label: "shadcn/ui",
            real: "npx addでソースコードがプロジェクトに入る。中身を直接編集できる",
            metaphor: "シェフがレシピカードを手渡す",
          },
          {
            label: "components/ui/",
            real: "shadcn/uiのコンポーネントが生成される場所。button.tsx・input.tsx などが入る",
            metaphor: "自分のレシピカード置き場",
          },
          {
            label: "Tailwind + RadixUI",
            real: "shadcn/uiの2つの基盤。RadixUI がアクセシビリティ、Tailwind が見た目を担当",
            metaphor: "食材（RadixUI）と調理法（Tailwind）",
          },
        ]}
        definition="shadcn/uiとは、Reactコンポーネントのソースコードをプロジェクトに直接コピーするスタイルのUIライブラリ。バンドルに含まれず、完全に改変可能なコンポーネントを提供する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「通常のUIライブラリ」と「shadcn/ui」で何が違うのかを比較してみましょう。
        </p>

        {/* ── 概念図A: 通常のUIライブラリ vs shadcn/ui ── */}
        <ConceptDiagram
          title="概念図A"
          description="npm install と npx shadcn add — 何がどこに入るのか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 通常のライブラリ */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-semibold text-gray-300">通常のUIライブラリ</p>
                <span className="text-xs text-gray-500 ml-auto">例: MUI・Chakra</span>
              </div>
              <div
                className="rounded-lg border p-3 font-mono text-xs mb-3"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p className="text-green-300">$ npm install @mui/material</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-gray-400">
                  <FolderOpen className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>node_modules に入る（プロジェクトには見えない）</span>
                </div>
                <div className="flex items-start gap-2 text-gray-400">
                  <RefreshCw className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>npm update で最新版に更新</span>
                </div>
                <div className="flex items-start gap-2 text-gray-400">
                  <Code2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>内部コードは編集不可（APIの範囲内で使う）</span>
                </div>
              </div>
            </div>

            {/* shadcn/ui */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(6,182,212,0.05)",
                borderColor: "rgba(6,182,212,0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Puzzle className="w-4 h-4 text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-300">shadcn/ui</p>
                <span className="text-xs text-cyan-600 ml-auto">コードをコピー</span>
              </div>
              <div
                className="rounded-lg border p-3 font-mono text-xs mb-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-green-300">$ npx shadcn@latest add button</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>components/ui/button.tsx がプロジェクトに生成</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>node_modules には入らない（自分のコード）</span>
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>中身を自由に編集できる（完全な所有）</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            shadcn/ui はコンポーネントを「使う」のではなく「所有する」設計。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          shadcn/uiの特徴が分かりました。次はshadcn/uiがどんな技術の上に成り立っているかを確認しましょう。
        </p>

        {/* ── 概念図B: 構成レイヤー ── */}
        <ConceptDiagram
          title="概念図B"
          description="shadcn/ui は2つの技術の組み合わせでできている"
        >
          <div className="space-y-2">
            <StackLayer
              Icon={Puzzle}
              title="shadcn/ui（コンポーネント）"
              subtitle="Button・Input・Dialog・Card など、見た目付きの使いやすいコンポーネント群"
              iconColor="text-cyan-400"
            />
            <StackLayer
              Icon={Layers}
              title="Tailwind CSS（スタイリング）"
              subtitle="全コンポーネントのスタイルはTailwindクラスで書かれている。カスタマイズもTailwindで行う"
              iconColor="text-cyan-400"
            />
            <StackLayer
              Icon={CheckCircle}
              title="Radix UI（ヘッドレスUI・アクセシビリティ）"
              subtitle="モーダルの開閉・キーボード操作・スクリーンリーダー対応などの動作ロジックを担当"
              iconColor="text-gray-400"
              showArrow={false}
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.3)" }}
          >
            <p className="text-xs font-semibold text-cyan-300 mb-2">ヘッドレスUIとは？</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              RadixUIは「見た目なし・動作だけ」のコンポーネントライブラリ（ヘッドレスUI）。
              モーダルが開く・閉じる・Escキーで閉じる・スクリーンリーダーに対応する、という動作だけを提供して、
              スタイルは一切持たない。shadcn/uiはこれにTailwindでスタイルをかぶせたもの。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "shadcn/uiって `npm install shadcn` じゃないんですか？ なぜ `npx shadcn add` って書くんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "shadcn/uiはライブラリとしてインストールするのではなく、コンポーネントのソースコードをプロジェクトに直接コピーする仕組みです。\nシェフがキッチンにやってきてレシピカードを手渡すイメージです。\nレシピは自分のものになるので、好きなように書き換えられます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え！ じゃあ `npx shadcn add button` を実行すると、button.tsx という自分のコードが増えるということですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そうです。`components/ui/button.tsx` というファイルが生成されます。\nそのファイルは完全に自分のプロジェクトの一部なので、色を変えたり、サイズの種類を追加したり、自由に編集できます。\nnode_modules に入るライブラリとは根本的に違います。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "でも、shadcn/uiがアップデートされたとき、どうやって最新版を取り込むんですか？ 自動更新してくれないですよね？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "それはトレードオフです。\n「自由に改変できる」代わりに「アップデートは手動」になります。\nただ、実際のプロジェクトではデザインをカスタマイズするのが普通なので、自動更新で自分の変更が上書きされる方が困る場合も多いんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか……！ ボク、ライブラリって「触らずに使う」ものだと思ってたんですが、shadcn/uiは「使う」より「所有する」感覚なんですね。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "まさにそれがshadcn/uiの発明です。\nコンポーネントがプロジェクトの中に住んでいるので、自分のコードの一部として扱える。\nデザインシステムを自分でコントロールしながら、でも0から書く手間は省ける——この絶妙なバランスが現在多くのプロジェクトで採用されている理由です、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["通常のUIライブラリ", "shadcn/ui"]}
          rows={[
            {
              label: "インストール方法",
              cells: ["npm install", "npx shadcn add（コードコピー）"],
              highlightCol: 1,
            },
            {
              label: "コンポーネントの置き場",
              cells: ["node_modules/（プロジェクト外）", "components/ui/（プロジェクト内）"],
              highlightCol: 1,
            },
            {
              label: "内部コードの編集",
              cells: ["不可（APIの範囲内で使う）", "自由に編集できる"],
              highlightCol: 1,
            },
            {
              label: "アップデート",
              cells: ["npm update で自動更新", "手動（上書きのリスクなし）"],
              highlightCol: 0,
            },
            {
              label: "バンドルサイズ",
              cells: ["ライブラリ全体が含まれる", "使ったコンポーネントのコードのみ"],
              highlightCol: 1,
            },
          ]}
          note="どちらが優れているのではなく用途で選ぶ。速く開発したい・カスタマイズが必要な場合にshadcn/uiが向く。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はCSS変数を使ったテーマカスタマイズとRadixUIの詳細です。まずコンポーネントを使えるようになってから読んでください。"
      />

      {/* ── 応用編 ────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — CSS変数とテーマカスタマイズ
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          shadcn/uiはCSS変数でカラーシステムを管理しています。この仕組みを理解するとダークモードとの連携が見えてきます。
        </p>

        <TermNote
          terms={[
            {
              word: "CSS変数（カスタムプロパティ）",
              definition:
                "CSSで --color-primary: #22d3ee; のように定義し、var(--color-primary) で参照できる値。shadcn/uiはこの仕組みでカラーテーマを管理する。",
            },
            {
              word: "cn() 関数",
              definition:
                "shadcn/uiが提供するclsx + tailwind-mergeを組み合わせたユーティリティ。条件付きクラスを安全にマージするために使う。コンポーネント内でよく見かける。",
            },
            {
              word: "variants（cva）",
              definition:
                "class-variance-authority の略。ボタンのサイズ（sm / md / lg）やスタイル（default / outline / ghost）をバリアントとして定義する仕組み。shadcn/uiコンポーネントの内部で使われている。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="shadcn/ui のテーマはCSS変数で管理される"
        >
          <div
            className="rounded-xl border p-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-2">{"/* globals.css — shadcn/ui のCSS変数 */"}</p>
            <p className="text-blue-300">{":root {"}</p>
            <p className="ml-4">
              <span className="text-cyan-300">--background</span>
              <span className="text-gray-300">: 0 0% 100%;</span>
              <span className="text-gray-500 ml-2">{"/* 白 */"}</span>
            </p>
            <p className="ml-4">
              <span className="text-cyan-300">--foreground</span>
              <span className="text-gray-300">: 222.2 84% 4.9%;</span>
              <span className="text-gray-500 ml-2">{"/* ほぼ黒 */"}</span>
            </p>
            <p className="ml-4">
              <span className="text-cyan-300">--primary</span>
              <span className="text-gray-300">: 221.2 83.2% 53.3%;</span>
              <span className="text-gray-500 ml-2">{"/* アクセントカラー */"}</span>
            </p>
            <p className="text-blue-300">{"}"}</p>
            <p className="mt-2 text-blue-300">{".dark {"}</p>
            <p className="ml-4">
              <span className="text-cyan-300">--background</span>
              <span className="text-gray-300">: 222.2 84% 4.9%;</span>
              <span className="text-gray-500 ml-2">{"/* ダークモードでは暗く */"}</span>
            </p>
            <p className="ml-4">
              <span className="text-cyan-300">--foreground</span>
              <span className="text-gray-300">: 210 40% 98%;</span>
              <span className="text-gray-500 ml-2">{"/* ダークモードでは白に */"}</span>
            </p>
            <p className="text-blue-300">{"}"}</p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            .dark クラスがhtml要素に付くと変数が切り替わり、全コンポーネントのカラーが同時に変化する。
          </p>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 インストールから使い始めるまでの手順">
          <p>
            shadcn/uiを使い始めるには、まずプロジェクト全体の初期化と、使いたいコンポーネントの個別追加の2ステップがある。
          </p>
          <CodeBlock
            title="shadcn-setup.sh"
            language="bash"
            code={`# ① プロジェクトを初期化（設定ファイルと基本ファイルが生成される）
npx shadcn@latest init

# ② 使いたいコンポーネントを個別に追加
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add card

# 複数まとめて追加することもできる
npx shadcn@latest add button input dialog card`}
          />
          <CodeBlock
            title="button-usage.tsx"
            language="jsx"
            code={`// 生成されたコンポーネントをインポートして使う
import { Button } from "@/components/ui/button"

export function MyForm() {
  return (
    <div className="flex gap-2">
      <Button>デフォルト</Button>
      <Button variant="outline">アウトライン</Button>
      <Button variant="ghost">ゴースト</Button>
      <Button size="sm">小さいボタン</Button>
    </div>
  )
}`}
          />
          <KeyPoint>
            shadcn/uiのコンポーネントはプロジェクトに入った瞬間から自分のコードになる。button.tsx を開いてスタイルを変えても良いし、新しいvariantを追加しても良い。「ライブラリのルール内で使う」制約がない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 なぜshadcn/uiが選ばれるのか">
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: Pencil,
                title: "改変の自由",
                subtitle: "コードを所有する",
                description: "コンポーネントのソースが手元にあるので、デザインシステムに合わせて自由に改変できる。プロジェクト固有のスタイルを強制しない。",
                accentColor: "cyan",
              },
              {
                Icon: Package,
                title: "バンドルサイズゼロ",
                subtitle: "使ったコードだけ",
                description: "node_modulesに入らないので、使っていないコンポーネントがバンドルに含まれない。使ったファイルのコードだけがビルドに含まれる。",
                accentColor: "cyan",
              },
              {
                Icon: CheckCircle,
                title: "アクセシビリティ",
                subtitle: "RadixUIの基盤",
                description: "Radix UIがキーボード操作・フォーカス管理・スクリーンリーダー対応を担当。自分で実装する必要がない部分をカバーしてくれている。",
                accentColor: "cyan",
              },
            ]}
          />
          <CorrectionCard
            misconception="shadcn/uiを入れると、プロジェクトにshadcn/uiのコードがnode_modulesに入る"
            correction="shadcn/uiはnode_modulesには入らない。npx shadcn addを実行すると、components/ui/以下にソースコードが生成される。これはあなたのプロジェクトコードの一部になる。"
            reason="shadcn/uiのcliは「コードジェネレーター」として動作する。実体は、shadcn.devのサーバーからコンポーネントのソースコードを取得して、プロジェクトに書き出すだけ。"
          />
        </DetailBlock>

        <DetailBlock heading="7.3 cn() 関数と conditional classes">
          <p>
            shadcn/uiのコンポーネント内でよく見かける <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>cn()</code>{" "}
            は条件付きクラスを安全にマージする関数。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>clsx</code>と{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#22d3ee" }}>tailwind-merge</code>{" "}
            を組み合わせたもので、Tailwindのクラスの優先順位の衝突を自動で解決してくれる。
          </p>
          <CodeBlock
            title="cn-usage.tsx"
            language="tsx"
            code={`import { cn } from "@/lib/utils" // shadcn initで生成されるユーティリティ

function Button({ className, disabled, children }) {
  return (
    <button
      className={cn(
        // ベースのスタイル
        "px-4 py-2 rounded-lg font-semibold text-sm",
        // 条件付きスタイル
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-cyan-500 text-white hover:bg-cyan-600",
        // 外から渡されたclassNameでオーバーライド可能
        className
      )}
    >
      {children}
    </button>
  )
}`}
          />
          <WarningPoint>
            cn() なしでクラスを文字列結合すると、Tailwindの優先順位の衝突が発生する場合がある。たとえば外から `p-2` を渡したのに内部の `p-4` が優先されてしまう問題が起きる。cn()（tailwind-merge）がこれを解決するため、shadcn/uiのコンポーネントでは必ずcn()を使うのが慣習。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/css-framework/dark-mode",
            title: "ダークモード対応",
            description: "次のステップ。shadcn/uiのCSS変数とdark:クラスの連携",
            icon: "Moon",
          },
          {
            href: "/css-framework/tailwind-intro",
            title: "Tailwind CSS とは",
            description: "shadcn/uiの基盤となるTailwindの基礎に戻る",
            icon: "Wand2",
          },
          {
            href: "/css-framework/common-classes",
            title: "よく使うクラス",
            description: "shadcn/uiのコンポーネントを編集するときに使うクラス一覧",
            icon: "LayoutGrid",
          },
        ]}
      />

      <PageDrill questions={shadcnQuestions} />
    </div>
  );
}
