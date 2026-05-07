import {
  Package,
  Layers,
  Zap,
  Code2,
  RefreshCw,
  Shield,
  GitBranch,
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
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CorrectionCard } from "@/components/CorrectionCard";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { zustandQuestions } from "@/content/questions/state/zustand";

export const metadata = {
  title: "Zustand | Web開発図解",
  description:
    "Zustandを図解で解説。シンプルなグローバル状態管理ライブラリのcreate・useStore・setの基本パターンを習得する。",
};

export default function ZustandPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/state" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 状態管理に戻る
        </Link>
      </div>

      <Hero
        category="状態管理"
        title="Zustand"
        subtitle={"最小限の記述でグローバル状態を管理するシンプルなライブラリ"}
        body={"create・useStore・set の3つだけ覚えれば、ほとんどのユースケースに対応できる。"}
        accentColor="teal"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Zustand の create・useStore・set の基本パターン",
          "Context API との違いと使い分けの判断",
          "Zustand が向いているユースケース",
        ]}
        prerequisites={[
          "useState の基本を知っている",
          "グローバルな状態共有（Props のバケツリレー問題）のイメージがある",
          "npm install で外部ライブラリを追加できる（Zustand は別途インストールが必要）",
        ]}
        outOfScope={[
          "Zustand の middleware（persist・immer など）の詳細",
          "Redux との詳細な比較",
          "TypeScript での厳密な型付けパターン（応用編で軽く触れる）",
        ]}
      />

      <OnePageSummary
        keyMessage="Zustand（ツスタント）はシンプルなグローバル状態管理ライブラリ。create で状態とアクションを定義し、コンポーネントから useStore（カスタムhook）で取り出すだけで使える。Context API のように Provider でラップする必要がなく、re-render も必要な箇所にだけ起きるため設定が最小で済む。"
        metaphorTitle="共有のホワイトボード"
        metaphorPoints={[
          {
            label: "Zustand Store",
            real: "会議室の共有ホワイトボード。誰でも読めて、誰でも書ける状態の置き場所。",
            metaphor: "共有ホワイトボード",
          },
          {
            label: "useStore",
            real: "ホワイトボードを見に行く行為。必要なコンポーネントが必要な値だけ読みに行く。",
            metaphor: "ホワイトボードを見る",
          },
          {
            label: "set",
            real: "ホワイトボードを書き換える行為。書いた瞬間に「読んでいた人」だけが気づいて更新される。",
            metaphor: "ホワイトボードに書く",
          },
        ]}
        definition="Zustand は create で store を作り、useStore Hook でコンポーネントから状態を取り出すグローバル状態管理ライブラリ。設定量が最小でProvider不要。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          まず Zustand の基本的な仕組みを掴み、次に Context と比較して使い分けを確認します。
        </p>

        {/* ── 概念図A: Zustand の仕組み ── */}
        <ConceptDiagram
          title="概念図A"
          description="create でストアを定義し、useStore でどこからでも取り出せる"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Package}
              title="create()"
              subtitle="状態 + アクションを定義"
              accentColor="teal"
            />
            <FlowArrow label="カスタム hook を生成" direction="right" />
            <FlowCard
              Icon={Layers}
              title="useStore Hook"
              subtitle="コンポーネントから呼ぶ"
              highlight
              accentColor="teal"
            />
            <FlowArrow label="値を取得・更新" direction="right" />
            <FlowCard
              Icon={RefreshCw}
              title="自動 re-render"
              subtitle="購読した値が変わったとき"
              accentColor="teal"
            />
          </div>

          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// ストア定義（store.ts）"}</p>
            <p>
              <span className="text-blue-300">import</span>
              <span className="text-gray-300">{" { create } "}</span>
              <span className="text-blue-300">from</span>
              <span className="text-green-300">{" 'zustand'"}</span>
            </p>
            <p className="mt-1">
              <span className="text-blue-300">const</span>
              <span className="text-gray-300">{" useCounterStore = "}</span>
              <span className="text-yellow-300">create</span>
              <span className="text-gray-300">{"((set) => ({"}</span>
            </p>
            <p className="ml-4">
              <span className="text-sky-300">count</span>
              <span className="text-gray-300">{": "}</span>
              <span className="text-orange-300">0</span>
              <span className="text-gray-300">,</span>
            </p>
            <p className="ml-4">
              <span className="text-sky-300">increment</span>
              <span className="text-gray-300">{": () => "}</span>
              <span className="text-yellow-300">set</span>
              <span className="text-gray-300">{"((s) => ({ count: s.count + 1 })),"}</span>
            </p>
            <p className="ml-4">
              <span className="text-sky-300">reset</span>
              <span className="text-gray-300">{": () => "}</span>
              <span className="text-yellow-300">set</span>
              <span className="text-gray-300">{"({ count: 0 }),"}</span>
            </p>
            <p>
              <span className="text-gray-300">{"}))"}</span>
            </p>
            <p className="mt-3 text-gray-500">{"// コンポーネントで使う（Providerは不要）"}</p>
            <p>
              <span className="text-blue-300">const</span>
              <span className="text-gray-300">{" { count, increment } = "}</span>
              <span className="text-yellow-300">useCounterStore</span>
              <span className="text-gray-300">();</span>
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Provider でラップ不要。import して useCounterStore() を呼ぶだけで動く。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          Zustand の基本が分かりました。次は「Context と何が違うのか」を比較して確認します。
        </p>

        {/* ── 概念図B: Zustand vs Context の違い ── */}
        <ConceptDiagram
          title="概念図B"
          description="Zustand と Context API の構造上の違い"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
                Context API
              </p>
              <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <Layers className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Provider でコンポーネントツリーをラップ必要</span>
                </div>
                <div className="flex items-start gap-2">
                  <Layers className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>値が変わると Provider 以下全体が再レンダリング</span>
                </div>
                <div className="flex items-start gap-2">
                  <Layers className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>外部ライブラリ不要（React 標準）</span>
                </div>
              </div>
              <div
                className="mt-3 rounded-lg px-3 py-2 text-xs"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <p className="text-gray-500 mb-1">必要な手順:</p>
                <p className="text-gray-400">1. createContext</p>
                <p className="text-gray-400">2. Provider でラップ</p>
                <p className="text-gray-400">3. useContext で取り出す</p>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(20,184,166,0.05)",
                borderColor: "rgba(20,184,166,0.35)",
              }}
            >
              <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3 text-center">
                Zustand
              </p>
              <div className="space-y-2 text-xs text-gray-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>Provider ラップ不要</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>購読した値が変わったコンポーネントだけ再レンダリング</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>npm install zustand が必要</span>
                </div>
              </div>
              <div
                className="mt-3 rounded-lg px-3 py-2 text-xs"
                style={{ backgroundColor: "#0f1117" }}
              >
                <p className="text-gray-500 mb-1">必要な手順:</p>
                <p className="text-gray-300">1. create でストア定義</p>
                <p className="text-gray-300">2. useStore を import して呼ぶ</p>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "Zustand って、ContextとuseReducerを組み合わせれば同じことができるんじゃないですか？ わざわざ別のライブラリを使う理由はなんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "ホワイトボードで考えてみましょう、マジさん。\nContext は「掲示板の前に柵を作って、その中にいる人だけが見られる」仕組みです。Provider というのがその柵の役割です。\nZustand は「カギのかかっていない共有ホワイトボード」。柵なしで誰でも見に行けて、書き換えられる。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "あ、Providerが不要ってことですか！ それは確かに便利そうですね……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "もう一つ大事な違いがあります。Contextは値が変わると柵の中にいる全員が「変わったかな？」と確認します。\nでもZustandは「この値を使っている人だけ」に通知します。関係ないコンポーネントは眠ったままでいられる。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ つまりパフォーマンスの面でもZustandのほうが優れている？ じゃあどんな値でもZustandにしたほうがいいですか……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "頻繁に変わる値に限ってはそうです。テーマや言語設定のように「滅多に変わらない値」はContextで十分です。\nまず判断してください：変化が少ない値（テーマ・ログインユーザー）はContext。カート・検索フィルタなど変化が多くてアプリ全体で使う値がZustandの候補です。",
          },
          {
            speaker: "maji",
            emotion: "down",
            text: "最初から完璧に使い分けられないんですね……ボク、全部Zustandにしようとしてました。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "それはよくある過剰設計です、マジさん。ツールは「必要になったら使う」が鉄則。動くコードを書いて必要が出たら改善する方が大切ですよ。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["Context API", "Zustand"]}
          rows={[
            {
              label: "セットアップ",
              cells: ["Provider でラップが必要", "不要（import して呼ぶだけ）"],
              highlightCol: 1,
            },
            {
              label: "外部ライブラリ",
              cells: ["不要（React 標準）", "要インストール（npm install zustand）"],
              highlightCol: 0,
            },
            {
              label: "re-render の範囲",
              cells: ["Provider 以下の useContext 全コンポーネント", "その値を購読しているコンポーネントのみ"],
              highlightCol: 1,
            },
            {
              label: "適した変化の頻度",
              cells: ["低頻度（テーマ・言語設定）", "中〜高頻度（カート・フィルタ）"],
              highlightCol: 1,
            },
            {
              label: "コード量",
              cells: ["createContext + Provider + useContext", "create + useStore（2ステップのみ）"],
              highlightCol: 1,
            },
          ]}
          note="どちらも「グローバル状態共有」の手段。Contextはシンプルな用途に、Zustandは変化が多く広く使うクライアント状態に向いている。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は Zustand の実践的なパターンと TypeScript での型付けです。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 実践パターンと TypeScript
        </h2>

        <TermNote
          terms={[
            {
              word: "create",
              definition: "Zustandのストアを作成する関数。(set, get) => ({}) の形でステートとアクションを定義する。",
            },
            {
              word: "set",
              definition: "Zustandがcreateのコールバックに渡す状態更新関数。set({ count: 1 }) または set((s) => ({ count: s.count + 1 })) の形で使う。",
            },
            {
              word: "get",
              definition: "createのコールバックで使える、現在のstoreの値を読む関数。アクション内で現在の状態を参照したいときに使う。",
            },
            {
              word: "selector",
              definition: "useStore に渡す関数で、storeから取り出す値を絞り込む。(state) => state.count のように書く。不要な再レンダリングを防ぐ効果がある。",
            },
            {
              word: "persist middleware",
              definition: "Zustandの組み込みmiddleware。storeの値をlocalStorageに自動保存・復元する。ページリロード後も状態を保持したいときに使う。",
            },
          ]}
        />

        <ConceptDiagram
          title="応用図A"
          description="TypeScript で Zustand ストアを型安全に定義する"
        >
          <CodeBlock
            title="cart-store.ts"
            language="typescript"
            code={`import { create } from 'zustand';

type CartItem = {
  id: number;
  name: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalCount: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ items: [] }),

  // get() で現在の状態を読める
  totalCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
}));

// コンポーネントで使う
// selector で必要な値だけ取り出す（不要な re-render を防ぐ）
const items = useCartStore((state) => state.items);
const addItem = useCartStore((state) => state.addItem);`}
          />
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="Zustand が向いているユースケース">
          <p>
            Zustand はクライアント状態の中でも「グローバルに共有するが、変化の頻度が高い」値に特に向いている。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Package,
                title: "ショッピングカート",
                subtitle: "頻繁に変わるグローバル状態",
                description: "どのページからでも追加・削除できる。変化頻度が高くContextでは再レンダリングの影響が大きい。",
                accentColor: "teal",
              },
              {
                Icon: Code2,
                title: "検索フィルタ・ソート条件",
                subtitle: "複数コンポーネントで共有",
                description: "フィルターパネル・一覧コンポーネント・URL同期など多箇所から読み書きする。",
                accentColor: "teal",
              },
              {
                Icon: RefreshCw,
                title: "通知・トースト管理",
                subtitle: "どこからでも追加できる状態",
                description: "API呼び出しの成功・失敗をどのコンポーネントからでも通知として出したい場合。",
                accentColor: "teal",
              },
              {
                Icon: Shield,
                title: "認証状態",
                subtitle: "ログイン・ログアウト",
                description: "ログイン状態・ユーザー情報をグローバルに保持し、ログアウト時に一括クリアする。",
                accentColor: "teal",
              },
            ]}
          />
          <KeyPoint>
            Zustandの最大の強みはシンプルさ。create → useStore の2ステップだけで動き、TypeScriptとの相性も良い。学習コストが低く、ほとんどのケースで useReducer + Context のより良い代替になる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="selector で re-render を最小化する">
          <p>
            Zustandでは、useStore に selector（選択関数）を渡すことで、取り出した値が変わったときだけ再レンダリングを起こせる。
          </p>
          <CodeBlock
            title="selector-pattern.tsx"
            language="typescript"
            code={`// ❌ store 全体を取り出す（どの値が変わっても re-render）
const store = useCartStore();
const items = store.items;

// ✅ 必要な値だけ取り出す（items が変わったときのみ re-render）
const items = useCartStore((state) => state.items);
const totalCount = useCartStore((state) => state.totalCount());

// アクション（関数）はそのまま取り出す
// ← 関数の参照は変わらないので re-render の原因にならない
const addItem = useCartStore((state) => state.addItem);`}
          />
          <CorrectionCard
            misconception="Zustand を使えば re-render は完全になくなる"
            correction="Zustand は「購読した値が変わったコンポーネントだけ」再レンダリングする。selector を使わないと不要な re-render が起きることもある"
            reason="useCartStore() と store 全体を取り出した場合、store の任意の値が変わるたびに再レンダリングされる。selector で必要な値だけを購読することで最小化できる。"
          />
          <WarningPoint>
            Zustand の set 関数でオブジェクトや配列を更新するときも、イミュータブルな更新が基本。state.items.push() のような直接変更ではなく、スプレッド構文や filter・map を使った新しい配列を作って渡す。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="useState / Context / Zustand の使い分けまとめ">
          <p>
            3つの手段が揃ったので、最終的な使い分けの判断基準を整理しよう。
          </p>
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: GitBranch,
                title: "useState",
                subtitle: "コンポーネントローカル",
                description: "そのコンポーネント内だけで使う状態。他のコンポーネントに共有不要な値。",
                accentColor: "teal",
              },
              {
                Icon: Layers,
                title: "Context API",
                subtitle: "変化が少ないグローバル値",
                description: "テーマ・言語・ログインユーザー。変化頻度が低く、多くの場所で使う設定値。",
                accentColor: "teal",
              },
              {
                Icon: Package,
                title: "Zustand",
                subtitle: "変化が多いグローバル値",
                description: "カート・フィルタ・通知。変化頻度が高く、複数コンポーネントで共有するクライアント状態。",
                accentColor: "teal",
              },
            ]}
          />
          <KeyPoint>
            サーバーデータ（APIから取得するもの）はこの3つではなく TanStack Query が担当する。クライアント状態とサーバー状態の区別を先に確認してから、クライアント状態の管理手段を選ぶ。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/state/tanstack-query",
            title: "TanStack Query",
            description: "サーバーデータの管理はZustandではなくこちら",
            icon: "DatabaseZap",
          },
          {
            href: "/state/context",
            title: "Context API",
            description: "Zustandと比較したContextの使い所を確認する",
            icon: "Share2",
          },
          {
            href: "/state/client-vs-server",
            title: "クライアント状態とサーバー状態",
            description: "Zustandが担うべき状態の種類を整理する",
            icon: "SplitSquareHorizontal",
          },
        ]}
      />

      <PageDrill questions={zustandQuestions} />
    </div>
  );
}
