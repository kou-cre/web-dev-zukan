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
  GitBranch,
  Link2,
  Combine,
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
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { CodeBlock } from "@/components/CodeBlock";
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

        <ConceptDiagram
          title="概念図E：Promiseチェーンのエラー伝播の仕組み"
          description="チェーン途中でエラーが発生すると、後続の .then() はスキップされ、最後の .catch() に直接ジャンプする。"
          accentColor="amber"
        >
          {/* A → B(エラー) → C の流れ */}
          <div className="flex flex-col items-center gap-1 mb-5">
            <div className="flex items-center gap-2">
              <div
                className="rounded-lg border px-4 py-2 text-center min-w-[110px]"
                style={{ borderColor: "rgba(16,185,129,0.5)", backgroundColor: "rgba(16,185,129,0.08)" }}
              >
                <p className="text-xs font-bold text-emerald-300">ステップA</p>
                <p className="text-xs text-gray-400 mt-0.5">成功</p>
              </div>
              <span className="text-gray-500 text-sm">→</span>
              <div
                className="rounded-lg border px-4 py-2 text-center min-w-[110px]"
                style={{ borderColor: "rgba(239,68,68,0.5)", backgroundColor: "rgba(239,68,68,0.08)" }}
              >
                <p className="text-xs font-bold text-red-300">ステップB</p>
                <p className="text-xs text-gray-400 mt-0.5">エラーを投げる</p>
              </div>
              <span className="text-gray-500 text-sm">→</span>
              <div
                className="rounded-lg border px-4 py-2 text-center min-w-[110px] opacity-40"
                style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
              >
                <p className="text-xs font-bold text-gray-400">ステップC</p>
                <p className="text-xs text-gray-500 mt-0.5">スキップされる</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-gray-500 mr-2">Bのエラーが伝播</span>
              <span className="text-red-400 text-base">↓</span>
            </div>
            <div
              className="rounded-lg border px-5 py-2 text-center"
              style={{ borderColor: "rgba(239,68,68,0.5)", backgroundColor: "rgba(239,68,68,0.08)" }}
            >
              <p className="text-xs font-bold text-red-300">.catch() — チェーン末尾に1つで全エラーを捕捉</p>
            </div>
          </div>

          {/* .catch() の2つの振る舞い */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div
              className="rounded-xl border p-3"
              style={{ borderColor: "rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.05)" }}
            >
              <p className="text-xs font-semibold text-red-300 mb-1">.catch() の中で throw する</p>
              <p className="text-xs text-gray-400 leading-relaxed">エラーを再スローすると、さらに下流の .catch() に伝わる。</p>
              <pre className="text-xs font-mono mt-2 text-gray-300 leading-relaxed">{`.catch(err => {
  throw err; // 次の .catch() へ
})`}</pre>
            </div>
            <div
              className="rounded-xl border p-3"
              style={{ borderColor: "rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.05)" }}
            >
              <p className="text-xs font-semibold text-amber-300 mb-1">.catch() の中で値を return する</p>
              <p className="text-xs text-gray-400 leading-relaxed">値を返すとチェーンが復活し、次の .then() が動く（リカバリー）。</p>
              <pre className="text-xs font-mono mt-2 text-gray-300 leading-relaxed">{`.catch(err => {
  return fallback; // チェーン継続
})`}</pre>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            .catch() を末尾に1つ置くだけで、チェーン全体のエラーを一括で処理できる。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図F：async/await は Promise の糖衣構文"
          description="async/await は Promise を置き換えるのではなく、同じ動作を読みやすく書けるようにしたもの。裏では必ず Promise が動いている。"
          accentColor="amber"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-3">
            {/* Promise 側 */}
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-3 text-center">Promise (.then) チェーン</p>
              <pre className="text-xs font-mono leading-relaxed text-gray-300 overflow-x-auto">{`function loadUser() {
  return fetch('/api/user')
    .then(res => res.json())
    .then(data => data.name)
    .catch(err => null);
}
// 戻り値は Promise<string|null>`}</pre>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-gray-500">関数は Promise を返す</p>
                <p className="text-xs text-gray-500">.then() で値を取り出す</p>
                <p className="text-xs text-gray-500">.catch() でエラー処理</p>
                <p className="text-xs text-gray-500">並列は Promise.all()</p>
              </div>
            </div>

            <div className="flex md:flex-col items-center justify-center gap-1 text-amber-400 py-2">
              <span className="text-xs font-semibold whitespace-nowrap">同じ動作</span>
              <span className="text-lg leading-none">↕</span>
            </div>

            {/* async/await 側 */}
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "rgba(245,158,11,0.4)", backgroundColor: "rgba(245,158,11,0.05)" }}
            >
              <p className="text-xs font-semibold text-amber-400 mb-3 text-center">async / await</p>
              <pre className="text-xs font-mono leading-relaxed text-gray-300 overflow-x-auto">{`async function loadUser() {
  try {
    const res  = await fetch('/api/user');
    const data = await res.json();
    return data.name;
  } catch {
    return null;
  }
}
// 戻り値は Promise<string|null>`}</pre>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-amber-300/70">async 関数は必ず Promise を返す</p>
                <p className="text-xs text-amber-300/70">await で Promise の値を取り出す</p>
                <p className="text-xs text-amber-300/70">try/catch でエラー処理</p>
                <p className="text-xs text-amber-300/70">並列は Promise.all() をそのまま使う</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            戻り値の型・エラー伝播・並列処理の仕組みは同じ。書き方だけが変わる。
          </p>
        </ConceptDiagram>

        <ConceptDiagram
          title="概念図G：非同期処理の進化：コールバック → Promise → async/await"
          description="同じ操作（ユーザー取得 → 投稿取得 → コメント取得）を3世代の書き方で並べる。"
          accentColor="amber"
        >
          <div className="grid grid-cols-1 gap-4">
            {/* コールバック地獄 */}
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-400">① コールバック地獄（〜ES5）</p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#fca5a5" }}
                >
                  可読性：低
                </span>
              </div>
              <pre className="text-xs font-mono leading-relaxed text-gray-400 overflow-x-auto">{`getUser(id, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log(comments);
    }, function(err) { /* エラー処理3 */ });
  }, function(err) { /* エラー処理2 */ });
}, function(err) { /* エラー処理1 */ });`}</pre>
              <p className="text-xs text-gray-600 mt-2">ネストが深くなるほど追えなくなる。エラー処理を各段で書かなければならない。</p>
            </div>

            {/* Promise チェーン */}
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "rgba(245,158,11,0.2)", backgroundColor: "rgba(245,158,11,0.03)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-amber-400/70">② Promiseチェーン（ES2015）</p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#fde68a" }}
                >
                  可読性：中
                </span>
              </div>
              <pre className="text-xs font-mono leading-relaxed text-gray-300 overflow-x-auto">{`getUser(id)
  .then(user    => getPosts(user.id))
  .then(posts   => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err    => console.error(err));`}</pre>
              <p className="text-xs text-gray-600 mt-2">ネストは解消。.catch() 1つでまとめてエラー処理できる。ただし .then() の連鎖は横に広がりがち。</p>
            </div>

            {/* async/await */}
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "rgba(16,185,129,0.3)", backgroundColor: "rgba(16,185,129,0.05)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-emerald-400">③ async / await（ES2017）</p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#6ee7b7" }}
                >
                  可読性：高
                </span>
              </div>
              <pre className="text-xs font-mono leading-relaxed text-gray-300 overflow-x-auto">{`async function load(id) {
  try {
    const user     = await getUser(id);
    const posts    = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    console.log(comments);
  } catch (err) {
    console.error(err);
  }
}`}</pre>
              <p className="text-xs text-emerald-300/60 mt-2">同期コードと同じ読み方ができる。try/catch でエラーを一括処理。変数に名前がつくので追いやすい。</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            3世代とも「やっていること」は同じ。進化のたびに「読み書きのしやすさ」が上がってきた。
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
          <CorrectionCard
            misconception="async / await を使えば、JavaScriptは複数の処理を同時並行（マルチスレッド）で走らせられる"
            correction="JSの実行レーンは1本のまま。async/awaitは「待ち時間を外に押し出す」仕組みであって、並列実行ではない"
            reason="CPU負荷の高い計算（重いループや画像処理など）をasync関数で囲っても速くならない。並列化が必要な場面にはWeb Workerを使う。非同期が有効なのはあくまで「I/O待ち」の場面。"
          />
          <CodeBlock
            title="event-loop-demo.js"
            language="javascript"
            code={`console.log('① 開始');

setTimeout(() => {
  console.log('③ タイムアウト（0ms後）');
}, 0);

console.log('② 終了');

// 出力順：① → ② → ③
// setTimeout(..., 0) でも、コールスタックが空になってから実行される`}
          />
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
          <UseCaseGrid cols={3} items={[
            {
              Icon: GitBranch,
              title: ".then()",
              subtitle: "fulfilled のとき",
              description: "Promiseが成功したときに呼ばれる。戻り値は次の .then() に渡される。",
              accentColor: "emerald",
            },
            {
              Icon: XCircle,
              title: ".catch()",
              subtitle: "rejected のとき",
              description: "チェーン途中のどこで投げられたエラーも最後の .catch() 1箇所で受け取れる。",
              accentColor: "rose",
            },
            {
              Icon: CheckCircle2,
              title: ".finally()",
              subtitle: "成功・失敗に関わらず",
              description: "fulfilled / rejected どちらでも必ず実行される。ローディング解除などに使う。",
              accentColor: "amber",
            },
          ]} />
          <CodeBlock
            title="promise-chain.js"
            language="javascript"
            code={`fetch('/api/user')
  .then(res => res.json())   // Response → JSON に変換（これもPromise）
  .then(user => user.name)   // 必要なフィールドだけ抜き出す
  .then(name => console.log(name))
  .catch(err => console.error(err))  // どこで落ちても1箇所で受ける
  .finally(() => setLoading(false)); // 成否に関わらず実行`}
          />
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
          <KeyPoint>
            fetchは404・500でもrejectしない。ネットワーク障害以外はPromiseがfullfilledになるため、res.okで手動チェックしてthrowする必要がある。これを知らないと「エラーなのにcatchが動かない」バグに悩まされる。
          </KeyPoint>
          <CodeBlock
            title="async-error-handling.js"
            language="javascript"
            code={`async function loadUser(id) {
  try {
    const res = await fetch(\`/api/user/\${id}\`);

    // fetch は 404/500 でも reject しないので、自分でチェックする
    if (!res.ok) throw new Error('HTTPエラー: ' + res.status);

    return await res.json();
  } catch (err) {
    console.error('読み込み失敗:', err);
    return null;
  }
}`}
          />
          <KeyPoint>
            `fetch` はネットワーク失敗以外（404・500）では reject しない。HTTPステータスは自分で `res.ok` を見て手動で `throw` する必要がある。これは初心者がよく踏む落とし穴。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 Promise.all / Promise.allSettled（並列処理）">
          <p>
            複数の非同期処理を「同時に走らせて、全部終わったら次へ」とまとめたい時に使う。直列で `await` を並べると合計時間になるが、`Promise.all` を使えば最も遅いものの時間で済む。
          </p>
          <Timeline items={[
            {
              year: "ES5以前",
              label: "コールバック",
              description: "非同期の結果を受け取るには、完了時に呼び出される関数（コールバック）を渡す。ネストが深くなる「コールバック地獄」が問題になった。",
              accentColor: "gray",
            },
            {
              year: "ES2015",
              label: "Promise",
              description: ".then() / .catch() のチェーンで非同期の流れを表現できるようになった。エラーハンドリングが統一され、Promise.all による並列処理も可能に。",
              accentColor: "amber",
            },
            {
              year: "ES2017",
              label: "async / await",
              description: "Promiseの糖衣構文として登場。同期コードと同じ見た目で非同期処理を書けるようになり、try/catchでエラーも直感的に扱える。現在の標準。",
              accentColor: "emerald",
            },
          ]} />
          <UseCaseGrid cols={2} items={[
            {
              Icon: Link2,
              title: "Promise.all()",
              subtitle: "fail-fast — 全部成功する前提",
              description: "1つでも reject すると即座に全体が reject になる。順番を問わない複数リクエストを最速で並列実行したいときに使う。",
              accentColor: "amber",
            },
            {
              Icon: Combine,
              title: "Promise.allSettled()",
              subtitle: "全件待ち — 部分成功も許容",
              description: "全Promiseが完了するまで待ち、成功・失敗それぞれの結果を配列で返す。「3件中1件失敗してもできた分は表示したい」場面で使う。",
              accentColor: "violet",
            },
          ]} />
          <CodeBlock
            title="parallel-fetch.js"
            language="javascript"
            code={`// 直列（非効率）：合計時間 = fetchA + fetchB + fetchC
const a = await fetchA();
const b = await fetchB();
const c = await fetchC();

// 並列（Promise.all）：合計時間 ≒ max(fetchA, fetchB, fetchC)
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);

// 部分成功を許容（allSettled）
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error(r.reason);
});`}
          />
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
