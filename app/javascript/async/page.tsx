import {
  Clock,
  Hourglass,
  Bell,
  CheckCircle2,
  XCircle,
  ListChecks,
  PlayCircle,
  Layers,
  Zap,
} from "lucide-react";

import { Hero } from "@/components/Hero";
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
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { asyncQuestions } from "@/content/questions/javascript/async";

export const metadata = {
  title: "非同期処理 | Web開発図解",
  description:
    "JavaScriptの非同期処理を図解で解説。Promise・async/await・イベントループの仕組みまで一気に掴む。",
};

export default function AsyncPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="非同期処理"
        subtitle={
          "「待つ」ことをコードで表現する技術——PromiseとAsync/Awaitの正体"
        }
        body={
          "シングルスレッドのJavaScriptが、なぜ通信中も固まらずに動けるのか。番号札のたとえで一気に掴む。"
        }
        accentColor="amber"
      />

      <OnePageSummary
        keyMessage="JavaScriptはシングルスレッド（同時に1つのことしかできない）で動くため、時間のかかる処理（通信・ファイル読込など）を「待つ間も他のことを進める」仕組みが必要になる。それが非同期処理。Promiseは「将来の結果を約束するオブジェクト」で、async/awaitはそれを同期的に書けるようにした糖衣構文。"
        metaphorTitle="ファミレスの注文システム"
        metaphorPoints={[
          {
            label: "同期処理",
            real: "料理ができるまでレジで立って待つ（後ろのお客さんは入れない）",
            metaphor: "同期処理",
          },
          {
            label: "非同期処理",
            real: "番号札を受け取って席で待つ（その間に他のことができる）",
            metaphor: "非同期処理",
          },
          {
            label: "Promise",
            real: "番号札そのもの（pending → fulfilled / rejected）",
            metaphor: "Promise",
          },
          {
            label: "async/await",
            real: "番号が呼ばれたら自動で料理を受け取りに行ってくれる係",
            metaphor: "async/await",
          },
        ]}
        definition="非同期処理とは、時間のかかる処理を待つ間も他の処理を進める仕組み。Promiseはその結果（成功か失敗か）を表すオブジェクト。"
      />

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <ConceptDiagram
          title="概念図A — 同期 vs 非同期のフロー比較"
          description="同じ3つのタスクを、同期と非同期で実行したときの違い。"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 同期 */}
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-3 text-center">
                同期処理（直列）
              </p>
              <div className="flex flex-col items-center gap-1">
                <FlowCard Icon={PlayCircle} title="タスク1 開始" subtitle="重い処理" />
                <FlowArrow label="完了まで待つ" direction="down" />
                <FlowCard Icon={PlayCircle} title="タスク2 開始" subtitle="ここまで待たされる" muted />
                <FlowArrow label="完了まで待つ" direction="down" />
                <FlowCard Icon={PlayCircle} title="タスク3 開始" subtitle="さらに待たされる" muted />
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center leading-relaxed">
                合計時間 ＝ 全タスクの所要時間の合計
              </p>
            </div>

            {/* 非同期 */}
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "rgba(245,158,11,0.4)", backgroundColor: "rgba(245,158,11,0.05)" }}
            >
              <p className="text-xs font-semibold text-amber-400 mb-3 text-center">
                非同期処理（並行）
              </p>
              <div className="flex flex-col items-center gap-1">
                <FlowCard Icon={Zap} title="タスク1 開始" subtitle="投げっぱなし" />
                <FlowArrow label="即次へ" direction="down" />
                <FlowCard Icon={Zap} title="タスク2 開始" subtitle="投げっぱなし" />
                <FlowArrow label="即次へ" direction="down" />
                <FlowCard Icon={Zap} title="タスク3 開始" subtitle="投げっぱなし" />
                <FlowArrow label="完了通知" direction="down" />
                <FlowCard Icon={CheckCircle2} title="完了したものから順に処理" subtitle="待ち時間が重なる" />
              </div>
              <p className="text-xs text-amber-300 mt-3 text-center leading-relaxed">
                合計時間 ≒ 一番遅いタスクの時間
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            非同期は「速く処理する」のではなく「待ち時間を重ねて全体を短くする」のがポイント。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図B — Promiseの3つの状態"
          description="Promiseは生成直後は pending（待機中）。やがて fulfilled（成功）か rejected（失敗）のどちらかに解決され、その後は変わらない。"
        >
          <div className="flex flex-col items-center gap-1">
            <FlowCard Icon={Hourglass} title="pending" subtitle="待機中（結果はまだ）" />
            <FlowArrow label="解決される" direction="down" />
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="rounded-xl border px-4 py-3 flex flex-col items-center text-center min-w-[140px]"
                  style={{
                    borderColor: "rgba(16,185,129,0.5)",
                    backgroundColor: "rgba(16,185,129,0.08)",
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 mb-2 text-emerald-400" />
                  <p className="text-xs font-bold mb-0.5 text-emerald-300">fulfilled</p>
                  <p className="text-xs text-gray-500 leading-tight">成功（解決値あり）</p>
                </div>
                <p className="text-xs text-gray-600 mt-1">.then() が走る</p>
              </div>
              <div className="text-xs text-gray-600 px-2">or</div>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="rounded-xl border px-4 py-3 flex flex-col items-center text-center min-w-[140px]"
                  style={{
                    borderColor: "rgba(239,68,68,0.5)",
                    backgroundColor: "rgba(239,68,68,0.08)",
                  }}
                >
                  <XCircle className="w-6 h-6 mb-2 text-red-400" />
                  <p className="text-xs font-bold mb-0.5 text-red-300">rejected</p>
                  <p className="text-xs text-gray-500 leading-tight">失敗（理由あり）</p>
                </div>
                <p className="text-xs text-gray-600 mt-1">.catch() が走る</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            一度解決した状態は二度と変わらない（settled な状態は不変）。番号札が「料理ができた」になった後で「やっぱり品切れ」にはならない。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図C — async/await の変換イメージ"
          description="同じ意味のコードを、Promiseチェーンと async/await で並べて比較する。"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3">
            {/* Promise chain */}
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-3 text-center">
                Promiseチェーン
              </p>
              <pre
                className="text-xs font-mono leading-relaxed overflow-x-auto"
                style={{ color: "#cbd5e1" }}
              >
{`fetch('/api/user')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });`}
              </pre>
            </div>

            <div className="flex md:flex-col items-center justify-center text-amber-400">
              <span className="text-xs font-semibold whitespace-nowrap">同じ意味</span>
              <span className="text-lg leading-none">↕</span>
            </div>

            {/* async/await */}
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: "rgba(245,158,11,0.4)",
                backgroundColor: "rgba(245,158,11,0.05)",
              }}
            >
              <p className="text-xs font-semibold text-amber-400 mb-3 text-center">
                async / await
              </p>
              <pre
                className="text-xs font-mono leading-relaxed overflow-x-auto"
                style={{ color: "#cbd5e1" }}
              >
{`async function load() {
  try {
    const res  = await fetch('/api/user');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}`}
              </pre>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            裏ではPromiseが動いているのは同じ。書き方が「上から下に読める」ようになっただけ。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図D — イベントループの全体像"
          description="シングルスレッドのJSが、なぜ「待つ間に他のことをできる」のか。"
        >
          <StackLayer
            Icon={Layers}
            title="コールスタック"
            subtitle="今まさに実行中の関数が積まれる場所（1本道）"
            iconColor="text-amber-400"
          />
          <StackLayer
            Icon={Bell}
            title="Web API（ブラウザ側）"
            subtitle="fetch・setTimeout など時間がかかる処理を裏で担当"
            iconColor="text-blue-400"
          />
          <StackLayer
            Icon={ListChecks}
            title="タスクキュー"
            subtitle="完了したコールバックが順番待ちで並ぶ列"
            iconColor="text-violet-400"
          />
          <StackLayer
            Icon={Clock}
            title="イベントループ"
            subtitle="コールスタックが空になったら、キューから1つ取り出して積む"
            iconColor="text-emerald-400"
            showArrow={false}
          />
          <p className="text-xs text-gray-600 text-center mt-4 leading-relaxed">
            JS本体（コールスタック）はシングルスレッドのまま。重い処理はWeb APIに丸投げし、結果が来たらキュー経由で順次処理する。これが非同期の正体。
          </p>
        </ConceptDiagram>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["コールバック", "Promise", "async / await"]}
          rows={[
            {
              label: "書き方",
              cells: [
                "ネストが深くなる（コールバック地獄）",
                ".then() をチェーンで繋ぐ",
                "同期コードに近い書き方",
              ],
              highlightCol: 2,
            },
            {
              label: "エラー処理",
              cells: [
                "各階層で個別に処理（漏れやすい）",
                ".catch() でチェーン全体を一括捕捉",
                "try / catch で直感的に捕捉",
              ],
              highlightCol: 2,
            },
            {
              label: "可読性",
              cells: [
                "低（ネストが深く追いづらい）",
                "中（チェーンで横に伸びる）",
                "高（上から下に読める）",
              ],
              highlightCol: 2,
            },
            {
              label: "現在の推奨",
              cells: [
                "新規では使わない",
                "ライブラリAPIで遭遇するので読めればOK",
                "基本これを使う",
              ],
              highlightCol: 2,
            },
          ]}
          note="「コールバック → Promise → async/await」と歴史的に進化してきた。今のJSの基本は async/await。Promiseは中で動いているので「消えた」わけではなく、表に出てこなくなっただけ。"
        />
      </section>

      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text:
              "マスター、「非同期処理」って言葉自体がよくわからないんですよ……。ボク、「同期」と何が違うんですか？ 同じ時刻に動くか動かないか、みたいな話ですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text:
              "いえ、時刻の話ではないんですよ、マジさん。ファミレスを思い浮かべてください。同期処理は「料理ができるまでレジの前で立ち続ける」状態。後ろのお客様は一歩も進めません。非同期処理は「番号札を受け取って席で待つ」状態。料理ができたら呼ばれるので、それまで他のお客様も注文できる。サーバーが固まらないというのは、こういう仕組みのことなんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text:
              "マジ？\nじゃあ `await` って書くと、何を「待っている」ことになるんですか？ 待つと言われると、また料理ができるまでレジで立ってる気がしてきます……。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text:
              "鋭いご指摘です。`await` が待っているのは「Promiseが解決されること」、つまり番号札が `fulfilled`（成功）か `rejected`（失敗）に変わる瞬間です。重要なのは、その間 JavaScript本体は止まっていないという点です。awaitしている関数だけ一旦中断し、ブラウザは画面を描いたり他のクリックを処理したりできています。立ち止まっているのはマジさん（その関数）だけで、お店全体（ブラウザ）は動き続けているとお考えください。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text:
              "えっ、`try / catch` で非同期のエラーが捕まえられるんですか！？ ボク、通信エラーってなんとなく `.catch()` でしか拾えない別世界の存在だと思っていました。それはありがたすぎます！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text:
              "そう感じるのは自然なことです。実は async/await が登場する前は、まさに別世界だったんですよ、マジさん。Promiseチェーンが3段4段と深くなり、「どの`.then()`の中で投げたエラーが、どの`.catch()`で捕まるのか」を追うのが大変でした。それを「同期コードと同じ try/catch で書ける」ようにしたのがasync/awaitです。歴史的経緯を知ると、今の便利さがありがたく思えてきます。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text:
              "なるほど……。「JavaScriptはシングルスレッドだけど、重い処理は外に投げて待たせる」「番号札がPromise」「番号を呼ばれたら受け取りに行くのが await」、ここまでで結構スッキリしてきました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text:
              "見事なまとめです、マジさん。次は実際にサーバーから情報を取りに行く `fetch` API を扱います。ちょうど料理を運ぶ給仕係を覚えたところで、本物のレストランを開店するようなものです。今日掴んだ非同期の感覚が、そのまま地続きで使えますよ。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 イベントループの仕組み（コールスタック・タスクキュー）">
          <p>
            JavaScriptは「シングルスレッド」で動く。これは「同時に動く実行ラインが1本しかない」という意味で、関数を呼ぶと
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fbbf24" }}
            >
              コールスタック
            </code>
            に積まれ、上から順に実行される。
          </p>
          <p>
            時間のかかる処理（fetch・setTimeout・ファイルI/Oなど）は、JSエンジンの外側（ブラウザのWeb APIやNode.jsのライブラリ層）に「やっといて」と委ねる。完了したらコールバックが
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fbbf24" }}
            >
              タスクキュー
            </code>
            に積まれ、コールスタックが空になった瞬間に
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fbbf24" }}
            >
              イベントループ
            </code>
            がキューから1つ取り出してスタックに積む。
          </p>
          <KeyPoint>
            「非同期＝並列ではない」。JSの実行レーンは1本のままで、待ち時間だけを外に押し出している。これを誤解すると、CPU負荷の高い計算をasyncにしても速くならない理由が分からなくなる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 Promise チェーンの書き方">
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fbbf24" }}
            >
              .then()
            </code>
            は「Promiseが fulfilled になったら呼ばれる関数」を登録する。`.then()` の戻り値もまたPromiseなので、チェーンで繋いでいける。
          </p>
          <pre
            className="text-xs font-mono leading-relaxed overflow-x-auto rounded-lg p-4"
            style={{ backgroundColor: "#0f1117", color: "#cbd5e1", border: "1px solid #2d3048" }}
          >
{`fetch('/api/user')
  .then(res => res.json())   // Response → JSON に変換（これもPromise）
  .then(user => user.name)   // 必要なフィールドだけ抜き出す
  .then(name => console.log(name))
  .catch(err => console.error(err));  // どこで落ちても1箇所で受ける`}
          </pre>
          <p>
            注意点は2つ。
            <strong className="text-white">①</strong> `.then()` の中で値を `return` するとそれが次の`.then()`の引数になる。
            <strong className="text-white">②</strong> `.catch()` を最後に置けば、チェーン途中のどこで投げられたエラーも拾える。`.catch()`の付け忘れは「未処理のPromise rejection」になる。
          </p>
        </DetailBlock>

        <DetailBlock heading="6.3 async / await のエラーハンドリング（try / catch）">
          <p>
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fbbf24" }}
            >
              await
            </code>
            したPromiseが rejected になると、その場で例外が throw されたのと同じ振る舞いになる。だから同期コードと同じ
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#fbbf24" }}
            >
              try / catch
            </code>
            で捕まえられる。
          </p>
          <pre
            className="text-xs font-mono leading-relaxed overflow-x-auto rounded-lg p-4"
            style={{ backgroundColor: "#0f1117", color: "#cbd5e1", border: "1px solid #2d3048" }}
          >
{`async function loadUser(id) {
  try {
    const res = await fetch(\`/api/user/\${id}\`);
    if (!res.ok) throw new Error('HTTPエラー: ' + res.status);
    return await res.json();
  } catch (err) {
    console.error('読み込み失敗:', err);
    return null;
  }
}`}
          </pre>
          <KeyPoint>
            `fetch` はネットワーク失敗以外（404・500）では reject しない。HTTPステータスは自分で `res.ok` を見て手動で `throw` する必要がある。これは初心者がよく踏む落とし穴。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 Promise.all / Promise.allSettled（並列処理）">
          <p>
            複数の非同期処理を「同時に走らせて、全部終わったら次へ」とまとめたい時に使う。直列で `await` を並べると合計時間になるが、`Promise.all` を使えば最も遅いものの時間で済む。
          </p>
          <pre
            className="text-xs font-mono leading-relaxed overflow-x-auto rounded-lg p-4"
            style={{ backgroundColor: "#0f1117", color: "#cbd5e1", border: "1px solid #2d3048" }}
          >
{`// 直列：合計 = a + b + c
const a = await fetchA();
const b = await fetchB();
const c = await fetchC();

// 並列：合計 ≒ max(a, b, c)
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);`}
          </pre>
          <p>
            <strong className="text-white">Promise.all()</strong>：1つでも reject すると全体が即 reject（fail-fast）。すべて成功する前提で使う。
          </p>
          <p>
            <strong className="text-white">Promise.allSettled()</strong>：全部の結果（成功・失敗それぞれ）が揃うまで待つ。「3件中1件失敗してもいいから、できた分は表示したい」ような時に使う。
          </p>
          <KeyPoint>
            「順番に依存しない処理」を直列の await で書いてしまうと、無駄に待ち時間が増える。並列にできるかをまず考える癖をつけると、体感速度が大きく変わる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/fetch",
            title: "fetch API",
            description: "非同期処理の代表選手。サーバーと話す入口。",
            icon: "Cloud",
          },
          {
            href: "/javascript/variables",
            title: "変数とスコープ",
            description: "let / const とブロックスコープの基礎。",
            icon: "Code2",
          },
          {
            href: "/javascript/error",
            title: "エラーハンドリング",
            description: "try / catch と例外の扱い方をまとめて掴む。",
            icon: "Server",
          },
        ]}
      />

      <PageDrill questions={asyncQuestions} />
    </div>
  );
}
