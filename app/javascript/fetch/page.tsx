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

      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

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

      <DetailSection title="詳細解説">
        <DetailBlock heading="6.1 HTTPメソッド（GET / POST / PUT / DELETE）とREST">
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
          <p>
            たとえば「ユーザーID=1の情報を取得」なら{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>GET /api/users/1</code>、
            「新しいユーザーを作成」なら{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>POST /api/users</code>。
            URL（名詞）+ メソッド（動詞）で「何をどうするか」を表現するのがRESTの基本姿勢。
          </p>
          <KeyPoint>fetchはデフォルトでGET。POST以降を使う時だけ method オプションを明示する。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 fetchのレスポンス処理（response.json / text / blob）">
          <p>
            fetchが返す{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>Response</code>{" "}
            オブジェクトは「中身を取り出すメソッド」を複数持つ。用途によって使い分ける。
          </p>
          <p>
            <strong className="text-white">response.json()</strong> — JSONデータを取りたい時の定番。最もよく使う。<br />
            <strong className="text-white">response.text()</strong> — HTML・プレーンテキスト・CSVなどそのまま文字列で受け取りたい時。<br />
            <strong className="text-white">response.blob()</strong> — 画像・PDF・動画などバイナリデータを扱う時。<br />
            <strong className="text-white">response.arrayBuffer()</strong> — 低レベルにバイト列で扱いたい時。
          </p>
          <KeyPoint>これらはすべてPromiseを返す。fetchが2段階のawaitを必要とするのはこのため。</KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 fetchの落とし穴（HTTPエラーがrejectされない問題）">
          <p>
            初学者がもっとも踏みやすい地雷。404でも500でも、{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>fetch</code>{" "}
            は「通信は成功した」と判断するため、Promiseは{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>resolve</code>{" "}
            される。その結果、try/catchで捕まえようとしても引っかからない。
          </p>
          <p>
            正しい書き方は「response.ok（status が 200〜299 ならtrue）」を自分で確認すること。
          </p>
          <p>
            <code className="text-xs px-1.5 py-0.5 rounded font-mono block" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>
              const res = await fetch(url);<br />
              if (!res.ok) throw new Error(`HTTP ${"{"}res.status{"}"}`);<br />
              const data = await res.json();
            </code>
          </p>
          <WarningPoint>
            この処理を毎回書くのが面倒なので、実務では axios や ky のような「HTTPエラーを自動でthrow」してくれるラッパーを使うことが多い。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="6.4 CORSとは何か（ブラウザのセキュリティ制限）">
          <p>
            <strong className="text-white">CORS（Cross-Origin Resource Sharing）</strong>は、ブラウザが備えているセキュリティの仕組み。「別オリジン（別ドメイン・別ポート・別プロトコル）のサーバーから取得したレスポンスは、サーバー側が明示的に許可しない限りJavaScriptに渡さない」というルール。
          </p>
          <p>
            たとえば{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>https://myapp.com</code>{" "}
            のページから{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>https://api.other.com</code>{" "}
            にfetchすると、サーバーが{" "}
            <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>Access-Control-Allow-Origin</code>{" "}
            ヘッダーで「myapp.comからのアクセスを許可します」と返さないとブラウザがレスポンスを破棄する。
          </p>
          <p className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>これはあくまでブラウザ側の制限なので、サーバー同士の通信や、curl・Postmanからのアクセスは関係なく通る。「ブラウザだけ厳しい門番」と覚えておくと混乱しない。</span>
          </p>
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
