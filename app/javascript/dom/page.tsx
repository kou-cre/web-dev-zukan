import {
  FileCode,
  Cpu,
  Network,
  MousePointerClick,
  Search,
  Pencil,
  Plus,
  Trash2,
  Hand,
  Zap,
  ListTree,
  AlignLeft,
  ShieldAlert,
  ShieldCheck,
  GitBranch,
  SquareCode,
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
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { BrowserMock } from "@/components/BrowserMock";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { domQuestions } from "@/content/questions/javascript/dom";

export const metadata = {
  title: "DOM操作 | Web開発図解",
  description:
    "DOMとは何か、JavaScriptからHTML要素を取得・変更・追加・削除する仕組みを図解で解説。innerHTMLのXSSリスクや仮想DOMとの関係まで。",
};

export default function DomPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="DOM操作"
        subtitle={"HTMLをJavaScriptから動かす仕組み——ページを「生きた状態」にする技術"}
        body={"ボタンを押したら文字が変わる、クリックしたら色が変わる。その正体を1枚で掴む。"}
        accentColor="lime"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "DOMとは何か（ブラウザがHTMLをどう扱うか）",
          "JavaScriptでHTML要素を取得・変更する方法",
          "イベントリスナーの基本（クリックなどに反応する仕組み）",
          "フォーム制御の流れ",
        ]}
        prerequisites={[
          "HTMLのタグ（<div>、<p>、<button> 等）を書いたことがある",
          "CSSセレクタ（.class、#id）の基本を知っている",
          "JavaScriptの関数を書けること",
        ]}
        outOfScope={[
          "イベント伝播（バブリング・キャプチャ）の詳細な仕組み",
          "仮想DOMの実装詳細（fiber architectureなど）（応用編で扱う）",
          "カスタムイベントの作成",
          "XSS対策の実装詳細",
        ]}
      />

      <OnePageSummary
        keyMessage="DOMはブラウザがHTMLを解析して作るツリー構造のオブジェクト。JavaScriptはこのDOMを通じてHTML要素を取得・変更・追加・削除できる。ボタンを押したら文字が変わる、クリックしたら色が変わる——それがDOM操作の正体。"
        metaphorTitle="劇場の舞台と演出家"
        metaphorPoints={[
          {
            label: "HTML",
            real: "幕が開いた瞬間の舞台セット（最初の配置）",
            metaphor: "HTML",
          },
          {
            label: "DOM",
            real: "舞台の隅々まで書かれた設計図（操作可能なオブジェクト）",
            metaphor: "DOM",
          },
          {
            label: "JavaScript",
            real: "設計図を書き換えて舞台を動かす演出家",
            metaphor: "JavaScript",
          },
          {
            label: "イベントリスナー",
            real: "「役者が登場したら照明を変えて」という指示書",
            metaphor: "イベントリスナー",
          },
        ]}
        definition="DOMとはブラウザがHTMLから作るオブジェクトのツリー。JavaScriptはDOMを通じてページを動的に変更できる。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「HTMLがどうやってJavaScriptから操作できる形に変わるのか」という基本の流れを図で確認します。
        </p>

        {/* TermNote: 基礎編に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "DOM",
              definition:
                "Document Object Model の略。ブラウザがHTMLを読み込んで作る「操作可能なオブジェクトの集まり」。JavaScriptはこれを通じてHTMLを動かす。",
            },
            {
              word: "ツリー構造",
              definition:
                "木のように枝分かれした入れ子の構造。HTMLの <html> の中に <body>、その中に <div> ……という入れ子がそのまま親子関係を持ったツリーになる。家系図に似た構造。",
            },
            {
              word: "ノード",
              definition:
                "DOMツリーを構成する1つひとつのパーツのこと。タグ（要素）、テキスト、属性などすべてがノード。",
            },
            {
              word: "要素（Element）",
              definition:
                "HTMLのタグ（<div>、<p>、<button> など）に対応するノード。querySelector などで取得できるのはこの「要素ノード」。",
            },
            {
              word: "CSSセレクタ",
              definition:
                "CSSでスタイルを当てるときに使う書き方（.class-name や #id-name など）。querySelector の引数にもこの書き方を使う。",
            },
          ]}
        />

        {/* ── 概念図A: HTMLからDOMツリーへ ── */}
        <ConceptDiagram
          title="概念図A"
          description="HTMLテキストは、ブラウザの中で「DOMツリー」というオブジェクトに姿を変える。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-5">
            <FlowCard
              Icon={FileCode}
              title="HTMLテキスト"
              subtitle="<html><body>...</body></html>"
            />
            <FlowArrow label="ブラウザがパース" direction="right" />
            <FlowCard
              Icon={Cpu}
              title="DOMツリー"
              subtitle="オブジェクトとして展開"
              highlight
              accentColor="lime"
            />
            <FlowArrow label="アクセス" sublabel="document" direction="right" />
            <FlowCard
              Icon={Zap}
              title="JavaScript"
              subtitle="取得・変更・追加・削除"
            />
          </div>

          <div
            className="rounded-xl border-2 border-dashed border-lime-700/50 p-4"
          >
            <p className="text-xs font-semibold text-lime-400 text-center mb-3 tracking-wide uppercase">
              DOM ツリー — 構造イメージ
            </p>
            <p className="text-xs text-gray-500 text-center mb-3 leading-relaxed">
              HTMLの入れ子（タグの中にタグ）がそのまま「親子関係」のツリーになる。家系図と同じ構造。
            </p>
            <div className="font-mono text-xs text-gray-400 leading-relaxed space-y-1 pl-2">
              <p><span className="text-lime-300">document</span></p>
              <p className="pl-4">└─ <span className="text-lime-300">html</span></p>
              <p className="pl-8">├─ <span className="text-lime-300">head</span></p>
              <p className="pl-12">└─ title: 「My Page」</p>
              <p className="pl-8">└─ <span className="text-lime-300">body</span></p>
              <p className="pl-12">├─ <span className="text-lime-300">div</span> (id=&quot;app&quot;)</p>
              <p className="pl-16">└─ <span className="text-lime-300">p</span>: 「Hello」</p>
              <p className="pl-12">└─ <span className="text-lime-300">button</span>: 「Click」</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            JavaScriptは <code className="text-lime-300 px-1">document</code> を入口にして、このツリーの好きなノードに触ることができる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          DOMがツリー構造のオブジェクトだと分かりました。次は「そのDOMで何ができるか」、つまり取得・変更・追加・削除の4種類の操作を見ていきます。
        </p>

        {/* ── 概念図B: DOM操作でできること ── */}
        <ConceptDiagram
          title="概念図B"
          description="DOM操作で「できること」は、大きく分けて4種類しかない。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                Icon: Search,
                label: "取得",
                color: "text-lime-400",
                items: [
                  "querySelector",
                  "getElementById",
                  "querySelectorAll",
                ],
                desc: "ツリーから要素を見つける",
              },
              {
                Icon: Pencil,
                label: "変更",
                color: "text-blue-400",
                items: ["textContent", "innerHTML", "style / classList"],
                desc: "要素の中身や見た目を書き換える",
              },
              {
                Icon: Plus,
                label: "追加",
                color: "text-amber-400",
                items: [
                  "createElement",
                  "appendChild",
                  "insertAdjacentHTML",
                ],
                desc: "新しいノードを作って差し込む",
              },
              {
                Icon: Trash2,
                label: "削除",
                color: "text-rose-400",
                items: ["removeChild", "element.remove()"],
                desc: "ノードをツリーから外す",
              },
            ].map(({ Icon, label, color, items, desc }, i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <p className={`text-sm font-bold ${color}`}>{label}</p>
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">{desc}</p>
                <ul className="space-y-1">
                  {items.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs font-mono text-gray-300 px-2 py-1 rounded"
                      style={{ backgroundColor: "#1a1d2a" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「取得」がすべての起点。まず要素を掴んでから、変更・追加・削除のどれかを行う。
          </p>
        </ConceptDiagram>

        {/* コード例：概念図Bのメソッドを実際に書いてみる */}
        <div className="rounded-lg border p-4 mb-6" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
          <p className="text-xs text-gray-500 mb-3">実際に書くとこうなります</p>
          <pre className="text-sm text-gray-300 leading-relaxed font-mono">
            <code>{`// 要素を取得する
const btn = document.querySelector('#btn');

// テキストを変更する
btn.textContent = '押された！';

// クリックに反応する
btn.addEventListener('click', () => {
  btn.textContent = '押された！';
});`}</code>
          </pre>
        </div>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          4種類の操作が分かりました。次は「ユーザーの操作に反応する」仕組み——イベントリスナーを見ていきます。
        </p>

        {/* TermNote: 変更系プロパティと イベント図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "innerHTML",
              definition:
                "要素の中身をHTMLとして読み書きするプロパティ。タグを解釈するため、XSS攻撃のリスクがある。",
            },
            {
              word: "textContent",
              definition:
                "要素の中のテキストだけを読み書きするプロパティ。タグを解釈しないため安全。",
            },
            {
              word: "イベント",
              definition:
                "ユーザーの操作やブラウザの状態変化のこと。クリック・キー入力・フォーム送信・ページ読込完了などがある。",
            },
            {
              word: "イベントリスナー",
              definition:
                "「このイベントが起きたらこの関数を呼んで」と登録しておく仕組み。addEventListener で登録する。",
            },
            {
              word: "イベントオブジェクト",
              definition:
                "イベントが発生したときに関数に渡される情報のまとまり。どの要素でクリックされたか・どのキーが押されたかなどが入っている。",
            },
          ]}
        />

        {/* ── 概念図C: イベントリスナー ── */}
        <ConceptDiagram
          title="概念図C"
          description="ユーザーの操作に応じて何かを動かしたい——これを実現するのが「イベントリスナー」。"
        >
          <div className="flex flex-col items-stretch gap-0">
            <StackLayer
              Icon={MousePointerClick}
              title="① 要素に耳を付ける"
              subtitle="button.addEventListener('click', handleClick)"
              iconColor="text-lime-400"
            />
            <StackLayer
              Icon={Hand}
              title="② ユーザーが操作する"
              subtitle="ボタンをクリック・キーを押す・フォームを送信する など"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Network}
              title="③ ブラウザがイベントを通知する"
              subtitle="登録された関数（handleClick）にイベントオブジェクトを渡して呼び出す"
              iconColor="text-violet-400"
            />
            <StackLayer
              Icon={Zap}
              title="④ 関数がDOMを操作する"
              subtitle="textContent を書き換える・要素を追加する・色を変える など"
              iconColor="text-amber-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「いつ」動かすかを決めるのがイベントリスナー、「何を」動かすかを決めるのが関数の中身。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — 概念図の直後） ────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、DOMって何の略ですか？ 聞いたことはあるけど、ボク全然わからなくて……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Document Object Model の略です、マジさん。劇場で言うところの「舞台の設計図」だと思ってください。\nHTMLは幕が開いた瞬間の舞台セットそのもの。DOMはその舞台を演出家が後から書き換えられるよう、隅々まで詳細に書き起こした設計図です。\nJavaScriptは、その設計図を片手に舞台に指示を出す演出家。\n「あの照明を青に変えて」「ここに机を一つ追加して」と、リアルタイムに舞台を動かしていけるわけです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあReactって結局DOMを操作してるんですか？ ReactはDOMを使わない別世界の話だと思っていました……！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "最終的には実DOMを操作しています。\nただ、Reactは「仮想DOM（Virtual DOM）」という、メモリ上のJavaScriptオブジェクトとして持ったDOMの軽量コピーを挟みます。\n状態が変わると新しい仮想DOMを作り、前回との差分だけを計算して、実DOMにはその差分だけを反映する。\nこれによって「実DOMをむやみに触らない」効率化を実現しているわけです。\n中で動いている本質は、`document.querySelector` や `appendChild` と地続きの話なんですよ。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ところでマスター、ボクひとつ怖いことを聞きました。`innerHTML` って危なくないんですか？ なんかXSSとかいう攻撃と関係あるって……！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "鋭いところを突かれましたね、マジさん。ユーザーが入力した文字列をそのまま `innerHTML` に渡してしまうと、その中に `<script>` タグが混ざっていた場合、そのスクリプトがブラウザで実行されてしまうんです。\nこれがクロスサイトスクリプティング、通称XSS。\nユーザー入力を画面に出すときは `textContent` を使う、もしくは DOMPurify のようなサニタイズライブラリを必ず通す——これが鉄則です。\n手紙を読み上げるときに、書かれた呪文まで唱えてしまわないようにする、という心構えですね。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。つまり「DOMはブラウザの中の操作可能な設計図」で、JavaScriptはそれをいじる演出家。\nReactもDOMを操作しているけど、仮想DOMという賢い仕組みで効率化している。\nそしてユーザー入力を表示するときは `textContent` を使うのが安全と。腑に落ちました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "完璧なまとめですよ、マジさん。今日の話を押さえておけば、Reactを学んだときに「ああ、結局これはDOM操作の抽象化なんだな」とすんなり繋がります。\n生のDOM操作を一度自分の手でやってみてからReactに進むと、Reactのありがたみが10倍違って見えますよ。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["querySelector", "getElementById", "querySelectorAll"]}
          rows={[
            {
              label: "引数",
              cells: [
                "CSSセレクタ（柔軟）",
                "ID名のみ",
                "CSSセレクタ（複数取得）",
              ],
              highlightCol: 0,
            },
            {
              label: "戻り値",
              cells: [
                "最初の1要素（Element / null）",
                "1要素（Element / null）",
                "NodeList（配列like）",
              ],
              highlightCol: 0,
            },
            {
              label: "速度",
              cells: ["十分に速い（通常は体感不可）", "最速", "少し遅い"],
              highlightCol: 0,
            },
            {
              label: "使いやすさ",
              cells: [
                "◎ 柔軟（クラス・属性・子孫）",
                "○ シンプル",
                "◎ 複数取得に便利",
              ],
              highlightCol: 0,
            },
            {
              label: "推奨",
              cells: [
                "基本これでOK",
                "IDが確実に存在する場合",
                "複数要素の処理（forEach）",
              ],
              highlightCol: 0,
            },
          ]}
          note="速度差はミリ秒以下のレベルで、ほとんどのケースでは体感差ゼロ。「迷ったら querySelector」で進めて問題ない。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はDOMの仕組みをより深く知りたい方向けの内容です。ツリー構造の詳細・イベント伝播・XSSリスク・仮想DOMとの比較を扱います。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — DOMツリーの詳細構造
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          基礎ではツリー構造の概要を見ました。ここではノードの種類と、取得メソッドの使い分けをより詳しく確認します。
        </p>

        {/* TermNote: 応用編に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "属性",
              definition:
                "HTMLタグの中に書く追加情報。id=\"app\" や class=\"btn\" の id・class の部分が属性。JavaScriptから getAttribute() などで操作できる。",
            },
            {
              word: "バブリング",
              definition:
                "クリックなどのイベントが、発生した要素から親・祖先の方向へ次々と伝わっていく仕組み。泡が水面に上がるイメージ。",
            },
            {
              word: "XSS",
              definition:
                "Cross-Site Scripting の略。悪意ある人が書いたスクリプトを、別の人のブラウザで実行させる攻撃手法。innerHTML に未検証の文字列を渡すと起きやすい。",
            },
          ]}
        />

        {/* ── 概念図D: DOMツリーの詳細構造 ── */}
        <ConceptDiagram
          title="概念図D：DOMツリーの階層構造とノードの種類"
          description="HTMLページはブラウザによってツリー構造に変換される。各ノードには種類があり、親子・兄弟の関係で繋がっている。"
          accentColor="lime"
        >
          <div className="rounded-xl border-2 border-dashed border-lime-700/50 p-4 mb-4">
            <p className="text-xs font-semibold text-lime-400 text-center mb-3 tracking-wide uppercase">
              HTMLページのDOMツリー全体像
            </p>
            <div className="font-mono text-xs leading-relaxed space-y-0.5 pl-2">
              <p><span className="text-lime-300">document</span></p>
              <p className="pl-4">└─ <span className="text-lime-300">html</span></p>
              <p className="pl-8">├─ <span className="text-lime-300">head</span></p>
              <p className="pl-12">│   ├─ <span className="text-lime-300">title</span> <span className="text-gray-400">「My Page」</span> <span className="text-gray-600 text-[10px]">← テキストノード</span></p>
              <p className="pl-12">│   └─ <span className="text-lime-300">meta</span> <span className="text-blue-400">[charset=&quot;UTF-8&quot;]</span> <span className="text-gray-600 text-[10px]">← 属性ノード</span></p>
              <p className="pl-8">└─ <span className="text-lime-300">body</span></p>
              <p className="pl-12">    ├─ <span className="text-lime-300">header</span> <span className="text-gray-600 text-[10px]">← 要素ノード（Element）</span></p>
              <p className="pl-16">    │   └─ <span className="text-lime-300">h1</span> <span className="text-gray-400">「サイトタイトル」</span></p>
              <p className="pl-12">    ├─ <span className="text-lime-300">main</span></p>
              <p className="pl-16">    │   ├─ <span className="text-lime-300">section</span></p>
              <p className="pl-20">    │   │   ├─ <span className="text-lime-300">h2</span> <span className="text-gray-400">「見出し」</span></p>
              <p className="pl-20">    │   │   └─ <span className="text-lime-300">p</span> <span className="text-gray-400">「本文テキスト」</span></p>
              <p className="pl-16">    │   └─ <span className="text-lime-300">ul</span></p>
              <p className="pl-20">    │       ├─ <span className="text-lime-300">li</span> <span className="text-gray-400">「項目1」</span> <span className="text-gray-600 text-[10px]">← liはulの子 / 兄弟li同士</span></p>
              <p className="pl-20">    │       └─ <span className="text-lime-300">li</span> <span className="text-gray-400">「項目2」</span></p>
              <p className="pl-12">    └─ <span className="text-lime-300">footer</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              {
                label: "Element Node",
                sub: "要素ノード（タグ）",
                color: "text-lime-400",
                border: "border-lime-500/30",
                bg: "bg-lime-500/5",
                desc: "<div> <p> <ul> など。DOMツリーの主役で、querySelector 等で取得できるのはこのノード。",
              },
              {
                label: "Text Node",
                sub: "テキストノード（文字）",
                color: "text-blue-400",
                border: "border-blue-500/30",
                bg: "bg-blue-500/5",
                desc: "タグの中の文字データ。textContent や innerText で読み書きする。",
              },
              {
                label: "Attribute Node",
                sub: "属性ノード（属性）",
                color: "text-violet-400",
                border: "border-violet-500/30",
                bg: "bg-violet-500/5",
                desc: "id / class / href など。element.getAttribute() や dataset で操作する。",
              },
            ].map(({ label, sub, color, border, bg, desc }, i) => (
              <div
                key={i}
                className={`rounded-xl border p-3 ${border} ${bg}`}
              >
                <p className={`text-xs font-bold ${color} mb-0.5`}>{label}</p>
                <p className="text-[11px] text-gray-500 mb-1.5">{sub}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-lime-400 mb-3">取得メソッドの使い分け</p>
            <div className="space-y-2">
              {[
                {
                  method: "querySelector('#id')",
                  point: "IDで1件取得。最も柔軟、迷ったらこれ。",
                  good: "汎用",
                },
                {
                  method: "getElementById('id')",
                  point: "IDで1件取得。最速だがCSSセレクタ記法は不可。",
                  good: "速度重視",
                },
                {
                  method: "querySelectorAll('.cls')",
                  point: "条件に合う全要素をNodeListで返す。forEach 可。",
                  good: "複数取得",
                },
              ].map(({ method, point, good }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <code className="text-[11px] font-mono text-lime-300 bg-lime-500/10 px-1.5 py-0.5 rounded shrink-0">
                    {method}
                  </code>
                  <span className="text-xs text-gray-400 leading-relaxed">{point}</span>
                  <span className="text-[10px] text-lime-500 border border-lime-500/30 px-1.5 py-0.5 rounded shrink-0">
                    {good}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            親子関係：上の要素が「親（parent）」、直下が「子（child）」。同じ親を持つ要素同士が「兄弟（sibling）」。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          ツリー構造の詳細が分かりました。次は「クリックなどのイベントがDOMツリーをどう伝わるか」というイベント伝播の仕組みを見ていきます。
        </p>

        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 mt-10">
          ADVANCED — イベント伝播
        </h2>

        {/* ── 概念図E: イベント伝播 ── */}
        <ConceptDiagram
          title="概念図E：イベント伝播の仕組み（バブリング/キャプチャリング）"
          description="クリックなどのイベントは、ターゲット要素だけでなくDOMツリーを上下に伝播する。その仕組みを理解するとイベント委譲が使えるようになる。"
          accentColor="lime"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
              <p className="text-xs font-bold text-blue-400 mb-1">Phase 1：キャプチャリング</p>
              <p className="text-[11px] text-gray-500 mb-3">外 → 内（document から button へ下る）</p>
              <div className="space-y-1 font-mono text-xs">
                {["document", "html", "body", "section", "div", "button"].map((node, i, arr) => (
                  <div key={i} className="flex items-center gap-1.5" style={{ paddingLeft: `${i * 8}px` }}>
                    <span className={i === arr.length - 1 ? "text-lime-300 font-bold" : "text-gray-400"}>
                      {node}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="text-blue-500 text-[10px]">↓</span>
                    )}
                    {i === arr.length - 1 && (
                      <span className="text-lime-400 text-[10px] ml-1">← クリック!</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-lime-500/30 bg-lime-500/5 p-4">
              <p className="text-xs font-bold text-lime-400 mb-1">Phase 2：バブリング</p>
              <p className="text-[11px] text-gray-500 mb-3">内 → 外（button から document へ上る）</p>
              <div className="space-y-1 font-mono text-xs">
                {["button", "div", "section", "body", "html", "document"].map((node, i, arr) => (
                  <div key={i} className="flex items-center gap-1.5" style={{ paddingLeft: `${(arr.length - 1 - i) * 8}px` }}>
                    <span className={i === 0 ? "text-lime-300 font-bold" : "text-gray-400"}>
                      {node}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="text-lime-500 text-[10px]">↑</span>
                    )}
                    {i === 0 && (
                      <span className="text-lime-400 text-[10px] ml-1">← 発火元</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-bold text-rose-400 mb-1.5">stopPropagation()</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                イベントハンドラ内で呼ぶと、そこで伝播を止める。
                「親divには反応させたくない」場面で使う。
              </p>
              <code className="text-[11px] font-mono text-rose-300 bg-rose-500/10 px-2 py-1 rounded block mt-2">
                e.stopPropagation()
              </code>
            </div>

            <div
              className="rounded-xl border border-lime-500/30 bg-lime-500/5 p-3"
            >
              <p className="text-xs font-bold text-lime-400 mb-1.5">イベント委譲（Event Delegation）</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                バブリングを活用したパターン。子要素に個別リスナーを付けず、
                親要素1つで全子要素のイベントを管理する。
              </p>
              <code className="text-[11px] font-mono text-lime-300 bg-lime-500/10 px-2 py-1 rounded block mt-2">
                {'親.addEventListener → e.target で判別'}
              </code>
            </div>
          </div>

          <div
            className="rounded-xl border p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">イベント委譲の例</p>
            <div className="font-mono text-[11px] text-gray-300 space-y-0.5">
              <p><span className="text-gray-600">{"// 子li 100個に個別リスナーを付ける代わりに..."}</span></p>
              <p><span className="text-lime-300">ul</span>.addEventListener(<span className="text-amber-300">&apos;click&apos;</span>, (e) {"=> {"}</p>
              <p className="pl-4">{"if (e.target.tagName === "}<span className="text-amber-300">&apos;LI&apos;</span>{") {"}</p>
              <p className="pl-8">{"console.log(e.target.textContent);"}</p>
              <p className="pl-4">{"}"}</p>
              <p>{"});"}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            デフォルトはバブリングフェーズで発火。キャプチャで拾うには {"{ capture: true }"} を第3引数に渡す。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          直接DOMを書き換えるのが大変だと分かってきましたか？ ボタンが100個あったら、100個全部に addEventListener と textContent の更新を書く必要があります。この「大変さを自動化した」のが React です。Reactは内部で仮想DOMという仕組みを使っています。
        </p>

        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 mt-10">
          ADVANCED — 仮想DOM（React理解のための前知識）
        </h2>

        {/* ── 概念図F: 仮想DOM ── */}
        <ConceptDiagram
          title="概念図F：仮想DOM（Virtual DOM）とリアルDOMの違い"
          description="なぜReactは速いのか。直接DOM操作のコストと、仮想DOMによる差分更新の仕組みを比較する。"
          accentColor="lime"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-xs font-bold text-amber-400 mb-1">直接DOM操作（jQuery等）</p>
              <p className="text-[11px] text-gray-500 mb-3">1回の変更でもフル再描画のコスト</p>
              <div className="space-y-2">
                {[
                  { step: "1", label: "DOM変更", sub: "element.textContent = ..." },
                  { step: "2", label: "レイアウト再計算", sub: "Reflow — 要素の位置・サイズを再計算" },
                  { step: "3", label: "ペイント", sub: "Repaint — ピクセルを再描画" },
                  { step: "4", label: "コンポジット", sub: "レイヤーを合成して画面に表示" },
                ].map(({ step, label, sub }, i, arr) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[10px] text-amber-500 border border-amber-500/30 rounded px-1 shrink-0 mt-0.5">
                      {step}
                    </span>
                    <div>
                      <p className="text-xs text-gray-300">{label}</p>
                      <p className="text-[10px] text-gray-500">{sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-amber-600 text-xs ml-auto shrink-0">↓</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-amber-400 border border-amber-500/30 rounded px-2 py-1 mt-3 text-center">
                変更のたびに毎回全ステップ実行
              </p>
            </div>

            <div className="rounded-xl border border-lime-500/30 bg-lime-500/5 p-4">
              <p className="text-xs font-bold text-lime-400 mb-1">React（仮想DOM）</p>
              <p className="text-[11px] text-gray-500 mb-3">差分のみ実DOMに反映</p>
              <div className="space-y-2">
                {[
                  { step: "1", label: "状態変化", sub: "setState / useState 更新" },
                  { step: "2", label: "仮想DOM生成", sub: "軽量JSオブジェクトとして新UIを生成" },
                  { step: "3", label: "差分（diff）計算", sub: "旧仮想DOM vs 新仮想DOM を比較" },
                  { step: "4", label: "差分のみ実DOMに反映", sub: "変わった箇所だけ Reflow/Repaint" },
                ].map(({ step, label, sub }, i, arr) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[10px] text-lime-500 border border-lime-500/30 rounded px-1 shrink-0 mt-0.5">
                      {step}
                    </span>
                    <div>
                      <p className="text-xs text-gray-300">{label}</p>
                      <p className="text-[10px] text-gray-500">{sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-lime-600 text-xs ml-auto shrink-0">↓</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-lime-400 border border-lime-500/30 rounded px-2 py-1 mt-3 text-center">
                最小限の実DOM操作 = 高速・予測可能
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border p-4 mb-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-3">Reconciliation（差分検出）の概念</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="text-center">
                <div className="rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 font-mono text-[11px] text-gray-300 mb-1">
                  {'<ul> → <li>A</li> <li>B</li> </ul>'}
                </div>
                <p className="text-[10px] text-gray-600">旧 仮想DOM</p>
              </div>
              <div className="text-lime-500 font-bold">diff</div>
              <div className="text-center">
                <div className="rounded-lg border border-lime-700/40 bg-lime-900/20 px-3 py-2 font-mono text-[11px] text-gray-300 mb-1">
                  {'<ul> → <li>A</li> <li>B</li> <li className="text-lime-300">C</li> </ul>'}
                </div>
                <p className="text-[10px] text-gray-600">新 仮想DOM</p>
              </div>
              <div className="text-lime-500 font-bold">→</div>
              <div className="text-center">
                <div className="rounded-lg border border-lime-500/30 bg-lime-500/10 px-3 py-2 font-mono text-[11px] text-lime-300 mb-1">
                  {'appendChild(<li>C</li>)'}
                </div>
                <p className="text-[10px] text-lime-600">実DOMへの変更は最小限</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-bold text-amber-400 mb-1.5">jQuery（直接操作）</p>
              <div className="font-mono text-[11px] text-gray-400 space-y-0.5">
                <p>{"$('#list').append('<li>C</li>');  // 直接実DOM"}</p>
                <p className="text-gray-600">{"// 変更のたびに Reflow 発生"}</p>
              </div>
            </div>
            <div
              className="rounded-xl border border-lime-500/30 bg-lime-500/5 p-3"
            >
              <p className="text-xs font-bold text-lime-400 mb-1.5">React（仮想DOM）</p>
              <div className="font-mono text-[11px] text-gray-400 space-y-0.5">
                <p>{"setItems([...items, 'C']); // 状態更新のみ"}</p>
                <p className="text-lime-600">{"// Reactが差分を計算して反映"}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            仮想DOMはメモリ上の軽量JSオブジェクト。実DOMと異なりレイアウト計算が発生しないため、比較コストが極めて低い。
          </p>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        {/* 7.1 実践的な使い方（最も実用的なので先頭へ） */}
        <DetailBlock heading="7.1 DOMツリーの構造（ノード・要素・テキスト）">
          <p>
            DOMはツリー（木構造）。最上位に{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              document
            </code>{" "}
            があり、その下に html、body、各要素……と入れ子になっている。ツリーを構成する一つひとつを「ノード（Node）」と呼ぶ。
          </p>
          <BrowserMock url="example.com/index.html">
            <div className="p-4 font-mono text-xs">
              <p className="text-gray-500 mb-2 text-xs">— DOMツリー構造 —</p>
              <div className="space-y-0.5 leading-relaxed">
                <p><span className="text-lime-300">document</span></p>
                <p className="pl-4">└─ <span className="text-lime-300">&lt;html&gt;</span></p>
                <p className="pl-8">├─ <span className="text-lime-300">&lt;head&gt;</span></p>
                <p className="pl-12">│   └─ <span className="text-lime-300">&lt;title&gt;</span> <span className="text-gray-400">「My Page」</span> <span className="text-gray-600">← テキストノード</span></p>
                <p className="pl-8">└─ <span className="text-lime-300">&lt;body&gt;</span></p>
                <p className="pl-12">    ├─ <span className="text-lime-300">&lt;div id=&quot;app&quot;&gt;</span> <span className="text-gray-600">← 要素ノード</span></p>
                <p className="pl-16">    │   └─ <span className="text-lime-300">&lt;p&gt;</span> <span className="text-gray-400">「Hello」</span> <span className="text-gray-600">← テキストノード</span></p>
                <p className="pl-12">    └─ <span className="text-lime-300">&lt;button&gt;</span> <span className="text-gray-400">「Click」</span></p>
              </div>
            </div>
          </BrowserMock>
          <p>
            ノードには種類がある：要素ノード（Element）、テキストノード（Text）、コメントノード（Comment）など。普段触るのはほぼ要素ノード。
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono ml-1"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              children
            </code>
            は要素ノードだけ、
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono ml-1"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              childNodes
            </code>
            はテキストノードまで含むので、用途で使い分ける。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: ListTree,
              title: "childNodes",
              subtitle: "NodeList — 全ノードを含む",
              description: "要素ノード・テキストノード・コメントノードを全て含む。改行（空白テキスト）も混入するので扱いが複雑になりやすい。",
              accentColor: "amber",
            },
            {
              Icon: AlignLeft,
              title: "children",
              subtitle: "HTMLCollection — 要素ノードのみ",
              description: "要素ノード（タグ）だけを返す。テキストノードは無視されるので、ループ処理で意図しない空白に悩まされない。",
              accentColor: "lime",
            },
          ]} />
          <KeyPoint>
            「ノード」が広い概念、「要素」がその中の主役。配列like（NodeList / HTMLCollection）として返ってくることが多いので、forEach や Array.from に慣れておくと操作が楽になる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 イベントバブリングとキャプチャ">
          <p>
            ボタンをクリックすると、そのクリックイベントは「ボタン → 親div → body → html → document」と外側へ伝播していく。これを{" "}
            <strong className="text-white">バブリング</strong>と呼ぶ（泡が水面に上がっていくイメージ）。逆に外から内へ降りてくる経路は{" "}
            <strong className="text-white">キャプチャ</strong>と呼ぶ。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: Zap,
              title: "バブリング（デフォルト）",
              subtitle: "内 → 外 へ伝播",
              description: "クリックされた要素から、document に向かって上に伝播していく。通常のイベントリスナー登録では自動的にこちらが使われる。",
              accentColor: "lime",
            },
            {
              Icon: Network,
              title: "キャプチャ",
              subtitle: "外 → 内 へ伝播",
              description: "documentから対象要素に向かって下へ降りながら発火する。{ capture: true } オプションを指定した場合のみ有効。",
              accentColor: "violet",
            },
          ]} />
          <CodeBlock
            title="event-bubbling.js"
            language="javascript"
            code={`// バブリング（デフォルト）— ボタンをクリックすると親divも反応する
document.querySelector('#parent').addEventListener('click', (e) => {
  console.log('親divがクリックを受け取った（バブリング）');
});

document.querySelector('#child').addEventListener('click', (e) => {
  console.log('子ボタンがクリックされた');
  // e.stopPropagation() を呼ぶと伝播をここで止められる
});

// イベント委譲 — リスト全体に1つのリスナーを付ける
document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('クリックされた項目:', e.target.textContent);
  }
});`}
          />
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              addEventListener(type, fn, &#123; capture: true &#125;)
            </code>{" "}
            と書くとキャプチャフェーズで拾える。デフォルトはバブリング。
          </p>
          <KeyPoint>
            「リストの全ての項目にクリックを付けたい」とき、各項目に個別にリスナーを付けるのではなく、親に1つだけ付けて event.target で判別する手法を「イベント委譲（Event Delegation）」と呼ぶ。バブリングを利用した代表的なテクニック。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.3 innerHTMLのXSSリスクとtextContentの使い分け">
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              innerHTML
            </code>{" "}
            は受け取った文字列をHTMLとして解釈する。便利だが、ユーザー入力をそのまま渡すと{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              &lt;script&gt;
            </code>{" "}
            タグやイベントハンドラ属性が混ざった瞬間に攻撃が成立する。これがXSS（Cross-Site Scripting）。
          </p>
          <CorrectionCard
            misconception="innerHTML は文字列を表示するだけだから、ユーザーの入力をそのまま渡しても大丈夫"
            correction="innerHTML は文字列を HTML として実行する。<script> タグやイベント属性が混入した瞬間に攻撃が成立する"
            reason="ユーザーが名前フォームに「<img src=x onerror=alert(1)>」と入力しただけで、そのスクリプトがページ上で実行されてしまう。"
          />
          <UseCaseGrid cols={2} items={[
            {
              Icon: ShieldAlert,
              title: "innerHTML（危険な使い方）",
              subtitle: "ユーザー入力を直接渡す",
              description: "文字列をHTMLとして解釈するため、悪意ある入力に含まれたスクリプトがそのまま実行される。XSS攻撃の典型的な侵入口。",
              accentColor: "red",
            },
            {
              Icon: ShieldCheck,
              title: "textContent（安全）",
              subtitle: "文字列として扱う",
              description: "タグや属性を「文字」として表示するだけで、スクリプトとして解釈しない。ユーザー入力を表示するなら必ずこちらを使う。",
              accentColor: "lime",
            },
          ]} />
          <CodeBlock
            title="innerHTML-vs-textContent.js"
            language="javascript"
            code={`const userInput = '<img src=x onerror="alert(\'XSS攻撃!\')">';

// 危険 — ユーザー入力をHTMLとして解釈・実行してしまう
document.querySelector('#output').innerHTML = userInput;
// → onerror イベントが発火して alert() が実行される

// 安全 — 文字列としてそのまま表示する
document.querySelector('#output').textContent = userInput;
// → "<img src=x onerror=...>" がそのまま文字として画面に表示される

// HTMLとして埋め込む必要がある場合はサニタイズを通す
import DOMPurify from 'dompurify';
document.querySelector('#output').innerHTML = DOMPurify.sanitize(userInput);`}
          />
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              textContent
            </code>{" "}
            は文字列を「ただの文字」として扱うのでスクリプトは絶対に実行されない。「とにかく文字を表示したいだけ」のケースは textContent を使うのが鉄則。HTMLとして埋め込みたい場合は{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#a3e635" }}
            >
              DOMPurify
            </code>
            のようなサニタイザを通す。
          </p>
          <WarningPoint>
            ユーザー入力（フォーム・URLパラメータ・他人が書いたコメントなど）を innerHTML に直接渡すのは絶対に避ける。Reactは標準で textContent 相当のエスケープを行うが、`dangerouslySetInnerHTML` を使った瞬間に同じリスクが発生する。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="7.4 Reactとの関係（仮想DOMという抽象化）">
          <p>
            Reactは生のDOM操作を毎回手で書かせない代わりに、「状態が変わったらUIがどう変わるか」を関数として書かせる。中身では仮想DOMという軽量なJSオブジェクトを使って、前回のUIと今回のUIを比較し、差分だけを実DOMに反映する。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: SquareCode,
              title: "生のDOM操作",
              subtitle: "手動で要素を探して書き換える",
              description: "querySelector で要素を取得し、textContent や classList を直接書き換える。どこを変えるかを自分でコントロールする。",
              accentColor: "amber",
            },
            {
              Icon: GitBranch,
              title: "React（仮想DOM）",
              subtitle: "状態だけ書けばUIが付いてくる",
              description: "useState で状態を管理するだけで、Reactが差分を計算して必要な部分だけ実DOMに反映する。querySelector を書く必要がない。",
              accentColor: "lime",
            },
          ]} />
          <CodeBlock
            title="dom-vs-react.js"
            language="javascript"
            code={`// ---- 生のDOM操作 ----
let count = 0;
const btn = document.querySelector('#btn');
const display = document.querySelector('#display');

btn.addEventListener('click', () => {
  count++;
  display.textContent = count; // 毎回、要素を探して書き換える
});

// ---- React（useState） ----
// import { useState } from 'react';
// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p>{count}</p>  {/* 状態が変われば自動で再描画 */}
//       <button onClick={() => setCount(count + 1)}>+1</button>
//     </div>
//   );
// }`}
          />
          <p>
            このページで学んだ querySelector / addEventListener / textContent といった概念は、Reactを使ってもなくならない。Reactは{" "}
            <strong className="text-white">DOM操作を抽象化したラッパー</strong>であって、DOMそのものを置き換える別世界ではない。
          </p>
          <KeyPoint>
            生のDOM操作を一度自分の手で書いてみると、Reactの「状態だけ書けばUIが付いてくる」というありがたさが何倍にも実感できる。ここを飛ばさないことが、後で詰まらないコツ。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/variables",
            title: "変数とスコープ",
            description: "var / let / const の違いとブロックスコープ",
            icon: "Code2",
          },
          {
            href: "/javascript/fetch",
            title: "fetch API",
            description: "ブラウザからサーバーにデータを取りに行く",
            icon: "Cloud",
          },
          {
            href: "/javascript/async",
            title: "非同期処理",
            description: "Promise・async / await・イベントループ",
            icon: "Rocket",
          },
        ]}
      />

      <PageDrill questions={domQuestions} />
    </div>
  );
}
