import {
  Network,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpFromLine,
  ArrowDownToLine,
  Filter,
  FileJson,
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
import { networkTabQuestions } from "@/content/questions/debug/network-tab";

export const metadata = {
  title: "Networkタブ活用 | Web開発図解",
  description:
    "DevToolsのNetworkタブでfetch通信のリクエスト・レスポンス・ステータスコードを確認する方法を図解で解説する。",
};

export default function NetworkTabPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/debug" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← デバッグ・エラー対処に戻る
        </Link>
      </div>

      <Hero
        category="デバッグ・エラー対処"
        title="Networkタブ活用"
        subtitle={"ブラウザの「通信帳」——fetch通信を目で見て確認する"}
        body={"リクエスト・レスポンス・ステータスコードをNetworkタブで確認し、APIのトラブルを素早く切り分けられるようになる。"}
        accentColor="red"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Networkタブの基本的な見方",
          "リクエスト・レスポンスの確認方法",
          "ステータスコード（200・404・500など）の意味",
        ]}
        prerequisites={[
          "fetch APIを使ったことがある",
          "JSON形式のデータを見たことがある",
          "DevTools基本を読んだ（Networkタブの開き方を知っている）",
        ]}
        outOfScope={[
          "リクエストヘッダー・認証トークンの詳細",
          "CORSエラーの設定と対処（セキュリティ基礎ページで扱う）",
          "Network速度スロットリング（低速回線テスト）",
        ]}
      />

      <OnePageSummary
        keyMessage="Networkタブは「ブラウザが送ったすべての通信の領収書帳」。fetch・画像・CSSなど全リクエストが一覧になっており、各行を選ぶとリクエスト内容・レスポンス内容・かかった時間が見られる。"
        metaphorTitle="宅配便の追跡システム"
        metaphorPoints={[
          {
            label: "リクエスト",
            real: "「〇〇のURLに、このデータを送りました」という注文の記録",
            metaphor: "荷物を送った記録",
          },
          {
            label: "レスポンス",
            real: "「サーバーから返ってきたデータ（JSON等）」の中身",
            metaphor: "受け取った荷物の中身",
          },
          {
            label: "ステータスコード",
            real: "「配達完了（200）・住所不明（404）・倉庫トラブル（500）」に対応する結果コード",
            metaphor: "配達結果の種別",
          },
          {
            label: "Fetch/XHRフィルター",
            real: "画像やCSSを除外して、APIのfetch通信だけを一覧表示に絞り込む",
            metaphor: "荷物の種類で絞り込む",
          },
        ]}
        definition="Networkタブとは、ブラウザが行ったすべてのHTTP通信（fetch・XHR・画像・CSS等）を一覧化して、リクエストとレスポンスの詳細を確認できるDevToolsのパネル。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずNetworkタブの構造と見方を把握し、次にステータスコードの意味を整理しましょう。
        </p>

        {/* ── 概念図A: Networkタブの構造 ── */}
        <ConceptDiagram
          title="概念図A"
          description="Networkタブのレイアウト——上部でフィルター、一覧で通信を選んで、右パネルで詳細を確認する"
        >
          <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "#2d3048" }}
          >
            {/* フィルターバー */}
            <div
              className="px-4 py-2 flex items-center gap-3 text-xs border-b"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <div className="flex gap-2">
                {["All", "Fetch/XHR", "JS", "CSS", "Img"].map((f, i) => (
                  <span
                    key={f}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: i === 1 ? "rgba(239,68,68,0.15)" : "transparent",
                      color: i === 1 ? "#f87171" : "#6b7280",
                      border: i === 1 ? "1px solid rgba(239,68,68,0.3)" : "1px solid transparent",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <span className="text-gray-600 ml-auto">← フィルターバー</span>
            </div>

            {/* ヘッダー行 */}
            <div
              className="px-4 py-2 grid grid-cols-5 text-xs text-gray-500 border-b"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <span>Name</span>
              <span>Method</span>
              <span>Status</span>
              <span>Size</span>
              <span>Time</span>
            </div>

            {/* リクエスト行 */}
            {[
              { name: "/api/users", method: "GET", status: "200", statusColor: "#4ade80", size: "2.1 kB", time: "142 ms", selected: true },
              { name: "/api/posts", method: "GET", status: "200", statusColor: "#4ade80", size: "8.4 kB", time: "238 ms", selected: false },
              { name: "/api/comment", method: "POST", status: "404", statusColor: "#f87171", size: "0.3 kB", time: "58 ms", selected: false },
            ].map((row) => (
              <div
                key={row.name}
                className="px-4 py-2 grid grid-cols-5 text-xs border-b"
                style={{
                  backgroundColor: row.selected ? "rgba(239,68,68,0.08)" : "#0f1117",
                  borderColor: "#2d3048",
                  borderLeft: row.selected ? "2px solid #f87171" : "2px solid transparent",
                }}
              >
                <span className="text-blue-300 font-mono truncate">{row.name}</span>
                <span className="text-gray-400">{row.method}</span>
                <span style={{ color: row.statusColor }}>{row.status}</span>
                <span className="text-gray-500">{row.size}</span>
                <span className="text-gray-500">{row.time}</span>
              </div>
            ))}
          </div>

          {/* 詳細パネル */}
          <div
            className="mt-3 rounded-xl border overflow-hidden"
            style={{ borderColor: "#2d3048" }}
          >
            <div
              className="px-4 py-2 flex gap-3 text-xs border-b"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              {["Headers", "Payload", "Response", "Timing"].map((tab, i) => (
                <span
                  key={tab}
                  className="px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: i === 2 ? "rgba(239,68,68,0.15)" : "transparent",
                    color: i === 2 ? "#f87171" : "#6b7280",
                    border: i === 2 ? "1px solid rgba(239,68,68,0.3)" : "none",
                  }}
                >
                  {tab}
                </span>
              ))}
              <span className="text-gray-600 ml-auto">← 選択した行の詳細</span>
            </div>
            <div
              className="px-4 py-3 font-mono text-xs"
              style={{ backgroundColor: "#0f1117" }}
            >
              <span className="text-gray-500">{"// Responseタブの中身"}</span>
              <div className="mt-1 text-gray-300">
                {"["}
                <div className="ml-4">
                  {"{ "}<span className="text-blue-300">&quot;id&quot;</span>{": 1, "}
                  <span className="text-blue-300">&quot;name&quot;</span>{": "}
                  <span className="text-green-300">&quot;マジくん&quot;</span>{" }"}
                </div>
                {"]"}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            行を選んで「Response」タブを開くと、サーバーが返したJSONの中身が確認できる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          Networkタブの見方が分かりました。次は「Status」列に表示されるステータスコードの意味を整理しましょう。
        </p>

        {/* ── 概念図B: ステータスコード ── */}
        <ConceptDiagram
          title="概念図B"
          description="ステータスコードは「通信の結果報告書」——3桁の数字で成功・失敗・原因が分かる"
        >
          <div className="space-y-3">
            {/* 2xx */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <p className="text-xs font-semibold text-green-300 mb-3 uppercase tracking-wide">
                2xx — 成功
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { code: "200 OK", desc: "成功。データが正常に返ってきた" },
                  { code: "201 Created", desc: "POST成功。新しいデータが作成された" },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="flex items-start gap-2 rounded-lg p-2"
                    style={{ backgroundColor: "rgba(74,222,128,0.08)" }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold text-green-300">{item.code}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4xx */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(251,191,36,0.05)", borderColor: "rgba(251,191,36,0.3)" }}
            >
              <p className="text-xs font-semibold text-amber-300 mb-3 uppercase tracking-wide">
                4xx — クライアントエラー（送った側の問題）
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { code: "400 Bad Request", desc: "リクエストの形式がおかしい" },
                  { code: "401 Unauthorized", desc: "認証が必要（ログインしていない）" },
                  { code: "403 Forbidden", desc: "権限がない（ログインしても見られない）" },
                  { code: "404 Not Found", desc: "そのURLは存在しない" },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="flex items-start gap-2 rounded-lg p-2"
                    style={{ backgroundColor: "rgba(251,191,36,0.06)" }}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-300">{item.code}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5xx */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}
            >
              <p className="text-xs font-semibold text-red-300 mb-3 uppercase tracking-wide">
                5xx — サーバーエラー（サーバー側の問題）
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { code: "500 Internal Server Error", desc: "サーバー内でエラーが発生した" },
                  { code: "503 Service Unavailable", desc: "サーバーが応答できない状態" },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="flex items-start gap-2 rounded-lg p-2"
                    style={{ backgroundColor: "rgba(239,68,68,0.08)" }}
                  >
                    <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold text-red-300">{item.code}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            4xx は「送った側（フロントエンド）の問題」、5xx は「受けた側（サーバー）の問題」が多い。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ──────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "Networkタブって使う必要ありますか？\nfetch でデータが取れないときは、ConsoleのエラーでJSを見れば分かる気がしますが……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "面白い疑問です、マジさん。ConsoleはJSのエラーは見えますが、『サーバーが何を返したか』は見えないんです。\nたとえばAPIが正常に200を返しているのにデータが空の場合、ConsoleにはJSのエラーが出ません。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "でも200が返ってたらデータが来てるはずでは！\n空のデータが返ってくることなんてあるんですか！？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "あります。フィルター条件のクエリパラメータが間違っていた場合や、DBに該当データが存在しない場合、サーバーは200を返しつつ空配列を返します。\nConsoleにはJSのエラーがないので無症状なんです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "それは気づけないですね……。じゃあどうやって確認するんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "Networkタブで該当のfetchリクエストを選んで、Responseタブを開きます。\n返ってきたJSONが空なのか、正しいデータが入っているのかが一目で分かります。\nリクエストとレスポンスを『目で見る』のがポイントです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……。ConsoleはJS側の視点で、NetworkはHTTP通信の視点で見るんですね。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "まさにその理解です。\n『データが来ない』バグの原因はJSのエラーかもしれないし、APIが返す内容の問題かもしれない。\nNetworkタブでレスポンスを直接見ることで、どちらの問題かを素早く切り分けられます。",
          },
        ]}
      />

      {/* ── 比較表 ─────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["2xx（成功）", "4xx（クライアントエラー）", "5xx（サーバーエラー）"]}
          rows={[
            {
              label: "原因の場所",
              cells: ["なし（正常）", "送った側（フロント）の問題", "受けた側（サーバー）の問題"],
              highlightCol: 0,
            },
            {
              label: "代表的なコード",
              cells: ["200 OK / 201 Created", "400・401・403・404", "500・503"],
              highlightCol: 0,
            },
            {
              label: "デバッグの方向",
              cells: ["レスポンスの中身を確認（データが空でないか）", "URLの確認・認証トークンの確認", "サーバーログの確認・バックエンドに問い合わせ"],
              highlightCol: 0,
            },
          ]}
          note="200が返っていてもデータが期待通りとは限らない。Responseタブを開いてJSONの中身を直接確認することが重要。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はCORSエラーの読み方・リクエストヘッダーの確認など、より発展的な内容です。まず基本のレスポンス確認ができるようになってから読んでください。"
      />

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — ヘッダーとCORSエラー
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          認証が必要なAPIでは、リクエストに「誰が送ったか」を示すヘッダーが必要です。
          また異なるドメインへのfetchではCORSエラーが起きることがあります。
        </p>

        <TermNote
          terms={[
            {
              word: "ヘッダー",
              definition:
                "HTTPリクエスト・レスポンスに付属するメタ情報。認証トークン（Authorization）・コンテンツ形式（Content-Type）などが含まれる。Networkタブの「Headers」タブで確認できる。",
            },
            {
              word: "CORS",
              definition:
                "Cross-Origin Resource Sharing。異なるオリジン（ドメイン・ポート）へのリクエストをブラウザが制限するセキュリティ機構。サーバーが許可しないと、Networkタブに「CORS error」と表示される。",
            },
            {
              word: "ペイロード",
              definition:
                "POSTリクエストなどで送るデータ本体。フォームの内容やJSONデータがここに入る。Networkタブの「Payload」タブで確認できる。",
            },
          ]}
        />
      </section>

      {/* ── 詳細解説 ───────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="fetch結果をNetworkタブで確認する手順">
          <p>
            「APIからデータが来ない」と感じたとき、Networkタブで確認する基本手順を整理します。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Filter,
                title: "1. Fetch/XHRで絞り込む",
                subtitle: "フィルターバーを使う",
                description: "NetworkタブのフィルターでFetch/XHRを選ぶ。画像やCSS等を除外してAPIのfetch通信だけが一覧に表示される。",
                accentColor: "red",
              },
              {
                Icon: ArrowUpFromLine,
                title: "2. リクエストを確認",
                subtitle: "正しいURLに送れているか",
                description: "行をクリックしてHeadersタブを開く。リクエストURLが正しいか・メソッド（GET/POST）が合っているかを確認する。",
                accentColor: "red",
              },
              {
                Icon: FileJson,
                title: "3. レスポンスを確認",
                subtitle: "何が返ってきているか",
                description: "Responseタブを開く。JSONが空（[ ]）か・正しいデータが入っているか・エラーメッセージが入っていないかを確認する。",
                accentColor: "red",
              },
              {
                Icon: ArrowDownToLine,
                title: "4. ステータスコードを確認",
                subtitle: "200以外は何かの問題",
                description: "Status列の数字を確認。401なら認証トークン切れ・404ならURLが間違い・500ならサーバー側の問題。",
                accentColor: "red",
              },
            ]}
          />
          <CorrectionCard
            misconception="Networkの行が赤くなっていなければ通信は成功"
            correction="200で返っていても、レスポンスの中身が空・エラーメッセージの場合がある"
            reason="ステータスコードはHTTP通信の結果を示すだけ。200 OKでも、サーバーが「該当データなし」として空配列を返すことはよくある。Responseタブで実際の中身を確認することが必要。"
          />
          <KeyPoint>
            「データが来ない」原因を素早く切り分けるには「Networkタブのステータスコード → Responseタブの中身」の順で確認する。ConsoleにJSエラーがなくてもNetworkで問題が見つかることは多い。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="CORSエラーの見分け方">
          <p>
            fetchで別のドメインへリクエストを送ったとき、ブラウザが通信を遮断してCORSエラーが出ることがあります。
            NetworkタブとConsoleで以下のように確認できます。
          </p>
          <CodeBlock
            title="CORSエラーの特徴"
            language="bash"
            code={`# ConsoleにこのようなエラーとWarningが出る
Access to fetch at 'https://api.example.com/users'
from origin 'http://localhost:3000'
has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present
on the requested resource.

# Networkタブでは
- Status: (failed) または CORS error と表示される
- Responseタブが空になっている

# CORSはサーバー側の設定問題
→ フロントエンド側では解決できない
→ サーバー側で Access-Control-Allow-Origin ヘッダーを設定してもらう必要がある`}
          />
          <WarningPoint>
            CORSエラーはフロントエンドのコードでは解決できない。サーバー（バックエンド）側で許可の設定をしてもらう必要がある。開発中は local proxy（next.config.js の rewrites）を使って回避する方法もある。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/debug/devtools",
            title: "DevTools 基本",
            description: "Networkタブを含む4大タブの全体像を確認する",
            icon: "MonitorDot",
          },
          {
            href: "/debug/error-messages",
            title: "エラーメッセージの読み方",
            description: "ConsoleのJSエラーを読んで原因を特定する方法",
            icon: "FileWarning",
          },
          {
            href: "/javascript/fetch",
            title: "fetch API",
            description: "fetchの基本的な書き方とPromise/async-awaitとの組み合わせ",
            icon: "ArrowUpFromLine",
          },
        ]}
      />

      <PageDrill questions={networkTabQuestions} />
    </div>
  );
}
