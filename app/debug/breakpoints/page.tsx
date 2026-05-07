import {
  PauseCircle,
  PlayCircle,
  SkipForward,
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  Code2,
  ListTree,
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
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { breakpointsQuestions } from "@/content/questions/debug/breakpoints";

export const metadata = {
  title: "ブレークポイント | Web開発図解",
  description:
    "DevToolsのSourcesタブでブレークポイントを設置し、コードをステップ実行するデバッグ手法を図解で解説する。",
};

export default function BreakpointsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/debug" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← デバッグ・エラー対処に戻る
        </Link>
      </div>

      <Hero
        category="デバッグ・エラー対処"
        title="ブレークポイント"
        subtitle={"コードに「一時停止ボタン」を仕込む——ステップ実行デバッグの入門"}
        body={"console.logを大量に仕込む方法を卒業し、Sourcesタブで止めて・確認して・進める技術を習得する。"}
        accentColor="red"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "ブレークポイントの設置・解除方法",
          "コードが止まった状態での変数値の確認方法",
          "ステップ実行（Step Over・Step Into）の使い方",
        ]}
        prerequisites={[
          "DevToolsのConsoleタブを使ったことがある",
          "JavaScriptの関数・if文・for文を読める",
          "console.log()でデバッグしたことがある",
        ]}
        outOfScope={[
          "条件付きブレークポイント（応用編で扱う）",
          "例外ブレークポイント（Pause on exceptions）",
          "Watchパネルでの変数監視",
        ]}
      />

      <OnePageSummary
        keyMessage="ブレークポイントはコードの「一時停止ボタン」。Sourcesタブで行番号をクリックして青い丸を付けるだけで、プログラムがその行の直前で止まる。止まった瞬間の変数の値が全て確認でき、1行ずつ進めながら「どこでおかしくなったか」を目で追える。"
        metaphorTitle="動画のコマ送り再生"
        metaphorPoints={[
          {
            label: "ブレークポイント",
            real: "動画の特定の場面に「ここで一時停止」というしおりを挟む。再生するとそこで止まる",
            metaphor: "一時停止のしおり",
          },
          {
            label: "Step Over",
            real: "一時停止した動画を0.1秒だけ進めて、また止める。「コマ送り」の1コマ分",
            metaphor: "コマ送り",
          },
          {
            label: "Scopeパネル",
            real: "一時停止した瞬間のダッシュボード。その時点で存在する全ての変数とその値が一覧で見える",
            metaphor: "その瞬間のスナップショット",
          },
          {
            label: "console.logとの違い",
            real: "console.logはあとで読む「メモ」。ブレークポイントはリアルタイムで全情報が見える「生中継」",
            metaphor: "メモ vs 生中継",
          },
        ]}
        definition="ブレークポイントとは、指定した行でプログラムを一時停止させる目印。停止中は変数の値・コールスタック・スコープ内のデータを確認でき、1行ずつ進めることができる。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずブレークポイントの設置から確認までの流れを把握し、次にステップ実行の種類を覚えましょう。
        </p>

        {/* ── 概念図A: ブレークポイントの設置〜確認フロー ── */}
        <ConceptDiagram
          title="概念図A"
          description="ブレークポイントを設置してコードを止めるまでの流れ"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Code2}
              title="Sourcesタブを開く"
              subtitle="DevToolsの上部タブから選択"
            />
            <FlowArrow label="ファイルを選ぶ" direction="right" />
            <FlowCard
              Icon={PauseCircle}
              title="行番号をクリック"
              subtitle="青い丸が付く"
              highlight
              accentColor="red"
            />
            <FlowArrow label="コードを実行" direction="right" />
            <FlowCard
              Icon={Eye}
              title="その行で停止"
              subtitle="Scopeパネルに変数一覧"
            />
          </div>

          {/* Sourcesタブのミニ図 */}
          <div
            className="mt-5 rounded-xl border overflow-hidden"
            style={{ borderColor: "#2d3048" }}
          >
            <div
              className="px-4 py-2 text-xs text-gray-500 border-b flex items-center gap-2"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>UserProfile.jsx — Sourcesタブ</span>
            </div>
            <div
              className="font-mono text-xs leading-loose"
              style={{ backgroundColor: "#0f1117" }}
            >
              {[
                { line: "10", code: "function UserProfile({ userId }) {", bp: false, stopped: false },
                { line: "11", code: "  const user = fetchUser(userId);", bp: false, stopped: false },
                { line: "12", code: "  const name = user.name;", bp: true, stopped: true },
                { line: "13", code: "  return <div>{name}</div>;", bp: false, stopped: false },
                { line: "14", code: "}", bp: false, stopped: false },
              ].map((row) => (
                <div
                  key={row.line}
                  className="flex items-center"
                  style={{
                    backgroundColor: row.stopped ? "rgba(239,68,68,0.1)" : "transparent",
                    borderLeft: row.stopped ? "2px solid #f87171" : "2px solid transparent",
                  }}
                >
                  <div
                    className="w-8 flex items-center justify-center text-gray-600 select-none flex-shrink-0 relative"
                    style={{ backgroundColor: "#0f1117" }}
                  >
                    {row.bp && (
                      <span
                        className="absolute w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#f87171" }}
                      />
                    )}
                    <span className="relative z-10" style={{ color: row.bp ? "transparent" : undefined }}>
                      {row.line}
                    </span>
                  </div>
                  <span
                    className="px-4"
                    style={{ color: row.stopped ? "#fca5a5" : "#9ca3af" }}
                  >
                    {row.code}
                  </span>
                  {row.stopped && (
                    <span className="ml-auto mr-3 text-xs text-red-400">← 停止中</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            行番号の部分をクリックすると赤い丸（ブレークポイント）が付く。コードを実行するとその行で停止する。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          コードを止めることができました。次は「止まった後にどう進めるか（ステップ実行）」を確認しましょう。
        </p>

        {/* ── 概念図B: ステップ実行の種類 ── */}
        <ConceptDiagram
          title="概念図B"
          description="ステップ実行の4種類——止まった後にどう動かすかを選べる"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.35)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <SkipForward className="w-4 h-4 text-red-400" />
                <p className="text-sm font-bold text-red-300">Step Over</p>
                <span className="ml-auto text-xs text-gray-500 font-mono">F10</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                今の行を実行して次の行で止まる。その行に関数呼び出しがあっても、中には入らずにまとめて実行する。
              </p>
              <p className="text-xs text-gray-500 mt-2">使いどころ: 関数の中身に興味がないとき</p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownRight className="w-4 h-4 text-gray-300" />
                <p className="text-sm font-bold text-gray-300">Step Into</p>
                <span className="ml-auto text-xs text-gray-500 font-mono">F11</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                今の行が関数呼び出しなら、その関数の中に入って1行目で止まる。関数の中の動きを追いたいときに使う。
              </p>
              <p className="text-xs text-gray-500 mt-2">使いどころ: 関数の中で何が起きているか調べたいとき</p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="w-4 h-4 text-gray-300" />
                <p className="text-sm font-bold text-gray-300">Step Out</p>
                <span className="ml-auto text-xs text-gray-500 font-mono">Shift+F11</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                今いる関数から抜け出して、呼び出し元に戻って止まる。関数の中に入りすぎたとき脱出するのに使う。
              </p>
              <p className="text-xs text-gray-500 mt-2">使いどころ: 深く入りすぎたとき</p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <PlayCircle className="w-4 h-4 text-gray-300" />
                <p className="text-sm font-bold text-gray-300">Resume</p>
                <span className="ml-auto text-xs text-gray-500 font-mono">F8</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                次のブレークポイントまで実行を再開する。ブレークポイントがなければ最後まで実行して停止を解除する。
              </p>
              <p className="text-xs text-gray-500 mt-2">使いどころ: 確認が終わって続きを動かしたいとき</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            最初は「Step Over（F10）」だけ覚えれば十分。1行ずつ進めながら変数の値が変わる様子を観察できる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ──────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "standard",
            text: "デバッグするとき、ボクはいつもconsole.logをあちこちに仕込んでいるんですが……これって非効率ですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "console.logは手軽で良いのですが、たくさん仕込むと後で削除が大変です。\nブレークポイントを使うと、コードを一行も変えずに同じことができます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "コードを変えなくてもデバッグできるんですか！？ それはすごいですね……",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "Sourcesタブで止めたい行の番号をクリックするだけです。\n青い丸が付いた状態でコードを動かすと、その行でプログラムが止まります。\n止まった瞬間に画面の右側で、その時点の変数の値が全部見えます。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "でも止まったあとはどうするんですか？ ずっと止まったままでは……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "ステップ実行というボタンがあります。F10を押すと1行だけ進んで、また止まります。\nF11を押すと関数の中に入ります。\nこれで『この行でxの値は何になるか』を1行ずつ確認できるんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nconsole.logをたくさん書いて全部コメントアウトして……という苦労がなくなるんですか！",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そうです。慣れると『この変数がおかしい』と気づいた瞬間にブレークポイントを設置して10秒で原因特定、という流れになります。\n最初は少し難しく感じますが、1回使えば手放せなくなりますよ、マジさん。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["console.log方式", "ブレークポイント方式"]}
          rows={[
            {
              label: "コード変更の必要性",
              cells: ["必要（console.logを追加）", "不要（DevToolsだけで完結）"],
              highlightCol: 1,
            },
            {
              label: "確認できる情報",
              cells: ["書いた変数の値のみ", "停止時点の全変数・コールスタック"],
              highlightCol: 1,
            },
            {
              label: "後片付け",
              cells: ["console.logを全部削除する必要あり", "ブレークポイントを外すだけ"],
              highlightCol: 1,
            },
            {
              label: "適した状況",
              cells: ["値の変化を記録したい・ログを残したい", "止めてじっくり状態を調べたい"],
              highlightCol: 1,
            },
          ]}
          note="console.logを否定するわけではない。ブレークポイントと組み合わせて使うのが実践的なデバッグスタイル。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は条件付きブレークポイントや例外ブレークポイントなど、より高度な使い方です。まず基本のブレークポイントを使いこなしてから読んでください。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 条件付きブレークポイントと例外ブレークポイント
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          基本のブレークポイントは「その行に来るたびに止まる」ですが、条件を付けることで「特定の条件のときだけ止まる」ようにできます。
          ループ処理のデバッグに特に役立ちます。
        </p>

        <TermNote
          terms={[
            {
              word: "コールスタック",
              definition:
                "現在どの関数からどの関数が呼ばれているかの連鎖。ブレークポイントで停止したとき、右パネルの「Call Stack」に表示される。クリックすると各関数のスコープを切り替えて確認できる。",
            },
            {
              word: "スコープパネル",
              definition:
                "停止時点で存在するすべての変数の一覧。Local（その関数内）・Closure・Globalに分けて表示される。変数がどんな値を持っているかが一目で分かる。",
            },
            {
              word: "条件付きブレークポイント",
              definition:
                "特定の条件（例: i === 100）が真のときだけ停止するブレークポイント。行番号を右クリックして「Add conditional breakpoint」から設定できる。",
            },
          ]}
        />
      </section>

      {/* ── 詳細解説 ───────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="ブレークポイントの設置から確認まで（実践手順）">
          <p>
            実際の手順を整理します。慣れるまでは、以下の順序で操作してみてください。
          </p>
          <Timeline
            items={[
              {
                year: "Step 1",
                label: "Sourcesタブを開く",
                description: "F12でDevToolsを開き、上部のタブからSourcesを選ぶ。左のファイルツリーから対象のJSファイルを選択する。",
                accentColor: "rose",
              },
              {
                year: "Step 2",
                label: "行番号をクリックしてブレークポイントを設置",
                description: "止めたい行の行番号をクリックする。青い丸（ブレークポイント）が表示されたら設置成功。",
                accentColor: "rose",
              },
              {
                year: "Step 3",
                label: "コードを実行する",
                description: "ページをリロードするか、該当のボタンをクリックするなどしてコードを動かす。ブレークポイントの行に達すると自動で停止する。",
                accentColor: "rose",
              },
              {
                year: "Step 4",
                label: "Scopeパネルで変数の値を確認",
                description: "右パネルのScopeセクションに、現時点で存在するすべての変数とその値が表示される。undefinedになっている変数がないか確認する。",
                accentColor: "rose",
              },
              {
                year: "Step 5",
                label: "F10でStep Overして1行ずつ進める",
                description: "F10を押すたびに1行進む。変数の値がどう変化するかをScopeパネルで追いながら、「どこでおかしくなったか」を特定する。",
                accentColor: "rose",
              },
            ]}
          />
          <CorrectionCard
            misconception="ブレークポイントを設置したら、コードを書かなくても自動でデバッグが進む"
            correction="ブレークポイントで止めた後は、自分でステップ実行して変数の値を確認する必要がある"
            reason="ブレークポイントは「ここで止まれ」という指示を出すだけ。止まった後の調査は人間が行う。何を確認したいかを事前に考えてから設置すると効率が上がる。"
          />
          <KeyPoint>
            ブレークポイントはコードを変えずに何度でも設置・解除できる。「ここで止めて確認したい」と思ったらすぐに行番号をクリックする習慣をつけると、デバッグの体感速度が劇的に上がる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="条件付きブレークポイント">
          <p>
            100回ループするfor文の中で、97回目にだけおかしくなる——そんなとき、毎回F10でStep Overするのは現実的ではありません。
            条件付きブレークポイントを使えば「i === 97のときだけ止まる」が実現できます。
          </p>
          <CodeBlock
            title="条件付きブレークポイントの設定方法"
            language="bash"
            code={`# 行番号を右クリック → 「Add conditional breakpoint」を選ぶ
# 条件式を入力するテキストボックスが表示される

# 例: ループの i が97のときだけ止まる
i === 97

# 例: 変数 user が undefined のときだけ止まる
typeof user === "undefined"

# 例: 配列の長さが0のときだけ止まる
items.length === 0

# 条件を満たしたときだけ停止するので、無関係の実行は素通りする`}
          />
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: ListTree,
                title: "Scopeパネルの活用",
                subtitle: "全変数が一覧で見える",
                description: "Local・Closure・Globalの3段階でスコープ内の変数が全て表示される。undefinedの変数・意図しない値をすぐに発見できる。",
                accentColor: "red",
              },
              {
                Icon: GitBranch,
                title: "コールスタックの確認",
                subtitle: "どこから呼ばれたかを追う",
                description: "Call Stackパネルで「この関数がどこから呼ばれたか」を遡れる。予期しない経路でコードが実行されていないかを確認できる。",
                accentColor: "red",
              },
            ]}
          />
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/debug/error-messages",
            title: "エラーメッセージの読み方",
            description: "エラーの行番号を見つけてブレークポイントを設置する準備",
            icon: "FileWarning",
          },
          {
            href: "/debug/minimal-repro",
            title: "最小再現コードの作り方",
            description: "ブレークポイントで原因が分かったあと、問題を切り分けて質問する",
            icon: "Scissors",
          },
          {
            href: "/debug/devtools",
            title: "DevTools 基本",
            description: "Sourcesタブを含む4大タブの全体像を確認する",
            icon: "MonitorDot",
          },
        ]}
      />

      <PageDrill questions={breakpointsQuestions} />
    </div>
  );
}
