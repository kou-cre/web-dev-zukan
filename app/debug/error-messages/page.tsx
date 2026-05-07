import {
  FileWarning,
  AlertTriangle,
  Bug,
  FileCode2,
  ListOrdered,
  CheckCircle2,
  XCircle,
  ArrowDown,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CorrectionCard } from "@/components/CorrectionCard";
import { CodeBlock } from "@/components/CodeBlock";
import { errorMessagesQuestions } from "@/content/questions/debug/error-messages";

export const metadata = {
  title: "エラーメッセージの読み方 | Web開発図解",
  description:
    "スタックトレースから原因ファイル・行番号を特定する方法を図解で解説。TypeError・ReferenceError・SyntaxErrorの見分け方も習得する。",
};

export default function ErrorMessagesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/debug" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← デバッグ・エラー対処に戻る
        </Link>
      </div>

      <Hero
        category="デバッグ・エラー対処"
        title="エラーメッセージの読み方"
        subtitle={"赤いエラーは「地図」——どこで何が壊れたかを読み解く技術"}
        body={"スタックトレースを読んで、原因ファイルと行番号を1分で特定できるようになる。"}
        accentColor="red"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "エラーメッセージの2段構造（種類 + スタックトレース）",
          "よくある3種のエラー（TypeError・ReferenceError・SyntaxError）",
          "スタックトレースのクリックで該当行に飛ぶ方法",
        ]}
        prerequisites={[
          "DevToolsのConsoleタブを開ける（DevTools基本を読んだ）",
          "JavaScriptを少し書いたことがある",
          "ファイル名とパス（/src/components/App.jsx など）を知っている",
        ]}
        outOfScope={[
          "Promiseの未処理エラー（UnhandledRejection）",
          "カスタムエラークラスの作り方",
          "Reactのエラーバウンダリ（別のページで扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="エラーメッセージは「エラーの種類：何が起きたか」＋「スタックトレース：どこで起きたか」の2段構成。一番上の行に「何が壊れたか」、その下の行群に「どの関数がどのファイルの何行目で呼ばれたか」が書いてある。"
        metaphorTitle="郵便の不達通知"
        metaphorPoints={[
          {
            label: "エラーの種類",
            real: "「宛先が存在しません」という不達の理由。TypeError・ReferenceError・SyntaxErrorなど種類が違う",
            metaphor: "不達の理由",
          },
          {
            label: "エラー本文",
            real: "「undefinedの.nameは読めません」という具体的な問題の説明",
            metaphor: "問題の説明",
          },
          {
            label: "スタックトレース",
            real: "「配達経路：A局→B局→配達員」という経路の記録。どの関数からどの関数へ呼ばれたかの地図",
            metaphor: "配達経路",
          },
          {
            label: "一番上の行",
            real: "最後に呼ばれた関数＝エラーの現場。ここをクリックすると該当行に飛べる",
            metaphor: "現場住所",
          },
        ]}
        definition="スタックトレースとは、エラーが起きるまでに呼ばれた関数の積み重ね（スタック）の記録。「最後に呼ばれた関数」が一番上に書かれる。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「エラーメッセージが何を伝えているか」の構造を解剖し、次によくある3種のエラーを区別できるようにしましょう。
        </p>

        {/* ── 概念図A: エラーメッセージの解剖 ── */}
        <ConceptDiagram
          title="概念図A"
          description="エラーメッセージの2段構造——上が「何が起きたか」、下が「どこで起きたか」の地図"
        >
          <div
            className="rounded-xl border p-5 font-mono text-sm leading-loose overflow-x-auto"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            {/* エラーの種類と本文 */}
            <div
              className="rounded-lg border px-4 py-2 mb-3"
              style={{ backgroundColor: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.4)" }}
            >
              <div className="flex flex-wrap items-start gap-2">
                <span className="text-red-400 font-bold">TypeError:</span>
                <span className="text-red-300">Cannot read properties of undefined</span>
                <span className="text-gray-400">(reading &apos;name&apos;)</span>
              </div>
            </div>

            {/* 注釈: エラーの種類 */}
            <div className="flex items-start gap-3 mb-3 pl-2">
              <div className="w-1 flex-shrink-0 self-stretch" style={{ backgroundColor: "rgba(239,68,68,0.5)" }} />
              <div>
                <p className="text-xs text-red-300 font-semibold mb-0.5">エラーの種類</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  TypeError = 「このデータ型にはその操作はできない」というエラー。undefined の .name を読もうとした。
                </p>
              </div>
            </div>

            {/* スタックトレース */}
            <div
              className="rounded-lg border px-4 py-3 mb-3"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-500 text-xs">at</span>
                  <span className="text-yellow-300">UserProfile</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-blue-300">UserProfile.jsx:12:18</span>
                  <span className="text-gray-400">)</span>
                  <span
                    className="ml-1 text-xs px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#f87171" }}
                  >
                    エラーの現場
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-500 text-xs">at</span>
                  <span className="text-gray-400">App</span>
                  <span className="text-gray-500">(App.jsx:5:5)</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-500 text-xs">at</span>
                  <span className="text-gray-600">renderRoot</span>
                  <span className="text-gray-700">(react-dom.development.js:11556)</span>
                </div>
              </div>
            </div>

            {/* 注釈: スタックトレース */}
            <div className="flex items-start gap-3 pl-2">
              <div className="w-1 flex-shrink-0 self-stretch" style={{ backgroundColor: "rgba(59,130,246,0.5)" }} />
              <div>
                <p className="text-xs text-blue-300 font-semibold mb-0.5">スタックトレース（読み方）</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  一番上の行が「エラーの現場」。UserProfile.jsx の 12行目18列目でエラーが起きた。
                  その下のApp.jsxはUserProfileを呼び出した「親」。
                  クリックするとソースコードのその行に飛べる。
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            スタックトレースは「一番上＝エラーの現場」「下に行くほど呼び出し元」の順。自分が書いたファイル名の行を探す。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          エラーメッセージの構造が分かりました。次は「エラーの種類（TypeError / ReferenceError / SyntaxError）」を区別できるようにしましょう。
        </p>

        {/* ── 概念図B: よくある3種のエラー ── */}
        <ConceptDiagram
          title="概念図B"
          description="よく出る3種のエラー——種類を見ればどこを調べればいいかが分かる"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* TypeError */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.35)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-400" />
                <p className="text-sm font-bold text-red-300">TypeError</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                「このデータ型にはその操作はできません」
              </p>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>▸ undefinedのプロパティを読もうとした</li>
                <li>▸ nullを関数として呼んだ</li>
                <li>▸ 数値を関数として呼んだ</li>
              </ul>
              <div
                className="mt-3 rounded px-2 py-1.5 text-xs font-mono"
                style={{ backgroundColor: "#0f1117", color: "#fca5a5" }}
              >
                Cannot read properties of undefined
              </div>
            </div>

            {/* ReferenceError */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <p className="text-sm font-bold text-amber-300">ReferenceError</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                「その名前の変数は知りません」
              </p>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>▸ 未宣言の変数を使った</li>
                <li>▸ スコープ外の変数にアクセス</li>
                <li>▸ let/constのTDZ期間に触れた</li>
              </ul>
              <div
                className="mt-3 rounded px-2 py-1.5 text-xs font-mono"
                style={{ backgroundColor: "#1a1d2a", color: "#fcd34d" }}
              >
                userName is not defined
              </div>
            </div>

            {/* SyntaxError */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Bug className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-bold text-gray-300">SyntaxError</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                「コードの文法が間違っています」
              </p>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>▸ カッコの対応が取れていない</li>
                <li>▸ セミコロン・カンマのタイポ</li>
                <li>▸ テンプレートリテラルの閉じ忘れ</li>
              </ul>
              <div
                className="mt-3 rounded px-2 py-1.5 text-xs font-mono"
                style={{ backgroundColor: "#1a1d2a", color: "#d1d5db" }}
              >
                Unexpected token {"}"}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            エラーの種類を見るだけで「何を調べるべきか」が絞り込める。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ──────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "マスター、Consoleに赤いエラーが出てもボク、何が書いてあるか全然分からなくて……。\n英語だし長いし、もう閉じてしまっていて……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "よくあることです、マジさん。実は構造さえ分かれば怖くありません。\nエラーは2段構成で、一行目が『何が壊れたか』、その下が『どこで壊れたか』の地図です。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "一番よく出るTypeErrorを例にしましょう。\n『Cannot read properties of undefined (reading 「name」)』は日本語に直すと『undefinedの.nameは読めません』です。\nつまりnameプロパティを持つはずのデータがまだ来ていない、ということです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nそんなシンプルな意味だったんですか！ ボクずっと謎の呪文だと思っていました……！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "次はスタックトレースです。エラーの下に『at UserProfile（UserProfile.jsx:12:18）』のような行が続きますよね。\nこれは『UserProfile.jsxの12行目でエラーが起きた』という住所です。\nその住所の部分をクリックするとソースコードの該当行に飛べます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "クリックできるんですか！ それは知りませんでした。\nじゃあ探し回る必要はないんですね……",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "でも、スタックトレースって何行もあって、どれをクリックすればいいか迷いませんか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "一番上の行が基本です。そこから下に向かって、自分が書いたファイル名が出てくる行を探してください。\nreact-domやnode_modulesのような外部ライブラリの行は飛ばして構いません。\n自分のコードのファイル名（App.jsx、UserProfile.tsxなど）が出てくる一番上の行がエラーの現場です。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["TypeError", "ReferenceError", "SyntaxError"]}
          rows={[
            {
              label: "一言で言うと",
              cells: ["型・操作の不一致", "変数が存在しない", "文法の間違い"],
              highlightCol: 0,
            },
            {
              label: "典型的なメッセージ",
              cells: [
                "Cannot read properties of undefined",
                "xxx is not defined",
                "Unexpected token",
              ],
              highlightCol: 0,
            },
            {
              label: "よくある原因",
              cells: [
                "APIデータが届く前にプロパティを参照",
                "変数名のタイポ・スコープ外アクセス",
                "括弧閉じ忘れ・全角文字混入",
              ],
              highlightCol: 0,
            },
            {
              label: "最初に確認する場所",
              cells: [
                "スタックトレースの一番上の自分のファイル",
                "該当の変数名の宣言箇所",
                "エディタの構文エラー（赤い下波線）",
              ],
              highlightCol: 0,
            },
          ]}
          note="SyntaxErrorは実行前にエディタ（VSCode）が赤い下波線で教えてくれることが多い。TypeErrorはランタイム（実行時）に起きるため、DevToolsのConsoleで見つける。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はPromiseの未処理エラーやカスタムエラーなど、より発展的な内容です。まず基本の3種のエラーを読めるようになってから読んでください。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 非同期エラーとエラーの伝わり方
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          非同期処理（fetch / async await）では、エラーの伝わり方が同期コードと異なります。
          「なぜConsoleに出ないのか」を理解してから対処しましょう。
        </p>

        <TermNote
          terms={[
            {
              word: "コールスタック",
              definition:
                "プログラムが「今どの関数の中にいるか」を管理するリスト。関数が呼ばれるたびに積み重なり（push）、終わると取り除かれる（pop）。スタックトレースはこの記録。",
            },
            {
              word: "UnhandledRejection",
              definition:
                "Promise が reject されたが、それを catch() や try/catch で受け取っていない場合に出るエラー。ConsoleにWarningとして表示される。",
            },
            {
              word: "エラーバウンダリ",
              definition:
                "Reactで子コンポーネントのエラーをキャッチして、アプリ全体がクラッシュするのを防ぐ仕組み。クラスコンポーネントまたはreact-error-boundaryライブラリで実装する。",
            },
          ]}
        />
      </section>

      {/* ── 詳細解説 ───────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="スタックトレースを読む実践手順">
          <p>
            エラーが出たとき、スタックトレースをどう読めばいいか——実際の操作手順を整理します。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: ListOrdered,
                title: "1. エラーの種類を確認",
                subtitle: "TypeError / ReferenceError / SyntaxError",
                description: "一番上の行の「:」より前がエラーの種類。種類によって「何を調べるか」が変わる。",
                accentColor: "red",
              },
              {
                Icon: FileCode2,
                title: "2. スタックトレースを読む",
                subtitle: "自分のファイル名を探す",
                description: "react-domなど外部ライブラリの行を飛ばして、自分が書いたファイル（App.jsx等）の行を探す。",
                accentColor: "red",
              },
              {
                Icon: ArrowDown,
                title: "3. ファイル名:行番号をクリック",
                subtitle: "Sourcesタブの該当行に飛ぶ",
                description: "クリックするとDevToolsのSourcesタブが開き、エラーが起きた行がハイライトされる。",
                accentColor: "red",
              },
              {
                Icon: CheckCircle2,
                title: "4. 問題の変数・関数を特定",
                subtitle: "undefinedになっている変数を探す",
                description: "該当行の前後で変数の値を console.log で確認するか、ブレークポイントを設置して止めて確認する。",
                accentColor: "red",
              },
            ]}
          />
          <KeyPoint>
            スタックトレースは「上が現場・下が呼び出し元」の順。外部ライブラリの行は無視して、自分が書いたファイル名の一番上の行から調査を始める。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="エラーメッセージを翻訳するコツ">
          <p>
            英語のエラーメッセージは、単語の意味を一つずつ解釈すれば読めます。
            よく出るパターンを覚えておくと、読むスピードが格段に上がります。
          </p>
          <CodeBlock
            title="よく出るエラーメッセージ 対訳集"
            language="bash"
            code={`# TypeError
"Cannot read properties of undefined (reading 'name')"
→ undefined の .name は読めない（データがまだ来ていない）

"xxx is not a function"
→ xxx は関数ではない（undefinedや数値を関数として呼んだ）

"Cannot set properties of null (setting 'value')"
→ null に .value を代入できない（null の要素を取得した）

# ReferenceError
"xxx is not defined"
→ xxx という名前の変数は存在しない（宣言していない・タイポ）

"Cannot access 'xxx' before initialization"
→ xxx の宣言行に達する前に使った（TDZ エラー）

# SyntaxError
"Unexpected token 'xxx'"
→ そこには xxx が来てはいけない（括弧の閉じ忘れ・全角文字など）`}
          />
          <CorrectionCard
            misconception="スタックトレースの一番下の行が原因"
            correction="スタックトレースの一番上の行が「エラーの現場」。一番下は「最初の呼び出し元（ルート）」"
            reason="スタックトレースは呼び出された順に積み重なる。一番上が「最後に呼ばれた関数（＝エラーの発生場所）」で、一番下が「最初に呼んだ場所」。上から読み始めるのが正しい。"
          />
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/debug/devtools",
            title: "DevTools 基本",
            description: "Consoleタブでエラーをどこで確認するかを改めて確認する",
            icon: "MonitorDot",
          },
          {
            href: "/debug/breakpoints",
            title: "ブレークポイント",
            description: "エラーの行でコードを止めて変数の値を確認する方法",
            icon: "PauseCircle",
          },
          {
            href: "/debug/minimal-repro",
            title: "最小再現コードの作り方",
            description: "エラーを切り分けてAIに正確に質問する技術",
            icon: "Scissors",
          },
        ]}
      />

      <PageDrill questions={errorMessagesQuestions} />
    </div>
  );
}
