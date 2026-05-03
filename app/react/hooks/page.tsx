import {
  Package,
  Wrench,
  RefreshCw,
  HardDrive,
  Timer,
  Maximize2,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Layers,
  Repeat,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { TermNote } from "@/components/TermNote";
import { SectionDivider } from "@/components/SectionDivider";
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
import { hooksQuestions } from "@/content/questions/react/hooks";

export const metadata = {
  title: "カスタムHooks | Web開発図解",
  description: "カスタムHooksの基本概念を図解で解説。useXxx命名規則・useFetchの実装パターン・Hooksのルールまで。",
};

export default function HooksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="React"
        title="カスタムHooks"
        subtitle={"ロジックを再利用可能な関数に切り出す技術——「use始まり」の秘密"}
        accentColor="emerald"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "カスタムフックとは何か",
          "なぜカスタムフックを作るのか（目的と利点）",
          "useXxx命名ルールの理由",
          "基本的なカスタムフックの書き方",
        ]}
        prerequisites={[
          "useState を知っている（/react/state を読んだ）",
          "useEffect を知っている（/react/useeffect を読んだ）",
          "JavaScriptの関数を書けること",
        ]}
        outOfScope={[
          "useCallback / useMemo によるメモ化（1周目は飛ばしてOK。応用編に収録）",
          "useImperativeHandle",
          "サードパーティのカスタムフック（SWR / React Query）",
        ]}
      />

      <OnePageSummary
        keyMessage="カスタムHooksとは、useStateやuseEffectを組み合わせたロジックを「useXxx」という関数に切り出す技術。コンポーネントから複雑なロジックを分離し、複数のコンポーネントで再利用できるようにする。Reactが提供する組み込みHooksを活用した「ユーザー定義Hook」。"
        metaphorTitle="専用の道具箱を作る"
        metaphorPoints={[
          {
            label: "組み込みHooks",
            real: "useState / useEffect などの基本工具（ハンマーやドライバー）",
            metaphor: "組み込みHooks",
          },
          {
            label: "カスタムHooks",
            real: "配管工事セットのような専用まとめ道具箱",
            metaphor: "カスタムHooks",
          },
          {
            label: "use始まり",
            real: "道具箱に貼る「Hooks専用」のラベル",
            metaphor: "use始まり",
          },
          {
            label: "再利用",
            real: "別の工事現場でも同じ道具箱をそのまま使える",
            metaphor: "再利用",
          },
        ]}
        definition="カスタムHooksとはReactのHooksを組み合わせたロジックをuse始まりの関数に切り出す仕組み。コードの再利用と関心の分離を実現する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          まずは「なぜカスタムフックが必要か」という目的と、「Hooksの呼び出しルール」という基礎知識を押さえます。
        </p>

        {/* TermNote: 基礎図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "カスタムフック",
              definition: "useStateやuseEffectなどのHooksを使ったロジックを、use〇〇という名前の関数に切り出したもの。コンポーネントから「処理だけ」を分離できる。",
            },
            {
              word: "use〇〇 命名規則",
              definition: "カスタムフックは必ず「use」で始める。ReactとESLintがこの名前を見て「Hookのルールを適用すべき関数」と認識する。",
            },
            {
              word: "ロジックの抽出・再利用",
              definition: "同じuseState+useEffectの処理を複数コンポーネントで書いていた場合に、1つのカスタムフックにまとめてどこからでもimportできるようにすること。",
            },
            {
              word: "フック合成",
              definition: "カスタムフックの中で別のカスタムフックを呼ぶこと。組み込みHooksを組み合わせて高機能なカスタムフックを作れる。",
            },
          ]}
        />

        {/* 図A: カスタムHooks化の流れ */}
        <ConceptDiagram
          title="概念図A"
          description="コンポーネント内の複雑なロジックを、カスタムHooksとして切り出す流れ。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={Layers}
              title="コンポーネント内"
              subtitle="useState + useEffectが混在して肥大化している"
            />
            <FlowArrow label="切り出す" direction="right" />
            <FlowCard
              Icon={Package}
              title="useXxx() 関数"
              subtitle="ロジックをuse始まりの関数にまとめる"
              highlight
              accentColor="emerald"
            />
            <FlowArrow label="呼び出す" direction="right" />
            <FlowCard
              Icon={Repeat}
              title="複数コンポーネント"
              subtitle="importして1行で使い回せる"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            切り出した後、コンポーネントはUIの描画だけに集中できる。ロジックはHooksが担う。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          カスタムフックを作る目的が分かりました。次は「どんなカスタムフックが現場でよく使われるか」を見ていきます。
        </p>

        {/* 図B: よくあるカスタムHooksのパターン */}
        <ConceptDiagram
          title="概念図B"
          description="よく作られるカスタムHooksの代表パターン。"
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                Icon: RefreshCw,
                name: "useFetch",
                desc: "データ取得ロジック（loading / error / data）をまとめる",
                color: "text-emerald-400",
              },
              {
                Icon: HardDrive,
                name: "useLocalStorage",
                desc: "ローカルストレージへの読み書きをカプセル化する",
                color: "text-blue-400",
              },
              {
                Icon: Timer,
                name: "useDebounce",
                desc: "入力値の変化を一定時間遅らせて処理する",
                color: "text-violet-400",
              },
              {
                Icon: Maximize2,
                name: "useWindowSize",
                desc: "ウィンドウサイズの変化をリアルタイムで監視する",
                color: "text-amber-400",
              },
            ].map(({ Icon, name, desc, color }, i) => (
              <div
                key={i}
                className="rounded-lg border px-4 py-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                  <code
                    className="text-xs font-mono font-bold"
                    style={{ color: "#34d399" }}
                  >
                    {name}
                  </code>
                </div>
                <p className="text-xs text-gray-500 leading-tight">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            すべて「useXxx」という命名で、内部にuseState・useEffectなどの組み込みHooksを持つ。
          </p>
        </ConceptDiagram>

        {/* カスタムフックの最小形コード例 */}
        <div className="rounded-lg border p-4 mb-6" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
          <p className="text-xs text-gray-500 mb-3">カスタムフックの最小形</p>
          <pre className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre">
            <code>{`// useCounter.js（カスタムフック）
import { useState } from 'react';

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}

// Counter.jsx（使う側）
import { useCounter } from './useCounter';

export function Counter() {
  const { count, increment } = useCounter(0);
  return <button onClick={increment}>{count}</button>;
}`}</code>
          </pre>
        </div>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          代表的なカスタムフックが分かりました。次は「Hooksには守るべきルールがある」という重要な制約を確認します。
        </p>

        {/* 図C: Hooksのルール */}
        <ConceptDiagram
          title="概念図C — Hooksの呼び出しルール"
          description="Reactが定めるHooksの2つのルール。カスタムHooksを使う場合も同じルールが適用される。"
        >
          <div className="rounded-xl border-2 border-dashed border-emerald-700/50 p-4">
            <p className="text-xs font-semibold text-emerald-500 text-center mb-4 tracking-wide uppercase">
              Rules of Hooks
            </p>
            <StackLayer
              Icon={CheckCircle}
              title="ルール1: トップレベルでのみ呼ぶ"
              subtitle="if文・for文・ネストした関数の中でHooksを呼んではいけない。常に同じ順序で呼ばれることが必要。"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={CheckCircle}
              title="ルール2: ReactコンポーネントかカスタムHooks内でのみ呼ぶ"
              subtitle="通常のJavaScript関数の中でHooksを呼ぶことはできない。use始まりの関数にすることで許可される。"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={AlertTriangle}
              title="違反するとどうなるか"
              subtitle="レンダリングをまたいでHooksの呼び出し順序がズレ、状態が正しいHookに紐付かなくなる。Reactの内部管理が破綻する。"
              iconColor="text-red-400"
              showArrow={false}
            />
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
            <Wrench className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300 leading-relaxed">
              eslint-plugin-react-hooks を導入すると、これらのルール違反をコーディング中に自動で検知してくれる。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — 概念図の直後） ─────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "カスタムHooksって、普通の関数と何が違うんですか？ ボク、useから始めなくていい気がするんですが……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "命名規則には意味があるんです、マジさん。useから始まる関数はReactが「Hookのルールを適用すべき関数」として認識します。\n普通の関数の中でuseState等を呼ぶとエラーになりますが、use始まりにすることで「この中にHooksがある」とReactとESLintが分かってくれる。\nラベルの貼り方が違うだけで、中身は全く同じ関数ですよ。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあuseEffectの中にuseStateを入れることもできるんですか！？ ボク、そんな自由があるとは……！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "それは逆ですね、マジさん。Hooksはifやforやネストされたコールバックの中では呼べません。\nでも「カスタムHooksの中で別のHooksを呼ぶ」のは全く問題ない。\nuseFetchの中でuseStateとuseEffectを両方使う、というのが典型的なパターンです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、複数ページで「APIからデータを取ってくる処理」を書いていて、毎回同じようなuseState+useEffectを書いています……それがカスタムHooksにすべき状況ですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "まさにそれが最もカスタムHooksが活きる場面です。\nloading・error・dataの3つのStateと、useEffectでのfetch処理を useFetch(url) としてまとめれば、使う側は1行で済む。\n「同じロジックを2か所以上書いた瞬間がカスタムHooks化のサイン」と覚えておいてください、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど！コンポーネントがUIだけに集中できて、ロジックはHooksに任せる、という分業制ですね。ボク、すごくスッキリしました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。テストの観点でも、UIロジックを分離したHooksは単体テストが書きやすくなります。\n「見た目」と「動き」を分けることで、どちらも変更しやすくなる——これがReactにおける設計の醍醐味ですよ、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ───────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={[
            "コンポーネントにロジックを直書き",
            "カスタムHooksに切り出す",
          ]}
          rows={[
            {
              label: "コードの長さ",
              cells: [
                "コンポーネントが肥大化する",
                "コンポーネントがスッキリする",
              ],
              highlightCol: 1,
            },
            {
              label: "再利用性",
              cells: [
                "同じロジックをコピペしがち",
                "importするだけで使い回せる",
              ],
              highlightCol: 1,
            },
            {
              label: "テストのしやすさ",
              cells: [
                "UIと混在してテストしにくい",
                "Hooksだけ単独テストできる",
              ],
              highlightCol: 1,
            },
            {
              label: "役割の分け方",
              cells: [
                "画面表示とデータ処理が混在",
                "UIはコンポーネント・ロジックはHooks",
              ],
              highlightCol: 1,
            },
          ]}
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はHooksの実行順序の仕組み・useMemo/useCallbackによるメモ化など、パフォーマンスや内部動作を深く知りたい方向けの内容です。useMemo/useCallbackの解説を含みます。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 実装パターンと最適化
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          カスタムフックの基本が分かったら、次は「具体的な実装の中身」と「なぜHooksの順序が重要なのか」を見ていきます。
        </p>

        {/* 図D: カスタムフックの構造 */}
        <ConceptDiagram
          title="概念図D：カスタムフックの構造と使いどころ"
          description="カスタムフックは「use始まりの関数」にすぎない。内部で他のHooksを呼び、値を返す。"
        >
          {/* useWindowSize の中身 */}
          <div
            className="rounded-lg border p-4 mb-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-emerald-400 mb-2">useWindowSize() の中身</p>
            <p className="text-xs font-mono text-gray-400 leading-relaxed whitespace-pre-wrap">{`function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return size; // { width, height }
}`}</p>
          </div>

          {/* 抽出パターン */}
          <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
            <div className="flex-1 rounded-lg border px-4 py-3" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs font-semibold text-gray-400 mb-2">抽出前：3つのコンポーネントで重複</p>
              {["ComponentA", "ComponentB", "ComponentC"].map((c) => (
                <div key={c} className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-gray-600 flex-shrink-0" />
                  <span className="text-xs text-gray-500">{c} — localStorage ロジックをそれぞれ実装</span>
                </div>
              ))}
            </div>
            <div className="flex items-center self-center">
              <ArrowRight className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1 rounded-lg border px-4 py-3" style={{ backgroundColor: "#0f1117", borderColor: "#34d399", borderWidth: 1 }}>
              <p className="text-xs font-semibold text-emerald-400 mb-2">抽出後：useLocalStorage() に集約</p>
              {["ComponentA", "ComponentB", "ComponentC"].map((c) => (
                <div key={c} className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <code className="text-xs text-gray-300">{c} — useLocalStorage() を呼ぶだけ</code>
                </div>
              ))}
            </div>
          </div>

          {/* ルール補足 */}
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300 leading-relaxed">
              カスタムフックもHooksのルールに従う。コンポーネントのトップレベルでのみ呼び出し可能——条件分岐やループの中では呼べない。
            </p>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          カスタムフックの内部構造が分かりました。次はReactがHooksをどうやって管理しているかの仕組みを見ます。
        </p>

        {/* 図E: Hookの実行順序とルール */}
        <ConceptDiagram
          title="概念図E：Hooksのルールと実行順序の重要性"
          description="Reactは「何番目のhookか」でstateを管理している。順番が変わると状態が混乱する。"
        >
          {/* NG パターン */}
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 mb-3">
            <p className="text-xs font-semibold text-red-400 mb-2">NG — 条件によって呼び出し順が変わる</p>
            <p className="text-xs font-mono text-gray-400 whitespace-pre-wrap leading-relaxed">{`if (isLoggedIn) {
  const [name, setName] = useState(""); // 条件次第でスキップされる
}`}</p>
            <p className="text-xs text-red-300 mt-2">レンダリングごとにHookの数が変わり、ReactがどのstateをどのHookに対応させるか分からなくなる。</p>
          </div>

          {/* OK パターン */}
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 mb-4">
            <p className="text-xs font-semibold text-emerald-400 mb-2">OK — Hooksをトップレベルに置き、条件は後で</p>
            <p className="text-xs font-mono text-gray-400 whitespace-pre-wrap leading-relaxed">{`const [name, setName] = useState(""); // 常に1番目に呼ばれる

if (isLoggedIn) {
  // name を使う処理
}`}</p>
          </div>

          {/* 実行順序の可視化 */}
          <p className="text-xs font-semibold text-gray-400 mb-2">コンポーネント内の実行順序（毎レンダーで固定）</p>
          <div className="flex flex-col gap-1">
            {[
              { label: "1番目", code: "useState(false)", color: "text-emerald-400" },
              { label: "2番目", code: "useState(0)", color: "text-emerald-400" },
              { label: "3番目", code: "useEffect(...)", color: "text-blue-400" },
              { label: "4番目", code: "useCallback(...)", color: "text-violet-400" },
              { label: "5番目", code: "useCustomHook() — 内部でuseState + useEffect", color: "text-amber-400" },
            ].map(({ label, code, color }) => (
              <div key={label} className="flex items-center gap-3 rounded px-3 py-1.5" style={{ backgroundColor: "#0f1117" }}>
                <span className="text-xs text-gray-600 w-12 flex-shrink-0">{label}</span>
                <code className={`text-xs font-mono ${color}`}>{code}</code>
              </div>
            ))}
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          Hooksの実行順序の仕組みが分かりました。最後に useMemo / useCallback という最適化のためのHooksを見ておきます。
        </p>

        {/* 図F: useMemo vs useCallback */}
        <ConceptDiagram
          title="概念図F：useMemo と useCallback の違いと使い分け"
          description="どちらも「前回と同じなら再計算・再生成しない」最適化。メモ化する対象が違う。"
        >
          {/* 並列比較 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {/* useMemo */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs font-semibold text-emerald-400 mb-2">useMemo — 計算結果をメモ化</p>
              <p className="text-xs font-mono text-gray-400 whitespace-pre-wrap leading-relaxed mb-2">{`const result = useMemo(
  () => expensiveCalc(a, b),
  [a, b]
);`}</p>
              <p className="text-xs text-gray-400">a か b が変わったときだけ再計算。それ以外は前回の結果を使い回す。</p>
              <div className="mt-2 rounded px-2 py-1 bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-emerald-300">用途: 重いフィルタリング・ソート・集計処理</p>
              </div>
            </div>

            {/* useCallback */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs font-semibold text-blue-400 mb-2">useCallback — 関数自体をメモ化</p>
              <p className="text-xs font-mono text-gray-400 whitespace-pre-wrap leading-relaxed mb-2">{`const fn = useCallback(
  () => doSomething(id),
  [id]
);`}</p>
              <p className="text-xs text-gray-400">id が変わったときだけ新しい関数を生成。それ以外は同じ関数参照を返す。</p>
              <div className="mt-2 rounded px-2 py-1 bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-300">用途: React.memo された子へのコールバック渡し</p>
              </div>
            </div>
          </div>

          {/* アンチパターン */}
          <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-300 leading-relaxed">
              アンチパターン: 全ての値・関数に useMemo / useCallback をつけない。メモ化自体にも計算コストがある。本当に重い処理・参照同一性が必要な箇所だけに限定する。
            </p>
          </div>
        </ConceptDiagram>

        {/* TermNote: 応用編で出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "メモ化",
              definition: "一度計算した結果を記憶しておき、同じ入力が来たときに再計算せず記憶した結果を返すこと。パフォーマンス改善に使う。",
            },
          ]}
        />
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 カスタムHooksの基本パターン — useFetch">
          <p>
            最も典型的なカスタムHooksの例が <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>useFetch</code>。
            コンポーネントの中で毎回書いていたデータ取得ロジックをまとめると次のような形になる。
          </p>
          <div
            className="rounded-lg border p-4 mt-2"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-mono text-gray-400 leading-relaxed whitespace-pre-wrap">{`function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => { setData(json); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}`}</p>
          </div>
          <p className="mt-2">
            呼び出し側は <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>const {"{ data, loading, error }"} = useFetch(url)</code> の1行で済む。
            useState / useEffectを毎回書く必要がなくなる。
          </p>
          <KeyPoint>戻り値をオブジェクト形式にするのは、呼び出し側が必要なものだけ取り出せるようにするため。配列でも動くが、名前付きで返した方が可読性が高い。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 Hooksの2つのルール">
          <p>
            <strong className="text-white">ルール1: トップレベルでのみ呼ぶ</strong><br />
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>if</code> 文・
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>for</code> 文・ネストされたコールバック関数の中でHooksを呼ぶのは禁止。
            Reactは「毎回のレンダリングで何番目に何のHookが呼ばれたか」という順序で状態を管理しているため、順序が変わるとどの状態がどのHookに対応するか分からなくなる。
          </p>
          <p>
            <strong className="text-white">ルール2: ReactコンポーネントかカスタムHooks内でのみ呼ぶ</strong><br />
            通常のJavaScript関数の中でuseStateを呼んでも機能しない。
            use始まりの命名をすることで「この関数はHooksのルール下にある」とReactが認識し、内部でのHooks呼び出しが許可される。
          </p>
          <WarningPoint>
            ルール違反はコンパイルエラーにはならず実行時にバグとして現れることが多い。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#ef4444" }}>eslint-plugin-react-hooks</code> を必ず導入して静的解析で防ぐこと。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 引数と戻り値の設計">
          <p>
            カスタムHooksは関数なので、引数を受け取り、値を返すことができる。
          </p>
          <p>
            <strong className="text-white">引数の設計</strong>: URLや設定値など、外から変えたい値を引数にする。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>useFetch(url)</code> のように。
          </p>
          <p>
            <strong className="text-white">戻り値の設計</strong>: 呼び出し側が使う値と関数をまとめてオブジェクトで返す。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"return { data, loading, error }"}</code> のように。
            配列で返す場合（<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>useState</code> スタイル）は変数名を自由につけやすい利点があるが、
            項目が多いときはオブジェクトの方が分かりやすい。
          </p>
          <KeyPoint>
            カスタムHooksは「状態と、それを操作する関数」のセットを返すのが典型的な設計。
            useLocalStorageなら <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>{"[value, setValue]"}</code> のようにuseStateと同じ形にすると馴染みやすい。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 カスタムHooksの命名慣習">
          <p>
            命名は「use + 役割」の形にするのが慣習。機能を読んだだけで用途が分かるようにする。
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { name: "useWindowSize", role: "ウィンドウサイズの監視" },
              { name: "useLocalStorage", role: "ローカルストレージ操作" },
              { name: "useDebounce", role: "入力値の遅延処理" },
              { name: "useAuth", role: "認証状態の管理" },
              { name: "useForm", role: "フォームの入力管理" },
              { name: "usePrevious", role: "前回の値の保持" },
            ].map(({ name, role }, i) => (
              <div
                key={i}
                className="rounded-lg border px-3 py-2"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <code className="text-xs font-mono" style={{ color: "#34d399" }}>{name}</code>
                <p className="text-xs text-gray-500 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-300">
            プロジェクトが大きくなると、共通のカスタムHooksを <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>hooks/</code> ディレクトリにまとめて管理するのが一般的なパターン。
          </p>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/react/state",
            title: "useState",
            description: "useStateはカスタムHooksを構成する主要な材料",
            icon: "Code2",
          },
          {
            href: "/react/useeffect",
            title: "useEffect",
            description: "useEffectはカスタムHooksの中で副作用を担う",
            icon: "Server",
          },
          {
            href: "/react/context",
            title: "Context",
            description: "useContextもカスタムHooksに隠蔽するのが定石",
            icon: "Database",
          },
        ]}
      />

      <PageDrill questions={hooksQuestions} />
    </div>
  );
}
