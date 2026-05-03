import {
  Monitor,
  Server,
  Send,
  Inbox,
  Package,
  FileJson,
  Download,
  Upload,
  WifiOff,
  AlertTriangle,
  XCircle,
  ShieldAlert,
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
import { CodeBlock } from "@/components/CodeBlock";
import { TerminalBlock } from "@/components/TerminalBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { fetchQuestions } from "@/content/questions/javascript/fetch";

export const metadata = {
  title: "fetch API | Web開発図解",
  description: "ブラウザからサーバーにデータを取りに行くfetch APIの仕組みを図解で解説。GET/POST・エラー処理・CORSまで。",
};

export default function FetchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Hero
        category="JavaScript"
        title="fetch API"
        subtitle={"ブラウザからサーバーにデータを取りに行く——Webの「通信の窓口」の正体"}
        body={"BaaSのSDKもaxiosも、最終的にはfetchの仕組みの上で動いている。ここを掴むと一気に世界が繋がる。"}
        accentColor="cyan"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "fetchとは何か（ブラウザからサーバーにデータを取りに行く仕組み）",
          "GET（取得）とPOSTの（送信）違いと書き方",
          "レスポンスのステータスコードの意味（200/404/500）",
          "async/awaitでfetchを書く定型パターン",
        ]}
        prerequisites={[
          "async/awaitを知っている（/javascript/asyncを読んだ）",
          "HTTP = Webでデータをやりとりするためのルールのこと",
          "JSON = {'{'}key: value{'}'} の形式でデータを表す共通フォーマット",
        ]}
        outOfScope={[
          "CORS / preflightリクエストの詳細な仕組み（応用編で扱う）",
          "AbortControllerによるfetchのキャンセル",
          "axiosの内部実装の詳細（axios自体は基礎の比較表で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="fetchはブラウザ標準のHTTP通信API。URLを渡すとPromiseを返し、サーバーからJSONやテキストを取得できる。BaaSのAPIもREST APIも、最終的にfetchで通信している。"
        metaphorTitle="宅急便の集荷依頼"
        metaphorPoints={[
          { label: "fetch(url)", real: "「この住所に荷物取りに来て」と集荷を依頼する", metaphor: "fetch(url)" },
          { label: "Promise", real: "「受け付けました、後で結果をお伝えします」と受付番号を返してくれる", metaphor: "Promise" },
          { label: "response.json()", real: "届いた荷物を開封して中身（JSONデータ）を確認する", metaphor: "response.json()" },
          { label: "エラー", real: "住所不明・受け取り拒否などで配達できなかった通知が届く", metaphor: "エラー" },
        ]}
        definition="fetchとは、URLを指定してHTTPリクエストを送り、レスポンスをPromiseで受け取るブラウザ標準のAPI。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「fetchを呼ぶとブラウザとサーバーの間で何が起きるか」という全体像を確認します。
        </p>

        {/* TermNote: 概念図Aに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "HTTP",
              definition:
                "HyperText Transfer Protocol の略。ブラウザとサーバーがデータをやり取りするときの「会話のルール（手順）」のこと。",
            },
            {
              word: "リクエスト",
              definition:
                "ブラウザからサーバーへの「お願い」。「このURLのデータをください」「このデータを保存してください」などの要求のこと。",
            },
            {
              word: "レスポンス",
              definition:
                "サーバーからブラウザへの「返答」。リクエストに対してデータやエラーの内容を返す。",
            },
            {
              word: "API",
              definition:
                "Application Programming Interface の略。サーバーが「このURLにリクエストを送れば、このデータを返しますよ」と約束した窓口のこと。",
            },
            {
              word: "エンドポイント",
              definition:
                "APIの具体的なURL。例えば /api/users は「ユーザー一覧を返す窓口（エンドポイント）」という意味になる。",
            },
          ]}
        />

        {/* ── 概念図A: fetchの全体像 ── */}
        <ConceptDiagram
          title="概念図A"
          description="fetchを呼ぶと、ブラウザとサーバーの間で何が起きているのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard Icon={Monitor} title="ブラウザ" subtitle="fetch(url) を呼ぶ" />
            <FlowArrow label="HTTPリクエスト" sublabel="GET /api/users" direction="right" />
            <FlowCard Icon={Server} title="サーバー" subtitle="リクエストを処理" highlight accentColor="cyan" />
            <FlowArrow label="HTTPレスポンス" sublabel="JSON / status" direction="left" />
            <FlowCard Icon={Package} title="Response" subtitle="response.json() で中身を取り出す" />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            fetch(url) は Promise を返す。await すると Response が手に入り、もう一度 await response.json() で中身のデータが取れる（2段階）。
          </p>
        </ConceptDiagram>

        {/* bridge A→B */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          全体の流れが分かりました。次は「リクエストの種類（GETとPOST）」を見ていきます。
        </p>

        {/* TermNote: 概念図Bに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "GET",
              definition:
                "HTTPメソッドの一つ。サーバーからデータを「読み取る」ときに使う。URLを開くだけで実行されるので、ブックマークやリンクで共有できる。",
            },
            {
              word: "POST",
              definition:
                "HTTPメソッドの一つ。サーバーにデータを「送る」ときに使う。フォームの送信・新しいデータの登録などで使われる。",
            },
            {
              word: "HTTPメソッド",
              definition:
                "リクエストの「目的（動詞）」を表す言葉。GET（取得）・POST（作成）・PUT（更新）・DELETE（削除）などがある。",
            },
            {
              word: "JSON.stringify",
              definition:
                "JavaScriptのオブジェクト（{'{'}name: 'マジ'{'}'}）を、サーバーに送れる文字列形式に変換する関数。逆はJSON.parse。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図B"
          description="GETとPOSTで書き方とできることが変わる。最初に押さえておくべき2つの定型句。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Download className="w-4 h-4 text-cyan-400" />
                <p className="text-sm font-bold text-white">GET — データを取得</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>・サーバーから情報を読み取る</li>
                <li>・パラメータはURLに付ける（?id=1）</li>
                <li>・bodyは付けない</li>
                <li>・何度叩いても同じ結果（べき等）</li>
              </ul>
              <div className="mt-3 rounded-lg border p-2.5" style={{ borderColor: "#2d3048", backgroundColor: "#1a1d2a" }}>
                <p className="text-xs font-mono text-cyan-300 leading-relaxed">
                  fetch(&apos;/api/users?id=1&apos;)
                </p>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Upload className="w-4 h-4 text-violet-400" />
                <p className="text-sm font-bold text-white">POST — データを送信</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>・サーバーに情報を渡す</li>
                <li>・bodyにJSONを入れる</li>
                <li>・Content-Typeヘッダー必須</li>
                <li>・叩くたびに状態が変わりうる</li>
              </ul>
              <div className="mt-3 rounded-lg border p-2.5" style={{ borderColor: "#2d3048", backgroundColor: "#1a1d2a" }}>
                <p className="text-xs font-mono text-violet-300 leading-relaxed">
                  fetch(url, &#123;<br />
                  {"  "}method: &apos;POST&apos;,<br />
                  {"  "}headers: &#123; ... &#125;,<br />
                  {"  "}body: JSON.stringify(data)<br />
                  &#125;)
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「URLパラメータで送るのがGET、bodyで送るのがPOST」とまず覚える。PUT・DELETEはPOSTの親戚。
          </p>
        </ConceptDiagram>

        {/* bridge B→C */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          GETとPOSTが書けるようになったら、次に必ず直面するのが「通信が失敗したとき」の問題です。
        </p>

        {/* TermNote: 概念図Cに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "ステータスコード",
              definition:
                "サーバーが返す「結果の番号」。200=成功、404=見つからない、500=サーバー側エラー、など3桁の数字で結果を表す。",
            },
            {
              word: "response.ok",
              definition:
                "ステータスコードが200〜299のとき true になるプロパティ。fetchは404や500でもエラーにならないので、この値を自分で確認する必要がある。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="fetchのエラーは「3層」に分かれている。それぞれ捕まえ方が違うのが落とし穴。"
        >
          <StackLayer
            Icon={WifiOff}
            title="① ネットワークエラー"
            subtitle="そもそも繋がらない（オフライン・DNS失敗など）→ fetchがrejectされる → try/catch で捕まえる"
            iconColor="text-red-400"
          />
          <StackLayer
            Icon={AlertTriangle}
            title="② HTTPエラー（404 / 500）"
            subtitle="通信は成功したがサーバーが「失敗」と返した → fetchはresolveされる → response.ok を自分で確認して throw する"
            iconColor="text-amber-400"
          />
          <StackLayer
            Icon={XCircle}
            title="③ JSONパースエラー"
            subtitle="レスポンスは届いたが中身がJSONじゃない → response.json() がrejectされる → これも try/catch で捕まる"
            iconColor="text-orange-400"
            showArrow={false}
          />
          <p className="text-xs text-gray-600 text-center mt-4">
            「fetch は HTTPエラーで自動rejectされない」が最大の落とし穴。axiosが好まれる最大の理由でもある。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — ComparisonTableより前） ── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、fetch って「取ってくる」って意味ですよね。何を取ってくるんですか？ ボクの中ではまだ、犬がボールを咥えて戻ってくる絵しか浮かんでいません……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "イメージは案外悪くないですよ、マジさん。私はいつも宅急便の集荷依頼にたとえています。`fetch(url)` で「この住所のサーバーから荷物を取ってきて」と依頼すると、配達員（ブラウザ）が出発する。受付番号にあたるのが Promise です。荷物（データ）が届くまでの間、あなたの手元には番号だけがある状態ですね。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ `response.ok` って何ですか？ 通信が成功したらエラーは自動で捕まえてくれるんじゃないんですか！？ ボク、こんな大事なこと知らずに生きてきたなんて……ちょっと震えています！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "ここがfetchの最大の落とし穴です。404や500が返ってきても、fetchの世界では「通信は成功した」扱いになる。配達員は荷物を持ち帰ってきた、ただし中身は「品切れのお詫び状」だった、というイメージですね。なので `if (!response.ok) throw new Error(...)` と自分で例外を投げる必要があります。axiosが好まれるのは、ここを自動でやってくれるからなんですよ。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "POSTでJSONを送る時のヘッダーとかbodyとか、書くことが多くて頭が混乱してきました……。method・headers・body・JSON.stringify……ボク、もう何を渡せばいいか分からなくなっています。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "落ち着いてください、マジさん。これは引っ越しの梱包と同じで、毎回やることは決まっています。① 段ボールに入れる（`JSON.stringify`）、② 中身ラベルを貼る（`Content-Type: application/json`）、③ 配送伝票を書く（`method: 'POST'`）。この3点セットを覚えれば、あとは中身が変わるだけ。一度書いたものをコピペして使い回しても全く問題ありません。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "つまりfetchは「URLとオプションを渡してPromiseで受け取る」のが本体で、エラー処理とPOSTの定型句さえ押さえれば、あとはほぼ毎回同じ形なんですね。腑に落ちました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その通りです、マジさん。さらに言えば、Firebaseや SupabaseのSDK も、内部では結局このfetchを呼んでいます。実務では直接fetchを書く機会が減るかもしれませんが、裏で何が起きているか分かっていれば、エラーが出た時の解像度が全く違う。「市場を知っている料理人」と同じです。今日のところは「fetchはHTTP通信の本体、Promiseで返ってくる、エラーは3層」、これだけ持ち帰ってください。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ──────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["fetch", "axios", "SWR / React Query"]}
          rows={[
            {
              label: "種別",
              cells: ["ブラウザ標準", "外部ライブラリ", "データフェッチHooks"],
              highlightCol: 0,
            },
            {
              label: "インストール",
              cells: ["不要", "npm install axios", "npm install swr"],
              highlightCol: 0,
            },
            {
              label: "エラー処理",
              cells: [
                "response.okを自分で確認",
                "HTTPエラーを自動でthrow",
                "自動でエラー状態を管理",
              ],
              highlightCol: 0,
            },
            {
              label: "キャッシュ",
              cells: ["なし", "なし", "自動キャッシュ・再検証"],
              highlightCol: 0,
            },
            {
              label: "使うシーン",
              cells: [
                "基礎学習・シンプルな通信",
                "実務での標準",
                "Reactアプリのデータ取得",
              ],
              highlightCol: 0,
            },
          ]}
          note="まずはfetchで「裸のHTTP通信」を理解する。その上でaxios・SWRに進むと、各ライブラリが「fetchの何を補ってくれているか」が見えてくる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はHTTPメソッドの詳細・Responseオブジェクトの深掘り・CORSの仕組みなど、実務で詰まったときに戻ってくるための内容です。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — HTTPメソッドとResponseの詳細
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          GET・POSTの次は、PUT・PATCH・DELETEと全メソッドの使い分けを確認します。さらにResponseオブジェクトの構造も見ていきます。
        </p>

        <ConceptDiagram
          title="概念図D：HTTPメソッドの役割と使い分け"
          description="REST APIで使う5つのHTTPメソッド。URLは「リソース」、メソッドは「動詞」を表す。"
        >
          <div className="flex flex-col gap-2">
            {[
              { method: "GET", color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10", desc: "データ取得。bodyなし・ブックマーク可・キャッシュ可", example: "GET /users" },
              { method: "POST", color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10", desc: "データ作成。bodyあり・叩くたびに新リソースが生まれる", example: "POST /users" },
              { method: "PUT", color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10", desc: "データ全体更新。同じIDに送ると丸ごと上書きされる", example: "PUT /users/1" },
              { method: "PATCH", color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", desc: "データ一部更新。指定フィールドだけ変更する", example: "PATCH /users/1" },
              { method: "DELETE", color: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10", desc: "データ削除。URLで対象を指定するだけ", example: "DELETE /users/1" },
            ].map(({ method, color, border, bg, desc, example }) => (
              <div
                key={method}
                className={`flex items-center gap-3 rounded-lg border p-3 ${border} ${bg}`}
              >
                <span className={`text-xs font-bold font-mono w-14 shrink-0 ${color}`}>{method}</span>
                <span className="text-xs text-gray-300 flex-1">{desc}</span>
                <span className={`text-xs font-mono ${color} opacity-70 shrink-0`}>{example}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            GETとPOSTだけ覚えて始め、PUT/PATCH/DELETEはREST APIを触り始めてから身につければよい。
          </p>
        </ConceptDiagram>

        {/* bridge D→E */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          HTTPメソッドの全体像が分かりました。次はfetchが返す「Responseオブジェクト」の中身を深掘りします。
        </p>

        <ConceptDiagram
          title="概念図E：fetch()のResponseオブジェクトを正しく処理する"
          description="fetch()はPromise{`<Response>`}を返す。Responseの中身を取り出すには2段階のawaitが必要。"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="flex-1 rounded-lg border p-3" style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}>
                <p className="text-xs font-semibold text-cyan-400 mb-2">① fetch() の戻り値</p>
                <p className="text-xs font-mono text-gray-300">Promise{"<Response>"}</p>
                <p className="text-xs text-gray-500 mt-1">awaitすると Responseが手に入る</p>
              </div>
              <div className="flex items-center justify-center text-gray-600 text-xs px-1">→</div>
              <div className="flex-1 rounded-lg border p-3" style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}>
                <p className="text-xs font-semibold text-cyan-400 mb-2">② Response のプロパティ</p>
                <ul className="text-xs text-gray-400 space-y-0.5">
                  <li><span className="text-gray-300">status</span> — 200 / 404 / 500</li>
                  <li><span className="text-gray-300">ok</span> — status 200〜299 なら true</li>
                  <li><span className="text-gray-300">headers</span> — レスポンスヘッダー</li>
                </ul>
              </div>
              <div className="flex items-center justify-center text-gray-600 text-xs px-1">→</div>
              <div className="flex-1 rounded-lg border p-3" style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}>
                <p className="text-xs font-semibold text-cyan-400 mb-2">③ body取り出しメソッド</p>
                <ul className="text-xs text-gray-400 space-y-0.5">
                  <li><span className="text-cyan-300 font-mono">.json()</span> — JSONデータ</li>
                  <li><span className="text-sky-300 font-mono">.text()</span> — 文字列</li>
                  <li><span className="text-violet-300 font-mono">.blob()</span> — 画像・PDF</li>
                  <li><span className="text-amber-300 font-mono">.arrayBuffer()</span> — バイト列</li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
              <p className="text-xs font-semibold text-amber-400 mb-1">注意：bodyメソッドは非同期かつ1回しか呼べない</p>
              <p className="text-xs text-gray-300">.json() や .text() は Promise を返すので await が必要。同じ Response に2度呼ぶとエラーになる。</p>
            </div>
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3">
              <p className="text-xs font-semibold text-rose-400 mb-1">エラー処理の要点</p>
              <ul className="text-xs text-gray-300 space-y-0.5">
                <li>・ネットワークエラー → fetch() 自体が throw する</li>
                <li>・4xx / 5xx → throw <span className="text-rose-300">されない</span>。response.ok を自分で確認する</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            「2段階のawait」と「response.okの手動チェック」がfetch処理の2大ポイント。
          </p>
        </ConceptDiagram>

        {/* bridge E→F */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          Responseオブジェクトの使い方が分かりました。次はブラウザのセキュリティ制限「CORS」を見ていきます。CORSエラーに詰まったときにここへ戻ってきてください。
        </p>

        {/* TermNote: 概念図Fに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "CORS",
              definition:
                "Cross-Origin Resource Sharing（クロスオリジンリソース共有）の略。ブラウザが「別のドメインへのfetchを制限する」セキュリティの仕組み。",
            },
            {
              word: "オリジン",
              definition:
                "プロトコル（https://）＋ドメイン（example.com）＋ポート番号（:3000）の3つを合わせたもの。1つでも違うと「別オリジン」になる。",
            },
            {
              word: "プリフライト",
              definition:
                "ブラウザが本番のリクエストを送る前に「このリクエストを送っていいか確認するための事前リクエスト」を自動で送る仕組み。OPTIONSメソッドで送られる。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図F：CORS（クロスオリジンリソース共有）の仕組み"
          description="なぜブラウザは別のドメインへのfetchをブロックするのか？ オリジンの定義から理解する。"
        >
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                <p className="text-xs font-semibold text-emerald-400 mb-2">同一オリジン — OK</p>
                <p className="text-xs font-mono text-gray-300 mb-1">myapp.com → myapp.com/api</p>
                <p className="text-xs text-gray-400">プロトコル・ドメイン・ポートが同じ → 制限なし</p>
              </div>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3">
                <p className="text-xs font-semibold text-rose-400 mb-2">クロスオリジン — ブロック</p>
                <p className="text-xs font-mono text-gray-300 mb-1">myapp.com → api.other.com</p>
                <p className="text-xs text-gray-400">ドメインが違う → ブラウザがレスポンスを破棄</p>
              </div>
            </div>
            <div className="rounded-lg border p-3" style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}>
              <p className="text-xs font-semibold text-gray-300 mb-2">オリジン = プロトコル + ドメイン + ポート</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
                <div className="rounded border border-rose-500/30 bg-rose-500/10 p-2 text-center">
                  <p className="font-mono text-rose-300">http://</p>
                  <p className="text-gray-400 mt-0.5">vs https:// → 別オリジン</p>
                </div>
                <div className="rounded border border-rose-500/30 bg-rose-500/10 p-2 text-center">
                  <p className="font-mono text-rose-300">api.myapp.com</p>
                  <p className="text-gray-400 mt-0.5">vs myapp.com → 別オリジン</p>
                </div>
                <div className="rounded border border-rose-500/30 bg-rose-500/10 p-2 text-center">
                  <p className="font-mono text-rose-300">:3000</p>
                  <p className="text-gray-400 mt-0.5">vs :8080 → 別オリジン</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3">
              <p className="text-xs font-semibold text-cyan-400 mb-2">プリフライトリクエスト（OPTIONS）</p>
              <p className="text-xs text-gray-300">POSTやカスタムヘッダーを送る前にブラウザが自動でOPTIONSリクエストを送り、サーバーに「これ送っていい？」と確認する。</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="rounded-lg border p-3" style={{ borderColor: "#2d3048", backgroundColor: "#0f1117" }}>
                <p className="text-xs font-semibold text-gray-300 mb-1">サーバーが返すべきヘッダー</p>
                <ul className="text-xs font-mono text-gray-400 space-y-0.5">
                  <li><span className="text-cyan-300">Access-Control-Allow-Origin</span></li>
                  <li><span className="text-cyan-300">Access-Control-Allow-Methods</span></li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                <p className="text-xs font-semibold text-amber-400 mb-1">CORSはブラウザの機能</p>
                <p className="text-xs text-gray-300">curlやサーバー間通信はCORSの影響を受けない。フロントのコードをいくら直しても解決しない。サーバー側の設定が必要。</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            CORSエラーが出たら「サーバー側のヘッダー設定」を確認する。フロント側では解決できない。
          </p>
        </ConceptDiagram>
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 fetchの正しいエラーハンドリングパターン（最重要）">
          <p>
            実務でfetchを使うとき、最初に覚えるべきは「完全なエラーハンドリング付きの定型句」です。
            <strong className="text-white"> response.ok の確認</strong>を忘れると、404や500が返ってきても気づかないバグが生まれます。
          </p>
          <CodeBlock
            title="正しいエラーハンドリングパターン（これを覚える）"
            language="javascript"
            code={`async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);

    // ここが重要：HTTPエラーを自分でthrowする
    if (!res.ok) {
      throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    // ネットワークエラー + 上のthrowの両方をここで捕まえられる
    console.error('取得失敗:', err.message);
    throw err;
  }
}`}
          />
          <CorrectionCard
            misconception="404や500が返ってきたら、try/catchで自動的に捕まえられる"
            correction="fetchはHTTP通信が成功した時点でresolveされる。404・500はエラーではなく「返ってきたステータス」"
            reason="rejectされるのはネットワーク接続そのものが失敗した時だけ（オフライン・DNS失敗など）。サーバーが404を返すのは「通信は成功した・中身がなかっただけ」なのでresolveされる。"
          />
          <WarningPoint>
            この処理を毎回書くのが面倒なので、実務では axios や ky のような「HTTPエラーを自動でthrow」してくれるラッパーを使うことが多い。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 HTTPメソッド（GET / POST / PUT / DELETE）とREST">
          <p>
            HTTPには「動詞」がある。{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>GET</code>{" "}
            は読み取り、{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>POST</code>{" "}
            は新規作成、{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>PUT</code>{" "}
            は更新、{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>DELETE</code>{" "}
            は削除。これに「リソースをURLで表す」というルールを足したのがREST（REpresentational State Transfer）。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: Download,
              title: "GET — 取得",
              subtitle: "URL: GET /api/users/1",
              description: "情報を読み取る。パラメータはURLに付ける。何度叩いても同じ結果（べき等）。bodyは使わない。",
              accentColor: "cyan",
            },
            {
              Icon: Upload,
              title: "POST — 作成",
              subtitle: "URL: POST /api/users",
              description: "新しいリソースを作る。bodyにJSONを入れて送信。叩くたびに状態が変わりうる。",
              accentColor: "violet",
            },
            {
              Icon: FileJson,
              title: "PUT — 更新",
              subtitle: "URL: PUT /api/users/1",
              description: "既存リソースを丸ごと置き換える。対象のIDをURLに含め、新しい内容をbodyで送る。",
              accentColor: "amber",
            },
            {
              Icon: XCircle,
              title: "DELETE — 削除",
              subtitle: "URL: DELETE /api/users/1",
              description: "リソースを削除する。URLで対象を指定するだけ。bodyは通常不要。",
              accentColor: "rose",
            },
          ]} />
          <CodeBlock
            title="fetch メソッド別の書き方"
            language="javascript"
            code={`// GET（デフォルト — method省略OK）
const res = await fetch('/api/users/1');
const user = await res.json();

// POST（新規作成）
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '山田太郎', age: 25 }),
});

// PUT（更新）
const res = await fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '山田次郎', age: 26 }),
});

// DELETE（削除）
const res = await fetch('/api/users/1', { method: 'DELETE' });`}
          />
          <KeyPoint>fetchはデフォルトでGET。POST以降を使う時だけ method オプションを明示する。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 fetchのレスポンス処理（response.json / text / blob）">
          <p>
            fetchが返す{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>Response</code>{" "}
            オブジェクトは「中身を取り出すメソッド」を複数持つ。用途によって使い分ける。
          </p>
          <UseCaseGrid cols={2} items={[
            {
              Icon: FileJson,
              title: "response.json()",
              subtitle: "最もよく使う定番",
              description: "JSONデータを取りたい時。API通信のほぼ全てのケースはこれ。Promiseを返すのでawaitが必要。",
              accentColor: "cyan",
            },
            {
              Icon: FileJson,
              title: "response.text()",
              subtitle: "文字列をそのまま受け取る",
              description: "HTML・プレーンテキスト・CSVなど。JSONでない文字データを扱う時に使う。",
              accentColor: "sky",
            },
            {
              Icon: Package,
              title: "response.blob()",
              subtitle: "バイナリデータ",
              description: "画像・PDF・動画など。URLオブジェクトに変換してimg srcに渡したい時などに使う。",
              accentColor: "violet",
            },
            {
              Icon: Inbox,
              title: "response.arrayBuffer()",
              subtitle: "低レベルなバイト列",
              description: "音声処理・暗号化など、バイト単位で操作したい場合に使う。通常のAPI通信では不要。",
              accentColor: "amber",
            },
          ]} />
          <CodeBlock
            title="2段階のawaitが必要な理由"
            language="javascript"
            code={`// 1段階目: HTTPレスポンス全体が届く（ヘッダーだけ）
const response = await fetch('/api/users');

// 2段階目: bodyのストリームを読み切ってパース
const data = await response.json();

// ワンライナー（短く書きたい場合）
const data = await fetch('/api/users').then(r => r.json());`}
          />
          <KeyPoint>これらはすべてPromiseを返す。fetchが2段階のawaitを必要とするのはこのため。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 CORSとは何か（ブラウザのセキュリティ制限）">
          <p>
            <strong className="text-white">CORS（Cross-Origin Resource Sharing）</strong>は、ブラウザが備えているセキュリティの仕組み。「別オリジン（別ドメイン・別ポート・別プロトコル）のサーバーから取得したレスポンスは、サーバー側が明示的に許可しない限りJavaScriptに渡さない」というルール。
          </p>
          <KeyPoint>
            CORSエラーはブラウザによる制限なので、フロントのコードをいくら変えても解消しない。サーバー側でAccess-Control-Allow-Originヘッダーを返すか、同一オリジンのプロキシ経由でAPIを叩く必要がある。
          </KeyPoint>
          <p>
            たとえば{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>https://myapp.com</code>{" "}
            のページから{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>https://api.other.com</code>{" "}
            にfetchすると、サーバーが{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>Access-Control-Allow-Origin</code>{" "}
            ヘッダーで「myapp.comからのアクセスを許可します」と返さないとブラウザがレスポンスを破棄する。
          </p>
          <TerminalBlock
            title="CORSエラーの例（ブラウザ vs curl）"
            lines={[
              { type: "comment", text: "# ブラウザ（fetch）からの場合 → CORSエラーで弾かれる" },
              { type: "error", text: "Access to fetch at 'https://api.other.com/data' from origin" },
              { type: "error", text: "'https://myapp.com' has been blocked by CORS policy:" },
              { type: "error", text: "No 'Access-Control-Allow-Origin' header is present." },
              { type: "comment", text: "" },
              { type: "comment", text: "# curlからの場合 → CORSは関係なく普通に通る" },
              { type: "command", text: "curl https://api.other.com/data" },
              { type: "success", text: '{"users": [...]}  ← 問題なく取得できる' },
              { type: "comment", text: "" },
              { type: "comment", text: "# CORSはブラウザだけの制限。curlやサーバー間通信は無関係。" },
            ]}
          />
          <KeyPoint>CORSエラーが出たら、まずサーバー側の設定を疑う。フロントのコードをいじっても直らないことが多い。</KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/javascript/async",
            title: "非同期処理（Promise / async）",
            description: "fetchが返すPromiseの正体",
            icon: "Code2",
          },
          {
            href: "/javascript/error",
            title: "エラーハンドリング",
            description: "try/catch・throw・response.okの使い分け",
            icon: "Code2",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "Firebase・Supabaseの裏でもfetchが動いている",
            icon: "Cloud",
          },
        ]}
      />

      <PageDrill questions={fetchQuestions} />
    </div>
  );
}
