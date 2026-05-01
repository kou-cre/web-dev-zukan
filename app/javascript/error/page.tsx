import {
  Plane,
  ShieldAlert,
  ClipboardCheck,
  Megaphone,
  FileWarning,
  Search,
  AlertOctagon,
  WifiOff,
  Wand2,
  PackageOpen,
  ArrowUpFromLine,
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
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
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

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

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
                desc: "通信失敗（fetch の reject）",
                example: "fetch('/api') 失敗",
                color: "text-violet-400",
              },
              {
                Icon: Wand2,
                name: "CustomError",
                desc: "自分で作るエラー",
                example: "class MyError extends Error",
                color: "text-emerald-400",
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
            text: "落ち着いてください、マジさん。むしろこれはとても上品なやり方なのです。「ユーザーが存在しません」「在庫が足りません」といった業務固有のエラーは、`Error` を継承した自分専用のクラス——例えば `UserNotFoundError` のようなものを作って `throw` するのが定石です。catch する側で種類を判別できますし、コードを読む人も「ああ、これは想定済みの業務エラーだな」と一目で分かります。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……エラーハンドリングって、後から付け足すものじゃなくて、設計の段階で組み込んでおくものなんですね。ボクは今までエラーが出てから「うわ、どうしよう」って慌てていました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そこに気づけたのが大きな前進です、マジさん。エラーハンドリングはユーザー体験を守る最後の砦です。「起きてから考える」のではなく、「設計時に、起きた時にどう振る舞うかまで決めておく」。それがプロのコードと初学者のコードを分ける、地味ですが決定的な違いなのですよ。",
          },
        ]}
      />

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 Error オブジェクトのプロパティ">
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
          <p>
            <strong className="text-white">message</strong>：エラーの説明文（人間向け）。例：「Failed to fetch」。
          </p>
          <p>
            <strong className="text-white">name</strong>：エラーの種類名（TypeError / ReferenceError / カスタム名など）。
          </p>
          <p>
            <strong className="text-white">stack</strong>：エラーが発生した場所までの呼び出し履歴（スタックトレース）。デバッグの命綱。
          </p>
          <KeyPoint>
            catch (e) で受けた e は基本的に Error のインスタンス。だが TypeScript の型は unknown 扱いなので、e instanceof Error でガードしてから e.message を読む癖をつけると安全。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 カスタム Error クラスの作り方">
          <p>
            業務固有のエラーは Error を継承した独自クラスを作るのが定石。class 構文で1行書くだけで、catch 側で種類を判別できるようになる。
          </p>
          <p>
            例：
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#34d399" }}
            >
              class UserNotFoundError extends Error {"{ constructor(id) { super(`user ${id} not found`); this.name = 'UserNotFoundError'; } }"}
            </code>
          </p>
          <p>
            catch 側では{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#34d399" }}
            >
              if (e instanceof UserNotFoundError)
            </code>{" "}
            で分岐できる。複数のエラー種別を扱う API では特に効果が大きい。
          </p>
        </DetailBlock>

        <DetailBlock heading="6.3 非同期エラーの罠（未処理のPromiseリジェクション）">
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
          <WarningPoint>
            await を忘れた async 関数の戻り値は Promise のまま放置される。awaitを書き忘れたが故にエラーがどこにも届かないまま、なぜか挙動だけがおかしい——という事故は本当に多い。Lint ルール（@typescript-eslint/no-floating-promises 等）で機械的に検出できるので必ず有効化する。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 エラーログとユーザー向けメッセージの分離">
          <p>
            <strong className="text-white">開発者向けログ</strong>：スタックトレース、リクエスト ID、入力値の概要などを残す（個人情報・パスワード・トークンは記録しない）。Sentry や Cloud Logging に送るのが定番。
          </p>
          <p>
            <strong className="text-white">ユーザー向けメッセージ</strong>：「もう一度お試しください」「しばらくしてから再度アクセスしてください」のような、原因の詳細を漏らさない丁寧な表現にする。
          </p>
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
