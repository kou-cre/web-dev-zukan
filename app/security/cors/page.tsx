import Link from "next/link";
import {
  Globe2,
  ShieldCheck,
  AlertTriangle,
  CheckCheck,
  Server,
  ArrowLeftRight,
  Ban,
  FileCode,
} from "lucide-react";

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
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { corsQuestions } from "@/content/questions/security/cors";

export const metadata = {
  title: "CORS | Web開発図解",
  description:
    "クロスオリジンリクエストの制限とサーバー側のCORSヘッダー設定・preflightリクエストの仕組みを図解で解説。",
};

export default function CorsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/security" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← セキュリティ基礎に戻る
        </Link>
      </div>

      <Hero
        category="セキュリティ基礎"
        title="CORS"
        subtitle={"クロスオリジンリクエストの制限とサーバー側の設定・preflightの仕組み"}
        body={"CORSエラーはフロントエンド開発でよく遭遇する。ブラウザが何を守っているのかを理解しよう。"}
        accentColor="amber"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "オリジン（origin）とは何か・同一オリジンポリシーの意味",
          "CORSエラーが出る原因とブラウザが何を守っているか",
          "サーバー側でCORSを許可するためのヘッダー設定",
        ]}
        prerequisites={[
          "HTTPリクエストとレスポンスの基本を知っている",
          "ブラウザとサーバーが別々の場所で動くことを知っている",
          "fetch APIでデータを取得した経験がある（または知っている）",
        ]}
        outOfScope={[
          "CORSのCredentials（withCredentials）の詳細な設定",
          "ProxyサーバーによるCORSの回避方法",
          "OAuthやJWTとCORSの組み合わせの設計",
        ]}
      />

      <OnePageSummary
        keyMessage="CORSとはブラウザが持つセキュリティの仕組みで、異なるオリジン（ドメイン・ポート・プロトコルの組み合わせ）へのリクエストをデフォルトで制限する。サーバーが適切なヘッダーを返すことで許可できる。CORSエラーはブラウザが出すエラーであり、サーバー側で解決する。"
        metaphorTitle="マンションのセキュリティゲート"
        metaphorPoints={[
          {
            label: "同一オリジンポリシー",
            real: "マンションの住人（自分のドメイン）は自由に出入りできるが、他のマンションの人（別ドメイン）は受付（ブラウザ）に止められる",
            metaphor: "マンションのゲートが別マンションの人を止める",
          },
          {
            label: "CORSヘッダー",
            real: "マンションが『このドメインの人は入ってOK』という許可リストを受付に渡す。受付はリストに載っているなら通してよい",
            metaphor: "管理室が発行する訪問者許可証",
          },
          {
            label: "preflight",
            real: "高価な荷物（POSTリクエスト等）を届ける前に、配達員が電話で『届けていいですか？』と確認するのと同じ",
            metaphor: "本番の前に届けてよいか電話確認する配達員",
          },
        ]}
        definition="CORSはCross-Origin Resource Sharingの略。異なるオリジン間でのHTTPリクエストをブラウザが制限する仕組みと、サーバーが許可を与えるヘッダーの仕組みを総称する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「オリジンとは何か」を理解してから、CORSエラーが出る理由と解決策を順番に確認しましょう。
        </p>

        {/* ── 概念図A: オリジンとは ── */}
        <ConceptDiagram
          title="概念図A"
          description="オリジン（origin）とは「プロトコル + ドメイン + ポート番号」の組み合わせ"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
                同一オリジン vs 異なるオリジン
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-2">
                    基準: https://myapp.com（ポート443）
                  </p>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <CheckCheck className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      <span className="text-green-300">https://myapp.com/api/data</span>
                      <span className="text-gray-500 ml-2">同一オリジン（パスが違うだけ）</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ban className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span className="text-red-300">http://myapp.com</span>
                      <span className="text-gray-500 ml-2">別オリジン（プロトコルが違う）</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ban className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span className="text-red-300">https://api.myapp.com</span>
                      <span className="text-gray-500 ml-2">別オリジン（サブドメインが違う）</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ban className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span className="text-red-300">https://myapp.com:8080</span>
                      <span className="text-gray-500 ml-2">別オリジン（ポートが違う）</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ban className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span className="text-red-300">https://otherdomain.com</span>
                      <span className="text-gray-500 ml-2">別オリジン（ドメインが違う）</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.3)" }}
            >
              <p className="text-sm text-gray-300 leading-relaxed">
                ローカル開発でよく出る例: フロントエンド（localhost:3000）から
                バックエンドAPI（localhost:8000）に fetch すると、ポートが違うため「別オリジン」になりCORSエラーが出る。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          オリジンの定義が分かりました。次はCORSエラーが出る流れと、サーバー側の解決策を確認します。
        </p>

        {/* ── 概念図B: CORSエラーの仕組み ── */}
        <ConceptDiagram
          title="概念図B"
          description="CORSエラーが出る流れとサーバーが許可する仕組み"
        >
          <div className="space-y-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">
                CORSエラーが出るケース
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <FlowCard
                  Icon={Globe2}
                  title="ブラウザ"
                  subtitle="https://myapp.com"
                />
                <FlowArrow label="fetchリクエスト" direction="right" />
                <FlowCard
                  Icon={Server}
                  title="別オリジンのAPI"
                  subtitle="https://api.other.com"
                />
                <FlowArrow label="レスポンス（ヘッダーなし）" direction="right" />
                <FlowCard
                  Icon={AlertTriangle}
                  title="ブラウザがブロック"
                  subtitle="CORSエラー"
                  highlight
                  accentColor="amber"
                />
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.3)" }}
            >
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                サーバーが許可するケース
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <FlowCard
                  Icon={Globe2}
                  title="ブラウザ"
                  subtitle="https://myapp.com"
                />
                <FlowArrow label="fetchリクエスト" direction="right" />
                <FlowCard
                  Icon={Server}
                  title="別オリジンのAPI"
                  subtitle="CORSヘッダーを設定済み"
                />
                <FlowArrow label="許可ヘッダー付きレスポンス" direction="right" />
                <FlowCard
                  Icon={CheckCheck}
                  title="ブラウザが許可"
                  subtitle="データ取得成功"
                  highlight
                  accentColor="amber"
                />
              </div>
              <div
                className="rounded border mt-3 p-2 font-mono text-xs"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-amber-300">Access-Control-Allow-Origin: https://myapp.com</p>
                <p className="text-gray-500">← このヘッダーがあれば許可される</p>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">重要な認識</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              CORSエラーはサーバーに「リクエストが届いていない」ではなく「レスポンスをブラウザがブロックしている」状態です。
              サーバーには届いているが、ブラウザが受け取ったレスポンスを捨てる。
              だから解決はサーバー側でヘッダーを追加することで行います。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ─────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "マスター、ローカルで開発していると『CORSエラー』がよく出るんですが……。\nサーバーに届いていないってことですか？ それとも接続自体ができていないんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "マジさん、実はサーバーにはちゃんと届いているんです。\nCORSエラーはブラウザが「レスポンスを受け取ったけど、渡さない」という判断をしているだけです。\nマンションのたとえで言えば、荷物は無事に届いたんですが、受付が『あなたは許可リストにないので渡せません』と言っている状態です。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "え！サーバーには届いているのに、ブラウザが止めているだけ！\nじゃあ解決はブラウザ側で何かするんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "いいえ、解決はサーバー側です。\nブラウザはセキュリティのルールを守るために動いているので、私たちが変えることはできません。\nサーバー側でレスポンスに『このドメインからのアクセスは許可する』というヘッダーを追加することで解決します。\nそのヘッダーが Access-Control-Allow-Origin です。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "……でも、なぜブラウザはそんな制限をするんですか？\n厳しすぎませんか？ 便利に使わせてほしいんですが。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "ユーザーを守るためなんです。\nもしCORSの制限がなければ——あなたが悪意のあるサイト（evil.com）を開いたとき、\nそのサイトのJavaScriptが勝手に『あなたのログイン中のネットバンクのAPI』にリクエストを送れてしまいます。\nCORSはそれを防ぐ仕組みです。\nブラウザが「あなたのサイト（evil.com）からは、自分のオリジン以外のAPIを呼べない」というルールを強制しているんです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあCORSはセキュリティのための制限で、ちゃんと理由があるんですね。\nBotや直接APIを叩くツールには効かないんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その通り！ CORSはブラウザのセキュリティ機能です。\ncurlコマンドやPostmanからのリクエストには制限がありません。\nつまりCORSは『ブラウザ上の不正なJavaScriptからの攻撃』を防ぐもの。\nAPIそのものへの直接アクセスはCORSでは守れないので、認証（JWT等）を別途実装する必要があります。\n『CORS = APIを守るセキュリティ』ではなく、『CORS = ブラウザ上の不正スクリプトから守る仕組み』と覚えてください。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "わかりました！\nCORSエラーが出たら、サーバー側に Access-Control-Allow-Origin ヘッダーを追加する。\nブラウザを騙そうとしてはいけない。\nそしてCORSはブラウザの話なので、curlなどには効かない。\nこれでCORSがスッキリしました！",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["CORSエラーが出ないケース", "CORSエラーが出るケース"]}
          rows={[
            {
              label: "オリジン",
              cells: ["同一オリジン", "異なるオリジン（ドメイン・ポート等が違う）"],
              highlightCol: 0,
            },
            {
              label: "ヘッダー",
              cells: ["不要", "サーバーにAccess-Control-Allow-Originが必要"],
              highlightCol: 0,
            },
            {
              label: "よくある例",
              cells: [
                "同じドメインのAPIを使う、Next.jsのAPI Routeを使う",
                "localhost:3000から別ポートのAPIを呼ぶ、外部APIを直接呼ぶ",
              ],
              highlightCol: 0,
            },
            {
              label: "解決方法",
              cells: ["そのまま使える", "サーバー側でCORSヘッダーを設定する"],
              highlightCol: 0,
            },
          ]}
          note="Next.jsのAPI RouteやServer Actionを経由してAPIを呼ぶと、ブラウザとの通信は同一オリジン内になりCORSエラーが出ない（Next.jsがプロキシの役割を果たす）。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はpreflightリクエストの詳細・Next.jsでのCORS設定方法など、実装に必要な内容です。"
      />

      {/* ── 応用編 ─────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — preflightリクエストとNext.jsでの設定
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          GETリクエストは直接送信されますが、POSTリクエストなど特定のリクエストは事前に
          「OPTIONS」という確認リクエスト（preflight）が送られます。
        </p>

        <TermNote
          terms={[
            {
              word: "preflight",
              definition:
                "本来のリクエストを送る前にブラウザが自動で送る『事前確認』のリクエスト。HTTPメソッドはOPTIONS。サーバーが許可を返すと本番のリクエストが送られる。",
            },
            {
              word: "Access-Control-Allow-Origin",
              definition:
                "サーバーがレスポンスに追加するCORSヘッダー。許可するオリジンを値に指定する。* を指定すると全てのオリジンを許可（開発時のみ推奨）。",
            },
            {
              word: "Access-Control-Allow-Methods",
              definition:
                "preflightに対してサーバーが返す、許可するHTTPメソッドのリスト。例：GET, POST, PUT, DELETE。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="preflightリクエストの流れ（POST・PUT等の場合）"
        >
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <FlowCard
                Icon={Globe2}
                title="ブラウザ"
                subtitle="POSTを送ろうとする"
              />
              <FlowArrow label="①OPTIONSリクエスト（事前確認）" direction="right" />
              <FlowCard
                Icon={Server}
                title="サーバー"
                subtitle="CORSヘッダーで応答"
                highlight
                accentColor="amber"
              />
              <FlowArrow label="②許可ヘッダー" direction="right" />
              <FlowCard
                Icon={CheckCheck}
                title="許可確認"
                subtitle="本番POSTを送る"
              />
            </div>
            <div
              className="rounded border p-3 font-mono text-xs leading-loose"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-gray-500">{"// サーバーのpreflightレスポンスヘッダー例"}</p>
              <p><span className="text-amber-300">Access-Control-Allow-Origin:</span><span className="text-green-300"> https://myapp.com</span></p>
              <p><span className="text-amber-300">Access-Control-Allow-Methods:</span><span className="text-green-300"> GET, POST, PUT, DELETE</span></p>
              <p><span className="text-amber-300">Access-Control-Allow-Headers:</span><span className="text-green-300"> Content-Type, Authorization</span></p>
              <p><span className="text-amber-300">Access-Control-Max-Age:</span><span className="text-green-300"> 86400</span><span className="text-gray-500"> ← preflightの結果をキャッシュする秒数</span></p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. Next.jsでCORSを設定する2つの方法">
          <p>
            Next.jsアプリがAPIサーバーとなる場合、外部のフロントエンドからのリクエストを受け付けるにはCORSの設定が必要です。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: FileCode,
                title: "next.config.jsで設定",
                subtitle: "全ルートに一括適用",
                description: "next.config.js の headers() で Access-Control-Allow-Origin を設定。Next.jsのApp Router全体に適用したいときに使う。",
                accentColor: "amber",
              },
              {
                Icon: Server,
                title: "Route Handlerで設定",
                subtitle: "APIルートごとに設定",
                description: "app/api/xxx/route.ts の OPTIONS 関数でpreflightに応答し、レスポンスヘッダーを設定。細かく制御したいときに使う。",
                accentColor: "amber",
              },
            ]}
          />
          <CodeBlock
            title="app/api/data/route.ts（Route HandlerでのCORS設定）"
            language="typescript"
            code={`const corsHeaders = {
  "Access-Control-Allow-Origin": "https://myapp.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// preflightへの応答
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  return Response.json(
    { message: "hello" },
    { headers: corsHeaders }
  );
}`}
          />
          <KeyPoint>
            Next.jsのフロントエンドからNext.jsのAPI Route（同じアプリ内）を呼ぶ場合、オリジンが同じなのでCORSヘッダーは不要です。CORSの設定が必要になるのは、「別のNext.jsアプリ」や「外部のReactアプリ」からこのAPIを呼ぶ場合です。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. CORSとAPIセキュリティの誤解">
          <CorrectionCard
            misconception="CORSを設定すればAPIのセキュリティは万全"
            correction="CORSはブラウザのセキュリティ機能。curl・Postman・Botからのリクエストには一切効かない"
            reason="APIを本当に守るには認証（JWT・APIキー・セッション）が別途必要。CORSは『ブラウザ上の不正スクリプト』からのリクエストを防ぐだけ。"
          />
          <WarningPoint>
            開発時の便宜で Access-Control-Allow-Origin: * （全オリジン許可）に設定したまま本番リリースしてはいけない。必ず本番オリジン（https://yourapp.com）のみを許可するよう絞り込むこと。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/security/csrf",
            title: "CSRF",
            description: "CORSと混同されやすい、フォームを悪用した攻撃の仕組み",
            icon: "FileWarning",
          },
          {
            href: "/security/xss",
            title: "XSS",
            description: "CORSとセットで理解したいクロスサイト攻撃",
            icon: "Bug",
          },
          {
            href: "/security",
            title: "セキュリティ基礎 ハブ",
            description: "環境変数・APIキー漏洩など関連トピック一覧",
            icon: "ShieldCheck",
          },
        ]}
      />

      <PageDrill questions={corsQuestions} />
    </div>
  );
}
