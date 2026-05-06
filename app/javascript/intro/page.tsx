import {
  FileCode,
  Paintbrush,
  Zap,
  Globe,
  Cpu,
  Code2,
  Terminal,
  AlertTriangle,
  Search,
  Bug,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  StackLayer,
} from "@/components/ConceptDiagram";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { CodeBlock } from "@/components/CodeBlock";
import { Bridge } from "@/components/Bridge";

export const metadata = {
  title: "JavaScriptを始める前に | Web開発図解",
  description:
    "プログラミング完全未経験者向けに「プログラムとは何か」「JavaScriptがWebページで何をしているか」「DevToolsの使い方」までを1ページで解説。",
};

export default function JavaScriptIntroPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="JavaScriptを始める前に"
        subtitle={"プログラムって何？ ブラウザって何？ まずここから。"}
        body={"このページを読めば「変数とスコープ」に進む準備が整います。"}
        accentColor="yellow"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "プログラムとは何か（コンピュータへの指示書）",
          "JavaScriptがWebページで何をしているか",
          "ブラウザの中にJSを動かす仕組み（JSエンジン）があること",
          "console.log() でコードの結果を確認する方法",
          "エラーが出たときの最初の対処法",
        ]}
        prerequisites={["特になし。このページが出発点です"]}
        outOfScope={[
          "変数・関数・型（次のページから扱います）",
          "TypeScript・Node.js",
          "JavaScriptの歴史・バージョン",
        ]}
      />

      <OnePageSummary
        keyMessage="プログラムとは、コンピュータへの指示書。1行ずつ上から順番に読まれる。JavaScriptは、Webページに「動き」をつける唯一の言語。HTMLが骨組み、CSSが見た目、JavaScriptが動き——この3つが揃ってWebページができている。"
        metaphorTitle="レストランの3つの役割"
        metaphorPoints={[
          {
            label: "HTML",
            real: "メニューの骨格・席の配置図",
            metaphor: "骨組み・構造",
          },
          {
            label: "CSS",
            real: "インテリアデザイン・テーブルクロスの色",
            metaphor: "見た目・スタイル",
          },
          {
            label: "JavaScript",
            real: "給仕係の動き・注文を受けたら料理を運ぶ処理",
            metaphor: "動き・インタラクション",
          },
          {
            label: "プログラム",
            real: "給仕係へのマニュアル。1行ずつ順番に実行される",
            metaphor: "コンピュータへの指示書",
          },
        ]}
        definition="JavaScriptとは、ブラウザの中で動いて、HTMLページに動きやインタラクションを加える言語。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「Webページを作る3つの言語の役割分担」と「JSが動く場所」を図で確認しましょう。
        </p>

        {/* ── 概念図A: HTML / CSS / JS の役割分担 ── */}
        <ConceptDiagram
          title="概念図A"
          description="HTML / CSS / JavaScript はそれぞれ何を担当しているのか？"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* HTML */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileCode className="w-5 h-5 text-orange-400" />
                <p className="text-sm font-bold text-white">HTML</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30">
                  骨組み
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                ページに「何が」あるかを書く。見出し・段落・ボタン・画像などの構造。
              </p>
              <div
                className="rounded border p-2 font-mono text-xs"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <span className="text-gray-500">{"<"}</span>
                <span className="text-blue-300">h1</span>
                <span className="text-gray-500">{">"}</span>
                <span className="text-gray-300">見出し</span>
                <span className="text-gray-500">{"</"}</span>
                <span className="text-blue-300">h1</span>
                <span className="text-gray-500">{">"}</span>
              </div>
            </div>

            {/* CSS */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Paintbrush className="w-5 h-5 text-blue-400" />
                <p className="text-sm font-bold text-white">CSS</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  見た目
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                ページの「見た目」を整える。色・サイズ・余白・配置などのスタイル。
              </p>
              <div
                className="rounded border p-2 font-mono text-xs"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <span className="text-yellow-300">color</span>
                <span className="text-gray-500">: </span>
                <span className="text-green-300">blue</span>
                <span className="text-gray-300">;</span>
              </div>
            </div>

            {/* JS */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(234,179,8,0.10)",
                borderColor: "rgba(234,179,8,0.7)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <p className="text-sm font-bold text-white">JavaScript</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
                  動き
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                ページに「動き」を加える。クリックしたら何かする・データを取る・表示を切り替える。
              </p>
              <div
                className="rounded border p-2 font-mono text-xs leading-relaxed"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span className="text-yellow-300">button</span>
                <span className="text-gray-300">.</span>
                <span className="text-blue-300">addEventListener</span>
                <span className="text-gray-300">(</span>
                <span className="text-green-300">{"'click'"}</span>
                <span className="text-gray-300">, </span>
                <span className="text-gray-500">{"() => {...}"}</span>
                <span className="text-gray-300">)</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            この3つが揃ってはじめて、操作できる「動くWebページ」が完成する。
          </p>
        </ConceptDiagram>

        {/* ── Bridge: 全体像 → 仕組み ── */}
        <Bridge
          from="HTML / CSS / JS の役割分担（全体像）"
          to="JSを実際に動かしている「ブラウザの内部」"
        />

        {/* ── 概念図B: ブラウザとJSエンジン ── */}
        <ConceptDiagram
          title="概念図B"
          description="JavaScriptはどこで動いているのか？ ブラウザの内側を覗いてみる。"
        >
          <div
            className="rounded-xl border-2 border-dashed border-yellow-700/50 p-4"
          >
            <p className="text-xs font-semibold text-yellow-500 text-center mb-4 tracking-wide uppercase">
              Browser — 入れ子構造
            </p>
            <StackLayer
              Icon={Globe}
              title="ブラウザ（外側）"
              subtitle="Chrome / Firefox / Safari など。Webページを表示する大きな箱"
              iconColor="text-gray-400"
            />
            <StackLayer
              Icon={Cpu}
              title="JSエンジン（その中）"
              subtitle="ChromeにはV8、FirefoxにはSpiderMonkey、SafariにはJavaScriptCoreが入っている"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={Code2}
              title="JSコード（一番内側）"
              subtitle="あなたが書いた JavaScript。エンジンに読み込まれて1行ずつ実行される"
              iconColor="text-yellow-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            JavaScript を動かしているのは、実はブラウザに内蔵された「JSエンジン」という小さなプログラム。
          </p>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">補足：Node.js って何？</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Node.js は、ブラウザに内蔵されている V8 エンジンを取り出して、サーバーやパソコン上でも
              JavaScript を動かせるようにしたもの。「ブラウザの外でJSを動かす環境」と覚えればOK。
              いまの段階では「JSはブラウザで動く」という理解で十分です。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — 早い段階で配置） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "プログラムって、呪文みたいなものですよね？ 正直、意味わかんなくても動けば勝ちでは？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "呪文と違うのは、コンピュータは「書いた通りにしか動かない」点です。\n魔法使いなら多少あいまいでも解釈してくれますが、プログラムは1文字のミスも見逃さず止まります。\nだからこそ、書いた通りに動く。これは怖いことではなく、再現性が保証されているという強みなんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "じゃあ、なぜ3種類（HTML / CSS / JS）に分けるんですか？ 全部JavaScriptで書けばいいのでは？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "実は技術的にはできます。でも職人が仕事を分けるように、専門家ごとに役割を分けた方が効率が上がるんです。\nHTMLはコンテンツの意味を定義し、CSSはデザイナーが担当し、JSはプログラマーが動きを作る。\nチーム開発で役割分担しやすく、変更があった時の影響範囲も小さく抑えられるんですよ。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "`console.log` ってよく見かけるんですけど、何のためにあるんですか？ ブラウザに表示されないし。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "実際のユーザーには見えませんが、開発者ツール（DevTools）のConsole画面に表示されます。\n「今この変数にいくつ入ってる？」「この関数まで処理が来てる？」を確認するための、いわば虫眼鏡のようなものです。\nプログラミングの上達には、この虫眼鏡を使いこなすことが欠かせません。",
          },
        ]}
      />

      {/* ── DevTools の使い方（独立セクション） ─────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          DEVTOOLS
        </h2>

        <div
          className="rounded-xl border p-5 mb-6"
          style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-yellow-400" />
            <h3 className="text-base font-bold text-white">
              DevTools（開発者ツール）を開いてみよう
            </h3>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            DevTools は、すべてのブラウザに最初から入っている「開発用の道具箱」。
            JavaScript の動作確認はここで行います。まずは開く練習から。
          </p>

          <div className="space-y-3 mb-5">
            {[
              { step: "1", text: "Chrome で適当なWebページを開く（このページでもOK）" },
              { step: "2", text: "ページのどこかを右クリック →「検証」を選ぶ（または F12 キー）" },
              { step: "3", text: "上部のタブから「Console」を選ぶ" },
              { step: "4", text: "下のコード欄に入力して Enter を押す" },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 rounded-lg border p-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-yellow-300"
                  style={{ backgroundColor: "rgba(234,179,8,0.15)", border: "1px solid rgba(234,179,8,0.4)" }}
                >
                  {item.step}
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div
            className="rounded-lg border p-3 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-1">{"// Console に貼り付けて Enter"}</p>
            <p>
              <span className="text-yellow-300">console</span>
              <span className="text-gray-300">.</span>
              <span className="text-blue-300">log</span>
              <span className="text-gray-300">(</span>
              <span className="text-green-300">{"'こんにちは'"}</span>
              <span className="text-gray-300">);</span>
            </p>
            <p className="text-gray-500 mt-1">{"// → こんにちは と表示される"}</p>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mt-4">
            これが「JSを動かす」最小の体験。コードを書く → Console で結果を見る、を何度も繰り返して感覚を掴みます。
          </p>
        </div>
      </section>

      {/* ── console.log の使い方（コードブロック） ───────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONSOLE.LOG
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          <code
            className="text-xs px-1.5 py-0.5 rounded font-mono"
            style={{ backgroundColor: "#0f1117", color: "#fde047" }}
          >
            console.log()
          </code>{" "}
          は「カッコの中身を Console に表示する」命令。値・計算結果・変数の中身——なんでも確認できます。
        </p>

        <CodeBlock
          title="console-basics.js"
          language="javascript"
          code={`console.log('こんにちは'); // → こんにちは
console.log(1 + 2);       // → 3
console.log(true);        // → true`}
        />

        <div
          className="rounded-lg border mt-4 p-3"
          style={{ backgroundColor: "rgba(234,179,8,0.05)", borderColor: "rgba(234,179,8,0.3)" }}
        >
          <p className="text-xs font-semibold text-yellow-300 mb-2 flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            このページを抜ける時には
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            「文字も数字も真偽値も、なんでも console.log で表示できる」という感覚があれば十分。
            次のページから「変数」を学びますが、その動作確認は全部 console.log で行います。
          </p>
        </div>
      </section>

      {/* ── エラーが出たときの対処法 ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ERROR HANDLING — 最初の対処法
        </h2>

        <div
          className="rounded-xl border p-5 mb-5"
          style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-base font-bold text-white">
              赤い文字 = エラーではなく「お知らせ」
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            初学者の多くが「エラーが出た = 失敗・怖い」と感じますが、これは大きな誤解。
            エラーは「ここで間違いがあるよ」とコンピュータが親切に教えてくれているメッセージです。
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            むしろ、エラーが出ずにサイレントに壊れる方が100倍やっかい。
            エラーが出たら「バグを早期発見できた」と捉えるのが、上達への第一歩です。
          </p>
        </div>

        <div
          className="rounded-xl border p-5 mb-5"
          style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Bug className="w-5 h-5 text-yellow-400" />
            <h3 className="text-base font-bold text-white">
              エラーが出たときの3ステップ
            </h3>
          </div>

          <div className="space-y-3">
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-sm font-semibold text-gray-200 mb-1">
                1. Console の最初の行を読む
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                エラーは何行も出ますが、答えはほぼ最初の1行に書いてあります。
                「ReferenceError: x is not defined」のように、エラーの種類と該当箇所が出ます。
              </p>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-sm font-semibold text-gray-200 mb-1">
                2. エラーが出た「行番号」を見る
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                右側に「app.js:12」のようにファイル名と行番号が出ます。クリックするとその行に飛べます。
                まずはその行とその少し前を疑うのが鉄則。
              </p>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-sm font-semibold text-gray-200 mb-1">
                3. エラーメッセージをそのままコピーして検索
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                ほとんどのエラーは、世界の誰かが先に踏んでいます。エラー文をそのまま検索エンジンに入れると、
                StackOverflow や MDN に解決策が見つかることが多いです。
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border p-4"
          style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
        >
          <p className="text-xs font-semibold text-gray-400 mb-3">
            よく出会う3つのエラー（名前だけ覚えておけばOK）
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div
              className="rounded border p-2"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-mono text-red-300 mb-1">ReferenceError</p>
              <p className="text-xs text-gray-500 leading-tight">
                知らない名前を使った
              </p>
            </div>
            <div
              className="rounded border p-2"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-mono text-red-300 mb-1">SyntaxError</p>
              <p className="text-xs text-gray-500 leading-tight">
                書き方がおかしい（カッコ忘れなど）
              </p>
            </div>
            <div
              className="rounded border p-2"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-mono text-red-300 mb-1">TypeError</p>
              <p className="text-xs text-gray-500 leading-tight">
                型が合わない操作をした
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            今は「こんな名前のエラーがあるんだな」程度でOK。実際に遭遇したら、その時に詳しく調べれば十分です。
          </p>
        </div>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. プログラムは「上から1行ずつ」読まれる">
          <p>
            JavaScriptに限らず、多くのプログラミング言語は{" "}
            <strong className="text-white">上から下へ、書かれた順に1行ずつ実行</strong>されていく。
            これは料理のレシピと同じで、「1. お湯を沸かす → 2. 麺を入れる → 3. 3分待つ」のように、
            順番が崩れると正しく完成しない。
          </p>
          <p>
            つまり、コードは「コンピュータへのレシピ」。書いた順序がそのまま実行順序になる、というのが
            プログラミングの一番最初の感覚です。
          </p>
          <KeyPoint>
            「順番」がプログラムの基本。上から1行ずつ読まれるので、変数を使いたいなら先に作っておく必要がある——というルールが、これから学ぶ全ての土台になる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. なぜ「JavaScriptが動きを担当する」のか？">
          <p>
            HTMLとCSSだけでも「見た目のあるWebページ」は作れます。しかしHTMLは構造を定義するだけ、
            CSSは見た目を整えるだけで、どちらも{" "}
            <strong className="text-white">「ユーザーの操作に反応して何かを変える」ことはできません</strong>。
          </p>
          <p>
            たとえば「ボタンをクリックしたらメッセージが表示される」「フォームに入力すると送信ボタンの色が変わる」
            「スクロールに合わせて画像が読み込まれる」——こうした<strong className="text-white">動的な振る舞い</strong>を実現するのがJavaScriptの役割。
            ブラウザで動く言語のうち、これができる唯一の存在がJavaScriptです。
          </p>
          <KeyPoint>
            HTMLは「何があるか」、CSSは「どう見えるか」、JavaScriptは「何が起きるか」。この3つで「動くWebページ」が完成する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="3. 開発で必ず使う3つの道具">
          <p>
            JavaScript の学習・開発で、最初から最後まで使い続ける道具は次の3つ。今は名前を覚えるだけで十分です。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 leading-relaxed">
            <li>
              <strong className="text-white">ブラウザ</strong>{" "}
              — Chrome を推奨。多くの教材・ドキュメントが Chrome 前提で書かれている。
            </li>
            <li>
              <strong className="text-white">DevTools（開発者ツール）</strong>{" "}
              — F12 で開く。Console / Network / Elements の3タブを最初は使う。
            </li>
            <li>
              <strong className="text-white">エディタ</strong>{" "}
              — VS Code を推奨。JS用の便利機能（補完・エラー検出・実行）が揃っている。
            </li>
          </ul>
          <KeyPoint>
            このページを読み終えたら、最低限「ブラウザでDevToolsを開いてConsoleにconsole.logを書ける」状態になっていればOK。次のページから本格的に変数を学びます。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/variables",
            title: "変数とスコープ（次に読む）",
            description: "データを入れる「箱」と、その箱が使える範囲の話",
            icon: "Code2",
          },
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "JSが動く「もう一方の世界」を知る",
            icon: "Server",
          },
        ]}
      />
    </div>
  );
}
