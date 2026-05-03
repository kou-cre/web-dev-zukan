import {
  Package,
  Lock,
  KeyRound,
  Building2,
  DoorOpen,
  Layers,
  Boxes,
  ArrowUpFromLine,
  RefreshCw,
  Ban,
  CheckCheck,
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
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { variablesQuestions } from "@/content/questions/javascript/variables";

export const metadata = {
  title: "変数とスコープ | Web開発図解",
  description:
    "JavaScriptの変数（var / let / const）とスコープを図解で解説。ホイスティング・TDZ・ブロックスコープまで一気に整理する。",
};

export default function VariablesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="変数とスコープ"
        subtitle={"データを入れる「箱」の種類と、その箱が使える「範囲」の話"}
        body={"var / let / const の違いと、スコープの仕組みを1ページで掴む。"}
        accentColor="yellow"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "var / let / const の3種類の違い",
          "スコープ（変数が使える範囲）のルール",
          "迷ったら const から書き始める現場ルール",
        ]}
        prerequisites={[
          "変数 = データに名前を付けて取っておく入れ物",
          "プログラムは上から下へ1行ずつ実行される",
          "console.log(x) は x の中身を画面に表示する命令",
        ]}
        outOfScope={[
          "ホイスティング（コードが動く前の裏側の話）",
          "TDZ（Temporal Dead Zone）",
          "クロージャ（関数が変数を覚え続ける仕組み）",
          "プリミティブ型とオブジェクト型のメモリの違い",
        ]}
      />

      <OnePageSummary
        keyMessage="JavaScriptには変数を宣言する3つの方法がある。var は古く問題が多い。let は値を変えられる箱、const は一度決めたら変えられない箱。そして「スコープ」は箱が有効な範囲を決めるルール。"
        metaphorTitle="ロッカールームの3種類の棚"
        metaphorPoints={[
          {
            label: "var",
            real: "var は廊下に置いた荷物。どこからでも見えてしまい、誰かに勝手に触られる危険がある",
            metaphor: "廊下の置き荷物",
          },
          {
            label: "let",
            real: "let は個人ロッカー。その部屋（ブロック）の中でだけ使えて、外には漏れない",
            metaphor: "個人ロッカー",
          },
          {
            label: "const",
            real: "const は鍵のかかったロッカー。中身を入れ替えることはできない",
            metaphor: "鍵付きロッカー",
          },
          {
            label: "スコープ",
            real: "スコープは「ロッカーが使えるフロア」。関数・ブロック単位で有効範囲が決まる",
            metaphor: "ロッカーが使えるフロア",
          },
        ]}
        definition="変数とはデータを格納する名前付きの箱。スコープとはその箱にアクセスできる範囲のルール。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「3種類の箱の性格」と「変数が使える範囲（スコープ）」を図で確認しましょう。
        </p>

        {/* ── 概念図A: var / let / const の性格 ── */}
        <ConceptDiagram
          title="概念図A"
          description="var / let / const は、それぞれどんな性格の「箱」なのか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* var */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-red-400" />
                <p className="text-sm font-bold text-white">var</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                  非推奨
                </span>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>
                  再宣言：<span className="text-red-300">可</span>
                  <span className="text-gray-600 ml-1">（同じ名前を何度でも宣言できる）</span>
                </li>
                <li>
                  再代入：<span className="text-red-300">可</span>
                  <span className="text-gray-600 ml-1">（中身を後から変えられる）</span>
                </li>
                <li>
                  スコープ：<span className="text-red-300">関数</span>
                  <span className="text-gray-600 ml-1">（関数の外に漏れる）</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                古い書き方。レガシーコードを読む以外で新規に書く理由はない。
              </p>
            </div>

            {/* let */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <KeyRound className="w-5 h-5 text-blue-400" />
                <p className="text-sm font-bold text-white">let</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  値が変わるとき
                </span>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>
                  再宣言：<span className="text-blue-300">不可</span>
                  <span className="text-gray-600 ml-1">（同じ名前を2回宣言するとエラー）</span>
                </li>
                <li>
                  再代入：<span className="text-blue-300">可</span>
                  <span className="text-gray-600 ml-1">（後から中身を変えられる）</span>
                </li>
                <li>
                  スコープ：<span className="text-blue-300">ブロック</span>
                  <span className="text-gray-600 ml-1">（&#123; &#125; の中だけ）</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                カウンターやフラグのように値を更新する箱に使う。
              </p>
            </div>

            {/* const */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(234,179,8,0.06)",
                borderColor: "rgba(234,179,8,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-yellow-400" />
                <p className="text-sm font-bold text-white">const</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
                  基本これ
                </span>
              </div>
              <ul className="text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <li>
                  再宣言：<span className="text-yellow-300">不可</span>
                  <span className="text-gray-600 ml-1">（エラーになる）</span>
                </li>
                <li>
                  再代入：<span className="text-yellow-300">不可</span>
                  <span className="text-gray-600 ml-1">（別の値に書き換えられない）</span>
                </li>
                <li>
                  スコープ：<span className="text-yellow-300">ブロック</span>
                  <span className="text-gray-600 ml-1">（&#123; &#125; の中だけ）</span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-3 leading-tight">
                第一選択。値を変える必要が出たら let に書き換える。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「const から書き始め、必要になったら let に直す」が現代のJS流儀。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          3種類の箱の性格が分かりました。次は「その箱がどこで使えるか」というスコープのルールを見ていきます。
        </p>

        {/* ── 概念図B: スコープ ── */}
        <ConceptDiagram
          title="概念図B"
          description="スコープは「箱が見える範囲」。外側からは中が見えず、中からは外が見える。"
        >
          <div
            className="rounded-xl border-2 border-dashed border-yellow-700/50 p-4"
          >
            <p className="text-xs font-semibold text-yellow-500 text-center mb-4 tracking-wide uppercase">
              Scope — 入れ子構造
            </p>
            <StackLayer
              Icon={Building2}
              title="グローバルスコープ（最外）"
              subtitle="どこからでも見える。汚染されると全体に影響するので使い所は最小限に"
              iconColor="text-gray-400"
            />
            <StackLayer
              Icon={DoorOpen}
              title="関数スコープ（その中）"
              subtitle="function() { ... } の中だけで有効。var はここまでが見える範囲"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Boxes}
              title="ブロックスコープ（さらに中）"
              subtitle="{ } で囲んだ範囲だけ。if / for / while の中。let / const はここで閉じ込められる"
              iconColor="text-yellow-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            内側からは外が見える（参照できる）。外側からは内側が見えない（隠蔽される）。
          </p>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">なぜ「外から中が見えない」のか？</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              関数の中で作った一時的な変数が外に漏れると、プログラム全体の変数名がぶつかって事故が起きます。
              スコープは「中で作ったものは中だけで使う」という整理整頓のルールです。
              var が「廊下の置き荷物」で危険だったのは、このルールを守らないからです。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — スコープの直後） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、ボク前から思っていたんですけど、`var` と `let` と `const` って、全部「変数」なのに、なぜ3種類もあるんでしょうか……？ ボクから見ると、ぜんぶ同じ箱に見えてしまって。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良いご質問ですね、マジさん。これはロッカールームに3種類の棚があると思ってください。`var` は廊下にポンと置いた荷物、`let` は個人ロッカー、`const` は鍵のかかったロッカーです。歴史的には `var` しかなかった時代があり、廊下に荷物を置きすぎて誰の物か分からなくなった反省から、`let` と `const` が後から追加されたんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nちょっと待ってくださいマスター！ `const` って「変数なのに変えられない」んですよね？ それはもう変数じゃなくて『定数』ってやつなのでは……！？ 変数を名乗っておきながら変えられないなんて、世紀の大裏切りでは！？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "落ち着いてください、マジさん。半分正解で、半分は誤解です。`const` が固定しているのは「箱の置き場所」であって、「箱の中身」ではないのです。たとえば `const user = { name: 'マジ' }` と書いた場合、user という変数に別のオブジェクトを再代入することはできません。しかし user.name を 'マスター' に書き換えるのは自由にできます。封筒の宛先は変えられないが、封筒の中身は入れ替えられる、というイメージですね。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "あ、あぁ……なんとか分かった気がします。じゃあ次に「スコープ」っていうやつなんですけど……ボクここがどうしても腑に落ちなくて。なぜ外から中が見えないんですか？ 透明にしておいてくれた方が便利なのでは……？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "それも素晴らしい疑問です。会社のフロア構造を想像してみてください。マジさんが3階の経営フロアにいるとして、1階の受付の資料は取りに行けますよね。でも、1階の警備員が3階の社長室に勝手に入ってきたら困りませんか？ スコープも同じで、内側から外を見るのは安全だが、外から内に踏み込まれると秩序が崩れる。だからJavaScriptは「外から中は見えない」ようにできているんです。これがあるおかげで、関数の中で使う一時的な変数が、外の世界を汚さずに済むんですよ。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。「外から中が見えない」のは不便なのではなくて、「中で使った道具が外を汚さない」ための仕組みだったんですね。`var` は廊下に放置だから事故が起きる、`let` と `const` はちゃんと部屋の中に閉じ込められる。やっと繋がってきました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "見事にまとめていただきました、マジさん。最後に実践ルールをひとつ。「迷ったらまず `const` で書き、後から値を変える必要が出てきたら `let` に直す」。これだけ守れば、変数まわりで足を取られることはまずありません。`var` のことはレガシーコードを読むときの予備知識として頭の片隅に置いておけば十分ですよ。",
          },
        ]}
      />

      {/* ── 比較表（基礎編 — ホイスティング行なし） ────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["var", "let", "const"]}
          rows={[
            {
              label: "スコープ",
              cells: ["関数スコープ", "ブロックスコープ", "ブロックスコープ"],
              highlightCol: 2,
            },
            {
              label: "再宣言",
              cells: ["可（事故の元）", "不可（エラー）", "不可（エラー）"],
              highlightCol: 2,
            },
            {
              label: "再代入",
              cells: ["可", "可", "不可（エラー）"],
              highlightCol: 2,
            },
            {
              label: "推奨度",
              cells: ["使わない", "値が変わるときだけ", "基本これを使う"],
              highlightCol: 2,
            },
          ]}
          note="基本は const。値を更新する必要が出てきた箱だけ let。var は新規コードでは書かない、が現代のJSの共通認識。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は「なぜそう動くのか」を深く知りたい方向けの内容です。実践ルールだけ知りたい場合は詳細解説（6.1）まで飛ばしてください。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — ホイスティングとTDZ
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          JavaScriptはコードを動かす前に、宣言だけを先に把握しておく仕組みがあります。
          これを「ホイスティング（巻き上げ）」と言い、var と let/const で挙動が異なります。
        </p>

        {/* TermNote: ホイスティング図に出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "JSエンジン",
              definition:
                "ブラウザに内蔵されている、JavaScriptコードを動かす本体のこと。Chromeには V8 というエンジンが入っている。",
            },
            {
              word: "parse（パース）",
              definition:
                "コードを読んで「文法的に何が書いてあるか」を理解する作業。料理のレシピを読んで食材と手順を把握するイメージ。",
            },
            {
              word: "巻き上げ",
              definition:
                "コードが動く前に、JSエンジンが「変数や関数の宣言」だけを先に把握しておく仕組み。実行より先に宣言だけを「知っている」状態になる。",
            },
            {
              word: "ReferenceError",
              definition:
                "まだ準備できていない変数を使おうとしたときにJSが出すエラー。「その名前の変数は知らない（か、まだ触れない）」というお知らせ。",
            },
            {
              word: "TDZ",
              definition:
                "Temporal Dead Zone（一時的デッドゾーン）の略。let/const を宣言した行より前に変数を触ろうとするとエラーになる「立ち入り禁止の期間」のこと。",
            },
          ]}
        />

        {/* ── 概念図C: ホイスティング ── */}
        <ConceptDiagram
          title="概念図C"
          description="「ホイスティング」とは何か？ コードが動く前に、JSエンジンが何をしているのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={Layers}
              title="コード実行前"
              subtitle="あなたが書いたコード"
            />
            <FlowArrow label="解析" sublabel="parse" direction="right" />
            <FlowCard
              Icon={ArrowUpFromLine}
              title="宣言を巻き上げ"
              subtitle="先頭に集める"
              highlight
              accentColor="yellow"
            />
            <FlowArrow label="実行開始" direction="right" />
            <div className="flex flex-col gap-2">
              <div
                className="rounded-lg border px-3 py-2 text-xs"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-red-300 font-semibold">var</span>
                <span className="text-gray-500"> → </span>
                <span className="text-gray-300">undefined（空っぽ）</span>
              </div>
              <div
                className="rounded-lg border px-3 py-2 text-xs"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-yellow-300 font-semibold">let / const</span>
                <span className="text-gray-500"> → </span>
                <span className="text-gray-300">TDZ（触るとError）</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            「巻き上げられる」点はどれも同じ。違うのは「巻き上げ後に触ったときの挙動」。
          </p>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">コード例で確認</p>
            <div className="font-mono text-xs space-y-1 leading-relaxed text-gray-300">
              <p>
                <span className="text-gray-500">{"// var は宣言前に使っても undefined が返る（エラーにならない）"}</span>
              </p>
              <p>
                <span className="text-yellow-300">console</span>
                <span className="text-gray-300">.log(name);</span>
                <span className="text-gray-500 ml-2">{"// → undefined（エラーなし！）"}</span>
              </p>
              <p>
                <span className="text-blue-300">var</span>
                <span className="text-gray-300"> name </span>
                <span className="text-gray-500">= </span>
                <span className="text-green-300">{'"マジ"'}</span>
                <span className="text-gray-300">;</span>
              </p>
              <p className="mt-2">
                <span className="text-gray-500">{"// let は宣言前に触ると ReferenceError になる（ミスをすぐ教えてくれる）"}</span>
              </p>
              <p>
                <span className="text-yellow-300">console</span>
                <span className="text-gray-300">.log(age);</span>
                <span className="text-red-400 ml-2">{"// → ReferenceError（エラー！）"}</span>
              </p>
              <p>
                <span className="text-blue-300">let</span>
                <span className="text-gray-300"> age </span>
                <span className="text-gray-500">= </span>
                <span className="text-orange-300">20</span>
                <span className="text-gray-300">;</span>
              </p>
            </div>
          </div>
        </ConceptDiagram>

        {/* ── 概念図F: TDZ詳細（Cの直後に移動） ── */}
        <ConceptDiagram
          title="概念図F：TDZ（一時的デッドゾーン）とホイスティング"
          description="変数はスコープ開始と同時に「存在はする」。ただし宣言の行まで触るとエラー。"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4 text-center">
                スコープ開始 → 宣言行 → スコープ終了
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-red-300 font-mono w-12">var</span>
                    <div className="flex-1 flex rounded overflow-hidden h-6 text-xs">
                      <div
                        className="flex items-center justify-center flex-1 text-gray-300"
                        style={{ backgroundColor: "rgba(239,68,68,0.15)", borderRight: "1px solid rgba(239,68,68,0.3)" }}
                      >
                        undefined（アクセス可）
                      </div>
                      <div
                        className="flex items-center justify-center flex-1 text-gray-300"
                        style={{ backgroundColor: "rgba(239,68,68,0.08)" }}
                      >
                        正常アクセス可
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 ml-14">ホイスティング + undefined 初期化。宣言前でもエラーにならない（バグの温床）</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-yellow-300 font-mono w-12">let</span>
                    <div className="flex-1 flex rounded overflow-hidden h-6 text-xs">
                      <div
                        className="flex items-center justify-center flex-1 text-red-300 font-semibold"
                        style={{ backgroundColor: "rgba(239,68,68,0.2)", borderRight: "2px solid rgba(239,68,68,0.5)" }}
                      >
                        TDZ — ReferenceError
                      </div>
                      <div
                        className="flex items-center justify-center flex-1 text-gray-300"
                        style={{ backgroundColor: "rgba(234,179,8,0.08)" }}
                      >
                        正常アクセス可
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 ml-14">ホイスティングあり（未初期化）。TDZ中にアクセスするとReferenceError</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-yellow-300 font-mono w-12">const</span>
                    <div className="flex-1 flex rounded overflow-hidden h-6 text-xs">
                      <div
                        className="flex items-center justify-center flex-1 text-red-300 font-semibold"
                        style={{ backgroundColor: "rgba(239,68,68,0.2)", borderRight: "2px solid rgba(239,68,68,0.5)" }}
                      >
                        TDZ — ReferenceError
                      </div>
                      <div
                        className="flex items-center justify-center flex-1 text-gray-300"
                        style={{ backgroundColor: "rgba(234,179,8,0.08)" }}
                      >
                        正常アクセス可
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 ml-14">let と同じTDZ動作。宣言と同時に必ず初期化が必要</p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(234,179,8,0.05)", borderColor: "rgba(234,179,8,0.3)" }}
            >
              <p className="text-xs font-semibold text-yellow-300 mb-2">TDZ は「安全装置」</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                var は宣言前に undefined を返すため「初期化し忘れ」に気づけません。
                TDZ はそれを防ぐ設計で、エラーが出るのは「バグが早期発見できている」サインです。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            「let / const のエラーは怖い」ではなく「var のサイレントな undefined の方が危険」。
          </p>
        </ConceptDiagram>

        {/* ── 応用編 クロージャ ── */}
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 mt-10">
          ADVANCED — クロージャ
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          スコープのルール（内側から外が見える）の応用として、「クロージャ」という仕組みがあります。
          3ステップで段階的に確認しましょう。
        </p>

        {/* クロージャ前提ステップ */}
        <div
          className="rounded-xl border p-5 mb-6"
          style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-5">
            クロージャを理解するための3ステップ
          </p>
          <div className="space-y-5">
            {/* Step 1 */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">
                ステップ1: 関数の中で変数を作れる
              </p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">function</span>
                  <span className="text-yellow-300"> hello</span>
                  <span className="text-gray-300">{"() {"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-blue-300">let</span>
                  <span className="text-gray-300"> message </span>
                  <span className="text-gray-500">= </span>
                  <span className="text-green-300">{'"こんにちは"'}</span>
                  <span className="text-gray-300">;</span>
                  <span className="text-gray-500 ml-2">{"// hello() の中だけで生きる変数"}</span>
                </p>
                <p className="text-gray-300">{"}"}</p>
              </div>
            </div>
            {/* Step 2 */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">
                ステップ2: 関数の中に関数を書ける
              </p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">function</span>
                  <span className="text-yellow-300"> outer</span>
                  <span className="text-gray-300">{"() {"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-blue-300">let</span>
                  <span className="text-gray-300"> x </span>
                  <span className="text-gray-500">= </span>
                  <span className="text-orange-300">10</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p className="ml-4">
                  <span className="text-blue-300">function</span>
                  <span className="text-yellow-300"> inner</span>
                  <span className="text-gray-300">{"() {"}</span>
                </p>
                <p className="ml-8 text-gray-500">
                  {"// x が見える（スコープのルール）"}
                </p>
                <p className="ml-4"><span className="text-gray-300">{"}"}</span></p>
                <p className="text-gray-300">{"}"}</p>
              </div>
            </div>
            {/* Step 3 */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">
                ステップ3: 関数を「値」として返せる → これがクロージャ！
              </p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p>
                  <span className="text-blue-300">function</span>
                  <span className="text-yellow-300"> outer</span>
                  <span className="text-gray-300">{"() {"}</span>
                </p>
                <p className="ml-4">
                  <span className="text-blue-300">let</span>
                  <span className="text-gray-300"> x </span>
                  <span className="text-gray-500">= </span>
                  <span className="text-orange-300">10</span>
                  <span className="text-gray-300">;</span>
                </p>
                <p className="ml-4">
                  <span className="text-blue-300">return</span>
                  <span className="text-blue-300"> function</span>
                  <span className="text-gray-300">{"() { "}</span>
                  <span className="text-blue-300">return</span>
                  <span className="text-gray-300">{" x; };"}</span>
                  <span className="text-gray-500 ml-2">{"// ← 関数を返す"}</span>
                </p>
                <p className="text-gray-300">{"}"}</p>
                <p className="mt-2">
                  <span className="text-blue-300">const</span>
                  <span className="text-gray-300"> fn </span>
                  <span className="text-gray-500">= </span>
                  <span className="text-yellow-300">outer</span>
                  <span className="text-gray-300">();</span>
                  <span className="text-gray-500 ml-2">{"// fn は「x を返す関数」"}</span>
                </p>
                <p>
                  <span className="text-gray-300">fn();</span>
                  <span className="text-gray-500 ml-2">
                    {"// → 10  ← outer() が終わった後も x を覚えている！"}
                  </span>
                </p>
              </div>
              <p className="text-sm text-yellow-400 mt-2 leading-relaxed">
                ↑ これがクロージャです。outer() が終わっても、返された関数は x を覚え続けています。
              </p>
            </div>
          </div>
        </div>

        {/* ── 概念図D: クロージャ ── */}
        <ConceptDiagram
          title="概念図D：クロージャ（Closure）の仕組み"
          description="外側の関数が終わっても、内側の関数はその変数を「覚えている」。"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border-2 border-dashed border-yellow-700/40 p-4"
            >
              <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-3">
                クロージャの構造
              </p>
              <div className="flex flex-col gap-2">
                <div
                  className="rounded-lg border p-3"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs text-gray-400 mb-1.5">
                    外側の関数スコープ — <span className="text-yellow-300 font-mono">makeCounter()</span>
                  </p>
                  <div
                    className="rounded border p-3 ml-4"
                    style={{ backgroundColor: "rgba(234,179,8,0.05)", borderColor: "rgba(234,179,8,0.3)" }}
                  >
                    <p className="text-xs text-gray-300 mb-1">
                      <span className="text-yellow-300 font-mono">let count = 0</span>
                      <span className="text-gray-500 ml-2">← この変数を「閉じ込める」</span>
                    </p>
                    <div
                      className="rounded border p-2 ml-4 mt-2"
                      style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                    >
                      <p className="text-xs text-gray-300">
                        内側の関数 — <span className="text-yellow-300 font-mono">increment()</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        外側の <span className="font-mono text-yellow-300">count</span> を参照・更新できる
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "rgba(234,179,8,0.05)", borderColor: "rgba(234,179,8,0.3)" }}
              >
                <p className="text-xs font-semibold text-yellow-300 mb-2">counterA（独立した count）</p>
                <div className="font-mono text-xs space-y-0.5 text-gray-300">
                  <p><span className="text-gray-500">call 1 →</span> count: 1</p>
                  <p><span className="text-gray-500">call 2 →</span> count: 2</p>
                  <p><span className="text-gray-500">call 3 →</span> count: 3</p>
                </div>
              </div>
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-xs font-semibold text-gray-300 mb-2">counterB（別インスタンス）</p>
                <div className="font-mono text-xs space-y-0.5 text-gray-400">
                  <p><span className="text-gray-500">call 1 →</span> count: 1</p>
                  <p><span className="text-gray-500">call 2 →</span> count: 2</p>
                </div>
                <p className="text-xs text-gray-600 mt-2">counterA と count を共有しない</p>
              </div>
            </div>

            <div
              className="rounded-lg border p-3 font-mono text-xs leading-relaxed"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-gray-500 mb-1">{"// クロージャの基本パターン"}</p>
              <p>
                <span className="text-blue-300">function</span>
                <span className="text-yellow-300"> makeCounter</span>
                <span className="text-gray-300">{"() {"}</span>
              </p>
              <p className="ml-4">
                <span className="text-blue-300">let</span>
                <span className="text-gray-300"> count </span>
                <span className="text-gray-500">= </span>
                <span className="text-orange-300">0</span>
                <span className="text-gray-300">;</span>
              </p>
              <p className="ml-4">
                <span className="text-blue-300">return</span>
                <span className="text-gray-300">{" () => { count++; "}</span>
                <span className="text-blue-300">return</span>
                <span className="text-gray-300">{" count; };"}</span>
              </p>
              <p className="text-gray-300">{"}"}</p>
              <p className="mt-2">
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> counterA </span>
                <span className="text-gray-500">= </span>
                <span className="text-yellow-300">makeCounter</span>
                <span className="text-gray-300">();</span>
              </p>
              <p>
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> counterB </span>
                <span className="text-gray-500">= </span>
                <span className="text-yellow-300">makeCounter</span>
                <span className="text-gray-300">();</span>
              </p>
              <p className="mt-1 text-gray-500">{"// counterA と counterB は count を共有しない"}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            クロージャ = 「スコープのネスト」+ 「関数が変数を覚え続ける」の組み合わせ。
          </p>
        </ConceptDiagram>

        {/* ── 応用編 プリミティブ型 ── */}
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 mt-10">
          ADVANCED — データのコピーとメモリ
        </h2>

        <div
          className="rounded-lg border px-4 py-3 mb-5 text-sm text-amber-300 flex gap-3"
          style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.3)" }}
        >
          <span className="flex-shrink-0">ℹ</span>
          <span>
            以下はさらに発展的な内容です。「なぜ const の配列は変更できてしまうのか？」が気になったときに読んでください。1周目は飛ばしてOKです。
          </span>
        </div>

        {/* ── 概念図E: プリミティブ型とオブジェクト型 ── */}
        <ConceptDiagram
          title="概念図E：プリミティブ型とオブジェクト型のメモリの違い"
          description="値そのものを持つ型と、参照（アドレス）を持つ型では、コピーの挙動が変わる。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-bold text-blue-300 mb-3 uppercase tracking-wide">
                プリミティブ型 — スタック
              </p>
              <p className="text-xs text-gray-500 mb-2">number / string / boolean / null / undefined</p>
              <div className="space-y-2">
                <div
                  className="rounded border px-3 py-2 text-xs font-mono"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <span className="text-gray-400">a </span>
                  <span className="text-gray-600">= </span>
                  <span className="text-orange-300">42</span>
                  <span className="text-gray-600 ml-2">← 値そのもの</span>
                </div>
                <div
                  className="rounded border px-3 py-2 text-xs font-mono"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <span className="text-gray-400">b </span>
                  <span className="text-gray-600">= </span>
                  <span className="text-orange-300">42</span>
                  <span className="text-gray-600 ml-2">← 値のコピー</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                b を変えても a は変わらない。それぞれ独立した箱。
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(234,179,8,0.05)", borderColor: "rgba(234,179,8,0.3)" }}
            >
              <p className="text-xs font-bold text-yellow-300 mb-3 uppercase tracking-wide">
                オブジェクト型 — ヒープ
              </p>
              <p className="text-xs text-gray-500 mb-2">object / array / function</p>
              <div className="space-y-2">
                <div
                  className="rounded border px-3 py-2 text-xs font-mono"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <span className="text-gray-400">a </span>
                  <span className="text-gray-600">= </span>
                  <span className="text-yellow-300">0xA1</span>
                  <span className="text-gray-600 ml-2">← アドレス（住所）</span>
                </div>
                <div
                  className="rounded border px-3 py-2 text-xs font-mono"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <span className="text-gray-400">b </span>
                  <span className="text-gray-600">= </span>
                  <span className="text-yellow-300">0xA1</span>
                  <span className="text-gray-600 ml-2">← 同じアドレス！</span>
                </div>
                <div
                  className="rounded border px-3 py-2 text-xs"
                  style={{ backgroundColor: "rgba(234,179,8,0.08)", borderColor: "rgba(234,179,8,0.25)" }}
                >
                  <p className="text-xs text-gray-400">ヒープ上のデータ</p>
                  <p className="font-mono text-xs text-yellow-200 mt-0.5">{"{ x: 1 }"}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.3)" }}
          >
            <p className="text-xs font-semibold text-red-300 mb-2">参照コピーの罠</p>
            <div
              className="rounded border p-3 font-mono text-xs leading-relaxed"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p>
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> a </span>
                <span className="text-gray-500">= </span>
                <span className="text-gray-300">{"{ x: "}</span>
                <span className="text-orange-300">1</span>
                <span className="text-gray-300">{" };"}</span>
              </p>
              <p>
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> b </span>
                <span className="text-gray-500">= </span>
                <span className="text-gray-300">a;</span>
                <span className="text-gray-600 ml-2">{"// 参照のコピー"}</span>
              </p>
              <p>
                <span className="text-gray-300">b.x </span>
                <span className="text-gray-500">= </span>
                <span className="text-orange-300">2</span>
                <span className="text-gray-300">;</span>
              </p>
              <p className="mt-1">
                <span className="text-gray-500">{"// a.x は？ → "}</span>
                <span className="text-red-300">2</span>
                <span className="text-gray-500">{"  ← a も変わってしまう！"}</span>
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            オブジェクトを別変数に入れても「同じ箱の住所を書き写しただけ」。スプレッド構文などでコピーが必要。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説（応用編内 — 順序変更） ──────────────── */}
      <DetailSection title="詳細解説">
        {/* 6.1 実践ルール（最も実用的なので先頭へ） */}
        <DetailBlock heading="6.1 実践的な変数宣言のルール">
          <p>
            <strong className="text-white">原則：const ファースト</strong>。すべての変数宣言は const から始める。
          </p>
          <p>
            <strong className="text-white">例外：let に変える</strong>のは、ループのカウンタ・フラグ・段階的に組み立てる値など、明らかに値を更新する箱だけ。
          </p>
          <p>
            <strong className="text-white">禁止：var は新規コードに書かない</strong>。読むときに出てきたら「古いコードだな」とだけ思えばOK。
          </p>
          <Timeline items={[
            {
              year: "〜ES5",
              label: "var の時代",
              description: "var しか存在しない。関数スコープのみで、再宣言し放題。規模が大きくなると変数の衝突やホイスト起因のバグが頻発した。",
              accentColor: "rose",
            },
            {
              year: "ES6（2015）",
              label: "let / const の登場",
              description: "ブロックスコープの let と const が追加。再宣言禁止・TDZ導入により、変数まわりの事故が大幅に減少。const ファーストの文化が始まる。",
              accentColor: "blue",
            },
            {
              year: "現在",
              label: "const ファーストが標準",
              description: "ESLint / TypeScript などのツールチェーンが const 推奨・var 禁止を自動でチェック。「ルールを手で守る」から「ツールに守らせる」へ。",
              accentColor: "emerald",
            },
          ]} />
          <UseCaseGrid cols={3} items={[
            {
              Icon: Ban,
              title: "var",
              subtitle: "レガシーコードのみ",
              description: "新規コードでは使わない。読むときに出てきたら「古い書き方」とだけ認識する。",
              accentColor: "red",
            },
            {
              Icon: RefreshCw,
              title: "let",
              subtitle: "値が変わるときだけ",
              description: "カウンタ・フラグ・段階的に組み立てる値。再代入が必要な箱にのみ使う。",
              accentColor: "blue",
            },
            {
              Icon: CheckCheck,
              title: "const",
              subtitle: "迷ったらこれ（第一選択）",
              description: "まず const で宣言。再代入が必要になった時点で let に書き換える。",
              accentColor: "yellow",
            },
          ]} />
          <KeyPoint>
            「const から書き始めて、再代入したくなったら let に書き換える」だけで、変数まわりの事故の8割は防げる。エディタが自動でエラーを教えてくれるルールとして運用しよう。
          </KeyPoint>
        </DetailBlock>

        {/* 6.2 const とオブジェクト・配列 */}
        <DetailBlock heading="6.2 const とオブジェクト・配列">
          <p>
            const は「変数の参照」を固定するだけで、参照先のオブジェクトや配列の{" "}
            <strong className="text-white">中身までは固定しない</strong>。
          </p>
          <p>
            つまり{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>const arr = [1, 2, 3]</code>{" "}
            に対して{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>arr.push(4)</code>{" "}
            や{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>arr[0] = 99</code>{" "}
            は普通に通る。禁止されるのは{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>arr = [9]</code>{" "}
            のような「別の配列への再代入」だけ。
          </p>
          <CodeBlock
            title="const-mutation.js"
            language="javascript"
            code={`const arr = [1, 2, 3];

// ✅ 中身の変更は OK
arr.push(4);      // → [1, 2, 3, 4]
arr[0] = 99;      // → [99, 2, 3, 4]

// ✅ オブジェクトのプロパティ変更も OK
const user = { name: "マジ" };
user.name = "マスター"; // → { name: "マスター" }

// ❌ 再代入はエラー
arr = [9];         // TypeError: Assignment to constant variable.
user = { name: "新しい人" }; // TypeError: Assignment to constant variable.`}
          />
          <CorrectionCard
            misconception="const にすれば配列やオブジェクトの中身も書き換わらない（安全）"
            correction="const が固定するのは『変数がどのオブジェクトを指すか』だけ。中身のプロパティや要素は普通に変更できる"
            reason="中身まで凍らせたい場合は Object.freeze() を使う。ただし深いネストには効かないため、不変性が重要な場面では構造的コピーの設計が必要になる。"
          />
          <WarningPoint>
            「const にしておけば中身も安全」と思い込むと、配列やオブジェクトを別の場所から書き換えられて気づかないバグを生む。中身まで固定したいときは Object.freeze を使うか、書き換えない設計にする。
          </WarningPoint>
        </DetailBlock>

        {/* 6.3 ホイスティングと TDZ */}
        <DetailBlock heading="6.3 ホイスティングと TDZ（一時的デッドゾーン）">
          <p>
            JavaScriptは実行前にコード全体をざっと見て、「あ、ここで変数 x が宣言されているな」と把握する。これを{" "}
            <strong className="text-white">ホイスティング（巻き上げ）</strong>という。宣言だけがコードの先頭に「巻き上げられる」イメージ。
          </p>
          <p>
            ただし var と let / const では巻き上げ後の振る舞いが違う。var は巻き上げと同時に{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>undefined</code>{" "}
            で初期化されるので、宣言より前に参照しても値（undefined）が返る。これは便利に見えて、実際は「初期化忘れに気づきにくい」というバグの温床になる。
          </p>
          <p>
            一方 let / const は巻き上げられるものの、宣言の行に達するまでは{" "}
            <strong className="text-yellow-300">TDZ（Temporal Dead Zone）</strong>と呼ばれる「触れない期間」に入る。この間に参照しようとすると{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fca5a5" }}>ReferenceError</code>{" "}
            になる。つまり「準備ができていないものを使おうとした」ことが、その場で明確にエラーとして分かる。
          </p>
          <CodeBlock
            title="hoisting.js"
            language="javascript"
            code={`// ── var のホイスティング ──
console.log(name); // → undefined（エラーにならない！）
var name = "マジ";
console.log(name); // → "マジ"

// ── let のホイスティング（TDZ）──
console.log(age);  // → ReferenceError: Cannot access 'age' before initialization
let age = 20;
console.log(age);  // → 20

// ── なぜ var は危ないか ──
// 宣言前に undefined が返っても気づきにくく、バグの原因になる`}
          />
          <KeyPoint>
            「let / const は巻き上げがない」という説明を見ることがあるが正確ではない。どちらもホイスティングはされる。ただし宣言行まではTDZ（触れない状態）に入るためエラーになる。「巻き上げがない」ではなく「巻き上げられたが、まだ使えない」が正確な表現。
          </KeyPoint>
        </DetailBlock>

        {/* 6.4 クロージャとスコープ */}
        <DetailBlock heading="6.4 クロージャとスコープ">
          <p>
            JavaScriptには{" "}
            <strong className="text-white">クロージャ</strong>という仕組みがある。これは「内側の関数が、外側の関数で宣言された変数を覚えていて、後から呼び出されても参照できる」という性質のこと。
          </p>
          <p>
            内側から外側のスコープが見えるという「スコープのルール」がそのまま使われている。たとえば{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>function makeCounter()</code>{" "}
            の中で{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>let count = 0</code>{" "}
            を宣言し、その内側で{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fde047" }}>count++</code>{" "}
            するアロー関数を返すと、外側に出た後も count を覚え続ける。これが状態を持つ関数の正体で、Reactの useState の中でも似た仕組みが動いている。
          </p>
          <CodeBlock
            title="closure.js"
            language="javascript"
            code={`function makeCounter() {
  let count = 0; // ← この count を内側の関数が「覚えている」

  return function increment() {
    count++;       // 外側スコープの count にアクセスできる
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // → 1
console.log(counter()); // → 2
console.log(counter()); // → 3
// makeCounter の実行は終わっているが、count は生き続けている`}
          />
          <KeyPoint>
            クロージャは「スコープのネスト構造」を理解していれば自然に納得できる。逆に言えば、スコープを曖昧にしたままクロージャを学ぼうとすると必ず詰まる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/async",
            title: "非同期処理",
            description: "Promise / async・await の世界",
            icon: "Code2",
          },
          {
            href: "/javascript/modules",
            title: "ESモジュール",
            description: "import / export でファイルを跨ぐ",
            icon: "Rocket",
          },
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "JSが動く「もう一方の世界」を知る",
            icon: "Server",
          },
        ]}
      />

      <PageDrill questions={variablesQuestions} />
    </div>
  );
}
