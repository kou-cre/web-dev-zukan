import {
  Share2,
  Layers,
  AlertTriangle,
  TreePine,
  Users,
  Settings,
  Moon,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow, StackLayer } from "@/components/ConceptDiagram";
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
import { contextQuestions } from "@/content/questions/state/context";

export const metadata = {
  title: "Context API | Web開発図解",
  description:
    "ReactのContext APIを図解で解説。グローバルな状態共有の仕組み・re-renderの罠・適切な使い所を理解する。",
};

export default function ContextPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/state" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 状態管理に戻る
        </Link>
      </div>

      <Hero
        category="状態管理"
        title="Context API"
        subtitle={"Props バケツリレーを解決する——グローバルな状態共有の仕組み"}
        body={"Context は「何階層でも Props を渡す」問題を解決するが、使い方を誤ると予期しない再レンダリングを招く。"}
        accentColor="teal"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Props のバケツリレー問題とは何か",
          "Context で値をグローバルに共有する仕組み",
          "Context を使うと起きる re-render の罠",
        ]}
        prerequisites={[
          "Props（親から子に値を渡す仕組み）を知っている",
          "useState の基本を知っている",
          "コンポーネントツリー（親子関係）のイメージがある",
        ]}
        outOfScope={[
          "useReducer と Context の組み合わせパターン（応用編で軽く触れる）",
          "Context の代替としての Zustand の詳細（別ページ）",
          "コンテキストの分割と最適化（パフォーマンスチューニング）",
        ]}
      />

      <OnePageSummary
        keyMessage="Props のバケツリレーとは、親から孫ひ孫へと何段も Props を渡し続ける問題。Context APIはこれを解決するReact標準の仕組みで、コンポーネントツリーのどこからでも値を直接取り出せる。ただし、Contextの値が変わると Provider 以下の全コンポーネントが再レンダリングされるため、頻繁に変化する値には注意が必要。"
        metaphorTitle="社内の「掲示板」と「部署間の廊下渡し」"
        metaphorPoints={[
          {
            label: "Props のバケツリレー",
            real: "部長から課長・係長・担当者へと一枚の書類を何人もの手を経由して渡す。全員が「ただの仲介者」になってしまう。",
            metaphor: "廊下の書類バケツリレー",
          },
          {
            label: "Context",
            real: "社内掲示板に貼り出せば、見たい人が直接見に行ける。仲介者不要。",
            metaphor: "社内掲示板",
          },
          {
            label: "re-render の罠",
            real: "掲示板の内容が変わったとき、全員が「変わったかな？」と確認しに来る。確認だけでも時間がかかる。",
            metaphor: "全員が掲示板を見に来る",
          },
        ]}
        definition="Context APIはコンポーネントツリーを飛び越えて値を共有するReact標準の仕組み。createContext → Provider → useContext の3ステップで使う。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          まず「バケツリレー問題」の具体的なイメージを掴み、Context がどう解決するかを順番に確認します。
        </p>

        {/* ── 概念図A: Props バケツリレーと Context の比較 ── */}
        <ConceptDiagram
          title="概念図A"
          description="Props バケツリレー vs Context——何が変わるのか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* バケツリレー */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
                Props バケツリレー（問題）
              </p>
              <div className="space-y-1">
                {[
                  { label: "App（値の出所）", depth: 0, color: "#2dd4bf" },
                  { label: "Layout（受け渡すだけ）", depth: 1, color: "#94a3b8" },
                  { label: "Page（受け渡すだけ）", depth: 2, color: "#94a3b8" },
                  { label: "Section（受け渡すだけ）", depth: 3, color: "#94a3b8" },
                  { label: "Button（実際に使う）", depth: 4, color: "#f87171" },
                ].map(({ label, depth, color }, i) => (
                  <div
                    key={i}
                    className="rounded-lg px-3 py-1.5 text-xs flex items-center"
                    style={{
                      backgroundColor: "#1a1d2a",
                      marginLeft: `${depth * 12}px`,
                      borderLeft: `2px solid ${color}40`,
                    }}
                  >
                    <span style={{ color }}>{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-400 mt-3 text-center">
                中間コンポーネントが全員 theme prop を受け取る必要がある
              </p>
            </div>

            {/* Context */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(20,184,166,0.05)",
                borderColor: "rgba(20,184,166,0.35)",
              }}
            >
              <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3 text-center">
                Context（解決）
              </p>
              <div className="space-y-1">
                {[
                  { label: "ThemeContext.Provider（値を提供）", depth: 0, color: "#2dd4bf", highlight: true },
                  { label: "Layout（無視）", depth: 1, color: "#64748b" },
                  { label: "Page（無視）", depth: 2, color: "#64748b" },
                  { label: "Section（無視）", depth: 3, color: "#64748b" },
                  { label: "Button（直接 useContext）", depth: 4, color: "#2dd4bf", highlight: true },
                ].map(({ label, depth, color, highlight }, i) => (
                  <div
                    key={i}
                    className="rounded-lg px-3 py-1.5 text-xs flex items-center"
                    style={{
                      backgroundColor: highlight ? "rgba(20,184,166,0.1)" : "#0f1117",
                      marginLeft: `${depth * 12}px`,
                      border: highlight ? "1px solid rgba(20,184,166,0.3)" : "1px solid #1a1d2a",
                    }}
                  >
                    <span style={{ color }}>{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-teal-400 mt-3 text-center">
                中間コンポーネントは Props を受け取らなくてよい
              </p>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          バケツリレーが解決できました。次は Context の使い方を3ステップで確認します。
        </p>

        {/* ── 概念図B: Context の3ステップ ── */}
        <ConceptDiagram
          title="概念図B"
          description="Context API は createContext → Provider → useContext の3ステップで使う"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Share2}
              title="createContext"
              subtitle="Context オブジェクトを作る"
              accentColor="teal"
            />
            <FlowArrow label="Providerで包む" direction="right" />
            <FlowCard
              Icon={TreePine}
              title="Provider"
              subtitle="value prop で値を注入"
              highlight
              accentColor="teal"
            />
            <FlowArrow label="子孫で取り出す" direction="right" />
            <FlowCard
              Icon={Layers}
              title="useContext"
              subtitle="どこからでも値を取得"
              accentColor="teal"
            />
          </div>

          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// Step 1: Context を作る"}</p>
            <p>
              <span className="text-blue-300">const</span>
              <span className="text-gray-300">{" ThemeContext = "}</span>
              <span className="text-yellow-300">createContext</span>
              <span className="text-gray-300">(</span>
              <span className="text-green-300">{"'light'"}</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="mt-2 text-gray-500">{"// Step 2: Provider でコンポーネントを包む"}</p>
            <p>
              <span className="text-green-300">{"<ThemeContext.Provider"}</span>
              <span className="text-sky-300">{" value"}</span>
              <span className="text-gray-300">{"={theme}"}</span>
              <span className="text-green-300">{">"}</span>
            </p>
            <p className="ml-4">
              <span className="text-gray-500">{"<App />"}</span>
            </p>
            <p>
              <span className="text-green-300">{"</ThemeContext.Provider>"}</span>
            </p>
            <p className="mt-2 text-gray-500">{"// Step 3: 子孫コンポーネントで取り出す"}</p>
            <p>
              <span className="text-blue-300">const</span>
              <span className="text-gray-300">{" theme = "}</span>
              <span className="text-yellow-300">useContext</span>
              <span className="text-gray-300">(ThemeContext);</span>
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Provider の外で useContext を呼ぶと初期値（createContext に渡した値）が返る。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "Contextって、「Props を渡さなくてよくなる魔法」みたいなもんですか？ じゃあ全部Contextにすれば Props は不要なのでは……？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "社内の掲示板を思い浮かべてください、マジさん。\n「全社員向けのお知らせ」は掲示板に貼れば誰でも見られる。これがContextの役割です。\nでも「A さんへの個別の業務依頼」まで掲示板に貼りますか？",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "あー……それは普通に書類を手渡しますね。みんなに見せる必要はないし……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "Propsは手渡しの書類です。特定のコンポーネントへの直接的な情報伝達に最適。\nContextはその掲示板。全体に共有する情報——テーマ・言語設定・ログイン中のユーザー情報などに向いています。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ じゃあ「全部Contextにすれば楽じゃないか」って考えは……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "それには落とし穴があります、マジさん。Contextの値が変わると、そのContextを使っている全コンポーネントが再レンダリングされます。\n掲示板が更新されるたびに全社員が「何か変わった？」と確認しに走るイメージです。\nページのどこかで変わる値——フォームの入力途中・アニメーション状態などをContextに入れると、画面全体がカクつく原因になります。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "じゃあContextに何を入れていいか、判断が難しくないですか……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "シンプルな判断基準を一つ。「あまり変わらないが、多くの場所で必要な値」がContextに向いています。\nテーマ（ダーク/ライト）・言語設定・ログインユーザー——これらは変わる頻度が低く、多くのコンポーネントが必要とする典型例です。\n頻繁に変わる値はuseState（ローカル）かZustand（グローバル）で管理するほうが賢明です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど。「変わらないが広く必要な値→Context、頻繁に変わる値→useState/Zustand」。ボク、これを指針にします。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["Props", "Context"]}
          rows={[
            {
              label: "使い所",
              cells: ["親→子への直接的な値渡し", "多くのコンポーネントで共有する値"],
              highlightCol: 0,
            },
            {
              label: "中間コンポーネントの負担",
              cells: ["全員が Props を受け渡す必要あり", "関係ないコンポーネントはスルー"],
              highlightCol: 1,
            },
            {
              label: "再レンダリングの範囲",
              cells: ["Props が変わった子だけ", "useContext している全コンポーネント"],
              highlightCol: 0,
            },
            {
              label: "適した変化の頻度",
              cells: ["どちらでも", "あまり変わらない値が最適"],
              highlightCol: 0,
            },
            {
              label: "典型例",
              cells: ["ボタンの label・onClick", "テーマ・言語・ログインユーザー"],
            },
          ]}
          note="Contextは「Props のバケツリレーが深くなりすぎた場合」の解決策。全ての状態をContextに移すのは逆効果になる場合がある。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は re-render の罠の詳細と、useReducer との組み合わせパターンです。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — re-render の罠と対策
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          Context の値が変わると何が起きるのか、そして変化の影響を最小限にする分割の考え方を見ていきます。
        </p>

        <TermNote
          terms={[
            {
              word: "re-render",
              definition: "コンポーネント関数を再度実行して画面を更新すること。stateやpropsが変わるとReactが行う。",
            },
            {
              word: "Provider",
              definition: "Contextの値を子孫コンポーネントに提供するコンポーネント。<ThemeContext.Provider value={theme}> の形で使う。",
            },
            {
              word: "Contextの分割",
              definition: "1つの大きなContextを役割ごとに複数に分けること。値が変わったときの再レンダリング範囲を最小化できる。",
            },
            {
              word: "メモ化",
              definition: "React.memo や useMemo を使って、値が変わっていないコンポーネントの再レンダリングをスキップする最適化。",
            },
          ]}
        />

        <ConceptDiagram
          title="応用図A"
          description="Context の値が変わったときの再レンダリング範囲"
        >
          <div
            className="rounded-xl border border-amber-500/30 p-4 mb-4"
            style={{ backgroundColor: "rgba(245,158,11,0.05)" }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300 leading-relaxed">
                Context の value prop が変わると、
                <span className="text-amber-300 font-semibold"> useContext を呼んでいる全コンポーネント</span>が
                再レンダリングされる。Provider の直下の子かどうかに関係なく、ツリーの深い位置にあっても影響を受ける。
              </p>
            </div>
          </div>

          <StackLayer
            Icon={Share2}
            title="UserContext.Provider（頻繁に変わる値を注入）"
            subtitle="value が変わるたびに以下の全てが再レンダリング"
            iconColor="text-teal-400"
          />
          <StackLayer
            Icon={TreePine}
            title="Header（useContext を呼んでいる）→ 再レンダリング"
            subtitle="userコンテキストの値を使っているので影響を受ける"
            iconColor="text-amber-400"
          />
          <StackLayer
            Icon={TreePine}
            title="Sidebar（useContext を呼んでいる）→ 再レンダリング"
            subtitle="同上"
            iconColor="text-amber-400"
          />
          <StackLayer
            Icon={Layers}
            title="Footer（useContext を呼んでいる）→ 再レンダリング"
            subtitle="たとえ Footer が表示する内容に変化がなくても"
            iconColor="text-amber-400"
            showArrow={false}
          />

          <div
            className="rounded-lg border mt-4 p-4"
            style={{ backgroundColor: "rgba(20,184,166,0.05)", borderColor: "rgba(20,184,166,0.3)" }}
          >
            <p className="text-xs font-semibold text-teal-300 mb-3">対策: Context を役割ごとに分割する</p>
            <div
              className="rounded-lg p-3 font-mono text-xs leading-loose"
              style={{ backgroundColor: "#0f1117" }}
            >
              <p className="text-gray-500">{"// ❌ 全部まとめたContext（頻繁に変わるものも入っている）"}</p>
              <p>
                <span className="text-blue-300">const</span>
                <span className="text-gray-300">{" AppContext = createContext({ theme, user, cart });"}</span>
              </p>
              <p className="mt-2 text-gray-500">{"// ✅ 変化頻度で分割する"}</p>
              <p>
                <span className="text-blue-300">const</span>
                <span className="text-gray-300">{" ThemeContext = createContext(theme); "}</span>
                <span className="text-gray-500">{"// 滅多に変わらない"}</span>
              </p>
              <p>
                <span className="text-blue-300">const</span>
                <span className="text-gray-300">{" UserContext = createContext(user); "}</span>
                <span className="text-gray-500">{"// ログイン時に変わる"}</span>
              </p>
              <p>
                <span className="text-gray-500">{"// cart（頻繁に変わる）→ useState か Zustand が適切"}</span>
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="Context が向いているユースケース">
          <p>
            Contextは「多くのコンポーネントから必要だが、Props を通して渡すには階層が深すぎる」値に向いている。
            典型的なユースケースを確認しよう。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Moon,
                title: "テーマ（ダーク/ライト）",
                subtitle: "変化: 低",
                description: "ユーザーが設定で切り替えるが、頻繁には変わらない。アプリ全体に必要な典型的なユースケース。",
                accentColor: "teal",
              },
              {
                Icon: Users,
                title: "ログインユーザー情報",
                subtitle: "変化: 低（ログイン時のみ）",
                description: "ログインしたら変わり、その後はセッション中ほぼ固定。多くのコンポーネントで参照する。",
                accentColor: "teal",
              },
              {
                Icon: Settings,
                title: "言語・ロケール設定",
                subtitle: "変化: 極低",
                description: "国際化対応のi18nで使う言語設定。アプリ全体に影響し、ほとんど変わらない。",
                accentColor: "teal",
              },
              {
                Icon: Share2,
                title: "機能フラグ",
                subtitle: "変化: 低",
                description: "A/Bテストや開発中の機能の表示切り替え。デプロイ単位で変わる設定値。",
                accentColor: "teal",
              },
            ]}
          />
          <KeyPoint>
            Contextは「変化が少なく、広く必要な値」に使う。フォームの入力・モーダルの開閉など頻繁に変わる値をContextに入れると、不要な再レンダリングでパフォーマンスが落ちる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="Context の誤解と正しい使い方">
          <p>
            Context を学んだ直後によくある誤解を解消しておこう。
          </p>
          <CorrectionCard
            misconception="Context はグローバル状態管理ツール（Redux・Zustandと同じような用途）"
            correction="Context は「値を共有する仕組み」であり、「状態管理ライブラリ」ではない"
            reason="Context は createContext/Provider/useContext という配送システムを提供するだけで、キャッシュ・パフォーマンス最適化・devtools などの機能はない。複雑なグローバル状態管理には Zustand や Redux が適している。"
          />
          <CodeBlock
            title="context-with-reducer.tsx"
            language="typescript"
            code={`// Context + useReducer の組み合わせパターン
// useReducer で複雑なロジックを管理し、Context で配布する

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// 使う側のコンポーネント
function CartItem() {
  const { state, dispatch } = useContext(CartContext)!;
  return (
    <button onClick={() => dispatch({ type: 'REMOVE_ITEM', id: 1 })}>
      削除
    </button>
  );
}`}
          />
          <WarningPoint>
            Context の value に毎回新しいオブジェクトを渡すと、値が変わっていなくてもProviderが再レンダリングするたびに全 Consumer が更新される。useMemo で value をメモ化するか、state と dispatch を別々の Context に分けることで最適化できる。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/state/zustand",
            title: "Zustand",
            description: "Context の代替として使えるシンプルなグローバル状態管理",
            icon: "Package",
          },
          {
            href: "/state/usereducer",
            title: "useState と useReducer",
            description: "Context と組み合わせる useReducer の基礎",
            icon: "GitBranch",
          },
          {
            href: "/state/client-vs-server",
            title: "クライアント状態とサーバー状態",
            description: "Context が担うべき状態の種類を整理する",
            icon: "SplitSquareHorizontal",
          },
        ]}
      />

      <PageDrill questions={contextQuestions} />
    </div>
  );
}
