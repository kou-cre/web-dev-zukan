import {
  RefreshCw,
  MousePointerClick,
  Variable,
  ToggleLeft,
  Hash,
  Type,
  List,
  Layers,
  AlertTriangle,
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
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { stateQuestions } from "@/content/questions/react/state";

export const metadata = {
  title: "State と useState | Web開発図解",
  description: "ReactのStateとuseStateを図解で解説。直接代入NGの理由・オブジェクトStateの更新・Stateを使うべき判断基準まで。",
};

export default function StatePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="React"
        title="State と useState"
        subtitle={"コンポーネントが持つ「変わる値」——インタラクティブなUIの核心"}
        accentColor="violet"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Stateとは何か（コンポーネントが持つ「変わる値」）",
          "useStateの基本的な書き方と使い方",
          "stateが変わるとコンポーネントが再描画される理由",
        ]}
        prerequisites={[
          "コンポーネントとJSXを知っている（/react/components を読んだ）",
          "Propsを知っている（/react/props を読んだ）",
          "配列の分割代入を知っている（const [a, b] = [1, 2] の形が分かる）",
        ]}
        outOfScope={[
          "イミュータブル更新の詳細（スプレッド構文）（応用編で扱う）",
          "useReducerとuseStateの使い分け（応用編で扱う）",
          "Zustand / Redux などの外部状態管理（別ページで扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="StateはReactコンポーネントが内部に持つ「変わる値」。useStateはそのStateを扱うHook。setterで値を更新すると、Reactが自動的に再レンダリングを行い画面が変わる。直接代入ではなくsetter関数を使うことが必須のルール。"
        metaphorTitle="信号機の内部コントローラー"
        metaphorPoints={[
          { label: "State", real: "今「赤・青・黄」どれかの情報を保持している内部メモリ", metaphor: "State" },
          { label: "setState", real: "信号を切り替えるスイッチ", metaphor: "setState" },
          { label: "再レンダリング", real: "スイッチを押したら実際に表示が変わる", metaphor: "再レンダリング" },
          { label: "直接代入NG", real: "配線を勝手に触ると信号機が壊れる", metaphor: "直接代入NG" },
        ]}
        definition="Stateはコンポーネントが内部に持つ変更可能な値。useStateで宣言し、setter関数で更新するとReactが自動的に再描画する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          まず「なぜ普通の変数ではダメなのか」を理解してから、useStateの仕組みを順番に確認しましょう。
        </p>

        {/* TermNote: 基礎図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "State（状態）",
              definition: "コンポーネントが内部に持つ「変わる値」のこと。ボタンのクリック数・入力中の文字・モーダルの開閉状態などがStateの典型例。",
            },
            {
              word: "useState",
              definition: "ReactでStateを扱うための関数（Hook）。const [値, 更新関数] = useState(初期値) という形で使う。",
            },
            {
              word: "フック（Hook）",
              definition: "React が提供する特殊な関数のグループ。useState・useEffect などがある。コンポーネント関数のトップレベルでのみ呼べる。",
            },
            {
              word: "再レンダリング",
              definition: "コンポーネント関数を再度実行して画面を更新すること。Stateが変わったときにReactが自動で行う。",
            },
            {
              word: "setter関数",
              definition: "useState が返す2番目の値。この関数を呼ぶことでStateを更新し、Reactに再レンダリングを依頼できる。",
            },
          ]}
        />

        {/* ── 概念図A: なぜ普通の変数ではダメなのか ── */}
        <ConceptDiagram
          title="概念図A — なぜ普通の変数では画面が変わらないのか？"
          description="State vs 通常変数 — なぜ let count = 0 では動かないのか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
                通常変数（let count = 0）
              </p>
              <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>値を変えてもReactに通知されない</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>画面は古いままで変わらない</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>再レンダリングのたびに初期値にリセットされる</span>
                </div>
              </div>
              <div
                className="mt-3 rounded-lg px-3 py-2 text-xs font-mono text-gray-500"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                let count = 0;<br />
                count = count + 1; <span className="text-red-400">// 画面は変わらない</span>
              </div>
            </div>

            <div
              className="rounded-xl border border-violet-500/40 p-4"
              style={{ backgroundColor: "rgba(139,92,246,0.05)" }}
            >
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 text-center">
                State（useState）
              </p>
              <div className="space-y-2 text-xs text-gray-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>setterを呼ぶとReactに変化を通知</span>
                </div>
                <div className="flex items-start gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>自動的に再レンダリングが走る</span>
                </div>
                <div className="flex items-start gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>Reactが値を管理・保持してくれる</span>
                </div>
              </div>
              <div
                className="mt-3 rounded-lg px-3 py-2 text-xs font-mono"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <span className="text-violet-300">const</span> <span className="text-white">[count, setCount] = useState(0);</span><br />
                <span className="text-white">setCount(count + 1);</span> <span className="text-violet-400">// 画面が変わる</span>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(139,92,246,0.05)", borderColor: "rgba(139,92,246,0.3)" }}
          >
            <p className="text-xs font-semibold text-violet-300 mb-2">なぜ普通の変数ではダメか — まとめ</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              普通の変数を書き換えてもReactは「変わった」ことを知らないため、画面を更新しません。
              setter関数を通じて更新することで初めてReactに「再描画して」と伝えられます。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          普通の変数ではダメな理由が分かりました。次はuseStateを呼び出したときに内部で何が起きるかを流れ図で確認します。
        </p>

        {/* ── 概念図B: useStateの仕組み ── */}
        <ConceptDiagram
          title="概念図B — useState の仕組み"
          description="setter を呼ぶと何が起きるのか？ステップで確認する。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Variable}
              title="useState(0)"
              subtitle="const [count, setCount]"
              accentColor="violet"
            />
            <FlowArrow label="ユーザーがクリック" direction="right" />
            <FlowCard
              Icon={MousePointerClick}
              title="setCount(count + 1)"
              subtitle="setter関数を呼ぶ"
              highlight
              accentColor="violet"
            />
            <FlowArrow label="Reactに通知" direction="right" />
            <FlowCard
              Icon={RefreshCw}
              title="再レンダリング"
              subtitle="Reactがコンポーネントを再実行"
              accentColor="violet"
            />
            <FlowArrow label="新しい値で" direction="right" />
            <FlowCard
              Icon={Layers}
              title="画面更新"
              subtitle="新しい count が表示される"
              accentColor="violet"
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-4 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// useStateの基本的な使い方"}</p>
            <p>
              <span className="text-blue-300">import</span>
              <span className="text-gray-300">{" { useState } "}</span>
              <span className="text-blue-300">from</span>
              <span className="text-green-300">{" 'react'"}</span>
              <span className="text-gray-300">;</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-300">function</span>
              <span className="text-yellow-300"> Counter</span>
              <span className="text-gray-300">{"() {"}</span>
            </p>
            <p className="ml-4">
              <span className="text-gray-500">{"// [現在の値, 更新関数] = useState(初期値)"}</span>
            </p>
            <p className="ml-4">
              <span className="text-violet-300">const</span>
              <span className="text-gray-300">{" [count, setCount] = "}</span>
              <span className="text-yellow-300">useState</span>
              <span className="text-gray-300">(</span>
              <span className="text-orange-300">0</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="ml-4 mt-2">
              <span className="text-blue-300">return</span>
              <span className="text-gray-300">{" ("}</span>
            </p>
            <p className="ml-8">
              <span className="text-green-300">{"<button"}</span>
              <span className="text-sky-300">{" onClick"}</span>
              <span className="text-gray-300">{"={() => "}</span>
              <span className="text-yellow-300">setCount</span>
              <span className="text-gray-300">(count + </span>
              <span className="text-orange-300">1</span>
              <span className="text-gray-300">{")"}</span>
              <span className="text-gray-300">{"}"}</span>
              <span className="text-green-300">{">"}</span>
            </p>
            <p className="ml-10">
              <span className="text-gray-300">クリック数: </span>
              <span className="text-sky-300">{"{"}</span>
              <span className="text-white">count</span>
              <span className="text-sky-300">{"}"}</span>
            </p>
            <p className="ml-8">
              <span className="text-green-300">{"</button>"}</span>
            </p>
            <p className="ml-4">
              <span className="text-gray-300">);</span>
            </p>
            <p><span className="text-gray-300">{"}"}</span></p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            setter を呼ぶ → React が検知 → 再レンダリング → 新しい値が画面に反映。この流れが State の本質。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          useStateの基本的な流れが分かりました。次は「Stateにはどんな種類のデータを入れられるか」を確認します。
        </p>

        {/* ── 概念図C: Stateの種類 ── */}
        <ConceptDiagram
          title="概念図C — Stateの種類と用途"
          description="何でもStateに入れられる — 典型的な使い方を確認する"
        >
          <StackLayer
            Icon={Type}
            title="文字列 State"
            subtitle="入力フォームの内容 — const [name, setName] = useState('')"
            iconColor="text-violet-400"
          />
          <StackLayer
            Icon={Hash}
            title="数値 State"
            subtitle="カウンター・ページ番号 — const [count, setCount] = useState(0)"
            iconColor="text-blue-400"
          />
          <StackLayer
            Icon={ToggleLeft}
            title="真偽値 State"
            subtitle="モーダルの開閉 — const [isOpen, setIsOpen] = useState(false)"
            iconColor="text-sky-400"
          />
          <StackLayer
            Icon={Layers}
            title="オブジェクト State"
            subtitle="フォームの複数項目 — const [form, setForm] = useState({ name: '', email: '' })"
            iconColor="text-amber-400"
          />
          <StackLayer
            Icon={List}
            title="配列 State"
            subtitle="リストの管理 — const [items, setItems] = useState([])"
            iconColor="text-emerald-400"
            showArrow={false}
          />
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — ComparisonTableより前） ── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "useStateって見たことあるけど、変数と何が違うんですか？ボク、ただの変数でいいのでは……と思っていまして。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "信号機を想像してください。赤から青に変えるとき、普通の変数は「値のメモ」だけ書き換える。でもStateのsetter関数は「値を書き換えてReactに再描画を頼む」まで一緒にやってくれる。だから画面が自動的に変わるんです、マジさん。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ直接 `count = count + 1` ってやったら何が起きるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "値はメモリ上で変わりますが、Reactは「変わったよ」という通知を受け取れていないので再描画しません。画面は古いままです。セルフサービスのレジで支払いを済ませたのに、お知らせボタンを押し忘れた状態です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ボク、const [count, setCount] = useState(0) って書き方が少し気になっていて。左辺の [ ] って何ですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "これは「配列の分割代入」という構文です、マジさん。const [a, b] = [1, 2] と書くと a に 1、b に 2 が入ります。useState は [現在の値, 更新関数] という配列を返すので、分割代入で受け取っているだけです。名前は何でもOKですが、値とその更新関数という対で命名するのが習慣です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なんとなく分かってきました。「Reactに知らせる」ためのルートがsetter関数だけ、ということですね。ボク、これさえ守れば大丈夫そうです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その理解で完璧です。そしてStateが変わるたびに再レンダリングされるからこそ、「ボタンを押したらカウントが増える」「入力したら文字が表示される」というインタラクティブなUIが実現できる。Reactの魔法の正体はここにあるんです、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["通常の変数（let）", "State（useState）"]}
          rows={[
            {
              label: "値を変えると画面が変わる",
              cells: ["変わらない", "自動で変わる（再レンダリング）"],
              highlightCol: 1,
            },
            {
              label: "コンポーネントをまたいで保持",
              cells: ["再レンダリングで消える", "Reactが管理・保持する"],
              highlightCol: 1,
            },
            {
              label: "更新方法",
              cells: ["直接代入（let x = 1）", "setter関数（setX(1)）"],
              highlightCol: 1,
            },
            {
              label: "推奨用途",
              cells: ["計算の一時変数", "UIに反映が必要な値"],
              highlightCol: 1,
            },
          ]}
          note="結論：UIに反映が必要な値は useState で State として宣言する。計算で求められる値・一時変数はletで十分。setter以外での更新は禁止。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はイミュータブル更新・useReducer・自動バッチングなど、より深い内容です。まずuseStateの基本を使いこなせるようになってから読んでください。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — イミュータブル更新とuseReducer
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          オブジェクトや配列のStateを扱う場合、「直接変更してはいけない」というルールがあります。なぜかを理解してから正しい書き方を覚えましょう。
        </p>

        {/* TermNote: 応用図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "イミュータブル",
              definition: "「変更できない」という意味。Reactでは「既存のオブジェクトを変更する」のではなく「新しいオブジェクトを作って渡す」ことを要求する。",
            },
            {
              word: "スプレッド構文（...）",
              definition: "配列やオブジェクトの内容を展開する構文。{ ...obj, key: value } で既存オブジェクトをコピーしながら一部を変更できる。",
            },
            {
              word: "useReducer",
              definition: "複雑なStateの更新ロジックを整理するためのHook。dispatch でアクションを送り、reducer 関数で新しいStateを返す設計にする。",
            },
          ]}
        />

        {/* ── 概念図D: イミュータブル更新 ── */}
        <ConceptDiagram
          title="概念図D：イミュータブル（不変）更新パターン"
          description="Reactは参照比較でstate変化を検知する — 直接変更ではReactは気づけない"
          accentColor="violet"
        >
          <div
            className="rounded-xl border border-amber-500/30 px-4 py-3 mb-4 flex items-start gap-3"
            style={{ backgroundColor: "rgba(245,158,11,0.07)" }}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Reactはオブジェクト・配列を<span className="text-amber-300 font-semibold">参照（アドレス）</span>で比較する。
              中身を直接変更しても参照が同じなら<span className="text-red-400 font-semibold">変化を検知できず再レンダリングが起きない</span>。
              必ず新しいオブジェクト・配列を作って渡す。
            </p>
          </div>

          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                配列への追加
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div
                  className="rounded-lg px-3 py-2"
                  style={{ backgroundColor: "#1a1d2a" }}
                >
                  <span className="text-red-400">{"// ❌ 直接変更（NG）"}</span><br />
                  <span className="text-gray-400">state.push(item);</span>
                </div>
                <div
                  className="rounded-lg px-3 py-2 border border-violet-500/30"
                  style={{ backgroundColor: "rgba(139,92,246,0.05)" }}
                >
                  <span className="text-violet-400">{"// ✅ 新しい配列を作成"}</span><br />
                  <span className="text-gray-300">[...state, item]</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                オブジェクト更新
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div
                  className="rounded-lg px-3 py-2"
                  style={{ backgroundColor: "#1a1d2a" }}
                >
                  <span className="text-red-400">{"// ❌ プロパティを直接変更"}</span><br />
                  <span className="text-gray-400">state.name = <span className="text-amber-400">{"'new'"}</span>;</span>
                </div>
                <div
                  className="rounded-lg px-3 py-2 border border-violet-500/30"
                  style={{ backgroundColor: "rgba(139,92,246,0.05)" }}
                >
                  <span className="text-violet-400">{"// ✅ スプレッドでコピー"}</span><br />
                  <span className="text-gray-300">{"{ ...state, name: "}<span className="text-amber-400">{"'new'"}</span>{" }"}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            「古い状態を変更する」のではなく「新しい状態を作って渡す」——これがイミュータビリティの原則。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          イミュータブル更新の原則が分かりました。次は「複数のStateが絡み合うような複雑な場合」にどう対応するかを見ていきます。
        </p>

        {/* ── 概念図E: useReducer ── */}
        <ConceptDiagram
          title="概念図E：useState と useReducer の使い分け"
          description="シンプルな値にはuseState、複雑なロジックにはuseReducer"
          accentColor="violet"
        >
          <p className="text-xs text-gray-500 leading-relaxed mb-3 px-1">
            useReducerのコード例はパターンを掴む程度でOK。詳細は別ページで扱います。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3 text-center">
                useState
              </p>
              <p className="text-xs text-gray-400 mb-3">単純な値の更新に最適</p>
              <div
                className="rounded-lg px-3 py-2 text-xs font-mono mb-3"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <span className="text-violet-300">const</span>{" "}
                <span className="text-white">[count, setCount] =</span><br />
                <span className="text-white">{"  "}useState(0);</span><br />
                <span className="text-white">setCount(count + 1);</span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <Hash className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>独立したシンプルな値</span>
                </div>
                <div className="flex items-start gap-2">
                  <ToggleLeft className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>トグル・カウンター・フォーム入力</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl border border-violet-500/40 p-4"
              style={{ backgroundColor: "rgba(139,92,246,0.05)" }}
            >
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 text-center">
                useReducer
              </p>
              <p className="text-xs text-gray-300 mb-3">複数のstateが絡み合うロジックに最適</p>
              <div
                className="rounded-lg px-3 py-2 text-xs font-mono mb-3"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <span className="text-violet-300">const</span>{" "}
                <span className="text-white">[state, dispatch] =</span><br />
                <span className="text-white">{"  "}useReducer(reducer, init);</span><br />
                <span className="text-white">dispatch({"{"} type:</span>{" "}
                <span className="text-amber-400">{"'INCREMENT'"}</span>{" "}
                <span className="text-white">{"}"});</span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex items-start gap-2">
                  <Layers className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>複数stateが連動して変化する処理</span>
                </div>
                <div className="flex items-start gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>reducerは純粋関数 = 単体テスト可能</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl border border-violet-500/20 p-4"
            style={{ backgroundColor: "rgba(139,92,246,0.08)" }}
          >
            <p className="text-xs font-semibold text-violet-300 mb-3">使い分け判断ガイド</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-36 flex-shrink-0">独立したシンプルな値</span>
                <span className="text-violet-400 font-bold">→</span>
                <span className="text-gray-300">useState</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-36 flex-shrink-0">複数stateが連動して変化</span>
                <span className="text-violet-400 font-bold">→</span>
                <span className="text-gray-300">useReducer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-36 flex-shrink-0">次のStateが前のStateに依存</span>
                <span className="text-violet-400 font-bold">→</span>
                <span className="text-gray-300">useReducer（reducerは純粋関数）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-36 flex-shrink-0">テストしやすくしたい</span>
                <span className="text-violet-400 font-bold">→</span>
                <span className="text-gray-300">useReducer（reducerを単体テスト可能）</span>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        {/* 7.1 useStateの基本（最も実用的なので先頭へ） */}
        <DetailBlock heading="7.1 useState の宣言パターン">
          <p>
            基本の宣言は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>const [value, setValue] = useState(initialValue)</code>。
            初期値には数値・文字列・真偽値・オブジェクト・配列・nullなど何でも渡せる。
          </p>
          <p>
            TypeScriptを使う場合は型引数で型を明示できる。
            例えば{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>useState&lt;string&gt;('')</code>
            や{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>useState&lt;number | null&gt;(null)</code>
            のように書く。初期値から型推論が効く場合は省略してよい。
          </p>
          <p>
            1つのコンポーネントに複数のuseStateを持てる。関連する値ごとに分けると管理しやすい。
          </p>
          <KeyPoint>
            Hookは必ずコンポーネントのトップレベルで呼ぶ。ifやforの中・コールバック内でuseStateを呼ぶとエラーになる。これはReactのHooksのルールのひとつ。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 更新の非同期性">
          <p>
            setterを呼んでも、その行のすぐ直後にStateの新しい値が使えるわけではない。Reactは複数のState更新をまとめて処理する（バッチ処理）ため、再レンダリングは次のサイクルで実行される。
          </p>
          <p>
            連続してsetterを呼ぶとき、前の値を元に計算したい場合は関数形式を使うのが安全。
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>setCount(prev {"=>"} prev + 1)</code>
            のように書くと、Reactが最新の値を{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>prev</code>
            として渡してくれる。
          </p>
          <WarningPoint>
            setterを呼んだ直後にStateを参照するコードを書いても古い値が返る。更新後の値が必要ならuseEffectでStateの変化を検知するか、setter内で直接計算する。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 オブジェクト・配列Stateの更新">
          <p>
            オブジェクトや配列のStateを更新するときは、元のデータを直接変更（ミューテート）してはいけない。Reactは参照の変化で再レンダリングを判断するため、中身を変えても同じ参照では変化を検知できない。
          </p>
          <p>
            オブジェクトの場合：
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>setUser({"{"} ...user, name: '新しい名前' {"}"})</code>
            のようにスプレッド構文で既存の値をコピーして新しいオブジェクトを作る。
          </p>
          <p>
            配列の場合：要素の追加は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>[...items, newItem]</code>、
            削除は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>items.filter(...)</code>、
            更新は{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#a78bfa" }}>items.map(...)</code>
            を使う。pushやspliceなどの破壊的メソッドは使わない。
          </p>
          <KeyPoint>
            「古い状態を変更する」のではなく「新しい状態を作って渡す」——これがReactにおけるイミュータビリティ（不変性）の原則。この考え方はStateだけでなく、Reactのパフォーマンス最適化全体に通じる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 いつStateを使うか">
          <p>
            Stateを使う目安は「その値が変化したときにUIを再描画する必要があるか」。以下のような値はStateの候補になる：
          </p>
          <p>
            ユーザー操作で変わる値（フォーム入力・ボタンのトグル・選択状態）、
            APIレスポンスで変わる値（取得したデータ・ローディング状態・エラー状態）、
            時間経過で変わる値（タイマー・アニメーションの進捗）。
          </p>
          <KeyPoint>
            「Propsで賄えるならStateにしない」が設計の原則。親から値を受け取るだけで済む場合にStateを作ると、PropsとStateの二重管理になって同期ズレが起きやすい。また「他のStateから計算で求められる値」も通常の変数として導出すればよく、Stateにする必要はない。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/react/props",
            title: "Props",
            description: "Stateと対になる、親から子へ渡す値の仕組み",
            icon: "ArrowDownToLine",
          },
          {
            href: "/react/components",
            title: "コンポーネント",
            description: "Stateを持つコンポーネントの設計の基礎に戻る",
            icon: "Zap",
          },
          {
            href: "/react/props",
            title: "Props",
            description: "Stateと対になる、親から渡される読み取り専用の値",
            icon: "Share2",
          },
        ]}
      />

      <PageDrill questions={stateQuestions} />
    </div>
  );
}
