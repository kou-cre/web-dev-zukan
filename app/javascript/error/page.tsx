import {
  Plane,
  ShieldAlert,
  ClipboardCheck,
  Megaphone,
  FileWarning,
  Search,
  AlertOctagon,
  WifiOff,
  PackageOpen,
  ArrowUpFromLine,
  Bug,
  Tag,
  List,
  Terminal,
  BellRing,
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
import { Timeline } from "@/components/Timeline";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { errorQuestions } from "@/content/questions/javascript/error";

export const metadata = {
  title: "エラーハンドリング | Web開発図解",
  description:
    "try/catch・例外処理・カスタムエラー・非同期エラーまで、エラーハンドリングの考え方を図解で解説。",
};

export default function ErrorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="JavaScript"
        title="エラーハンドリング"
        subtitle={
          "「失敗したとき」の処理を設計する——try/catchと例外処理の考え方"
        }
        body={
          "プログラムは必ず失敗する。失敗の起こり方と、起きた時に何をするかを先に決める。"
        }
        accentColor="red"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "try/catchでエラーを捕まえる方法",
          "Errorオブジェクトの基本（message・name・stack）",
          "エラーをUIに表示する設計（開発者ログとユーザー向けメッセージの分離）",
        ]}
        prerequisites={[
          "「エラーが発生するとプログラムが止まる」という体験がある",
          "async/awaitを知っている（/javascript/asyncを読んだ）",
        ]}
        outOfScope={[
          "カスタムエラークラス（extends Error）（応用編で扱う）",
          "エラーチェイン（error.cause）",
          "非同期エラー処理の細部（Promise.catch / unhandledrejection）（応用編で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="プログラムは必ず失敗する。ネットワーク障害・無効な入力・存在しないデータ——エラーハンドリングとは「失敗したときに何をするか」を事前に設計すること。try/catchで例外を捕まえ、適切なフォールバックを用意することがアプリの品質を決める。"
        metaphorTitle="航空機のパイロットの訓練"
        metaphorPoints={[
          {
            label: "try",
            real: "実行したいコード（うまくいくはずの処理）",
            metaphor: "通常の飛行",
          },
          {
            label: "catch",
            real: "エラーが起きた時に動く例外処理",
            metaphor: "緊急時の対応マニュアル",
          },
          {
            label: "finally",
            real: "成功・失敗に関係なく必ず実行する後処理",
            metaphor: "着陸後のチェックリスト",
          },
          {
            label: "throw",
            real: "問題が起きたことを上位に伝える",
            metaphor: "管制塔にトラブルを報告する",
          },
        ]}
        definition="エラーハンドリングとはプログラムの失敗を事前に想定し、try/catchで捕まえて適切に対処する設計。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「エラーとは何か」と「try/catch/finallyの流れ」という基本の構造を確認します。
        </p>

        {/* TermNote: 概念図Aに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "例外（Exception）",
              definition:
                "プログラムの実行中に「想定外の問題」が起きたこと。エラーが発生すると、その場でプログラムが止まり「例外」として上位に伝わっていく。",
            },
            {
              word: "try",
              definition:
                "「エラーが起きるかもしれない処理」を囲むブロック。try { } の中でエラーが起きると、即座に catch に移る。",
            },
            {
              word: "catch",
              definition:
                "try の中でエラーが起きた時だけ実行されるブロック。引数でエラーオブジェクトを受け取り、ログ記録・ユーザー通知などを行う。",
            },
            {
              word: "finally",
              definition:
                "tryが成功しても失敗しても、必ず最後に実行されるブロック。「後片付け」（接続を閉じる・ローディング表示を消すなど）に使う。",
            },
          ]}
        />

        {/* ── 概念図A: try/catch/finallyの構造 ── */}
        <ConceptDiagram
          title="概念図A"
          description="try / catch / finally の構造。失敗が起きるかもしれない処理を try で囲み、起きた時の対応を catch、必ず行う後処理を finally に書く。"
        >
          <div className="rounded-xl border-2 border-dashed border-red-700/50 p-4">
            <p className="text-xs font-semibold text-red-400 text-center mb-4 tracking-wide uppercase">
              try / catch / finally の流れ
            </p>
            <StackLayer
              Icon={Plane}
              title="try { 実行したい処理 }"
              subtitle="うまくいくはずのコード — fetch・JSON.parse・DB操作など"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={ShieldAlert}
              title="catch (e) { エラー処理 }"
              subtitle="エラーが起きた時だけ走る — ログ・リトライ・ユーザーに通知"
              iconColor="text-red-400"
            />
            <StackLayer
              Icon={ClipboardCheck}
              title="finally { 後処理 }"
              subtitle="成功・失敗に関係なく必ず実行 — 接続を閉じる・ローディング解除など"
              iconColor="text-amber-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            エラーが起きた時は try → catch → finally。起きなければ try → finally。finally は必ず通る。
          </p>
        </ConceptDiagram>

        {/* bridge A→B */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          try/catch/finallyの流れが分かりました。次は「エラーにはどんな種類があるか」を見ていきます。エラーの種類を知ると、原因特定が格段に速くなります。
        </p>

        {/* TermNote: 概念図Bに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "Errorオブジェクト",
              definition:
                "JavaScriptがエラーを表すために使うオブジェクト。message（説明文）・name（種類名）・stack（発生場所の履歴）の3つを持つ。",
            },
            {
              word: "スタックトレース",
              definition:
                "エラーが起きた行から、どの関数を経由してここまで来たかの「呼び出し履歴」。e.stack で確認でき、バグの場所を特定するのに役立つ。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図B"
          description="JavaScript のエラーには代表的な5種類がある。発生する場面と原因を知っておくと原因特定が早い。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                Icon: FileWarning,
                name: "SyntaxError",
                desc: "コード自体が間違い（実行前に検出）",
                example: "const x = ;",
                color: "text-orange-400",
              },
              {
                Icon: Search,
                name: "ReferenceError",
                desc: "存在しない変数を参照した",
                example: "console.log(foo)",
                color: "text-yellow-400",
              },
              {
                Icon: AlertOctagon,
                name: "TypeError",
                desc: "型が合わない（undefined のプロパティアクセス等）",
                example: "user.name (user=undefined)",
                color: "text-red-400",
              },
              {
                Icon: WifiOff,
                name: "NetworkError",
                desc: "ネットワーク通信が失敗したとき（fetch のエラーなど）",
                example: "fetch('/api') 失敗",
                color: "text-violet-400",
              },
            ].map(({ Icon, name, desc, example, color }, i) => (
              <div
                key={i}
                className="rounded-lg border p-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <p className={`text-xs font-bold ${color}`}>{name}</p>
                </div>
                <p className="text-xs text-gray-400 leading-tight mb-2">
                  {desc}
                </p>
                <code
                  className="block text-xs font-mono px-2 py-1 rounded leading-tight"
                  style={{ backgroundColor: "#1a1d2a", color: "#9ca3af" }}
                >
                  {example}
                </code>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            ほとんどの実行時エラーは Error クラスを継承している。catch (e) で受けた e は instanceof で種類を判別できる。
          </p>
        </ConceptDiagram>

        {/* bridge B→C */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          エラーの種類が分かりました。次は「catchを書かなかった場合、エラーがどこまで伝わっていくか」という「エラーの伝播」を見ていきます。
        </p>

        <ConceptDiagram
          title="概念図C"
          description="catch がない場所でエラーが起きるとどうなるか？ エラーは呼び出し元に向かって上に伝播していく。"
        >
          <div className="flex flex-col items-center gap-2">
            <FlowCard
              Icon={PackageOpen}
              title="内側の関数"
              subtitle="エラー発生（throw）"
            />
            <FlowArrow label="catch なし" sublabel="上に伝播" direction="down" />
            <FlowCard
              Icon={ArrowUpFromLine}
              title="呼び出し元の関数"
              subtitle="ここにも catch がない"
              muted
            />
            <FlowArrow label="さらに上へ" direction="down" />
            <FlowCard
              Icon={ShieldAlert}
              title="try/catch を持つ関数"
              subtitle="ここで初めて捕まえる"
              highlight
              accentColor="red"
            />
            <FlowArrow label="catch 内で処理" direction="down" />
            <FlowCard
              Icon={Megaphone}
              title="ログ・ユーザー通知"
              subtitle="リトライ・フォールバック"
            />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            どこにも catch がないとブラウザ／Node.js のトップレベルまで届き、最悪「画面真っ白」になる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — ComparisonTableより前） ── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、エラーって、コンソールに赤い文字が出るやつですよね。それを「ハンドリング」って、ボクは具体的に何をすればいいんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良い問いです、マジさん。これは航空機のパイロット訓練に近い話です。彼らは「エンジンが止まったら？」「片翼に氷がついたら？」を事前に何度も訓練します。エラーハンドリングとはコードの世界でこれを行うこと——失敗を「想定外」ではなく「想定内の出来事」として扱う設計です。`try` で通常飛行、`catch` で緊急時マニュアル、`finally` で着陸後のチェックリスト、というわけです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ `finally` は、エラーが起きても起きなくても実行されるってことですか！？ それはいつ使うんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "はい、その通りです。例えばファイルを開いたら必ず閉じる、データベースに接続したら必ず切る、ローディング画面を出したら必ず消す——こうした「成功しても失敗しても、必ず後始末しなければならない処理」を入れる場所が `finally` です。レストランで料理が出ても出なくても会計はする、というのと同じですね。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "えっ、ちょっと待ってください、自分でエラーを作れるんですか！？ ボクはエラーって、JavaScriptが勝手に出してくるものだとばかり思っていました！ 自分で `throw` するなんて、なんだか反逆みたいでドキドキします！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "落ち着いてください、マジさん。自分でエラーを作って throw することもできます。たとえば `throw new Error('ユーザーが見つかりません')` のように書きます。カスタムクラスの詳細は応用編で扱います。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……エラーハンドリングって、後から付け足すものじゃなくて、設計の段階で組み込んでおくものなんですね。ボクは今までエラーが出てから「うわ、どうしよう」って慌てていました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そこに気づけたのが大きな前進です、マジさん。エラーハンドリングはユーザー体験を守る最後の砦です。「起きてから考える」のではなく、「設計時に、起きた時にどう振る舞うかまで決めておく」。設計の段階でエラーを想定しておく習慣がつくと、あなたのコードは格段に信頼されるものになります。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ──────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={[
            "同期エラー",
            "非同期エラー（Promise）",
            "非同期エラー（async/await）",
          ]}
          rows={[
            {
              label: "捕まえ方",
              cells: ["try/catch", ".catch()", "try/catch（awaitと組み合わせ）"],
              highlightCol: 2,
            },
            {
              label: "エラー情報",
              cells: ["Error オブジェクト", "rejectの引数", "Error オブジェクト"],
              highlightCol: 2,
            },
            {
              label: "見逃しリスク",
              cells: [
                "catchがないと上位に伝播する",
                ".catch()忘れで握りつぶされる",
                "awaitを忘れると捕まえられない",
              ],
              highlightCol: 2,
            },
            {
              label: "推奨",
              cells: [
                "try/catch",
                "async/awaitに統一推奨",
                "基本これ",
              ],
              highlightCol: 2,
            },
          ]}
          note="async/await を使えば、同期コードと同じ感覚でtry/catchが書ける。Promiseチェーンの.catch()忘れより事故が起きにくい。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はErrorオブジェクトの継承階層・カスタムエラークラス・非同期エラーの詳細など、実務でより深い設計が必要になったときに戻ってくるための内容です。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — エラークラスの継承と非同期エラー
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          組み込みエラーの継承ツリーと、より高度なエラーハンドリングパターンを見ていきます。
        </p>

        <ConceptDiagram
          title="概念図D：JavaScriptのErrorオブジェクト継承階層"
          description="JavaScript の組み込みエラーはすべて Error クラスを継承している。カスタムエラーも同様に extends Error で作ることで instanceof 判別が使えるようになる。"
        >
          <div className="space-y-4">
            {/* 継承ツリー */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-red-400 mb-3 uppercase tracking-wide">
                継承ツリー
              </p>
              {/* 基底クラス */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-center w-fit"
                >
                  <p className="text-xs font-bold text-red-300">Error</p>
                  <p className="text-xs text-gray-400">基底クラス</p>
                </div>
                <div className="w-px h-4 bg-red-500/40" />
                {/* 子クラス一覧 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                  {[
                    { name: "RangeError", desc: "数値が範囲外" },
                    { name: "ReferenceError", desc: "未定義変数を参照" },
                    { name: "SyntaxError", desc: "構文エラー" },
                    { name: "TypeError", desc: "型が不正" },
                    { name: "URIError", desc: "URI処理エラー" },
                    { name: "EvalError", desc: "eval関連エラー" },
                  ].map(({ name, desc }) => (
                    <div
                      key={name}
                      className="rounded-lg border px-3 py-2 text-center"
                      style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                    >
                      <p className="text-xs font-semibold text-gray-200">{name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Errorオブジェクトのプロパティ */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                Error オブジェクトの主なプロパティ
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { prop: "name", desc: "エラー種別名" },
                  { prop: "message", desc: "説明文" },
                  { prop: "stack", desc: "呼び出し履歴" },
                ].map(({ prop, desc }) => (
                  <div
                    key={prop}
                    className="rounded-lg border px-3 py-2 text-center"
                    style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                  >
                    <code className="text-xs font-mono text-emerald-400">{prop}</code>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* カスタムエラーの作り方 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                カスタムエラーの作り方
              </p>
              <pre
                className="text-xs font-mono leading-relaxed rounded-lg px-3 py-2 overflow-x-auto"
                style={{ backgroundColor: "#1a1d2a", color: "#9ca3af" }}
              >{`class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

// catch 側で instanceof 判別が可能になる
catch (e) {
  if (e instanceof CustomError) { ... }
}`}</pre>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            extends Error で作ることで instanceof による種別判別が機能する。必ず super(message) と this.name を設定すること。
          </p>
        </ConceptDiagram>

        {/* bridge D→E */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          エラークラスの継承ツリーが分かりました。次は「非同期処理のエラーハンドリング」の3パターンを比較します。
        </p>

        <ConceptDiagram
          title="概念図E：非同期処理のエラーハンドリング3パターン比較"
          description="非同期処理のエラーハンドリングにはコールバック・Promise・async/await の3パターンがある。現代のコードでは async/await に統一するのが最もわかりやすい。"
        >
          <div className="space-y-3">
            {/* 3パターン比較 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* パターン1: コールバック */}
              <div
                className="rounded-xl border p-3 flex flex-col gap-2"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-xs font-bold text-gray-300">
                  1. コールバック
                </p>
                <p className="text-xs text-gray-400 leading-tight">
                  エラーファーストパターン。第1引数がエラー、第2引数がデータ。
                </p>
                <pre
                  className="text-xs font-mono leading-relaxed rounded px-2 py-1.5 mt-auto"
                  style={{ backgroundColor: "#1a1d2a", color: "#9ca3af" }}
                >{`fs.readFile(path,
  (err, data) => {
    if (err) {
      // エラー処理
      return;
    }
    // 正常処理
  }
);`}</pre>
                <div
                  className="rounded px-2 py-1 text-center"
                  style={{ backgroundColor: "#1a1d2a" }}
                >
                  <p className="text-xs text-amber-400">err が null でないときエラー</p>
                </div>
              </div>

              {/* パターン2: Promise */}
              <div
                className="rounded-xl border p-3 flex flex-col gap-2"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-xs font-bold text-gray-300">
                  2. Promise
                </p>
                <p className="text-xs text-gray-400 leading-tight">
                  .catch() チェーンでエラーを処理する。.catch() の書き忘れに注意。
                </p>
                <pre
                  className="text-xs font-mono leading-relaxed rounded px-2 py-1.5 mt-auto"
                  style={{ backgroundColor: "#1a1d2a", color: "#9ca3af" }}
                >{`fetchUser(id)
  .then((user) => {
    // 正常処理
  })
  .catch((err) => {
    // エラー処理
  })
  .finally(() => {
    // 後処理
  });`}</pre>
                <div
                  className="rounded px-2 py-1 text-center"
                  style={{ backgroundColor: "#1a1d2a" }}
                >
                  <p className="text-xs text-amber-400">.catch() 忘れで握りつぶし</p>
                </div>
              </div>

              {/* パターン3: async/await */}
              <div
                className="rounded-xl border border-red-500/40 p-3 flex flex-col gap-2"
                style={{ backgroundColor: "#0f1117" }}
              >
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-red-300">
                    3. async / await
                  </p>
                  <span className="text-xs bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded">
                    推奨
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-tight">
                  try-catch-finally で同期コードと同じ感覚で書ける。
                </p>
                <pre
                  className="text-xs font-mono leading-relaxed rounded px-2 py-1.5 mt-auto"
                  style={{ backgroundColor: "#1a1d2a", color: "#9ca3af" }}
                >{`async function load() {
  try {
    const user =
      await fetchUser(id);
    // 正常処理
  } catch (err) {
    // エラー処理
  } finally {
    // 後処理
  }
}`}</pre>
                <div
                  className="rounded px-2 py-1 text-center"
                  style={{ backgroundColor: "#1a1d2a" }}
                >
                  <p className="text-xs text-emerald-400">最も直感的で見通しが良い</p>
                </div>
              </div>
            </div>

            {/* 未処理のPromiseリジェクション */}
            <div
              className="rounded-xl border border-red-500/40 bg-red-500/5 p-3"
            >
              <p className="text-xs font-semibold text-red-400 mb-2">
                未処理のPromiseリジェクション（要注意）
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    .catch() も await も書き忘れると Promise が reject されてもエラーが届かず、アプリが無言で壊れる。
                  </p>
                </div>
                <pre
                  className="text-xs font-mono leading-relaxed rounded px-2 py-1.5 flex-1"
                  style={{ backgroundColor: "#1a1d2a", color: "#9ca3af" }}
                >{`// 安全網として設置する
window.addEventListener(
  'unhandledrejection',
  (event) => {
    console.error(event.reason);
    // Sentry等に送る
  }
);`}</pre>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            新規コードでは async/await に統一するのが最善。window.addEventListener の unhandledrejection は最後の安全網として必ず設置する。
          </p>
        </ConceptDiagram>

        {/* bridge E→F */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          非同期エラーの3パターンが分かりました。最後にcatch後の「エラーをどう処理するか」のパターンを見ていきます。
        </p>

        <ConceptDiagram
          title="概念図F：エラーの再スロー・ラッピング・変換パターン"
          description="エラーを catch したあとの処理には「再スロー」「ラッピング」「変換」という3つの定石パターンがある。状況に応じて使い分ける。"
        >
          <div className="space-y-3">
            {[
              {
                label: "1. 再スロー",
                color: "text-amber-400",
                borderColor: "border-amber-500/30",
                when: "ログだけ取って処理は上位に任せたいとき",
                code: `catch (e) {
  // ログだけ記録して、そのまま上位へ投げる
  logger.error(e);
  throw e; // 再スロー
}`,
                note: "自分では対処できないが記録は必要なとき。エラーを隠蔽しない。",
              },
              {
                label: "2. エラーラッピング",
                color: "text-violet-400",
                borderColor: "border-violet-500/30",
                when: "低レベルエラーをビジネスエラーに変換して意味を付与したいとき",
                code: `catch (e) {
  // 低レベルエラーをビジネスエラーにラップ
  // ES2022の cause で元エラーを保持できる
  throw new AppError(
    'ユーザーが見つかりません',
    { cause: e }
  );
}`,
                note: "呼び出し元に意味のあるエラー名を渡せる。error.cause で元エラーを追跡可能（ES2022）。",
              },
              {
                label: "3. エラー変換",
                color: "text-sky-400",
                borderColor: "border-sky-500/30",
                when: "HTTPエラーをアプリ固有エラーに変換してUIに渡したいとき",
                code: `catch (e) {
  if (e instanceof HttpError) {
    if (e.status === 404) {
      throw new NotFoundError();
    }
    if (e.status === 401) {
      throw new UnauthorizedError();
    }
  }
  throw e;
}`,
                note: "インフラ層のエラーをアプリ層の言葉に変換する。UIはHTTPを意識しなくて済む。",
              },
            ].map(({ label, color, borderColor, when, code, note }) => (
              <div
                key={label}
                className={`rounded-xl border ${borderColor} p-3`}
                style={{ backgroundColor: "#0f1117" }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="sm:w-1/3 flex flex-col gap-1.5">
                    <p className={`text-xs font-bold ${color}`}>{label}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{when}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-auto">{note}</p>
                  </div>
                  <pre
                    className="text-xs font-mono leading-relaxed rounded px-3 py-2 flex-1 overflow-x-auto"
                    style={{ backgroundColor: "#1a1d2a", color: "#9ca3af" }}
                  >{code}</pre>
                </div>
              </div>
            ))}

            {/* error.cause の補足 */}
            <div
              className="rounded-xl border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-1.5">
                error.cause（ES2022）——エラーチェーン
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                {"new Error('msg', { cause: originalError }) で元のエラーを新しいエラーに紐付けられる。"}
                スタックトレースを追いやすくなり、ラッピング後も根本原因が分かる。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            再スロー→記録だけして上位に委ねる。ラッピング→意味を付与して投げ直す。変換→インフラ層をアプリ層の言語に翻訳する。
          </p>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 実践的なエラーハンドリングのパターン（最重要）">
          <p>
            最初に覚えるべきパターンは「<strong className="text-white">try/catchでfetchを包み、response.okを確認し、ユーザーに丁寧に伝える</strong>」という一連のセットです。
            これだけで実務のほとんどのケースに対応できます。
          </p>
          <CodeBlock
            title="実践的なエラーハンドリングの定型句"
            language="typescript"
            code={`async function loadUser(id: number) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);

    // fetchは404でもrejectしないので自分でチェック
    if (!res.ok) {
      throw new Error(\`サーバーエラー: \${res.status}\`);
    }

    const user = await res.json();
    return user;

  } catch (e) {
    // 開発者向けにスタックトレースをログに残す
    if (e instanceof Error) {
      console.error(e.message, e.stack);
    }
    // ユーザーには丁寧なメッセージを表示
    showToast('データの取得に失敗しました。しばらく後にお試しください。');
    // 呼び出し元にもエラーを伝える（再スロー）
    throw e;

  } finally {
    // 成功・失敗に関係なくローディングを消す
    setLoading(false);
  }
}`}
          />
          <KeyPoint>
            「try/catch で囲む → response.ok でHTTPエラーを自分でthrow → catch でログ記録とユーザー通知 → finally でローディング解除」これが実務の基本セット。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 Error オブジェクトのプロパティ">
          <p>
            JavaScript の{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#34d399" }}
            >
              Error
            </code>{" "}
            オブジェクトには主に3つの情報が乗る。
          </p>
          <UseCaseGrid cols={3} items={[
            {
              Icon: Bug,
              title: "message",
              subtitle: "人間向けの説明文",
              description: "エラーの内容を文章で説明する。例：「Failed to fetch」「user 42 not found」。",
              accentColor: "red",
            },
            {
              Icon: Tag,
              title: "name",
              subtitle: "エラーの種類名",
              description: "TypeError / ReferenceError / カスタム名など。instanceof での判別にも使える。",
              accentColor: "amber",
            },
            {
              Icon: List,
              title: "stack",
              subtitle: "スタックトレース",
              description: "エラーが発生した場所までの呼び出し履歴。デバッグの命綱。本番では Sentry 等に送る。",
              accentColor: "violet",
            },
          ]} />
          <CodeBlock
            title="error-properties.ts"
            language="typescript"
            code={`try {
  const data = JSON.parse("invalid json");
} catch (e) {
  // TypeScript では e の型は unknown — instanceof でガードする
  if (e instanceof Error) {
    console.log(e.message); // "Unexpected token i in JSON..."
    console.log(e.name);    // "SyntaxError"
    console.log(e.stack);   // "SyntaxError: ... at JSON.parse ..."
  }
}`}
          />
          <KeyPoint>
            catch (e) で受けた e は基本的に Error のインスタンス。だが TypeScript の型は unknown 扱いなので、e instanceof Error でガードしてから e.message を読む癖をつけると安全。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 カスタム Error クラスの作り方">
          <p>
            業務固有のエラーは Error を継承した独自クラスを作るのが定石。class 構文で1行書くだけで、catch 側で種類を判別できるようになる。
          </p>
          <CodeBlock
            title="custom-error.ts"
            language="typescript"
            code={`// カスタムエラークラスを定義する
class UserNotFoundError extends Error {
  constructor(id: number) {
    super(\`user \${id} not found\`);
    this.name = "UserNotFoundError";
  }
}

class InsufficientStockError extends Error {
  constructor(itemId: string) {
    super(\`item \${itemId} is out of stock\`);
    this.name = "InsufficientStockError";
  }
}

// catch 側でエラー種別を判別して分岐できる
async function processOrder(userId: number, itemId: string) {
  try {
    const user = await fetchUser(userId);
    const item = await fetchItem(itemId);
    await placeOrder(user, item);
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      // ユーザー未登録のケース → 登録を促す
      showToast("アカウントが見つかりません。再ログインしてください。");
    } else if (e instanceof InsufficientStockError) {
      // 在庫切れのケース → 再入荷通知を提案
      showToast("在庫が不足しています。再入荷通知を設定しますか？");
    } else {
      // 想定外のエラー → 汎用メッセージ
      showToast("エラーが発生しました。しばらく後にお試しください。");
    }
  }
}`}
          />
          <KeyPoint>
            JavaScriptではどんな値もthrowできるため、catch節のeが必ずErrorインスタンスとは限らない。TypeScriptではeの型はunknownになる。安全に扱うには instanceof Error でガードしてから e.message を読む。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 非同期エラーの罠（未処理のPromiseリジェクション）">
          <p>
            Promise を返す関数を呼び出した後、{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#34d399" }}
            >
              .catch()
            </code>{" "}
            も await もしないと、エラーは「未処理のPromiseリジェクション（unhandledrejection）」になり、ログに警告が出るだけで握りつぶされることがある。
          </p>
          <CorrectionCard
            misconception="try/catch の中で async 関数を呼べば、その中のエラーは必ず catch に届く"
            correction="await を書き忘れると Promise が返ってくるだけで、エラーは catch に届かない"
            reason="async 関数は常に Promise を返す。await なしで呼ぶと、その Promise が reject されても try/catch はそれを感知できない。結果として「なぜか動かないが何のエラーも出ない」という厄介な状態になる。"
          />
          <CodeBlock
            title="async-error.ts"
            language="typescript"
            code={`// NG: await なし — エラーが catch に届かない
async function bad() {
  try {
    fetchUser(42); // await を忘れた！ Promise が宙に浮く
  } catch (e) {
    console.error(e); // ここには来ない
  }
}

// OK: await あり — エラーが catch に届く
async function good() {
  try {
    await fetchUser(42); // await で Promise を解決する
  } catch (e) {
    console.error(e); // ここに来る
  }
}

// OK: Promise チェーンで書く場合は .catch() を使う
fetchUser(42)
  .then((user) => console.log(user))
  .catch((e) => console.error(e)); // .catch() を忘れずに`}
          />
          <WarningPoint>
            await を忘れた async 関数の戻り値は Promise のまま放置される。awaitを書き忘れたが故にエラーがどこにも届かないまま、なぜか挙動だけがおかしい——という事故は本当に多い。Lint ルール（@typescript-eslint/no-floating-promises 等）で機械的に検出できるので必ず有効化する。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="6.5 エラーログとユーザー向けメッセージの分離">
          <UseCaseGrid cols={2} items={[
            {
              Icon: Terminal,
              title: "開発者向けログ",
              subtitle: "Sentry / Cloud Logging に送る",
              description: "スタックトレース・リクエストID・入力値の概要を記録する。個人情報・パスワード・トークンは絶対に含めない。",
              accentColor: "violet",
            },
            {
              Icon: BellRing,
              title: "ユーザー向けメッセージ",
              subtitle: "画面・トーストで表示する",
              description: "「もう一度お試しください」のような丁寧な表現にする。技術的な原因・スタックトレースは絶対に見せない。",
              accentColor: "sky",
            },
          ]} />
          <Timeline items={[
            {
              year: "発生",
              label: "エラーが throw される",
              description: "API 呼び出し失敗・DB エラー・バリデーション違反など、何らかの理由でエラーが投げられる。",
              accentColor: "rose",
            },
            {
              year: "検知",
              label: "catch 節で受け取る",
              description: "catch (e) でエラーオブジェクトを受け取る。e instanceof Error でガードして e.message・e.stack を取り出す。",
              accentColor: "amber",
            },
            {
              year: "記録",
              label: "開発者向けログを送信",
              description: "Sentry.captureException(e) や console.error(e) でスタックトレースをログシステムに送る。個人情報は除外する。",
              accentColor: "violet",
            },
            {
              year: "通知",
              label: "ユーザーへ丁寧に伝える",
              description: "「エラーが発生しました。しばらくしてから再度お試しください。」のような文言を表示する。スタックトレースは見せない。",
              accentColor: "sky",
            },
          ]} />
          <KeyPoint>
            原則：技術情報をユーザーに見せない、人間向け文言を開発者ログに混ぜない。両者の目的と読み手が違うので、必ず分けて設計する。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/async",
            title: "非同期処理（Promise / async / await）",
            description:
              "Promise の reject と try/catch の関係を別ページで詳しく",
            icon: "Code2",
          },
          {
            href: "/javascript/fetch",
            title: "fetch API",
            description:
              "通信エラーとレスポンスエラーの違い、ネットワークエラーの捕まえ方",
            icon: "Cloud",
          },
          {
            href: "/javascript/variables",
            title: "変数とスコープ",
            description:
              "ReferenceError が起きる仕組みと変数の生存範囲",
            icon: "Code2",
          },
        ]}
      />

      <PageDrill questions={errorQuestions} />
    </div>
  );
}
