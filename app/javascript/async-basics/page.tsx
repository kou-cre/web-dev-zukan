import {
  ChefHat,
  Clock,
  Hourglass,
  Layers,
  Mail,
  Globe,
  ListOrdered,
  Repeat,
  AlertTriangle,
  Network,
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
} from "@/components/DetailSection";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { Bridge } from "@/components/Bridge";
import { asyncBasicsQuestions } from "@/content/questions/javascript/async-basics";

export const metadata = {
  title: "同期と非同期の違い | Web開発図解",
  description:
    "JavaScriptの同期処理と非同期処理の違いを図解で解説。setTimeoutでの体験・コールバック・イベントループまで、Promiseの前段として一気に整理する。",
};

export default function AsyncBasicsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="同期と非同期の違い"
        subtitle={"「待つ」の2パターン——プログラムが止まるか、止まらないか"}
        body={"シングルスレッドのJSが画面を固めずに動ける仕組みの入口。ここを掴めば Promise が自然に分かる。"}
        accentColor="amber"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "同期処理と非同期処理の違い（何が変わるのか）",
          "JavaScriptがシングルスレッドとはどういう意味か",
          "setTimeoutで「あとで実行」を体験する",
          "コールバック関数とは何か（関数を関数に渡す）",
        ]}
        prerequisites={[
          "変数（const / let）を書けること（/javascript/variables を読んだ）",
          "関数を書けること（function f() {} の形を知っている）",
          "console.log() で結果を確認できること",
        ]}
        outOfScope={[
          "Promise（次のページ /javascript/async で扱う）",
          "async / await（Promiseの後）",
          "イベントループの内部構造（応用編で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="JavaScriptは1人のシェフ（シングルスレッド）。同期処理は『料理が完成するまでカウンターに立ちっぱなし』で次の注文を取れない。非同期処理は『番号札を渡してキッチンに戻り、完成したら呼ばれる』仕組み。画面が固まらないのは、JSが待ち時間を外に押し出しているから。"
        metaphorTitle="1人シェフのレストラン"
        metaphorPoints={[
          {
            label: "シングルスレッド",
            real: "シェフが1人。同時に複数の料理を自分で調理することはできない",
            metaphor: "1人のシェフ",
          },
          {
            label: "同期処理",
            real: "料理が完成するまでカウンターに立ったまま次の注文を受けない",
            metaphor: "立ちっぱなし",
          },
          {
            label: "非同期処理",
            real: "『5番のオーダーを厨房に投げた。できたら呼ばれる』。その間に他の注文を取れる",
            metaphor: "番号札システム",
          },
          {
            label: "コールバック",
            real: "『料理が完成したらこの操作をしてください』と厨房に渡すメモ",
            metaphor: "完成時の指示メモ",
          },
        ]}
        definition="非同期処理とは、結果を待つ間も他の処理を進められるようにする仕組み。JavaScriptはシングルスレッドだが、待ち時間を外部（ブラウザ）に委ねることで並行動作を実現している。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「同期と非同期で何が違うのか」と「実際にコードでどう書くのか」を、2枚の図で確認しましょう。
        </p>

        {/* ── 用語の整理 ── */}
        <TermNote
          terms={[
            {
              word: "シングルスレッド",
              definition:
                "JavaScriptが「同時に1つのことしかできない」という性質。シェフが1人だけのキッチンをイメージ。",
            },
            {
              word: "同期処理",
              definition:
                "前の処理が完全に終わるまで次に進まない方式。カウンターで料理を待ち続けるイメージ。",
            },
            {
              word: "非同期処理",
              definition:
                "時間のかかる処理を外に投げ、完了を待たずに次の処理を進める方式。番号札を受け取って席で待つイメージ。",
            },
            {
              word: "コールバック関数",
              definition:
                "「完了したらこれを呼んでください」と渡す関数のこと。処理が終わった通知を受け取る仕組み。",
            },
          ]}
        />

        {/* ── 概念図A: 同期 vs 非同期のフロー比較 ── */}
        <ConceptDiagram
          title="概念図A"
          description="同じ3つのタスクを「同期」と「非同期」で並べたとき、合計時間と並び方はどう変わるか？"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 同期（直列） */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ListOrdered className="w-4 h-4 text-red-400" />
                <p className="text-sm font-bold text-white">同期（直列）</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                  止まる
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FlowCard
                  Icon={Hourglass}
                  title="タスク1"
                  subtitle="完了まで待つ"
                />
                <FlowArrow label="待つ" direction="down" />
                <FlowCard
                  Icon={Hourglass}
                  title="タスク2"
                  subtitle="完了まで待つ"
                />
                <FlowArrow label="待つ" direction="down" />
                <FlowCard
                  Icon={Hourglass}
                  title="タスク3"
                  subtitle="完了まで待つ"
                />
              </div>
              <div
                className="rounded border mt-4 p-2.5 text-xs text-gray-300 leading-relaxed"
                style={{
                  backgroundColor: "rgba(239,68,68,0.06)",
                  borderColor: "rgba(239,68,68,0.3)",
                }}
              >
                合計時間 = タスク1 + タスク2 + タスク3
                <br />
                <span className="text-gray-500">
                  待ち時間中は画面操作も止まる
                </span>
              </div>
            </div>

            {/* 非同期（並行） */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(245,158,11,0.06)",
                borderColor: "rgba(245,158,11,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Network className="w-4 h-4 text-amber-400" />
                <p className="text-sm font-bold text-white">非同期（並行）</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  進む
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FlowCard
                  Icon={Mail}
                  title="タスク1"
                  subtitle="投げて即次へ"
                  highlight
                  accentColor="amber"
                />
                <FlowArrow label="即座に次へ" direction="down" />
                <FlowCard
                  Icon={Mail}
                  title="タスク2"
                  subtitle="投げて即次へ"
                  highlight
                  accentColor="amber"
                />
                <FlowArrow label="即座に次へ" direction="down" />
                <FlowCard
                  Icon={Mail}
                  title="タスク3"
                  subtitle="投げて即次へ"
                  highlight
                  accentColor="amber"
                />
                <FlowArrow label="完了したものから受け取り" direction="down" />
                <FlowCard
                  Icon={Clock}
                  title="完了通知"
                  subtitle="揃った順に処理"
                />
              </div>
              <div
                className="rounded border mt-4 p-2.5 text-xs text-gray-300 leading-relaxed"
                style={{
                  backgroundColor: "rgba(245,158,11,0.06)",
                  borderColor: "rgba(245,158,11,0.3)",
                }}
              >
                合計時間 ≒ 一番遅いタスクの時間
                <br />
                <span className="text-gray-500">待ち時間中も画面操作OK</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            同じ仕事でも、待ち方を変えるだけで合計時間と体感が大きく変わる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <Bridge
          from="同期と非同期の違い（フローの比較）"
          to="実際にどうコードで書くか（setTimeout の体験）"
        />

        {/* ── 概念図B: setTimeoutで非同期を体験する ── */}
        <ConceptDiagram
          title="概念図B"
          description="setTimeout は「指定ミリ秒後にこの関数を呼んで」と予約を入れる命令。実行順は予想と違う。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={ListOrdered}
              title="① 開始 を表示"
              subtitle="同期で即実行"
            />
            <FlowArrow label="次の行へ" direction="right" />
            <FlowCard
              Icon={Mail}
              title="setTimeout 予約"
              subtitle="ブラウザに『1秒後に呼んで』と依頼"
              highlight
              accentColor="amber"
            />
            <FlowArrow label="待たずに次へ" direction="right" />
            <FlowCard
              Icon={ListOrdered}
              title="② 終了 を表示"
              subtitle="同期で即実行"
            />
          </div>

          <div className="flex justify-center my-3">
            <FlowArrow label="1秒後…" sublabel="ブラウザから呼び戻し" direction="down" />
          </div>

          <div className="flex justify-center">
            <FlowCard
              Icon={Clock}
              title="③ 1秒後に実行"
              subtitle="setTimeout に渡したコールバックが動く"
              highlight
              accentColor="amber"
            />
          </div>

          {/* コード例 */}
          <div className="mt-5">
            <CodeBlock
              title="settimeout-order.js"
              language="javascript"
              code={`console.log('① 開始');

setTimeout(() => {
  console.log('③ 1秒後に実行される');
}, 1000);

console.log('② 終了（すぐ）');

// 出力:
// ① 開始
// ② 終了（すぐ）
// ③ 1秒後に実行される`}
            />
          </div>

          <div
            className="rounded-lg border mt-2 p-3"
            style={{
              backgroundColor: "rgba(245,158,11,0.05)",
              borderColor: "rgba(245,158,11,0.3)",
            }}
          >
            <p className="text-xs font-semibold text-amber-300 mb-1">
              直感に反するが、これが非同期の正体
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              setTimeout を先に書いたのに、その中身（③）は最後に実行される。
              setTimeout は「今すぐ実行」ではなく「あとで呼んでください」と予約を入れる命令だから。
              JS本体は予約を入れた瞬間に次の行へ進み、約束の時間が来たらコールバックが呼ばれる。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — 概念図の直後） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "同期と非同期って、時刻を合わせるとかそういう話じゃないんですか？ 言葉的に「同じ時間」な感じがして……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "言葉のイメージとずれていますよね。ここでの「同期」は「足並みを揃える」という意味です。\n同期処理 = 前の処理が終わるまで次を始めない（足並みを揃える）\n非同期処理 = 結果を待たずに次へ進む（それぞれのペースで動く）\nレジで料理を待ち続けるのが同期、番号札をもらって席で待つのが非同期です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ じゃあなぜJSはわざわざ非同期にする必要があるんですか？ 待てばいいのでは？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "ブラウザを想像してください。サーバーからデータを取りに行く処理を同期で書いたとします。\n通信が終わるまで2〜3秒かかったとして、その間ボタンのクリックも、スクロールも、画面の描画も、すべて止まります。\n「読み込み中」のまま操作できないサイトを使ったことがあるはずです。あれは非同期処理が欠けている状態です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "分かりました……。でも setTimeout の話で、②が③より先に実行されるって、直感的におかしくないですか？ setTimeout を先に書いたのに！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "その直感はとても正常です。コードは上から下に読まれると習ったはずですから。\nただ setTimeout は「今すぐ実行」ではなく「1000ミリ秒後にこれを呼んで」という予約を入れる命令です。\n予約を入れた瞬間に次の行に進み、1秒後に予約した処理が呼び出されます。\nコードは上から下に進みますが、setTimeout の中身は「未来のある時点」に実行されます。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。setTimeout は「今すぐやれ」じゃなくて「この手紙をあとで読んでください」と投函する操作なんですね。\nそして次のページで出てくる Promise というのは、この「あとで読む手紙」をもっと扱いやすくしたものですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "完璧な先読みです、マジさん。その通りで、Promise はコールバックの書きにくさを解消するために生まれました。\n今は「非同期 = あとで完了通知が来る」というイメージだけ持てば十分です。\n次のページで Promise と async/await を学べば、今日の話が一気に繋がります。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["同期処理", "非同期処理"]}
          rows={[
            {
              label: "次の処理を始めるタイミング",
              cells: ["前の処理が完了してから", "完了を待たず即座に"],
              highlightCol: 1,
            },
            {
              label: "画面への影響",
              cells: [
                "重い処理中は画面が固まる",
                "画面の描画・操作は継続できる",
              ],
              highlightCol: 1,
            },
            {
              label: "コードの読みやすさ",
              cells: [
                "上から下に読んで理解できる（直感的）",
                "コールバック・Promise・await が必要",
              ],
              highlightCol: 0,
            },
            {
              label: "使いどころ",
              cells: [
                "即座に終わる軽い処理",
                "通信・ファイル読込・タイマーなど待ち時間がある処理",
              ],
              highlightCol: 1,
            },
          ]}
          note="非同期が難しく感じるのは、コードの書き順と実行順が一致しないから。でも画面を固めないためには必須の仕組み。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は「なぜシングルスレッドなのに画面が固まらないか」の仕組み（イベントループ）と、コールバック地獄の問題を扱います。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — イベントループとコールバック地獄
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          シングルスレッドのJSがなぜ画面を固めずに動けるのか、その裏側の仕組みを覗いてみます。
          そして、コールバックだけで非同期を書こうとしたときに必ずぶつかる「コールバック地獄」を確認します。
        </p>

        {/* TermNote: 応用編の言葉 */}
        <TermNote
          terms={[
            {
              word: "コールスタック",
              definition:
                "今まさに実行中の関数が積まれる場所。函を積み重ねるイメージで、上から取り出される。",
            },
            {
              word: "Web API",
              definition:
                "ブラウザが提供する機能群。setTimeout・fetch などの時間のかかる処理をJSに代わって担当する。",
            },
            {
              word: "タスクキュー",
              definition:
                "Web API が完了したときに、次に実行すべき関数を並べておく待ち行列。",
            },
            {
              word: "イベントループ",
              definition:
                "コールスタックが空になったらタスクキューから1つ取り出して実行する監視係。",
            },
          ]}
        />

        {/* ── 概念図C: イベントループの仕組み ── */}
        <ConceptDiagram
          title="概念図C"
          description="JSエンジンはコールスタックしか管理しない。重い処理は Web API に丸投げして、完了したらイベントループが拾い上げる。"
        >
          <div
            className="rounded-xl border-2 border-dashed border-amber-700/40 p-4"
          >
            <p className="text-xs font-semibold text-amber-400 text-center mb-4 tracking-wide uppercase">
              非同期処理の流れ
            </p>
            <StackLayer
              Icon={Layers}
              title="① コールスタック（JSエンジン）"
              subtitle="今実行中の関数が積まれる。setTimeout を呼ぶと「予約を入れて」即抜ける"
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={Globe}
              title="② Web API（ブラウザ側）"
              subtitle="JSの外側で待ち時間を管理。タイマー・通信・I/Oをここに任せる"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={ListOrdered}
              title="③ タスクキュー（待ち行列）"
              subtitle="Web API の処理が完了したコールバックがここに並ぶ"
              iconColor="text-emerald-400"
            />
            <StackLayer
              Icon={Repeat}
              title="④ イベントループ（監視係）"
              subtitle="コールスタックが空になった瞬間、キューから1つ取り出してスタックに戻す"
              iconColor="text-amber-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            JSは1人のシェフ（コールスタック）。Web API は厨房スタッフ。タスクキューは番号札の列。イベントループは「次！」と呼ぶホール係。
          </p>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{
              backgroundColor: "rgba(245,158,11,0.05)",
              borderColor: "rgba(245,158,11,0.3)",
            }}
          >
            <p className="text-xs font-semibold text-amber-300 mb-2">
              なぜ画面が固まらないのか？
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              重い処理（通信・タイマー）は Web API に丸投げするので、JSのコールスタックはすぐ空になります。
              空になった隙にブラウザは画面の描画やクリック処理を進められる。
              これが「シングルスレッドなのに画面が固まらない」仕組みの核心です。
            </p>
          </div>
        </ConceptDiagram>

        {/* ── 概念図D: コールバック地獄の問題 ── */}
        <ConceptDiagram
          title="概念図D"
          description="非同期をコールバックだけで繋ぐと、ネストが深くなって読めなくなる。これがコールバック地獄。"
        >
          <CodeBlock
            title="callback-hell.js"
            language="javascript"
            code={`getUser(id, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log(comments);
      // ← ここまで読むのに右へ右へとインデントが伸びる
      // ← さらにエラー処理を各段で書く必要がある
    });
  });
});`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div
              className="rounded-lg border p-3"
              style={{
                backgroundColor: "rgba(239,68,68,0.06)",
                borderColor: "rgba(239,68,68,0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-xs font-semibold text-red-300">
                  コールバック地獄の問題
                </p>
              </div>
              <ul className="text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <li>
                  <span className="text-red-300">▸</span> ネストが深くなり、横スクロールが必要になる
                </li>
                <li>
                  <span className="text-red-300">▸</span> エラー処理を各段階で書く必要がある
                </li>
                <li>
                  <span className="text-red-300">▸</span> 順序の入れ替え・分岐が極端に難しい
                </li>
              </ul>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{
                backgroundColor: "rgba(245,158,11,0.06)",
                borderColor: "rgba(245,158,11,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-4 h-4 text-amber-400" />
                <p className="text-xs font-semibold text-amber-300">
                  解決策（次ページ）
                </p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Promise を使うとネストを「→」で並べる形に書き換えられ、async/await を使うと同期コードのように上から下に読めるようになります。
                同じ非同期処理でも、書き方の選択肢で読みやすさが大きく変わるのが次のテーマです。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────── */}
      <DetailSection title="詳細解説">
        {/* 6.1 コールバック関数とは */}
        <DetailBlock heading="6.1 コールバック関数とは">
          <p>
            <strong className="text-white">コールバック関数</strong>とは、別の関数に「あとで呼んでください」と渡す関数のこと。
            setTimeout の第1引数がまさにコールバックで、setTimeout はその関数を「指定ミリ秒後に」呼び出してくれる。
          </p>
          <p>
            関数を「値」として扱える（変数に入れたり、別の関数に渡したりできる）のが JavaScript の特徴。
            コールバックはこの性質を利用した、非同期処理の最も基本的な仕組み。
          </p>
          <CodeBlock
            title="callback-basics.js"
            language="javascript"
            code={`// 1. 関数を変数に入れられる
const greet = function(name) {
  console.log('こんにちは ' + name);
};

// 2. 関数を別の関数に渡せる（これがコールバック）
function callTwice(fn) {
  fn('マジ');
  fn('マスター');
}
callTwice(greet);
// → こんにちは マジ
// → こんにちは マスター

// 3. setTimeout の第1引数も同じ仕組み
setTimeout(function() {
  console.log('1秒後に呼ばれる');
}, 1000);`}
          />
          <KeyPoint>
            コールバックは「処理が終わったら呼んでね」と渡す指示メモ。setTimeout・イベントリスナー（addEventListener）・配列の forEach なども全部コールバックを受け取る関数。一度この概念を掴めば、Promise や async/await の理解が一気に楽になる。
          </KeyPoint>
        </DetailBlock>

        {/* 6.2 なぜコールバック地獄が問題なのか */}
        <DetailBlock heading="6.2 なぜコールバック地獄が問題なのか">
          <p>
            非同期処理を順番に繋ぎたいとき、コールバックだけで書くと「コールバックの中でさらにコールバックを呼ぶ」というネスト構造になる。
            2段3段と深くなると、コードが右へ右へとインデントされ、読むのに横スクロールが必要になるほど辛くなる。
          </p>
          <p>
            さらに厄介なのは<strong className="text-white">エラー処理</strong>。
            どの段階でエラーが起きるか分からないため、各コールバックの中で個別に「if (err) ...」と書く必要があり、ロジックよりエラー処理のほうが目立つコードになりがち。
          </p>
          <CodeBlock
            title="error-handling-hell.js"
            language="javascript"
            code={`getUser(id, function(err, user) {
  if (err) { handleError(err); return; }
  getPosts(user.id, function(err, posts) {
    if (err) { handleError(err); return; }
    getComments(posts[0].id, function(err, comments) {
      if (err) { handleError(err); return; }
      // ようやく本当にやりたかった処理
      console.log(comments);
    });
  });
});`}
          />
          <p>
            この問題を解決するために<strong className="text-amber-300">Promise</strong>が生まれ、さらに読みやすくするために<strong className="text-amber-300">async/await</strong>が追加された。
            次のページではこの2つを順に学んでいく。
          </p>
          <KeyPoint>
            「非同期 = コールバック」と覚えるのは古い。今のJavaScriptでは「非同期 = Promise / async・await」が基本で、コールバックはイベントリスナーや一部のAPIに残るだけ。コールバック地獄を体験することで、Promise の便利さがより深く理解できる。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/async",
            title: "Promise と async/await",
            description: "非同期処理を読みやすく書く現代の書き方",
            icon: "Code2",
          },
          {
            href: "/javascript/variables",
            title: "変数とスコープ",
            description: "前提として必要な const / let の基礎",
            icon: "Server",
          },
          {
            href: "/javascript/fetch",
            title: "fetch API",
            description: "非同期通信の代表例。Promise を返すAPI",
            icon: "Cloud",
          },
        ]}
      />

      <PageDrill questions={asyncBasicsQuestions} />
    </div>
  );
}
